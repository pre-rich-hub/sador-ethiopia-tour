'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * A horizontally scrollable row that advances one card at a time on its own.
 * Only moves while the row actually overflows (i.e. the mobile carousel layout),
 * pauses while the user is touching/hovering it, and respects reduced motion.
 */
export function AutoScrollRow({ children, className, interval = 3200 }: { children: ReactNode; className?: string; interval?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const pausedUntil = useRef(0)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const pause = () => {
      pausedUntil.current = Date.now() + 6000
    }
    el.addEventListener('pointerdown', pause, { passive: true })
    el.addEventListener('touchstart', pause, { passive: true })
    el.addEventListener('wheel', pause, { passive: true })
    el.addEventListener('pointerenter', pause)

    const id = setInterval(() => {
      if (Date.now() < pausedUntil.current || document.hidden) return
      if (el.scrollWidth <= el.clientWidth + 1) return
      const cards = Array.from(el.children) as HTMLElement[]
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8
      // The row is `relative`, so offsetLeft is measured from its own padding edge.
      const padStart = parseFloat(getComputedStyle(el).paddingLeft) || 0
      const next = cards.find((c) => c.offsetLeft - padStart > el.scrollLeft + 8)
      el.scrollTo({ left: atEnd || !next ? 0 : next.offsetLeft - padStart, behavior: 'smooth' })
    }, interval)

    return () => {
      clearInterval(id)
      el.removeEventListener('pointerdown', pause)
      el.removeEventListener('touchstart', pause)
      el.removeEventListener('wheel', pause)
      el.removeEventListener('pointerenter', pause)
    }
  }, [interval])

  return (
    <div ref={ref} className={cn('relative', className)}>
      {children}
    </div>
  )
}
