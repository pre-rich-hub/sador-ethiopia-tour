import type { ReactNode } from 'react'
import { Reveal } from './Reveal'
import { cn } from '@/lib/cn'

export function SectionHeader({
  kicker,
  title,
  lede,
  action,
  align = 'left',
  tone = 'light',
  className,
}: {
  kicker: string
  title: ReactNode
  lede?: ReactNode
  action?: ReactNode
  align?: 'left' | 'center'
  tone?: 'light' | 'dark'
  className?: string
}) {
  const dark = tone === 'dark'
  return (
    <Reveal
      className={cn(
        'mb-10 sm:mb-14',
        action && align !== 'center' ? 'flex flex-col gap-6 md:flex-row md:items-end md:justify-between' : '',
        align === 'center' && 'mx-auto flex max-w-3xl flex-col items-center text-center',
        className,
      )}
    >
      <div className={cn('max-w-3xl', align === 'center' && 'mx-auto')}>
        <p className={cn('kicker mb-4', dark ? 'text-sand/70' : 'text-muted', align === 'center' && 'justify-center')}>
          {kicker}
        </p>
        <h2
          className={cn(
            'text-balance text-[2.1rem] leading-[1.08] sm:text-5xl lg:text-[3.4rem]',
            dark ? 'text-sand' : 'text-ink',
          )}
        >
          {title}
        </h2>
        {lede && (
          <p className={cn('mt-5 max-w-2xl text-pretty text-base leading-relaxed sm:text-lg', dark ? 'text-sand/70' : 'text-muted', align === 'center' && 'mx-auto')}>
            {lede}
          </p>
        )}
      </div>
      {action && <div className={cn('shrink-0', align === 'center' && 'mt-8')}>{action}</div>}
    </Reveal>
  )
}

/** Wraps *words* in a title with the sunset gradient. */
export function Accent({ children }: { children: ReactNode }) {
  return <em className="italic">{children}</em>
}
