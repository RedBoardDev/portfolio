"use client"

import { type ReactNode, createContext, useContext, useEffect, useState } from "react"

// Types de langues disponibles
export type Language = "fr" | "en"

// Interface du contexte de langue
interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  isLoaded: boolean
}

const defaultContext: LanguageContextType = {
  language: "fr",
  setLanguage: () => {},
  isLoaded: true,
}

// Création du contexte
const LanguageContext = createContext<LanguageContextType>(defaultContext)

// Hook personnalisé pour accéder facilement au contexte
export const useLanguage = () => useContext(LanguageContext)

// Props du provider
interface LanguageProviderProps {
  children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>("fr")

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
  }

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    const storedLanguage = localStorage.getItem("preferred-language")
    if (storedLanguage === "fr" || storedLanguage === "en") {
      setLanguageState(storedLanguage)
      return
    }

    const browserLanguages = navigator.languages?.length
      ? navigator.languages
      : [navigator.language]
    const detectedLanguage = browserLanguages.some((entry) => entry.toLowerCase().startsWith("fr"))
      ? "fr"
      : "en"

    setLanguageState(detectedLanguage)
    localStorage.setItem("preferred-language", detectedLanguage)
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    localStorage.setItem("preferred-language", language)
    document.documentElement.lang = language
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isLoaded: true }}>
      {children}
    </LanguageContext.Provider>
  )
}
