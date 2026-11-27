import 'server-only'
import toursJson from '@/content/tours.json'
import placesJson from '@/content/places.json'
import activitiesJson from '@/content/activities.json'
import unescoJson from '@/content/unesco.json'
import blogJson from '@/content/blog.json'
import { regions, type Region } from '@/content/regions'
import type { Activity, BlogPost, Place, Tour, TourSummary, UnescoSite } from './types'
import { firstSentence, translator } from './translate'

export * from './types'
export * from './constants'

const baseTours = toursJson as Tour[]
const basePlaces = placesJson as Place[]

export const activities = activitiesJson as Activity[]
export const unescoSites = unescoJson as UnescoSite[]
export const posts = blogJson as BlogPost[]

// ---- localisation (memoised per locale) --------------------------------

const cache = new Map<string, { tours: Tour[]; places: Place[] }>()

function localized(locale: string) {
  const hit = cache.get(locale)
  if (hit) return hit

  const t = translator(locale)
  const list = (xs: string[]) => xs.map(t)
  const opt = (x: string | null) => (x ? t(x) : x)

  const tours = baseTours.map<Tour>((x) => ({
    ...x,
    title: t(x.title),
    duration: t(x.duration),
    teaser: t(x.teaser),
    overview: list(x.overview),
    highlights: list(x.highlights),
    included: list(x.included),
    excluded: list(x.excluded),
    notes: list(x.notes),
    departure: opt(x.departure),
    group: opt(x.group),
    itinerary: x.itinerary.map((s) => ({ ...s, title: t(s.title), paragraphs: list(s.paragraphs), overnight: opt(s.overnight) })),
    price: x.price && {
      ...x.price,
      tiers: x.price.tiers?.map((p) => ({ ...p, label: t(p.label) })),
      extras: x.price.extras?.map((p) => ({ ...p, label: t(p.label) })),
    },
  }))

  const places = basePlaces.map<Place>((p) => {
    const body = list(p.body)
    return { ...p, title: t(p.title), body, summary: firstSentence(body) }
  })

  const result = { tours, places }
  cache.set(locale, result)
  return result
}

// ---- tours ---------------------------------------------------------------

export const getTours = (locale: string) => localized(locale).tours
/** Card-sized tours for client components (no itineraries or price tables). */
export const getTourCards = (locale: string): TourSummary[] =>
  getTours(locale).map(({ slug, title, image, duration, departure, category, teaser, days, price }) => ({
    slug, title, image, duration, departure, category, teaser, days,
    price: price ? { fromUsd: price.fromUsd } : null,
  }))
export const getTour = (slug: string, locale: string) => getTours(locale).find((t) => t.slug === slug)
export const toursInRegion = (region: string, locale: string) => getTours(locale).filter((t) => t.regions.includes(region))

export function relatedTours(tour: Tour, locale: string, n = 3) {
  const score = (t: Tour) => (t.category === tour.category ? 2 : 0) + t.regions.filter((r) => tour.regions.includes(r)).length
  return getTours(locale)
    .filter((t) => t.slug !== tour.slug)
    .map((t) => ({ t, s: score(t) }))
    .sort((a, b) => b.s - a.s)
    .slice(0, n)
    .map((x) => x.t)
}

// ---- destinations --------------------------------------------------------

export const getPlaces = (locale: string) => localized(locale).places
export const getPlace = (region: string, slug: string, locale: string) =>
  getPlaces(locale).find((p) => p.region === region && p.slug === slug)
export const placesInRegion = (region: string, locale: string) => getPlaces(locale).filter((p) => p.region === region)

export function getRegion(slug: string, locale: string): Region | undefined {
  const r = regions.find((x) => x.slug === slug)
  if (!r) return undefined
  const t = translator(locale)
  return { ...r, intro: r.intro.map(t) }
}

export const getRegions = (locale: string) => regions.map((r) => getRegion(r.slug, locale)!)

// ---- other content (English only) ---------------------------------------

export const getActivity = (slug: string) => activities.find((a) => a.slug === slug)
export const getPost = (slug: string) => posts.find((p) => p.slug === slug)
