"use client"

import { SectionHeading } from "@/components/shared/section-heading"
import { Button } from "@/components/ui/button"
import { ContentBox } from "@/components/ui/content-box"
import { Trans, useLingui } from "@lingui/react/macro"
import { motion } from "framer-motion"
import {
  AppWindow,
  Boxes,
  Check,
  Copy,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  ShieldCheck,
  Terminal,
} from "lucide-react"
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

  const focusAreas = [
    {
      icon: AppWindow,
      title: t`SaaS, end-to-end`,
      description: t`Maintainable business web apps, from user needs and domain modeling through to clean, production-ready delivery.`,
    },
    {
      icon: Boxes,
      title: t`Architecture & structure`,
      description: t`Clean Architecture, clear boundaries, conventions and lightweight docs that keep a codebase healthy as it scales.`,
    },
    {
      icon: ShieldCheck,
      title: t`Reliable delivery`,
      description: t`Performance, reliability and security by design, with CI/CD, QA automation and cloud deployments.`,
    },
    {
      icon: Terminal,
      title: t`Side projects`,
      description: t`Go CLIs, AWS serverless apps and automation bots across TypeScript, Node.js, Postgres and Terraform.`,
    },
  ]

  return (
    <section id="contact-section" className="relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <SectionHeading
          eyebrow={t`Contact`}
          title={t`Let's work together`}
          description={t`Available for freelance projects and full-time software engineering roles.`}
          className="mb-10"
        />

        <div className="flex flex-col gap-6 md:grid md:grid-cols-5">
          <div className="order-2 md:order-1 md:col-span-3">
            <ContentBox className="h-full" shadow="md">
              <div className="flex h-full flex-col">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    <Trans>What I build</Trans>
                  </h3>
                  <div className="flex shrink-0 items-center rounded-full border border-green-200 bg-green-50 px-2.5 py-1">
                    <span className="relative mr-1.5 flex items-center justify-center">
                      <span className="z-10 h-2 w-2 rounded-full bg-green-500" />
                      <span className="absolute h-3 w-3 animate-ping rounded-full bg-green-400 opacity-40" />
                    </span>
                    <span className="text-xs font-medium text-green-700">
                      <Trans>Available</Trans>
                    </span>
                  </div>
                </div>

                <p className="mb-5 text-sm leading-6 text-muted-foreground">
                  <Trans>
                    Full-stack engineer at AkorD (Kare) and co-founder of Moboo. I build SaaS
                    end-to-end, with a focus on clean, maintainable architecture.
                  </Trans>
                </p>

                <div className="grid flex-1 auto-rows-fr gap-3 sm:grid-cols-2">
                  {focusAreas.map((area) => (
                    <div
                      key={area.title}
                      className="flex h-full flex-col rounded-[14px] border border-border/70 bg-card/60 p-4"
                    >
                      <div className="mb-2 flex items-center gap-2.5">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <area.icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <h4 className="text-sm font-semibold text-foreground">{area.title}</h4>
                      </div>
                      <p className="text-[0.8rem] leading-5 text-muted-foreground">
                        {area.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-col gap-3 border-t border-border/70 pt-5 sm:flex-row">
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
            </ContentBox>
          </div>

          <div className="order-1 flex h-full flex-col space-y-6 md:order-2 md:col-span-2">
            <ContentBox className="flex-grow" shadow="md">
              <h3 className="mb-6 text-xl font-bold text-foreground">
                <Trans>My contact details</Trans>
              </h3>

              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <button
                    type="button"
                    onClick={() => copyToClipboard("ott.thomas68@gmail.com")}
                    className="group flex w-full items-center rounded-md text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    aria-label={t`Copy email address`}
                    aria-live="polite"
                  >
                    <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary shadow-sm">
                      <Mail className="h-5 w-5 text-white" aria-hidden="true" />
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm font-medium text-muted-foreground">
                        <Trans>Email</Trans>
                      </p>
                      <p className="text-foreground transition-colors group-hover:text-primary">
                        ott.thomas68@gmail.com
                      </p>
                    </div>
                    <div className="ml-2 text-muted-foreground/70 transition-colors group-hover:text-primary">
                      {emailCopied ? (
                        <div className="flex items-center text-green-600">
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
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <a
                    href="https://www.linkedin.com/in/thomas--ott"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex w-full items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    aria-label={t`Open LinkedIn profile in a new tab`}
                  >
                    <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-700 shadow-sm">
                      <Linkedin className="h-5 w-5 text-white" aria-hidden="true" />
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm font-medium text-muted-foreground">{t`LinkedIn`}</p>
                      <p className="text-foreground transition-colors group-hover:text-primary">
                        linkedin.com/in/thomas--ott
                      </p>
                    </div>
                    <div className="ml-2 text-muted-foreground/70 transition-colors group-hover:text-primary">
                      <ExternalLink size={16} aria-hidden="true" />
                    </div>
                  </a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <a
                    href="https://github.com/RedBoardDev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex w-full items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    aria-label={t`Open GitHub profile in a new tab`}
                  >
                    <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-900 shadow-sm">
                      <Github className="h-5 w-5 text-white" aria-hidden="true" />
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm font-medium text-muted-foreground">{t`GitHub`}</p>
                      <p className="text-foreground transition-colors group-hover:text-primary">
                        github.com/RedBoardDev
                      </p>
                    </div>
                    <div className="ml-2 text-muted-foreground/70 transition-colors group-hover:text-primary">
                      <ExternalLink size={16} aria-hidden="true" />
                    </div>
                  </a>
                </motion.div>
              </div>
            </ContentBox>

            <ContentBox shadow="md">
              <h3 className="mb-6 text-xl font-bold text-foreground">
                <Trans>Languages</Trans>
              </h3>

              <div className="space-y-8">
                <div>
                  <div className="mb-3 flex justify-between">
                    <span className="font-medium text-foreground">
                      <Trans>French</Trans>
                    </span>
                    <span className="text-muted-foreground">
                      <Trans>Native</Trans>
                    </span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-muted">
                    <div className="h-full w-full rounded-full bg-primary" />
                  </div>
                </div>

                <div>
                  <div className="mb-3 flex justify-between">
                    <span className="font-medium text-foreground">
                      <Trans>English</Trans>
                    </span>
                    <span className="text-muted-foreground">
                      <Trans>Professional</Trans>
                    </span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-muted">
                    <div className="h-full w-[85%] rounded-full bg-primary" />
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
