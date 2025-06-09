"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import { projectsData } from "@/data/projects"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, ChevronRight, ChevronLeft, ArrowRight } from "lucide-react"
import { LanguageBadge } from "@/components/ui/language-badge"
import { ContentBox } from "@/components/ui/content-box"
import { OptimizedImage } from "@/components/ui/optimized-image"

export default function ProjectsSection() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [direction, setDirection] = useState(0) // -1 pour gauche, 1 pour droite, 0 pour initial
  const [isDragging, setIsDragging] = useState(false)
  const swipeContainerRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const cardOpacity = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5])
  const cardScale = useTransform(x, [-200, 0, 200], [0.8, 1, 0.8])
  const cardRotate = useTransform(x, [-200, 0, 200], [10, 0, -10])

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

  // Gestionnaire de fin de drag
  const handleDragEnd = (event: any, info: any) => {
    setIsDragging(false)

    // Déterminer si le swipe est suffisant pour changer de page
    const threshold = 100 // Seuil de distance pour considérer un swipe valide
    const velocity = 0.5 // Seuil de vélocité pour considérer un swipe rapide

    if (info.offset.x > threshold || info.velocity.x > velocity) {
      // Swipe vers la droite
      prevPage()
    } else if (info.offset.x < -threshold || info.velocity.x < -velocity) {
      // Swipe vers la gauche
      nextPage()
    }

    // Réinitialiser la position
    x.set(0)
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
            Projets
            <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-primary"></span>
          </h2>
        </div>

        {isMobile ? (
          // Vue mobile avec swipe horizontal amélioré
          <div className="relative overflow-hidden pb-16">
            <AnimatePresence initial={false} mode="wait" custom={direction}>
              {currentProjects.map((project, index) => (
                <motion.div
                  key={`mobile-${project.title}-${currentPage}`}
                  style={{
                    x,
                    opacity: cardOpacity,
                    scale: cardScale,
                    rotateZ: cardRotate,
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.7}
                  onDragStart={() => setIsDragging(true)}
                  onDragEnd={handleDragEnd}
                  className={`mb-4 overflow-hidden ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
                >
                  <ContentBox noPadding className="h-full" shadow="md">
                    {/* Image du projet */}
                    <div className="relative h-64 overflow-hidden">
                      <OptimizedImage
                        src={project.image || "/placeholder.svg?height=240&width=400"}
                        alt={`Capture d'écran du projet ${project.title}`}
                        fill
                        className="object-cover"
                        draggable="false"
                        aspectRatio={1.67} // 16:9 aspect ratio
                      />

                      {/* Overlay de base (dégradé) */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80" />

                      {/* Overlay noir léger supplémentaire au touch/hover */}
                      <div
                        className={`
                          absolute inset-0 bg-black transition-opacity duration-300
                          ${isDragging ? "opacity-20" : "opacity-0"}
                        `}
                      />

                      {/* Languages badges */}
                      <div className="absolute top-4 right-4 flex gap-2">
                        {project.languages.slice(0, 8).map((lang, langIndex) => (
                          <LanguageBadge key={langIndex} language={lang} size="md" />
                        ))}
                        {project.languages.length > 8 && (
                          <div className="text-white text-xs font-medium">+{project.languages.length - 8}</div>
                        )}
                      </div>

                      {/* Title */}
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <h3 className="text-xl font-bold text-white">{project.title}</h3>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <p className="text-gray-700 leading-relaxed">{project.description}</p>

                      {/* Links */}
                      <div className="flex justify-between items-center mt-6 pt-5 border-t border-gray-100">
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-gray-700 hover:text-primary transition-colors"
                          onClick={(e) => isDragging && e.preventDefault()}
                        >
                          <Github size={18} className="mr-2" />
                          Code
                        </a>
                        {project.liveLink && (
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-gray-700 hover:text-primary transition-colors"
                            onClick={(e) => isDragging && e.preventDefault()}
                          >
                            Démo
                            <ExternalLink size={18} className="ml-2" />
                          </a>
                        )}
                      </div>
                    </div>
                  </ContentBox>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Instructions de swipe */}
            <div className="text-center text-xs text-gray-500 mt-2 italic">
              Glissez vers la gauche ou la droite pour naviguer
            </div>

            {/* Pagination Controls avec flèches toujours visibles */}
            <div className="flex justify-center items-center gap-4 mt-4 absolute bottom-0 left-0 right-0 px-6">
              <button
                onClick={prevPage}
                disabled={currentPage === 0}
                className={`w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center border border-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                  currentPage === 0 ? "text-gray-300 cursor-not-allowed" : "text-gray-700 hover:text-primary"
                }`}
                aria-label="Projet précédent"
              >
                <ChevronLeft size={16} aria-hidden="true" />
              </button>

              <div className="flex justify-center items-center gap-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > currentPage ? 1 : -1)
                      setCurrentPage(i)
                    }}
                    className={`h-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                      i === currentPage ? "w-8 bg-primary" : "w-2 bg-gray-300"
                    }`}
                    aria-label={`Aller à la page ${i + 1}`}
                    aria-current={i === currentPage ? "page" : undefined}
                  />
                ))}
              </div>

              <button
                onClick={nextPage}
                disabled={currentPage === totalPages - 1}
                className={`w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center border border-gray-100 transition-colors ${
                  currentPage === totalPages - 1
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-700 hover:text-primary"
                }`}
                aria-label="Projet suivant"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        ) : (
          // Vue desktop avec grid
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            {currentProjects.map((project, index) => (
              <motion.div
                key={`${project.title}-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group relative"
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <ContentBox noPadding className="h-full flex flex-col" shadow="md">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <OptimizedImage
                      src={project.image || "/placeholder.svg?height=200&width=400"}
                      alt={`Capture d'écran du projet ${project.title}`}
                      fill
                      className={`
                        object-cover transition-transform duration-500 ease-in-out
                        ${hoveredProject === index ? "scale-105" : "scale-100"}
                      `}
                      aspectRatio={1.67} // 16:9 aspect ratio
                    />

                    {/* Overlay de base (dégradé) */}
                    <div
                      className={`
                        absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent
                        opacity-60 transition-opacity duration-300
                      `}
                    />

                    {/* Overlay noir léger au hover */}
                    <div
                      className={`
                        absolute inset-0 bg-black transition-opacity duration-300
                        ${hoveredProject === index ? "opacity-20" : "opacity-0"}
                      `}
                    />

                    {/* Languages badges */}
                    <div
                      className={`
                        absolute top-3 right-3 flex gap-2 transition-opacity duration-300
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
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex-grow flex flex-col">
                    <div className="flex-grow">
                      <p className="text-gray-700 text-sm">
                        {project.description.length > 140
                          ? `${project.description.substring(0, 140)}...`
                          : project.description}
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
                        Code
                      </a>
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs flex items-center text-gray-700 hover:text-primary transition-colors"
                        >
                          Démo
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
              <span>Voir plus de projets sur GitHub</span>
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
              <span>Voir plus de projets sur GitHub</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        )}
      </motion.div>
    </section>
  )
}
