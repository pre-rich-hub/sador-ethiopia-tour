'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { cn } from '@/lib/cn'

interface Props {
  photos: string[]
  index: number
  title: string
  onIndex: (i: number) => void
  onClose: () => void
}

/** Full-screen photo viewer: arrow keys, swipe, Escape to close. */
export function Lightbox({ photos, index, title, onIndex, onClose }: Props) {
  const t = useTranslations('Gallery')
  const touchX = useRef<number | null>(null)
  const go = useCallback((step: number) => onIndex((index + step + photos.length) % photos.length), [index, photos.length, onIndex])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    document.documentElement.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
    }
  }, [go, onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[80] flex flex-col bg-ink/95 text-sand backdrop-blur"
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
        touchX.current = null
      }}
    >
      <header className="flex items-center justify-between px-5 py-4">
        <p className="text-sm text-sand/70">
          <span className="mr-3 font-serif text-base text-sand">{title}</span>
          {index + 1} / {photos.length}
        </p>
        <button type="button" onClick={onClose} aria-label={t('close')} className="grid size-11 place-items-center rounded-full hover:bg-white/10">
          <X className="size-6" />
        </button>
      </header>

      <div className="relative flex-1" onClick={onClose}>
        <Image key={photos[index]} src={photos[index]} alt="" fill sizes="100vw" priority className="object-contain p-2 sm:p-8" onClick={(e) => e.stopPropagation()} />
        {photos.length > 1 && (
          <>
            <NavButton side="left" label={t('prev')} onClick={() => go(-1)} />
            <NavButton side="right" label={t('next')} onClick={() => go(1)} />
          </>
        )}
      </div>

      <div className="scrollbar-none flex gap-2 overflow-x-auto px-5 py-4">
        {photos.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => onIndex(i)}
            aria-label={t('open', { n: i + 1, total: photos.length })}
            className={cn('relative h-14 w-20 shrink-0 overflow-hidden rounded-lg transition-opacity', i === index ? 'ring-2 ring-sand' : 'opacity-50 hover:opacity-100')}
          >
            <Image src={src} alt="" fill sizes="80px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}

function NavButton({ side, label, onClick }: { side: 'left' | 'right'; label: string; onClick: () => void }) {
  const Icon = side === 'left' ? ChevronLeft : ChevronRight
  return (
    <button
      type="button"
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      className={cn('absolute top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 hover:bg-white/20', side === 'left' ? 'left-3' : 'right-3')}
    >
      <Icon className="size-6" />
    </button>
  )
}
