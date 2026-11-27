import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import type { Place } from '@/lib/content'
import { img } from '@/lib/images'
import { ExploreButton } from '@/components/ui/ExploreButton'

export function PlaceCard({ place }: { place: Place }) {
  const t = useTranslations('Common')
  return (
    <Link href={`/destinations/${place.region}/${place.slug}`} className="group flex h-full flex-col">
      <div className="relative aspect-[5/4] overflow-hidden rounded-[1.75rem]">
        <Image src={img(place.image)} alt={place.title} fill sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105" />
      </div>
      <h3 className="mt-4 font-serif text-2xl leading-tight group-hover:text-ink/70">{place.title}</h3>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{place.summary}</p>
      <div className="mt-auto flex justify-center pt-5">
        <ExploreButton label={t('exploreMore')} />
      </div>
    </Link>
  )
}
