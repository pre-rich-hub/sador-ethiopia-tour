import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { getTour, getTours } from '@/lib/content'
import { site } from '@/content/site'
import { alternates } from '@/lib/seo'
import { PageHero } from '@/components/ui/PageHero'
import { Reveal } from '@/components/ui/Reveal'
import { EnquiryForm } from '@/features/enquiry/EnquiryForm'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Contact' })
  return { title: t('metaTitle'), description: t('lede'), alternates: alternates(locale, '/contact') }
}

export default async function ContactPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ tour?: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const { tour } = await searchParams
  const t = await getTranslations('Contact')
  const tn = await getTranslations('Nav')
  const selected = tour && (tour === 'car-rental' || getTour(tour, locale)) ? tour : undefined
  const te = await getTranslations('Enquiry')

  return (
    <>
      <PageHero image="lake-tana-ura-kidane-mihret" kicker={t('kicker')} title={t('title')} lede={t('lede')} crumbs={[{ label: tn('home'), href: '/' }, { label: tn('aboutLinks.contact') }]} />
      <section className="container-x grid gap-12 py-16 sm:py-24 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
        <Reveal className="space-y-5">
          <div className="rounded-[2rem] bg-ink p-8 text-sand">
            <p className="kicker text-sand/70">{t('reachUs')}</p>
            <ul className="mt-6 space-y-5">
              {site.phones.map((p) => (
                <li key={p.href} className="flex gap-4">
                  <Phone className="mt-1 size-5 shrink-0 text-sand/70" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-sand/55">{t(`phone.${p.label.toLowerCase()}`)}</p>
                    <a href={p.href} className="text-lg hover:text-sand">
                      {p.display}
                    </a>
                  </div>
                </li>
              ))}
              <li className="flex gap-4">
                <Mail className="mt-1 size-5 shrink-0 text-sand/70" />
                <div>
                  <p className="text-xs uppercase tracking-wider text-sand/55">{t('email')}</p>
                  <a href={`mailto:${site.email}`} className="text-lg hover:text-sand">
                    {site.email}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <MessageCircle className="mt-1 size-5 shrink-0 text-sand/70" />
                <div>
                  <p className="text-xs uppercase tracking-wider text-sand/55">WhatsApp</p>
                  <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="text-lg hover:text-sand">
                    {t('whatsapp')}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <MapPin className="mt-1 size-5 shrink-0 text-sand/70" />
                <div>
                  <p className="text-xs uppercase tracking-wider text-sand/55">{t('office')}</p>
                  <p className="text-lg">
                    {site.address.line1}
                    <br />
                    {site.address.city}, {site.address.country}
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div className="flex gap-4 rounded-[2rem] bg-paper p-7 ring-1 ring-line">
            <Clock className="mt-1 size-5 shrink-0 text-sun" />
            <p className="text-sm leading-relaxed text-muted">{t('support')}</p>
          </div>
          <div className="overflow-hidden rounded-[2rem] ring-1 ring-line">
            <iframe
              title={t('mapTitle')}
              src="https://www.openstreetmap.org/export/embed.html?bbox=38.76%2C8.97%2C38.83%2C9.02&layer=mapnik"
              className="h-64 w-full grayscale-[0.3]"
              loading="lazy"
            />
          </div>
        </Reveal>
        <Reveal>
          <h2 className="font-serif text-3xl sm:text-4xl">{t('formTitle')}</h2>
          <p className="mb-8 mt-3 text-muted">{t('formLede')}</p>
          <EnquiryForm
            tours={[{ slug: 'car-rental', title: te('carRental') }, ...getTours(locale).map((x) => ({ slug: x.slug, title: x.title }))]}
            defaultTour={selected}
          />
        </Reveal>
      </section>
    </>
  )
}
