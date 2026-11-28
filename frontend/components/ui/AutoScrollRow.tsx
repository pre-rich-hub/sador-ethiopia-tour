'use client'

import { Children, useEffect, useRef, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * A horizontally scrollable row that advances one card at a time on its own and
 * loops endlessly in both directions. The cards are rendered three times
 * (copy · originals · copy); whenever scrolling settles inside one of the copies
 * the row jumps by exactly one set width, which lands on the identical card, so
 * the jump is invisible. The copies are only shown while the row is a carousel
 * (hidden from `cloneHiddenClass` up), are aria-hidden and inert.
 * Auto-advance pauses while the user is touching/hovering and respects reduced motion.
 */
export function AutoScrollRow({
  children,
  className,
  interval = 3200,
  cloneHiddenClass = 'sm:hidden',
}: {
  children: ReactNode
  className?: string
  interval?: number
  cloneHiddenClass?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const pausedUntil = useRef(0)
  const items = Children.toArray(children)
  const count = items.length

  useEffect(() => {
    const el = ref.current
    if (!el || count === 0) return

    const overflowing = () => el.scrollWidth > el.clientWidth + 1
    const cards = () => Array.from(el.querySelectorAll<HTMLElement>(':scope > * > *'))
    // The row is `relative`, so offsetLeft is measured from its own padding edge.
    const padStart = () => parseFloat(getComputedStyle(el).paddingLeft) || 0
    /** Scroll position of the first original card and the width of one full set. */
    const metrics = () => {
      const all = cards()
      const first = all[count]
      const firstClone = all[0]
      if (!first || !firstClone) return null
      return { start: first.offsetLeft - padStart(), set: first.offsetLeft - firstClone.offsetLeft }
    }

    const jump = (left: number) => {
      // Instant jump: temporarily disable smooth behaviour and snapping.
      el.style.scrollBehavior = 'auto'
      el.style.scrollSnapType = 'none'
      el.scrollLeft = left
      requestAnimationFrame(() => {
        el.style.scrollBehavior = ''
        el.style.scrollSnapType = ''
      })
    }

    const normalize = () => {
      if (!overflowing()) return
      const m = metrics()
      if (!m || m.set <= 0) return
      if (el.scrollLeft < m.start - m.set / 2) jump(el.scrollLeft + m.set)
      else if (el.scrollLeft >= m.start + m.set - 4) jump(el.scrollLeft - m.set)
    }

    // Start on the originals so the user can swipe either way.
    const place = () => {
      if (!overflowing()) return
      const m = metrics()
      if (m) jump(m.start)
    }
    place()

    let settle: ReturnType<typeof setTimeout> | undefined
    const onScroll = () => {
      clearTimeout(settle)
      settle = setTimeout(normalize, 140)
    }
    el.addEventListener('scroll', onScroll, { passive: true })

    let wasOverflowing = overflowing()
    const onResize = () => {
      const now = overflowing()
      if (now && !wasOverflowing) place()
      wasOverflowing = now
    }
    window.addEventListener('resize', onResize)

    const pause = () => {
      pausedUntil.current = Date.now() + 6000
    }
    el.addEventListener('pointerdown', pause, { passive: true })
    el.addEventListener('touchstart', pause, { passive: true })
    el.addEventListener('wheel', pause, { passive: true })
    el.addEventListener('pointerenter', pause)

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const id = reduced
      ? undefined
      : setInterval(() => {
          if (Date.now() < pausedUntil.current || document.hidden || !overflowing()) return
          const pad = padStart()
          const next = cards().find((c) => c.offsetLeft - pad > el.scrollLeft + 8)
          if (next) el.scrollTo({ left: next.offsetLeft - pad, behavior: 'smooth' })
        }, interval)

    return () => {
      clearInterval(id)
      clearTimeout(settle)
      el.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      el.removeEventListener('pointerdown', pause)
      el.removeEventListener('touchstart', pause)
      el.removeEventListener('wheel', pause)
      el.removeEventListener('pointerenter', pause)
    }
  }, [interval, count])

  const copy = (key: string) => (
    <div key={key} className={cn('contents', cloneHiddenClass)} aria-hidden inert>
      {items}
    </div>
  )

  return (
    <div ref={ref} className={cn('relative', className)}>
      {copy('before')}
      <div className="contents">{items}</div>
      {copy('after')}
    </div>
  )
}
