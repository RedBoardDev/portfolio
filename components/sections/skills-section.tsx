"use client"

import { SectionHeading } from "@/components/shared/section-heading"
import { ContentBox } from "@/components/ui/content-box"
import { SkillBadge } from "@/components/ui/skill-badge"
import { skillsData } from "@/data/skills"
import { useLingui } from "@lingui/react/macro"
import { motion } from "framer-motion"

export default function SkillsSection() {
  const { t } = useLingui()

  return (
    <section id="skills-section" className="relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <SectionHeading title={t`Skills`} className="mb-10" />

        <ContentBox shadow="md">
          <div className="grid gap-4 md:grid-cols-2">
            {skillsData.map((category, categoryIndex) => (
              <div
                key={categoryIndex}
                className="rounded-[18px] border border-slate-200/80 bg-white/58 p-5"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg font-semibold text-slate-900">{t(category.name)}</h3>
                  <span className="font-mono text-xs uppercase tracking-[0.22em] text-slate-400">
                    {String(category.skills.length).padStart(2, "0")}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2.5">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillBadge
                      key={skillIndex}
                      name={t(skill.name)}
                      icon={skill.logo || "/placeholder.svg?height=20&width=20"}
                      description={t(skill.description)}
                      showTooltip={true}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ContentBox>
      </motion.div>
    </section>
  )
}
