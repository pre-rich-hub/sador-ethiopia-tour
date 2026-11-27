'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react'
import { testimonials } from '@/content/testimonials'
import { tripadvisor } from '@/content/tripadvisor'
import { TripadvisorLogo } from '@/components/ui/SocialIcons'
import { Accent } from '@/components/ui/SectionHeader'

const AUTOPLAY_MS = 5500

function Bubbles({ label, size = 'size-3.5' }: { label: string; size?: string }) {
  return (
    <span className="flex gap-0.5" role="img" aria-label={label}>
      {Array.from({ length: 5 }).map((_, k) => (
        <span key={k} className={`${size} rounded-full bg-[#34e0a1]`} />
      ))}
    </span>
  )
}

export function Testimonials() {
  const t = useTranslations('Home.reviews')
  const track = useRef<HTMLUListElement>(null)
  const [paused, setPaused] = useState(false)

  const scroll = (dir: 1 | -1) => {
    const el = track.current
    if (!el) return
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8
    if (dir === 1 && atEnd) el.scrollTo({ left: 0, behavior: 'smooth' })
    else el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.85, 460), behavior: 'smooth' })
  }

  // Testimonials advance on their own; hovering, touching or focusing pauses them.
  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => scroll(1), AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [paused])

  const pause = { onMouseEnter: () => setPaused(true), onMouseLeave: () => setPaused(false), onTouchStart: () => setPaused(true), onFocus: () => setPaused(true), onBlur: () => setPaused(false) }

  return (
    <section className="overflow-hidden bg-sand-deep/60 py-24 sm:py-32">
      <div className="container-x mb-12 flex flex-col items-center gap-6 text-center">
        <div className="max-w-2xl">
          <p className="kicker justify-center text-muted">{t('kicker')}</p>
          <h2 className="mt-5 text-balance text-4xl leading-[1.06] sm:text-5xl">{t.rich('title', { em: (c) => <Accent>{c}</Accent> })}</h2>
          <a
            href={tripadvisor.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-full bg-paper px-6 py-3 ring-1 ring-line transition-transform hover:-translate-y-0.5"
          >
            <TripadvisorLogo />
            <span className="h-6 w-px bg-line" aria-hidden />
            <span className="flex items-center gap-2 text-sm">
              <span className="font-semibold">{tripadvisor.rating.toFixed(1)}</span>
              <Bubbles label={t('taStars')} />
              <span className="text-muted">{t('taCount', { count: tripadvisor.reviewCount })}</span>
            </span>
          </a>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => scroll(-1)} aria-label={t('prev')} className="grid size-12 place-items-center rounded-full border border-ink/15 hover:bg-ink hover:text-sand">
            <ArrowLeft className="size-5" />
          </button>
          <button type="button" onClick={() => scroll(1)} aria-label={t('next')} className="grid size-12 place-items-center rounded-full border border-ink/15 hover:bg-ink hover:text-sand">
            <ArrowRight className="size-5" />
          </button>
        </div>
      </div>

      <ul
        ref={track}
        {...pause}
        className="scrollbar-none flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 sm:px-8 lg:px-[max(3rem,calc((100vw-1320px)/2+3rem))]"
      >
        {testimonials.map((r) => (
          <li key={r.name} lang={r.lang} className="flex w-[85vw] shrink-0 snap-start flex-col rounded-[2rem] bg-paper p-7 ring-1 ring-line sm:w-[440px] sm:p-8">
            <Quote className="size-8 text-sun" />
            <blockquote className="mt-5 flex-1 font-serif text-[1.1rem] leading-relaxed text-ink/90 sm:text-[1.15rem]">{r.quote}</blockquote>
            <div className="mt-7 flex items-center justify-between gap-4 border-t border-line pt-5">
              <div>
                <p className="font-semibold">{r.name}</p>
                <p className="text-sm text-muted">
                  {r.country}
                  {r.trip ? ` · ${r.trip}` : ''}
                </p>
              </div>
              <span className="grid size-10 place-items-center rounded-full bg-sun font-serif text-lg font-semibold text-ink">{r.name[0]}</span>
            </div>
          </li>
        ))}
      </ul>

    </section>
  )
}
