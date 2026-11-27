'use client'

import { useState, type FormEvent } from 'react'
import { useTranslations } from 'next-intl'
import { CheckCircle2, Send } from 'lucide-react'
import { site } from '@/content/site'
import { buttonClass } from '@/components/ui/ButtonLink'

/**
 * No backend: the form composes a ready-to-send email to Sador's inbox
 * (and offers WhatsApp as an alternative).
 */
export function EnquiryForm({ tours, defaultTour }: { tours: { slug: string; title: string }[]; defaultTour?: string }) {
  const t = useTranslations('Enquiry')
  const [sent, setSent] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const get = (k: string) => String(f.get(k) ?? '').trim()
    const tour = tours.find((x) => x.slug === get('tour'))
    const fields: [string, string][] = [
      [t('name'), get('name')],
      [t('email'), get('email')],
      [t('phone'), get('phone')],
      [t('country'), get('country')],
      [t('tour'), tour ? tour.title : t('tailorMade')],
      [t('date'), get('date')],
      [t('travellers'), get('travellers')],
    ]
    const lines = [...fields.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`), '', get('message')]
    const subject = `${t('subject')}${tour ? ` — ${tour.title}` : ''}`
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`
    setSent(true)
  }

  if (sent) {
    return (
      <div className="rounded-[2rem] bg-paper p-8 ring-1 ring-line sm:p-10">
        <CheckCircle2 className="size-10 text-sun" />
        <p className="mt-5 font-serif text-3xl">{t('sentTitle')}</p>
        <p className="mt-3 max-w-lg leading-relaxed text-muted">{t('sentBody', { email: site.email })}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className={buttonClass('ink')}>
            {t('whatsappInstead')}
          </a>
          <button type="button" onClick={() => setSent(false)} className={buttonClass('outline')}>
            {t('editMessage')}
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="rounded-[2rem] bg-paper p-6 ring-1 ring-line sm:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t('name')} name="name" required autoComplete="name" />
        <Field label={t('email')} name="email" type="email" required autoComplete="email" />
        <Field label={t('phone')} name="phone" type="tel" autoComplete="tel" />
        <Field label={t('country')} name="country" autoComplete="country-name" />
        <label className="sm:col-span-2">
          <span className="mb-2 block text-sm font-medium">{t('tour')}</span>
          <select name="tour" defaultValue={defaultTour ?? ''} className="field">
            <option value="">{t('tailorMade')}</option>
            {tours.map((x) => (
              <option key={x.slug} value={x.slug}>
                {x.title}
              </option>
            ))}
          </select>
        </label>
        <Field label={t('date')} name="date" type="month" />
        <label>
          <span className="mb-2 block text-sm font-medium">{t('travellers')}</span>
          <select name="travellers" defaultValue="2" className="field">
            {['1', '2', '3', '4', '5–7', '8–10', '11+'].map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
        </label>
        <label className="sm:col-span-2">
          <span className="mb-2 block text-sm font-medium">{t('message')}</span>
          <textarea name="message" rows={5} className="field resize-y" placeholder={t('messagePlaceholder')} />
        </label>
      </div>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-xs leading-relaxed text-muted">{t('privacy')}</p>
        <button type="submit" className={buttonClass('sun', 'shrink-0')}>
          {t('send')}
          <Send className="size-4" />
        </button>
      </div>
    </form>
  )
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label>
      <span className="mb-2 block text-sm font-medium">
        {label}
        {props.required && <span> *</span>}
      </span>
      <input className="field" {...props} />
    </label>
  )
}
