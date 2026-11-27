import { cn } from '@/lib/cn'

/** Decorative half-sun taken from the Sador logo, used to anchor sections. */
export function SunArc({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 200" aria-hidden className={cn('pointer-events-none', className)}>
      <defs>
        <linearGradient id="sun-arc" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e4612a" />
          <stop offset="0.5" stopColor="#ef8a2f" />
          <stop offset="1" stopColor="#f5bf45" />
        </linearGradient>
      </defs>
      <path d="M0 200a200 200 0 0 1 400 0Z" fill="url(#sun-arc)" />
      {[58, 92, 128].map((y, i) => (
        <rect key={y} x={i % 2 ? 40 : 120} y={y} width={i % 2 ? 230 : 210} height="7" rx="3.5" fill="#f7f1e7" opacity="0.85" />
      ))}
    </svg>
  )
}
