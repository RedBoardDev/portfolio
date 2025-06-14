"use client"

import { useTranslation } from "@/hooks/use-translation"
import Link from "next/link"
import { useEffect } from "react"

export default function NotFound() {
  const { t, loading } = useTranslation("common")

  // Mettre à jour le titre de la page dynamiquement
  useEffect(() => {
    if (!loading) {
      document.title = t("notFound.title")

      // Mettre à jour la meta description
      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
        metaDescription.setAttribute("content", t("notFound.description"))
      } else {
        const newMeta = document.createElement("meta")
        newMeta.name = "description"
        newMeta.content = t("notFound.description")
        document.head.appendChild(newMeta)
      }
    }
  }, [t, loading])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">
          {loading ? "404" : t("notFound.heading")}
        </h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          {loading ? "Page non trouvée" : t("notFound.subheading")}
        </h2>
        <p className="text-gray-600 mb-8">
          {loading
            ? "La page que vous recherchez n'existe pas ou a été déplacée."
            : t("notFound.message")}
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          {loading ? "Retour à l'accueil" : t("notFound.backHome")}
        </Link>
      </div>
    </div>
  )
}
