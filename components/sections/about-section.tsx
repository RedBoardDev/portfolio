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
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <SectionHeading eyebrow={t`About`} title={t`About me`} className="mb-10" />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start">
          <div className="lg:col-span-2">
            <ContentBox shadow="md">
              <div className="space-y-4 text-muted-foreground">
                <p className="leading-8">
                  <Trans>
                    I build maintainable SaaS and business web apps end-to-end — from user needs and
                    domain modeling all the way to production. My approach is Clean Architecture:
                    clear boundaries, a deliberate project structure, and code that stays sane as
                    the product grows. I move fast, but I build for the long run, with refactoring,
                    reliability and security, and clean delivery (CI/CD, QA, cloud) baked in rather
                    than bolted on.
                  </Trans>
                </p>
                <p className="leading-8">
                  <Trans>
                    Right now I'm a full-stack developer at AkorD on Kare, a SaaS that digitalizes
                    safety-register workflows for public-access facilities in France, where
                    regulatory compliance meets daily field operations. In parallel, I co-founded
                    Moboo, a no-code platform for building mobile apps through a visual editor,
                    where I lead the frontend architecture.
                  </Trans>
                </p>
                <p className="leading-8">
                  <Trans>
                    I'm an Epitech student graduating in 2026, with an academic year in Helsinki
                    working on product-oriented teams in English. I'm open to opportunities in
                    Finland and remote, with teams building serious products to a high engineering
                    standard.
                  </Trans>
                </p>
              </div>
            </ContentBox>
          </div>

          <div>
            <ContentBox title={t`GitHub Contributions`} shadow="md">
              <GitHubHeatmap />
              <GitHubStats />
            </ContentBox>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
