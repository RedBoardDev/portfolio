"use client"

import { type Language, useLanguage } from "@/lib/language-context"
import { useCallback, useEffect, useState } from "react"

// Type pour les traductions
type TranslationValue = string | number | boolean | TranslationObject | TranslationValue[]
type TranslationObject = { [key: string]: TranslationValue }

// Cache pour les traductions chargées
const translationCache = new Map<string, TranslationObject>()

// Hook de traduction optimisé
export function useTranslation(namespace = "common") {
  const { language, isLoaded } = useLanguage()
  const [translations, setTranslations] = useState<Record<string, unknown>>({})
  const [loading, setLoading] = useState(true)

  // Fonction pour charger les traductions
  const loadTranslations = useCallback(async (lang: Language, ns: string) => {
    const cacheKey = `${lang}-${ns}`

    // Vérifier le cache d'abord
    if (translationCache.has(cacheKey)) {
      return translationCache.get(cacheKey)!
    }

    try {
      const response = await fetch(`/locales/${lang}/${ns}.json`)
      if (!response.ok) {
        throw new Error(`Failed to load translations for ${lang}/${ns}`)
      }
      const data = await response.json()

      // Mettre en cache
      translationCache.set(cacheKey, data)
      return data
    } catch (error) {
      console.error("Error loading translations:", error)
      return {}
    }
  }, [])

  // Charger les traductions quand la langue ou le namespace change
  useEffect(() => {
    if (!isLoaded) return

    const loadData = async () => {
      setLoading(true)
      const data = await loadTranslations(language, namespace)
      setTranslations(data)
      setLoading(false)
    }

    loadData()
  }, [language, namespace, isLoaded, loadTranslations])

  // Fonction pour obtenir une traduction par clé avec support des clés imbriquées et des tableaux
  const t = useCallback(
    (key: string, fallback?: string): unknown => {
      if (loading || !translations) return fallback || key

      const keys = key.split(".")
      let value: unknown = translations

      for (const k of keys) {
        if (value && typeof value === "object" && k in value) {
          value = value[k]
        } else {
          return fallback || key
        }
      }

      // Retourner la valeur telle quelle (string, array, ou object)
      return value !== undefined ? value : fallback || key
    },
    [translations, loading]
  )

  // Fonction pour formater les dates selon la langue
  const formatDate = useCallback(
    (dateStr: string): string => {
      if (loading || !translations) return dateStr

      // Si la date est juste une année (ex: "2026"), on la retourne telle quelle
      if (dateStr.length === 4) return dateStr

      const date = new Date(dateStr)
      const monthNames = translations.months || {}

      // Récupérer le nom du mois traduit
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
      const monthName = monthNames[monthKey] || monthKey

      return `${monthName} ${date.getFullYear()}`
    },
    [translations, loading]
  )

  // Fonction pour formater les durées selon la langue
  const formatDuration = useCallback(
    (startDate: string, endDate?: string): string => {
      if (loading || !translations) return ""

      const start = new Date(startDate)
      const end = endDate ? new Date(endDate) : new Date()

      const monthsDiff =
        (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())

      const years = Math.floor(monthsDiff / 12)
      const months = monthsDiff % 12

      if (years === 0 && months === 0) {
        return t("ui.duration.lessThanOneMonth", "< 1 mois")
      }

      if (years === 0) {
        return months === 1
          ? t("ui.duration.oneMonth", "1 mois")
          : t("ui.duration.months", "{count} mois").replace("{count}", months.toString())
      }

      if (months === 0) {
        return years === 1
          ? t("ui.duration.oneYear", "1 an")
          : t("ui.duration.years", "{count} ans").replace("{count}", years.toString())
      }

      const yearPlural = years > 1 ? "s" : ""
      return t("ui.duration.yearsAndMonths", "{years} an{yearPlural} {months} mois")
        .replace("{years}", years.toString())
        .replace("{yearPlural}", yearPlural)
        .replace("{months}", months.toString())
    },
    [t, loading, translations]
  )

  return {
    t,
    formatDate,
    formatDuration,
    loading: loading || !isLoaded,
    language,
  }
}
