import type { TourCategory } from './types'

/** Client-safe constants and helpers (no content data is imported here). */

export const tourCategories: TourCategory[] = [
  'city',
  'short',
  'historic-north',
  'cultural-south',
  'eastern',
  'desert',
  'combination',
  'festival',
]

export const activityGroups = [
  'events-and-festivals',
  'cultural-experience',
  'nature-activities',
  'outdoor-activities',
  'activities',
] as const

export const formatUsd = (n: number) => `$${n.toLocaleString('en-US')}`
