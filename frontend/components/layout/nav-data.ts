/**
 * Navigation structure, mirroring the menus of the original Sador site.
 * Labels come from messages (Nav.*).
 */

export const navDestinations = [
  { key: 'addis-ababa', image: 'addis-skyline-aerial' },
  { key: 'historic-north', image: 'lalibela-bete-giorgis' },
  { key: 'cultural-south', image: 'omo-hamar-women' },
  { key: 'eastern-ethiopia', image: 'harar-gate' },
  { key: 'afar', image: 'danakil-erta-ale' },
  { key: 'coffee-route', image: 'jimma' },
  { key: 'eco-villages', image: 'wenchi-crater' },
].map((d) => ({ ...d, href: `/destinations/${d.key}` }))

export const navItineraries = [
  { key: 'city', href: '/tours?style=city', image: 'addis-night' },
  { key: 'short', href: '/tours?style=short', image: 'entoto-park' },
  { key: 'historic-north', href: '/tours?style=historic-north', image: 'gondar-fasil-castle' },
  { key: 'cultural-south', href: '/tours?style=cultural-south', image: 'omo-mursi-women' },
  { key: 'eastern', href: '/tours?style=eastern', image: 'harar-alley' },
  { key: 'coffee', href: '/activities/forest-coffee-tours', image: 'jimma-forest' },
  { key: 'desert', href: '/tours?style=desert', image: 'danakil-erta-ale' },
  { key: 'combination', href: '/tours?style=combination', image: 'simien-peaks' },
] as const

export const navActivities = [
  { key: 'cultural-experience', href: '/activities#cultural-experience', image: 'travellers-dinner' },
  { key: 'events-and-festivals', href: '/activities#events-and-festivals', image: 'timket-procession' },
  { key: 'nature-activities', href: '/activities#nature-activities', image: 'bale-nyala' },
  { key: 'outdoor-activities', href: '/activities#outdoor-activities', image: 'rafting' },
  { key: 'educational-tours', href: '/activities/educational-tours', image: 'addis-national-museum' },
] as const

export const navAbout = [
  { key: 'aboutUs', href: '/about' },
  { key: 'aboutEthiopia', href: '/about-ethiopia' },
  { key: 'contact', href: '/contact' },
] as const
