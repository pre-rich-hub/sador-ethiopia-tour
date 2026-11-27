import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { regions } from '@/content/regions'
import { placesInRegion } from '@/lib/content'
import { img } from '@/lib/images'
import { cn } from '@/lib/cn'
import { SectionHeader, Accent } from '@/components/ui/SectionHeader'
import { Reveal } from '@/components/ui/Reveal'
import { ExploreButton } from '@/components/ui/ExploreButton'

/** Balanced grid: three cards on the first row, four on the second (lg). */
const layout = (i: number) => (i < 3 ? 'lg:col-span-4 lg:h-[360px]' : 'lg:col-span-3 lg:h-[320px]')

export function RegionsBento() {
  const t = useTranslations('Home.regions')
  const tr = useTranslations('Regions')
  const tc = useTranslations('Common')
  return (
    <section className="container-x py-24 sm:py-32">
      <SectionHeader align="center" kicker={t('kicker')} title={t.rich('title', { em: (c) => <Accent>{c}</Accent> })} lede={t('lede')} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5">
        {regions.map((r, i) => (
          <Reveal key={r.slug} delay={(i % 3) * 70} className={cn('group relative h-[260px] overflow-hidden rounded-[2rem] sm:h-[300px]', layout(i), i === 6 && 'sm:col-span-2 lg:col-span-3')}>
            <Link href={`/destinations/${r.slug}`} className="absolute inset-0 flex flex-col justify-end p-6 text-sand sm:p-8">
              <Image src={img(r.image)} alt="" fill sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" className="-z-20 object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105" />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />
              <div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sand/70">
                    {t('places', { count: placesInRegion(r.slug, 'en').length })}
                  </p>
                  <h3 className="mt-2 font-serif text-3xl leading-tight">{tr(`${r.slug}.name`)}</h3>
                  <p className="mt-2 line-clamp-2 max-w-md text-sm text-sand/80">{tr(`${r.slug}.tagline`)}</p>
                </div>
                <ExploreButton label={tc('exploreMore')} tone="glass" className="mt-5" />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
