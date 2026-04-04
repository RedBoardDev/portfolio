import type { MessageDescriptor } from "@lingui/core"
import { msg } from "@lingui/core/macro"

export interface Position {
  title: MessageDescriptor
  type: MessageDescriptor
  location: MessageDescriptor
  description: MessageDescriptor[]
  startDate: string // Format: "YYYY-MM"
  endDate?: string // Format: "YYYY-MM", optional (if not provided, means "Present")
  skills: MessageDescriptor[]
}

export interface Experience {
  name: MessageDescriptor
  logo: string
  url?: string
  positions: Position[]
}

export const experiences: Experience[] = [
  {
    name: msg`AkorD`,
    logo: "/assets/logos/companies/akord.jpeg",
    url: "https://akord.fr",
    positions: [
      {
        title: msg`Full Stack Developer`,
        type: msg`Freelance`,
        location: msg`Remote`,
        description: [
          msg`Development and maintenance of modern web applications`,
          msg`Design and implementation of new features`,
          msg`Performance optimization and user experience enhancement`,
        ],
        startDate: "2023-09",
        skills: [
          msg`DevOps`,
          msg`AWS Lambda`,
          msg`Node.js`,
          msg`React`,
          msg`TypeScript`,
          msg`Docker`,
        ],
      },
      {
        title: msg`Developer`,
        type: msg`Internship`,
        location: msg`Mulhouse, Grand Est, France · On-site`,
        description: [
          msg`Development of features for web applications`,
          msg`Bug fixes and performance improvements`,
          msg`Collaboration with the development team`,
        ],
        startDate: "2023-02",
        endDate: "2023-08",
        skills: [msg`DevOps`, msg`AWS Lambda`, msg`JavaScript`, msg`React`],
      },
    ],
  },
  {
    name: msg`Epitech - The IT Excellence School`,
    logo: "/assets/logos/companies/epitech.jpeg",
    url: "https://www.epitech.eu/",
    positions: [
      {
        title: msg`Epitech Regional Assistant (AER)`,
        type: msg`Internship`,
        location: msg`Mulhouse, Grand Est, France · On-site`,
        description: [
          msg`Supervision of IT projects and educational assistance for students`,
          msg`Participation in organizing events and promoting the school`,
          msg`Technical and methodological support for students`,
        ],
        startDate: "2022-03",
        endDate: "2023-02",
        skills: [msg`Adaptability`, msg`Project Management`, msg`Teaching`],
      },
    ],
  },
]
