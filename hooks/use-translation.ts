"use client"

import { useState, useEffect, useCallback } from "react"
import { useLanguage, type Language } from "@/lib/language-context"

// Cache pour les traductions chargées
const translationCache = new Map<string, Record<string, any>>()

// Hook de traduction optimisé
export function useTranslation(namespace: string = "common") {
  const { language, isLoaded } = useLanguage()
  const [translations, setTranslations] = useState<Record<string, any>>({})
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
        throw new Error(`Failed to load translations: ${response.status}`)
      }

      const data = await response.json()

      // Mettre en cache
      translationCache.set(cacheKey, data)

      return data
    } catch (error) {
      console.warn(`Failed to load translations for ${lang}/${ns}:`, error)

      // Fallback vers l'anglais si pas français, ou objet vide en dernier recours
      if (lang === "fr") {
        try {
          const fallbackResponse = await fetch(`/locales/en/${ns}.json`)
          if (fallbackResponse.ok) {
            const fallbackData = await fallbackResponse.json()
            translationCache.set(cacheKey, fallbackData)
            return fallbackData
          }
        } catch (fallbackError) {
          console.warn("Fallback translation also failed:", fallbackError)
        }
      }

      return {}
    }
  }, [])

  // Effet pour charger les traductions quand la langue ou le namespace change
  useEffect(() => {
    if (!isLoaded) return

    let isMounted = true

    const loadData = async () => {
      setLoading(true)
      const data = await loadTranslations(language, namespace)

      if (isMounted) {
        setTranslations(data)
        setLoading(false)
      }
    }

    loadData()

    return () => {
      isMounted = false
    }
  }, [language, namespace, isLoaded, loadTranslations])

  // Fonction pour obtenir une traduction par clé
  const t = useCallback((key: string, fallback?: string): string => {
    if (loading || !translations) {
      return fallback || key
    }

    // Gérer les clés imbriquées (e.g., "navigation.about")
    const keys = key.split(".")
    let result: any = translations

    for (const k of keys) {
      if (result && typeof result === "object" && k in result) {
        result = result[k]
      } else {
        console.warn(`Translation key not found: ${key} in namespace ${namespace}`)
        return fallback || key
      }
    }

    return typeof result === "string" ? result : fallback || key
  }, [translations, loading, namespace])

  return {
    t,
    language,
    loading,
    isLoaded
  }
}