'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { MapPin } from 'lucide-react'
import { img } from '@/lib/images'
import { cn } from '@/lib/cn'
import { buttonClass } from '@/components/ui/ButtonLink'
import { Link } from '@/i18n/navigation'

const slides = [
  { image: 'lalibela-bete-giorgis-pilgrims', place: 'lalibela', href: '/destinations/historic-north/lalibela' },
  { image: 'simien-escarpment', place: 'simien', href: '/destinations/historic-north/simien-mountains' },
  { image: 'omo-hamar-women', place: 'omo', href: '/destinations/cultural-south/omo-valley' },
  { image: 'danakil-erta-ale', place: 'danakil', href: '/destinations/afar/danakil-depression' },
] as const

const DURATION = 7000

export function HeroSlideshow() {
  const t = useTranslations('Home.hero')
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const [seen, setSeen] = useState(1)

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setTimeout(() => setI((n) => (n + 1) % slides.length), DURATION)
    const warm = setTimeout(() => setSeen((n) => Math.max(n, i + 2)), 2500) // preload the next slide after first paint
    return () => {
      clearTimeout(id)
      clearTimeout(warm)
    }
  }, [i, paused])

  return (
    <section
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-sand"
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((s, n) => (n < seen || n === i) && (
        <div
          key={s.image}
          aria-hidden={n !== i}
          className={cn('absolute inset-0 -z-20 transition-opacity duration-[1600ms]', n === i ? 'opacity-100' : 'opacity-0')}
        >
          <Image
            src={img(s.image)}
            alt=""
            fill
            priority={n === 0}
            sizes="100vw"
            className={cn('object-cover', n === i && 'animate-ken-burns')}
          />
        </div>
      ))}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/35 to-ink/50" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_20%_60%,rgba(29,24,19,0.55),transparent_60%)]" />

      <div className="container-x flex flex-1 flex-col items-center justify-center pb-40 pt-32 text-center sm:pb-44">
        <h1 className="mx-auto max-w-[15ch] animate-rise text-balance text-[3.1rem] font-light leading-[0.98] [animation-delay:120ms] sm:text-7xl lg:text-[6.4rem]">
          {t.rich('title', { em: (c) => <em className="font-normal italic">{c}</em> })}
        </h1>
        <p className="mx-auto mt-7 max-w-xl animate-rise text-pretty text-base leading-relaxed text-sand/85 [animation-delay:220ms] sm:text-lg">
          {t('body')}
        </p>
        <div className="mt-9 flex animate-rise flex-col justify-center gap-3 [animation-delay:320ms] sm:flex-row">
          <Link href="/tours" className={buttonClass('sun')}>
            {t('ctaTours')}
          </Link>
          <Link href="/contact" className={buttonClass('glass')}>
            {t('ctaPlan')}
          </Link>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0">
        <div className="container-x flex flex-col items-center gap-5 pb-8 sm:pb-10">
          <Link
            href={slides[i].href}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur-md hover:bg-white/20"
          >
            <MapPin className="size-4 text-sand/70" />
            {t(`slides.${slides[i].place}`)}
          </Link>
          <div className="flex gap-2" role="tablist">
            {slides.map((s, n) => (
              <button
                key={s.image}
                type="button"
                role="tab"
                aria-selected={n === i}
                aria-label={t(`slides.${s.place}`)}
                onClick={() => setI(n)}
                className="group relative h-1 w-12 overflow-hidden rounded-full bg-white/25 sm:w-16"
              >
                <span
                  className={cn('absolute inset-y-0 left-0 rounded-full bg-amber', n === i ? 'w-full' : n < i ? 'w-full opacity-60' : 'w-0')}
                  key={n === i ? `on-${i}` : "off"}
                  style={n === i && !paused ? { animation: `grow ${DURATION}ms linear both` } : undefined}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
      <style>{`@keyframes grow{from{width:0}to{width:100%}}`}</style>
    </section>
  )
}
