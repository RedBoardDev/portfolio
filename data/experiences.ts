export interface Position {
  key: string // Clé pour la traduction
  startDate: string // Format: "YYYY-MM"
  endDate?: string // Format: "YYYY-MM", optional (if not provided, means "Present")
  skills: string[]
}

export interface Experience {
  key: string // Clé pour la traduction
  logo: string
  url?: string // URL du site web de l'entreprise
  positions: Position[]
}

// Calculate duration between two dates
export const calculateDuration = (startDate: string, endDate?: string): string => {
  const start = new Date(startDate)
  const end = endDate ? new Date(endDate) : new Date()

  const monthsDiff = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())

  const years = Math.floor(monthsDiff / 12)
  const months = monthsDiff % 12

  if (years === 0 && months === 0) return "< 1 mois"
  if (years === 0) return `${months} mois`
  if (months === 0) return `${years} an${years > 1 ? "s" : ""}`
  return `${years} an${years > 1 ? "s" : ""} ${months} mois`
}

// Calculate total duration across all positions for a company
export const calculateTotalDuration = (positions: Position[]): string => {
  // Sort positions by start date
  const sortedPositions = [...positions].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
  )

  // Get earliest start date and latest end date
  const earliestStart = sortedPositions[0].startDate

  // Find the latest end date, or use current date if any position is ongoing
  let latestEnd: string | undefined
  for (const pos of sortedPositions) {
    if (!pos.endDate) {
      latestEnd = undefined // If any position is current, the overall experience is ongoing
      break
    }
    if (!latestEnd || new Date(pos.endDate) > new Date(latestEnd)) {
      latestEnd = pos.endDate
    }
  }

  return calculateDuration(earliestStart, latestEnd)
}

export const experiences: Experience[] = [
  {
    key: "akord",
    logo: "/assets/logos/companies/akord.jpeg",
    url: "https://akord.fr",
    positions: [
      {
        key: "fullStackDeveloper",
        startDate: "2023-09",
        skills: ["DevOps", "AWS Lambda", "Node.js", "React", "TypeScript", "Docker"],
      },
      {
        key: "developer",
        startDate: "2023-02",
        endDate: "2023-08",
        skills: ["DevOps", "AWS Lambda", "JavaScript", "React"],
      },
    ],
  },
  {
    key: "epitech",
    logo: "/assets/logos/companies/epitech.jpeg",
    url: "https://www.epitech.eu/",
    positions: [
      {
        key: "aer",
        startDate: "2022-03",
        endDate: "2023-02",
        skills: ["Adaptabilité", "Gestion de projet", "Pédagogie"],
      },
    ],
  },
]
