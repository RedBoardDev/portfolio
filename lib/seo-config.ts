// SEO Configuration for the portfolio
export const seoConfig = {
  // Default metadata for the site
  defaultMetadata: {
    title: "Thomas OTT | Développeur Full-Stack | React, TypeScript, Node.js",
    description:
      "Portfolio professionnel de Thomas OTT, développeur Full-Stack spécialisé en ReactJS, TypeScript, NodeJS et technologies web modernes basé à Mulhouse, France.",
    keywords: [
      "Thomas OTT",
      "développeur full-stack",
      "react.js",
      "typescript",
      "node.js",
      "développeur web mulhouse",
      "freelance développeur",
      "développeur react",
      "blockchain développeur",
    ],
    authors: [{ name: "Thomas OTT", url: "https://thomasott.fr" }],
    creator: "Thomas OTT",
    publisher: "Thomas OTT",
    metadataBase: new URL("https://thomasott.fr"),
    alternates: {
      canonical: "https://thomasott.fr",
      languages: {
        "fr-FR": "https://thomasott.fr",
        "en-US": "https://thomasott.fr/en",
      },
    },
  },
  // Open Graph metadata
  openGraph: {
    title: "Thomas OTT | Développeur Full-Stack | React, TypeScript, Node.js",
    description:
      "Portfolio professionnel de Thomas OTT, développeur Full-Stack spécialisé en ReactJS, TypeScript, NodeJS et technologies web modernes.",
    url: "https://thomasott.fr",
    siteName: "Portfolio de Thomas OTT",
    images: [
      {
        url: "https://thomasott.fr/og-image.png", // Should be created and placed in public folder
        width: 1200,
        height: 630,
        alt: "Thomas OTT - Développeur Full-Stack",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  // Twitter metadata
  twitter: {
    card: "summary_large_image",
    title: "Thomas OTT | Développeur Full-Stack | React, TypeScript, Node.js",
    description:
      "Portfolio professionnel de Thomas OTT, développeur Full-Stack spécialisé en ReactJS, TypeScript, NodeJS et technologies web modernes.",
    creator: "@thomasott",
    images: ["https://thomasott.fr/og-image.png"], // Same as OG image
  },
  // Section-specific metadata
  sections: {
    about: {
      title: "À propos de Thomas OTT | Développeur Full-Stack",
      description:
        "Découvrez mon parcours professionnel et mes compétences en tant que développeur Full-Stack spécialisé en ReactJS, TypeScript et Node.js.",
      canonical: "https://thomasott.fr/#about-section",
    },
    experience: {
      title: "Expérience professionnelle | Thomas OTT | Développeur Full-Stack",
      description:
        "Découvrez mon expérience professionnelle en tant que développeur Full-Stack, incluant mes projets et réalisations techniques.",
      canonical: "https://thomasott.fr/#experience-section",
    },
    projects: {
      title: "Projets | Thomas OTT | Développeur Full-Stack",
      description:
        "Explorez les projets réalisés par Thomas OTT, développeur Full-Stack spécialisé en React, TypeScript et Node.js.",
      canonical: "https://thomasott.fr/#projects-section",
    },
    contact: {
      title: "Contact | Thomas OTT | Développeur Full-Stack Freelance",
      description: "Contactez Thomas OTT, développeur Full-Stack freelance disponible pour vos projets web et mobiles.",
      canonical: "https://thomasott.fr/#contact-section",
    },
  },
  // Organization schema
  organizationSchema: {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Thomas OTT - Développeur Full-Stack",
    description: "Services de développement web et mobile par Thomas OTT, développeur Full-Stack freelance.",
    url: "https://thomasott.fr",
    logo: "https://thomasott.fr/logo.png", // Should be created and placed in public folder
    founder: {
      "@type": "Person",
      name: "Thomas OTT",
      jobTitle: "Développeur Full-Stack",
      description:
        "Développeur Fullstack passionné, spécialisé dans la conception et le développement de solutions web et logicielles innovantes.",
      sameAs: [
        "https://github.com/redBoardDev",
        "https://www.linkedin.com/in/thomas--ott",
        "https://www.malt.fr/profile/thomasott",
      ],
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-48M6u2WCuLb8wBP4kHRBjI5mGEM24f.png",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mulhouse",
      addressRegion: "Grand Est",
      addressCountry: "FR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "ott.thomas68@gmail.com",
      contactType: "customer service",
    },
    knowsLanguage: ["fr", "en"],
    makesOffer: [
      {
        "@type": "Offer",
        name: "Développement Web",
        description: "Sites vitrines, applications web complexes, e-commerce et intégration de designs.",
      },
      {
        "@type": "Offer",
        name: "Maintenance & Support",
        description: "Maintenance évolutive, corrective et support technique pour vos applications existantes.",
      },
      {
        "@type": "Offer",
        name: "Sécurité & Performance",
        description: "Audit de sécurité, optimisation des performances et mise en conformité RGPD.",
      },
      {
        "@type": "Offer",
        name: "Conseil & Formation",
        description: "Accompagnement technique, choix de technologies et formation de vos équipes.",
      },
    ],
  },
  // Person schema
  personSchema: {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Thomas OTT",
    givenName: "Thomas",
    familyName: "OTT",
    jobTitle: "Développeur Full-Stack",
    description:
      "Développeur Fullstack passionné, spécialisé dans la conception et le développement de solutions web et logicielles innovantes.",
    url: "https://thomasott.fr",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-48M6u2WCuLb8wBP4kHRBjI5mGEM24f.png",
    sameAs: [
      "https://github.com/redBoardDev",
      "https://www.linkedin.com/in/thomas--ott",
      "https://www.malt.fr/profile/thomasott",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
    knowsAbout: [
      "Développement Web",
      "React.js",
      "TypeScript",
      "Node.js",
      "Blockchain",
      "JavaScript",
      "Full-Stack Development",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mulhouse",
      addressRegion: "Grand Est",
      addressCountry: "FR",
    },
    email: "ott.thomas68@gmail.com",
  },
}
