"use client"

import { githubData } from "@/lib/github"
import { Trans, useLingui } from "@lingui/react/macro"
import { Fragment } from "react"

export function GitHubStats() {
  const { t } = useLingui()
  const { totalContributions, longestStreak, languages } = githubData
  const topLanguages = languages.slice(0, 5)
  const topTotal = topLanguages.reduce((sum, lang) => sum + lang.percentage, 0) || 1

  const items = [
    { value: totalContributions.toLocaleString(), label: t`contributions` },
    { value: longestStreak.toLocaleString(), label: t`day streak` },
  ]

  return (
    <div className="mt-5 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-center text-sm text-muted-foreground">
        {items.map((item, index) => (
          <Fragment key={item.label}>
            {index > 0 && (
              <span aria-hidden="true" className="text-muted-foreground/40">
                ·
              </span>
            )}
            <span>
              <span className="font-semibold tabular-nums text-foreground">{item.value}</span>{" "}
              {item.label}
            </span>
          </Fragment>
        ))}
      </div>

      <div>
        <p className="mb-2 text-sm text-muted-foreground">
          <Trans>Most used languages</Trans>
        </p>
        <div className="flex h-2 overflow-hidden rounded-full bg-muted">
          {topLanguages.map((lang) => (
            <div
              key={lang.name}
              className="h-full"
              style={{
                width: `${(lang.percentage / topTotal) * 100}%`,
                backgroundColor: lang.color,
              }}
            />
          ))}
        </div>
        <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
          {topLanguages.map((lang) => (
            <span key={lang.name} className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: lang.color }} />
              {lang.name}
              <span className="text-muted-foreground/70">{lang.percentage}%</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
