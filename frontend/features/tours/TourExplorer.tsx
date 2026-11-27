'use client'

import { useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { tourCategories } from '@/lib/content/constants'
import type { TourSummary, TourCategory } from '@/lib/content/types'
import { cn } from '@/lib/cn'
import { TourCard } from './TourCard'

type Length = 'all' | 'day' | 'short' | 'week' | 'long'
const inLength = (t: TourSummary, l: Length) =>
  l === 'all' || (l === 'day' && t.days <= 1) || (l === 'short' && t.days > 1 && t.days <= 5) || (l === 'week' && t.days > 5 && t.days <= 10) || (l === 'long' && t.days > 10)

export function TourExplorer({ tours }: { tours: TourSummary[] }) {
  const t = useTranslations('Tours')
  const tc = useTranslations('Categories')
  const params = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const initial = params.get('style') as TourCategory | null
  const [style, setStyle] = useState<TourCategory | 'all'>(initial && tourCategories.includes(initial) ? initial : 'all')
  const [length, setLength] = useState<Length>('all')

  const list = useMemo(
    () => tours.filter((x) => (style === 'all' || x.category === style) && inLength(x, length)),
    [tours, style, length],
  )

  const pick = (s: TourCategory | 'all') => {
    setStyle(s)
    router.replace(s === 'all' ? pathname : `${pathname}?style=${s}`, { scroll: false })
  }

  const lengths: Length[] = ['all', 'day', 'short', 'week', 'long']

  return (
    <div>
      <div className="sticky top-[72px] z-30 -mx-5 mb-10 border-b border-line bg-sand/95 px-5 py-4 backdrop-blur-xl sm:mx-0 sm:rounded-full sm:border sm:px-3 sm:py-2.5 lg:top-24">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="scrollbar-none -mx-1 flex gap-1.5 overflow-x-auto px-1">
            {(['all', ...tourCategories] as const).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => pick(c)}
                aria-pressed={style === c}
                className={cn(
                  'shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  style === c ? 'bg-ink text-sand' : 'text-ink/75 hover:bg-ink/5',
                )}
              >
                {c === 'all' ? t('allStyles') : tc(`${c}.name`)}
              </button>
            ))}
          </div>
          <label className="flex shrink-0 items-center gap-2 text-sm text-muted">
            <span className="sr-only sm:not-sr-only">{t('length')}</span>
            <select
              value={length}
              onChange={(e) => setLength(e.target.value as Length)}
              className="rounded-full border border-line bg-paper px-4 py-2 text-sm font-medium text-ink"
            >
              {lengths.map((l) => (
                <option key={l} value={l}>
                  {t(`lengths.${l}`)}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <p className="mb-6 text-sm text-muted" aria-live="polite">
        {t('count', { count: list.length })}
      </p>
      {list.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {list.map((x, i) => (
            <TourCard key={x.slug} tour={x} priority={i < 3} />
          ))}
        </div>
      ) : (
        <p className="rounded-3xl bg-paper p-10 text-center text-muted">{t('empty')}</p>
      )}
    </div>
  )
}
