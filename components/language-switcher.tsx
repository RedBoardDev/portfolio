"use client"

import type { Locale } from "@/lib/i18n"
import { useLanguage } from "@/lib/i18n-provider"
import { useLingui } from "@lingui/react/macro"
import { AnimatePresence, motion } from "framer-motion"
import { Check, ChevronDown } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const { t } = useLingui()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const languages: { code: Locale; label: string; flag: string }[] = [
    { code: "en", label: "English", flag: "\u{1F1EC}\u{1F1E7}" },
    { code: "fr", label: "Français", flag: "\u{1F1EB}\u{1F1F7}" },
    { code: "fi", label: "Suomi", flag: "\u{1F1EB}\u{1F1EE}" },
  ]

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

  const changeLanguage = (lang: Locale) => {
    setLanguage(lang)
    setIsOpen(false)
  }

  const currentLanguage = languages.find((lang) => lang.code === language)

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-[hsl(var(--background))] px-3 text-sm font-medium text-slate-700 shadow-[0_14px_26px_-24px_rgba(15,23,42,0.18)] transition-[color,background-color,border-color,box-shadow] duration-200 hover:border-slate-300 hover:bg-white hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={t`Change language`}
      >
        <span className="text-base">{currentLanguage?.flag}</span>
        <span className="text-sm font-medium">{currentLanguage?.code.toUpperCase()}</span>
        <ChevronDown
          size={14}
          className={`text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.14 }}
            className="absolute right-0 z-50 mt-2 w-[154px] overflow-hidden rounded-xl border border-slate-200 bg-[hsl(var(--background))] p-1.5 shadow-[0_24px_44px_-24px_rgba(15,23,42,0.22)]"
          >
            <div className="space-y-1" role="listbox">
              {languages.map((lang) => {
                const isActive = language === lang.code

                return (
                  <button
                    type="button"
                    key={lang.code}
                    className={`flex w-full items-center gap-2 rounded-[10px] border px-2.5 py-2.5 text-left text-sm transition-[background-color,border-color,color] duration-150 ${
                      isActive
                        ? "border-slate-200 bg-slate-50 text-slate-950"
                        : "border-transparent text-slate-600 hover:border-slate-200/80 hover:bg-slate-50/80 hover:text-slate-950"
                    }`}
                    role="option"
                    aria-selected={isActive}
                    onClick={() => changeLanguage(lang.code)}
                  >
                    <span className="text-base">{lang.flag}</span>
                    <span className="flex-1 font-medium">{lang.label}</span>
                    {isActive ? <Check size={14} className="text-primary" /> : null}
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
