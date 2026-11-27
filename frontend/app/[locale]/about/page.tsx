import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { about as c } from '@/content/pages'
import { img } from '@/lib/images'
import { site } from '@/content/site'
import { alternates } from '@/lib/seo'
import { PageHero } from '@/components/ui/PageHero'
import { Reveal } from '@/components/ui/Reveal'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Testimonials } from '@/components/sections/Testimonials'
import { Partners } from '@/components/sections/Partners'
import { PlanCta } from '@/components/sections/PlanCta'


export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'About' })
  return { title: t('metaTitle'), description: c.intro[0], alternates: alternates(locale, '/about') }
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('About')
  const tn = await getTranslations('Nav')
  return (
    <>
      <PageHero image="travellers-family" kicker={t('kicker')} title={t('title')} crumbs={[{ label: tn('home'), href: '/' }, { label: tn('aboutLinks.aboutUs') }]} />
      <section className="container-x grid gap-12 py-20 sm:py-28 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <Reveal>
          <p className="kicker text-muted">{site.name}</p>
          <div className="mt-6 space-y-6 font-serif text-2xl leading-relaxed">
            {c.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/tours">{t('ctaTours')}</ButtonLink>
            <ButtonLink href="/family-meeting-trip" variant="outline">
              {t('ctaFamily')}
            </ButtonLink>
          </div>
        </Reveal>
        <Reveal className="grid grid-cols-2 gap-4">
          <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-[2rem]">
            <Image src={img('travellers-dinner')} alt={t('img1')} fill sizes="(max-width:1024px) 100vw, 45vw" className="object-cover" />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-[2rem]">
            <Image src={img('family-group')} alt="" fill sizes="25vw" className="object-cover" />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-[2rem]">
            <Image src={img('travellers-lalibela')} alt="" fill sizes="25vw" className="object-cover" />
          </div>
        </Reveal>
      </section>

      <section className="bg-ink py-20 text-sand sm:py-28">
        <div className="container-x">
          <Reveal className="max-w-3xl">
            <p className="kicker text-sand/70">{t('magicKicker')}</p>
            <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">{t('magicTitle')}</h2>
          </Reveal>
          <ul className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {c.pillars.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 70} className="border-t border-sand/15 pt-6">
                <span className="font-serif text-4xl font-light text-sand/70">0{i + 1}</span>
                <h3 className="mt-4 font-serif text-2xl">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-sand/65">{p.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-x grid gap-14 py-20 sm:py-28 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="kicker text-muted">{t('commitKicker')}</p>
          <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">{t('commitTitle')}</h2>
          <ul className="mt-10 space-y-8">
            {c.commitment.map((x) => (
              <li key={x.title} className="flex gap-5">
                <span className="mt-2 size-3 shrink-0 rounded-full bg-sun" />
                <div>
                  <h3 className="font-serif text-2xl">{x.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{x.body}</p>
                </div>
              </li>
            ))}
          </ul>
          <blockquote className="mt-12 rounded-[2rem] bg-sun p-8 font-serif text-2xl leading-snug text-ink">
            <span className="kicker mb-3 block text-ink/70 before:bg-ink">{t('goal')}</span>
            {c.goal}
          </blockquote>
        </Reveal>
        <Reveal>
          <p className="kicker text-muted">{t('servicesKicker')}</p>
          <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">{t('servicesTitle')}</h2>
          <ul className="mt-10 grid gap-px overflow-hidden rounded-[2rem] bg-line sm:grid-cols-2">
            {c.services.map((s) => (
              <li key={s.title} className="bg-paper p-6">
                <h3 className="font-serif text-xl">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.body}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>
      <Testimonials />
      <Partners />
      <PlanCta />
    </>
  )
}
