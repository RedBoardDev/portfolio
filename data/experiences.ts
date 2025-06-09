export interface Position {
  title: string
  type: string
  startDate: string // Format: "YYYY-MM"
  endDate?: string // Format: "YYYY-MM", optional (if not provided, means "Present")
  location: string
  skills: string[]
  description?: string[]
}

export interface Experience {
  company: string
  logo: string
  positions: Position[]
}

// Format date to display format
const formatDisplayDate = (dateStr: string): string => {
  const date = new Date(dateStr)
  const months = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."]
  return `${months[date.getMonth()]} ${date.getFullYear()}`
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
    company: "AkorD",
    logo: "/placeholder.svg?height=64&width=64",
    positions: [
      {
        title: "Développeur Full Stack",
        type: "Freelance",
        startDate: "2023-09",
        location: "À distance",
        skills: ["DevOps", "AWS Lambda", "Node.js", "React", "TypeScript", "Docker"],
        description: [
          "Développement et maintenance d'applications web modernes",
          "Conception et implémentation de nouvelles fonctionnalités",
          "Optimisation des performances et de l'expérience utilisateur",
        ],
      },
      {
        title: "Développeur",
        type: "Stage",
        startDate: "2023-02",
        endDate: "2023-08",
        location: "Mulhouse, Grand Est, France · Sur site",
        skills: ["DevOps", "AWS Lambda", "JavaScript", "React"],
        description: [
          "Développement de fonctionnalités pour des applications web",
          "Correction de bugs et amélioration des performances",
          "Collaboration avec l'équipe de développement",
        ],
      },
    ],
  },
  {
    company: "Epitech - L'école de l'excellence informatique",
    logo: "/placeholder.svg?height=64&width=64",
    positions: [
      {
        title: "Assistant Epitech Région (AER)",
        type: "Stage",
        startDate: "2022-03",
        endDate: "2023-02",
        location: "Mulhouse, Grand Est, France · Sur site",
        skills: ["Adaptabilité", "Gestion de projet", "Pédagogie"],
        description: [
          "Encadrement de projets informatiques et assistance pédagogique auprès des étudiants",
          "Participation à l'organisation d'événements et à la promotion de l'école",
          "Soutien technique et méthodologique aux étudiants",
        ],
      },
    ],
  },
]
