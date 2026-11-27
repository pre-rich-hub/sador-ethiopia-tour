import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { Place } from '@/lib/content'
import type { Region } from '@/content/regions'
import { img } from '@/lib/images'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/cn'
import { Reveal } from '@/components/ui/Reveal'
import { ExploreButton } from '@/components/ui/ExploreButton'

type Props = { place: Place; inRegion: Place[]; regions: Region[]; countByRegion: Record<string, number> }

/** End-of-page navigation: previous/next place in the same region, then the other regions. */
export async function KeepExploring({ place, inRegion, regions, countByRegion }: Props) {
  const t = await getTranslations('Destinations')
  const tr = await getTranslations('Regions')
  const tc = await getTranslations('Common')
  const i = inRegion.findIndex((x) => x.slug === place.slug)
  const prev = inRegion.length > 1 ? inRegion[(i - 1 + inRegion.length) % inRegion.length] : undefined
  const next = inRegion.length > 2 ? inRegion[(i + 1) % inRegion.length] : undefined
  const others = regions.filter((r) => r.slug !== place.region)

  return (
    <section className="py-20 sm:py-28">
      <div className="container-x">
        <div className="text-center">
          <p className="kicker justify-center text-muted">{t('keepKicker')}</p>
          <h2 className="mt-4 text-balance text-4xl sm:text-5xl">{t('keepTitle')}</h2>
        </div>

        {prev && (
          <div className={cn('mt-12 grid gap-5', next && 'md:grid-cols-2')}>
            {[
              { p: prev, label: t('previous'), Icon: ArrowLeft },
              ...(next ? [{ p: next, label: t('next'), Icon: ArrowRight }] : []),
            ].map(({ p, label, Icon }, n) => (
              <Reveal key={p.slug} delay={n * 80}>
                <Link
                  href={`/destinations/${p.region}/${p.slug}`}
                  className="group relative isolate flex h-60 flex-col justify-end overflow-hidden rounded-[1.75rem] p-7 text-sand sm:h-72"
                >
                  <Image src={img(p.image)} alt="" fill sizes="(max-width:768px) 100vw, 50vw" className="-z-20 object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105" />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent" />
                  <span className={cn('inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-sand/75', n === 1 && 'md:flex-row-reverse md:self-end')}>
                    <Icon className="size-4" />
                    {label}
                  </span>
                  <span className={cn('mt-2 font-serif text-3xl leading-tight', n === 1 && 'md:text-right')}>{p.title}</span>
                  <ExploreButton label={tc('exploreMore')} tone="glass" className={cn('mt-4 self-start', n === 1 && 'md:self-end')} />
                </Link>
              </Reveal>
            ))}
          </div>
        )}

        <div className="mt-16 flex items-end justify-between gap-6">
          <h3 className="font-serif text-2xl sm:text-3xl">{t('otherRegions')}</h3>
          <Link href="/destinations" className="hidden shrink-0 text-sm font-semibold underline-offset-4 hover:underline sm:inline">
            {t('allRegions')}
          </Link>
        </div>
        <div className="scrollbar-none -mx-5 mt-6 flex snap-x gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:px-0 lg:grid-cols-6">
          {others.map((r) => (
            <Link
              key={r.slug}
              href={`/destinations/${r.slug}`}
              className="group relative isolate flex aspect-[3/4] w-[46vw] shrink-0 snap-start flex-col justify-end overflow-hidden rounded-2xl p-4 text-sand sm:w-auto"
            >
              <Image src={img(r.image)} alt="" fill sizes="(max-width:640px) 46vw, (max-width:1024px) 33vw, 16vw" className="-z-20 object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
              <span className="font-serif text-lg leading-tight">{tr(`${r.slug}.short`)}</span>
              <span className="mt-0.5 text-xs text-sand/70">{t('placeCount', { count: countByRegion[r.slug] ?? 0 })}</span>
              <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-sand transition-colors group-hover:text-sun">
                {tc('exploreMore')}
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
