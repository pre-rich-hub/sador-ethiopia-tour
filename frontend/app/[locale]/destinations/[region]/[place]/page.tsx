import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getPlace, getPlaces, getRegion, getRegions, getTours, placesInRegion } from '@/lib/content'
import { routing } from '@/i18n/routing'
import { alternates } from '@/lib/seo'
import { img } from '@/lib/images'
import { Link } from '@/i18n/navigation'
import { PageHero } from '@/components/ui/PageHero'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { TourCard } from '@/features/tours/TourCard'
import { GallerySection } from '@/features/gallery/GallerySection'
import { KeepExploring } from '@/features/destinations/KeepExploring'

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => getPlaces(locale).map((p) => ({ locale, region: p.region, place: p.slug })))
}

type Props = { params: Promise<{ locale: string; region: string; place: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale, region, place } = await params
  const p = getPlace(region, place, locale)
  if (!p) return {}
  return { title: p.title, description: p.summary, alternates: alternates(locale, `/destinations/${region}/${place}`), openGraph: { images: [img(p.image)] } }
}

/** Tours whose itinerary mentions this place by name (matched on the English text). */
function toursVisiting(title: string, region: string, locale: string) {
  const tours = getTours('en')
  const localized = getTours(locale)
  const key = title.replace(/\s*\(.*\)$/, '').replace(/ (National Park|Cathedral|Monument|Statue|Square|Museum.*|Eco-Tourism Village)$/i, '').split(',')[0].trim().toLowerCase()
  const hits = tours.filter((t) => [t.title, t.teaser, ...t.itinerary.flatMap((s) => [s.title, ...s.paragraphs])].join(' ').toLowerCase().includes(key))
  const picked = (hits.length ? hits : tours.filter((t) => t.regions.includes(region))).slice(0, 3)
  return picked.map((t) => localized.find((x) => x.slug === t.slug)!)
}

export default async function PlacePage({ params }: Props) {
  const { locale, region, place } = await params
  setRequestLocale(locale)
  const p = getPlace(region, place, locale)
  const r = getRegion(region, locale)
  if (!p || !r) notFound()
  const t = await getTranslations('Destinations')
  const tr = await getTranslations('Regions')
  const tn = await getTranslations('Nav')
  const inRegion = placesInRegion(region, locale)
  const more = inRegion.filter((x) => x.slug !== p.slug).slice(0, 6)
  const countByRegion = Object.fromEntries(getRegions(locale).map((x) => [x.slug, placesInRegion(x.slug, locale).length]))
  const related = toursVisiting(getPlace(region, place, 'en')!.title, region, locale)

  return (
    <>
      <PageHero
        image={p.image}
        kicker={tr(`${r.slug}.name`)}
        title={p.title}
        crumbs={[
          { label: tn('home'), href: '/' },
          { label: tn('destinations'), href: '/destinations' },
          { label: tr(`${r.slug}.short`), href: `/destinations/${r.slug}` },
          { label: p.title },
        ]}
      />
      <div className="container-x grid gap-14 py-16 sm:py-24 lg:grid-cols-[1fr_340px] lg:gap-20">
        <Reveal className="min-w-0">
          <div className="prose-sador max-w-3xl text-[1.05rem] first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-7xl first-letter:leading-[0.85] first-letter:text-muted">
            {p.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap gap-3">
            <ButtonLink href={{ pathname: '/contact', query: { place: p.title } }}>{t('planVisit')}</ButtonLink>
            <ButtonLink href={`/destinations/${r.slug}`} variant="outline" arrow={false}>
              ← {tr(`${r.slug}.short`)}
            </ButtonLink>
          </div>
        </Reveal>
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <p className="kicker mb-5 text-muted">{t('moreIn', { region: tr(`${r.slug}.short`) })}</p>
          <ul className="space-y-4">
            {more.map((m) => (
              <li key={m.slug}>
                <Link href={`/destinations/${r.slug}/${m.slug}`} className="group grid grid-cols-[84px_1fr] items-center gap-4">
                  <div className="relative aspect-square overflow-hidden rounded-xl">
                    <Image src={img(m.image)} alt="" fill sizes="84px" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <span className="font-serif text-lg leading-tight group-hover:text-ink/70">{m.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
      <GallerySection photos={p.photos} title={p.title} tone="paper" />
      {related.length > 0 && (
        <section className="bg-sand-deep/60 py-20 sm:py-28">
          <div className="container-x">
            <SectionHeader kicker={t('journeysKicker')} title={t('visitOn', { place: p.title })} />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {related.map((x) => (
                <TourCard key={x.slug} tour={x} />
              ))}
            </div>
          </div>
        </section>
      )}
      <KeepExploring place={p} inRegion={inRegion} regions={getRegions(locale)} countByRegion={countByRegion} />
    </>
  )
}
