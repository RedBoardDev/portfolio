"use client"

import { githubData } from "@/lib/github"
import { useLingui } from "@lingui/react/macro"
import { cloneElement, useEffect, useRef, useState } from "react"
import { ActivityCalendar } from "react-activity-calendar"
import type { Activity, BlockElement } from "react-activity-calendar"

const BLOCK_SIZE = 11
const BLOCK_MARGIN = 3
const CELL_SIZE = BLOCK_SIZE + BLOCK_MARGIN

const GITHUB_THEME = {
  light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
}

const CALENDAR = githubData.calendar as Activity[]

export function GitHubHeatmap() {
  const { t } = useLingui()
  const containerRef = useRef<HTMLDivElement>(null)
  const [visibleData, setVisibleData] = useState<Activity[]>([])

  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    const updateVisibleData = () => {
      const maxWeeks = Math.max(1, Math.floor((element.clientWidth + BLOCK_MARGIN) / CELL_SIZE))
      const daysToShow = maxWeeks * 7
      setVisibleData(daysToShow >= CALENDAR.length ? CALENDAR : CALENDAR.slice(-daysToShow))
    }

    updateVisibleData()
    const observer = new ResizeObserver(updateVisibleData)
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="min-h-[158px]">
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
                <title>{`${activity.count} ${activity.count === 1 ? t`contribution` : t`contributions`} - ${activity.date}`}</title>
              )
            }
          />
          <p className="mt-2 text-right text-xs text-muted-foreground">
            {githubData.lastYearTotal.toLocaleString()} {t`contributions in the last year`}
          </p>
        </>
      )}
    </div>
  )
}
