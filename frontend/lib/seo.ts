import { routing } from '@/i18n/routing'
import { site } from '@/content/site'

export function localePath(locale: string, path: string) {
  const clean = path === '/' ? '' : path
  return locale === routing.defaultLocale ? clean || '/' : `/${locale}${clean}`
}

export function alternates(locale: string, path: string) {
  return {
    canonical: localePath(locale, path),
    languages: Object.fromEntries([
      ...routing.locales.map((l) => [l, localePath(l, path)]),
      ['x-default', localePath(routing.defaultLocale, path)],
    ]),
  }
}

export const absolute = (path: string) => new URL(path, site.url).toString()
