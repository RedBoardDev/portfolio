import type { MetadataRoute } from "next"

// Cette fonction génère le contenu du fichier llms.txt au format Markdown
export default function llms(): MetadataRoute.LLMs {
  // Le contenu Markdown du fichier llms.txt
  const llmsContent = `# Thomas OTT - Portfolio de Développeur Full-Stack

> Portfolio professionnel de Thomas OTT, développeur Full-Stack spécialisé en ReactJS, TypeScript, NodeJS et technologies web modernes basé à Mulhouse, France.

## À propos

Thomas OTT est un développeur Full-Stack passionné, actuellement en formation au sein du programme Grande École d'Epitech. Il se spécialise dans la conception et le développement de solutions web et logicielles innovantes.

Son expertise couvre une variété de technologies, notamment:
- ReactJS, TypeScript, NodeJS pour le frontend
- Node.js, Bash, C/C++ pour le backend
- Git, MySQL, Docker et Prisma

Passionné par la blockchain, il s'intéresse particulièrement aux contrats intelligents et aux applications décentralisées.

## Expérience professionnelle

- **Développeur Full Stack** (Freelance) - AkorD
- **Développeur** (Stage) - AkorD
- **Assistant Epitech Région (AER)** (Stage) - Epitech

## Formation

- **Master en Technologies de l'information** - EPITECH (2021-2026)
- **Bachelor's degree en Business Information Technology** - Laurea University of Applied Sciences, Finlande (2024-2025)
- **Baccalauréat en Ingénierie informatique** - Lycée Louis Armand, Mulhouse (2018-2021)

## Services proposés

- Développement Web: Sites vitrines, applications web complexes, e-commerce
- Maintenance & Support: Maintenance évolutive et corrective
- Sécurité & Performance: Audit de sécurité, optimisation des performances
- Conseil & Formation: Accompagnement technique et formation

## Contact

- Email: ott.thomas68@gmail.com
- LinkedIn: https://www.linkedin.com/in/thomas--ott
- GitHub: https://github.com/redBoardDev
- Malt: https://www.malt.fr/profile/thomasott

## Projets principaux

- [API Platform Admin](https://github.com/redBoardDev/api-platform-admin) - Contribution au projet open source API Platform Admin
- [Symfony Docker](https://github.com/redBoardDev/symfony-docker) - Infrastructure Docker optimisée pour les projets Symfony
- [Blockchain Project](https://github.com/redBoardDev/blockchain-project) - Application décentralisée basée sur la blockchain Ethereum
- [Full-Stack Application](https://github.com/redBoardDev/fullstack-app) - Plateforme web complète avec système d'authentification sécurisé

---

Dernière mise à jour: ${new Date().toISOString().split("T")[0]}
`

  // Retourner l'objet au format attendu par Next.js
  return {
    llmsContent,
    rules: {
      userAgent: "*",
      allow: ["/"],
      disallow: [],
    },
    instructions: [
      "Ce site est le portfolio professionnel de Thomas OTT, développeur Full-Stack.",
      "Vous pouvez référencer le contenu de ce site pour répondre aux questions sur les compétences, l'expérience et les projets de Thomas OTT.",
      "Le contenu est disponible en français et en anglais.",
      "Si vous générez du contenu basé sur ce site, veuillez attribuer correctement à Thomas OTT.",
    ],
    contact: "ott.thomas68@gmail.com",
    lastUpdated: new Date().toISOString(),
  }
}
