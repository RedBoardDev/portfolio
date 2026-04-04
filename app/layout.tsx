import type React from "react"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { I18nProvider } from "@/lib/i18n-provider"
import { getMetadata, getOrganizationSchema, getPersonSchema } from "@/lib/seo-config"
import type { Metadata } from "next"
import { IBM_Plex_Mono, Manrope, Space_Grotesk } from "next/font/google"
import Script from "next/script"

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-mono",
})

export const metadata: Metadata = getMetadata()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${manrope.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable}`}
    >
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
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-slate-950 focus:px-4 focus:py-3 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>
        <I18nProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
            {children}
          </ThemeProvider>
        </I18nProvider>

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
                "Front-end developer specialized in React, Next.js and TypeScript. Explore my projects, UI approach and production-grade engineering standards.",
              author: {
                "@type": "Person",
                name: "Thomas OTT",
              },
              inLanguage: ["en-US", "fr-FR"],
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
