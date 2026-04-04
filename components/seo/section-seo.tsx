"use client"

import { SITE_CONFIG } from "@/lib/seo-config"
import type { SectionName } from "@/lib/types"
import { useEffect } from "react"

interface SectionSEOProps {
  activeSection: SectionName | null
}

// Configuration des sections pour SEO
const sectionData: Partial<
  Record<SectionName, { title: string; description: string; canonical: string }>
> = {
  about: {
    title: `About | ${SITE_CONFIG.name}`,
    description:
      "Explore my front-end background and approach across React, Next.js and TypeScript.",
    canonical: `${SITE_CONFIG.url}#about`,
  },
  experience: {
    title: `Experience | ${SITE_CONFIG.name}`,
    description: "Review my web development experience and the technical scope I cover.",
    canonical: `${SITE_CONFIG.url}#experience`,
  },
  projects: {
    title: `Projects | ${SITE_CONFIG.name}`,
    description: "Browse the web products, experiments and applications I have built.",
    canonical: `${SITE_CONFIG.url}#projects`,
  },
  contact: {
    title: `Contact | ${SITE_CONFIG.name}`,
    description: "Get in touch for web product work, front-end engineering and consulting.",
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
