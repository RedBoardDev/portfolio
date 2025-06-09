"use client"

import { motion } from "framer-motion"
import { GitHubContributions } from "@/components/github/github-contributions-chart"
import { ContentBox } from "@/components/ui/content-box"

export default function AboutSection() {
  return (
    <section id="about-section" className="relative">
      {/* Section background enhancement */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-white rounded-xl -z-10"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-8 inline-block relative">
          À propos
          <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-primary"></span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ContentBox shadow="md">
              <div className="space-y-4 text-gray-700">
                <p className="leading-relaxed">Développeur Fullstack passionné, actuellement en formation au sein du programme Grande École d'Epitech, je me spécialise dans la conception et le développement de solutions web et logicielles innovantes.</p>

                <p className="leading-relaxed">Mon expertise couvre une variété de technologies, notamment ReactJS, TypeScript, NodeJS pour le frontend, et Node.js, Bash, C/C++ pour le backend. Je maîtrise également des outils comme Git, MySQL, Docker et Prisma.</p>

                <p className="leading-relaxed">Passionné par la blockchain, je m'intéresse particulièrement aux contrats intelligents et aux applications décentralisées, avec une volonté d'explorer des solutions innovantes dans ce domaine.</p>

                <p className="leading-relaxed">Mon parcours académique, enrichi par une année en Finlande, m'a permis de développer une forte adaptabilité et une ouverture culturelle. En parallèle, mon expérience en tant qu'assistant pédagogique régional (AER) à Epitech m'a doté de solides compétences en encadrement de projets informatiques et en gestion de projet.</p>
              </div>
            </ContentBox>
          </div>

          <div>
            <ContentBox title="GitHub Contributions" shadow="md">
              <GitHubContributions username="redBoardDev" />
            </ContentBox>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
