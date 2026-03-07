"use client"

import { type Language, useLanguage } from "@/lib/language-context"
import {
  type TranslationNamespace,
  type TranslationRecord,
  type TranslationValue,
  translationCatalog,
} from "@/lib/translations"
import { useCallback } from "react"

const isTranslationRecord = (value: TranslationValue | undefined): value is TranslationRecord =>
  typeof value === "object" && value !== null && !Array.isArray(value)

const asString = (value: TranslationValue | undefined, fallback: string): string =>
  typeof value === "string" ? value : fallback

const getNestedValue = (record: TranslationRecord, key: string): TranslationValue | undefined => {
  const keys = key.split(".")
  let current: TranslationValue | undefined = record

  for (const item of keys) {
    if (!isTranslationRecord(current) || !(item in current)) {
      return undefined
    }
    current = current[item]
  }

  return current
}

export function useTranslation(namespace: TranslationNamespace = "common") {
  const { language } = useLanguage()
  const translations = translationCatalog[language] ?? translationCatalog.fr
  const namespaceTranslations = translations[namespace]

  const t = useCallback(
    (key: string, fallback?: string): TranslationValue => {
      const value = getNestedValue(namespaceTranslations, key)
      return value ?? fallback ?? key
    },
    [namespaceTranslations]
  )

  const formatDate = useCallback(
    (dateStr: string): string => {
      if (dateStr.length === 4) return dateStr

      const date = new Date(dateStr)
      const monthNamesValue = getNestedValue(namespaceTranslations, "months")
      const monthNames = isTranslationRecord(monthNamesValue) ? monthNamesValue : {}
      const monthKeys = [
        "jan",
        "feb",
        "mar",
        "apr",
        "may",
        "jun",
        "jul",
        "aug",
        "sep",
        "oct",
        "nov",
        "dec",
      ]
      const monthKey = monthKeys[date.getMonth()]
      const monthName = asString(monthNames[monthKey], monthKey)

      return `${monthName} ${date.getFullYear()}`
    },
    [namespaceTranslations]
  )

  const formatDuration = useCallback(
    (startDate: string, endDate?: string): string => {
      const start = new Date(startDate)
      const end = endDate ? new Date(endDate) : new Date()

      const monthsDiff =
        (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())

      const years = Math.floor(monthsDiff / 12)
      const months = monthsDiff % 12

      if (years === 0 && months === 0) {
        return asString(t("ui.duration.lessThanOneMonth", "< 1 month"), "< 1 month")
      }

      if (years === 0) {
        return months === 1
          ? asString(t("ui.duration.oneMonth", "1 month"), "1 month")
          : asString(t("ui.duration.months", "{count} months"), "{count} months").replace(
              "{count}",
              months.toString()
            )
      }

      if (months === 0) {
        return years === 1
          ? asString(t("ui.duration.oneYear", "1 year"), "1 year")
          : asString(t("ui.duration.years", "{count} years"), "{count} years").replace(
              "{count}",
              years.toString()
            )
      }

      const yearPlural = years > 1 ? "s" : ""
      return asString(
        t("ui.duration.yearsAndMonths", "{years} year{yearPlural} {months} months"),
        "{years} year{yearPlural} {months} months"
      )
        .replace("{years}", years.toString())
        .replace("{yearPlural}", yearPlural)
        .replace("{months}", months.toString())
    },
    [t]
  )

  return {
    t,
    formatDate,
    formatDuration,
    loading: false,
    language,
  }
}
