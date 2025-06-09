"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { experiences, calculateDuration, calculateTotalDuration, type Position } from "@/data/experiences"
import { Calendar, MapPin } from "lucide-react"
import { SkillBadge } from "@/components/ui/skill-badge"
import { ContentBox } from "@/components/ui/content-box"

// Helper to format display period string
const getDisplayPeriod = (position: Position): string => {
  const start = new Date(position.startDate)
  const startMonth = new Intl.DateTimeFormat("fr-FR", { month: "short" }).format(start)
  const startYear = start.getFullYear()

  let displayPeriod = `${startMonth} ${startYear}`

  if (position.endDate) {
    const end = new Date(position.endDate)
    const endMonth = new Intl.DateTimeFormat("fr-FR", { month: "short" }).format(end)
    const endYear = end.getFullYear()
    displayPeriod += ` - ${endMonth} ${endYear}`
  } else {
    displayPeriod += " - aujourd'hui"
  }

  return displayPeriod
}

export default function ExperienceSection() {
  return (
    <section id="experience-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-8 inline-block relative">
          Expérience
          <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-primary"></span>
        </h2>

        <div className="space-y-6">
          {experiences.map((experience, index) => {
            // Fusionner toutes les compétences des positions
            const allSkills = Array.from(
              new Set(experience.positions.flatMap((position) => position.skills || [])),
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
                    <div className="flex-shrink-0 sm:hidden w-12 h-12 rounded-lg overflow-hidden bg-white border border-gray-200 shadow-sm">
                      <Image
                        src={experience.logo || "/placeholder.svg?height=48&width=48"}
                        alt={experience.company}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>

                    {/* Logo - Desktop version */}
                    <div className="hidden sm:block w-16 h-16 rounded-lg overflow-hidden bg-white border border-gray-200 flex-shrink-0">
                      <Image
                        src={experience.logo || "/placeholder.svg?height=64&width=64"}
                        alt={experience.company}
                        width={64}
                        height={64}
                        className="object-cover"
                      />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{experience.company}</h3>
                      <p className="text-sm text-gray-600">{calculateTotalDuration(experience.positions)}</p>
                    </div>
                  </div>

                  {/* Grid layout for positions and skills */}
                  <div className="grid md:grid-cols-[1fr_auto] gap-6">
                    {/* Positions column */}
                    <div className="space-y-8">
                      {experience.positions.map((position, posIndex) => (
                        <div key={posIndex} className="relative pl-6 pb-6 last:pb-0">
                          {/* Position line */}
                          <div className="absolute left-0 top-0 w-[1px] h-full bg-gray-200"></div>

                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">{position.title}</h4>
                            <p className="text-gray-600 text-sm">{position.type}</p>

                            <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-sm text-gray-500 mt-2">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-2 text-primary/70" />
                                <span>
                                  {getDisplayPeriod(position)} ·{" "}
                                  {calculateDuration(position.startDate, position.endDate)}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-2 text-primary/70" />
                                <span>{position.location}</span>
                              </div>
                            </div>

                            {/* Description */}
                            {position.description && position.description.length > 0 && (
                              <ul className="mt-3 space-y-1 text-gray-700 text-sm">
                                {position.description.map((item, idx) => (
                                  <li
                                    key={idx}
                                    className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-gray-400"
                                  >
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Skills column - only visible if there are skills */}
                    {allSkills.length > 0 && (
                      <div className="md:w-64 lg:w-72 md:border-l md:border-gray-100 md:pl-6">
                        <div className="mb-3">
                          <h4 className="text-sm font-medium text-gray-700 flex items-center">
                            <span className="w-1 h-4 bg-primary/60 rounded-full mr-2"></span>
                            Compétences acquises
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
