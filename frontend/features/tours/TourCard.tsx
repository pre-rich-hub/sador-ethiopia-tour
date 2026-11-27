import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Clock } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { formatUsd } from '@/lib/content/constants'
import type { TourSummary } from '@/lib/content/types'
import { img } from '@/lib/images'
import { cn } from '@/lib/cn'
import { ExploreButton } from '@/components/ui/ExploreButton'

export function TourCard({ tour, className, priority }: { tour: TourSummary; className?: string; priority?: boolean }) {
  const t = useTranslations('Tours')
  const tc = useTranslations('Categories')
  const tcommon = useTranslations('Common')
  return (
    <Link
      href={`/tours/${tour.slug}`}
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-paper ring-1 ring-line/70 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(29,24,19,0.45)]',
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={img(tour.image)}
          alt={tour.title}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-paper/95 px-3 py-1.5 text-xs font-semibold text-ink backdrop-blur">
            <Clock className="size-3.5 text-sun" />
            {tour.duration}
          </span>
          {tour.departure && (
            <span className="rounded-full bg-ink/80 px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-wider text-sand/70 backdrop-blur">
              {t('fixedDeparture')}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">{tc(`${tour.category}.name`)}</p>
        <h3 className="mt-2.5 text-balance font-serif text-[1.45rem] leading-tight text-ink">{tour.title}</h3>
        <p className="mt-3 line-clamp-3 text-pretty text-sm leading-relaxed text-muted">{tour.teaser}</p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-3 pt-6">
          {tour.price ? (
            <p className="text-sm text-muted">
              {t('from')}{' '}
              <span className="font-serif text-2xl font-semibold text-ink">{formatUsd(tour.price.fromUsd)}</span>
            </p>
          ) : (
            <p className="text-sm font-medium text-muted">{t('onRequest')}</p>
          )}
          <ExploreButton label={tcommon('exploreMore')} className="shrink-0" />
        </div>
      </div>
    </Link>
  )
}
