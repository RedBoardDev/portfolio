import type { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Thomas OTT Resume | Software Engineer",
  description:
    "Thomas OTT resume - software engineer specialized in TypeScript, Node.js, Go and React. PDF download available.",
  robots: {
    index: true,
    follow: true,
  },
}

export default function CVPage() {
  // Redirection vers le PDF pour l'affichage direct dans le navigateur
  redirect("/assets/en/Thomas_Ott_Software_Engineer_Resume.pdf")
}
