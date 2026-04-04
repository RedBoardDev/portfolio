"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { fetchStatsData } from "@/lib/github"
import type { StatsData } from "@/lib/github"
import { Trans, useLingui } from "@lingui/react/macro"
import { useEffect, useState } from "react"

interface GitHubStatsProps {
  username: string
}

export function GitHubStats({ username }: GitHubStatsProps) {
  const { t } = useLingui()
  const [stats, setStats] = useState<StatsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchStatsData(username)
      .then(setStats)
      .catch((err) => console.error("Failed to fetch GitHub stats:", err))
      .finally(() => setIsLoading(false))
  }, [username])

  if (isLoading) {
    return (
      <div className="mt-6 space-y-3">
        {Array.from({ length: 4 }, (_, i) => (
          <Skeleton key={i} className="h-8 w-full" />
        ))}
      </div>
    )
  }

  if (!stats) return null

  const { totalRepos, totalContributions, longestStreak, languages } = stats
  const topLanguages = languages.slice(0, 5)
  const topTotal = topLanguages.reduce((sum, l) => sum + l.percentage, 0)

  return (
    <div className="mt-6 space-y-2">
      <StatBar label={t`Repositories`} value={`${totalRepos}+`} fill={(totalRepos / 40) * 100} />
      <StatBar
        label={t`Total contributions`}
        value={`${totalContributions.toLocaleString()}+`}
        fill={(totalContributions / 8000) * 100}
      />
      <StatBar
        label={t`Longest streak`}
        value={<Trans>{longestStreak} days</Trans>}
        fill={(longestStreak / 365) * 100}
        barColor="bg-orange-500"
      />

      <div className="group/langs">
        <p className="text-gray-600 mb-1 text-sm">
          <Trans>Most used languages</Trans> ({topLanguages.length})
        </p>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden flex cursor-pointer">
          {topLanguages.map((lang) => (
            <div
              key={lang.name}
              className="h-full"
              title={`${lang.name} — ${lang.percentage}%`}
              style={{
                width: `${(lang.percentage / topTotal) * 100}%`,
                backgroundColor: lang.color,
              }}
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 text-xs text-gray-600 max-h-0 overflow-hidden opacity-0 transition-all duration-200 group-hover/langs:max-h-20 group-hover/langs:opacity-100">
          {topLanguages.map((lang) => (
            <span key={lang.name} className="flex items-center gap-1">
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{ backgroundColor: lang.color }}
              />
              {lang.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function StatBar({
  label,
  value,
  fill,
  barColor = "bg-primary",
}: {
  label: string
  value: React.ReactNode
  fill: number
  barColor?: string
}) {
  return (
    <div>
      <div className="flex justify-between mb-1 text-sm">
        <span className="text-gray-600">{label}</span>
        <span className="font-semibold">{value}</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full">
        <div
          className={`h-full ${barColor} rounded-full`}
          style={{ width: `${Math.min(100, fill)}%` }}
        />
      </div>
    </div>
  )
}
