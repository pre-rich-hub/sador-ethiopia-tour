import { useLocale, useTranslations } from 'next-intl'
import { getTours } from '@/lib/content'
import { SectionHeader, Accent } from '@/components/ui/SectionHeader'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Reveal } from '@/components/ui/Reveal'
import { TourCard } from '@/features/tours/TourCard'

export function FeaturedTours() {
  const t = useTranslations('Home.featured')
  const featured = getTours(useLocale()).filter((x) => x.featured)
  return (
    <section className="bg-sand-deep/60 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeader align="center"
          kicker={t('kicker')}
          title={t.rich('title', { em: (c) => <Accent>{c}</Accent> })}
          lede={t('lede')}
          action={<ButtonLink href="/tours" variant="outline">{t('cta')}</ButtonLink>}
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {featured.slice(0, 6).map((tour, i) => (
            <Reveal key={tour.slug} delay={(i % 3) * 70}>
              <TourCard tour={tour} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
