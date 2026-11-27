import type { ComponentProps, ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/cn'

type Variant = 'sun' | 'ink' | 'outline' | 'glass'

const styles: Record<Variant, string> = {
  sun: 'bg-sun text-ink shadow-[0_10px_30px_-12px_rgba(232,112,42,0.8)] hover:shadow-[0_14px_34px_-10px_rgba(232,112,42,0.9)]',
  ink: 'bg-ink text-sand hover:bg-ink-soft',
  outline: 'border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-sand',
  glass: 'border border-white/35 bg-white/10 text-white backdrop-blur-md hover:bg-white/20',
}

export const buttonClass = (variant: Variant = 'sun', className?: string) =>
  cn(
    'group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5',
    styles[variant],
    className,
  )

export function ButtonLink({
  href,
  children,
  variant = 'sun',
  className,
  arrow = true,
  ...rest
}: {
  href: ComponentProps<typeof Link>['href']
  children: ReactNode
  variant?: Variant
  className?: string
  arrow?: boolean
} & Omit<ComponentProps<typeof Link>, 'href' | 'className' | 'children'>) {
  return (
    <Link href={href} className={buttonClass(variant, className)} {...rest}>
      {children}
      {arrow && (
        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      )}
    </Link>
  )
}
