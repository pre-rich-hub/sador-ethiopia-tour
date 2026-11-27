import { defineRouting } from 'next-intl/routing'

/** The same five languages Sador offers on its current site. */
export const locales = ['en', 'fr', 'de', 'it', 'es'] as const
export type AppLocale = (typeof locales)[number]

export const localeNames: Record<AppLocale, string> = {
  en: 'English',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
  es: 'Español',
}

export const routing = defineRouting({
  locales,
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  localeDetection: false,
})
