import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Briefcase, Check, Gauge, Users } from 'lucide-react'
import { fleet, fleetCredits } from '@/content/fleet'
import { alternates } from '@/lib/seo'
import { PageHero } from '@/components/ui/PageHero'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { PlanCta } from '@/components/sections/PlanCta'
import { FleetGallery } from '@/components/ui/FleetGallery'

const INCLUDED = ['driver', 'fuel', 'allowance', 'water', 'insurance', 'support'] as const
const STEPS = ['tell', 'quote', 'go'] as const

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'CarRental' })
  return { title: t('metaTitle'), description: t('lede'), alternates: alternates(locale, '/car-rental') }
}

export default async function CarRentalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('CarRental')
  const tn = await getTranslations('Nav')
  const enquire = { pathname: '/contact', query: { tour: 'car-rental' } } as const

  return (
    <>
      <PageHero image="hadar-dig" kicker={t('kicker')} title={t('title')} lede={t('lede')} crumbs={[{ label: tn('home'), href: '/' }, { label: tn('carRental') }]}>
        <ButtonLink href={enquire}>{t('enquire')}</ButtonLink>
      </PageHero>

      <section className="container-x py-20 sm:py-28">
        <SectionHeader align="center" kicker={t('fleetKicker')} title={t('fleetTitle')} lede={t('fleetLede')} />
        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {fleet.map((v, i) => (
            <Reveal key={v.key} delay={(i % 2) * 80} className="flex flex-col overflow-hidden rounded-[1.75rem] bg-paper ring-1 ring-line">
              <FleetGallery photos={v.photos} studio={v.studio} alt={t(`vehicles.${v.key}.name`)}>
                <span className="absolute left-4 top-4 rounded-full bg-ink/80 px-3 py-1.5 text-xs font-semibold text-sand backdrop-blur">
                  {t(`vehicles.${v.key}.class`)}
                </span>
              </FleetGallery>
              <div className="flex flex-1 flex-col p-7">
                <h3 className="font-serif text-3xl">{t(`vehicles.${v.key}.name`)}</h3>
                <p className="mt-3 leading-relaxed text-muted">{t(`vehicles.${v.key}.body`)}</p>
                <ul className="mt-5 flex flex-wrap gap-2 text-sm">
                  <li className="inline-flex items-center gap-1.5 rounded-full bg-sand px-3 py-1.5"><Users className="size-4" />{t('seats', { n: v.seats })}</li>
                  <li className="inline-flex items-center gap-1.5 rounded-full bg-sand px-3 py-1.5"><Briefcase className="size-4" />{t('bags', { n: v.bags })}</li>
                  <li className="inline-flex items-center gap-1.5 rounded-full bg-sand px-3 py-1.5"><Gauge className="size-4" />{v.drive}</li>
                </ul>
                <p className="mt-5 text-sm"><span className="font-semibold">{t('bestFor')}</span> {t(`vehicles.${v.key}.bestFor`)}</p>
                <div className="mt-auto flex items-center justify-between gap-4 pt-7">
                  <span className="text-sm font-medium text-muted">{t('priceOnRequest')}</span>
                  <ButtonLink href={enquire} variant="ink">{t('requestCar')}</ButtonLink>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-muted">
          {t('photoCredits')}{' '}
          {fleetCredits.map((c, i) => (
            <span key={c.href}>
              {i > 0 && ' · '}
              <a href={c.href} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline">{c.label}</a>
            </span>
          ))}
        </p>
      </section>

      <section className="bg-ink py-20 text-sand sm:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="kicker text-sand/70">{t('includedKicker')}</p>
            <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">{t('includedTitle')}</h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {INCLUDED.map((k) => (
                <li key={k} className="flex gap-3 text-sand/85">
                  <Check className="mt-0.5 size-5 shrink-0" />
                  {t(`included.${k}`)}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal>
            <p className="kicker text-sand/70">{t('stepsKicker')}</p>
            <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">{t('stepsTitle')}</h2>
            <ol className="mt-8 space-y-6">
              {STEPS.map((k, i) => (
                <li key={k} className="flex gap-5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-sun font-serif text-lg font-semibold text-ink">{i + 1}</span>
                  <div>
                    <p className="font-serif text-xl">{t(`steps.${k}.title`)}</p>
                    <p className="mt-1 text-sm leading-relaxed text-sand/70">{t(`steps.${k}.body`)}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>
      <PlanCta image="awash-landscape" />
    </>
  )
}
