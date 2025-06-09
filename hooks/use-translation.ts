"use client"

import { useLanguage } from "@/contexts/language-context"
import { translations } from "@/locales"

export function useTranslation() {
  const { language } = useLanguage()

  // Fonction pour obtenir une traduction par clé
  const t = (key: string) => {
    // Split la clé pour accéder aux objets imbriqués (e.g., "about.title")
    const keys = key.split(".")
    let result: any = translations[language]

    // Parcourir l'objet de traduction en suivant les clés
    for (const k of keys) {
      if (result && k in result) {
        result = result[k]
      } else {
        console.warn(`Translation key not found: ${key}`)
        return key
      }
    }

    return result
  }

  return { t, language }
}
