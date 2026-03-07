import aboutEn from "../public/locales/en/about.json"
import commonEn from "../public/locales/en/common.json"
import contactEn from "../public/locales/en/contact.json"
import educationEn from "../public/locales/en/education.json"
import experienceEn from "../public/locales/en/experience.json"
import projectsEn from "../public/locales/en/projects.json"
import skillsEn from "../public/locales/en/skills.json"
import aboutFr from "../public/locales/fr/about.json"
import commonFr from "../public/locales/fr/common.json"
import contactFr from "../public/locales/fr/contact.json"
import educationFr from "../public/locales/fr/education.json"
import experienceFr from "../public/locales/fr/experience.json"
import projectsFr from "../public/locales/fr/projects.json"
import skillsFr from "../public/locales/fr/skills.json"

export type TranslationValue = string | number | boolean | TranslationRecord | TranslationValue[]

export type TranslationRecord = { [key: string]: TranslationValue }

export const translationCatalog = {
  fr: {
    about: aboutFr,
    common: commonFr,
    contact: contactFr,
    education: educationFr,
    experience: experienceFr,
    projects: projectsFr,
    skills: skillsFr,
  },
  en: {
    about: aboutEn,
    common: commonEn,
    contact: contactEn,
    education: educationEn,
    experience: experienceEn,
    projects: projectsEn,
    skills: skillsEn,
  },
} as const satisfies Record<"fr" | "en", Record<string, TranslationRecord>>

export type TranslationNamespace = keyof (typeof translationCatalog)["fr"]
