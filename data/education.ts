import type { MessageDescriptor } from "@lingui/core"
import { msg } from "@lingui/core/macro"

export interface Education {
  institution: MessageDescriptor
  degree: MessageDescriptor
  field: MessageDescriptor
  location: MessageDescriptor
  description: MessageDescriptor
  skills: MessageDescriptor[]
  logo?: string
  startDate: string // Format: "YYYY-MM"
  endDate: string // Format: "YYYY-MM" or "YYYY" for future dates
  url?: string
}

export const educations: Education[] = [
  {
    institution: msg`EPITECH - European Institute of Technology`,
    degree: msg`Master's degree`,
    field: msg`Information Technology`,
    location: msg`Mulhouse, France`,
    description: msg`Expert training in information technology with project-based pedagogy.`,
    skills: [msg`Web Development`, msg`Algorithms`, msg`DevOps`, msg`Software Architecture`],
    logo: "/assets/logos/companies/epitech.jpeg",
    startDate: "2021-10",
    endDate: "2026",
    url: "https://www.epitech.eu/",
  },
  {
    institution: msg`Laurea University of Applied Sciences`,
    degree: msg`Bachelor's degree`,
    field: msg`Business Information Technology`,
    location: msg`Helsinki, Finland`,
    description: msg`Exchange year in Finland, providing international experience.`,
    skills: [msg`Project Management`, msg`Business Intelligence`, msg`UX/UI Design`],
    logo: "/assets/logos/education/laurea.jpeg",
    startDate: "2024-08",
    endDate: "2025-06",
    url: "https://www.laurea.fi/en/",
  },
  {
    institution: msg`Lycée Louis Armand - Mulhouse`,
    degree: msg`High School Diploma`,
    field: msg`Computer Engineering`,
    location: msg`Mulhouse, France`,
    description: msg`Initial training in computer engineering with a practical approach to information technologies.`,
    skills: [msg`Programming`, msg`Networks`, msg`Information Systems`],
    logo: "/assets/logos/education/lycee-louis-armand.jpeg",
    startDate: "2018-09",
    endDate: "2021-07",
    url: "https://www.louis-armand-mulhouse.fr/",
  },
]
