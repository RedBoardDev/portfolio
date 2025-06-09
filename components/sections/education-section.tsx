"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { educations, formatDisplayDate } from "@/data/education"
import { MapPin, Calendar, ExternalLink } from "lucide-react"
import { SkillBadge } from "@/components/ui/skill-badge"
import { ContentBox } from "@/components/ui/content-box"

export default function EducationSection() {
  return (
    <section id="education-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-8 inline-block relative">
          Formation
          <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-primary"></span>
        </h2>

        <div className="relative space-y-6">
          {educations.map((education, index) => (
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
                      <div className="relative">
                        <div className="w-14 h-14 rounded-lg overflow-hidden bg-white border border-gray-100 flex-shrink-0">
                          <Image
                            src={education.logo || "/placeholder.svg?height=56&width=56"}
                            alt={education.institution}
                            width={56}
                            height={56}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        {education.url && (
                          <a
                            href={education.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute -bottom-2 -right-2 w-7 h-7 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-100 shadow-sm"
                            title="Visiter le site"
                          >
                            <ExternalLink size={14} className="text-primary/70" />
                          </a>
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{education.institution}</h3>
                        <p className="text-base text-gray-800 font-medium">
                          {education.degree} <span className="text-gray-400">·</span> {education.field}
                        </p>
                      </div>
                    </div>

                    {/* Date and location with icons */}
                    <div className="flex flex-wrap gap-x-5 gap-y-2 mt-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-primary/70" />
                        <span>
                          {formatDisplayDate(education.startDate)} - {formatDisplayDate(education.endDate)}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-primary/70" />
                        <span>{education.location}</span>
                      </div>
                    </div>

                    {/* Description - conditionally rendered */}
                    {education.description && (
                      <div className="mt-4 text-gray-600 text-sm leading-relaxed">{education.description}</div>
                    )}

                    {/* Skills section for mobile view */}
                    {education.skills && education.skills.length > 0 && (
                      <div className="mt-4 md:hidden">
                        <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                          <span className="w-1 h-4 bg-primary/60 rounded-full mr-2"></span>
                          Compétences acquises
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {education.skills.map((skill, skillIndex) => (
                            <SkillBadge key={skillIndex} name={skill} showTooltip={false} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Skills section as a separate block on the right - desktop only */}
                  {education.skills && education.skills.length > 0 && (
                    <div className="hidden md:block md:border-l md:border-gray-100 md:pl-6 md:ml-2 md:w-64 lg:w-72">
                      <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                        <span className="w-1 h-4 bg-primary/60 rounded-full mr-2"></span>
                        Compétences acquises
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {education.skills.map((skill, skillIndex) => (
                          <SkillBadge key={skillIndex} name={skill} showTooltip={false} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </ContentBox>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
