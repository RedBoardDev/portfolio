import data from "@/data/github-data.json"

export interface LanguageStat {
  name: string
  percentage: number
  color: string
}

export interface ContributionDay {
  date: string
  count: number
  level: number
}

export interface GitHubData {
  generatedAt: string
  username: string
  lastYearTotal: number
  totalContributions: number
  longestStreak: number
  publicSourceRepos: number
  languages: LanguageStat[]
  calendar: ContributionDay[]
}

// Snapshot generated at build time by scripts/generate-github-data.mjs from the
// authenticated GitHub GraphQL API. Single source of truth for the GitHub section.
export const githubData = data as GitHubData
