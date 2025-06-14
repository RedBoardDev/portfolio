"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Types de langues disponibles
export type Language = "fr" | "en"

// Interface du contexte de langue
interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  isLoaded: boolean
}

// Valeurs par défaut du contexte
const defaultContext: LanguageContextType = {
  language: "en",
  setLanguage: () => {},
  isLoaded: false,
}

// Création du contexte
const LanguageContext = createContext<LanguageContextType>(defaultContext)

// Hook personnalisé pour accéder facilement au contexte
export const useLanguage = () => useContext(LanguageContext)

// Props du provider
interface LanguageProviderProps {
  children: ReactNode
}

// Provider du contexte de langue
export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>("en")
  const [isLoaded, setIsLoaded] = useState(false)

  // Fonction pour changer de langue
  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    // Sauvegarder la préférence de langue dans localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("preferred-language", lang)
    }
  }

  // Effect pour initialiser la langue en fonction de localStorage ou navigator.language
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Vérifier localStorage d'abord
      const storedLanguage = localStorage.getItem("preferred-language") as Language | null

      if (storedLanguage && (storedLanguage === "fr" || storedLanguage === "en")) {
        setLanguageState(storedLanguage)
      } else {
        // Utiliser la langue du navigateur comme fallback
        const browserLang = navigator.language.toLowerCase()
        // Si c'est français (fr, fr-FR, fr-CA, etc.), utiliser français, sinon anglais
        const detectedLang: Language = browserLang.startsWith("fr") ? "fr" : "en"
        setLanguageState(detectedLang)
        localStorage.setItem("preferred-language", detectedLang)
      }

      setIsLoaded(true)
    }
  }, [])

  // Pendant le chargement, ne pas rendre les enfants pour éviter l'hydration mismatch
  if (!isLoaded) {
    return null
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isLoaded }}>
      {children}
    </LanguageContext.Provider>
  )
}
