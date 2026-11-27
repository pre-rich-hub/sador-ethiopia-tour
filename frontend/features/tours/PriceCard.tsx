import { useTranslations } from 'next-intl'
import { CalendarDays, Clock, Users } from 'lucide-react'
import { formatUsd } from '@/lib/content/constants'
import type { Tour } from '@/lib/content/types'
import { buttonClass } from '@/components/ui/ButtonLink'
import { Link } from '@/i18n/navigation'
import { site } from '@/content/site'

export function PriceCard({ tour }: { tour: Tour }) {
  const t = useTranslations('Tours')
  const p = tour.price
  return (
    <aside className="rounded-3xl bg-ink p-6 text-sand shadow-[0_30px_60px_-35px_rgba(29,24,19,0.7)]">
      {p ? (
        <>
          <p className="text-xs text-sand/60">{t('fromPerPerson')}</p>
          <p className="mt-0.5 font-serif text-4xl font-semibold text-sand">{formatUsd(p.fromUsd)}</p>
          <p className="mt-1.5 text-xs text-sand/55">{p.basis === 'per person, sharing a double room' ? t('basisDouble') : t('basisAdult')}</p>
        </>
      ) : (
        <>
          <p className="font-serif text-2xl">{t('onRequestTitle')}</p>
          <p className="mt-2 text-sm leading-relaxed text-sand/65">{t('onRequestBody')}</p>
        </>
      )}

      <dl className="mt-5 space-y-2 border-t border-sand/10 pt-4 text-sm">
        <div className="flex items-center gap-3">
          <Clock className="size-4 text-sand/70" />
          <dt className="sr-only">{t('duration')}</dt>
          <dd>{tour.duration}</dd>
        </div>
        {tour.departure && (
          <div className="flex items-center gap-3">
            <CalendarDays className="size-4 text-sand/70" />
            <dt className="sr-only">{t('departure')}</dt>
            <dd>{tour.departure}</dd>
          </div>
        )}
        <div className="flex items-center gap-3">
          <Users className="size-4 text-sand/70" />
          <dt className="sr-only">{t('group')}</dt>
          <dd>{tour.group ?? t('privateOrGroup')}</dd>
        </div>
      </dl>

      {p?.tiers && (
        <div className="mt-5 border-t border-sand/10 pt-4">
          <p className="kicker text-sand/70">{t('groupPricing')}</p>
          <table className="mt-2.5 w-full text-sm">
            <tbody>
              {p.tiers.map((tier) => (
                <tr key={tier.label} className="border-b border-sand/10 last:border-0">
                  <td className="py-1.5 text-sand/75">{tier.label}</td>
                  <td className="py-1.5 text-right font-semibold">{formatUsd(tier.usd)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {p.extras && p.extras.length > 0 && (
            <ul className="mt-3 space-y-1 text-xs text-sand/60">
              {p.extras.map((e) => (
                <li key={e.label} className="flex justify-between gap-4">
                  <span>{e.label}</span>
                  <span>+{formatUsd(e.usd)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <Link href={{ pathname: '/contact', query: { tour: tour.slug } }} className={buttonClass('sun', 'mt-6 w-full')}>
        {t('enquire')}
      </Link>
      <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className={buttonClass('glass', 'mt-2 w-full')}>
        {t('whatsapp')}
      </a>
    </aside>
  )
}
