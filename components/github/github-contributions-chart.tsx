"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Trans, useLingui } from "@lingui/react/macro"
import { useState } from "react"

interface GitHubContributionsProps {
  username?: string
}

const _getContributionColor = (count: number): string => {
  if (count === 0) return "#ebedf0"
  if (count === 1) return "#9be9a8"
  if (count === 2) return "#40c463"
  if (count === 3) return "#30a14e"
  return "#216e39"
}

export function GitHubContributions({
  username: _username = "redBoardDev",
}: GitHubContributionsProps) {
  const { t } = useLingui()
  const [isLoading, _setIsLoading] = useState(false)
  const [error, _setError] = useState<string | null>(null)

  const yearlyContributions = 1247
  const totalContributions = 6969
  const _currentStreak = 258
  const longestStreak = 258
  const totalRepos = 32

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
      <div className="h-20 bg-gray-50 rounded-lg flex items-center justify-center mb-4">
        <span className="text-gray-400 text-sm">
          <Trans>Contributions chart (soon)</Trans>
        </span>
      </div>

      <div className="text-xs text-gray-500 mt-2 text-right">
        <Trans>{yearlyContributions} contributions in the last year</Trans>
      </div>

      <div className="mt-6 space-y-2">
        <div>
          <div className="flex justify-between mb-1 text-sm">
            <span className="text-gray-600">{t`Repositories`}</span>
            <span className="font-semibold">{totalRepos}+</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full">
            <div className="h-full w-4/5 bg-primary rounded-full" />
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1 text-sm">
            <span className="text-gray-600">{t`Total contributions`}</span>
            <span className="font-semibold">{totalContributions.toLocaleString()}+</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full">
            <div className="h-full w-11/12 bg-primary rounded-full" />
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1 text-sm">
            <span className="text-gray-600">{t`Longest streak`}</span>
            <span className="font-semibold">
              <Trans>{longestStreak} days</Trans>
            </span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full">
            <div className="h-full w-4/5 bg-orange-500 rounded-full" />
          </div>
        </div>

        <div>
          <p className="text-gray-600 mb-1 text-sm">
            <Trans>Most used languages</Trans> (5)
          </p>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden flex">
            <div className="h-full w-[35%] bg-blue-500" />
            <div className="h-full w-[25%] bg-yellow-400" />
            <div className="h-full w-[20%] bg-teal-500" />
            <div className="h-full w-[12%] bg-orange-500" />
            <div className="h-full w-[8%] bg-purple-500" />
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
