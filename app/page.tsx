"use client"

import type React from "react"

import { NavigationBar } from "@/components/navigation-bar"
import AboutSection from "@/components/sections/about-section"
import ContactSection from "@/components/sections/contact-section"
import EducationSection from "@/components/sections/education-section"
import ExperienceSection from "@/components/sections/experience-section"
import ProjectsSection from "@/components/sections/projects-section"
import SkillsSection from "@/components/sections/skills-section"
import { Button } from "@/components/ui/button"
import { OptimizedImage } from "@/components/ui/optimized-image"
import { useTranslation } from "@/hooks/use-translation"
import { motion } from "framer-motion"
import { ArrowUp, Code, Download, Github, Linkedin, Mail, MapPin } from "lucide-react"
import dynamic from "next/dynamic"
import { useEffect, useRef, useState } from "react"

// Chargement dynamique des sections non critiques
const DynamicSkillsSection = dynamic(() => import("@/components/sections/skills-section"), {
  loading: () => <div className="min-h-[200px] animate-pulse bg-gray-50 rounded-xl" />,
  ssr: false,
})

const DynamicProjectsSection = dynamic(() => import("@/components/sections/projects-section"), {
  loading: () => <div className="min-h-[300px] animate-pulse bg-gray-50 rounded-xl" />,
  ssr: false,
})

