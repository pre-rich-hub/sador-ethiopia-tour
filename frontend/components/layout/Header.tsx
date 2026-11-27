'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { ChevronDown, Globe, Menu, X, Phone } from 'lucide-react'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import { localeNames, locales, type AppLocale } from '@/i18n/routing'
import { img } from '@/lib/images'
import { site } from '@/content/site'
import { cn } from '@/lib/cn'
import { navAbout, navActivities, navDestinations, navItineraries } from './nav-data'

type Menu = 'destinations' | 'itineraries' | 'activities' | 'about' | null

export function Header() {
  const t = useTranslations('Nav')
  const tr = useTranslations('Regions')
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState<Menu>(null)
  const [mobile, setMobile] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    // iOS Safari only shows :active (pressed) styles when a touch listener exists.
    const noop = () => {}
    document.addEventListener('touchstart', noop, { passive: true })
    return () => document.removeEventListener('touchstart', noop)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(null)
    setMobile(false)
  }, [pathname])

  useEffect(() => {
    document.documentElement.style.overflow = mobile ? 'hidden' : ''
  }, [mobile])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(null)
        setMobile(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const solid = scrolled || open !== null
  const enter = (m: Menu) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpen(m)
  }
  const leave = () => {
    closeTimer.current = setTimeout(() => setOpen(null), 140)
  }

  // Hovering a label opens its menu; clicking it goes to that section's page.
  const items: { key: Exclude<Menu, null>; label: string; href: string }[] = [
    { key: 'destinations', label: t('destinations'), href: '/destinations' },
    { key: 'itineraries', label: t('tours'), href: '/tours' },
    { key: 'activities', label: t('experiences'), href: '/activities' },
    { key: 'about', label: t('about'), href: '/about' },
  ]

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-300',
        solid ? 'bg-sand/95 text-ink shadow-[0_1px_0_rgba(29,24,19,0.08)] backdrop-blur-xl' : 'bg-transparent text-sand',
      )}
      onMouseLeave={leave}
    >
      <div className="container-x flex h-[72px] items-center justify-between gap-6 lg:h-20">
        <Link href="/" className="flex items-center gap-2" aria-label={site.name}>
          <Image src="/brand/sador-emblem.png" alt="" width={47} height={42} priority className="h-11 w-auto lg:h-12" />
          {/* Script wordmark: dark on the solid bar, light over the hero photo. */}
          <Image
            src={solid ? '/brand/sador-wordmark.png' : '/brand/sador-wordmark-white.png'}
            alt=""
            width={613}
            height={200}
            priority
            className="h-9 w-auto lg:h-10"
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label={t('main')}>
          {items.map((it) => (
            <Link
              key={it.key}
              href={it.href}
              onMouseEnter={() => enter(it.key)}
              onFocus={() => enter(it.key)}
              onClick={() => setOpen(null)}
              aria-expanded={open === it.key}
              className={cn(
                'flex items-center gap-1 rounded-full px-4 py-2 text-[0.9rem] font-medium transition-colors',
                open === it.key ? 'bg-ink/5' : 'hover:bg-current/5',
              )}
            >
              {it.label}
              <ChevronDown className={cn('size-3.5 transition-transform', open === it.key && 'rotate-180')} />
            </Link>
          ))}
          <Link href="/blog" className="rounded-full px-4 py-2 text-[0.9rem] font-medium" onMouseEnter={() => enter(null)}>
            {t('blog')}
          </Link>
          <Link href="/car-rental" className="rounded-full px-4 py-2 text-[0.9rem] font-medium" onMouseEnter={() => enter(null)}>
            {t('carRental')}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher solid={solid} />
          <Link
            href="/contact"
            className="hidden rounded-full bg-sun px-5 py-2.5 text-sm font-semibold text-ink shadow-[0_8px_24px_-12px_rgba(232,112,42,0.9)] transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            {t('plan')}
          </Link>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full lg:hidden"
            onClick={() => setMobile(true)}
            aria-label={t('openMenu')}
          >
            <Menu className="size-6" />
          </button>
        </div>
      </div>

      {/* Desktop mega menus */}
      <div
        className={cn(
          'absolute inset-x-0 top-full hidden origin-top border-t border-line bg-sand text-ink shadow-[0_30px_60px_-30px_rgba(29,24,19,0.35)] transition-all duration-300 lg:block',
          open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0',
        )}
        onMouseEnter={() => closeTimer.current && clearTimeout(closeTimer.current)}
      >
        <div className="container-x py-10">
          {open === 'destinations' && (
            <div className="grid grid-cols-[1fr_3fr] gap-10">
              <MenuIntro title={t('destinations')} body={t('destinationsBlurb')} href="/destinations" cta={t('allDestinations')} />
              <div className="grid grid-cols-4 gap-4">
                {navDestinations.map((d) => (
                  <Link key={d.key} href={d.href} className="group">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                      <Image src={img(d.image)} alt="" fill sizes="240px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <p className="mt-2.5 font-serif text-lg leading-tight group-hover:text-ink/70">{tr(`${d.key}.name`)}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
          {open === 'itineraries' && (
            <div className="grid grid-cols-[1fr_3fr] gap-10">
              <MenuIntro title={t('tours')} body={t('toursBlurb')} href="/tours" cta={t('allTours')} />
              <div className="grid grid-cols-4 gap-4">
                {navItineraries.map((i) => (
                  <Link key={i.key} href={i.href} className="group">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                      <Image src={img(i.image)} alt="" fill sizes="240px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                      <p className="absolute inset-x-4 bottom-3.5 font-serif text-lg leading-tight text-sand">{t(`itin.${i.key}`)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          {open === 'activities' && (
            <div className="grid grid-cols-[1fr_3fr] gap-10">
              <MenuIntro title={t('experiences')} body={t('experiencesBlurb')} href="/activities" cta={t('allExperiences')} />
              <div className="grid grid-cols-5 gap-4">
                {navActivities.map((a) => (
                  <Link key={a.key} href={a.href} className="group">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                      <Image src={img(a.image)} alt="" fill sizes="200px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
                      <p className="absolute inset-x-4 bottom-4 font-serif text-lg leading-tight text-sand">{t(`act.${a.key}`)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          {open === 'about' && (
            <div className="grid grid-cols-[1fr_3fr] gap-10">
              <MenuIntro title={t('about')} body={t('aboutBlurb')} href="/about" cta={t('ourStory')} />
              <div className="grid grid-cols-[1.2fr_1fr] gap-8">
                <ul>
                  {navAbout.map((a) => (
                    <li key={a.key}>
                      <Link href={a.href} className="block border-b border-line py-4 font-serif text-2xl hover:text-ink/70">
                        {t(`aboutLinks.${a.key}`)}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="rounded-3xl bg-ink p-7 text-sand">
                  <p className="kicker text-sand/70">{t('talkToUs')}</p>
                  <p className="mt-4 font-serif text-2xl leading-snug">{t('talkBody')}</p>
                  <div className="mt-6 space-y-2 text-sm">
                    {site.phones.map((p) => (
                      <a key={p.href} href={p.href} className="flex items-center gap-2 text-sand/85 hover:text-sand">
                        <Phone className="size-4" /> {p.display}
                      </a>
                    ))}
                    <a href={`mailto:${site.email}`} className="block text-sand/85 hover:text-sand">
                      {site.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <MobileMenu open={mobile} onClose={() => setMobile(false)} />
    </header>
  )
}

function MenuIntro({ title, body, href, cta }: { title: string; body: string; href: string; cta: string }) {
  return (
    <div className="pr-6">
      <p className="font-serif text-3xl">{title}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted">{body}</p>
      <Link href={href} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-muted hover:underline">
        {cta} →
      </Link>
    </div>
  )
}

function LanguageSwitcher({ solid }: { solid: boolean }) {
  const locale = useLocale() as AppLocale
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const t = useTranslations('Nav')
  const ref = useRef<HTMLDivElement>(null)
  const hovering = useRef(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onDoc = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', onDoc)
    return () => document.removeEventListener('pointerdown', onDoc)
  }, [])

  // Mouse users get the menu on hover; touch users tap to toggle it.
  const onEnter = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    if (closeTimer.current) clearTimeout(closeTimer.current)
    hovering.current = true
    setOpen(true)
  }
  const onLeave = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    hovering.current = false
    closeTimer.current = setTimeout(() => setOpen(false), 160)
  }

  return (
    <div ref={ref} className="relative" onPointerEnter={onEnter} onPointerLeave={onLeave}>
      <button
        type="button"
        onClick={() => setOpen((o) => (hovering.current ? true : !o))}
        aria-label={t('language')}
        aria-expanded={open}
        className={cn('flex h-10 items-center gap-1.5 rounded-full px-3 text-sm font-semibold uppercase', solid ? 'hover:bg-ink/5' : 'hover:bg-white/10')}
      >
        <Globe className="size-4" />
        {locale}
      </button>
      {open && (
        <div className="absolute right-0 top-full z-10 pt-2">
        <ul className="w-44 overflow-hidden rounded-2xl border border-line bg-paper py-1.5 text-ink shadow-xl">
          {locales.map((l) => (
            <li key={l}>
              <button
                type="button"
                lang={l}
                onClick={() => {
                  setOpen(false)
                  router.replace(pathname, { locale: l })
                }}
                className={cn('flex w-full items-center justify-between px-4 py-2.5 text-left text-sm hover:bg-sand', l === locale && 'font-semibold text-muted')}
              >
                {localeNames[l]}
                <span className="text-xs uppercase text-muted">{l}</span>
              </button>
            </li>
          ))}
        </ul>
        </div>
      )}
    </div>
  )
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useTranslations('Nav')
  const tr = useTranslations('Regions')
  const [section, setSection] = useState<string | null>('destinations')

  const groups = [
    { key: 'destinations', label: t('destinations'), links: [{ href: '/destinations', label: t('allDestinations') }, ...navDestinations.map((d) => ({ href: d.href, label: tr(`${d.key}.name`) }))] },
    { key: 'itineraries', label: t('tours'), links: [{ href: '/tours', label: t('allTours') }, ...navItineraries.map((i) => ({ href: i.href, label: t(`itin.${i.key}`) }))] },
    { key: 'activities', label: t('experiences'), links: [{ href: '/activities', label: t('allExperiences') }, ...navActivities.map((a) => ({ href: a.href, label: t(`act.${a.key}`) }))] },
    { key: 'about', label: t('about'), links: navAbout.map((a) => ({ href: a.href, label: t(`aboutLinks.${a.key}`) })) },
  ]

  return (
    <div
      className={cn('fixed inset-0 z-[60] bg-ink/40 backdrop-blur-sm transition-opacity lg:hidden', open ? 'opacity-100' : 'pointer-events-none opacity-0')}
      onClick={onClose}
      aria-hidden={!open}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t('menu')}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          'absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-sand text-ink shadow-2xl transition-transform duration-300',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex h-[72px] items-center justify-between px-5">
          <span className="font-serif text-xl font-semibold tracking-[0.08em]">SADOR</span>
          <button type="button" onClick={onClose} className="grid size-11 place-items-center rounded-full hover:bg-ink/5" aria-label={t('closeMenu')}>
            <X className="size-6" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 pb-8">
          {groups.map((g) => (
            <div key={g.key} className="border-b border-line">
              <button
                type="button"
                className="flex w-full items-center justify-between py-4 font-serif text-2xl"
                onClick={() => setSection(section === g.key ? null : g.key)}
                aria-expanded={section === g.key}
              >
                {g.label}
                <ChevronDown className={cn('size-5 transition-transform', section === g.key && 'rotate-180')} />
              </button>
              {section === g.key && (
                <ul className="pb-4">
                  {g.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="block py-2 text-[0.95rem] text-ink/80 hover:text-ink/70">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <Link href="/blog" className="block border-b border-line py-4 font-serif text-2xl">
            {t('blog')}
          </Link>
          <Link href="/car-rental" className="block border-b border-line py-4 font-serif text-2xl">
            {t('carRental')}
          </Link>
          <Link href="/contact" className="mt-8 flex w-full items-center justify-center rounded-full bg-sun px-6 py-4 font-semibold">
            {t('plan')}
          </Link>
          <div className="mt-6 space-y-1 text-sm text-muted">
            {site.phones.map((p) => (
              <a key={p.href} href={p.href} className="block">
                {p.display}
              </a>
            ))}
            <a href={`mailto:${site.email}`} className="block">
              {site.email}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
