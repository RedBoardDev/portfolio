"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { fetchHeatmapData } from "@/lib/github"
import { useLingui } from "@lingui/react/macro"
import { cloneElement, useCallback, useEffect, useRef, useState } from "react"
import { ActivityCalendar } from "react-activity-calendar"
import type { Activity, BlockElement } from "react-activity-calendar"

const BLOCK_SIZE = 11
const BLOCK_MARGIN = 3
const CELL_SIZE = BLOCK_SIZE + BLOCK_MARGIN

const GITHUB_THEME = {
  light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
}

interface GitHubHeatmapProps {
  username: string
}

export function GitHubHeatmap({ username }: GitHubHeatmapProps) {
  const { t } = useLingui()
  const containerRef = useRef<HTMLDivElement>(null)
  const [contributions, setContributions] = useState<Activity[]>([])
  const [visibleData, setVisibleData] = useState<Activity[]>([])
  const [totalLastYear, setTotalLastYear] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    fetchHeatmapData(username)
      .then((data) => {
        setContributions(data.contributions)
        setTotalLastYear(data.totalLastYear)
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false))
  }, [username])

  const updateVisibleData = useCallback(() => {
    if (!containerRef.current || contributions.length === 0) return

    const maxWeeks = Math.max(1, Math.floor(containerRef.current.clientWidth / CELL_SIZE))
    const daysToShow = maxWeeks * 7

    setVisibleData(
      daysToShow >= contributions.length ? contributions : contributions.slice(-daysToShow)
    )
  }, [contributions])

  useEffect(() => {
    updateVisibleData()
    const el = containerRef.current
    if (!el) return

    const observer = new ResizeObserver(updateVisibleData)
    observer.observe(el)
    return () => observer.disconnect()
  }, [updateVisibleData])

  return (
    <div ref={containerRef}>
      {isLoading && <Skeleton className="h-[120px] w-full" />}

      {hasError && (
        <p className="text-sm text-gray-400 text-center py-4">{t`Unable to load GitHub data`}</p>
      )}

      {visibleData.length > 0 && (
        <>
          <ActivityCalendar
            data={visibleData}
            blockSize={BLOCK_SIZE}
            blockMargin={BLOCK_MARGIN}
            blockRadius={2}
            fontSize={11}
            theme={GITHUB_THEME}
            colorScheme="light"
            showTotalCount={false}
            showWeekdayLabels={false}
            labels={{
              legend: { less: String(t`Less`), more: String(t`More`) },
            }}
            renderBlock={(block: BlockElement, activity: Activity) =>
              cloneElement(
                block,
                {},
                <title>{`${activity.count} ${activity.count === 1 ? t`contribution` : t`contributions`} — ${activity.date}`}</title>
              )
            }
          />
          <p className="text-xs text-gray-500 mt-2 text-right">
            {totalLastYear.toLocaleString()} {t`contributions in the last year`}
          </p>
        </>
      )}
    </div>
  )
}
