"use client"

import { SectionHeading } from "@/components/shared/section-heading"
import { ContentBox } from "@/components/ui/content-box"
import { ProjectCover } from "@/components/ui/project-cover"
import { projectsData } from "@/data/projects"
import { cn } from "@/lib/utils"
import { Trans, useLingui } from "@lingui/react/macro"
import { motion } from "framer-motion"
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react"
import { useState } from "react"

export default function ProjectsSection() {
  const { t } = useLingui()
  const [currentPage, setCurrentPage] = useState(0)

  const projectsPerPage = 6
  const totalPages = Math.ceil(projectsData.length / projectsPerPage)
  const currentProjects = projectsData.slice(
    currentPage * projectsPerPage,
    (currentPage + 1) * projectsPerPage
  )

  return (
    <section id="projects-section">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <SectionHeading
          eyebrow={t`Selected work`}
          title={t`Projects`}
          description={t`A selection of the tools, bots and apps I build - from Go CLIs and serverless platforms to Solana DeFi automation.`}
          className="mb-10"
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {currentProjects.map((project, index) => (
            <motion.div
              key={project.githubLink}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, ease: "easeOut", delay: (index % 3) * 0.05 }}
              className="group h-full"
            >
              <ContentBox noPadding shadow="sm" className="flex h-full flex-col">
                <div className="relative h-32 overflow-hidden border-b border-border/70">
                  <ProjectCover
                    image={project.image}
                    primaryLanguage={project.primaryLanguage}
                    alt={t`Screenshot of ${project.title}`}
                  />
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-sm font-semibold text-foreground">{project.title}</h3>

                  <p className="mt-2 line-clamp-4 text-[0.82rem] leading-6 text-muted-foreground">
                    {t(project.description)}
                  </p>

                  <p className="mt-3 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-muted-foreground/80">
                    {project.languages.join(" · ")}
                  </p>

                  <div className="mt-auto flex items-center gap-5 border-t border-border/70 pt-3.5 text-xs font-medium">
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={t`View ${project.title} source code on GitHub`}
                      className="inline-flex items-center gap-1.5 rounded-md py-1 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      <Github className="h-3.5 w-3.5" aria-hidden="true" />
                      <Trans>Code</Trans>
                    </a>

                    {project.liveLink ? (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={t`Open ${project.title}`}
                        className="inline-flex items-center gap-1.5 rounded-md py-1 text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      >
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                        <Trans>Visit</Trans>
                      </a>
                    ) : null}
                  </div>
                </div>
              </ContentBox>
            </motion.div>
          ))}
        </div>

        <div className="relative mt-10">
          {totalPages > 1 ? (
            <div className="flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.max(0, page - 1))}
                disabled={currentPage === 0}
                aria-label={t`Previous projects`}
                className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-card hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-1.5">
                {Array.from({ length: totalPages }).map((_, pageIndex) => (
                  <button
                    type="button"
                    key={`page-${pageIndex}`}
                    onClick={() => setCurrentPage(pageIndex)}
                    aria-label={t`Go to page ${pageIndex + 1}`}
                    aria-current={pageIndex === currentPage ? "true" : undefined}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                      pageIndex === currentPage
                        ? "w-5 bg-foreground"
                        : "w-1.5 bg-border hover:bg-muted-foreground/50"
                    )}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.min(totalPages - 1, page + 1))}
                disabled={currentPage === totalPages - 1}
                aria-label={t`Next projects`}
                className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-card hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          ) : null}

          <div className="mt-5 flex justify-center sm:absolute sm:right-0 sm:top-1/2 sm:mt-0 sm:-translate-y-1/2">
            <a
              href="https://github.com/RedBoardDev?tab=repositories&type=source"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-md text-sm font-medium text-foreground/80 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <Trans>View all projects on GitHub</Trans>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
