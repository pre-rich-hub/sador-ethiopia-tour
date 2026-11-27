import { useTranslations } from 'next-intl'
import { BadgePercent, Clock3, Compass, HeartHandshake, KeyRound, UserRoundCheck } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { Accent } from '@/components/ui/SectionHeader'

const reasons = [
  { key: 'custom', Icon: Compass },
  { key: 'experts', Icon: UserRoundCheck },
  { key: 'service', Icon: HeartHandshake },
  { key: 'support', Icon: Clock3 },
  { key: 'rates', Icon: BadgePercent },
  { key: 'access', Icon: KeyRound },
] as const

export function WhySador() {
  const t = useTranslations('Home.why')
  return (
    <section className="container-x py-24 sm:py-32">
      <div className="grid gap-14">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="kicker justify-center text-muted">{t('kicker')}</p>
          <h2 className="mt-5 text-balance text-4xl leading-[1.06] sm:text-5xl">{t.rich('title', { em: (c) => <Accent>{c}</Accent> })}</h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">{t('lede')}</p>
        </Reveal>
        <ul className="grid gap-px overflow-hidden rounded-[2rem] bg-line sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map(({ key, Icon }, i) => (
            <Reveal as="li" key={key} delay={(i % 2) * 80} className="flex flex-col items-center bg-sand p-8 text-center sm:p-9">
              <Icon className="size-7 text-sun" strokeWidth={1.6} />
              <h3 className="mt-5 font-serif text-2xl">{t(`items.${key}.title`)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{t(`items.${key}.body`)}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
