"use client"

import { SectionHeading } from "@/components/shared/section-heading"
import { ContentBox } from "@/components/ui/content-box"
import { ImageWithExternalLink } from "@/components/ui/image-with-external-link"
import { SkillBadge } from "@/components/ui/skill-badge"
import { type Position, experiences } from "@/data/experiences"
import { plural } from "@lingui/core/macro"
import { Trans, useLingui } from "@lingui/react/macro"
import { motion } from "framer-motion"
import { Calendar, MapPin } from "lucide-react"

export default function ExperienceSection() {
  const { i18n, t } = useLingui()

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr)
    return i18n.date(date, { month: "short", year: "numeric" })
  }

  const formatDuration = (startDate: string, endDate?: string): string => {
    const start = new Date(startDate)
    const end = endDate ? new Date(endDate) : new Date()

    let months =
      (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
    if (months < 1) {
      months = 1
    }

    const years = Math.floor(months / 12)
    const remainingMonths = months % 12

    if (years === 0) {
      return t({ message: plural(months, { one: "# month", other: "# months" }) })
    }

    if (remainingMonths === 0) {
      return t({ message: plural(years, { one: "# year", other: "# years" }) })
    }

    return t({
      message: `${plural(years, { one: "# year", other: "# years" })} ${plural(remainingMonths, {
        one: "# month",
        other: "# months",
      })}`,
    })
  }

  const getDisplayPeriod = (position: Position): string => {
    const startLabel = formatDate(position.startDate)

    if (position.endDate) {
      return `${startLabel} - ${formatDate(position.endDate)}`
    }

    return `${startLabel} - ${t`present`}`
  }

  return (
    <section id="experience-section" className="relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <SectionHeading title={t`Experience`} className="mb-10" />

        <div className="space-y-6">
          {experiences.map((experience, index) => {
            const allSkills = Array.from(
              new Set(
                experience.positions.flatMap((position) => position.skills.map((skill) => t(skill)))
              )
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
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                    <div className="flex-shrink-0 sm:hidden">
                      <ImageWithExternalLink
                        src={experience.logo || "/placeholder.svg?height=48&width=48"}
                        alt={t(experience.name)}
                        url={experience.url}
                        width={48}
                        height={48}
                        className="w-12 h-12 border-gray-200 shadow-sm"
                        buttonTitle={t`Visit website`}
                        buttonAriaLabel={t`Visit website`}
                      />
                    </div>

                    <div className="hidden sm:block">
                      <ImageWithExternalLink
                        src={experience.logo || "/placeholder.svg?height=64&width=64"}
                        alt={t(experience.name)}
                        url={experience.url}
                        width={64}
                        height={64}
                        className="w-16 h-16 border-gray-200"
                        buttonTitle={t`Visit website`}
                        buttonAriaLabel={t`Visit website`}
                      />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{t(experience.name)}</h3>
                      <p className="text-sm text-gray-600">
                        {(() => {
                          const sortedPositions = [...experience.positions].sort(
                            (a, b) =>
                              new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
                          )
                          const earliestStart = sortedPositions[0].startDate
                          let latestEnd: string | undefined

                          for (const position of sortedPositions) {
                            if (!position.endDate) {
                              latestEnd = undefined
                              break
                            }

                            if (!latestEnd || new Date(position.endDate) > new Date(latestEnd)) {
                              latestEnd = position.endDate
                            }
                          }

                          return formatDuration(earliestStart, latestEnd)
                        })()}
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-[1fr_auto] gap-6">
                    <div className="space-y-8">
                      {experience.positions.map((position, posIndex) => (
                        <div key={posIndex} className="relative pl-6 pb-6 last:pb-0">
                          <div className="absolute left-0 top-0 w-[1px] h-full bg-gray-200" />

                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">
                              {t(position.title)}
                            </h4>
                            <p className="text-gray-600 text-sm">{t(position.type)}</p>

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
                                <span>{t(position.location)}</span>
                              </div>
                            </div>

                            {position.description.length > 0 && (
                              <ul className="mt-3 space-y-1 text-gray-700 text-sm">
                                {position.description.map((item, itemIndex) => (
                                  <li
                                    key={itemIndex}
                                    className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-gray-400"
                                  >
                                    {t(item)}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {allSkills.length > 0 && (
                      <div className="md:w-64 lg:w-72 md:border-l md:border-gray-100 md:pl-6">
                        <div className="mb-3">
                          <h4 className="text-sm font-medium text-gray-700 flex items-center">
                            <span className="w-1 h-4 bg-primary/60 rounded-full mr-2" />
                            <Trans>Skills acquired</Trans>
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
