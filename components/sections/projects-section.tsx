"use client"

import { SectionHeading } from "@/components/shared/section-heading"
import { Button } from "@/components/ui/button"
import { ContentBox } from "@/components/ui/content-box"
import { LanguageBadge } from "@/components/ui/language-badge"
import { OptimizedImage } from "@/components/ui/optimized-image"
import { projectsData } from "@/data/projects"
import { useTranslation } from "@/hooks/use-translation"
import { motion } from "framer-motion"
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react"
import { type TouchEvent, useCallback, useEffect, useRef, useState } from "react"

export default function ProjectsSection() {
  const { t } = useTranslation("projects")
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [swipeOffset, setSwipeOffset] = useState(0)

  const swipeContainerRef = useRef<HTMLDivElement>(null)
  const startTouchRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIsMobile()
    window.addEventListener("resize", checkIsMobile)

    return () => {
      window.removeEventListener("resize", checkIsMobile)
    }
  }, [])

  const projectsPerPage = isMobile ? 1 : 6
  const totalPages = Math.ceil(projectsData.length / projectsPerPage)

  useEffect(() => {
    if (isMobile) {
      setCurrentPage(currentProjectIndex)
    }
  }, [currentProjectIndex, isMobile])

  const nextPage = useCallback(() => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1)

      if (!isMobile && swipeContainerRef.current) {
        swipeContainerRef.current.scrollIntoView({ behavior: "smooth" })
      }
    }
  }, [currentPage, totalPages, isMobile])

  const prevPage = useCallback(() => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1)

      if (!isMobile && swipeContainerRef.current) {
        swipeContainerRef.current.scrollIntoView({ behavior: "smooth" })
      }
    }
  }, [currentPage, isMobile])

  const handleTouchStart = useCallback((event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0]
    startTouchRef.current = { x: touch.clientX, y: touch.clientY }
    setIsDragging(true)
  }, [])

  const handleTouchMove = useCallback(
    (event: TouchEvent<HTMLDivElement>) => {
      if (!isDragging) {
        return
      }

      const touch = event.touches[0]
      const deltaX = touch.clientX - startTouchRef.current.x
      const deltaY = touch.clientY - startTouchRef.current.y

      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 5) {
        event.preventDefault()
        event.stopPropagation()
        const maxOffset = 120
        setSwipeOffset(Math.max(-maxOffset, Math.min(maxOffset, deltaX)))
      }
    },
    [isDragging]
  )

  const handleTouchEnd = useCallback(() => {
    if (!isDragging) {
      return
    }

    const threshold = 60
    const absOffset = Math.abs(swipeOffset)

    if (absOffset > threshold && !isTransitioning) {
      setIsTransitioning(true)
      setCurrentProjectIndex((prev) =>
        swipeOffset > 0
          ? prev === 0
            ? projectsData.length - 1
            : prev - 1
          : prev === projectsData.length - 1
            ? 0
            : prev + 1
      )
      window.setTimeout(() => setIsTransitioning(false), 350)
    }

    const duration = 200
    const startTime = Date.now()
    const startOffset = swipeOffset

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeOut = 1 - (1 - progress) ** 3

      setSwipeOffset(startOffset * (1 - easeOut))

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setIsDragging(false)
        setSwipeOffset(0)
      }
    }

    requestAnimationFrame(animate)
  }, [isDragging, isTransitioning, swipeOffset])

  const goToNextProject = () => {
    if (!isTransitioning) {
      setIsTransitioning(true)
      setCurrentProjectIndex((prev) => (prev === projectsData.length - 1 ? 0 : prev + 1))
      window.setTimeout(() => setIsTransitioning(false), 350)
    }
  }

  const goToPreviousProject = () => {
    if (!isTransitioning) {
      setIsTransitioning(true)
      setCurrentProjectIndex((prev) => (prev === 0 ? projectsData.length - 1 : prev - 1))
      window.setTimeout(() => setIsTransitioning(false), 350)
    }
  }

  const goToProject = (index: number) => {
    if (index !== currentProjectIndex && !isTransitioning) {
      setIsTransitioning(true)
      setCurrentProjectIndex(index)
      window.setTimeout(() => setIsTransitioning(false), 350)
    }
  }

  const currentProjects = projectsData.slice(
    currentPage * projectsPerPage,
    (currentPage + 1) * projectsPerPage
  )

  return (
    <section id="projects-section" ref={swipeContainerRef}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <SectionHeading title={t("section.title")} className="mb-10" />

        {isMobile ? (
          <div
            className="relative h-[640px] overflow-hidden"
            onTouchStart={(event) => event.stopPropagation()}
            onTouchMove={(event) => event.stopPropagation()}
          >
            <div className="relative h-full w-full">
              {projectsData.map((project, index) => {
                const isActive = index === currentProjectIndex
                const isNext = index === currentProjectIndex + 1
                const isPrev = index === currentProjectIndex - 1
                const isVisible = isActive || isNext || isPrev

                if (!isVisible) {
                  return null
                }

                let zIndex = 10
                let scale = 0.86
                let translateY = 22
                let opacity = 0.32

                if (isActive) {
                  zIndex = 30
                  scale = 1
                  translateY = 0
                  opacity = 1
                } else if (isNext) {
                  zIndex = 20
                  scale = 0.95
                  translateY = 12
                  opacity = 0.72
                } else if (isPrev) {
                  zIndex = 10
                  scale = 0.91
                  translateY = 16
                  opacity = 0.52
                }

                let translateX = 0
                let rotation = 0
                let cardOpacity = opacity

                if (isActive && isDragging) {
                  translateX = swipeOffset
                  rotation = swipeOffset * 0.08
                  cardOpacity = Math.max(0.8, 1 - Math.abs(swipeOffset) / 300)
                }

                return (
                  <motion.div
                    key={project.key}
                    className="absolute inset-0 cursor-grab active:cursor-grabbing"
                    style={{
                      zIndex,
                      scale,
                      y: translateY,
                      x: translateX,
                      rotate: rotation,
                      opacity: cardOpacity,
                    }}
                    animate={{ scale, y: translateY, opacity }}
                    transition={{ type: "spring", stiffness: 380, damping: 34, mass: 0.82 }}
                    onTouchStart={isActive ? handleTouchStart : undefined}
                    onTouchMove={isActive ? handleTouchMove : undefined}
                    onTouchEnd={isActive ? handleTouchEnd : undefined}
                  >
                    <ContentBox noPadding className="flex h-full overflow-hidden" shadow="lg">
                      <div className="relative flex h-80 items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 z-0">
                          <OptimizedImage
                            src={project.image || "/placeholder.svg?height=400&width=600"}
                            alt=""
                            fill
                            className="object-cover scale-110 opacity-45 blur-md"
                            aria-hidden="true"
                          />
                        </div>

                        <div className="absolute inset-0 z-10">
                          <OptimizedImage
                            src={project.image || "/placeholder.svg?height=400&width=600"}
                            alt={`Capture d'écran du projet ${t(`projects.${project.key}.title`)}`}
                            fill
                            className="object-contain"
                            draggable="false"
                            aspectRatio={1.67}
                          />
                        </div>

                        <div className="absolute inset-0 z-[15] bg-gradient-to-t from-slate-950/82 via-slate-950/20 to-transparent" />

                        <div className="absolute right-4 top-4 z-30 flex max-w-[70%] flex-wrap justify-end gap-2">
                          {project.languages.slice(0, 6).map((lang, langIndex) => (
                            <LanguageBadge key={langIndex} language={lang} size="sm" />
                          ))}
                          {project.languages.length > 6 ? (
                            <div className="rounded-xl bg-slate-950/40 px-2 py-1 text-xs font-medium text-white">
                              +{project.languages.length - 6}
                            </div>
                          ) : null}
                        </div>

                        <div className="absolute inset-x-0 bottom-0 z-30 p-5">
                          <h3 className="text-xl font-semibold text-white">
                            {t(`projects.${project.key}.title`)}
                          </h3>
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col bg-white/82 p-5">
                        <div className="flex-1">
                          <p className="line-clamp-5 text-sm leading-7 text-slate-700">
                            {t(`projects.${project.key}.description`)}
                          </p>
                        </div>

                        <div className="mt-4 flex items-center justify-between border-t border-slate-200/80 pt-4">
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center rounded-xl border border-slate-200/80 bg-white/72 px-3.5 py-2 text-slate-700 transition-[background-color,color,border-color] duration-200 hover:border-slate-300 hover:bg-white hover:text-slate-950"
                            onClick={(event) => isDragging && event.preventDefault()}
                          >
                            <Github size={16} className="mr-2" />
                            <span className="text-sm">{t("ui.code")}</span>
                          </a>

                          {project.liveLink ? (
                            <a
                              href={project.liveLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center rounded-xl border border-slate-200/80 bg-white/72 px-3.5 py-2 text-slate-700 transition-[background-color,color,border-color] duration-200 hover:border-slate-300 hover:bg-white hover:text-slate-950"
                              onClick={(event) => isDragging && event.preventDefault()}
                            >
                              <span className="text-sm">{t("ui.demo")}</span>
                              <ExternalLink size={16} className="ml-2" />
                            </a>
                          ) : null}
                        </div>
                      </div>
                    </ContentBox>
                  </motion.div>
                )
              })}
            </div>

            <div className="absolute bottom-4 left-0 right-0 z-40 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={goToPreviousProject}
                disabled={isTransitioning}
                className={`flex h-11 w-11 items-center justify-center rounded-xl border border-white/80 bg-white/88 shadow-[0_18px_32px_-24px_rgba(15,23,42,0.4)] transition-[background-color,color,opacity] duration-200 ${
                  isTransitioning
                    ? "cursor-not-allowed text-slate-300 opacity-50"
                    : "text-slate-700 hover:bg-white hover:text-slate-950 active:scale-95"
                }`}
                aria-label="Projet précédent"
              >
                <ChevronLeft size={18} />
              </button>

              <div className="flex gap-2">
                {projectsData.map((_, index) => (
                  <button
                    type="button"
                    key={index}
                    onClick={() => goToProject(index)}
                    className={`rounded-full transition-[width,background-color] duration-300 ${
                      index === currentProjectIndex
                        ? "h-2 w-10 bg-slate-950"
                        : "h-2 w-2 bg-slate-300 hover:bg-slate-400"
                    }`}
                    aria-label={`Aller au projet ${index + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={goToNextProject}
                disabled={isTransitioning}
                className={`flex h-11 w-11 items-center justify-center rounded-xl border border-white/80 bg-white/88 shadow-[0_18px_32px_-24px_rgba(15,23,42,0.4)] transition-[background-color,color,opacity] duration-200 ${
                  isTransitioning
                    ? "cursor-not-allowed text-slate-300 opacity-50"
                    : "text-slate-700 hover:bg-white hover:text-slate-950 active:scale-95"
                }`}
                aria-label="Projet suivant"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <div className="absolute left-0 right-0 top-4 z-40 text-center">
              <div className="inline-block rounded-2xl border border-white/30 bg-slate-950/42 px-4 py-2 text-xs text-white backdrop-blur-sm">
                Glissez pour naviguer • {currentProjectIndex + 1}/{projectsData.length}
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-4 grid grid-cols-1 gap-7 md:grid-cols-3">
            {currentProjects.map((project, index) => (
              <motion.div
                key={`${project.key}-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group relative"
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <ContentBox noPadding className="flex h-full flex-col overflow-hidden" shadow="md">
                  <div className="relative flex h-64 items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 z-0">
                      <OptimizedImage
                        src={project.image || "/placeholder.svg?height=400&width=600"}
                        alt=""
                        fill
                        className="object-cover scale-110 opacity-55 blur-md"
                        aria-hidden="true"
                      />
                    </div>

                    <div className="absolute inset-0 z-10">
                      <OptimizedImage
                        src={project.image || "/placeholder.svg?height=400&width=600"}
                        alt={`Capture d'écran du projet ${t(`projects.${project.key}.title`)}`}
                        fill
                        className="object-contain"
                        aspectRatio={1.67}
                      />
                    </div>

                    <div className="absolute inset-0 z-[15] bg-gradient-to-t from-slate-950/72 via-transparent to-transparent opacity-70 transition-opacity duration-300" />
                    <div
                      className={`absolute inset-0 z-[25] bg-slate-950 transition-opacity duration-300 ${
                        hoveredProject === index ? "opacity-20" : "opacity-0"
                      }`}
                    />

                    <div className="absolute right-3 top-3 z-30 flex gap-2 transition-opacity duration-300 opacity-100 md:opacity-0 md:group-hover:opacity-100">
                      {project.languages.slice(0, 8).map((lang, langIndex) => (
                        <LanguageBadge key={langIndex} language={lang} size="sm" />
                      ))}
                      {project.languages.length > 8 ? (
                        <div className="rounded-xl bg-slate-950/40 px-2 py-1 text-xs font-medium text-white">
                          +{project.languages.length - 8}
                        </div>
                      ) : null}
                    </div>

                    <div className="absolute inset-x-0 bottom-0 z-30 p-4">
                      <h3 className="text-lg font-semibold text-white">
                        {t(`projects.${project.key}.title`)}
                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-grow flex-col bg-white/82 p-5">
                    <div className="flex-grow">
                      <p className="line-clamp-4 text-sm leading-7 text-slate-700">
                        {t(`projects.${project.key}.description`)}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-slate-200/80 pt-3">
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center rounded-xl border border-slate-200/80 bg-white/72 px-3.5 py-2 text-xs font-medium text-slate-700 transition-[background-color,color,border-color] duration-200 hover:border-slate-300 hover:bg-white hover:text-slate-950"
                      >
                        <Github size={14} className="mr-1" />
                        {t("ui.code")}
                      </a>

                      {project.liveLink ? (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center rounded-xl border border-slate-200/80 bg-white/72 px-3.5 py-2 text-xs font-medium text-slate-700 transition-[background-color,color,border-color] duration-200 hover:border-slate-300 hover:bg-white hover:text-slate-950"
                        >
                          {t("ui.demo")}
                          <ExternalLink size={14} className="ml-1" />
                        </a>
                      ) : null}
                    </div>
                  </div>
                </ContentBox>
              </motion.div>
            ))}
          </div>
        )}

        {!isMobile && totalPages > 1 ? (
          <div className="relative mt-8 flex items-center justify-center">
            <div className="flex items-center gap-4 rounded-[22px] border border-slate-200/80 bg-white/68 px-4 py-3 shadow-[0_18px_36px_-30px_rgba(15,23,42,0.34)]">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={prevPage}
                disabled={currentPage === 0}
                className="h-10 w-10"
              >
                <ChevronLeft size={16} />
              </Button>

              <div className="font-mono text-sm text-slate-600">
                {currentPage + 1} / {totalPages}
              </div>

              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={nextPage}
                disabled={currentPage === totalPages - 1}
                className="h-10 w-10"
              >
                <ChevronRight size={16} />
              </Button>
            </div>

            <a
              href="https://github.com/redBoardDev?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="group absolute right-0 inline-flex items-center gap-2 text-sm font-medium text-slate-700 transition-colors hover:text-slate-950"
            >
              <span>{t("ui.viewAll")}</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        ) : null}

        {isMobile ? (
          <div className="mt-6 flex justify-center">
            <a
              href="https://github.com/redBoardDev?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm font-medium text-slate-700 transition-colors hover:text-slate-950"
            >
              <span>{t("ui.viewAll")}</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        ) : null}
      </motion.div>
    </section>
  )
}
