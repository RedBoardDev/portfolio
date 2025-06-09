export interface Project {
  key: string // Clé pour la traduction
  image: string
  languages: string[] // Renommé de technologies à languages
  githubLink: string
  liveLink?: string
  featured?: boolean
}

// Update project descriptions with more SEO-friendly content
export const projectsData: Project[] = [
  {
    key: "apiPlatformAdmin",
    image: "/placeholder.svg?height=400&width=600",
    languages: ["JavaScript", "React", "TypeScript", "PHP"],
    githubLink: "https://github.com/redBoardDev/api-platform-admin",
    liveLink: "https://api-platform.com/docs/admin/",
    featured: true,
  },
  {
    key: "symfonyDocker",
    image: "/placeholder.svg?height=400&width=600",
    languages: ["Docker", "PHP", "Nginx", "PostgreSQL"],
    githubLink: "https://github.com/redBoardDev/symfony-docker",
  },
  {
    key: "blockchainProject",
    image: "/placeholder.svg?height=400&width=600",
    languages: ["Solidity", "JavaScript", "React", "Ethereum"],
    githubLink: "https://github.com/redBoardDev/blockchain-project",
    liveLink: "https://blockchain-demo.thomasott.fr",
  },
  {
    key: "fullStackApp",
    image: "/placeholder.svg?height=400&width=600",
    languages: ["React", "Node.js", "TypeScript", "MySQL"],
    githubLink: "https://github.com/redBoardDev/fullstack-app",
    liveLink: "https://app.thomasott.fr",
  },
  {
    key: "portfolio",
    image: "/placeholder.svg?height=400&width=600",
    languages: ["Next.js", "React", "TypeScript", "TailwindCSS"],
    githubLink: "https://github.com/redBoardDev/portfolio",
    liveLink: "https://thomasott.fr",
  },
  {
    key: "reactNativeApp",
    image: "/placeholder.svg?height=400&width=600",
    languages: ["React Native", "JavaScript", "Firebase"],
    githubLink: "https://github.com/redBoardDev/react-native-app",
  },
  {
    key: "smartContractEth",
    image: "/placeholder.svg?height=400&width=600",
    languages: ["Solidity", "JavaScript", "Ethereum"],
    githubLink: "https://github.com/redBoardDev/eth-smart-contract",
  },
  {
    key: "kubernetesServices",
    image: "/placeholder.svg?height=400&width=600",
    languages: ["Kubernetes", "Docker", "Go", "GitLab CI"],
    githubLink: "https://github.com/redBoardDev/k8s-microservices",
  },
  {
    key: "cliTool",
    image: "/placeholder.svg?height=400&width=600",
    languages: ["Node.js", "JavaScript", "Bash"],
    githubLink: "https://github.com/redBoardDev/dev-cli-tool",
  },
]
