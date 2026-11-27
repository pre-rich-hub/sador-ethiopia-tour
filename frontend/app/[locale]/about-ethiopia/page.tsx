import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { aboutEthiopia as c } from '@/content/pages'
import { img } from '@/lib/images'
import { alternates } from '@/lib/seo'
import { PageHero } from '@/components/ui/PageHero'
import { Reveal } from '@/components/ui/Reveal'
import { PlanCta } from '@/components/sections/PlanCta'

import { cn } from '@/lib/cn'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'AboutEthiopia' })
  return { title: t('metaTitle'), description: c.intro[0], alternates: alternates(locale, '/about-ethiopia') }
}

export default async function AboutEthiopiaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('AboutEthiopia')
  const tn = await getTranslations('Nav')
  return (
    <>
      <PageHero image="blue-nile-falls-wide" kicker={t('kicker')} title={t('title')} crumbs={[{ label: tn('home'), href: '/' }, { label: tn('aboutLinks.aboutEthiopia') }]} />
      <section className="container-x py-20 sm:py-28">
        <Reveal className="max-w-4xl space-y-6 font-serif text-2xl leading-relaxed sm:text-[1.75rem]">
          {c.intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Reveal>
        <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-[2rem] bg-line lg:grid-cols-4">
          {c.facts.map((f, i) => (
            <Reveal key={f.label} delay={i * 70} className="bg-paper p-7 sm:p-9">
              <dt className="sr-only">{f.label}</dt>
              <dd>
                <span className="block font-serif text-5xl font-light sm:text-6xl">{f.value}</span>
                <span className="mt-2 block text-sm text-muted">{f.label}</span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </section>

      {c.sections.map((s, i) => (
        <section key={s.id} className={cn('py-16 sm:py-24', i % 2 === 0 && 'bg-sand-deep/50')}>
          <div className={cn('container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-20', i % 2 && 'lg:[&>*:first-child]:order-2')}>
            <Reveal className="relative aspect-[4/5] overflow-hidden rounded-[2.25rem] sm:aspect-[4/3] lg:aspect-[4/5]">
              <Image src={img(s.image)} alt="" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
            </Reveal>
            <Reveal>
              <h2 className="text-4xl leading-tight sm:text-5xl">{s.title}</h2>
              <div className="prose-sador mt-6 text-[1.05rem]">
                {s.body.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      ))}

      <section className="container-x py-20 sm:py-28">
        <Reveal className="max-w-3xl">
          <p className="kicker text-muted">{t('climateKicker')}</p>
          <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">{t('climateTitle')}</h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">{c.climate.intro}</p>
        </Reveal>
        <ol className="mt-12 grid gap-4 md:grid-cols-5">
          {c.climate.zones.map((z, i) => (
            <Reveal as="li" key={z.name} delay={i * 60} className="relative overflow-hidden rounded-[1.75rem] bg-paper p-6 ring-1 ring-line">
              <span className="absolute inset-x-0 top-0 h-1.5" style={{ background: ['#5b6b45', '#7c8a4c', '#e2a93b', '#e8702a', '#b5431c'][i] }} />
              <p className="font-serif text-2xl">{z.name}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted">{z.range}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{z.body}</p>
            </Reveal>
          ))}
        </ol>
        <Reveal className="mt-10 rounded-[2rem] bg-ink p-8 text-sand sm:p-10">
          <p className="kicker text-sand/70">{t('bestTime')}</p>
          <p className="mt-4 max-w-3xl font-serif text-xl leading-relaxed sm:text-2xl">{c.climate.best}</p>
        </Reveal>
      </section>
      <PlanCta image="gondar-fasil-castle" />
    </>
  )
}
