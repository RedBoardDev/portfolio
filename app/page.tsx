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
import { ArrowUp, Download, Github, Linkedin, Mail, MapPin } from "lucide-react"
import dynamic from "next/dynamic"
import { useEffect, useRef, useState } from "react"

const DynamicSkillsSection = dynamic(() => import("@/components/sections/skills-section"), {
  loading: () => <div className="min-h-[200px] animate-pulse rounded-[20px] bg-white/50" />,
  ssr: false,
})

const DynamicProjectsSection = dynamic(() => import("@/components/sections/projects-section"), {
  loading: () => <div className="min-h-[300px] animate-pulse rounded-[20px] bg-white/50" />,
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

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 320)

      if (window.scrollY > 80 && !hasScrolled) {
        setHasScrolled(true)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [hasScrolled])

  useEffect(() => {
    if (hasScrolled) {
      import("@/components/sections/skills-section")
      import("@/components/sections/projects-section")
    }
  }, [hasScrolled])

  const sectionSpacing = "mt-28 lg:mt-32"

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

      <main id="main-content" className="relative overflow-hidden bg-background">
        <section className="relative overflow-hidden px-6 pb-24 pt-36 sm:px-8 sm:pt-40 md:px-10 lg:px-12 lg:pb-28 lg:pt-32">
          <div className="absolute inset-0 -z-10" aria-hidden="true">
            <div className="absolute inset-x-0 top-0 h-[72%] bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.16),transparent_35%),radial-gradient(circle_at_82%_18%,rgba(245,158,11,0.12),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.42),transparent)]" />
            <div className="absolute left-[4%] top-16 h-28 w-28 rounded-full border border-white/80 bg-white/40 blur-2xl" />
            <div className="absolute bottom-12 right-[8%] h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute right-[16%] top-20 h-px w-24 bg-slate-300/80" />
          </div>

          <div className="mx-auto max-w-6xl">
            <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="order-2 text-center lg:order-1 lg:text-left"
              >
                <motion.h1
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.08 }}
                  className="mt-6 text-4xl font-semibold leading-[0.92] text-slate-950 sm:text-5xl lg:text-[5.35rem]"
                >
                  Thomas
                  <span className="block text-primary/95">OTT</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.12 }}
                  className="mt-4 text-lg font-medium text-slate-600"
                >
                  {loading ? "..." : t("hero.title")}
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.16 }}
                  className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg lg:mx-0"
                >
                  {loading ? (
                    "..."
                  ) : (
                    <>
                      {t("hero.description")}{" "}
                      <span className="font-semibold text-slate-950">
                        {t("hero.technologies.react")}
                      </span>
                      ,{" "}
                      <span className="font-semibold text-slate-950">
                        {t("hero.technologies.typescript")}
                      </span>{" "}
                      {t("hero.technologies.and")}{" "}
                      <span className="font-semibold text-slate-950">
                        {t("hero.technologies.nodejs")}
                      </span>
                      .
                    </>
                  )}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.24 }}
                  className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-500 lg:justify-start"
                >
                  <MapPin size={16} className="text-primary" />
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Mulhouse,+Grand+Est,+France"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono uppercase tracking-[0.16em] transition-colors hover:text-slate-950"
                  >
                    {loading ? "..." : t("hero.location")}
                  </a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.32 }}
                  className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start"
                >
                  <Button asChild variant="default" size="lg" className="gap-2">
                    <a
                      href="/assets/resume-fr-thomas-ott.pdf"
                      download="resume-fr-thomas-ott.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={
                        loading ? "Télécharger le CV" : `${t("hero.downloadCV")} - Thomas OTT`
                      }
                    >
                      <Download size={16} aria-hidden="true" />
                      <span>{loading ? "..." : t("hero.downloadCV")}</span>
                    </a>
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => scrollToSection(contactRef)}
                    className="gap-2"
                  >
                    <Mail size={16} />
                    <span>{loading ? "..." : t("hero.contact")}</span>
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mt-8"
                >
                  <p className="mb-3 font-mono text-[0.72rem] uppercase tracking-[0.22em] text-slate-500">
                    {loading ? "..." : t("hero.findMe")}
                  </p>
                  <div className="flex justify-center gap-3 lg:justify-start">
                    <a
                      href="https://www.malt.fr/profile/thomasott1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200/80 bg-white/82 text-[#FC5656] shadow-[0_18px_32px_-26px_rgba(15,23,42,0.32)] transition-[background-color,color,border-color] duration-200 hover:border-[#FC5656]/30 hover:bg-white hover:text-[#FC5656] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FC5656] focus-visible:ring-offset-2"
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
                      className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200/80 bg-white/82 text-slate-700 shadow-[0_18px_32px_-26px_rgba(15,23,42,0.32)] transition-[background-color,color,border-color] duration-200 hover:border-slate-300 hover:bg-white hover:text-[#24292e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#24292e] focus-visible:ring-offset-2"
                      aria-label="GitHub Profile"
                    >
                      <Github size={20} />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/thomas--ott"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200/80 bg-white/82 text-slate-700 shadow-[0_18px_32px_-26px_rgba(15,23,42,0.32)] transition-[background-color,color,border-color] duration-200 hover:border-slate-300 hover:bg-white hover:text-[#0077B5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0077B5] focus-visible:ring-offset-2"
                      aria-label="LinkedIn Profile"
                    >
                      <Linkedin size={20} />
                    </a>
                    <a
                      href="mailto:ott.thomas68@gmail.com"
                      className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200/80 bg-white/82 text-slate-700 shadow-[0_18px_32px_-26px_rgba(15,23,42,0.32)] transition-[background-color,color,border-color] duration-200 hover:border-slate-300 hover:bg-white hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      aria-label="Send Email"
                    >
                      <Mail size={20} />
                    </a>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.75, ease: "easeOut" }}
                className="order-1 flex justify-center lg:order-2 lg:justify-end"
              >
                <div className="relative">
                  <div className="absolute inset-0 scale-[1.12] rounded-full border border-white/70" />
                  <div className="absolute inset-0 scale-[1.18] rounded-full bg-primary/10 blur-3xl" />

                  <div className="relative h-[280px] w-[280px] overflow-hidden rounded-full border border-white/80 bg-white/50 shadow-[0_34px_72px_-44px_rgba(15,23,42,0.48)] sm:h-[320px] sm:w-[320px] md:h-[360px] md:w-[360px]">
                    <OptimizedImage
                      src="/assets/profile.png"
                      alt="Thomas OTT - Développeur front-end"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-6 pb-28 sm:px-8 md:px-10 lg:px-12">
          <div ref={aboutRef}>
            <AboutSection />
          </div>

          <div ref={experienceRef} className={sectionSpacing}>
            <ExperienceSection />
          </div>

          <div ref={educationRef} className={sectionSpacing}>
            <EducationSection />
          </div>

          <div ref={skillsRef} className={sectionSpacing}>
            {hasScrolled ? <SkillsSection /> : <DynamicSkillsSection />}
          </div>

          <div ref={projectsRef} className={sectionSpacing}>
            {hasScrolled ? <ProjectsSection /> : <DynamicProjectsSection />}
          </div>

          <div ref={contactRef} className={sectionSpacing}>
            <ContactSection />
          </div>
        </div>

        {showScrollTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.9, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 8 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-xl border border-white/80 bg-slate-950 text-white shadow-[0_22px_40px_-22px_rgba(15,23,42,0.55)] transition-[background-color,box-shadow] duration-200 hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label={loading ? "..." : t("hero.scrollToTop")}
          >
            <ArrowUp className="h-5 w-5" aria-hidden="true" />
          </motion.button>
        )}
      </main>

      <footer className="border-t border-slate-200/80 bg-white/70 py-8 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 md:px-10 lg:px-12">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-slate-500">
                Thomas OTT
              </p>
              <p className="mt-2 text-sm text-slate-600">
                © {new Date().getFullYear()} Thomas OTT. {loading ? "..." : t("footer.rights")}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://www.malt.fr/profile/thomasott1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Malt"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200/80 bg-white/70 text-slate-500 transition-[background-color,color] duration-200 hover:bg-white hover:text-[#FC5656]"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 159 159"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
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
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200/80 bg-white/70 text-slate-500 transition-[background-color,color] duration-200 hover:bg-white hover:text-[#24292e]"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/thomas--ott"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200/80 bg-white/70 text-slate-500 transition-[background-color,color] duration-200 hover:bg-white hover:text-[#0077B5]"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:ott.thomas68@gmail.com"
                aria-label="Email"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200/80 bg-white/70 text-slate-500 transition-[background-color,color] duration-200 hover:bg-white hover:text-primary"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
