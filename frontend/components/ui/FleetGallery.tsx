'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/cn'

/** Main vehicle photo with clickable thumbnails when there is more than one shot. */
export function FleetGallery({ photos, alt, studio, children }: { photos: readonly string[]; alt: string; studio: boolean; children?: React.ReactNode }) {
  const [active, setActive] = useState(0)
  const src = (p: string) => `/images/fleet/${p}.jpg`
  return (
    <div className={cn(studio && 'bg-white')}>
      <div className="relative aspect-[16/9]">
        <Image src={src(photos[active])} alt={alt} fill sizes="(max-width:768px) 100vw, 50vw" className={studio ? 'object-contain' : 'object-cover'} />
        {children}
      </div>
      {photos.length > 1 && (
        <div className="flex gap-2 overflow-x-auto px-4 pb-4 scrollbar-none">
          {photos.map((p, i) => (
            <button
              key={p}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`${alt} ${i + 1}`}
              aria-pressed={i === active}
              className={cn('relative aspect-[16/9] w-20 shrink-0 overflow-hidden rounded-lg bg-white ring-1 transition', i === active ? 'ring-2 ring-ink' : 'ring-line opacity-70 hover:opacity-100')}
            >
              <Image src={src(p)} alt="" fill sizes="80px" className="object-contain" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
