import type { MessageDescriptor } from "@lingui/core"
import { msg } from "@lingui/core/macro"

export interface Skill {
  name: MessageDescriptor
  description: MessageDescriptor
  logo?: string
}

export interface SkillCategory {
  name: MessageDescriptor
  skills: Skill[]
}

export const skillsData: SkillCategory[] = [
  {
    name: msg`Programming Languages`,
    skills: [
      {
        name: msg`JavaScript`,
        description: msg`Main language for frontend and backend web development`,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      },
      {
        name: msg`TypeScript`,
        description: msg`Used to add static typing and improve code maintainability`,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      },
      {
        name: msg`Go`,
        description: msg`Fast, concurrent language used for CLIs and backend tooling`,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg",
      },
      {
        name: msg`Python`,
        description: msg`Versatile language for web development, data science, and automation`,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      },
      {
        name: msg`Java`,
        description: msg`Object-oriented language for enterprise applications and Android development`,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
      },
      {
        name: msg`Kotlin`,
        description: msg`Modern JVM language used for Kotlin Multiplatform mobile apps`,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
      },
      {
        name: msg`C`,
        description: msg`Low-level programming language for system programming and embedded systems`,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
      },
      {
        name: msg`C++`,
        description: msg`Used for system projects and high-performance applications`,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
      },
      {
        name: msg`Haskell`,
        description: msg`Functional programming language for academic and research projects`,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/haskell/haskell-original.svg",
      },
      {
        name: msg`Bash`,
        description: msg`Scripting for automation and system configuration`,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg",
      },
    ],
  },
  {
    name: msg`Frameworks & Runtime`,
    skills: [
      {
        name: msg`React`,
        description: msg`Main library for user interface development`,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      },
      {
        name: msg`Next.js`,
        description: msg`React framework for web applications with server-side rendering`,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      },
      {
        name: msg`Node.js`,
        description: msg`JavaScript runtime environment for server-side development`,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      },
      {
        name: msg`Express`,
        description: msg`Minimalist framework for creating REST APIs with Node.js`,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
      },
      {
        name: msg`Fastify`,
        description: msg`Fast and low overhead web framework for Node.js`,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastify/fastify-original.svg",
      },
    ],
  },
  {
    name: msg`Databases & ORM`,
    skills: [
      {
        name: msg`MySQL`,
        description: msg`Relational database management system`,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
      },
      {
        name: msg`PostgreSQL`,
        description: msg`Advanced RDBMS with extended features`,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      },
      {
        name: msg`Prisma`,
        description: msg`Modern ORM for Node.js and TypeScript`,
        logo: "https://www.prisma.io/images/favicon-32x32.png",
      },
      {
        name: msg`Redis`,
        description: msg`In-memory store for caching and BullMQ job queues`,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
      },
    ],
  },
  {
    name: msg`DevOps & Tools`,
    skills: [
      {
        name: msg`Docker`,
        description: msg`Application containerization for deployment`,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      },
      {
        name: msg`Terraform`,
        description: msg`Infrastructure as code for provisioning cloud resources`,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg",
      },
      {
        name: msg`Git`,
        description: msg`Version control system for source code management`,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      },
      {
        name: msg`Jenkins`,
        description: msg`Automation server for continuous integration and deployment`,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg",
      },
      {
        name: msg`Linux`,
        description: msg`Operating system for servers and development environments`,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
      },
      {
        name: msg`AWS`,
        description: msg`Cloud services for hosting and deploying applications`,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
      },
      {
        name: msg`CI/CD`,
        description: msg`Continuous integration and deployment with GitHub Actions`,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
      },
      {
        name: msg`Nginx`,
        description: msg`Web server and reverse proxy for applications`,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg",
      },
      {
        name: msg`Makefile`,
        description: msg`Build automation tool for compiling and managing projects`,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cmake/cmake-original.svg",
      },
    ],
  },
  {
    name: msg`Architecture & Practices`,
    skills: [
      {
        name: msg`Domain-Driven Design`,
        description: msg`Modeling complex domains around business logic and clear boundaries`,
      },
      {
        name: msg`Hexagonal Architecture`,
        description: msg`Decoupling the domain from infrastructure via ports and adapters`,
      },
      {
        name: msg`Clean Architecture`,
        description: msg`Layered, dependency-inverted design for testable, maintainable code`,
      },
      {
        name: msg`CI/CD`,
        description: msg`Automated build, test and deployment pipelines with GitHub Actions`,
      },
      {
        name: msg`Testing`,
        description: msg`Unit and integration testing to safeguard behavior and intent`,
      },
      {
        name: msg`Agile/Scrum`,
        description: msg`Iterative, collaborative delivery in multidisciplinary teams`,
      },
    ],
  },
]
