"use client"

import { SectionHeading } from "@/components/shared/section-heading"
import { ContentBox } from "@/components/ui/content-box"
import { ImageWithExternalLink } from "@/components/ui/image-with-external-link"
import { SkillBadge } from "@/components/ui/skill-badge"
import { educations } from "@/data/education"
import { Trans, useLingui } from "@lingui/react/macro"
import { motion } from "framer-motion"
import { Calendar, MapPin } from "lucide-react"

export default function EducationSection() {
  const { i18n, t } = useLingui()

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr)

    if (dateStr.length === 4) {
      return dateStr
    }

    return i18n.date(date, { month: "short", year: "numeric" })
  }

  return (
    <section id="education-section" className="relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <SectionHeading title={t`Education`} className="mb-10" />

        <div className="relative space-y-6">
          {educations.map((education, index) => {
            const skills = education.skills.map((skill) => t(skill))

            return (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <ContentBox shadow="md">
                  <div className="grid md:grid-cols-[1fr_auto] gap-6">
                    <div>
                      <div className="flex items-start gap-4 mb-4">
                        <ImageWithExternalLink
                          src={education.logo || "/placeholder.svg?height=56&width=56"}
                          alt={t(education.institution)}
                          url={education.url}
                          width={56}
                          height={56}
                          className="w-14 h-14"
                          buttonTitle={t`Visit website`}
                          buttonAriaLabel={t`Visit website`}
                        />
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {t(education.institution)}
                          </h3>
                          <p className="text-base text-gray-800 font-medium">
                            {t(education.degree)} <span className="text-gray-400">&middot;</span>{" "}
                            {t(education.field)}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-x-5 gap-y-2 mt-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-primary/70" />
                          <span>
                            {formatDate(education.startDate)} - {formatDate(education.endDate)}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-primary/70" />
                          <span>{t(education.location)}</span>
                        </div>
                      </div>

                      <div className="mt-4 text-gray-600 text-sm leading-relaxed">
                        {t(education.description)}
                      </div>

                      <div className="mt-4 md:hidden">
                        <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                          <span className="w-1 h-4 bg-primary/60 rounded-full mr-2" />
                          <Trans>Skills acquired</Trans>
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {skills.map((skill, skillIndex) => (
                            <SkillBadge key={skillIndex} name={skill} showTooltip={false} />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="hidden md:block md:border-l md:border-gray-100 md:pl-6 md:ml-2 md:w-64 lg:w-72">
                      <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                        <span className="w-1 h-4 bg-primary/60 rounded-full mr-2" />
                        <Trans>Skills acquired</Trans>
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill, skillIndex) => (
                          <SkillBadge key={skillIndex} name={skill} showTooltip={false} />
                        ))}
                      </div>
                    </div>
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
