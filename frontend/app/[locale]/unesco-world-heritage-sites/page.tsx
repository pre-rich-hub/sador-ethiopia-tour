import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getPlaces, unescoSites } from '@/lib/content'
import { img } from '@/lib/images'
import { alternates } from '@/lib/seo'
import { Link } from '@/i18n/navigation'
import { PageHero } from '@/components/ui/PageHero'
import { Reveal } from '@/components/ui/Reveal'
import { PlanCta } from '@/components/sections/PlanCta'

import { cn } from '@/lib/cn'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Unesco' })
  return { title: t('metaTitle'), description: t('lede'), alternates: alternates(locale, '/unesco-world-heritage-sites') }
}

export default async function UnescoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('Unesco')
  const tn = await getTranslations('Nav')
  const sites = [...unescoSites].sort((a, b) => a.inscribed - b.inscribed)
  return (
    <>
      <PageHero image="axum-obelisk" kicker={t('kicker')} title={t('title')} lede={t('lede')} crumbs={[{ label: tn('home'), href: '/' }, { label: tn('exp.unesco') }]} />
      <section className="container-x grid gap-10 py-20 lg:grid-cols-2 lg:gap-20">
        <Reveal className="font-serif text-2xl leading-relaxed">{t('intro1')}</Reveal>
        <Reveal className="text-lg leading-relaxed text-muted">{t('intro2')}</Reveal>
      </section>
      <ol className="container-x space-y-20 pb-24 sm:space-y-28">
        {sites.map((s, i) => {
          const place = s.place ? getPlaces(locale).find((p) => p.slug === s.place) : undefined
          return (
            <Reveal as="li" key={s.slug} className={cn('grid scroll-mt-28 items-center gap-8 lg:grid-cols-2 lg:gap-16', i % 2 && 'lg:[&>*:first-child]:order-2')}>
              <div id={s.slug} className="relative aspect-[4/3] overflow-hidden rounded-[2.25rem]">
                <Image src={img(s.image)} alt={s.title} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-4">
                  <span className="font-serif text-5xl font-light">{String(i + 1).padStart(2, '0')}</span>
                  <span className="rounded-full border border-line px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted">
                    {t('inscribed', { year: s.inscribed })}
                  </span>
                </div>
                <h2 className="mt-4 text-3xl leading-tight sm:text-4xl">{s.title}</h2>
                <div className="prose-sador mt-5">
                  {s.body.slice(0, 3).map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
                {place && (
                  <Link href={`/destinations/${place.region}/${place.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-muted hover:underline">
                    {t('visit', { place: place.title })} →
                  </Link>
                )}
              </div>
            </Reveal>
          )
        })}
      </ol>
      <PlanCta image="lalibela-bete-mariam" />
    </>
  )
}
