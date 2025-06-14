"use client"

import { ContentBox } from "@/components/ui/content-box"
import { SkillBadge } from "@/components/ui/skill-badge"
import { skillsData } from "@/data/skills"
import { useTranslation } from "@/hooks/use-translation"
import { motion } from "framer-motion"

export default function SkillsSection() {
  const { t, loading } = useTranslation("skills")

  return (
    <section id="skills-section" className="relative">
      {/* Section background enhancement */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-white rounded-xl -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-6 inline-block relative">
          {loading ? "..." : t("title")}
          <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-primary" />
        </h2>

        {/* Skills grid */}
        <ContentBox shadow="md">
          <div className="grid gap-y-6">
            {skillsData.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  {loading ? "..." : t(`categories.${category.key}.name`)}
                </h3>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillBadge
                      key={skillIndex}
                      name={
                        loading ? "..." : t(`categories.${category.key}.skills.${skill.key}.name`)
                      }
                      icon={skill.logo || "/placeholder.svg?height=20&width=20"}
                      description={
                        loading
                          ? "..."
                          : t(`categories.${category.key}.skills.${skill.key}.description`)
                      }
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
