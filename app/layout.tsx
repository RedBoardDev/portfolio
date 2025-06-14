import type React from "react"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/lib/language-context"
import { getMetadata, getOrganizationSchema, getPersonSchema } from "@/lib/seo-config"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"

const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Optimize font display
  variable: "--font-inter", // For Tailwind variable
})

export const metadata: Metadata = getMetadata()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <head>
        <meta name="theme-color" content="#3b82f6" />
        <link rel="icon" href="/assets/favicon.ico" sizes="any" />
        <link rel="icon" href="/assets/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/assets/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="alternate" hrefLang="fr" href="https://thomasott.fr" />
        <link rel="alternate" hrefLang="en" href="https://thomasott.fr" />
        <link rel="alternate" hrefLang="x-default" href="https://thomasott.fr" />
      </head>
      <body className={inter.className}>
        <LanguageProvider>
          <ThemeProvider attribute="class" defaultTheme="light">
            {children}
          </ThemeProvider>
        </LanguageProvider>

        {/* Structured Data for SEO */}
        <Script
          id="schema-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getOrganizationSchema()) }}
        />
        <Script
          id="schema-person"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getPersonSchema()) }}
        />
        <Script
          id="schema-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Thomas OTT - portfolio",
              url: "https://thomasott.fr",
              description:
                "Développeur full-stack freelance spécialisé en React, Next.js et TypeScript. Découvrez mes projets et compétences.",
              author: {
                "@type": "Person",
                name: "Thomas OTT",
              },
              inLanguage: ["fr-FR", "en-US"],
              potentialAction: {
                "@type": "SearchAction",
                target: "https://thomasott.fr#{search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </body>
    </html>
  )
}
