import {
  Bird,
  Blocks,
  Boxes,
  Braces,
  Cloud,
  Code,
  Cog,
  Coins,
  Cpu,
  Database,
  FileCode,
  FileJson,
  Hammer,
  Layout,
  Server,
  Smartphone,
  Terminal,
  Workflow,
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
  go: {
    name: "Go",
    icon: Cpu,
    color: "#00add8",
  },
  rust: {
    name: "Rust",
    icon: Cog,
    color: "#dea584",
  },
  kotlin: {
    name: "Kotlin",
    icon: Smartphone,
    color: "#a97bff",
  },
  swift: {
    name: "Swift",
    icon: Bird,
    color: "#f05138",
  },
  solana: {
    name: "Solana",
    icon: Coins,
    color: "#9945ff",
  },
  aws: {
    name: "AWS",
    icon: Cloud,
    color: "#ff9900",
  },
  terraform: {
    name: "Terraform",
    icon: Boxes,
    color: "#7b42bc",
  },
  shell: {
    name: "Shell",
    icon: Terminal,
    color: "#89e051",
  },
  cmake: {
    name: "CMake",
    icon: Hammer,
    color: "#064f8c",
  },
}

// Fonction pour obtenir un langage à partir de son nom
export function getLanguage(name: string): ProgrammingLanguage {
  const normalizedName = name.toLowerCase().trim()

  // Direct match
  if (programmingLanguages[normalizedName]) {
    return programmingLanguages[normalizedName]
  }

  // Explicit aliases for names the partial match below would resolve incorrectly
  if (normalizedName === "c++" || normalizedName.includes("cpp")) {
    return programmingLanguages.cpp
  }
  if (normalizedName.includes("node")) {
    return programmingLanguages.nodejs
  }
  if (normalizedName.includes("next")) {
    return programmingLanguages.react
  }
  if (normalizedName.includes("express")) {
    return programmingLanguages.nodejs
  }
  if (normalizedName.includes("postgres")) {
    return programmingLanguages.postgresql
  }
  if (normalizedName.includes("symfony") || normalizedName.includes("laravel")) {
    return programmingLanguages.php
  }
  if (normalizedName.includes("c#") || normalizedName.includes("csharp")) {
    return {
      name: "C#",
      icon: Code,
      color: "#178600",
    }
  }

  // Partial match
  for (const key in programmingLanguages) {
    if (normalizedName.includes(key) || key.includes(normalizedName)) {
      return programmingLanguages[key]
    }
  }

  // Default
  return {
    name: name,
    icon: Code,
    color: "#666666",
  }
}
