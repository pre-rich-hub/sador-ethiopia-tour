import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { regions } from '@/content/regions'
import { getRegion, placesInRegion, toursInRegion } from '@/lib/content'
import { routing } from '@/i18n/routing'
import { alternates } from '@/lib/seo'
import { img } from '@/lib/images'
import { PageHero } from '@/components/ui/PageHero'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { PlaceCard } from '@/features/destinations/PlaceCard'
import { TourCard } from '@/features/tours/TourCard'
import { PlanCta } from '@/components/sections/PlanCta'


export function generateStaticParams() {
  return routing.locales.flatMap((locale) => regions.map((r) => ({ locale, region: r.slug })))
}

type Props = { params: Promise<{ locale: string; region: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale, region } = await params
  const r = getRegion(region, locale)
  if (!r) return {}
  const t = await getTranslations({ locale, namespace: 'Regions' })
  return { title: t(`${r.slug}.name`), description: r.intro[0], alternates: alternates(locale, `/destinations/${r.slug}`), openGraph: { images: [img(r.image)] } }
}

export default async function RegionPage({ params }: Props) {
  const { locale, region } = await params
  setRequestLocale(locale)
  const r = getRegion(region, locale)
  if (!r) notFound()
  const t = await getTranslations('Destinations')
  const tr = await getTranslations('Regions')
  const tn = await getTranslations('Nav')
  const places = placesInRegion(r.slug, locale)
  const regionTours = toursInRegion(r.slug, locale)
  const groups = Array.from(new Set(places.map((p) => p.group ?? '')))

  return (
    <>
      <PageHero
        image={r.image}
        kicker={tr(`${r.slug}.tagline`)}
        title={tr(`${r.slug}.name`)}
        crumbs={[{ label: tn('home'), href: '/' }, { label: tn('destinations'), href: '/destinations' }, { label: tr(`${r.slug}.short`) }]}
      />
      <section className="container-x grid gap-10 py-20 sm:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal>
          <p className="kicker text-muted">{t('about', { region: tr(`${r.slug}.short`) })}</p>
          <p className="mt-6 font-serif text-5xl font-light">{t('placeCount', { count: places.length })}</p>
        </Reveal>
        <Reveal className="space-y-6 font-serif text-xl leading-relaxed text-ink/90 sm:text-2xl">
          {r.intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Reveal>
      </section>

      <section className="container-x pb-24">
        {groups.map((g) => (
          <div key={g || 'all'} className="mb-20 last:mb-0">
            {g && (
              <Reveal className="mb-8 flex items-center gap-5">
                <h2 className="font-serif text-3xl sm:text-4xl">{t(`groups.${g.replace(/\s+/g, '')}`)}</h2>
                <span className="h-px flex-1 bg-line" />
              </Reveal>
            )}
            <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {places
                .filter((p) => (p.group ?? '') === g)
                .map((p, i) => (
                  <Reveal key={p.slug} delay={(i % 3) * 70}>
                    <PlaceCard place={p} />
                  </Reveal>
                ))}
            </div>
          </div>
        ))}
      </section>

      {regionTours.length > 0 && (
        <section className="bg-sand-deep/60 py-20 sm:py-28">
          <div className="container-x">
            <SectionHeader kicker={t('journeysKicker')} title={t('journeysTitle', { region: tr(`${r.slug}.short`) })} />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {regionTours.slice(0, 6).map((x) => (
                <TourCard key={x.slug} tour={x} />
              ))}
            </div>
          </div>
        </section>
      )}
      <PlanCta image={r.image} />
    </>
  )
}
