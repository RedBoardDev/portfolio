"use client"

import { useEffect } from "react"
import { seoConfig } from "@/lib/seo-config"

type SectionName = "about" | "experience" | "projects" | "contact"

interface SectionSEOProps {
  activeSection: SectionName | null
}

export function SectionSEO({ activeSection }: SectionSEOProps) {
  useEffect(() => {
    if (!activeSection) return

    // Update meta description and canonical link only, not the title
    const sectionData = seoConfig.sections[activeSection]
    if (sectionData) {
      // Ne pas modifier le titre du document
      // document.title = sectionData.title

      // Mettre à jour la meta description
      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
        metaDescription.setAttribute("content", sectionData.description)
      }

      // Mettre à jour le lien canonique
      const canonicalLink = document.querySelector('link[rel="canonical"]')
      if (canonicalLink) {
        canonicalLink.setAttribute("href", sectionData.canonical)
      }
    }
  }, [activeSection])

  return null
}
