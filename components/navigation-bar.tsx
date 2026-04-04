"use client"

import { Button } from "@/components/ui/button"
import type { SectionName } from "@/lib/types"
import { Trans, useLingui } from "@lingui/react/macro"
import { AnimatePresence, motion } from "framer-motion"
import {
  Briefcase,
  CodeIcon,
  FolderKanban,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Menu,
  User,
  X,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { LanguageSwitcher } from "./language-switcher"
import { SectionSEO } from "./seo/section-seo"

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
  const { t } = useLingui()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<SectionName | null>("about")

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
      setScrolled(window.scrollY > 18)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    sectionRefs.current.about = document.getElementById("about-section")
    sectionRefs.current.experience = document.getElementById("experience-section")
    sectionRefs.current.education = document.getElementById("education-section")
    sectionRefs.current.skills = document.getElementById("skills-section")
    sectionRefs.current.projects = document.getElementById("projects-section")
    sectionRefs.current.contact = document.getElementById("contact-section")

    const sectionElements = Object.values(sectionRefs.current).filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id.replace("-section", "")
            setActiveSection(id as SectionName)
          }
        }
      },
      {
        root: null,
        rootMargin: "-140px 0px -40% 0px",
        threshold: 0.1,
      }
    )

    for (const section of sectionElements) {
      observer.observe(section)
    }

    return () => {
      for (const section of sectionElements) {
        observer.unobserve(section)
      }
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : ""

    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  const navItems = [
    {
      name: t`About`,
      action: onNavigate.about,
      icon: <User size={16} />,
      id: "about",
    },
    {
      name: t`Experience`,
      action: onNavigate.experience,
      icon: <Briefcase size={16} />,
      id: "experience",
    },
    {
      name: t`Education`,
      action: onNavigate.education,
      icon: <GraduationCap size={16} />,
      id: "education",
    },
    {
      name: t`Skills`,
      action: onNavigate.skills,
      icon: <CodeIcon size={16} />,
      id: "skills",
    },
    {
      name: t`Projects`,
      action: onNavigate.projects,
      icon: <FolderKanban size={16} />,
      id: "projects",
    },
    {
      name: t`Contact`,
      action: onNavigate.contact,
      icon: <Mail size={16} />,
      id: "contact",
    },
  ]

  const socialLinks = [
    {
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 159 159"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Logo"
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
      ),
      url: "https://www.malt.fr/profile/thomasott1",
      label: t`Malt`,
      hoverClassName: "hover:text-[#FC5656]",
    },
    {
      icon: <Github size={16} />,
      url: "https://github.com/redBoardDev",
      label: t`GitHub`,
      hoverClassName: "hover:text-[#24292e]",
    },
    {
      icon: <Linkedin size={16} />,
      url: "https://www.linkedin.com/in/thomas--ott",
      label: t`LinkedIn`,
      hoverClassName: "hover:text-[#0077B5]",
    },
    {
      icon: <Mail size={16} />,
      url: "mailto:ott.thomas68@gmail.com",
      label: t`Email`,
      hoverClassName: "hover:text-primary",
    },
  ]

  const frameClass = scrolled
    ? "border-slate-200/80 bg-white/86 shadow-[0_22px_60px_-34px_rgba(15,23,42,0.32)]"
    : "border-white/70 bg-white/64 shadow-[0_24px_56px_-40px_rgba(15,23,42,0.26)]"

  const handleNav = (section: SectionName, action: () => void) => {
    action()
    setActiveSection(section)
    setMobileMenuOpen(false)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <SectionSEO activeSection={activeSection} />

      <div className="mx-auto max-w-6xl">
        <div
          className={`rounded-[20px] border px-3 py-2.5 backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-300 ${frameClass}`}
        >
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group flex items-center rounded-[14px] px-1 py-1 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label={t`Back to top`}
            >
              <span className="hidden min-w-0 sm:flex flex-col">
                <span className="truncate text-base font-semibold text-slate-950">Thomas OTT</span>
                <span className="text-sm text-slate-500">
                  <Trans>Front-End Developer</Trans>
                </span>
              </span>
              <span className="text-base font-semibold text-slate-950 sm:hidden">Thomas OTT</span>
            </button>

            <nav className="hidden lg:flex justify-center">
              <div className="flex items-center gap-1 rounded-[16px] border border-slate-200/80 bg-white/52 px-2 py-1.5">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}-section`}
                    onClick={(event) => {
                      event.preventDefault()
                      handleNav(item.id as SectionName, item.action)
                    }}
                    className={`rounded-xl px-4 py-2 text-sm font-medium transition-[background-color,color,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                      activeSection === item.id
                        ? "bg-slate-950 text-white shadow-[0_12px_24px_-16px_rgba(15,23,42,0.5)]"
                        : "text-slate-600 hover:bg-white hover:text-slate-950"
                    }`}
                    aria-current={activeSection === item.id ? "page" : undefined}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </nav>

            <div className="hidden md:flex items-center justify-end gap-2">
              <LanguageSwitcher />

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="hidden lg:inline-flex"
                onClick={() => handleNav("contact", onNavigate.contact)}
              >
                <Trans>Contact me</Trans>
              </Button>
            </div>

            <div className="flex items-center justify-end gap-2 md:hidden">
              <LanguageSwitcher />

              <button
                type="button"
                onClick={() => setMobileMenuOpen((open) => !open)}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-300/75 bg-white/82 text-slate-700 shadow-[0_16px_28px_-24px_rgba(15,23,42,0.32)] transition-[background-color,color,border-color,box-shadow] duration-200 hover:bg-white hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                aria-label={t`Navigation menu`}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.button
              type="button"
              className="absolute inset-0 bg-slate-950/28 backdrop-blur-[3px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              aria-label={t`Close menu`}
            />

            <motion.div
              id="mobile-menu"
              className="absolute left-4 right-4 top-[5.4rem] overflow-hidden rounded-[22px] border border-white/75 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(255,255,255,0.88))] shadow-[0_32px_70px_-40px_rgba(15,23,42,0.5)]"
              initial={{ opacity: 0, y: -18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -18, scale: 0.96 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <div className="border-b border-slate-200/80 px-5 py-4">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.26em] text-slate-500">
                  <Trans>Navigation</Trans>
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  <Trans>Front-End Developer</Trans>
                </p>
              </div>

              <div className="p-3">
                {navItems.map((item) => (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}-section`}
                    whileTap={{ scale: 0.98 }}
                    className={`mb-1.5 flex w-full items-center gap-3 rounded-[14px] px-4 py-3 text-sm font-medium transition-[background-color,color] duration-200 last:mb-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 ${
                      activeSection === item.id
                        ? "bg-slate-950 text-white"
                        : "text-slate-700 hover:bg-slate-50 hover:text-slate-950"
                    }`}
                    onClick={(event) => {
                      event.preventDefault()
                      handleNav(item.id as SectionName, item.action)
                    }}
                    aria-current={activeSection === item.id ? "page" : undefined}
                  >
                    <span className={activeSection === item.id ? "text-white" : "text-slate-400"}>
                      {item.icon}
                    </span>
                    {item.name}
                  </motion.a>
                ))}
              </div>

              <div className="border-t border-slate-200/80 bg-slate-50/80 px-5 py-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                    <Trans>Links</Trans>
                  </span>
                  <div className="flex items-center gap-3">
                    {socialLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target={link.url.startsWith("http") ? "_blank" : undefined}
                        rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
                        aria-label={link.label}
                        className={`text-slate-500 transition-colors ${link.hoverClassName}`}
                      >
                        {link.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
