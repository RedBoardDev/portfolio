import type { MessageDescriptor } from "@lingui/core"
import { msg } from "@lingui/core/macro"

export interface Project {
  title: MessageDescriptor
  description: MessageDescriptor
  image: string
  languages: string[]
  githubLink: string
  liveLink?: string
}

export const projectsData: Project[] = [
  {
    title: msg`TeapotTracker`,
    description: msg`Discord bot that updates its status based on time tracking received via clockify. Features Clean Architecture with Domain-Driven Design, automated deployment with PM2, and real-time status updates for work sessions. The bot listens for webhook payloads and displays different statuses based on work activity.`,
    image: "/assets/projects/teapottracker.png",
    languages: ["TypeScript", "JavaScript", "Node.js"],
    githubLink: "https://github.com/RedBoardDev/TeapotTracker",
  },
  {
    title: msg`ChromeFlex`,
    description: msg`Modular Chrome extension framework for easily adding custom, site-specific features on the fly with a plug-and-play architecture. Built with TypeScript and modern development tools, it provides developers with a flexible platform to enhance web browsing experiences across different websites.`,
    image: "/placeholder.svg?height=400&width=600",
    languages: ["TypeScript", "JavaScript", "Vite"],
    githubLink: "https://github.com/RedBoardDev/ChromeFlex",
  },
  {
    title: msg`Atlas-GenAI`,
    description: msg`AI-powered project with advanced generative capabilities and intelligent automation features. Built with TypeScript and Python, featuring Docker containerization for scalable deployment and development. The project leverages modern AI technologies to provide sophisticated solutions for various use cases.`,
    image: "/assets/projects/atlas.png",
    languages: ["TypeScript", "Python", "Docker"],
    githubLink: "https://github.com/RedBoardDev/Atlas-GenAI",
    liveLink: "https://atlas.thomasott.fr/",
  },
  {
    title: msg`Invoicing System`,
    description: msg`Modern invoicing and billing system built with TypeScript for small businesses and freelancers. Features automated invoice generation, comprehensive client management, payment tracking, and financial reporting with a clean and intuitive React interface. Streamlines the entire billing process from creation to payment.`,
    image: "/placeholder.svg?height=400&width=600",
    languages: ["TypeScript", "React", "Node.js"],
    githubLink: "https://github.com/RedBoardDev/invoicing",
  },
  {
    title: msg`Epitech Intranet Statistics`,
    description: msg`Web application providing advanced statistics and information for the Epitech Intranet platform. Chrome extension with comprehensive data visualization, customizable dashboard for tracking academic progress, and enhanced user experience features. Helps students monitor their academic journey more effectively.`,
    image: "/assets/projects/epitechintranetstats.png",
    languages: ["JavaScript", "CSS", "HTML"],
    githubLink: "https://github.com/RedBoardDev/EpitechIntranetStatistics",
    liveLink:
      "https://chromewebstore.google.com/detail/epitech-intranet-statisti/fhelhbblcnpdfkiefkanbjjpkpejgodj",
  },
  {
    title: msg`R-Type Game`,
    description: msg`2D side-scrolling shoot'em up game based on the original R-Type arcade classic. Built in C++ with robust client-server architecture, featuring multiplayer gameplay, cross-platform support, and modern game development practices. Includes Entity Component System architecture and network synchronization.`,
    image: "/assets/projects/rtype.png",
    languages: ["C++", "CMake", "Docker"],
    githubLink: "https://github.com/RedBoardDev/rtype",
  },
  {
    title: msg`Epitech AREA`,
    description: msg`Automation platform connecting different services and applications through custom workflows and integrations. Built with JavaScript and React, enabling users to create sophisticated automation rules between various APIs and services. Similar to IFTTT but tailored for developer and student needs.`,
    image: "/placeholder.svg?height=400&width=600",
    languages: ["JavaScript", "React", "Node.js"],
    githubLink: "https://github.com/RedBoardDev/epitech-area",
  },
  {
    title: msg`MyFarm RPG`,
    description: msg`Custom RPG game engine developed in C with classic farming simulation mechanics. Features comprehensive resource management, character progression system, and retro-style gaming environment. Players can cultivate crops, manage livestock, and build their virtual farming empire with strategic decision-making elements.`,
    image: "/placeholder.svg?height=400&width=600",
    languages: ["C", "Makefile"],
    githubLink: "https://github.com/RedBoardDev/MyFarm",
  },
]
