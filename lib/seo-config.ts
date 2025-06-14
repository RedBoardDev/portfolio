import type { Metadata } from "next"

export const SITE_CONFIG = {
  name: "Thomas OTT",
  title: "Thomas OTT - portfolio",
  description:
    "Développeur full-stack freelance spécialisé en React, Next.js et TypeScript. Découvrez mes projets et compétences.",
  url: "https://thomasott.fr",
  author: {
    name: "Thomas Ott",
    email: "thomas.ott@epitech.eu",
    linkedin: "https://www.linkedin.com/in/thomas--ott",
    github: "https://github.com/RedBoardDev",
  },
  keywords: [
    "Thomas OTT développeur",
    "développeur full-stack Mulhouse",
    "freelance React Mulhouse",
    "développeur Next.js Alsace",
    "TypeScript expert France",
    "développeur web Mulhouse",
    "création site web React",
    "développement application TypeScript",
    "optimisation performance web",
    "SEO développeur technique",
    "portfolio développeur React",
    "développeur JavaScript moderne",
    "intégration API REST",
    "développement responsive",
    "Thomas OTT portfolio",
  ],
  profileImage: "/assets/profile.png",
  logoImage: "/assets/profile.png",
} as const

export const getMetadata = ({
  title,
  description,
  image,
  url,
  keywords = [],
  type = "website",
  publishedTime,
  modifiedTime,
  authors = [SITE_CONFIG.author.name],
}: {
  title?: string
  description?: string
  image?: string
  url?: string
  keywords?: string[]
  type?: "website" | "article"
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
} = {}): Metadata => {
  const metaTitle = title ? `${title} | ${SITE_CONFIG.name}` : SITE_CONFIG.title
  const metaDescription = description || SITE_CONFIG.description
  const _metaImage = image || SITE_CONFIG.profileImage
  const metaUrl = url ? `${SITE_CONFIG.url}${url}` : SITE_CONFIG.url
  const allKeywords = [...SITE_CONFIG.keywords, ...keywords]

  return {
    metadataBase: new URL(SITE_CONFIG.url),
    title: metaTitle,
    description: metaDescription,
    keywords: allKeywords,
    authors: authors.map((name) => ({ name })),
    creator: SITE_CONFIG.author.name,
    publisher: SITE_CONFIG.author.name,

    // Robots and indexing
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    // Additional metadata for better indexing
    alternates: {
      canonical: metaUrl,
      languages: {
        "fr-FR": metaUrl,
        "en-US": metaUrl.replace("/fr/", "/en/"),
      },
    },

    // App specific metadata
    applicationName: SITE_CONFIG.name,
    referrer: "origin-when-cross-origin",

    // Enhanced verification for 2024
    verification: {
      google: process.env.GOOGLE_VERIFICATION || undefined,
      yandex: process.env.YANDEX_VERIFICATION || undefined,
      other: {
        ...(process.env.BING_VERIFICATION && { "msvalidate.01": process.env.BING_VERIFICATION }),
        ...(process.env.FACEBOOK_VERIFICATION && {
          "facebook-domain-verification": process.env.FACEBOOK_VERIFICATION,
        }),
      },
    },

    // Additional structured data references
    other: {
      "theme-color": "#000000",
      "msapplication-TileColor": "#000000",
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "black-translucent",
    },
  }
}

