/** Company facts, taken from sadorethiopiatours.com. */
export const site = {
  name: 'Sador Ethiopia Tours',
  shortName: 'Sador',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sadorethiopiatours.com',
  tagline: 'History · Culture · Nature',
  founder: 'Sisay Tilahun',
  email: 'info@sadorethiopiatours.com',
  phones: [
    { label: 'Hotline', display: '+251 913 481 317', href: 'tel:+251913481317' },
    { label: 'Office', display: '+251 912 663 807', href: 'tel:+251912663807' },
  ],
  whatsapp: 'https://wa.me/message/UNJ2HEGBZRPYB1',
  address: {
    line1: 'Bole Sub-City, Woreda 13, House No. B09A',
    city: 'Addis Ababa',
    country: 'Ethiopia',
  },
  youtube: 'https://www.youtube.com/@sadorethiopiatours',
  social: [
    { name: 'Facebook', href: 'https://www.facebook.com/sadorethiopiatours' },
    { name: 'Instagram', href: 'https://www.instagram.com/sadorethiopiatours' },
    { name: 'YouTube', href: 'https://www.youtube.com/@sadorethiopiatours' },
    { name: 'TikTok', href: 'https://www.tiktok.com/@sadorethiopiatours' },
    { name: 'X', href: 'https://x.com/sadorethiopia' },
    { name: 'Threads', href: 'https://www.threads.net/@sadorethiopiatours' },
    { name: 'Tripadvisor', href: 'https://www.tripadvisor.com/Attraction_Review-g293791-d10799568-Reviews-Sador_Ethiopia_Tours-Addis_Ababa.html' },
  ],
  /** Payment methods shown in the footer — confirm with Sador before launch. */
  payments: ['Visa', 'Mastercard', 'PayPal'],
  partners: [
    { name: 'Viator', logo: '/brand/partner-viator.jpg' },
    { name: 'GetYourGuide', logo: '/brand/partner-getyourguide.jpg' },
    { name: 'TourRadar', logo: '/brand/partner-tourradar.png' },
    { name: 'SafariBookings', logo: '/brand/partner-safaribookings.jpg' },
  ],
} as const

