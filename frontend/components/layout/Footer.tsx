import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Mail, MapPin, Phone } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { site } from '@/content/site'
import { regions } from '@/content/regions'
import { SunArc } from '@/components/ui/SunArc'
import { tourCategories } from '@/lib/content/constants'
import { navAbout } from './nav-data'
import { SocialIcons } from '@/components/ui/SocialIcons'
import { NewsletterForm } from './NewsletterForm'
import { FooterTrust } from './FooterTrust'
import { FooterCol } from './FooterCol'

export function Footer() {
  const t = useTranslations('Footer')
  const tn = useTranslations('Nav')
  const tr = useTranslations('Regions')
  const tc = useTranslations('Categories')
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-ink text-sand">
      <SunArc className="absolute -right-24 top-40 w-[520px] opacity-[0.07]" />
      <div className="relative border-b border-sand/10">
        <div className="container-x grid items-center gap-8 py-12 lg:grid-cols-[auto_1fr_auto] lg:gap-16">
          <SocialIcons />
          <div>
            <p className="font-serif text-3xl">{t('stayTitle')}</p>
            <p className="mt-2 text-sm text-sand/60">{t('stayBody')}</p>
          </div>
          <NewsletterForm />
        </div>
      </div>
      <div className="container-x relative grid gap-10 pb-12 pt-16 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:gap-12">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <Image src="/brand/sador-emblem.png" alt="" width={59} height={52} className="h-14 w-auto" />
            <Image src="/brand/sador-wordmark-white.png" alt="Sador Ethiopia Tours" width={613} height={200} className="h-11 w-auto" />
          </Link>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-sand/65">{t('about')}</p>
          <ul className="mt-7 space-y-3 text-sm text-sand/80">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-sand/70" />
              <span>
                {site.address.line1}
                <br />
                {site.address.city}, {site.address.country}
              </span>
            </li>
            {site.phones.map((p) => (
              <li key={p.href} className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-sand/70" />
                <a href={p.href} className="hover:text-sand">
                  {p.display}
                </a>
              </li>
            ))}
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-sand/70" />
              <a href={`mailto:${site.email}`} className="hover:text-sand">
                {site.email}
              </a>
            </li>
          </ul>
        </div>

        <div className="border-t border-sand/10 lg:contents">
        <FooterCol title={tn('destinations')}>
          {regions.map((r) => (
            <FooterLink key={r.slug} href={`/destinations/${r.slug}`}>
              {tr(`${r.slug}.short`)}
            </FooterLink>
          ))}
        </FooterCol>
        <FooterCol title={tn('tours')}>
          {tourCategories.map((c) => (
            <FooterLink key={c} href={`/tours?style=${c}`}>
              {tc(`${c}.name`)}
            </FooterLink>
          ))}
        </FooterCol>
        <FooterCol title={tn('about')}>
          {navAbout.map((a) => (
            <FooterLink key={a.key} href={a.href}>
              {tn(`aboutLinks.${a.key}`)}
            </FooterLink>
          ))}
          <FooterLink href="/activities">{tn('exp.activities')}</FooterLink>
          <FooterLink href="/unesco-world-heritage-sites">{tn('exp.unesco')}</FooterLink>
          <FooterLink href="/family-meeting-trip">{tn('exp.family')}</FooterLink>
          <FooterLink href="/terms">{t('terms')}</FooterLink>
        </FooterCol>
        </div>
      </div>

      <div className="container-x relative">
        <FooterTrust />
        <div className="flex flex-col gap-2 border-t border-sand/10 py-4 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-sand/50">{site.address.city}, {site.address.country}</p>
          <p className="text-xs text-sand/50">
            © {year} {site.name}. {t('rights')}
          </p>
        </div>
        <p className="border-t border-sand/10 py-4 text-center text-sm font-medium text-sand/80">
          Built by{' '}
          <a href="https://melba.et" target="_blank" rel="noopener" className="font-bold text-sun underline-offset-4 transition-colors hover:text-sand hover:underline">
            Melba Technology
          </a>
        </p>
      </div>
    </footer>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-sm text-sand/70 transition-colors hover:text-sand">
        {children}
      </Link>
    </li>
  )
}
