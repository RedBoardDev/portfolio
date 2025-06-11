export interface GitHubContribution {
  date: string
  count: number
}

export interface GitHubStats {
  login: string
  name: string
  publicRepos: number
  totalRepos: number // Inclut les repos privés
  followers: number
  following: number
  avatarUrl: string
  bio: string
}

export interface GitHubLanguage {
  name: string
  percentage: number
  color: string
}

export interface StreakStats {
  totalContributions: number
  currentStreak: {
    start: string
    end: string
    length: number
  }
  longestStreak: {
    start: string
    end: string
    length: number
  }
  firstContribution: string
  mode: string
  excludedDays: string[]
}

/**
 * Fetches GitHub contribution data for a user
 *
 * Note: This requires a GitHub Personal Access Token with the 'user' scope
 * Create one at: https://github.com/settings/tokens
 */
export async function fetchGitHubContributions(username: string): Promise<GitHubContribution[]> {
  // GitHub GraphQL API endpoint
  const endpoint = "https://api.github.com/graphql"

  // GitHub Personal Access Token (should be stored in environment variable)
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN

  if (!token) {
    console.warn("GitHub token not found. Using mock data instead.")
    return generateMockContributions()
  }

  // GraphQL query to get contribution data
  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
    })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`)
    }

    const data = await response.json()

    if (data.errors) {
      console.error("GitHub GraphQL Error:", data.errors)
      throw new Error("Failed to fetch GitHub data")
    }

    // Extract contribution data from response
    const contributionCalendar = data.data.user.contributionsCollection.contributionCalendar
    const contributions: GitHubContribution[] = []

    // Flatten the weeks array into a single array of contribution days
    contributionCalendar.weeks.forEach((week: any) => {
      week.contributionDays.forEach((day: any) => {
        contributions.push({
          date: day.date,
          count: day.contributionCount,
        })
      })
    })

    return contributions
  } catch (error) {
    console.error("Error fetching GitHub contributions:", error)
    // Fall back to mock data if API call fails
    return generateMockContributions()
  }
}

/**
 * Fetches GitHub user stats including total repositories (public + private)
 */
export async function fetchGitHubStats(username: string): Promise<GitHubStats> {
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN

  if (!token) {
    console.warn("GitHub token not found. Using mock data instead.")
    return generateMockStats()
  }

  try {
    // GraphQL query to get both public and private repositories count
    const endpoint = "https://api.github.com/graphql"
    const query = `
      query($username: String!) {
        user(login: $username) {
          login
          name
          bio
          avatarUrl
          followers {
            totalCount
          }
          following {
            totalCount
          }
          repositories(privacy: PUBLIC) {
            totalCount
          }
          totalRepositories: repositories {
            totalCount
          }
        }
      }
    `

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
    })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`)
    }

    const data = await response.json()

    if (data.errors) {
      console.error("GitHub GraphQL Error:", data.errors)
      throw new Error("Failed to fetch GitHub data")
    }

    const user = data.data.user

    return {
      login: user.login,
      name: user.name,
      publicRepos: user.repositories.totalCount,
      totalRepos: user.totalRepositories.totalCount,
      followers: user.followers.totalCount,
      following: user.following.totalCount,
      avatarUrl: user.avatarUrl,
      bio: user.bio,
    }
  } catch (error) {
    console.error("Error fetching GitHub stats:", error)
    return generateMockStats()
  }
}

/**
 * Fetches GitHub languages for a user
 */
