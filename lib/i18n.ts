import { i18n } from "@lingui/core"
import { messages as defaultMessages } from "../src/locales/en/messages"

export type Locale = "en" | "fr" | "fi"

export const locales: Locale[] = ["en", "fr", "fi"]
export const defaultLocale: Locale = "en"

i18n.load(defaultLocale, defaultMessages)
i18n.activate(defaultLocale)

export async function loadCatalog(locale: Locale) {
  if (locale === defaultLocale) {
    i18n.activate(locale)
    return
  }

  const { messages } = await import(`../src/locales/${locale}/messages`)
  i18n.load(locale, messages)
  i18n.activate(locale)
}

export { i18n }
