import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Check, Info, X } from 'lucide-react'
import { getTour, getTours, relatedTours } from '@/lib/content'
import { routing } from '@/i18n/routing'
import { img } from '@/lib/images'
import { alternates, absolute, localePath } from '@/lib/seo'
import { PageHero } from '@/components/ui/PageHero'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Itinerary } from '@/features/tours/Itinerary'
import { PriceCard } from '@/features/tours/PriceCard'
import { TourCard } from '@/features/tours/TourCard'
import { JsonLd, tourLd } from '@/components/seo/JsonLd'
import { GallerySection } from '@/features/gallery/GallerySection'


export function generateStaticParams() {
  return routing.locales.flatMap((locale) => getTours(locale).map((t) => ({ locale, slug: t.slug })))
}

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params
  const tour = getTour(slug, locale)
  if (!tour) return {}
  return {
    title: tour.title,
    description: tour.teaser,
    alternates: alternates(locale, `/tours/${slug}`),
    openGraph: { title: tour.title, description: tour.teaser, images: [img(tour.image)] },
  }
}

export default async function TourPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const tour = getTour(slug, locale)
  if (!tour) notFound()
  const t = await getTranslations('Tours')
  const tn = await getTranslations('Nav')
  const tc = await getTranslations('Categories')

  return (
    <>
      <JsonLd data={tourLd(tour, absolute(localePath(locale, `/tours/${slug}`)))} />
      <PageHero
        image={tour.image}
        kicker={`${tc(`${tour.category}.name`)} · ${tour.duration}`}
        title={tour.title}
        lede={tour.teaser}
        crumbs={[{ label: tn('home'), href: '/' }, { label: tn('tours'), href: '/tours' }, { label: tour.title }]}
      />

      <div className="container-x grid gap-12 py-16 sm:py-24 lg:grid-cols-[1fr_340px] lg:gap-14">
        <div className="min-w-0">
          <Reveal>
            <p className="kicker text-muted">{t('overview')}</p>
            <div className="mt-6 space-y-5 text-pretty font-serif text-xl leading-relaxed text-ink/90 sm:text-[1.4rem]">
              {tour.overview.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>

          {tour.highlights.length > 0 && (
            <Reveal className="mt-14 rounded-[2rem] bg-paper p-7 ring-1 ring-line sm:p-10">
              <h2 className="font-serif text-3xl">{t('highlights')}</h2>
              <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {tour.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-[0.97rem] leading-relaxed">
                    <span className="mt-2 size-2 shrink-0 rounded-full bg-sun" />
                    {h}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}


          <section className="mt-20" aria-labelledby="itinerary">
            <h2 id="itinerary" className="font-serif text-4xl sm:text-5xl">
              {tour.days <= 1 ? t('yourDay') : t('dayByDay')}
            </h2>
            <p className="mt-3 max-w-2xl text-muted">{t('itineraryLede')}</p>
            <div className="mt-8">
              <Itinerary steps={tour.itinerary} />
            </div>
            {tour.notes.length > 0 && (
              <p className="mt-6 flex gap-3 rounded-2xl bg-amber/15 p-5 text-sm leading-relaxed">
                <Info className="mt-0.5 size-4 shrink-0 text-muted" />
                {tour.notes.join(' ')}
              </p>
            )}
          </section>

          <section className="mt-20 grid gap-6 sm:grid-cols-2">
            <div className="rounded-[2rem] bg-paper p-7 ring-1 ring-line sm:p-8">
              <h2 className="font-serif text-2xl">{t('included')}</h2>
              <ul className="mt-5 space-y-3 text-[0.95rem]">
                {tour.included.map((x) => (
                  <li key={x} className="flex gap-3">
                    <Check className="mt-0.5 size-4 shrink-0 text-acacia" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[2rem] bg-sand-deep/70 p-7 sm:p-8">
              <h2 className="font-serif text-2xl">{t('excluded')}</h2>
              <ul className="mt-5 space-y-3 text-[0.95rem]">
                {tour.excluded.map((x) => (
                  <li key={x} className="flex gap-3">
                    <X className="mt-0.5 size-4 shrink-0 text-muted" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        <div className="lg:sticky lg:top-28 lg:self-start">
          <PriceCard tour={tour} />
          <p className="mt-5 px-2 text-xs leading-relaxed text-muted">{t('tailorNote')}</p>
        </div>
      </div>

      <GallerySection photos={tour.photos} title={tour.title} tone="paper" />

      <section className="bg-sand-deep/60 py-20 sm:py-28">
        <div className="container-x">
          <SectionHeader kicker={t('relatedKicker')} title={t('relatedTitle')} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {relatedTours(tour, locale).map((r) => (
              <TourCard key={r.slug} tour={r} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
