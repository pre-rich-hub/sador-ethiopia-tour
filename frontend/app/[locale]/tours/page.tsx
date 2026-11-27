import { Suspense } from 'react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getTourCards } from '@/lib/content'
import { PageHero } from '@/components/ui/PageHero'
import { TourExplorer } from '@/features/tours/TourExplorer'
import { PlanCta } from '@/components/sections/PlanCta'

import { alternates } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Tours' })
  return { title: t('metaTitle'), description: t('metaDescription'), alternates: alternates(locale, '/tours') }
}

export default async function ToursPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('Tours')
  const tn = await getTranslations('Nav')
  return (
    <>
      <PageHero
        image="gheralta-cliffs"
        kicker={t('kicker')}
        title={t('title')}
        lede={t('lede')}
        crumbs={[{ label: tn('home'), href: '/' }, { label: tn('tours') }]}
      />
      <section className="container-x py-14 sm:py-20">
        <Suspense>
          <TourExplorer tours={getTourCards(locale)} />
        </Suspense>
      </section>
      <PlanCta image="lalibela-bete-mariam" />
    </>
  )
}
