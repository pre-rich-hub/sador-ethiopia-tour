import { site } from '@/content/site'
import type { Tour } from '@/lib/content'
import { absolute } from '@/lib/seo'

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />
}

export const organizationLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: site.name,
  url: site.url,
  logo: absolute('/brand/sador-logo.png'),
  image: absolute('/images/lalibela-bete-giorgis-pilgrims.jpg'),
  email: site.email,
  telephone: site.phones[0].display,
  founder: { '@type': 'Person', name: site.founder },
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.line1,
    addressLocality: site.address.city,
    addressCountry: 'ET',
  },
  sameAs: site.social.map((s) => s.href),
})

export const tourLd = (tour: Tour, url: string) => ({
  '@context': 'https://schema.org',
  '@type': 'TouristTrip',
  name: tour.title,
  description: tour.teaser,
  url,
  image: absolute(`/images/${tour.image}.jpg`),
  provider: { '@type': 'TravelAgency', name: site.name, url: site.url },
  itinerary: {
    '@type': 'ItemList',
    itemListElement: tour.itinerary.map((s, i) => ({ '@type': 'ListItem', position: i + 1, name: s.title })),
  },
  ...(tour.price && {
    offers: { '@type': 'Offer', price: tour.price.fromUsd, priceCurrency: 'USD', url, availability: 'https://schema.org/InStock' },
  }),
})
