import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/lib/language-context"
import { seoConfig } from "@/lib/seo-config"
import Script from "next/script"
// Add import for WebVitalsReporter
import { WebVitalsReporter } from "@/components/seo/web-vitals-reporter"

const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Optimize font display
  variable: "--font-inter", // For Tailwind variable
})

// Mettre à jour le titre par défaut dans les metadata
export const metadata: Metadata = {
  ...seoConfig.defaultMetadata,
  title: "Thomas OTT | Développeur fullstack",
  openGraph: seoConfig.openGraph,
  twitter: seoConfig.twitter,
  verification: {
    google: "google-site-verification-code", // Add your real verification code when you have it
  },
  alternates: {
    canonical: "https://thomasott.fr",
    languages: {
      "fr-FR": "https://thomasott.fr",
      "en-US": "https://thomasott.fr/en",
    },
  },
    generator: 'Next.js'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <head>
        <meta name="theme-color" content="#3b82f6" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(seoConfig.organizationSchema) }}
        />
        <Script
          id="schema-person"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(seoConfig.personSchema) }}
        />

        {/* Web Vitals Reporter */}
        <WebVitalsReporter />
      </body>
    </html>
  )
}
