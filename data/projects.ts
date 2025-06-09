export interface Project {
  title: string
  description: string
  image: string
  languages: string[] // Renommé de technologies à languages
  githubLink: string
  liveLink?: string
  featured?: boolean
}

// Update project descriptions with more SEO-friendly content
export const projectsData: Project[] = [
  {
    title: "API Platform Admin",
    description:
      "Contribution significative au projet open source API Platform Admin, un outil d'administration généré automatiquement pour les APIs RESTful basées sur API Platform. Mes améliorations ont optimisé l'interface utilisateur et l'expérience développeur, facilitant la gestion des ressources API via une interface moderne en React.",
    image: "/placeholder.svg?height=400&width=600",
    languages: ["JavaScript", "React", "TypeScript", "PHP"],
    githubLink: "https://github.com/redBoardDev/api-platform-admin",
    liveLink: "https://api-platform.com/docs/admin/",
    featured: true,
  },
  {
    title: "Symfony Docker",
    description:
      "Infrastructure Docker optimisée pour les projets Symfony incluant PHP-FPM, Nginx, et PostgreSQL. Cette configuration soigneusement élaborée permet un développement Symfony fluide et un déploiement simplifié avec des performances optimales en production.",
    image: "/placeholder.svg?height=400&width=600",
    languages: ["Docker", "PHP", "Nginx", "PostgreSQL"],
    githubLink: "https://github.com/redBoardDev/symfony-docker",
  },
  {
    title: "Blockchain Project",
    description:
      "Application décentralisée (dApp) innovante basée sur la blockchain Ethereum utilisant des contrats intelligents pour sécuriser les transactions et les données. Cette solution exploite la puissance de Solidity et React pour créer une expérience utilisateur fluide tout en préservant les avantages de la technologie blockchain.",
    image: "/placeholder.svg?height=400&width=600",
    languages: ["Solidity", "JavaScript", "React", "Ethereum"],
    githubLink: "https://github.com/redBoardDev/blockchain-project",
    liveLink: "https://blockchain-demo.thomasott.fr",
  },
  {
    title: "Full-Stack Application",
    description:
      "Plateforme web complète avec système d'authentification sécurisé, gestion efficace des données et interface utilisateur réactive. Comprend un tableau de bord administrateur intuitif et des fonctionnalités avancées de visualisation des données, le tout bâti sur une architecture robuste React/Node.js.",
    image: "/placeholder.svg?height=400&width=600",
    languages: ["React", "Node.js", "TypeScript", "MySQL"],
    githubLink: "https://github.com/redBoardDev/fullstack-app",
    liveLink: "https://app.thomasott.fr",
  },
  {
    title: "Portfolio Personnel",
    description:
      "Mon portfolio personnel (ce site) développé avec Next.js, React et TailwindCSS, optimisé pour les performances et le référencement. Conçu selon les meilleures pratiques d'accessibilité et d'UX, il présente mon parcours professionnel, mes compétences techniques et mes projets de manière claire et interactive.",
    image: "/placeholder.svg?height=400&width=600",
    languages: ["Next.js", "React", "TypeScript", "TailwindCSS"],
    githubLink: "https://github.com/redBoardDev/portfolio",
    liveLink: "https://thomasott.fr",
  },
  {
    title: "Application mobile React Native",
    description:
      "Application mobile cross-platform développée avec React Native pour iOS et Android offrant une expérience utilisateur native. Cette solution intègre des API REST personnalisées et exploite pleinement les fonctionnalités natives des appareils mobiles pour une expérience utilisateur optimale.",
    image: "/placeholder.svg?height=400&width=600",
    languages: ["React Native", "JavaScript", "Firebase"],
    githubLink: "https://github.com/redBoardDev/react-native-app",
  },
  {
    title: "Smart Contract ETH",
    description:
      "Développement avancé de contrats intelligents sur la blockchain Ethereum pour la gestion de tokens non-fongibles (NFT). Ce projet implémente des mécanismes de sécurité robustes et des fonctionnalités innovantes permettant des transactions transparentes et sécurisées sur la blockchain.",
    image: "/placeholder.svg?height=400&width=600",
    languages: ["Solidity", "JavaScript", "Ethereum"],
    githubLink: "https://github.com/redBoardDev/eth-smart-contract",
  },
  {
    title: "Microservices avec Kubernetes",
    description:
      "Architecture évolutive de microservices déployée sur Kubernetes avec pipeline CI/CD automatisé. Cette solution utilise un service mesh pour une communication inter-services efficace et permet un scaling horizontal transparent pour répondre à des charges variables.",
    image: "/placeholder.svg?height=400&width=600",
    languages: ["Kubernetes", "Docker", "Go", "GitLab CI"],
    githubLink: "https://github.com/redBoardDev/k8s-microservices",
  },
  {
    title: "CLI pour l'automatisation",
    description:
      "Outil en ligne de commande puissant pour automatiser les tâches de développement récurrentes. Cette solution hautement configurable et extensible via un système de plugins permet de gagner un temps considérable lors du développement de projets complexes.",
    image: "/placeholder.svg?height=400&width=600",
    languages: ["Node.js", "JavaScript", "Bash"],
    githubLink: "https://github.com/redBoardDev/dev-cli-tool",
  },
]
