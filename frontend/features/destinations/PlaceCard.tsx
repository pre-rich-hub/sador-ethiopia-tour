import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { MapPin } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import type { Place } from '@/lib/content'
import { img } from '@/lib/images'
import { ExploreButton } from '@/components/ui/ExploreButton'

/** Place card for the region pages, styled to match TourCard. */
export function PlaceCard({ place }: { place: Place }) {
  const t = useTranslations('Common')
  const tr = useTranslations('Regions')
  return (
    <Link
      href={`/destinations/${place.region}/${place.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-paper ring-1 ring-line/70 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(29,24,19,0.45)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={img(place.image)}
          alt={place.title}
          fill
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-x-0 top-0 flex items-center p-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-paper/95 px-3 py-1.5 text-xs font-semibold text-ink backdrop-blur">
            <MapPin className="size-3.5 text-sun" />
            {tr(`${place.region}.short`)}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="text-balance font-serif text-[1.45rem] leading-tight text-ink">{place.title}</h3>
        <p className="mt-3 line-clamp-3 text-pretty text-sm leading-relaxed text-muted">{place.summary}</p>
        <div className="mt-auto flex justify-end pt-6">
          <ExploreButton label={t('exploreMore')} className="shrink-0" />
        </div>
      </div>
    </Link>
  )
}
