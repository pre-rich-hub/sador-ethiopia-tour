'use client'

import { useTranslations } from 'next-intl'
import { Quote } from 'lucide-react'
import { testimonials } from '@/content/testimonials'
import { tripadvisor } from '@/content/tripadvisor'
import { TripadvisorLogo } from '@/components/ui/SocialIcons'
import { Accent } from '@/components/ui/SectionHeader'

// Drift speed of the review strip, in pixels per second.
const SPEED_PX_S = 40
const CARD_PX = 460 // card width (440) + spacing (20)

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
      </div>

      {/* Reviews drift by on their own; the list is rendered twice so the loop is seamless.
          Hovering, touching or focusing pauses it; reduced-motion users get a scrollable row. */}
      <div className="marquee scrollbar-none motion-reduce:overflow-x-auto">
        <ul
          className="flex w-max animate-marquee"
          style={{ animationDuration: `${(testimonials.length * CARD_PX) / SPEED_PX_S}s` }}
        >
          {[0, 1].flatMap((copy) =>
            testimonials.map((r) => (
            <li key={`${copy}-${r.name}`} lang={r.lang} aria-hidden={copy === 1 || undefined} className={`mr-5 flex w-[85vw] shrink-0 flex-col rounded-[2rem] bg-paper p-7 ring-1 ring-line sm:w-[440px] sm:p-8 ${copy === 1 ? 'motion-reduce:hidden' : ''}`}>
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
            )),
          )}
        </ul>
      </div>

    </section>
  )
}
