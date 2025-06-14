"use client"

import { GitHubContributions } from "@/components/github/github-contributions-chart"
import { ContentBox } from "@/components/ui/content-box"
import { useTranslation } from "@/hooks/use-translation"
import { motion } from "framer-motion"

export default function AboutSection() {
  const { t, loading } = useTranslation("about")

  return (
    <section id="about-section" className="relative">
      {/* Section background enhancement */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-white rounded-xl -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-8 inline-block relative">
          {loading ? "..." : t("title")}
          <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-primary" />
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ContentBox shadow="md">
              <div className="space-y-4 text-gray-700">
                <p className="leading-relaxed">{loading ? "..." : t("paragraphs.intro")}</p>

                <p className="leading-relaxed">{loading ? "..." : t("paragraphs.expertise")}</p>

                <p className="leading-relaxed">{loading ? "..." : t("paragraphs.blockchain")}</p>

                <p className="leading-relaxed">{loading ? "..." : t("paragraphs.background")}</p>
              </div>
            </ContentBox>
          </div>

          <div>
            <ContentBox title={loading ? "..." : t("github.title")} shadow="md">
              <GitHubContributions username="redBoardDev" />
            </ContentBox>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
