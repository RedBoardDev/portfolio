"use client"

import { useEffect } from "react"
import { SITE_CONFIG } from "@/lib/seo-config"

type SectionName = "about" | "experience" | "projects" | "contact"

interface SectionSEOProps {
  activeSection: SectionName | null
}

// Configuration des sections pour SEO
const sectionData = {
  about: {
    title: `À propos | ${SITE_CONFIG.name}`,
    description:
      "Découvrez mon parcours de développeur full-stack spécialisé en React, Next.js et TypeScript.",
    canonical: `${SITE_CONFIG.url}#about`,
  },
  experience: {
    title: `Expérience | ${SITE_CONFIG.name}`,
    description:
      "Mon expérience professionnelle en développement web et mes compétences techniques.",
    canonical: `${SITE_CONFIG.url}#experience`,
  },
  projects: {
    title: `Projets | ${SITE_CONFIG.name}`,
    description: "Découvrez mes projets de développement web et applications que j'ai réalisés.",
    canonical: `${SITE_CONFIG.url}#projects`,
  },
  contact: {
    title: `Contact | ${SITE_CONFIG.name}`,
    description: "Contactez-moi pour vos projets de développement web et applications.",
    canonical: `${SITE_CONFIG.url}#contact`,
  },
}

export function SectionSEO({ activeSection }: SectionSEOProps) {
  useEffect(() => {
    if (!activeSection) return

    const section = sectionData[activeSection]
    if (section) {
      // Mettre à jour la meta description
      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
        metaDescription.setAttribute("content", section.description)
      }

      // Mettre à jour le lien canonique
      const canonicalLink = document.querySelector('link[rel="canonical"]')
      if (canonicalLink) {
        canonicalLink.setAttribute("href", section.canonical)
      }
    }
  }, [activeSection])

  return null
}
