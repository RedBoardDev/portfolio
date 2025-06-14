"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Mail, Github, Linkedin, Code, Briefcase, Check, Copy, ExternalLink } from "lucide-react"
import { ContentBox } from "@/components/ui/content-box"
import { useTranslation } from "@/hooks/use-translation"

export default function ContactSection() {
  const { t, loading } = useTranslation("contact")
  const [emailCopied, setEmailCopied] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setEmailCopied(true)
      setTimeout(() => setEmailCopied(false), 2000) // Réinitialiser après 2 secondes
    })
  }

  return (
    <section id="contact-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center">
              <Briefcase className="h-8 w-8 text-blue-500" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                {loading ? "..." : t("freelance.title")}
              </h2>
              <p className="text-gray-600 text-lg">
                {loading ? "..." : t("freelance.subtitle")}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-5 gap-8">
          {/* Freelance Services Section */}
          <div className="md:col-span-3 order-2 md:order-1">
            <ContentBox className="h-full" shadow="md">
              <div className="p-6 sm:p-6">
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-lg font-semibold text-gray-800">
                        {loading ? "..." : t("services.title")}
                      </h4>
                      <div className="hidden sm:flex items-center bg-green-50 px-2.5 py-1 rounded-full border border-green-100">
                        <div className="relative flex items-center justify-center mr-1.5">
                          <div className="w-2 h-2 rounded-full bg-green-500 z-10"></div>
                          <div className="absolute w-3 h-3 rounded-full bg-green-400 opacity-40 animate-ping"></div>
                        </div>
                        <span className="text-green-700 text-xs font-medium">
                          {loading ? "..." : t("services.available")}
                        </span>
                      </div>
                      {/* Version mobile plus élégante */}
                      <div className="sm:hidden flex items-center">
                        <div className="relative flex items-center justify-center mr-1.5">
                          <div className="w-2 h-2 rounded-full bg-green-500 z-10"></div>
                          <div className="absolute w-3 h-3 rounded-full bg-green-400 opacity-40 animate-ping"></div>
                        </div>
                        <span className="text-green-600 text-xs font-medium">
                          {loading ? "..." : t("services.availableMobile")}
                        </span>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 rounded-md bg-blue-100 flex items-center justify-center mr-3">
                            <Code className="h-4 w-4 text-blue-600" />
                          </div>
                          <h5 className="font-medium">
                            {loading ? "..." : t("services.webDev.title")}
                          </h5>
                        </div>
                        <p className="text-sm text-gray-600">
                          {loading ? "..." : t("services.webDev.description")}
                        </p>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 rounded-md bg-green-100 flex items-center justify-center mr-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-green-600"
                            >
                              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                            </svg>
                          </div>
                          <h5 className="font-medium">
                            {loading ? "..." : t("services.maintenance.title")}
                          </h5>
                        </div>
                        <p className="text-sm text-gray-600">
                          {loading ? "..." : t("services.maintenance.description")}
                        </p>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 rounded-md bg-purple-100 flex items-center justify-center mr-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-purple-600"
                            >
                              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                          </div>
                          <h5 className="font-medium">
                            {loading ? "..." : t("services.security.title")}
                          </h5>
                        </div>
                        <p className="text-sm text-gray-600">
                          {loading ? "..." : t("services.security.description")}
                        </p>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 rounded-md bg-orange-100 flex items-center justify-center mr-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-orange-600"
                            >
                              <path d="M2 3h20" />
                              <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" />
                              <path d="m7 21 5-5 5 5" />
                            </svg>
                          </div>
                          <h5 className="font-medium">
                            {loading ? "..." : t("services.consulting.title")}
                          </h5>
                        </div>
                        <p className="text-sm text-gray-600">
                          {loading ? "..." : t("services.consulting.description")}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 mt-6 pt-4 border-t border-gray-100">
                    <a
                      href="https://www.malt.fr/profile/thomasott"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button className="w-full gap-2 bg-[#FC5656] hover:bg-[#e04747] text-white">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 159 159"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M91.7167 110.023L86.1777 115.562L102.362 131.746C110.345 139.729 122.474 148.086 135.044 135.517C144.268 126.293 142.224 117.308 137.327 110.023H91.7167Z" />
                          <path d="M66.4967 49.136L72.0357 43.597L55.8517 27.413C47.8687 19.43 35.7397 11.073 23.1697 23.642C13.9457 32.866 15.9897 41.851 20.8867 49.136H66.4967Z" />
                          <path d="M135.045 23.642C122.475 11.071 110.346 19.429 102.362 27.413L26.9406 102.834C18.9576 110.817 10.6006 122.946 23.1696 135.516C35.7406 148.087 47.8686 139.729 55.8526 131.745L131.274 56.324C139.257 48.341 147.614 36.212 135.045 23.642Z" />
                          <path d="M98.7447 16.888C97.0557 8.27398 92.1517 0.471985 79.1077 0.471985C66.0617 0.471985 61.1577 8.27398 59.4697 16.888L79.1077 36.526L98.7447 16.888Z" />
                          <path d="M59.4697 142.27C61.1587 150.884 66.0627 158.686 79.1067 158.686C92.1527 158.686 97.0567 150.884 98.7447 142.27L79.1067 122.632L59.4697 142.27Z" />
                          <path d="M25.776 59.136C14.486 59.136 0 61.803 0 79.579C0 92.625 7.802 97.528 16.416 99.217L56.497 59.136H25.776Z" />
                          <path d="M141.799 59.942L101.718 100.023H132.439C143.729 100.023 158.215 97.356 158.215 79.58C158.215 66.534 150.413 61.63 141.799 59.942Z" />
                        </svg>
                        {loading ? "..." : t("buttons.contactMalt")}
                      </Button>
                    </a>

                    <a href="mailto:ott.thomas68@gmail.com" className="flex-1">
                      <Button
                        variant="outline"
                        className="w-full gap-2 border-primary text-primary hover:bg-primary hover:text-white"
                      >
                        <Mail size={18} />
                        {loading ? "..." : t("buttons.sendEmail")}
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </ContentBox>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-2 flex flex-col space-y-6 h-full order-1 md:order-2">
            {/* Contact Methods */}
            <ContentBox className="flex-grow" shadow="md">
              <h3 className="text-xl font-bold mb-6 text-gray-900">
                {loading ? "..." : t("contact.title")}
              </h3>

              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <button
                    onClick={() => copyToClipboard("ott.thomas68@gmail.com")}
                    className="flex items-center group w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md"
                    aria-label={loading ? "..." : t("contact.copyEmail")}
                    aria-live="polite"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center mr-4 shadow-sm group-hover:scale-105 transition-transform">
                      <Mail className="h-5 w-5 text-white" aria-hidden="true" />
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm font-medium text-gray-500">
                        {loading ? "..." : t("contact.email")}
                      </p>
                      <p className="text-gray-900 group-hover:text-primary transition-colors">ott.thomas68@gmail.com</p>
                    </div>
                    <div className="ml-2 text-gray-400 group-hover:text-primary transition-colors">
                      {emailCopied ? (
                        <div className="flex items-center text-green-500">
                          <Check size={16} className="mr-1" aria-hidden="true" />
                          <span className="text-xs">
                            {loading ? "..." : t("contact.copied")}
                          </span>
                        </div>
                      ) : (
                        <Copy size={16} aria-hidden="true" />
                      )}
                    </div>
                  </button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <a
                    href="https://www.linkedin.com/in/thomas--ott"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center group w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md"
                    aria-label="Open LinkedIn profile in a new tab"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-700 flex items-center justify-center mr-4 shadow-sm group-hover:scale-105 transition-transform">
                      <Linkedin className="h-5 w-5 text-white" aria-hidden="true" />
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm font-medium text-gray-500">LinkedIn</p>
                      <p className="text-gray-900 group-hover:text-primary transition-colors">
                        linkedin.com/in/thomas--ott
                      </p>
                    </div>
                    <div className="ml-2 text-gray-400 group-hover:text-primary transition-colors">
                      <ExternalLink size={16} aria-hidden="true" />
                    </div>
                  </a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <a
                    href="https://github.com/redBoardDev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center group w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md"
                    aria-label="Open GitHub profile in a new tab"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center mr-4 shadow-sm group-hover:scale-105 transition-transform">
                      <Github className="h-5 w-5 text-white" aria-hidden="true" />
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm font-medium text-gray-500">GitHub</p>
                      <p className="text-gray-900 group-hover:text-primary transition-colors">github.com/redBoardDev</p>
                    </div>
                    <div className="ml-2 text-gray-400 group-hover:text-primary transition-colors">
                      <ExternalLink size={16} aria-hidden="true" />
                    </div>
                  </a>
                </motion.div>
              </div>
            </ContentBox>

            {/* Langues Card */}
            <ContentBox className="flex-grow" shadow="md">
              <h3 className="text-xl font-bold mb-6 text-gray-900">
                {loading ? "..." : t("languages.title")}
              </h3>

              <div className="space-y-10">
                <div>
                  <div className="flex justify-between mb-3">
                    <span className="font-medium text-gray-900">
                      {loading ? "..." : t("languages.french")}
                    </span>
                    <span className="text-gray-500">
                      {loading ? "..." : t("languages.frenchLevel")}
                    </span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full w-full bg-primary rounded-full"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-3">
                    <span className="font-medium text-gray-900">
                      {loading ? "..." : t("languages.english")}
                    </span>
                    <span className="text-gray-500">
                      {loading ? "..." : t("languages.englishLevel")}
                    </span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full w-[85%] bg-primary rounded-full"></div>
                  </div>
                </div>
              </div>
            </ContentBox>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
