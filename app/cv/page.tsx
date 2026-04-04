import type { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Thomas OTT Resume | Front-End React TypeScript Developer",
  description:
    "Thomas OTT resume, front-end developer specialized in React, Next.js and TypeScript. PDF download available.",
  robots: {
    index: true,
    follow: true,
  },
}

export default function CVPage() {
  // Redirection vers le PDF pour l'affichage direct dans le navigateur
  redirect("/assets/en/Thomas_Ott_Software_Engineer_Resume.pdf")
}