export default function Home() {
  const { t, loading } = useTranslation("common")
  const aboutRef = useRef<HTMLDivElement>(null)
  const experienceRef = useRef<HTMLDivElement>(null)
  const educationRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)

  const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement>) => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" })
    setHasScrolled(true)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Contrôler la visibilité du bouton de retour en haut
  useEffect(() => {
    const handleScroll = () => {
      // Afficher le bouton lorsque l'utilisateur a défilé de plus de 300px
      setShowScrollTop(window.scrollY > 300)
      if (window.scrollY > 100 && !hasScrolled) {
        setHasScrolled(true)
      }
    }

    // Ajouter l'écouteur d'événement
    window.addEventListener("scroll", handleScroll)

    // Vérifier la position initiale
    handleScroll()

    // Nettoyer l'écouteur d'événement
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [hasScrolled])

  // Préchargement des sections au scroll
  useEffect(() => {
    const preloadSections = () => {
      // Précharger les sections dynamiques quand l'utilisateur commence à scroller
      if (hasScrolled) {
        import("@/components/sections/skills-section")
        import("@/components/sections/projects-section")
      }
    }

    preloadSections()
  }, [hasScrolled])

  // Définir un espacement constant entre les sections
  const sectionSpacing = "mt-24"

  return (
    <>
      <NavigationBar
        onNavigate={{
          about: () => scrollToSection(aboutRef),
          experience: () => scrollToSection(experienceRef),
          education: () => scrollToSection(educationRef),
          skills: () => scrollToSection(skillsRef),
          projects: () => scrollToSection(projectsRef),
          contact: () => scrollToSection(contactRef),
        }}
      />

      <main className="bg-background relative overflow-hidden">
        {/* Global background pattern */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill='%233b82f6' fillOpacity='1'%3E%3Cpath d='M0 0h40v40H0V0zm20 10a10 10 0 0 1 0 20 10 10 0 0 1 0-20zm0 2a8 8 0 0 0 0 16 8 8 0 0 0 0-16z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E\")",
            backgroundSize: "40px 40px",
          }}
          aria-hidden="true"
        />
        {/* Hero Section - Optimisé pour responsive */}
        <section className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center pt-24 sm:pt-28 md:pt-20 pb-20 px-6 sm:px-8 md:px-10 lg:px-12 overflow-hidden">
          {/* Background Elements - Professional effect */}
          <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
            {/* Primary gradient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-gray-50 to-white" />

            {/* Professional geometric pattern */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill='%233b82f6' fillOpacity='1'%3E%3Cpath d='M0 0h40v40H0V0zm20 10a10 10 0 0 1 0 20 10 10 0 0 1 0-20zm0 2a8 8 0 0 0 0 16 8 8 0 0 0 0-16z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E\")",
                backgroundSize: "40px 40px",
              }}
            />

            {/* Subtle gradients */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute top-1/4 left-0 w-72 h-72 bg-blue-400/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
          </div>

          <div className="max-w-6xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-0 items-center">
              {/* Profile Image - Clean Professional Design */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="order-1 lg:order-2 flex justify-center lg:justify-end"
              >
                <div className="relative">
                  {/* Main gradient ring */}
                  <div className="absolute -inset-2 bg-gradient-to-br from-primary/30 via-blue-500/20 to-primary/30 rounded-full blur-md" />

                  {/* Secondary ring for depth */}
                  <div className="absolute -inset-1 bg-gradient-to-tr from-white via-gray-50 to-white rounded-full shadow-xl" />

                  {/* Main image container */}
                  <div className="relative overflow-hidden w-44 h-44 xs:w-52 xs:h-52 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full bg-gradient-to-br from-gray-50 to-white border-2 border-white shadow-2xl">
                    {/* Subtle inner glow */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5" />

                    <OptimizedImage
                      src="https://image.noelshack.com/fichiers/2025/24/3/1749663120-t1.jpg"
                      alt="Thomas OTT - Développeur Full-Stack"
                      fill
                      className="object-cover"
                      priority
                    />

                    {/* Subtle overlay for professional polish */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent rounded-full" />
                  </div>

                  {/* Professional status indicator */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.6, type: "spring", stiffness: 200 }}
                    className="absolute -bottom-2 -right-2"
                  >
                    <div className="relative">
                      {/* Main badge */}
                      <div className="relative bg-gradient-to-br from-primary to-blue-600 p-3 rounded-full shadow-lg">
                        <Code className="h-6 w-6 text-white" />
                      </div>

                      {/* Availability indicator */}
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-md" />
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Text Content - Centré sur mobile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="order-2 lg:order-1 text-center lg:text-left"
              >
                <div className="relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "3rem" }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="h-1 bg-primary absolute -top-3 left-1/2 lg:left-0 transform -translate-x-1/2 lg:translate-x-0"
                  />

                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight"
                  >
                    Thomas{" "}
                    <span className="text-primary relative">
                      OTT
                      <span className="absolute -bottom-1 left-0 w-full h-[6px] bg-primary/20" />
                    </span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-primary font-medium mb-2 mt-4"
                  >
                    {loading ? "..." : t("hero.title")}
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-5 sm:mt-6 text-base sm:text-lg text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0"
                  >
                    {loading ? (
                      "..."
                    ) : (
                      <>
                        {t("hero.description")}{" "}
                        <span className="text-primary font-medium">
                          {t("hero.technologies.react")}
                        </span>
                        ,{" "}
                        <span className="text-primary font-medium">
                          {t("hero.technologies.typescript")}
                        </span>{" "}
                        {t("hero.technologies.and")}{" "}
                        <span className="text-primary font-medium">
                          {t("hero.technologies.nodejs")}
                        </span>
                        .
                      </>
                    )}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="flex items-center mt-4 text-gray-500 justify-center lg:justify-start"
                  >
                    <MapPin size={18} className="mr-2 text-primary" />
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Mulhouse,+Grand+Est,+France"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors"
                    >
                      {loading ? "..." : t("hero.location")}
                    </a>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start"
                  >
                    <a
                      href="/assets/resume-fr-thomas-ott.pdf"
                      download="resume-fr-thomas-ott.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="default"
                        size="lg"
                        className="gap-2 shadow-md hover:shadow-lg transition-all text-sm sm:text-base"
                        aria-label={
                          loading ? "Télécharger le CV" : `${t("hero.downloadCV")} - Thomas OTT`
                        }
                      >
                        <Download size={16} aria-hidden="true" />
                        <span>{loading ? "..." : t("hero.downloadCV")}</span>
                      </Button>
                    </a>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => scrollToSection(contactRef)}
                      className="gap-2 border-primary text-primary hover:bg-primary hover:text-white text-sm sm:text-base"
                    >
                      <Mail size={16} />
                      <span>{loading ? "..." : t("hero.contact")}</span>
                    </Button>
                  </motion.div>

                  {/* Social Media Links - Centré sur mobile */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="mt-6 sm:mt-8"
                  >
                    <p className="text-sm text-gray-500 mb-3 text-center lg:text-left">
                      {loading ? "..." : t("hero.findMe")}
                    </p>
                    <div className="flex space-x-4 justify-center lg:justify-start">
                      <a
                        href="https://www.malt.fr/profile/thomasott"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-[#FC5656] hover:bg-[#FC5656] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FC5656] focus-visible:ring-offset-2"
                        aria-label="Profil Malt"
                      >
                        <span className="sr-only">Profil Malt</span>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 159 159"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <title>Logo Malt</title>
                          <path d="M91.7167 110.023L86.1777 115.562L102.362 131.746C110.345 139.729 122.474 148.086 135.044 135.517C144.268 126.293 142.224 117.308 137.327 110.023H91.7167Z" />
                          <path d="M66.4967 49.136L72.0357 43.597L55.8517 27.413C47.8687 19.43 35.7397 11.073 23.1697 23.642C13.9457 32.866 15.9897 41.851 20.8867 49.136H66.4967Z" />
                          <path d="M135.045 23.642C122.475 11.071 110.346 19.429 102.362 27.413L26.9406 102.834C18.9576 110.817 10.6006 122.946 23.1696 135.516C35.7406 148.087 47.8686 139.729 55.8526 131.745L131.274 56.324C139.257 48.341 147.614 36.212 135.045 23.642Z" />
                          <path d="M98.7447 16.888C97.0557 8.27398 92.1517 0.471985 79.1077 0.471985C66.0617 0.471985 61.1577 8.27398 59.4697 16.888L79.1077 36.526L98.7447 16.888Z" />
                          <path d="M59.4697 142.27C61.1587 150.884 66.0627 158.686 79.1067 158.686C92.1527 158.686 97.0567 150.884 98.7447 142.27L79.1067 122.632L59.4697 142.27Z" />
                          <path d="M25.776 59.136C14.486 59.136 0 61.803 0 79.579C0 92.625 7.802 97.528 16.416 99.217L56.497 59.136H25.776Z" />
                          <path d="M141.799 59.942L101.718 100.023H132.439C143.729 100.023 158.215 97.356 158.215 79.58C158.215 66.534 150.413 61.63 141.799 59.942Z" />
                        </svg>
                      </a>
                      <a
                        href="https://github.com/redBoardDev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#24292e] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#24292e] focus-visible:ring-offset-2"
                        aria-label="GitHub Profile"
                      >
                        <Github size={20} />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/thomas--ott"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#0077B5] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0077B5] focus-visible:ring-offset-2"
                        aria-label="LinkedIn Profile"
                      >
                        <Linkedin size={20} />
                      </a>
                      <a
                        href="mailto:ott.thomas68@gmail.com"
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        aria-label="Send Email"
                      >
                        <Mail size={20} />
                      </a>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Main Content Sections */}
        <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 pb-24">
          <div ref={aboutRef} id="about-section">
            <AboutSection />
          </div>

          <div ref={experienceRef} id="experience-section" className={sectionSpacing}>
            <ExperienceSection />
          </div>

          <div ref={educationRef} id="education-section" className={sectionSpacing}>
            <EducationSection />
          </div>

          <div ref={skillsRef} id="skills-section" className={sectionSpacing}>
            {hasScrolled ? <SkillsSection /> : <DynamicSkillsSection />}
          </div>

          <div ref={projectsRef} id="projects-section" className={sectionSpacing}>
            {hasScrolled ? <ProjectsSection /> : <DynamicProjectsSection />}
          </div>

          <div ref={contactRef} id="contact-section" className={sectionSpacing}>
            <ContactSection />
          </div>
        </div>

        {/* Scroll to Top Button - avec animation d'apparition/disparition */}
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-all z-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label={loading ? "..." : t("hero.scrollToTop")}
          >
            <ArrowUp className="h-5 w-5" aria-hidden="true" />
          </motion.button>
        )}
      </main>

      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">
                © {new Date().getFullYear()} Thomas OTT. {loading ? "..." : t("footer.rights")}
              </p>
            </div>
            <div className="flex space-x-4">
              <a
                href="https://www.malt.fr/profile/thomasott"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Malt"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 159 159"
                  fill="currentColor"
                  className="text-gray-400 hover:text-[#FC5656] transition-colors"
                >
                  <title>Logo Malt</title>
                  <path d="M91.7167 110.023L86.1777 115.562L102.362 131.746C110.345 139.729 122.474 148.086 135.044 135.517C144.268 126.293 142.224 117.308 137.327 110.023H91.7167Z" />
                  <path d="M66.4967 49.136L72.0357 43.597L55.8517 27.413C47.8687 19.43 35.7397 11.073 23.1697 23.642C13.9457 32.866 15.9897 41.851 20.8867 49.136H66.4967Z" />
                  <path d="M135.045 23.642C122.475 11.071 110.346 19.429 102.362 27.413L26.9406 102.834C18.9576 110.817 10.6006 122.946 23.1696 135.516C35.7406 148.087 47.8686 139.729 55.8526 131.745L131.274 56.324C139.257 48.341 147.614 36.212 135.045 23.642Z" />
                  <path d="M98.7447 16.888C97.0557 8.27398 92.1517 0.471985 79.1077 0.471985C66.0617 0.471985 61.1577 8.27398 59.4697 16.888L79.1077 36.526L98.7447 16.888Z" />
                  <path d="M59.4697 142.27C61.1587 150.884 66.0627 158.686 79.1067 158.686C92.1527 158.686 97.0567 150.884 98.7447 142.27L79.1067 122.632L59.4697 142.27Z" />
                  <path d="M25.776 59.136C14.486 59.136 0 61.803 0 79.579C0 92.625 7.802 97.528 16.416 99.217L56.497 59.136H25.776Z" />
                  <path d="M141.799 59.942L101.718 100.023H132.439C143.729 100.023 158.215 97.356 158.215 79.58C158.215 66.534 150.413 61.63 141.799 59.942Z" />
                </svg>
              </a>
              <a
                href="https://github.com/redBoardDev"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5 text-gray-400 hover:text-[#24292e] transition-colors" />
              </a>
              <a
                href="https://www.linkedin.com/in/thomas--ott"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5 text-gray-400 hover:text-[#0077B5] transition-colors" />
              </a>
              <a href="mailto:ott.thomas68@gmail.com" aria-label="Email">
                <Mail className="h-5 w-5 text-gray-400 hover:text-primary transition-colors" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
