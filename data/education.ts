export interface Education {
  key: string // Clé pour la traduction
  logo?: string
  startDate: string // Format: "YYYY-MM"
  endDate: string // Format: "YYYY-MM" ou "YYYY" pour les dates futures
  url?: string // Lien vers le site de l'établissement
}

// Fonction pour formater les dates au format d'affichage
export const formatDisplayDate = (dateStr: string): string => {
  // Si la date est juste une année (ex: "2026"), on la retourne telle quelle
  if (dateStr.length === 4) return dateStr

  const date = new Date(dateStr)
  const months = [
    "janv.",
    "févr.",
    "mars",
    "avr.",
    "mai",
    "juin",
    "juil.",
    "août",
    "sept.",
    "oct.",
    "nov.",
    "déc.",
  ]
  return `${months[date.getMonth()]} ${date.getFullYear()}`
}

export const educations: Education[] = [
  {
    key: "epitech",
    logo: "/assets/logos/companies/epitech.jpeg",
    startDate: "2021-10",
    endDate: "2026",
    url: "https://www.epitech.eu/",
  },
  {
    key: "laurea",
    logo: "/assets/logos/education/laurea.jpeg",
    startDate: "2024-08",
    endDate: "2025-06",
    url: "https://www.laurea.fi/en/",
  },
  {
    key: "lycee",
    logo: "/assets/logos/education/lycee-louis-armand.jpeg",
    startDate: "2018-09",
    endDate: "2021-07",
    url: "https://www.louis-armand-mulhouse.fr/",
  },
]
