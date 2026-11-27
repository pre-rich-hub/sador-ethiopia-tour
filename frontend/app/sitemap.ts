import type { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'
import { activities, getPlaces, getTours, posts } from '@/lib/content'
import { regions } from '@/content/regions'
import { absolute, localePath } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '/', '/tours', '/destinations', '/activities', '/unesco-world-heritage-sites', '/about-ethiopia',
    '/family-meeting-trip', '/about', '/contact', '/blog', '/terms', '/car-rental',
    ...getTours('en').map((t) => `/tours/${t.slug}`),
    ...regions.map((r) => `/destinations/${r.slug}`),
    ...getPlaces('en').map((p) => `/destinations/${p.region}/${p.slug}`),
    ...activities.map((a) => `/activities/${a.slug}`),
    ...posts.map((p) => `/blog/${p.slug}`),
  ]
  return paths.map((path) => ({
    url: absolute(localePath(routing.defaultLocale, path)),
    alternates: { languages: Object.fromEntries(routing.locales.map((l) => [l, absolute(localePath(l, path))])) },
  }))
}
