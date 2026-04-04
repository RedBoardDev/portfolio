import { i18n } from "@lingui/core"
import { messages as defaultMessages } from "../src/locales/en/messages"
import { messages as fiMessages } from "../src/locales/fi/messages"
import { messages as frMessages } from "../src/locales/fr/messages"

export type Locale = "en" | "fr" | "fi"

export const locales: Locale[] = ["en", "fr", "fi"]
export const defaultLocale: Locale = "en"

const catalogMessages: Record<Locale, typeof defaultMessages> = {
  en: defaultMessages,
  fr: frMessages,
  fi: fiMessages,
}

i18n.load(defaultLocale, defaultMessages)
i18n.activate(defaultLocale)

export async function loadCatalog(locale: Locale) {
  i18n.load(locale, catalogMessages[locale])
  i18n.activate(locale)
}

export { i18n }
