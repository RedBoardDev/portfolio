"use client"

import { ContentBox } from "@/components/ui/content-box"
import { ImageWithExternalLink } from "@/components/ui/image-with-external-link"
import { SkillBadge } from "@/components/ui/skill-badge"
import { educations } from "@/data/education"
import { useTranslation } from "@/hooks/use-translation"
import { motion } from "framer-motion"
import { Calendar, MapPin } from "lucide-react"

export default function EducationSection() {
  const { t, formatDate, loading } = useTranslation("education")

  return (
    <section id="education-section" className="relative">
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

        <div className="relative space-y-6">
          {educations.map((education, index) => {
            const skills = loading ? [] : t(`educations.${education.key}.skills`)

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
                    {/* Content section */}
                    <div>
                      {/* Header with logo */}
                      <div className="flex items-start gap-4 mb-4">
                        <ImageWithExternalLink
                          src={education.logo || "/placeholder.svg?height=56&width=56"}
                          alt={loading ? "..." : t(`educations.${education.key}.institution`)}
                          url={education.url}
                          width={56}
                          height={56}
                          className="w-14 h-14"
                          buttonTitle={loading ? "..." : t("visitSite")}
                          buttonAriaLabel={loading ? "..." : t("visitSite")}
                        />
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {loading ? "..." : t(`educations.${education.key}.institution`)}
                          </h3>
                          <p className="text-base text-gray-800 font-medium">
                            {loading ? (
                              "..."
                            ) : (
                              <>
                                {t(`educations.${education.key}.degree`)}{" "}
                                <span className="text-gray-400">·</span>{" "}
                                {t(`educations.${education.key}.field`)}
                              </>
                            )}
                          </p>
                        </div>
                      </div>

                      {/* Date and location with icons */}
                      <div className="flex flex-wrap gap-x-5 gap-y-2 mt-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-primary/70" />
                          <span>
                            {loading
                              ? "..."
                              : `${formatDate(education.startDate)} - ${formatDate(education.endDate)}`}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-primary/70" />
                          <span>{loading ? "..." : t(`educations.${education.key}.location`)}</span>
                        </div>
                      </div>

                      {/* Description - conditionally rendered */}
                      <div className="mt-4 text-gray-600 text-sm leading-relaxed">
                        {loading ? "..." : t(`educations.${education.key}.description`)}
                      </div>

                      {/* Skills section for mobile view */}
                      <div className="mt-4 md:hidden">
                        <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                          <span className="w-1 h-4 bg-primary/60 rounded-full mr-2" />
                          {loading ? "..." : t("skillsAcquired")}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {loading ? (
                            <span>...</span>
                          ) : Array.isArray(skills) ? (
                            skills.map((skill: string, skillIndex: number) => (
                              <SkillBadge key={skillIndex} name={skill} showTooltip={false} />
                            ))
                          ) : null}
                        </div>
                      </div>
                    </div>

                    {/* Skills section as a separate block on the right - desktop only */}
                    <div className="hidden md:block md:border-l md:border-gray-100 md:pl-6 md:ml-2 md:w-64 lg:w-72">
                      <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                        <span className="w-1 h-4 bg-primary/60 rounded-full mr-2" />
                        {loading ? "..." : t("skillsAcquired")}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {loading ? (
                          <span>...</span>
                        ) : Array.isArray(skills) ? (
                          skills.map((skill: string, skillIndex: number) => (
                            <SkillBadge key={skillIndex} name={skill} showTooltip={false} />
                          ))
                        ) : null}
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
