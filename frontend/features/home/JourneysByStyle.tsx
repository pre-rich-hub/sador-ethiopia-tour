'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import type { TourSummary, TourCategory } from '@/lib/content/types'
import { TourCard } from '@/features/tours/TourCard'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { cn } from '@/lib/cn'

const tabs: TourCategory[] = ['historic-north', 'cultural-south', 'combination', 'city', 'short', 'eastern']

export function JourneysByStyle({ tours }: { tours: TourSummary[] }) {
  const t = useTranslations('Home.styles')
  const tc = useTranslations('Categories')
  const [active, setActive] = useState<TourCategory>('historic-north')
  const list = tours.filter((x) => x.category === active || (active === 'eastern' && x.category === 'desert')).slice(0, 3)

  return (
    <div>
      <div role="tablist" aria-label={t('tablist')} className="scrollbar-none -mx-5 mb-10 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
        {tabs.map((c) => (
          <button
            key={c}
            role="tab"
            type="button"
            aria-selected={active === c}
            onClick={() => setActive(c)}
            className={cn(
              'shrink-0 rounded-full border px-5 py-2.5 text-sm font-medium transition-all',
              active === c ? 'border-ink bg-ink text-sand' : 'border-line bg-paper text-ink/80 hover:border-ink/40',
            )}
          >
            {tc(`${c}.name`)}
          </button>
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {list.map((tour) => (
          <TourCard key={tour.slug} tour={tour} />
        ))}
      </div>
      <div className="mt-12 flex justify-center">
        <ButtonLink href={`/tours?style=${active}`} variant="ink">
          {t('seeAll', { style: tc(`${active}.name`) })}
        </ButtonLink>
      </div>
    </div>
  )
}
