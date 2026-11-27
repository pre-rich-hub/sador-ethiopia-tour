/** Chauffeur-driven vehicles for hire. Names/descriptions live in messages (CarRental.vehicles.*). */
export const fleet = [
  { key: 'landcruiser', seats: 4, bags: 4, drive: '4×4' },
  { key: 'prado', seats: 4, bags: 3, drive: '4×4' },
  { key: 'hiace', seats: 10, bags: 10, drive: '2WD' },
  { key: 'coaster', seats: 22, bags: 20, drive: '2WD' },
] as const

/** Wikimedia Commons photos; CC BY-SA images must stay credited. */
export const fleetCredits = [
  { label: 'Land Cruiser: OSX (public domain)', href: 'https://commons.wikimedia.org/wiki/File:1998-2002_Toyota_Land_Cruiser_(FZJ105R)_GXL_wagon_(2011-10-25).jpg' },
  { label: 'Prado: Matti Blume (CC BY-SA 4.0)', href: 'https://commons.wikimedia.org/wiki/File:Toyota_Land_Cruiser_Prado,_Baku_(P1090223).jpg' },
  { label: 'HiAce: Ethan Llamas (CC BY-SA 4.0)', href: 'https://commons.wikimedia.org/wiki/File:Toyota_Hiace_KDH202L_3.0_Commuter_White_-_front.jpg' },
  { label: 'Coaster: Ypy31 (CC0)', href: 'https://commons.wikimedia.org/wiki/File:Toyota_Coaster_EX_XZB70.jpg' },
]
