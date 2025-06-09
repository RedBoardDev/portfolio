"use client"

import { useLanguage, type Language } from "@/contexts/language-context"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check } from "lucide-react"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Options de langue disponibles avec leurs drapeaux
  const languages: { code: Language; label: string; flag: string }[] = [
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "en", label: "English", flag: "🇬🇧" },
  ]

  // Fermer le menu si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Fonction pour changer de langue
  const changeLanguage = (lang: Language) => {
    setLanguage(lang)
    setIsOpen(false)
  }

  // Trouver la langue actuelle
  const currentLanguage = languages.find((lang) => lang.code === language)

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-primary hover:bg-gray-50/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Changer de langue"
      >
        <span className="text-base mr-1.5">{currentLanguage?.flag}</span>
        <span className="text-sm font-medium hidden md:inline">{currentLanguage?.code.toUpperCase()}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-1 w-32 rounded-md bg-white/90 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 overflow-hidden"
            style={{ backdropFilter: "none", WebkitBackdropFilter: "none" }}
          >
            <div className="py-1" role="listbox">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  className={`
                    flex items-center w-full px-3 py-2 text-sm text-left
                    ${language === lang.code ? "bg-gray-50/80 text-primary font-medium" : "text-gray-700"}
                    hover:bg-gray-50/80 transition-colors
                  `}
                  role="option"
                  aria-selected={language === lang.code}
                  onClick={() => changeLanguage(lang.code)}
                >
                  <span className="text-base mr-2">{lang.flag}</span>
                  {lang.label}
                  {language === lang.code && <Check size={14} className="ml-auto" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
