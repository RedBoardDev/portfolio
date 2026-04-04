"use client"

import { type Locale, defaultLocale, i18n, loadCatalog, locales } from "@/lib/i18n"
import { I18nProvider as LinguiI18nProvider } from "@lingui/react"
import { type ReactNode, createContext, useContext, useEffect, useState } from "react"

interface I18nContextType {
  language: Locale
  setLanguage: (lang: Locale) => void
}

const I18nContext = createContext<I18nContextType>({
  language: defaultLocale,
  setLanguage: () => {},
})

export const useLanguage = () => useContext(I18nContext)

function isLocale(value: string | null): value is Locale {
  return locales.includes(value as Locale)
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Locale>(defaultLocale)
  const [isReady, setIsReady] = useState(true)

  const setLanguage = async (lang: Locale) => {
    await loadCatalog(lang)
    setLanguageState(lang)
  }

  useEffect(() => {
    if (typeof window === "undefined") return

    const stored = localStorage.getItem("preferred-language")
    let detected: Locale = defaultLocale

    if (isLocale(stored)) {
      detected = stored
    } else {
      const browserLanguages = navigator.languages?.length
        ? navigator.languages
        : [navigator.language]

      if (browserLanguages.some((l) => l.toLowerCase().startsWith("fi"))) {
        detected = "fi"
      } else if (browserLanguages.some((l) => l.toLowerCase().startsWith("fr"))) {
        detected = "fr"
      } else if (browserLanguages.some((l) => l.toLowerCase().startsWith("en"))) {
        detected = "en"
      }

      localStorage.setItem("preferred-language", detected)
    }

    if (detected === defaultLocale) {
      setLanguageState(detected)
      setIsReady(true)
      return
    }

    loadCatalog(detected).then(() => {
      setLanguageState(detected)
      setIsReady(true)
    })
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    localStorage.setItem("preferred-language", language)
    document.documentElement.lang = language
  }, [language])

  if (!isReady) return null

  return (
    <I18nContext.Provider value={{ language, setLanguage }}>
      <LinguiI18nProvider i18n={i18n}>{children}</LinguiI18nProvider>
    </I18nContext.Provider>
  )
}
