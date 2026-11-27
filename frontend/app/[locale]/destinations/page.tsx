import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { getRegions, placesInRegion, toursInRegion } from '@/lib/content'
import { img } from '@/lib/images'
import { alternates } from '@/lib/seo'
import { PageHero } from '@/components/ui/PageHero'
import { Reveal } from '@/components/ui/Reveal'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { PlanCta } from '@/components/sections/PlanCta'
import { cn } from '@/lib/cn'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Destinations' })
  return { title: t('metaTitle'), description: t('lede'), alternates: alternates(locale, '/destinations') }
}

export default async function DestinationsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('Destinations')
  const tr = await getTranslations('Regions')
  const tn = await getTranslations('Nav')
  return (
    <>
      <PageHero image="simien-escarpment" kicker={t('kicker')} title={t('title')} lede={t('lede')} crumbs={[{ label: tn('home'), href: '/' }, { label: tn('destinations') }]} />
      <div className="container-x space-y-24 py-20 sm:space-y-32 sm:py-28">
        {getRegions(locale).map((r, i) => {
          const places = placesInRegion(r.slug, locale)
          const nTours = toursInRegion(r.slug, locale).length
          return (
            <Reveal key={r.slug} as="section" className={cn('grid items-center gap-10 lg:grid-cols-2 lg:gap-16', i % 2 && 'lg:[&>*:first-child]:order-2')}>
              <Link href={`/destinations/${r.slug}`} className="group relative block aspect-[4/3] overflow-hidden rounded-[2.25rem]">
                <Image src={img(r.image)} alt={tr(`${r.slug}.name`)} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover transition-transform duration-[1400ms] group-hover:scale-105" />
                <span className="absolute left-6 top-6 font-serif text-6xl font-light text-sand/90">0{i + 1}</span>
              </Link>
              <div>
                <p className="kicker text-muted">{tr(`${r.slug}.tagline`)}</p>
                <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">{tr(`${r.slug}.name`)}</h2>
                <p className="mt-5 text-lg leading-relaxed text-muted">{r.intro[0]}</p>
                <ul className="mt-7 flex flex-wrap gap-2">
                  {places.slice(0, 8).map((p) => (
                    <li key={p.slug}>
                      <Link href={`/destinations/${r.slug}/${p.slug}`} className="inline-block rounded-full border border-line bg-paper px-4 py-2 text-sm hover:border-sun hover:text-ink/70">
                        {p.title}
                      </Link>
                    </li>
                  ))}
                  {places.length > 8 && <li className="px-2 py-2 text-sm text-muted">+{places.length - 8}</li>}
                </ul>
                <div className="mt-9 flex flex-wrap items-center gap-5">
                  <ButtonLink href={`/destinations/${r.slug}`} variant="ink">
                    {t('explore', { region: tr(`${r.slug}.short`) })}
                  </ButtonLink>
                  {nTours > 0 && <span className="text-sm text-muted">{t('journeys', { count: nTours })}</span>}
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
      <PlanCta />
    </>
  )
}
