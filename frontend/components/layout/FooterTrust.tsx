import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { site } from '@/content/site'
import { tripadvisor } from '@/content/tripadvisor'
import { TripadvisorMark } from '@/components/ui/SocialIcons'

const tile = 'flex h-20 items-center justify-center overflow-hidden rounded-xl bg-white px-3 py-2'

/** Booking platforms Sador is listed on, and the payment methods it accepts. */
export function FooterTrust() {
  const t = useTranslations('Footer')
  return (
    <div className="grid gap-10 border-t border-sand/10 pb-6 pt-12 lg:grid-cols-[4fr_3fr] lg:gap-16">
      <div>
        <p className="font-serif text-3xl">{t('platformsTitle')}</p>
        <p className="mt-2 text-sm text-sand/60">{t('platformsBody')}</p>
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
          <li>
            <a href={tripadvisor.url} target="_blank" rel="noopener noreferrer" className={`${tile} gap-2 transition-transform hover:-translate-y-0.5`}>
              <TripadvisorMark className="size-7 shrink-0" />
              <span className="font-sans text-[0.95rem] font-bold text-black">Tripadvisor</span>
            </a>
          </li>
          {site.partners.map((p) => (
            <li key={p.name} className={tile}>
              <Image src={p.logo} alt={p.name} width={200} height={80} className="h-full max-h-14 w-full object-contain" />
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="font-serif text-3xl">{t('payTitle')}</p>
        <p className="mt-2 text-sm text-sand/60">{t('payBody')}</p>
        <ul className="mt-6 grid grid-cols-3 gap-3">
          {site.payments.map((m) => (
            <li key={m} className={tile} aria-label={m} title={m}>
              {PAYMENT_MARKS[m]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const PAYMENT_MARKS: Record<(typeof site.payments)[number], React.ReactNode> = {
  Visa: <span className="font-sans text-2xl font-black italic tracking-tight text-[#1a1f71]">VISA</span>,
  Mastercard: (
    <svg viewBox="0 0 48 30" className="h-8 w-auto" aria-hidden>
      <circle cx="17" cy="15" r="13" fill="#eb001b" />
      <circle cx="31" cy="15" r="13" fill="#f79e1b" />
      <path d="M24 4.2a13 13 0 0 1 0 21.6 13 13 0 0 1 0-21.6Z" fill="#ff5f00" />
    </svg>
  ),
  PayPal: (
    <span className="font-sans text-xl font-extrabold italic">
      <span className="text-[#003087]">Pay</span>
      <span className="text-[#009cde]">Pal</span>
    </span>
  ),
}
