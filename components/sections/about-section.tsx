"use client"

import { GitHubHeatmap } from "@/components/github/github-heatmap"
import { GitHubStats } from "@/components/github/github-stats"
import { SectionHeading } from "@/components/shared/section-heading"
import { ContentBox } from "@/components/ui/content-box"
import { Trans, useLingui } from "@lingui/react/macro"
import { motion } from "framer-motion"

export default function AboutSection() {
  const { t } = useLingui()

  return (
    <section id="about-section" className="relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <SectionHeading title={t`About`} className="mb-10" />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ContentBox shadow="md">
              <div className="space-y-4 text-slate-700">
                <p className="leading-8">
                  <Trans>
                    Passionate front-end developer, I create modern and performant web interfaces.
                    My approach combines technical rigor and attention to detail to deliver
                    exceptional user experiences.
                  </Trans>
                </p>
                <p className="leading-8">
                  <Trans>
                    Specialized in React, TypeScript and the Next.js ecosystem, I master the
                    complete chain of modern front-end development: from pixel-perfect UI
                    integration to state management, performance optimization and automated testing.
                  </Trans>
                </p>
                <p className="leading-8">
                  <Trans>
                    Curious by nature, I also explored blockchain and Web3, which gave me a broader
                    vision of current technological challenges and the ability to quickly adapt to
                    new paradigms.
                  </Trans>
                </p>
                <p className="leading-8">
                  <Trans>
                    Trained at Epitech with project-based pedagogy, I developed strong autonomy and
                    an ability to solve complex problems. I am currently completing an international
                    exchange year at Laurea University in Helsinki, Finland.
                  </Trans>
                </p>
              </div>
            </ContentBox>
          </div>

          <div>
            <ContentBox title={t`GitHub Contributions`} shadow="md">
              <GitHubHeatmap username="redBoardDev" />
              <GitHubStats username="redBoardDev" />
            </ContentBox>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
