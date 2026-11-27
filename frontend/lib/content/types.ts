/** Content types. Safe to import from client components. */

export type TourCategory =
  | 'city'
  | 'short'
  | 'historic-north'
  | 'cultural-south'
  | 'eastern'
  | 'desert'
  | 'combination'
  | 'festival'

export interface ItineraryStep {
  day: number | null
  title: string
  paragraphs: string[]
  overnight: string | null
}

export interface TourPrice {
  fromUsd: number
  basis: string
  tiers?: { label: string; usd: number }[]
  extras?: { label: string; usd: number }[]
}

export interface Tour {
  slug: string
  title: string
  category: TourCategory
  days: number
  duration: string
  teaser: string
  overview: string[]
  highlights: string[]
  itinerary: ItineraryStep[]
  included: string[]
  excluded: string[]
  price: TourPrice | null
  departure: string | null
  group: string | null
  notes: string[]
  image: string
  /** Photos from the tour's detail page on the original Sador site. */
  photos: string[]
  regions: string[]
  featured: boolean
}

export interface Place {
  slug: string
  region: string
  group: string | null
  title: string
  summary: string
  body: string[]
  image: string
  photos: string[]
}

export interface Activity {
  slug: string
  category: string
  title: string
  summary: string
  body: string[]
  image: string
}

export interface UnescoSite {
  slug: string
  title: string
  inscribed: number
  summary: string
  body: string[]
  image: string
  place: string | null
}

export type BlogBlock = { type: 'p' | 'h'; text: string } | { type: 'img'; src: string }

export interface BlogPost {
  slug: string
  title: string
  date: string
  author: string
  cover: string
  excerpt: string
  blocks: BlogBlock[]
  readingMinutes: number
}

/** The slice of a tour that cards need; keeps client payloads small. */
export type TourSummary = Pick<Tour, 'slug' | 'title' | 'image' | 'duration' | 'departure' | 'category' | 'teaser' | 'days'> & {
  price: { fromUsd: number } | null
}
