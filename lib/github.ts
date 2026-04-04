import { getCached, setCache } from "@/lib/github-cache"
import type { Activity } from "react-activity-calendar"

// API endpoints
const CONTRIBUTIONS_API = "https://github-contributions-api.jogruber.de/v4"
const GITHUB_API = "https://api.github.com"

// Cache TTLs
const HEATMAP_CACHE_TTL = 5 * 60 * 1000 // 5 minutes
const STATS_CACHE_TTL = 60 * 60 * 1000 // 1 hour

// GitHub default language colors
const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  PHP: "#4F5D95",
  Python: "#3572A5",
  CSS: "#563d7c",
  HTML: "#e34c26",
  "C++": "#f34b7d",
  C: "#555555",
  Go: "#00ADD8",
  Rust: "#dea584",
  Java: "#b07219",
  Shell: "#89e051",
  Dart: "#00B4AB",
  Ruby: "#701516",
}

// Types

export interface LanguageStat {
  name: string
  percentage: number
  color: string
}

export interface HeatmapData {
  contributions: Activity[]
  totalLastYear: number
}

export interface StatsData {
  totalContributions: number
  longestStreak: number
  totalRepos: number
  languages: LanguageStat[]
}

// Heatmap data (last year contributions)

export async function fetchHeatmapData(username: string): Promise<HeatmapData> {
  const cached = getCached<HeatmapData>("heatmap")
  if (cached) return cached

  const res = await fetch(`${CONTRIBUTIONS_API}/${username}?y=last`)
  if (!res.ok) throw new Error(`Contributions API: HTTP ${res.status}`)
  const json = await res.json()

  const data: HeatmapData = {
    contributions: json.contributions,
    totalLastYear: json.total.lastYear,
  }

  setCache("heatmap", data, HEATMAP_CACHE_TTL)
  return data
}

// Stats data (all-time contributions, streak, repos, languages)

function daysBetween(a: string, b: string): number {
  return (new Date(b).getTime() - new Date(a).getTime()) / 86_400_000
}

function calculateLongestStreak(days: { date: string; count: number }[]): number {
  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date))
  let current = 0
  let longest = 0
  let prevDate: string | null = null

  for (const day of sorted) {
    if (day.count > 0) {
      if (prevDate && daysBetween(prevDate, day.date) === 1) {
        current++
      } else {
        current = 1
      }
      if (current > longest) longest = current
      prevDate = day.date
    } else {
      current = 0
      prevDate = day.date
    }
  }

  return longest
}

async function fetchContributionsAndStreak(username: string) {
  const res = await fetch(`${CONTRIBUTIONS_API}/${username}`)
  if (!res.ok) throw new Error(`Contributions API: HTTP ${res.status}`)
  const data = await res.json()

  const totalContributions = Object.entries(data.total as Record<string, number>)
    .filter(([key]) => /^\d{4}$/.test(key))
    .reduce((sum, [, count]) => sum + count, 0)

  return { totalContributions, longestStreak: calculateLongestStreak(data.contributions) }
}

async function fetchReposAndLanguages(username: string) {
  const [userRes, reposRes] = await Promise.all([
    fetch(`${GITHUB_API}/users/${username}`),
    fetch(`${GITHUB_API}/users/${username}/repos?per_page=100&sort=updated`),
  ])

  if (!userRes.ok) throw new Error(`GitHub user API: HTTP ${userRes.status}`)
  if (!reposRes.ok) throw new Error(`GitHub repos API: HTTP ${reposRes.status}`)

  const userData = await userRes.json()
  const repos: { language: string | null; size: number }[] = await reposRes.json()

  const langBytes: Record<string, number> = {}
  for (const repo of repos) {
    if (repo.language) {
      langBytes[repo.language] = (langBytes[repo.language] || 0) + (repo.size || 1)
    }
  }

  const totalBytes = Object.values(langBytes).reduce((sum, v) => sum + v, 0)
  const languages: LanguageStat[] = Object.entries(langBytes)
    .map(([name, bytes]) => ({
      name,
      percentage: Math.round((bytes / totalBytes) * 1000) / 10,
      color: LANGUAGE_COLORS[name] || "#858585",
    }))
    .sort((a, b) => b.percentage - a.percentage)

  return { totalRepos: userData.public_repos as number, languages }
}

export async function fetchStatsData(username: string): Promise<StatsData> {
  const cached = getCached<StatsData>("stats")
  if (cached) return cached

  const [contribs, repos] = await Promise.all([
    fetchContributionsAndStreak(username),
    fetchReposAndLanguages(username),
  ])

  const data: StatsData = {
    totalContributions: contribs.totalContributions,
    longestStreak: contribs.longestStreak,
    totalRepos: repos.totalRepos,
    languages: repos.languages,
  }

  setCache("stats", data, STATS_CACHE_TTL)
  return data
}
