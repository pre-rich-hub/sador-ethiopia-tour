import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getTourCards } from '@/lib/content'
import { HeroSlideshow } from '@/features/home/HeroSlideshow'
import { Intro } from '@/features/home/Intro'
import { FeaturedTours } from '@/features/home/FeaturedTours'
import { RegionsBento } from '@/features/home/RegionsBento'
import { JourneysByStyle } from '@/features/home/JourneysByStyle'
import { FestivalsBand } from '@/features/home/FestivalsBand'
import { WhySador } from '@/features/home/WhySador'
import { Testimonials } from '@/components/sections/Testimonials'
import { UnescoStrip } from '@/features/home/UnescoStrip'
import { JournalTeaser } from '@/features/home/JournalTeaser'
import { Partners } from '@/components/sections/Partners'
import { PlanCta } from '@/components/sections/PlanCta'
import { SectionHeader, Accent } from '@/components/ui/SectionHeader'
import { JsonLd, organizationLd } from '@/components/seo/JsonLd'
import { alternates } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta' })
  return { title: { absolute: t('title') }, description: t('description'), alternates: alternates(locale, '/') }
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('Home.styles')
  return (
    <>
      <JsonLd data={organizationLd()} />
      <HeroSlideshow />
      <Intro />
      <FeaturedTours />
      <RegionsBento />
      <section className="bg-paper py-24 sm:py-32">
        <div className="container-x">
          <SectionHeader align="center" kicker={t('kicker')} title={t.rich('title', { em: (c) => <Accent>{c}</Accent> })} lede={t('lede')} />
          <JourneysByStyle tours={getTourCards(locale)} />
        </div>
      </section>
      <FestivalsBand />
      <WhySador />
      <Testimonials />
      <UnescoStrip />
      <JournalTeaser />
      <Partners />
      <PlanCta />
    </>
  )
}
