"use client"

import { motion } from "framer-motion"
import { GitHubContributions } from "@/components/github/github-contributions-chart"
import { ContentBox } from "@/components/ui/content-box"
import { useTranslation } from "@/hooks/use-translation"

export default function AboutSection() {
  const { t } = useTranslation()

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
          {t("about.title")}
          <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-primary"></span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ContentBox shadow="md">
              <div className="space-y-4 text-gray-700">
                <p className="leading-relaxed">{t("about.description1")}</p>

                <p className="leading-relaxed">{t("about.description2")}</p>

                <p className="leading-relaxed">{t("about.description3")}</p>

                <p className="leading-relaxed">{t("about.description4")}</p>
              </div>
            </ContentBox>
          </div>

          <div>
            <ContentBox title={t("about.githubContributions")} shadow="md">
              <GitHubContributions username="redBoardDev" />
            </ContentBox>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
