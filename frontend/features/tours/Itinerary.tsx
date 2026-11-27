'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { BedDouble, ChevronDown } from 'lucide-react'
import type { ItineraryStep } from '@/lib/content/types'
import { cn } from '@/lib/cn'

export function Itinerary({ steps }: { steps: ItineraryStep[] }) {
  const t = useTranslations('Tours')
  const daily = steps.some((s) => s.day !== null)
  const [open, setOpen] = useState<Set<number>>(() => new Set([0]))
  const allOpen = open.size === steps.length

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })

  return (
    <div>
      <div className="mb-6 flex justify-end">
        <button
          type="button"
          onClick={() => setOpen(allOpen ? new Set() : new Set(steps.map((_, i) => i)))}
          className="text-sm font-semibold text-muted hover:underline"
        >
          {allOpen ? t('collapseAll') : t('expandAll')}
        </button>
      </div>
      <ol className="relative">
        <span aria-hidden className="absolute bottom-6 left-[1.6rem] top-6 w-px bg-gradient-to-b from-sun via-amber to-line" />
        {steps.map((s, i) => {
          const isOpen = open.has(i)
          return (
            <li key={i} className="relative pb-4 pl-[4.5rem] last:pb-0">
              <span
                aria-hidden
                className={cn(
                  'absolute left-0 top-2 grid size-[3.2rem] place-items-center rounded-full font-serif text-lg font-semibold transition-colors',
                  isOpen ? 'bg-sun text-ink' : 'bg-paper text-ink ring-1 ring-line',
                )}
              >
                {daily ? s.day : i + 1}
              </span>
              <div className={cn('rounded-3xl transition-colors', isOpen ? 'bg-paper ring-1 ring-line/80' : 'hover:bg-paper/60')}>
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                      {daily ? t('day', { n: s.day ?? i + 1 }) : t('stop', { n: i + 1 })}
                    </span>
                    <span className="mt-1 block font-serif text-xl leading-snug text-ink sm:text-2xl">{s.title}</span>
                  </span>
                  <ChevronDown className={cn('size-5 shrink-0 text-muted transition-transform', isOpen && 'rotate-180')} />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6">
                    <div className="prose-sador max-w-3xl text-[0.97rem]">
                      {s.paragraphs.map((p, j) => (
                        <p key={j}>{p}</p>
                      ))}
                    </div>
                    {s.overnight && (
                      <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-sand px-4 py-2 text-sm text-ink/80">
                        <BedDouble className="size-4 text-sun" />
                        {s.overnight}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
