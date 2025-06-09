"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Types de langues disponibles
export type Language = "fr" | "en"

// Interface du contexte de langue
interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
}

// Valeurs par défaut du contexte
const defaultContext: LanguageContextType = {
  language: "en",
  setLanguage: () => {},
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
  // État pour stocker la langue actuelle
  const [language, setLanguageState] = useState<Language>("en")
  // État pour suivre si le composant est monté (pour éviter les problèmes de hydration)
  const [mounted, setMounted] = useState(false)

  // Fonction pour changer de langue
  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    // Sauvegarder la préférence de langue dans localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("preferredLanguage", lang)
    }
  }

  // Effect pour initialiser la langue en fonction de localStorage ou navigator.language
  useEffect(() => {
    setMounted(true)
    const storedLanguage = localStorage.getItem("preferredLanguage") as Language | null

    if (storedLanguage && (storedLanguage === "fr" || storedLanguage === "en")) {
      setLanguageState(storedLanguage)
    } else {
      // Utiliser la langue du navigateur comme fallback
      const browserLang = navigator.language.substring(0, 2).toLowerCase()
      setLanguageState(browserLang === "fr" ? "fr" : "en")
    }
  }, [])

  // Pendant le rendu côté serveur ou au premier rendu, utiliser la langue par défaut
  if (!mounted) {
    return <>{children}</>
  }

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>
}
