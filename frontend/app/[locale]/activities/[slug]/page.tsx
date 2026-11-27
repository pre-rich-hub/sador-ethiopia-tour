import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { activities, getActivity, getTours } from '@/lib/content'
import { routing } from '@/i18n/routing'
import { alternates } from '@/lib/seo'
import { img } from '@/lib/images'
import { Link } from '@/i18n/navigation'
import { PageHero } from '@/components/ui/PageHero'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { TourCard } from '@/features/tours/TourCard'
import { PlanCta } from '@/components/sections/PlanCta'


export function generateStaticParams() {
  return routing.locales.flatMap((locale) => activities.map((a) => ({ locale, slug: a.slug })))
}

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params
  const a = getActivity(slug)
  if (!a) return {}
  return { title: a.title, description: a.summary, alternates: alternates(locale, `/activities/${slug}`), openGraph: { images: [img(a.image)] } }
}

const TOUR_MATCH: Record<string, string[]> = {
  timket: ['timket-festival-gondar'],
  genna: ['genna-ethiopian-christmas-lalibela'],
  'volcano-desert-expeditions': ['6-days-danakil-desert-expedition'],
  trekking: ['7-days-historic-north-simien-mountains', '9-days-historic-north', '11-days-bale-mountains-omo-valley'],
  'wildlife-safaris': ['11-days-bale-mountains-omo-valley', '2-days-awash-national-park', '4-days-awash-harar'],
  'bird-watching': ['11-days-bale-mountains-omo-valley', '15-days-best-of-ethiopia', '2-days-awash-national-park'],
  'community-tourism': ['8-days-omo-valley', '12-days-omo-valley-lalibela', 'day-trip-wenchi-crater-lake'],
  pilgrimages: ['3-days-lalibela', '7-days-rock-hewn-churches-of-tigray', 'genna-ethiopian-christmas-lalibela'],
  'dramatic-landscapes': ['7-days-rock-hewn-churches-of-tigray', '6-days-danakil-desert-expedition', '7-days-historic-north-simien-mountains'],
  'islamic-festivals': ['3-days-harar', '4-days-awash-harar', '3-days-harar-dire-dawa'],
}

export default async function ActivityPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const a = getActivity(slug)
  if (!a) notFound()
  const t = await getTranslations('Activities')
  const tn = await getTranslations('Nav')
  const tours = getTours(locale)
  const matched = (TOUR_MATCH[a.slug] ?? []).map((s) => tours.find((x) => x.slug === s)).filter((x) => x !== undefined)
  const related = matched.length ? matched : tours.filter((x) => x.featured).slice(0, 3)
  const siblings = activities.filter((x) => x.category === a.category && x.slug !== a.slug)

  return (
    <>
      <PageHero
        image={a.image}
        kicker={t(`groups.${a.category}`)}
        title={a.title}
        crumbs={[{ label: tn('home'), href: '/' }, { label: tn('exp.activities'), href: '/activities' }, { label: a.title }]}
      />
      <div className="container-x grid gap-14 py-16 sm:py-24 lg:grid-cols-[1fr_320px] lg:gap-20">
        <Reveal className="prose-sador max-w-3xl text-[1.08rem]">
          {a.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Reveal>
        {siblings.length > 0 && (
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="kicker mb-5 text-muted">{t('more', { group: t(`groups.${a.category}`) })}</p>
            <ul className="space-y-4">
              {siblings.map((s) => (
                <li key={s.slug}>
                  <Link href={`/activities/${s.slug}`} className="group grid grid-cols-[76px_1fr] items-center gap-4">
                    <div className="relative aspect-square overflow-hidden rounded-xl">
                      <Image src={img(s.image)} alt="" fill sizes="76px" className="object-cover" />
                    </div>
                    <span className="font-serif text-lg leading-tight group-hover:text-ink/70">{s.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </div>
      <section className="bg-sand-deep/60 py-20 sm:py-28">
        <div className="container-x">
          <SectionHeader kicker={t('journeysKicker')} title={t('journeysTitle')} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {related.map((x) => (
              <TourCard key={x.slug} tour={x} />
            ))}
          </div>
        </div>
      </section>
      <PlanCta image={a.image} />
    </>
  )
}
