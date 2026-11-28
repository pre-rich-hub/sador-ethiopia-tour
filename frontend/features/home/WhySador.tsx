import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { faBriefcase, faDollarSign, faHeadset, faLock, faStar, faUserTie, type IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { img } from '@/lib/images'
import { Reveal } from '@/components/ui/Reveal'
import { Accent } from '@/components/ui/SectionHeader'

// Wording and icons follow the "Why choose us" cards on the original sadorethiopiatours.com.
// Icons: Font Awesome Free solid set (CC BY 4.0, https://fontawesome.com/license/free).
const reasons = [
  { key: 'custom', icon: faBriefcase },
  { key: 'experts', icon: faUserTie },
  { key: 'service', icon: faStar },
  { key: 'support', icon: faHeadset },
  { key: 'rates', icon: faDollarSign },
  { key: 'access', icon: faLock },
] as const

function FaIcon({ icon, className }: { icon: IconDefinition; className?: string }) {
  const [width, height, , , path] = icon.icon
  return (
    <svg viewBox={`0 0 ${width} ${height}`} aria-hidden className={className} fill="currentColor">
      {(Array.isArray(path) ? path : [path]).map((d) => <path key={d} d={d} />)}
    </svg>
  )
}

export function WhySador() {
  const t = useTranslations('Home.why')
  return (
    <section className="relative isolate overflow-hidden py-24 text-sand sm:py-32">
      {/* Full-bleed HD backdrop, softly blurred so the cards stay the focus */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <Image
          src={img('simien-escarpment')}
          alt=""
          fill
          sizes="100vw"
          className="scale-110 object-cover blur-[3px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/45 to-ink/80" />
      </div>

      <div className="container-x">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="kicker justify-center text-sand/75">{t('kicker')}</p>
          <h2 className="mt-5 text-balance text-[2.1rem] leading-[1.06] text-sand sm:text-5xl lg:text-[3.4rem]">
            {t.rich('title', { em: (c) => <Accent>{c}</Accent> })}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-sand/80 sm:text-lg">{t('lede')}</p>
        </Reveal>

        <ul className="mt-14 grid gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {reasons.map(({ key, icon }, i) => (
            <Reveal
              as="li"
              key={key}
              delay={(i % 3) * 90}
              className="group relative flex flex-col items-center rounded-[1.75rem] border border-white/40 bg-paper/90 px-6 py-8 text-center text-ink shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] backdrop-blur-md transition-[transform,box-shadow,background-color] duration-500 hover:-translate-y-1 hover:bg-paper sm:px-8 sm:py-10"
            >
              <FaIcon icon={icon} className="h-11 text-sun transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:scale-110" />
              <h3 className="mt-6 font-serif text-2xl leading-tight">{t(`items.${key}.title`)}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{t(`items.${key}.body`)}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