// Enhanced structured data for developer portfolio
export const getPersonSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_CONFIG.url}#person`,
  name: SITE_CONFIG.author.name,
  url: SITE_CONFIG.url,
  email: SITE_CONFIG.author.email,
  image: `${SITE_CONFIG.url}/assets/profile.png`,
  description:
    "Thomas OTT, développeur full-stack freelance spécialisé en React, Next.js et TypeScript. Basé à Mulhouse, Grand Est, France.",
  jobTitle: "Développeur Full-Stack React & TypeScript",
  alternateName: ["Thomas OTT", "Thomas OTT Dev", "Thomas Ott Développeur"],
  worksFor: {
    "@type": "Organization",
    name: "Freelance",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mulhouse",
    addressRegion: "Grand Est",
    addressCountry: "FR",
  },
  sameAs: [
    SITE_CONFIG.author.linkedin,
    SITE_CONFIG.author.github,
    "https://www.malt.fr/profile/thomasott",
  ],
  knowsAbout: [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Web Development",
    "Frontend Development",
    "Backend Development",
    "SEO Optimization",
    "Performance Optimization",
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "Software Developer",
    description: "Full-stack web developer specializing in modern JavaScript frameworks",
    skills: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
  },
})

export const getWebSiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_CONFIG.url}#website`,
  url: SITE_CONFIG.url,
  name: SITE_CONFIG.name,
  description: SITE_CONFIG.description,
  inLanguage: ["fr-FR", "en-US"],
  author: {
    "@id": `${SITE_CONFIG.url}#person`,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_CONFIG.url}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
})

export const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_CONFIG.url}#organization`,
  name: SITE_CONFIG.name,
  url: SITE_CONFIG.url,
  logo: `${SITE_CONFIG.url}/assets/profile.png`,
  description: "Services de développement web professionnel",
  address: {
    "@type": "PostalAddress",
    addressCountry: "FR",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: SITE_CONFIG.author.email,
    contactType: "customer service",
    availableLanguage: ["French", "English"],
  },
  sameAs: [SITE_CONFIG.author.linkedin, SITE_CONFIG.author.github],
  founder: {
    "@id": `${SITE_CONFIG.url}#person`,
  },
  serviceType: [
    "Web Development",
    "Frontend Development",
    "Backend Development",
    "Full-Stack Development",
    "React Development",
    "Next.js Development",
    "TypeScript Development",
    "SEO Optimization",
    "Performance Optimization",
  ],
  areaServed: {
    "@type": "Country",
    name: "France",
  },
})

// FAQ Schema for LLM optimization
export const getFAQSchema = () => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Quelles technologies utilisez-vous pour le développement web ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Je me spécialise dans React, Next.js, TypeScript, Node.js, et PostgreSQL pour créer des applications web modernes et performantes.",
      },
    },
    {
      "@type": "Question",
      name: "Proposez-vous des services d'optimisation SEO ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, j'implémente des stratégies SEO complètes incluant le SEO technique, les données structurées, et l'optimisation pour les moteurs de recherche IA modernes.",
      },
    },
    {
      "@type": "Question",
      name: "Quel type de projets développez-vous ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Je développe des applications web sur mesure, des sites e-commerce, des plateformes SaaS, et des sites corporatifs avec un focus sur la performance et l'expérience utilisateur.",
      },
    },
    {
      "@type": "Question",
      name: "Comment garantissez-vous la performance des sites web ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "J'utilise les fonctionnalités d'optimisation de Next.js, l'optimisation d'images, la minimisation des bundles JavaScript, et je surveille les Core Web Vitals pour assurer d'excellentes performances.",
      },
    },
  ],
})

// Breadcrumb schema generator
export const getBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
})

// Article schema for blog posts
export const getArticleSchema = ({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  keywords = [],
}: {
  title: string
  description: string
  url: string
  image: string
  datePublished: string
  dateModified?: string
  keywords?: string[]
}) => ({
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: title,
  description: description,
  url: url,
  image: {
    "@type": "ImageObject",
    url: image,
    width: 1200,
    height: 630,
  },
  datePublished: datePublished,
  dateModified: dateModified || datePublished,
  author: {
    "@id": `${SITE_CONFIG.url}#person`,
  },
  publisher: {
    "@id": `${SITE_CONFIG.url}#organization`,
  },
  keywords: keywords,
  articleSection: "Technology",
  inLanguage: "fr-FR",
  about: {
    "@type": "Thing",
    name: "Web Development",
  },
})

export default SITE_CONFIG
