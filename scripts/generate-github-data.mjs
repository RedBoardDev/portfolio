// Build-time generator for accurate GitHub stats.
//
// Queries the authenticated GitHub GraphQL API (single source of truth) and writes
// a static snapshot to data/github-data.json, consumed by the GitHub section.
// This avoids unauthenticated client-side calls (rate limits, inaccurate proxies)
// and keeps the rendered stats exact and stable.
//
// Usage:  GITHUB_TOKEN=<token> node scripts/generate-github-data.mjs
// Without a token (or on API failure) it keeps the committed snapshot and, if none
// exists, writes an empty but valid one so `next build` never fails.

import { existsSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const USERNAME = process.env.GITHUB_USERNAME || "RedBoardDev"
const TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN
const OUTPUT = join(dirname(fileURLToPath(import.meta.url)), "..", "data", "github-data.json")

const TOP_LANGUAGES = 8
// Languages to hide from the "most used" stat (e.g. markup/data). Empty = faithful to GitHub.
const EXCLUDED_LANGUAGES = new Set([])

const LEVEL_MAP = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
}

function writeSnapshot(data) {
  writeFileSync(OUTPUT, `${JSON.stringify(data, null, 2)}\n`)
}

// Guarantees the import target always exists so the static build never fails,
// even with no token or on a fresh checkout. The committed snapshot is the real data.
function ensureSnapshotExists() {
  if (existsSync(OUTPUT)) return
  writeSnapshot({
    generatedAt: new Date().toISOString(),
    username: USERNAME,
    lastYearTotal: 0,
    totalContributions: 0,
    longestStreak: 0,
    publicSourceRepos: 0,
    languages: [],
    calendar: [],
  })
  console.warn("[github-data] wrote empty fallback snapshot (no token and no existing file)")
}

if (!TOKEN) {
  console.warn("[github-data] No GITHUB_TOKEN/GH_TOKEN set — keeping existing snapshot")
  ensureSnapshotExists()
  process.exit(0)
}

async function graphql(query, variables) {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  })
  if (!res.ok) {
    throw new Error(`GitHub GraphQL HTTP ${res.status}`)
  }
  const json = await res.json()
  if (json.errors) {
    throw new Error(`GitHub GraphQL errors: ${JSON.stringify(json.errors)}`)
  }
  return json.data
}

function computeLongestStreak(days) {
  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date))
  let current = 0
  let longest = 0
  let previous = null

  for (const day of sorted) {
    if (day.count > 0) {
      const consecutive =
        previous && (new Date(day.date).getTime() - new Date(previous).getTime()) / 86_400_000 === 1
      current = consecutive ? current + 1 : 1
      if (current > longest) longest = current
      previous = day.date
    } else {
      current = 0
      previous = day.date
    }
  }

  return longest
}

async function main() {
  // 1. Rolling last-year calendar + the years GitHub reports + source repos with real language bytes.
  const base = await graphql(
    `query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionYears
          contributionCalendar {
            totalContributions
            weeks { contributionDays { date contributionCount contributionLevel } }
          }
        }
        repositories(first: 100, ownerAffiliations: OWNER, isFork: false, privacy: PUBLIC) {
          totalCount
          nodes { languages(first: 40) { edges { size node { name color } } } }
        }
      }
    }`,
    { login: USERNAME }
  )

  const user = base.user
  const calendarRaw = user.contributionsCollection.contributionCalendar

  const calendar = calendarRaw.weeks
    .flatMap((week) => week.contributionDays)
    .map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: LEVEL_MAP[day.contributionLevel] ?? 0,
    }))

  const lastYearTotal = calendarRaw.totalContributions

  // 2. Per-year calendars (one batched query) over every year GitHub reports →
  //    all-time total + longest streak from the full daily history.
  const years = [...user.contributionsCollection.contributionYears].sort()
  const yearAliases = years
    .map(
      (year) =>
        `y${year}: contributionsCollection(from: "${year}-01-01T00:00:00Z", to: "${year}-12-31T23:59:59Z") {
          contributionCalendar {
            totalContributions
            weeks { contributionDays { date contributionCount } }
          }
        }`
    )
    .join("\n")

  const history = (
    await graphql(`query($login: String!) { user(login: $login) { ${yearAliases} } }`, {
      login: USERNAME,
    })
  ).user

  let totalContributions = 0
  const dayCounts = new Map()
  for (const year of years) {
    const calendarForYear = history[`y${year}`].contributionCalendar
    totalContributions += calendarForYear.totalContributions
    for (const week of calendarForYear.weeks) {
      for (const day of week.contributionDays) {
        dayCounts.set(day.date, day.contributionCount)
      }
    }
  }
  const longestStreak = computeLongestStreak(
    [...dayCounts.entries()].map(([date, count]) => ({ date, count }))
  )

  // 3. Language breakdown from real byte counts across source repositories.
  const repos = user.repositories
  if (repos.totalCount > repos.nodes.length) {
    console.warn(
      `[github-data] WARNING: ${repos.totalCount} source repos but only ${repos.nodes.length} fetched — language stats are truncated; add pagination to the repositories query.`
    )
  }

  const bytesByLanguage = {}
  const colorByLanguage = {}
  for (const repo of repos.nodes) {
    for (const edge of repo.languages.edges) {
      const name = edge.node.name
      if (EXCLUDED_LANGUAGES.has(name)) continue
      bytesByLanguage[name] = (bytesByLanguage[name] || 0) + edge.size
      if (edge.node.color) colorByLanguage[name] = edge.node.color
    }
  }
  const totalBytes = Object.values(bytesByLanguage).reduce((sum, value) => sum + value, 0) || 1
  const languages = Object.entries(bytesByLanguage)
    .map(([name, bytes]) => ({
      name,
      percentage: Math.round((bytes / totalBytes) * 1000) / 10,
      color: colorByLanguage[name] || "#858585",
    }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, TOP_LANGUAGES)

  writeSnapshot({
    generatedAt: new Date().toISOString(),
    username: USERNAME,
    lastYearTotal,
    totalContributions,
    longestStreak,
    publicSourceRepos: repos.totalCount,
    languages,
    calendar,
  })
  console.log(
    `[github-data] wrote snapshot: ${calendar.length} days, ${languages.length} languages, ${totalContributions} total contributions, ${lastYearTotal} last year, streak ${longestStreak}, ${repos.totalCount} source repos`
  )
}

main().catch((error) => {
  console.warn(`[github-data] generation failed, keeping existing snapshot: ${error.message}`)
  ensureSnapshotExists()
  process.exit(0)
})
