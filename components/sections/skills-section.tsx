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
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <SectionHeading eyebrow={t`Toolbox`} title={t`Skills`} className="mb-10" />

        <ContentBox shadow="md">
          <div className="grid gap-4 md:grid-cols-2">
            {skillsData.map((category, categoryIndex) => (
              <div
                key={categoryIndex}
                className="rounded-[16px] border border-border/70 bg-card/60 p-5"
              >
                <h3 className="text-lg font-semibold text-foreground">{t(category.name)}</h3>

                <div className="mt-4 flex flex-wrap gap-2.5">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillBadge
                      key={skillIndex}
                      name={t(skill.name)}
                      icon={skill.logo}
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
