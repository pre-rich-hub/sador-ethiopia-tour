import Image from 'next/image'
import type { ReactNode } from 'react'
import { ChevronRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { img } from '@/lib/images'

export interface Crumb {
  label: string
  href?: string
}

export function PageHero({
  image,
  kicker,
  title,
  lede,
  crumbs,
  children,
  size = 'md',
}: {
  image: string
  kicker?: string
  title: ReactNode
  lede?: ReactNode
  crumbs?: Crumb[]
  children?: ReactNode
  size?: 'md' | 'lg'
}) {
  return (
    <section
      className={`relative isolate flex items-end overflow-hidden bg-ink text-sand ${size === 'lg' ? 'min-h-[88svh]' : 'min-h-[68svh] sm:min-h-[72svh]'}`}
    >
      <Image
        src={img(image)}
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 animate-ken-burns object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/45 to-ink/30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/60 via-transparent to-transparent" />
      <div className="container-x relative pb-14 pt-36 sm:pb-20">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-6 animate-rise">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-sand/70">
              {crumbs.map((c, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight className="size-3 opacity-60" />}
                  {c.href ? (
                    <Link href={c.href} className="transition-colors hover:text-sand">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-sand">
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        {kicker && <p className="kicker mb-5 animate-rise text-sand/70 [animation-delay:80ms]">{kicker}</p>}
        <h1 className="max-w-4xl animate-rise text-balance text-[2.6rem] leading-[1.02] [animation-delay:140ms] sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        {lede && (
          <p className="mt-6 max-w-2xl animate-rise text-pretty text-base leading-relaxed text-sand/80 [animation-delay:220ms] sm:text-lg">
            {lede}
          </p>
        )}
        {children && <div className="mt-8 animate-rise [animation-delay:300ms]">{children}</div>}
      </div>
    </section>
  )
}
