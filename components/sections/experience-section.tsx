"use client"

import { ContentBox } from "@/components/ui/content-box"
import { ImageWithExternalLink } from "@/components/ui/image-with-external-link"
import { SkillBadge } from "@/components/ui/skill-badge"
import {
  type Position,
  calculateDuration,
  calculateTotalDuration,
  experiences,
} from "@/data/experiences"
import { useTranslation } from "@/hooks/use-translation"
import { motion } from "framer-motion"
import { Calendar, MapPin } from "lucide-react"

export default function ExperienceSection() {
  const { t, formatDuration, language, loading } = useTranslation("experience")

  // Helper to format display period string
  const getDisplayPeriod = (position: Position): string => {
    const start = new Date(position.startDate)
    const locale = language === "fr" ? "fr-FR" : "en-US"
    const startMonth = new Intl.DateTimeFormat(locale, { month: "short" }).format(start)
    const startYear = start.getFullYear()

    let displayPeriod = `${startMonth} ${startYear}`

    if (position.endDate) {
      const end = new Date(position.endDate)
      const endMonth = new Intl.DateTimeFormat(locale, { month: "short" }).format(end)
      const endYear = end.getFullYear()
      displayPeriod += ` - ${endMonth} ${endYear}`
    } else {
      displayPeriod += ` - ${t("ui.present", "aujourd'hui")}`
    }

    return displayPeriod
  }
  return (
    <section id="experience-section" className="relative">
      {/* Section background enhancement */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-white rounded-xl -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-8 inline-block relative">
          {t("section.title")}
          <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-primary" />
        </h2>

        <div className="space-y-6">
          {experiences.map((experience, index) => {
            // Fusionner toutes les compétences des positions
            const allSkills = Array.from(
              new Set(experience.positions.flatMap((position) => position.skills || []))
            ).sort()

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <ContentBox shadow="md">
                  {/* Company Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                    {/* Logo - Mobile version (now square with rounded corners) */}
                    <div className="flex-shrink-0 sm:hidden">
                      <ImageWithExternalLink
                        src={experience.logo || "/placeholder.svg?height=48&width=48"}
                        alt={t(`companies.${experience.key}.name`)}
                        url={experience.url}
                        width={48}
                        height={48}
                        className="w-12 h-12 border-gray-200 shadow-sm"
                        buttonTitle={loading ? "..." : t("ui.visitSite")}
                        buttonAriaLabel={loading ? "..." : t("ui.visitSite")}
                      />
                    </div>

                    {/* Logo - Desktop version */}
                    <div className="hidden sm:block">
                      <ImageWithExternalLink
                        src={experience.logo || "/placeholder.svg?height=64&width=64"}
                        alt={t(`companies.${experience.key}.name`)}
                        url={experience.url}
                        width={64}
                        height={64}
                        className="w-16 h-16 border-gray-200"
                        buttonTitle={loading ? "..." : t("ui.visitSite")}
                        buttonAriaLabel={loading ? "..." : t("ui.visitSite")}
                      />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {t(`companies.${experience.key}.name`)}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {(() => {
                          const sortedPositions = [...experience.positions].sort(
                            (a, b) =>
                              new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
                          )
                          const earliestStart = sortedPositions[0].startDate
                          let latestEnd: string | undefined
                          for (const pos of sortedPositions) {
                            if (!pos.endDate) {
                              latestEnd = undefined
                              break
                            }
                            if (!latestEnd || new Date(pos.endDate) > new Date(latestEnd)) {
                              latestEnd = pos.endDate
                            }
                          }
                          return formatDuration(earliestStart, latestEnd)
                        })()}
                      </p>
                    </div>
                  </div>

                  {/* Grid layout for positions and skills */}
                  <div className="grid md:grid-cols-[1fr_auto] gap-6">
                    {/* Positions column */}
                    <div className="space-y-8">
                      {experience.positions.map((position, posIndex) => (
                        <div key={posIndex} className="relative pl-6 pb-6 last:pb-0">
                          {/* Position line */}
                          <div className="absolute left-0 top-0 w-[1px] h-full bg-gray-200" />

                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">
                              {t(`positions.${position.key}.title`)}
                            </h4>
                            <p className="text-gray-600 text-sm">
                              {t(`positions.${position.key}.type`)}
                            </p>

                            <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-sm text-gray-500 mt-2">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-2 text-primary/70" />
                                <span>
                                  {getDisplayPeriod(position)} ·{" "}
                                  {formatDuration(position.startDate, position.endDate)}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-2 text-primary/70" />
                                <span>{t(`positions.${position.key}.location`)}</span>
                              </div>
                            </div>

                            {/* Description */}
                            {(() => {
                              const description = t(`positions.${position.key}.description`, [])
                              return (
                                Array.isArray(description) &&
                                description.length > 0 && (
                                  <ul className="mt-3 space-y-1 text-gray-700 text-sm">
                                    {description.map((item: string, idx: number) => (
                                      <li
                                        key={idx}
                                        className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-gray-400"
                                      >
                                        {item}
                                      </li>
                                    ))}
                                  </ul>
                                )
                              )
                            })()}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Skills column - only visible if there are skills */}
                    {allSkills.length > 0 && (
                      <div className="md:w-64 lg:w-72 md:border-l md:border-gray-100 md:pl-6">
                        <div className="mb-3">
                          <h4 className="text-sm font-medium text-gray-700 flex items-center">
                            <span className="w-1 h-4 bg-primary/60 rounded-full mr-2" />
                            {t("ui.skillsAcquired")}
                          </h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {allSkills.map((skill, skillIndex) => (
                            <SkillBadge key={skillIndex} name={skill} showTooltip={false} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </ContentBox>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
