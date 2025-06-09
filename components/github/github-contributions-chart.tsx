"use client"

import { useEffect, useState, useRef } from "react"
import {
  fetchGitHubContributions,
  fetchGitHubStats,
  fetchGitHubLanguages,
  fetchTotalContributions,
  type GitHubContribution,
  type GitHubStats,
  type GitHubLanguage,
  getLongestStreak,
} from "@/lib/api/github"
import { Skeleton } from "@/components/ui/skeleton"

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
  const containerRef = useRef<HTMLDivElement>(null)
  const graphRef = useRef<HTMLDivElement>(null)
  const [contributions, setContributions] = useState<GitHubContribution[] | null>(null)
  const [stats, setStats] = useState<GitHubStats | null>(null)
  const [languages, setLanguages] = useState<GitHubLanguage[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [yearlyContributions, setYearlyContributions] = useState(0)
  const [totalContributions, setTotalContributions] = useState(0)
  const [longestStreak, setLongestStreak] = useState(0)

  useEffect(() => {
    async function loadGitHubData() {
      try {
        setIsLoading(true)

        // Charger les contributions de l'année
        const contributionsData = await fetchGitHubContributions(username)
        setContributions(contributionsData)
        setYearlyContributions(contributionsData.reduce((total, day) => total + day.count, 0))
        setLongestStreak(getLongestStreak(contributionsData))

        // Charger le nombre total de contributions
        const totalContribsData = await fetchTotalContributions(username)
        setTotalContributions(totalContribsData)

        // Charger les statistiques générales
        const statsData = await fetchGitHubStats(username)
        setStats(statsData)

        // Charger les langages
        const languagesData = await fetchGitHubLanguages(username)
        setLanguages(languagesData)

        setError(null)
      } catch (err) {
        setError("Impossible de charger les données GitHub")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    loadGitHubData()
  }, [username])

  useEffect(() => {
    if (!containerRef.current || !contributions || isLoading) return

    const container = containerRef.current
    container.innerHTML = "" // Clear previous content

    // Create graph container
    const graph = document.createElement("div")
    graph.className = "grid grid-cols-[repeat(53,1fr)] gap-1 overflow-x-auto"
    graph.setAttribute("role", "img")
    graph.setAttribute("aria-label", "Graphique des contributions GitHub sur la dernière année")
    graphRef.current = graph

    // Create weeks
    contributions.forEach((day, index) => {
      if (index % 7 === 0) {
        const weekContainer = document.createElement("div")
        weekContainer.className = "grid grid-rows-7 gap-1"
        graph.appendChild(weekContainer)

        // Create days for this week
        for (let i = 0; i < 7 && index + i < contributions.length; i++) {
          const dayData = contributions[index + i]
          const dayEl = document.createElement("div")
          dayEl.className = "w-2.5 h-2.5 rounded-sm"
          dayEl.style.backgroundColor = getContributionColor(dayData.count)

          // Format date for tooltip
          const date = new Date(dayData.date)
          const formattedDate = date.toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })

          dayEl.title = `${dayData.count} contribution${dayData.count !== 1 ? "s" : ""} le ${formattedDate}`
          dayEl.setAttribute(
            "aria-label",
            `${dayData.count} contribution${dayData.count !== 1 ? "s" : ""} le ${formattedDate}`,
          )
          weekContainer.appendChild(dayEl)
        }
      }
    })

    container.appendChild(graph)

    // Create legend
    const legend = document.createElement("div")
    legend.className = "flex items-center justify-end gap-2 mt-4 text-xs text-gray-600"
    legend.innerHTML = `
    <span>Moins</span>
    ${[0, 1, 2, 3, 4]
      .map(
        (count) => `
      <div class="w-2.5 h-2.5 rounded-sm" style="background-color: ${getContributionColor(count)}" aria-label="${count} contributions" title="${count} contributions"></div>
    `,
      )
      .join("")}
    <span>Plus</span>
  `
    container.appendChild(legend)

    // Scroll to the end (most recent contributions)
    setTimeout(() => {
      if (container && graph) {
        container.scrollLeft = graph.scrollWidth - container.clientWidth
      }
    }, 100)
  }, [contributions, isLoading])

  useEffect(() => {
    if (!containerRef.current || !graphRef.current) return

    const handleResize = () => {
      if (containerRef.current && graphRef.current) {
        containerRef.current.scrollLeft = graphRef.current.scrollWidth - containerRef.current.clientWidth
      }
    }

    // Initial scroll
    handleResize()

    // Add resize listener
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [contributions])

  if (isLoading) {
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
      <div ref={containerRef} className="w-full overflow-x-auto py-1 scrollbar-hide" />

      {/* Yearly contributions text */}
      {contributions && (
        <div className="text-xs text-gray-500 mt-2 text-right">
          {yearlyContributions} contributions dans la dernière année
        </div>
      )}

      <div className="mt-6 space-y-2">
        <div>
          <div className="flex justify-between mb-1 text-sm">
            <span className="text-gray-600">Repositories</span>
            <span className="font-semibold">{stats?.totalRepos || "32"}+</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full">
            <div className="h-full w-4/5 bg-primary rounded-full"></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1 text-sm">
            <span className="text-gray-600">Contributions</span>
            <span className="font-semibold">{totalContributions || "1200"}+</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full">
            <div className="h-full w-11/12 bg-primary rounded-full"></div>
          </div>
        </div>

        <div>
          <p className="text-gray-600 mb-1 text-sm">Langages les plus utilisés ({languages?.length || 0})</p>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden flex">
            {languages ? (
              languages.slice(0, 5).map((lang, index) => (
                <div
                  key={index}
                  className="h-full"
                  style={{
                    width: `${lang.percentage}%`,
                    backgroundColor: lang.color || getLanguageColor(index),
                  }}
                  title={`${lang.name}: ${lang.percentage.toFixed(1)}%`}
                ></div>
              ))
            ) : (
              <>
                <div className="h-full w-[35%] bg-blue-500"></div>
                <div className="h-full w-[25%] bg-yellow-400"></div>
                <div className="h-full w-[20%] bg-teal-500"></div>
                <div className="h-full w-[12%] bg-orange-500"></div>
                <div className="h-full w-[8%] bg-purple-500"></div>
              </>
            )}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 text-xs text-gray-600">
            {languages ? (
              languages.slice(0, 5).map((lang, index) => <span key={index}>{lang.name}</span>)
            ) : (
              <>
                <span>PHP</span>
                <span>JavaScript</span>
                <span>TypeScript</span>
                <span>HTML</span>
                <span>CSS</span>
              </>
            )}
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
