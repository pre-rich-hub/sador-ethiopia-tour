import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { img } from '@/lib/images'
import { SectionHeader, Accent } from '@/components/ui/SectionHeader'
import { Reveal } from '@/components/ui/Reveal'
import { SunArc } from '@/components/ui/SunArc'
import { ExploreButton } from '@/components/ui/ExploreButton'

const festivals = [
  { key: 'genna', image: 'genna-lalibela-pilgrims', href: '/tours/genna-ethiopian-christmas-lalibela' },
  { key: 'timket', image: 'timket-procession', href: '/tours/timket-festival-gondar' },
  { key: 'ashenda', image: 'ashenda-group', href: '/activities/ashenda' },
  { key: 'meskel', image: 'meskel-damera', href: '/activities/meskel' },
] as const

export function FestivalsBand() {
  const t = useTranslations('Home.festivals')
  const tc = useTranslations('Common')
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-sand sm:py-32">
      <SunArc className="absolute -left-40 bottom-0 w-[700px] opacity-[0.08]" />
      <div className="container-x relative">
        <SectionHeader align="center" tone="dark" kicker={t('kicker')} title={t.rich('title', { em: (c) => <Accent>{c}</Accent> })} lede={t('lede')} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {festivals.map((f, i) => (
            <Reveal key={f.key} delay={i * 80}>
              <Link href={f.href} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem]">
                  <Image src={img(f.image)} alt="" fill sizes="(max-width:640px) 100vw, 25vw" className="object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                  <div className="absolute left-1/2 top-5 -translate-x-1/2 rounded-full bg-sun px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-ink">
                    {t(`items.${f.key}.when`)}
                  </div>
                  <div className="absolute inset-x-5 bottom-5 text-center">
                    <h3 className="font-serif text-3xl">{t(`items.${f.key}.name`)}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-sand/75">{t(`items.${f.key}.body`)}</p>
                    <ExploreButton label={tc('exploreMore')} tone="glass" className="mt-5" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
