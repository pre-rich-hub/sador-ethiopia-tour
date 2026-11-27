/**
 * Chauffeur-driven vehicles for hire. Names/descriptions live in messages (CarRental.vehicles.*).
 * `photos` are files in /public/images/fleet (without .jpg); the first one is the main photo.
 * `studio` photos are cut-outs on white, shown whole; the others are scene photos that fill the frame.
 */
export const fleet = [
  { key: 'landcruiser', seats: 4, bags: 4, drive: '4×4', studio: true, photos: ['landcruiser'] },
  { key: 'landcruiser300', seats: 4, bags: 4, drive: '4×4', studio: true, photos: ['landcruiser-300'] },
  { key: 'prado', seats: 4, bags: 3, drive: '4×4', studio: false, photos: ['prado'] },
  { key: 'id6', seats: 4, bags: 3, drive: 'EV', studio: true, photos: ['id6', 'id6-2'] },
  { key: 'hiace', seats: 10, bags: 10, drive: '2WD', studio: true, photos: ['hiace', 'hiace-2', 'hiace-3', 'hiace-4', 'hiace-5', 'hiace-6'] },
  { key: 'coaster', seats: 22, bags: 20, drive: '2WD', studio: true, photos: ['coaster', 'coaster-2'] },
] as const

/** Wikimedia Commons photos; CC BY-SA images must stay credited. */
export const fleetCredits = [
  { label: 'Prado: Matti Blume (CC BY-SA 4.0)', href: 'https://commons.wikimedia.org/wiki/File:Toyota_Land_Cruiser_Prado,_Baku_(P1090223).jpg' },
]
