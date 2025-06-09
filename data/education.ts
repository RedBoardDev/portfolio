export interface Education {
  institution: string
  logo?: string
  degree: string
  field: string
  startDate: string // Format: "YYYY-MM"
  endDate: string // Format: "YYYY-MM" ou "YYYY" pour les dates futures
  location: string
  description?: string
  skills?: string[]
  url?: string // Ajout du lien vers le site de l'établissement
}

// Fonction pour formater les dates au format d'affichage
export const formatDisplayDate = (dateStr: string): string => {
  // Si la date est juste une année (ex: "2026"), on la retourne telle quelle
  if (dateStr.length === 4) return dateStr

  const date = new Date(dateStr)
  const months = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."]
  return `${months[date.getMonth()]} ${date.getFullYear()}`
}

export const educations: Education[] = [
  {
    institution: "EPITECH - European Institute of Technology",
    logo: "/placeholder.svg?height=64&width=64",
    degree: "Master",
    field: "Technologies de l'information",
    startDate: "2021-10",
    endDate: "2026",
    location: "Mulhouse, France",
    description: "Formation d'expert en technologies de l'information avec une pédagogie par projets.",
    skills: ["Développement web", "Algorithmique", "DevOps", "Architecture logicielle"],
    url: "https://www.epitech.eu/",
  },
  {
    institution: "Laurea University of Applied Sciences",
    logo: "/placeholder.svg?height=64&width=64",
    degree: "Bachelor's degree",
    field: "Business Information Technology",
    startDate: "2024-08",
    endDate: "2025-06",
    location: "Helsinki, Finlande",
    description: "Année d'échange en Finlande, permettant d'acquérir une expérience internationale.",
    skills: ["Management de projet", "Business Intelligence", "UX/UI Design"],
    url: "https://www.laurea.fi/en/",
  },
  {
    institution: "Lycée Louis Armand - Mulhouse",
    logo: "/placeholder.svg?height=64&width=64",
    degree: "Baccalauréat",
    field: "Ingénierie informatique",
    startDate: "2018-09",
    endDate: "2021-07",
    location: "Mulhouse, France",
    description:
      "Formation initiale en ingénierie informatique avec une approche pratique des technologies de l'information.",
    skills: ["Programmation", "Réseaux", "Systèmes d'information"],
    url: "https://www.lycee-louis-armand.com/",
  },
]
