"use client"

import { SectionHeading } from "@/components/shared/section-heading"
import { Button } from "@/components/ui/button"
import { ContentBox } from "@/components/ui/content-box"
import { Trans, useLingui } from "@lingui/react/macro"
import { motion } from "framer-motion"
import { Check, Code, Copy, ExternalLink, Github, Linkedin, Mail } from "lucide-react"
import { useState } from "react"

export default function ContactSection() {
  const { t } = useLingui()
  const [emailCopied, setEmailCopied] = useState(false)

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setEmailCopied(true)
      window.setTimeout(() => setEmailCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy email", error)
    }
  }

  return (
    <section id="contact-section" className="relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <SectionHeading
          title={t`Freelance Developer`}
          description={t`Available for your web and mobile projects`}
          className="mb-10"
        />

        <div className="flex flex-col md:grid md:grid-cols-5 gap-8">
          <div className="md:col-span-3 order-2 md:order-1">
            <ContentBox className="h-full" shadow="md">
              <div className="p-6 sm:p-6">
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-lg font-semibold text-gray-800">
                        <Trans>My services</Trans>
                      </h4>
                      <div className="hidden sm:flex items-center bg-green-50 px-2.5 py-1 rounded-full border border-green-100">
                        <div className="relative flex items-center justify-center mr-1.5">
                          <div className="w-2 h-2 rounded-full bg-green-500 z-10" />
                          <div className="absolute w-3 h-3 rounded-full bg-green-400 opacity-40 animate-ping" />
                        </div>
                        <span className="text-green-700 text-xs font-medium">
                          <Trans>Currently available</Trans>
                        </span>
                      </div>
                      <div className="sm:hidden flex items-center">
                        <div className="relative flex items-center justify-center mr-1.5">
                          <div className="w-2 h-2 rounded-full bg-green-500 z-10" />
                          <div className="absolute w-3 h-3 rounded-full bg-green-400 opacity-40 animate-ping" />
                        </div>
                        <span className="text-green-600 text-xs font-medium">
                          <Trans>Available</Trans>
                        </span>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="rounded-[16px] border border-slate-200/80 bg-white/80 p-4 shadow-[0_18px_38px_-34px_rgba(15,23,42,0.28)]">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 rounded-md bg-blue-100 flex items-center justify-center mr-3">
                            <Code className="h-4 w-4 text-blue-600" />
                          </div>
                          <h5 className="font-medium">
                            <Trans>Web Development</Trans>
                          </h5>
                        </div>
                        <p className="text-sm text-gray-600">
                          <Trans>
                            Showcase websites, complex web applications, e-commerce and design
                            integration.
                          </Trans>
                        </p>
                      </div>

                      <div className="rounded-[16px] border border-slate-200/80 bg-white/80 p-4 shadow-[0_18px_38px_-34px_rgba(15,23,42,0.28)]">
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
                              <title>Maintenance</title>
                              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                            </svg>
                          </div>
                          <h5 className="font-medium">
                            <Trans>Maintenance & Support</Trans>
                          </h5>
                        </div>
                        <p className="text-sm text-gray-600">
                          <Trans>
                            Evolutionary, corrective maintenance and technical support for your
                            existing applications.
                          </Trans>
                        </p>
                      </div>

                      <div className="rounded-[16px] border border-slate-200/80 bg-white/80 p-4 shadow-[0_18px_38px_-34px_rgba(15,23,42,0.28)]">
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
                              <title>Security</title>
                              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                          </div>
                          <h5 className="font-medium">
                            <Trans>Security & Performance</Trans>
                          </h5>
                        </div>
                        <p className="text-sm text-gray-600">
                          <Trans>
                            Security audits, performance optimization and GDPR compliance.
                          </Trans>
                        </p>
                      </div>

                      <div className="rounded-[16px] border border-slate-200/80 bg-white/80 p-4 shadow-[0_18px_38px_-34px_rgba(15,23,42,0.28)]">
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
                              <title>Consulting</title>
                              <path d="M2 3h20" />
                              <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" />
                              <path d="m7 21 5-5 5 5" />
                            </svg>
                          </div>
                          <h5 className="font-medium">
                            <Trans>Consulting & Training</Trans>
                          </h5>
                        </div>
                        <p className="text-sm text-gray-600">
                          <Trans>
                            Technical support, technology choice and training for your teams.
                          </Trans>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-4 border-t border-gray-100 pt-4 sm:flex-row">
                    <Button
                      asChild
                      className="w-full flex-1 gap-2 border-[#FC5656] bg-[#FC5656] text-white shadow-[0_16px_30px_-22px_rgba(252,86,86,0.42)] hover:border-[#e04747] hover:bg-[#e04747]"
                    >
                      <a
                        href="https://www.malt.fr/profile/thomasott1"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg
                          width="20"
                          height="20"
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
                        <Trans>Contact me on Malt</Trans>
                      </a>
                    </Button>

                    <Button asChild variant="outline" className="w-full flex-1 gap-2">
                      <a href="mailto:ott.thomas68@gmail.com">
                        <Mail size={18} />
                        <Trans>Send me an email</Trans>
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </ContentBox>
          </div>

          <div className="md:col-span-2 flex flex-col space-y-6 h-full order-1 md:order-2">
            <ContentBox className="flex-grow" shadow="md">
              <h3 className="text-xl font-bold mb-6 text-gray-900">
                <Trans>My contact details</Trans>
              </h3>

              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <button
                    type="button"
                    onClick={() => copyToClipboard("ott.thomas68@gmail.com")}
                    className="flex w-full items-center rounded-md text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    aria-label={t`Copy email address`}
                    aria-live="polite"
                  >
                    <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500 shadow-sm">
                      <Mail className="h-5 w-5 text-white" aria-hidden="true" />
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm font-medium text-gray-500">
                        <Trans>Email</Trans>
                      </p>
                      <p className="text-gray-900 group-hover:text-primary transition-colors">
                        ott.thomas68@gmail.com
                      </p>
                    </div>
                    <div className="ml-2 text-gray-400 group-hover:text-primary transition-colors">
                      {emailCopied ? (
                        <div className="flex items-center text-green-500">
                          <Check size={16} className="mr-1" aria-hidden="true" />
                          <span className="text-xs">
                            <Trans>Copied!</Trans>
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
                    className="flex w-full items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    aria-label={t`Open LinkedIn profile in a new tab`}
                  >
                    <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-700 shadow-sm">
                      <Linkedin className="h-5 w-5 text-white" aria-hidden="true" />
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm font-medium text-gray-500">{t`LinkedIn`}</p>
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
                    className="flex w-full items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    aria-label={t`Open GitHub profile in a new tab`}
                  >
                    <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-900 shadow-sm">
                      <Github className="h-5 w-5 text-white" aria-hidden="true" />
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm font-medium text-gray-500">{t`GitHub`}</p>
                      <p className="text-gray-900 group-hover:text-primary transition-colors">
                        github.com/redBoardDev
                      </p>
                    </div>
                    <div className="ml-2 text-gray-400 group-hover:text-primary transition-colors">
                      <ExternalLink size={16} aria-hidden="true" />
                    </div>
                  </a>
                </motion.div>
              </div>
            </ContentBox>

            <ContentBox className="flex-grow" shadow="md">
              <h3 className="text-xl font-bold mb-6 text-gray-900">
                <Trans>Languages</Trans>
              </h3>

              <div className="space-y-10">
                <div>
                  <div className="flex justify-between mb-3">
                    <span className="font-medium text-gray-900">
                      <Trans>French</Trans>
                    </span>
                    <span className="text-gray-500">
                      <Trans>Native</Trans>
                    </span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full w-full bg-primary rounded-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-3">
                    <span className="font-medium text-gray-900">
                      <Trans>English</Trans>
                    </span>
                    <span className="text-gray-500">
                      <Trans>Professional</Trans>
                    </span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full w-[85%] bg-primary rounded-full" />
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
