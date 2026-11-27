'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Expand } from 'lucide-react'
import dynamic from 'next/dynamic'

const Lightbox = dynamic(() => import('./Lightbox').then((m) => m.Lightbox))

/** Photo grid that opens a full-screen lightbox. `photos` are /public paths. */
export function Gallery({ photos, title, initial = 8 }: { photos: string[]; title: string; initial?: number }) {
  const t = useTranslations('Gallery')
  const [shown, setShown] = useState(initial)
  const [open, setOpen] = useState<number | null>(null)

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {photos.slice(0, shown).map((src, i) => (
          <li key={src} className={i === 0 ? 'col-span-2 row-span-2' : undefined}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={t('open', { n: i + 1, total: photos.length })}
              className="group relative block aspect-[4/3] h-full w-full overflow-hidden rounded-2xl bg-sand-deep"
            >
              <Image
                src={src}
                alt={`${title} — ${i + 1}`}
                fill
                sizes={i === 0 ? '(max-width:1024px) 100vw, 50vw' : '(max-width:1024px) 50vw, 25vw'}
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <span className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-ink/50 text-sand opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                <Expand className="size-4" />
              </span>
            </button>
          </li>
        ))}
      </ul>
      {shown < photos.length && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setShown(photos.length)}
            className="rounded-full border border-ink/20 px-6 py-3 text-sm font-semibold transition-colors hover:bg-ink hover:text-sand"
          >
            {t('more', { count: photos.length - shown })}
          </button>
        </div>
      )}
      {open !== null && <Lightbox photos={photos} index={open} onIndex={setOpen} onClose={() => setOpen(null)} title={title} />}
    </>
  )
}
