export interface Skill {
  name: string
  logo: string
  description: string
}

export interface SkillCategory {
  name: string
  skills: Skill[]
}

export const skillsData: SkillCategory[] = [
  {
    name: "Langages de programmation",
    skills: [
      {
        name: "JavaScript",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        description: "Langage principal pour le développement web frontend et backend avec Node.js",
      },
      {
        name: "TypeScript",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        description: "Utilisé pour ajouter un typage statique et améliorer la maintenabilité du code",
      },
      {
        name: "PHP",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-plain.svg",
        description: "Utilisé pour le développement backend, notamment avec Symfony",
      },
      {
        name: "C/C++",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
        description: "Utilisé pour des projets système et applications performantes",
      },
      {
        name: "Bash",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg",
        description: "Scripting pour l'automatisation et la configuration système",
      },
    ],
  },
  {
    name: "Frameworks & Librairies",
    skills: [
      {
        name: "React",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        description: "Librairie principale pour le développement d'interfaces utilisateur",
      },
      {
        name: "Next.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        description: "Framework React pour applications web avec rendu côté serveur",
      },
      {
        name: "Node.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        description: "Environnement d'exécution JavaScript côté serveur",
      },
      {
        name: "Express",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
        description: "Framework minimaliste pour créer des API REST avec Node.js",
      },
      {
        name: "Symfony",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/symfony/symfony-original.svg",
        description: "Framework PHP pour le développement d'applications web robustes",
      },
    ],
  },
  {
    name: "Bases de données & Outils",
    skills: [
      {
        name: "MySQL",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
        description: "Système de gestion de base de données relationnelle",
      },
      {
        name: "PostgreSQL",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
        description: "SGBDR avancé avec fonctionnalités étendues",
      },
      {
        name: "MongoDB",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
        description: "Base de données NoSQL orientée documents",
      },
      {
        name: "Prisma",
        logo: "https://www.prisma.io/images/favicon-32x32.png",
        description: "ORM moderne pour Node.js et TypeScript",
      },
      {
        name: "Git",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
        description: "Système de contrôle de version pour la gestion du code source",
      },
    ],
  },
  {
    name: "DevOps & Infrastructure",
    skills: [
      {
        name: "Docker",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
        description: "Conteneurisation d'applications pour le déploiement",
      },
      {
        name: "AWS",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
        description: "Services cloud pour l'hébergement et le déploiement d'applications",
      },
      {
        name: "CI/CD",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
        description: "Intégration et déploiement continus avec GitHub Actions",
      },
      {
        name: "Nginx",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg",
        description: "Serveur web et proxy inverse pour les applications",
      },
    ],
  },
  {
    name: "Méthodologies & Soft Skills",
    skills: [
      {
        name: "Agile/Scrum",
        logo: "/placeholder.svg?height=40&width=40",
        description: "Méthodologie de gestion de projet itérative et collaborative",
      },
      {
        name: "Gestion de projet",
        logo: "/placeholder.svg?height=40&width=40",
        description: "Planification, exécution et suivi de projets informatiques",
      },
      {
        name: "Travail d'équipe",
        logo: "/placeholder.svg?height=40&width=40",
        description: "Collaboration efficace au sein d'équipes multidisciplinaires",
      },
      {
        name: "Communication",
        logo: "/placeholder.svg?height=40&width=40",
        description: "Communication claire avec les parties prenantes techniques et non techniques",
      },
      {
        name: "Pédagogie",
        logo: "/placeholder.svg?height=40&width=40",
        description: "Transmission de connaissances et accompagnement d'étudiants",
      },
    ],
  },
]
