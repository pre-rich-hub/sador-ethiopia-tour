'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { testimonials } from '@/content/testimonials'
import { tripadvisor } from '@/content/tripadvisor'
import { TripadvisorMark } from '@/components/ui/SocialIcons'
import { img } from '@/lib/images'
import { cn } from '@/lib/cn'

const avatarColours = ['bg-[#7e57c2]', 'bg-acacia', 'bg-clay', 'bg-[#2f6f8f]', 'bg-sun-deep']
// Small destination photos placed between the review cards.
const photos = ['lalibela-bete-giorgis', 'addis-skyline-aerial', 'simien-escarpment', 'gondar-fasil-castle', 'danakil-erta-ale', 'harar-alley', 'gheralta-cliffs', 'axum-stelae-field']

function Stars({ label, className }: { label: string; className?: string }) {
  const [w, h, , , d] = faStar.icon
  return (
    <span className="flex gap-1.5" role="img" aria-label={label}>
      {Array.from({ length: 5 }).map((_, k) => (
        <svg key={k} viewBox={`0 0 ${w} ${h}`} aria-hidden className={cn('fill-[#fbbc05]', className)}>
          <path d={d as string} />
        </svg>
      ))}
    </span>
  )
}

function ReviewCard({ index }: { index: number }) {
  const t = useTranslations('Home.reviews')
  const [open, setOpen] = useState(false)
  const r = testimonials[index]
  return (
    <article lang={r.lang} className="flex h-full flex-col">
      <header className="flex items-center gap-3.5">
        <span
          className={cn(
            'grid size-14 shrink-0 place-items-center rounded-full text-2xl font-medium text-white',
            avatarColours[index % avatarColours.length],
          )}
        >
          {r.name[0]}
        </span>
        <div className="min-w-0">
          <p className="truncate text-lg font-semibold">{r.name}</p>
          <p className="truncate text-[0.95rem] text-muted">
            {r.country}
            {r.trip ? ` · ${r.trip}` : ''}
          </p>
        </div>
      </header>
      <blockquote className={cn('mt-5 text-[1.1rem] leading-[1.6] text-ink/90', !open && 'line-clamp-4')}>{r.quote}</blockquote>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="mt-auto w-fit pt-6 text-[0.95rem] font-medium text-muted underline-offset-4 hover:text-ink hover:underline"
      >
        {open ? t('readLess') : t('readMore')}
      </button>
    </article>
  )
}

export function Testimonials() {
  const t = useTranslations('Home.reviews')
  const track = useRef<HTMLUListElement>(null)
  const scroll = (dir: 1 | -1) => {
    const el = track.current
    if (!el) return
    const slide = el.querySelector('li')
    el.scrollBy({ left: dir * (slide ? slide.getBoundingClientRect().width + 32 : el.clientWidth * 0.8), behavior: 'smooth' })
  }

  return (
    <section className="border-t border-line bg-paper py-20 sm:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-14">
        {/* Overall Tripadvisor score */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">{t('kicker')}</p>
          <p className="mt-5 font-sans text-4xl font-black uppercase tracking-tight sm:text-[2.6rem]">{t('excellent')}</p>
          <Stars label={t('taStars')} className="mt-6 size-12" />
          <p className="mt-7 text-lg">
            {t.rich('basedOn', {
              count: tripadvisor.reviewCount,
              b: (c) => (
                <a href={tripadvisor.url} target="_blank" rel="noopener noreferrer" className="font-bold underline underline-offset-4 hover:text-sun-deep">
                  {c}
                </a>
              ),
            })}
          </p>
          <a
            href={tripadvisor.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Tripadvisor"
            className="mt-7 flex size-24 flex-col items-center justify-center gap-1 rounded-2xl bg-[#34e0a1] text-ink transition-transform hover:-translate-y-0.5"
          >
            <TripadvisorMark className="size-14" />
            <span className="text-sm font-semibold tracking-tight">tripadvisor</span>
          </a>
          <a
            href={tripadvisor.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-7 inline-flex items-center gap-2 font-semibold text-acacia hover:text-ink"
          >
            {t('viewAll')}
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        {/* Review carousel */}
        <div className="relative min-w-0">
          <ul
            ref={track}
            className="scrollbar-none -mx-5 flex snap-x snap-mandatory gap-8 overflow-x-auto scroll-px-5 px-5 pb-2 sm:mx-0 sm:scroll-px-0 sm:px-0"
          >
            {testimonials.map((r, i) => (
              <li key={r.name} className="flex w-[82vw] shrink-0 snap-start gap-8 sm:w-auto">
                {i > 0 && (
                  <div className="relative mt-[7.5rem] hidden size-[7.5rem] shrink-0 overflow-hidden rounded-xl sm:block">
                    <Image src={img(photos[(i - 1) % photos.length])} alt="" fill sizes="120px" className="object-cover" />
                  </div>
                )}
                <div className="w-full sm:w-[17rem] lg:w-[16.5rem] xl:w-[17.5rem]">
                  <ReviewCard index={i} />
                </div>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label={t('prev')}
            className="absolute -left-5 top-[9.5rem] hidden size-11 -translate-y-1/2 place-items-center rounded-full bg-paper text-ink shadow-md ring-1 ring-line hover:bg-sand sm:grid"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label={t('next')}
            className="absolute -right-5 top-[9.5rem] hidden size-11 -translate-y-1/2 place-items-center rounded-full bg-paper text-ink shadow-md ring-1 ring-line hover:bg-sand sm:grid"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
