"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import { projectsData } from "@/data/projects"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, ChevronRight, ChevronLeft, ArrowRight } from "lucide-react"
import { LanguageBadge } from "@/components/ui/language-badge"
import { ContentBox } from "@/components/ui/content-box"
import { OptimizedImage } from "@/components/ui/optimized-image"
import { useTranslation } from "@/hooks/use-translation"

export default function ProjectsSection() {
  const { t } = useTranslation("projects")
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [direction, setDirection] = useState(0) // -1 pour gauche, 1 pour droite, 0 pour initial
  const [isDragging, setIsDragging] = useState(false)
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const swipeContainerRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const startTouchRef = useRef({ x: 0, y: 0 })
  const [swipeOffset, setSwipeOffset] = useState(0)
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null)

  // Détecter si l'appareil est mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIsMobile()
    window.addEventListener("resize", checkIsMobile)
    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  // Nombre de projets par page (2 lignes de 3 sur desktop, 1 projet à la fois sur mobile)
  const projectsPerPage = isMobile ? 1 : 6

  // Calculer le nombre total de pages
  const totalPages = Math.ceil(projectsData.length / projectsPerPage)

  // Effet pour synchroniser currentPage avec currentProjectIndex sur mobile
  useEffect(() => {
    if (isMobile) {
      setCurrentPage(currentProjectIndex)
    }
  }, [currentProjectIndex, isMobile])

  // Fonctions de navigation
  const nextPage = useCallback(() => {
    if (currentPage < totalPages - 1) {
      setDirection(1)
      setCurrentPage((prev) => prev + 1)
      // Scroll vers le haut de la section sur desktop
      if (!isMobile && swipeContainerRef.current) {
        swipeContainerRef.current.scrollIntoView({ behavior: "smooth" })
      }
    }
  }, [currentPage, totalPages, isMobile])

  const prevPage = useCallback(() => {
    if (currentPage > 0) {
      setDirection(-1)
      setCurrentPage((prev) => prev - 1)
      // Scroll vers le haut de la section sur desktop
      if (!isMobile && swipeContainerRef.current) {
        swipeContainerRef.current.scrollIntoView({ behavior: "smooth" })
      }
    }
  }, [currentPage, isMobile])

  // Gestionnaire des événements touch pour le swipe
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0]
    startTouchRef.current = { x: touch.clientX, y: touch.clientY }
    setIsDragging(true)
  }, [])

        const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return

    const touch = e.touches[0]
    const deltaX = touch.clientX - startTouchRef.current.x
    const deltaY = touch.clientY - startTouchRef.current.y

    // Empêcher le scroll vertical si le mouvement horizontal est prédominant
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 5) {
      e.preventDefault()
      e.stopPropagation()
      // Limiter l'offset pour éviter les mouvements trop extrêmes
      const maxOffset = 120
      const clampedOffset = Math.max(-maxOffset, Math.min(maxOffset, deltaX))
      setSwipeOffset(clampedOffset)
      setSwipeDirection(deltaX > 0 ? 'right' : 'left')
    }
  }, [isDragging])

        const handleTouchEnd = useCallback(() => {
    if (!isDragging) return

    const threshold = 60 // Seuil plus sensible
    const absOffset = Math.abs(swipeOffset)

    if (absOffset > threshold) {
      if (swipeOffset > 0) {
        // Swipe vers la droite - projet précédent (avec rebouclage)
        if (!isTransitioning) {
          setIsTransitioning(true)
          setDirection(-1)
          setCurrentProjectIndex(prev => prev === 0 ? projectsData.length - 1 : prev - 1)
          setTimeout(() => setIsTransitioning(false), 350)
        }
      } else if (swipeOffset < 0) {
        // Swipe vers la gauche - projet suivant (avec rebouclage)
        if (!isTransitioning) {
          setIsTransitioning(true)
          setDirection(1)
          setCurrentProjectIndex(prev => prev === projectsData.length - 1 ? 0 : prev + 1)
          setTimeout(() => setIsTransitioning(false), 350)
        }
      }
    }

    // Animation de retour progressive
    const resetAnimation = () => {
      const duration = 200
      const startTime = Date.now()
      const startOffset = swipeOffset

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easeOut = 1 - Math.pow(1 - progress, 3)

        setSwipeOffset(startOffset * (1 - easeOut))

        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          setIsDragging(false)
          setSwipeOffset(0)
          setSwipeDirection(null)
        }
      }

      requestAnimationFrame(animate)
    }

    resetAnimation()
  }, [isDragging, swipeOffset, currentProjectIndex, isTransitioning])

  const goToNextProject = () => {
    if (!isTransitioning) {
      setIsTransitioning(true)
      setDirection(1)
      // Navigation circulaire : retour au début si on est à la fin
      setCurrentProjectIndex(prev => prev === projectsData.length - 1 ? 0 : prev + 1)
      setTimeout(() => setIsTransitioning(false), 350)
    }
  }

  const goToPreviousProject = () => {
    if (!isTransitioning) {
      setIsTransitioning(true)
      setDirection(-1)
      // Navigation circulaire : aller à la fin si on est au début
      setCurrentProjectIndex(prev => prev === 0 ? projectsData.length - 1 : prev - 1)
      setTimeout(() => setIsTransitioning(false), 350)
    }
  }

  // Fonction pour aller directement à un projet spécifique
  const goToProject = (index: number) => {
    if (index !== currentProjectIndex && !isTransitioning) {
      setIsTransitioning(true)
      setDirection(index > currentProjectIndex ? 1 : -1)
      setCurrentProjectIndex(index)
      setTimeout(() => setIsTransitioning(false), 350)
    }
  }

  // Obtenir les projets pour la page actuelle
  const currentProjects = projectsData.slice(currentPage * projectsPerPage, (currentPage + 1) * projectsPerPage)

  return (
    <section id="projects-section" ref={swipeContainerRef}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 inline-block relative">
            {t("section.title")}
            <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-primary"></span>
          </h2>
        </div>

        {isMobile ? (
          // Vue mobile avec système de stack de cartes (style Tinder)
          <div
            className="relative h-[600px] overflow-hidden"
            onTouchStart={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            {/* Container des cartes empilées */}
            <div className="relative w-full h-full">
              {projectsData.map((project, index) => {
                const isActive = index === currentProjectIndex
                const isNext = index === currentProjectIndex + 1
                const isPrev = index === currentProjectIndex - 1
                const isVisible = isActive || isNext || isPrev

                if (!isVisible) return null

                // Calculs pour l'effet de pile
                let zIndex = 10
                let scale = 0.85
                let translateY = 20
                let opacity = 0.3

                if (isActive) {
                  zIndex = 30
                  scale = 1
                  translateY = 0
                  opacity = 1
                } else if (isNext) {
                  zIndex = 20
                  scale = 0.95
                  translateY = 10
                  opacity = 0.7
                } else if (isPrev) {
                  zIndex = 10
                  scale = 0.9
                  translateY = 15
                  opacity = 0.5
                }

                // Appliquer l'offset de swipe à la carte active
                let translateX = 0
                let rotation = 0
                let cardOpacity = opacity

                if (isActive && isDragging) {
                  translateX = swipeOffset
                  rotation = swipeOffset * 0.08 // Rotation subtile
                  // Réduire légèrement l'opacité quand on swipe
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
                    animate={{
                      scale,
                      y: translateY,
                      opacity,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 35,
                      mass: 0.8,
                    }}
                    onTouchStart={isActive ? handleTouchStart : undefined}
                    onTouchMove={isActive ? handleTouchMove : undefined}
                    onTouchEnd={isActive ? handleTouchEnd : undefined}
                  >
                    <ContentBox noPadding className="h-full" shadow="lg">
                      {/* Image du projet */}
                      <div className="relative h-80 overflow-hidden flex items-center justify-center">
                        {/* Image floutée en arrière-plan */}
                        <div className="absolute inset-0 z-0">
                          <OptimizedImage
                            src={project.image || "/placeholder.svg?height=400&width=600"}
                            alt=""
                            fill
                            className="object-cover blur-md scale-110 opacity-40"
                          />
                        </div>

                        {/* Image nette au premier plan */}
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

                        {/* Overlay de base (dégradé) */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 z-15" />



                        {/* Languages badges */}
                        <div className="absolute top-4 right-4 flex gap-2 z-30">
                          {project.languages.slice(0, 6).map((lang, langIndex) => (
                            <LanguageBadge key={langIndex} language={lang} size="sm" />
                          ))}
                          {project.languages.length > 6 && (
                            <div className="text-white text-xs font-medium bg-black/30 px-2 py-1 rounded">
                              +{project.languages.length - 6}
                            </div>
                          )}
                        </div>

                        {/* Title */}
                        <div className="absolute bottom-0 left-0 right-0 p-5 z-30">
                          <h3 className="text-xl font-bold text-white mb-2">
                            {t(`projects.${project.key}.title`)}
                          </h3>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 flex-1 flex flex-col">
                        {/* Description avec scroll si nécessaire */}
                        <div className="flex-1 max-h-32 overflow-y-auto">
                          <p className="text-gray-700 text-sm leading-relaxed">
                            {t(`projects.${project.key}.description`)}
                          </p>
                        </div>

                        {/* Links */}
                        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-gray-700 hover:text-primary transition-colors"
                            onClick={(e) => isDragging && e.preventDefault()}
                          >
                            <Github size={16} className="mr-2" />
                            <span className="text-sm">{t("ui.code")}</span>
                          </a>

                          {project.liveLink && (
                            <a
                              href={project.liveLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-gray-700 hover:text-primary transition-colors"
                              onClick={(e) => isDragging && e.preventDefault()}
                            >
                              <span className="text-sm">{t("ui.demo")}</span>
                              <ExternalLink size={16} className="ml-2" />
                            </a>
                          )}
                        </div>
                      </div>
                    </ContentBox>
                  </motion.div>
                )
              })}
            </div>

                        {/* Indicateur de progression avec boutons intégrés */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-4 z-40">
              {/* Bouton précédent */}
              <button
                onClick={goToPreviousProject}
                disabled={isTransitioning}
                className={`w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center transition-all ${
                  isTransitioning
                    ? 'text-gray-300 cursor-not-allowed opacity-50'
                    : 'text-gray-700 hover:text-primary hover:bg-white active:scale-95'
                }`}
              >
                <ChevronLeft size={18} />
              </button>

              {/* Stepper */}
              <div className="flex gap-2">
                {projectsData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToProject(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === currentProjectIndex
                        ? 'w-8 bg-primary'
                        : 'w-1.5 bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>

              {/* Bouton suivant */}
              <button
                onClick={goToNextProject}
                disabled={isTransitioning}
                className={`w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center transition-all ${
                  isTransitioning
                    ? 'text-gray-300 cursor-not-allowed opacity-50'
                    : 'text-gray-700 hover:text-primary hover:bg-white active:scale-95'
                }`}
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Instructions de swipe */}
            <div className="absolute top-4 left-0 right-0 text-center z-40">
              <div className="inline-block bg-black/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                Glissez pour naviguer • {currentProjectIndex + 1}/{projectsData.length}
              </div>
            </div>
          </div>
        ) : (
          // Vue desktop avec grid
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
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
                <ContentBox noPadding className="h-full flex flex-col" shadow="md">
                                    {/* Image */}
                  <div className="relative h-64 overflow-hidden flex items-center justify-center">
                    {/* Image floutée en arrière-plan */}
                    <div className="absolute inset-0 z-0">
                      <OptimizedImage
                        src={project.image || "/placeholder.svg?height=400&width=600"}
                        alt=""
                        fill
                        className="object-cover blur-md scale-110 opacity-55"
                      />
                    </div>

                    {/* Image nette au premier plan */}
                    <div className="absolute inset-0 z-10">
                      <OptimizedImage
                        src={project.image || "/placeholder.svg?height=400&width=600"}
                        alt={`Capture d'écran du projet ${t(`projects.${project.key}.title`)}`}
                        fill
                        className={`
                          object-contain transition-transform duration-500 ease-in-out
                          ${hoveredProject === index ? "scale-105" : "scale-100"}
                        `}
                        aspectRatio={1.67} // 16:9 aspect ratio
                      />
                    </div>

                    {/* Overlay de base (dégradé) */}
                    <div
                      className={`
                        absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent
                        opacity-60 transition-opacity duration-300 z-15
                      `}
                    />

                    {/* Overlay noir léger au hover */}
                    <div
                      className={`
                        absolute inset-0 bg-black transition-opacity duration-300 z-25
                        ${hoveredProject === index ? "opacity-20" : "opacity-0"}
                      `}
                    />

                    {/* Languages badges */}
                    <div
                      className={`
                        absolute top-3 right-3 flex gap-2 transition-opacity duration-300 z-30
                        ${hoveredProject === index ? "opacity-100" : "opacity-0"}
                      `}
                    >
                      {project.languages.slice(0, 8).map((lang, langIndex) => (
                        <LanguageBadge key={langIndex} language={lang} size="sm" />
                      ))}
                      {project.languages.length > 8 && (
                        <div className="text-white text-xs font-medium">+{project.languages.length - 8}</div>
                      )}
                    </div>

                    {/* Title at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-30">
                      <h3 className="text-lg font-semibold text-white">{t(`projects.${project.key}.title`)}</h3>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex-grow flex flex-col">
                    <div className="flex-grow">
                      <p className="text-gray-700 text-sm line-clamp-4">
                        {t(`projects.${project.key}.description`)}
                      </p>
                    </div>

                    {/* Links */}
                    <div className="flex justify-between items-center mt-4 pt-2 border-t border-gray-100">
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs flex items-center text-gray-700 hover:text-primary transition-colors"
                      >
                        <Github size={14} className="mr-1" />
                        {t("ui.code")}
                      </a>

                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs flex items-center text-gray-700 hover:text-primary transition-colors"
                        >
                          {t("ui.demo")}
                          <ExternalLink size={14} className="ml-1" />
                        </a>
                      )}
                    </div>
                  </div>
                </ContentBox>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination Controls avec bouton "Voir plus" intégré */}
        {!isMobile && totalPages > 1 && (
          <div className="flex justify-center items-center mt-6 relative">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" onClick={prevPage} disabled={currentPage === 0} className="h-8 w-8">
                <ChevronLeft size={16} />
              </Button>

              <div className="text-sm text-gray-600">
                {currentPage + 1} / {totalPages}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={nextPage}
                disabled={currentPage === totalPages - 1}
                className="h-8 w-8"
              >
                <ChevronRight size={16} />
              </Button>
            </div>

            <a
              href="https://github.com/redBoardDev?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors absolute right-0"
            >
              <span>{t("ui.viewAll")}</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        )}

        {/* Version mobile du bouton "Voir plus" - Utiliser le même style que sur desktop */}
        {isMobile && (
          <div className="flex justify-center mt-6">
            <a
              href="https://github.com/redBoardDev?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              <span>{t("ui.viewAll")}</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        )}
      </motion.div>
    </section>
  )
}
