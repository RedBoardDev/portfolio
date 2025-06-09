"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, User, Briefcase, GraduationCap, CodeIcon, FolderKanban, Mail, Github, Linkedin } from "lucide-react"
import { LanguageSwitcher } from "./language-switcher"
import { useTranslation } from "@/hooks/use-translation"
import { SectionSEO } from "./seo/section-seo"
import type { SectionName } from "@/lib/types"

interface NavigationBarProps {
  onNavigate: {
    about: () => void
    experience: () => void
    education: () => void
    skills: () => void
    projects: () => void
    contact: () => void
  }
}

export function NavigationBar({ onNavigate }: NavigationBarProps) {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [activeSection, setActiveSection] = useState<SectionName | null>("about")

  // Refs for the sections
  const sectionRefs = useRef({
    about: null as HTMLElement | null,
    experience: null as HTMLElement | null,
    education: null as HTMLElement | null,
    skills: null as HTMLElement | null,
    projects: null as HTMLElement | null,
    contact: null as HTMLElement | null,
  })

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768) // 768px is the md breakpoint in Tailwind
    }

    // Initial check
    handleResize()

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Set up intersection observer to track which section is in view
  useEffect(() => {
    // Find all section elements
    sectionRefs.current.about = document.getElementById("about-section")
    sectionRefs.current.experience = document.getElementById("experience-section")
    sectionRefs.current.education = document.getElementById("education-section")
    sectionRefs.current.skills = document.getElementById("skills-section")
    sectionRefs.current.projects = document.getElementById("projects-section")
    sectionRefs.current.contact = document.getElementById("contact-section")

    const sectionElements = Object.values(sectionRefs.current).filter((el) => el !== null) as HTMLElement[]

    // Create observer
    const observerOptions = {
      root: null, // viewport
      rootMargin: "-100px 0px -300px 0px", // top, right, bottom, left
      threshold: 0, // trigger when any part of the element is in view
    }

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id.replace("-section", "")
          setActiveSection(id as SectionName)
        }
      })
    }

    const observer = new IntersectionObserver(handleIntersect, observerOptions)

    // Observe all sections
    sectionElements.forEach((section) => {
      observer.observe(section)
    })

    return () => {
      // Clean up
      sectionElements.forEach((section) => {
        observer.unobserve(section)
      })
    }
  }, [])

  const navItems = [
    { name: t("header.about"), action: onNavigate.about, icon: <User size={16} />, id: "about" },
    { name: t("header.experience"), action: onNavigate.experience, icon: <Briefcase size={16} />, id: "experience" },
    { name: t("header.education"), action: onNavigate.education, icon: <GraduationCap size={16} />, id: "education" },
    { name: t("header.skills"), action: onNavigate.skills, icon: <CodeIcon size={16} />, id: "skills" },
    { name: t("header.projects"), action: onNavigate.projects, icon: <FolderKanban size={16} />, id: "projects" },
    { name: t("header.freelance"), action: onNavigate.contact, icon: <Briefcase size={16} />, id: "contact" },
  ]

  const socialLinks = [
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 159 159" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M91.7167 110.023L86.1777 115.562L102.362 131.746C110.345 139.729 122.474 148.086 135.044 135.517C144.268 126.293 142.224 117.308 137.327 110.023H91.7167Z" />
          <path d="M66.4967 49.136L72.0357 43.597L55.8517 27.413C47.8687 19.43 35.7397 11.073 23.1697 23.642C13.9457 32.866 15.9897 41.851 20.8867 49.136H66.4967Z" />
          <path d="M135.045 23.642C122.475 11.071 110.346 19.429 102.362 27.413L26.9406 102.834C18.9576 110.817 10.6006 122.946 23.1696 135.516C35.7406 148.087 47.8686 139.729 55.8526 131.745L131.274 56.324C139.257 48.341 147.614 36.212 135.045 23.642Z" />
          <path d="M98.7447 16.888C97.0557 8.27398 92.1517 0.471985 79.1077 0.471985C66.0617 0.471985 61.1577 8.27398 59.4697 16.888L79.1077 36.526L98.7447 16.888Z" />
          <path d="M59.4697 142.27C61.1587 150.884 66.0627 158.686 79.1067 158.686C92.1527 158.686 97.0567 150.884 98.7447 142.27L79.1067 122.632L59.4697 142.27Z" />
          <path d="M25.776 59.136C14.486 59.136 0 61.803 0 79.579C0 92.625 7.802 97.528 16.416 99.217L56.497 59.136H25.776Z" />
          <path d="M141.799 59.942L101.718 100.023H132.439C143.729 100.023 158.215 97.356 158.215 79.58C158.215 66.534 150.413 61.63 141.799 59.942Z" />
        </svg>
      ),
      url: "https://www.malt.fr/profile/thomasott",
      label: "Malt",
      hoverColor: "#FC5656",
    },
    {
      icon: <Github size={16} />,
      url: "https://github.com/redBoardDev",
      label: "GitHub",
      hoverColor: "#24292e",
    },
    {
      icon: <Linkedin size={16} />,
      url: "https://www.linkedin.com/in/thomas--ott",
      label: "LinkedIn",
      hoverColor: "#0077B5",
    },
    {
      icon: <Mail size={16} />,
      url: "mailto:ott.thomas68@gmail.com",
      label: "Email",
      hoverColor: "var(--primary)",
    },
  ]

  // Determine header background style based on scroll state and device
  const headerBgClass =
    isMobile && scrolled
      ? "bg-transparent" // Mobile + scrolled: transparent background
      : scrolled
        ? "bg-white/80 backdrop-blur-sm border-b border-gray-100/80 shadow-sm" // Desktop + scrolled: semi-transparent
        : "bg-transparent" // Not scrolled: transparent for all devices

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBgClass}`}>
      {/* Include SectionSEO component */}
      <SectionSEO activeSection={activeSection} />
      <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Hidden on mobile when scrolled */}
          <div className={`flex ${isMobile && scrolled ? "opacity-0" : "opacity-100"} transition-opacity`}>
            <a
              href="#"
              className={`font-bold text-xl flex items-center transition-colors ${
                scrolled ? "text-gray-900" : "text-gray-800"
              }`}
            >
              <span className="text-primary">T</span>O
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}-section`}
                onClick={(e) => {
                  e.preventDefault()
                  item.action()
                  setActiveSection(item.id as SectionName)
                }}
                className={`
                  px-3 py-2 text-sm font-medium rounded-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
                  ${
                    scrolled
                      ? "text-gray-600 hover:text-primary hover:bg-gray-50/80"
                      : "text-gray-700 hover:text-primary hover:bg-white/30"
                  }
                  ${activeSection === item.id ? "text-primary" : ""}
                `}
                aria-current={activeSection === item.id ? "page" : undefined}
              >
                {item.name}
              </a>
            ))}

            {/* Ajout du sélecteur de langue */}
            <LanguageSwitcher />
          </nav>

          {/* Mobile Navigation Button - Always visible */}
          <div className="md:hidden flex items-center gap-2">
            {/* Sélecteur de langue sur mobile */}
            <LanguageSwitcher />

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              className={`
                p-1.5 rounded-full transition-colors z-50 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
                ${
                  mobileMenuOpen
                    ? "bg-white text-primary shadow-md"
                    : scrolled
                      ? "bg-white/80 text-gray-700 shadow-sm hover:text-primary"
                      : "text-gray-700 hover:bg-white/30"
                }
              `}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu - Redesigned for quick access */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu panel */}
            <motion.div
              id="mobile-menu"
              className="absolute right-4 top-20 w-56 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <div className="p-2">
                {navItems.map((item) => (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}-section`}
                    whileTap={{ scale: 0.97 }}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-left
                      transition-colors mb-0.5 last:mb-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1
                      ${
                        activeSection === item.id
                          ? "bg-primary/10 text-primary"
                          : "text-gray-700 hover:bg-gray-50 hover:text-primary"
                      }
                    `}
                    onClick={(e) => {
                      e.preventDefault()
                      item.action()
                      setActiveSection(item.id as SectionName)
                      setMobileMenuOpen(false)
                    }}
                    aria-current={activeSection === item.id ? "page" : undefined}
                  >
                    <span className={`${activeSection === item.id ? "text-primary" : "text-gray-400"}`}>
                      {item.icon}
                    </span>
                    {item.name}
                  </motion.a>
                ))}
              </div>

              {/* Social links footer */}
              <div className="mt-1 py-2.5 px-3 border-t border-gray-100 bg-gray-50/80">
                <div className="flex items-center justify-center space-x-5">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target={link.url.startsWith("http") ? "_blank" : undefined}
                      rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
                      aria-label={link.label}
                      className={`text-gray-500 hover:text-[${link.hoverColor}] transition-colors`}
                    >
                      {link.icon}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
