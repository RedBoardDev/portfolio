import type { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "CV Thomas OTT | Développeur Full-Stack React TypeScript",
  description:
    "Curriculum Vitae de Thomas OTT, développeur full-stack spécialisé en React, Next.js et TypeScript. Téléchargement PDF disponible.",
  robots: {
    index: true,
    follow: true,
  },
}

export default function CVPage() {
  // Redirection vers le PDF pour l'affichage direct dans le navigateur
  redirect("/assets/resume-fr-thomas-ott.pdf")
}
