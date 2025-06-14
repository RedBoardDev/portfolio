"use client"

import { useEffect, useState, useRef } from "react"
// import {
//   fetchGitHubContributions,
//   fetchGitHubStats,
//   fetchGitHubLanguages,
//   fetchStreakStats,
//   type GitHubContribution,
//   type GitHubStats,
//   type GitHubLanguage,
//   type StreakStats,
// } from "@/lib/api/github"
import { Skeleton } from "@/components/ui/skeleton"
import { useTranslation } from "@/hooks/use-translation"
import { useLanguage } from "@/lib/language-context"

interface GitHubContributionsProps {
  username?: string
}

const getContributionColor = (count: number): string => {
  if (count === 0) return "#ebedf0"
  if (count === 1) return "#9be9a8"
  if (count === 2) return "#40c463"
  if (count === 3) return "#30a14e"
  return "#216e39"
}

export function GitHubContributions({ username = "redBoardDev" }: GitHubContributionsProps) {
  const { t, loading: translationLoading } = useTranslation("about")
  const { language } = useLanguage()
  // const containerRef = useRef<HTMLDivElement>(null)
  // const graphRef = useRef<HTMLDivElement>(null)
  // const [contributions, setContributions] = useState<GitHubContribution[] | null>(null)
  // const [stats, setStats] = useState<GitHubStats | null>(null)
  // const [languages, setLanguages] = useState<GitHubLanguage[] | null>(null)
  // const [streakStats, setStreakStats] = useState<StreakStats | null>(null)
  const [isLoading, setIsLoading] = useState(false) // Désactivé pour l'instant
  const [error, setError] = useState<string | null>(null)
  // const [yearlyContributions, setYearlyContributions] = useState(0)

  // Valeurs statiques temporaires
  const yearlyContributions = 1247
  const totalContributions = 6969
  const currentStreak = 258
  const longestStreak = 258
  const totalRepos = 32

  // useEffect(() => {
  //   async function loadGitHubData() {
  //     try {
  //       setIsLoading(true)

  //       // Charger les contributions de l'année (pour le graphique)
  //       const contributionsData = await fetchGitHubContributions(username)
  //       setContributions(contributionsData)
  //       setYearlyContributions(contributionsData.reduce((total, day) => total + day.count, 0))

  //       // Charger les vraies statistiques depuis streak-stats API
  //       const streakData = await fetchStreakStats(username)
  //       setStreakStats(streakData)

  //       // Charger les statistiques générales
  //       const statsData = await fetchGitHubStats(username)
  //       setStats(statsData)

  //       // Charger les langages
  //       const languagesData = await fetchGitHubLanguages(username)
  //       setLanguages(languagesData)

  //       setError(null)
  //     } catch (err) {
  //       setError(translationLoading ? "Error loading GitHub data" : t("github.loadingError"))
  //       console.error(err)
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   }

  //   loadGitHubData()
  // }, [username, t, translationLoading])

  // Graphique temporairement désactivé
  // useEffect(() => {
  //   if (!containerRef.current || !contributions || isLoading || translationLoading) return
  //   // ... code du graphique commenté
  // }, [contributions, isLoading, translationLoading, t, language])

  if (isLoading || translationLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-20 w-full" />
        <div className="flex justify-end gap-2">
          <Skeleton className="h-4 w-10" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    )
  }

  if (error) {
    return <div className="text-sm text-red-500">{error}</div>
  }

  return (
    <div>
      {/* Graphique temporairement désactivé */}
      {/* <div ref={containerRef} className="w-full overflow-x-auto py-1 scrollbar-hide" /> */}

      {/* Placeholder pour le graphique */}
      <div className="h-20 bg-gray-50 rounded-lg flex items-center justify-center mb-4">
        <span className="text-gray-400 text-sm">Contributions chart (soon)</span>
      </div>

      {/* Texte des contributions annuelles */}
      <div className="text-xs text-gray-500 mt-2 text-right">
        {yearlyContributions} {t("github.inLastYear")}
      </div>

      <div className="mt-6 space-y-2">
        <div>
          <div className="flex justify-between mb-1 text-sm">
            <span className="text-gray-600">{t("github.repositories")}</span>
            <span className="font-semibold">{totalRepos}+</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full">
            <div className="h-full w-4/5 bg-primary rounded-full"></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1 text-sm">
            <span className="text-gray-600">{t("github.totalContributions")}</span>
            <span className="font-semibold">{totalContributions?.toLocaleString()}+</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full">
            <div className="h-full w-11/12 bg-primary rounded-full"></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1 text-sm">
            <span className="text-gray-600">{t("github.longestStreak")}</span>
            <span className="font-semibold">
              {longestStreak} {t("github.days")}
            </span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full">
            <div className="h-full w-4/5 bg-orange-500 rounded-full"></div>
          </div>
        </div>

        <div>
          <p className="text-gray-600 mb-1 text-sm">{t("github.mostUsedLanguages")} (5)</p>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden flex">
            <div className="h-full w-[35%] bg-blue-500"></div>
            <div className="h-full w-[25%] bg-yellow-400"></div>
            <div className="h-full w-[20%] bg-teal-500"></div>
            <div className="h-full w-[12%] bg-orange-500"></div>
            <div className="h-full w-[8%] bg-purple-500"></div>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 text-xs text-gray-600">
            <span>TypeScript</span>
            <span>JavaScript</span>
            <span>PHP</span>
            <span>Python</span>
            <span>CSS</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Couleurs de secours pour les langages
function getLanguageColor(index: number): string {
  const colors = [
    "#3572A5", // Python (bleu)
    "#f1e05a", // JavaScript (jaune)
    "#2b7489", // TypeScript (bleu-vert)
    "#e34c26", // HTML (orange)
    "#563d7c", // CSS (violet)
    "#4F5D95", // PHP (violet foncé)
    "#00ADD8", // Go (bleu clair)
    "#b07219", // Java (marron)
    "#dea584", // Rust (beige)
    "#178600", // C# (vert)
  ]
  return colors[index % colors.length]
}
