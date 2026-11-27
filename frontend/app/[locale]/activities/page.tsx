import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { activities, activityGroups } from '@/lib/content'
import { img } from '@/lib/images'
import { alternates } from '@/lib/seo'
import { Link } from '@/i18n/navigation'
import { PageHero } from '@/components/ui/PageHero'
import { Reveal } from '@/components/ui/Reveal'
import { ExploreButton } from '@/components/ui/ExploreButton'
import { PlanCta } from '@/components/sections/PlanCta'


export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Activities' })
  return { title: t('metaTitle'), description: t('lede'), alternates: alternates(locale, '/activities') }
}

export default async function ActivitiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('Activities')
  const tn = await getTranslations('Nav')
  const tc = await getTranslations('Common')
  return (
    <>
      <PageHero image="meskel-priests" kicker={t('kicker')} title={t('title')} lede={t('lede')} crumbs={[{ label: tn('home'), href: '/' }, { label: tn('exp.activities') }]} />
      <nav className="sticky top-[72px] z-30 border-b border-line bg-sand/95 backdrop-blur-xl lg:top-20" aria-label={t('jump')}>
        <ul className="container-x scrollbar-none flex gap-1 overflow-x-auto py-3">
          {activityGroups.map((g) => (
            <li key={g}>
              <a href={`#${g}`} className="block shrink-0 rounded-full px-4 py-2 text-sm font-medium hover:bg-ink/5">
                {t(`groups.${g}`)}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="container-x py-16 sm:py-24">
        {activityGroups.map((g) => {
          const list = activities.filter((a) => a.category === g)
          if (!list.length) return null
          return (
            <section key={g} id={g} className="scroll-mt-40 border-b border-line py-14 first:pt-0 last:border-0">
              <Reveal className="mb-10 grid gap-4 lg:grid-cols-[1fr_1.4fr] lg:items-end">
                <h2 className="text-4xl sm:text-5xl">{t(`groups.${g}`)}</h2>
                <p className="max-w-xl text-lg leading-relaxed text-muted">{t(`groupLedes.${g}`)}</p>
              </Reveal>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((a, i) => (
                  <Reveal key={a.slug} delay={(i % 3) * 70}>
                    <Link href={`/activities/${a.slug}`} className="group relative block aspect-[4/5] overflow-hidden rounded-[2rem] text-sand">
                      <Image src={img(a.image)} alt="" fill sizes="(max-width:640px) 100vw, 33vw" className="object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
                      <div className="absolute inset-x-6 bottom-6">
                        <h3 className="font-serif text-3xl leading-tight">{a.title}</h3>
                        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-sand/75">{a.summary}</p>
                        <div className="mt-5 flex justify-center">
                          <ExploreButton label={tc('exploreMore')} tone="glass" />
                        </div>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </section>
          )
        })}
      </div>
      <PlanCta image="rafting" />
    </>
  )
}