export async function fetchGitHubLanguages(username: string): Promise<GitHubLanguage[]> {
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN

  if (!token) {
    console.warn("GitHub token not found. Using mock data instead.")
    return generateMockLanguages()
  }

  try {
    // GraphQL query to get language data across all repositories
    const endpoint = "https://api.github.com/graphql"
    const query = `
      query($username: String!) {
        user(login: $username) {
          repositories(first: 100, orderBy: {field: UPDATED_AT, direction: DESC}) {
            nodes {
              name
              languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
                edges {
                  size
                  node {
                    name
                    color
                  }
                }
              }
            }
          }
        }
      }
    `

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
    })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`)
    }

    const data = await response.json()

    if (data.errors) {
      console.error("GitHub GraphQL Error:", data.errors)
      throw new Error("Failed to fetch GitHub language data")
    }

    // Process language data
    const languageCounts: Record<string, number> = {}
    const languageColors: Record<string, string> = {}
    let totalBytes = 0

    // Aggregate language data across all repositories
    const repositories = data.data.user.repositories.nodes
    repositories.forEach((repo: any) => {
      if (repo.languages && repo.languages.edges) {
        repo.languages.edges.forEach((edge: any) => {
          const { name, color } = edge.node
          const size = edge.size

          languageCounts[name] = (languageCounts[name] || 0) + size
          totalBytes += size

          // Store language color
          if (!languageColors[name] && color) {
            languageColors[name] = color
          }
        })
      }
    })

    // Convert to percentage and sort
    const languages: GitHubLanguage[] = Object.entries(languageCounts)
      .map(([name, bytes]) => ({
        name,
        percentage: (bytes / totalBytes) * 100,
        color: languageColors[name] || getLanguageDefaultColor(name),
      }))
      .sort((a, b) => b.percentage - a.percentage)

    return languages
  } catch (error) {
    console.error("Error fetching GitHub languages:", error)
    return generateMockLanguages()
  }
}

/**
 * Fetches total contributions count for a user (all time)
 */
export async function fetchTotalContributions(username: string): Promise<number> {
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN

  if (!token) {
    console.warn("GitHub token not found. Using mock data for total contributions.")
    return 1200 // Mock total contributions
  }

  try {
    // GraphQL query to get total contributions
    const endpoint = "https://api.github.com/graphql"
    const query = `
      query($username: String!) {
        user(login: $username) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
            }
          }
        }
      }
    `

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
    })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`)
    }

    const data = await response.json()

    if (data.errors) {
      console.error("GitHub GraphQL Error:", data.errors)
      throw new Error("Failed to fetch total contributions")
    }

    return data.data.user.contributionsCollection.contributionCalendar.totalContributions
  } catch (error) {
    console.error("Error fetching total contributions:", error)
    return 1200 // Fallback to mock data
  }
}

// Generate mock contribution data for testing or when API is unavailable
function generateMockContributions(): GitHubContribution[] {
  const days: GitHubContribution[] = []
  const now = new Date()

  for (let i = 364; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    days.push({
      date: date.toISOString().split("T")[0],
      count: Math.floor(Math.random() * 5), // 0-4 contributions
    })
  }

  return days
}

// Generate mock stats
function generateMockStats(): GitHubStats {
  return {
    login: "redBoardDev",
    name: "Thomas OTT",
    publicRepos: 25,
    totalRepos: 32, // Including private repos
    followers: 42,
    following: 38,
    avatarUrl: "/placeholder.svg?height=200&width=200",
    bio: "Full-Stack Developer passionate about web technologies",
  }
}

// Generate mock languages
function generateMockLanguages(): GitHubLanguage[] {
  return [
    { name: "PHP", percentage: 35, color: "#4F5D95" },
    { name: "JavaScript", percentage: 25, color: "#f1e05a" },
    { name: "TypeScript", percentage: 20, color: "#2b7489" },
    { name: "HTML", percentage: 12, color: "#e34c26" },
    { name: "CSS", percentage: 8, color: "#563d7c" },
  ]
}

// Get total contributions for a year
export function getTotalContributions(contributions: GitHubContribution[]): number {
  return contributions.reduce((total, day) => total + day.count, 0)
}

// Get most active day
export function getMostActiveDay(contributions: GitHubContribution[]): GitHubContribution {
  return contributions.reduce((max, day) => (day.count > max.count ? day : max), contributions[0])
}

// Get contribution streak (consecutive days with contributions)
export function getLongestStreak(contributions: GitHubContribution[]): number {
  let currentStreak = 0
  let longestStreak = 0

  contributions.forEach((day) => {
    if (day.count > 0) {
      currentStreak++
      longestStreak = Math.max(longestStreak, currentStreak)
    } else {
      currentStreak = 0
    }
  })

  return longestStreak
}

// Get default color for a language
function getLanguageDefaultColor(language: string): string {
  const colors: Record<string, string> = {
    JavaScript: "#f1e05a",
    TypeScript: "#2b7489",
    HTML: "#e34c26",
    CSS: "#563d7c",
    PHP: "#4F5D95",
    Python: "#3572A5",
    Java: "#b07219",
    "C#": "#178600",
    C: "#555555",
    "C++": "#f34b7d",
    Ruby: "#701516",
    Go: "#00ADD8",
    Swift: "#ffac45",
    Kotlin: "#F18E33",
    Rust: "#dea584",
    Dart: "#00B4AB",
    Shell: "#89e051",
  }

  return colors[language] || "#858585" // Default gray if color not found
}

export async function fetchStreakStats(username: string): Promise<StreakStats> {
  try {
    const response = await fetch(`/api/github/streak-stats?user=${username}`)
    if (!response.ok) {
      throw new Error(`Failed to fetch streak stats: ${response.status}`)
    }
    const data = await response.json()
    return data as StreakStats
  } catch (error) {
    console.error("Error fetching streak stats:", error)
    throw error
  }
}
