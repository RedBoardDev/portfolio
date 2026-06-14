import type { MessageDescriptor } from "@lingui/core"
import { msg } from "@lingui/core/macro"

export interface Project {
  title: string
  description: MessageDescriptor
  image?: string
  languages: string[]
  primaryLanguage: string
  githubLink: string
  liveLink?: string
}

export const projectsData: Project[] = [
  {
    title: "ghr — GitHub Runners Controller",
    description: msg`Self-hosted GitHub Actions runner controller for macOS, built on GitHub's official scale-set Go SDK. Provisions ephemeral JIT runners with min/max autoscaling, handles binary downloads, registration and process lifecycle, and integrates natively with launchd plus Discord/webhook and Uptime Kuma notifications.`,
    languages: ["Go", "Shell", "Makefile"],
    primaryLanguage: "Go",
    githubLink: "https://github.com/RedBoardDev/gh-runners-tool",
  },
  {
    title: "mintlify-search-cli",
    description: msg`CLI client for Mintlify-hosted MCP documentation servers, designed for LLM coding agents like Claude Code and Cursor. Exposes semantic search returning structured JSON, single-call page retrieval, and a sandboxed docs filesystem — a fast, lightweight alternative to the official MCP integration.`,
    languages: ["Go", "Shell", "Makefile"],
    primaryLanguage: "Go",
    githubLink: "https://github.com/RedBoardDev/mintlify-search-cli",
  },
  {
    title: "ORE Supply Farmer Bot",
    description: msg`Production-grade ORE Protocol farming bot for Solana, built with Domain-Driven Design and a hexagonal architecture. Monitors on-chain rounds in real time and executes EV-optimized placements with a deterministic, risk-managed strategy and clean separation between domain and infrastructure.`,
    languages: ["TypeScript", "Node.js", "Solana"],
    primaryLanguage: "TypeScript",
    githubLink: "https://github.com/RedBoardDev/ore-supply-farmer-bot",
  },
  {
    title: "Pixel Canvas",
    description: msg`Collaborative r/place-style pixel canvas powered by a fully serverless AWS architecture. Features real-time WebSocket updates, Discord OAuth2 authentication and bot commands, chunk-based viewport rendering, admin session management and per-user rate limiting. Infrastructure defined as code with Terraform.`,
    languages: ["TypeScript", "AWS", "Terraform", "Go"],
    primaryLanguage: "TypeScript",
    githubLink: "https://github.com/RedBoardDev/pixel-canvas",
  },
  {
    title: "All-in-One Board",
    description: msg`A one-page dashboard framework that centralizes everything you track — crypto prices, DeFi PnL, analytics, weather, news — into flexible, code-defined cards rendered live on a single screen. Define a card once and it stays in sync, so you replace ten browser tabs with one personal dashboard.`,
    languages: ["TypeScript", "React", "Node.js"],
    primaryLanguage: "TypeScript",
    githubLink: "https://github.com/RedBoardDev/all-in-one-board",
  },
  {
    title: "SolDecoder Monitor",
    description: msg`Professional Discord bot for real-time monitoring of Solana DeFi trading positions. A decorator-based feature system delivers position-size calculations, live PnL tracking and pool statistics directly inside your server, giving traders portfolio-grade tooling without leaving Discord.`,
    languages: ["TypeScript", "Node.js", "Solana"],
    primaryLanguage: "TypeScript",
    githubLink: "https://github.com/RedBoardDev/soldecoder-monitor",
  },
  {
    title: "Cookmate",
    description: msg`Personal recipe hub that ingests recipes from any source — web pages, Instagram, plain text, screenshots — and normalizes them into a single DSL. Cook step-by-step with timers, plan weekly meals and auto-generate smart shopping lists, all in one private app shaped for daily use.`,
    languages: ["TypeScript", "React", "Node.js"],
    primaryLanguage: "TypeScript",
    githubLink: "https://github.com/RedBoardDev/cookmate",
  },
  {
    title: "Recipe Import Service",
    description: msg`Service that turns any recipe URL or raw text into clean schema.org/Recipe JSON-LD. Runs asynchronous import jobs with BullMQ workers, tracks the full job lifecycle step by step, and streams real-time progress to clients over WebSocket before normalizing results to a consistent schema.`,
    languages: ["TypeScript", "Node.js", "Docker"],
    primaryLanguage: "TypeScript",
    githubLink: "https://github.com/RedBoardDev/recipe-import-from-anything",
  },
  {
    title: "Strakk",
    description: msg`All-in-one fitness app built with Kotlin Multiplatform and Compose Multiplatform — shared business logic with native UI on iOS and Android. Includes workout logging, AI-powered meal photo scanning and food recognition, macro and water tracking, and weekly body check-ins with AI-generated nutrition goals.`,
    languages: ["Kotlin", "Swift", "PostgreSQL"],
    primaryLanguage: "Kotlin",
    githubLink: "https://github.com/RedBoardDev/Strakk",
  },
  {
    title: "Epitech Intranet Statistics",
    description: msg`Chrome extension that supercharges the Epitech intranet with advanced statistics and data visualization, giving students a customizable dashboard to track their academic progress. My most-starred open-source project, with 15 stars on GitHub.`,
    image: "/assets/projects/epitechintranetstats.png",
    languages: ["JavaScript", "CSS", "HTML"],
    primaryLanguage: "JavaScript",
    githubLink: "https://github.com/RedBoardDev/EpitechIntranetStatistics",
    liveLink:
      "https://chromewebstore.google.com/detail/epitech-intranet-statisti/fhelhbblcnpdfkiefkanbjjpkpejgodj",
  },
  {
    title: "R-Type",
    description: msg`2D side-scrolling shoot'em up inspired by the R-Type arcade classic, built in C++ around a custom Entity Component System. Client-server architecture with network synchronization between players and cross-platform installers released for Linux and Windows.`,
    image: "/assets/projects/rtype.png",
    languages: ["C++", "CMake", "Docker"],
    primaryLanguage: "C++",
    githubLink: "https://github.com/RedBoardDev/rtype",
  },
]
