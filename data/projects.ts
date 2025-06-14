export interface Project {
  key: string // Clé pour la traduction
  image: string
  languages: string[] // Renommé de technologies à languages
  githubLink: string
  liveLink?: string // Lien optionnel vers le site
}

// Update project descriptions with more SEO-friendly content
export const projectsData: Project[] = [
  {
    key: "teapotTracker",
    image: "/assets/projects/teapottracker.png",
    languages: ["TypeScript", "JavaScript", "Node.js"],
    githubLink: "https://github.com/RedBoardDev/TeapotTracker",
  },
  {
    key: "chromeFlex",
    image: "/placeholder.svg?height=400&width=600",
    languages: ["TypeScript", "JavaScript", "Vite"],
    githubLink: "https://github.com/RedBoardDev/ChromeFlex",
  },
  {
    key: "atlasGenAI",
    image: "/assets/projects/atlas.png",
    languages: ["TypeScript", "Python", "Docker"],
    githubLink: "https://github.com/RedBoardDev/Atlas-GenAI",
    liveLink: "https://atlas.thomasott.fr/",
  },
  {
    key: "invoicing",
    image: "/placeholder.svg?height=400&width=600",
    languages: ["TypeScript", "React", "Node.js"],
    githubLink: "https://github.com/RedBoardDev/invoicing",
  },
  {
    key: "epitechIntranetStatistics",
    image: "/assets/projects/epitechintranetstats.png",
    languages: ["JavaScript", "CSS", "HTML"],
    githubLink: "https://github.com/RedBoardDev/EpitechIntranetStatistics",
    liveLink:
      "https://chromewebstore.google.com/detail/epitech-intranet-statisti/fhelhbblcnpdfkiefkanbjjpkpejgodj",
  },
  {
    key: "rtype",
    image: "/assets/projects/rtype.png",
    languages: ["C++", "CMake", "Docker"],
    githubLink: "https://github.com/RedBoardDev/rtype",
  },
  {
    key: "epitechArea",
    image: "/placeholder.svg?height=400&width=600",
    languages: ["JavaScript", "React", "Node.js"],
    githubLink: "https://github.com/RedBoardDev/epitech-area",
  },
  {
    key: "myFarm",
    image: "/placeholder.svg?height=400&width=600",
    languages: ["C", "Makefile"],
    githubLink: "https://github.com/RedBoardDev/MyFarm",
  },
]
