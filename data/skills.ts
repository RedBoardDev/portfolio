export interface Skill {
  key: string // Clé pour la traduction
  logo: string
}

export interface SkillCategory {
  key: string // Clé pour la traduction
  skills: Skill[]
}

export const skillsData: SkillCategory[] = [
  {
    key: "programming",
    skills: [
      {
        key: "js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      },
      {
        key: "ts",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      },
      {
        key: "python",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      },
      {
        key: "java",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
      },
      {
        key: "c",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
      },
      {
        key: "cpp",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
      },
      {
        key: "haskell",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/haskell/haskell-original.svg",
      },
      {
        key: "bash",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg",
      },
    ],
  },
  {
    key: "frameworks",
    skills: [
      {
        key: "reactjs",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      },
      {
        key: "nextjs",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      },
      {
        key: "nodejs",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      },
      {
        key: "express",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
      },
      {
        key: "fastify",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastify/fastify-original.svg",
      },
    ],
  },
  {
    key: "databases",
    skills: [
      {
        key: "mysql",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
      },
      {
        key: "postgresql",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      },
      {
        key: "prisma",
        logo: "https://www.prisma.io/images/favicon-32x32.png",
      },
    ],
  },
  {
    key: "devops",
    skills: [
      {
        key: "docker",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      },
      {
        key: "git",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      },
      {
        key: "jenkins",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg",
      },
      {
        key: "linux",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
      },
      {
        key: "aws",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
      },

      {
        key: "cicd",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
      },
      {
        key: "nginx",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg",
      },
      {
        key: "makefile",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cmake/cmake-original.svg",
      },
    ],
  },
  {
    key: "soft",
    skills: [
      {
        key: "agile",
        logo: "/placeholder.svg?height=40&width=40",
      },
      {
        key: "projectManagement",
        logo: "/placeholder.svg?height=40&width=40",
      },
      {
        key: "teamwork",
        logo: "/placeholder.svg?height=40&width=40",
      },
      {
        key: "communication",
        logo: "/placeholder.svg?height=40&width=40",
      },
      {
        key: "teaching",
        logo: "/placeholder.svg?height=40&width=40",
      },
    ],
  },
]
