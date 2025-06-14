import {
  Code,
  Database,
  Server,
  Layout,
  FileCode,
  Workflow,
  Braces,
  Blocks,
  FileJson,
  Terminal,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

// Interface pour représenter un langage de programmation
export interface ProgrammingLanguage {
  name: string
  icon: LucideIcon
  color: string
}

// Liste des langages de programmation principaux
export const programmingLanguages: Record<string, ProgrammingLanguage> = {
  javascript: {
    name: "JavaScript",
    icon: FileCode,
    color: "#f7df1e",
  },
  typescript: {
    name: "TypeScript",
    icon: Braces,
    color: "#3178c6",
  },
  react: {
    name: "React",
    icon: Layout,
    color: "#61dafb",
  },
  nodejs: {
    name: "Node.js",
    icon: Server,
    color: "#68a063",
  },
  php: {
    name: "PHP",
    icon: FileCode,
    color: "#777bb4",
  },
  python: {
    name: "Python",
    icon: Code,
    color: "#3572A5",
  },
  cpp: {
    name: "C++",
    icon: Code,
    color: "#f34b7d",
  },
  c: {
    name: "C",
    icon: Code,
    color: "#555555",
  },
  java: {
    name: "Java",
    icon: Code,
    color: "#b07219",
  },
  bash: {
    name: "Bash",
    icon: Terminal,
    color: "#89e051",
  },
  html: {
    name: "HTML",
    icon: FileCode,
    color: "#e34c26",
  },
  css: {
    name: "CSS",
    icon: FileCode,
    color: "#563d7c",
  },
  sql: {
    name: "SQL",
    icon: Database,
    color: "#e38c00",
  },
  mongodb: {
    name: "MongoDB",
    icon: Database,
    color: "#13aa52",
  },
  mysql: {
    name: "MySQL",
    icon: Database,
    color: "#00758f",
  },
  postgresql: {
    name: "PostgreSQL",
    icon: Database,
    color: "#336791",
  },
  firebase: {
    name: "Firebase",
    icon: Database,
    color: "#ffca28",
  },
  git: {
    name: "Git",
    icon: Workflow,
    color: "#f14e32",
  },
  docker: {
    name: "Docker",
    icon: Blocks,
    color: "#2496ed",
  },
  json: {
    name: "JSON",
    icon: FileJson,
    color: "#292929",
  },
}

// Fonction pour obtenir un langage à partir de son nom
export function getLanguage(name: string): ProgrammingLanguage {
  const normalizedName = name.toLowerCase().trim()

  // Recherche directe
  if (programmingLanguages[normalizedName]) {
    return programmingLanguages[normalizedName]
  }

  // Recherche partielle
  for (const key in programmingLanguages) {
    if (normalizedName.includes(key) || key.includes(normalizedName)) {
      return programmingLanguages[key]
    }
  }

  // Cas spéciaux et alias
  if (normalizedName.includes("next") || normalizedName.includes("nextjs")) {
    return programmingLanguages.react
  }
  if (normalizedName.includes("express")) {
    return programmingLanguages.nodejs
  }
  if (normalizedName.includes("symfony") || normalizedName.includes("laravel")) {
    return programmingLanguages.php
  }
  if (normalizedName.includes("postgres")) {
    return programmingLanguages.postgresql
  }
  if (normalizedName.includes("c#") || normalizedName.includes("csharp")) {
    return {
      name: "C#",
      icon: Code,
      color: "#178600",
    }
  }

  // Valeur par défaut
  return {
    name: name,
    icon: Code,
    color: "#666666",
  }
}
