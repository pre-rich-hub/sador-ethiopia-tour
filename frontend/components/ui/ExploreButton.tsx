import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/cn'

/**
 * Pill call-to-action shown inside a card. It is a <span>: the whole card is the link,
 * and the pill reacts to the card's `group` hover.
 */
export function ExploreButton({ label, tone = 'light', className }: { label: string; tone?: 'light' | 'glass'; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-3 rounded-full border py-1.5 pl-5 pr-1.5 text-sm font-semibold transition-all duration-300',
        tone === 'light'
          ? 'border-ink/15 bg-paper text-ink shadow-[0_8px_20px_-14px_rgba(29,24,19,0.5)] group-hover:border-ink group-hover:bg-ink group-hover:text-sand'
          : 'border-sand/25 bg-sand/10 text-sand backdrop-blur-md group-hover:border-sand group-hover:bg-sand group-hover:text-ink',
        className,
      )}
    >
      {label}
      <span
        className={cn(
          'grid size-8 place-items-center rounded-full transition-all duration-300 group-hover:bg-sun group-hover:text-ink',
          tone === 'light' ? 'bg-ink text-sand' : 'bg-sand text-ink',
        )}
      >
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:-rotate-45" />
      </span>
    </span>
  )
}
