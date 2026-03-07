"use client"

import { GitHubContributions } from "@/components/github/github-contributions-chart"
import { SectionHeading } from "@/components/shared/section-heading"
import { ContentBox } from "@/components/ui/content-box"
import { useTranslation } from "@/hooks/use-translation"
import { motion } from "framer-motion"

export default function AboutSection() {
  const { t, loading } = useTranslation("about")

  return (
    <section id="about-section" className="relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <SectionHeading title={loading ? "..." : t("title")} className="mb-10" />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ContentBox shadow="md">
              <div className="space-y-4 text-slate-700">
                <p className="leading-8">{loading ? "..." : t("paragraphs.intro")}</p>
                <p className="leading-8">{loading ? "..." : t("paragraphs.expertise")}</p>
                <p className="leading-8">{loading ? "..." : t("paragraphs.blockchain")}</p>
                <p className="leading-8">{loading ? "..." : t("paragraphs.background")}</p>
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
