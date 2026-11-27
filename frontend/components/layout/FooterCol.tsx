'use client'

import { useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/cn'

/**
 * A footer link group: a collapsible section on mobile, an always-open column on large screens.
 * The links are always in the HTML (only hidden on mobile until opened), so crawlers still see them.
 */
export function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const id = useId()
  return (
    <div className="border-b border-sand/10 lg:border-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={id}
        className="kicker flex w-full items-center justify-between py-5 text-sand/70 lg:pointer-events-none lg:mb-5 lg:py-0"
      >
        {title}
        <ChevronDown className={cn('size-4 transition-transform duration-300 lg:hidden', open && 'rotate-180')} />
      </button>
      <ul id={id} className={cn('space-y-2.5 pb-6 lg:block lg:pb-0', open ? 'block' : 'hidden')}>
        {children}
      </ul>
    </div>
  )
}
