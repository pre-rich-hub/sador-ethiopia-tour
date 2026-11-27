import createNextIntlPlugin from 'next-intl/plugin'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: { root: __dirname },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 828, 1080, 1280, 1600, 1920],
    minimumCacheTTL: 2678400,
  },
  async redirects() {
    // Old WordPress URLs → new pages, so existing links and search results keep working.
    const map = [
      ['/who-we-are-3', '/about'], ['/who-we-are', '/about'], ['/contact-us', '/contact'], ['/blogs', '/blog'],
      ['/itineraries', '/tours'], ['/activities', '/activities'], ['/terms-and-conditions-2', '/terms'],
      ['/terms-and-conditions', '/terms'], ['/family-meeting-trip-2', '/family-meeting-trip'],
      ['/addis-ababa-destinations', '/destinations/addis-ababa'], ['/historic-north-destination', '/destinations/historic-north'],
      ['/cultural-south-destinations', '/destinations/cultural-south'], ['/eastern-ethiopia-2', '/destinations/eastern-ethiopia'],
      ['/afar-region', '/destinations/afar'], ['/coffee-route', '/destinations/coffee-route'],
      ['/eco-tourism-village', '/destinations/eco-villages'],
      ['/addis-ababa-city-tour', '/tours?style=city'], ['/short-tour', '/tours?style=short'],
      ['/historic-north', '/tours?style=historic-north'], ['/cultural-south', '/tours?style=cultural-south'],
      ['/eastern-ethiopia', '/tours?style=eastern'], ['/desert-expedition', '/tours?style=desert'],
      ['/combination-tour', '/tours?style=combination'], ['/coffee-tour', '/destinations/coffee-route'],
      ['/cultural-experience', '/activities#cultural-experience'], ['/events-and-festivals', '/activities#events-and-festivals'],
      ['/nature-activities', '/activities#nature-activities'], ['/outdoor-activities', '/activities#outdoor-activities'],
      ['/educational-tours', '/activities/educational-tours'],
    ]
    return map
      .filter(([s, d]) => s !== d)
      .map(([source, destination]) => ({ source, destination, permanent: true }))
  },
}

export default withNextIntl(nextConfig)
