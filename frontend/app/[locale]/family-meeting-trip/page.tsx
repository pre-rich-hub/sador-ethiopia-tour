import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Check } from 'lucide-react'
import { familyTrip as c } from '@/content/pages'
import { img } from '@/lib/images'
import { alternates } from '@/lib/seo'
import { testimonials } from '@/content/testimonials'
import { PageHero } from '@/components/ui/PageHero'
import { Reveal } from '@/components/ui/Reveal'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { PlanCta } from '@/components/sections/PlanCta'


export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Family' })
  return { title: t('metaTitle'), description: c.intro[0], alternates: alternates(locale, '/family-meeting-trip') }
}

export default async function FamilyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('Family')
  const tn = await getTranslations('Nav')
  const quotes = testimonials.filter((x) => ['Jessica P.', 'Vatter', 'Kelley'].includes(x.name))
  return (
    <>
      <PageHero image="family-reunion" kicker={t('kicker')} title={t('title')} lede={t('lede')} crumbs={[{ label: tn('home'), href: '/' }, { label: tn('exp.family') }]}>
        <ButtonLink href={{ pathname: '/contact', query: { type: 'family' } }}>{t('cta')}</ButtonLink>
      </PageHero>
      <section className="container-x grid gap-12 py-20 sm:py-28 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <Reveal className="space-y-6 font-serif text-2xl leading-relaxed">
          {c.intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Reveal>
        <Reveal>
          <p className="kicker text-muted">{t('expectKicker')}</p>
          <p className="mt-5 text-lg leading-relaxed text-muted">{c.expect}</p>
          <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-[2rem]">
            <Image src={img('family-group')} alt="" fill sizes="(max-width:1024px) 100vw, 45vw" className="object-cover" />
          </div>
        </Reveal>
      </section>
      <section className="bg-sand-deep/60 py-20 sm:py-28">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <p className="kicker text-muted">{t('whyKicker')}</p>
            <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">{t('whyTitle')}</h2>
          </Reveal>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {c.why.map((w, i) => (
              <Reveal as="li" key={w.title} delay={i * 70} className="rounded-[1.75rem] bg-paper p-7 ring-1 ring-line">
                <h3 className="font-serif text-2xl leading-tight">{w.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{w.body}</p>
              </Reveal>
            ))}
          </ul>
          <Reveal className="mt-16">
            <h2 className="text-3xl sm:text-4xl">{t('includedTitle')}</h2>
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {c.included.map((g) => (
              <Reveal key={g.title} className="rounded-[1.75rem] bg-ink p-7 text-sand">
                <h3 className="font-serif text-2xl text-sand/70">{g.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {g.items.map((it) => (
                    <li key={it} className="flex gap-3 text-sm leading-relaxed text-sand/80">
                      <Check className="mt-0.5 size-4 shrink-0 text-sand/70" />
                      {it}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="container-x py-20 sm:py-28">
        <Reveal className="mb-12 max-w-2xl">
          <p className="kicker text-muted">{t('storiesKicker')}</p>
          <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">{t('storiesTitle')}</h2>
        </Reveal>
        <div className="grid gap-6 lg:grid-cols-3">
          {quotes.map((q) => (
            <Reveal key={q.name} as="figure" className="rounded-[2rem] bg-paper p-8 ring-1 ring-line">
              <blockquote className="font-serif text-lg leading-relaxed">“{q.quote}”</blockquote>
              <figcaption className="mt-6 text-sm text-muted">
                <span className="font-semibold text-ink">{q.name}</span> · {q.country}
              </figcaption>
            </Reveal>
          ))}
        </div>
      </section>
      <PlanCta image="travellers-family" />
    </>
  )
}
