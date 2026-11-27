import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Compass, Landmark, Mountain, Users } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { img } from '@/lib/images'

const pillars = [
  { key: 'history', Icon: Landmark },
  { key: 'culture', Icon: Users },
  { key: 'nature', Icon: Mountain },
  { key: 'tailored', Icon: Compass },
] as const

export function Intro() {
  const t = useTranslations('Home.intro')
  return (
    <section className="container-x py-24 sm:py-32">
      <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
        <Reveal className="relative order-2 lg:order-1">
          <div className="grid grid-cols-[1.25fr_1fr] gap-4">
            <div className="relative row-span-2 aspect-[3/4] overflow-hidden rounded-[2rem]">
              <Image src={img('gondar-debre-birhan-ceiling')} alt={t('img1')} fill sizes="(max-width:1024px) 60vw, 30vw" className="object-cover" />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-[2rem]">
              <Image src={img('simien-gelada')} alt={t('img2')} fill sizes="(max-width:1024px) 40vw, 20vw" className="object-cover" />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-[2rem]">
              <Image src={img('new-year-coffee')} alt={t('img3')} fill sizes="(max-width:1024px) 40vw, 20vw" className="object-cover" />
            </div>
          </div>
          <div className="absolute -bottom-6 left-6 rounded-2xl bg-ink px-6 py-5 text-sand shadow-xl sm:left-10">
            <p className="font-serif text-4xl font-semibold text-sand/70">3,000</p>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-sand/70">{t('years')}</p>
          </div>
        </Reveal>

        <div className="order-1 text-center lg:order-2">
          <Reveal>
            <p className="kicker justify-center text-muted">{t('kicker')}</p>
            <h2 className="mt-5 text-balance text-4xl leading-[1.06] sm:text-5xl lg:text-[3.6rem]">
              {t.rich('title', { em: (c) => <em className="italic">{c}</em> })}
            </h2>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-muted">{t('body')}</p>
          </Reveal>
          <ul className="mx-auto mt-10 grid max-w-xl grid-cols-2 gap-x-4 gap-y-6 rounded-[1.75rem] bg-sand-deep/50 p-5 sm:gap-x-8 sm:gap-y-8 sm:bg-transparent sm:p-0">
            {pillars.map(({ key, Icon }, n) => (
              <Reveal as="li" key={key} delay={n * 80} className="flex flex-col items-center gap-2 sm:gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-sand text-muted sm:size-11 sm:bg-sand-deep">
                  <Icon className="size-4 sm:size-5" />
                </span>
                <span>
                  <span className="block font-serif text-lg font-semibold leading-tight sm:text-xl sm:font-normal">{t(`pillars.${key}.title`)}</span>
                  <span className="mt-1 block text-[0.8rem] leading-snug text-ink/70 sm:text-sm sm:text-muted sm:leading-relaxed">{t(`pillars.${key}.body`)}</span>
                </span>
              </Reveal>
            ))}
          </ul>
          <Reveal className="mt-10">
            <ButtonLink href="/about-ethiopia" variant="outline">
              {t('cta')}
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
