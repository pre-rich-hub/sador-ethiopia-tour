'use client'

import { useState, type FormEvent } from 'react'
import { useTranslations } from 'next-intl'
import { site } from '@/content/site'

/** No backend: opens a pre-filled subscription email to Sador's inbox. */
export function NewsletterForm() {
  const t = useTranslations('Footer')
  const [done, setDone] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = String(new FormData(e.currentTarget).get('email') ?? '').trim()
    const subject = encodeURIComponent(t('subscribeSubject'))
    const body = encodeURIComponent(t('subscribeBody', { email }))
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
    setDone(true)
  }

  if (done) return <p className="text-sm text-sand/70 lg:text-right">{t('subscribed')}</p>

  return (
    <form onSubmit={onSubmit} className="flex w-full flex-col gap-3 sm:flex-row lg:max-w-md">
      <label className="sr-only" htmlFor="newsletter-email">
        {t('emailPlaceholder')}
      </label>
      <input
        id="newsletter-email"
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder={t('emailPlaceholder')}
        className="h-14 min-w-0 flex-1 rounded-full border border-sand/20 bg-transparent px-6 text-sand placeholder:text-sand/45 focus:border-amber focus:outline-none"
      />
      <button
        type="submit"
        className="h-14 shrink-0 rounded-full bg-sun px-8 text-sm font-bold uppercase tracking-[0.16em] text-ink transition-transform hover:-translate-y-0.5"
      >
        {t('subscribe')}
      </button>
    </form>
  )
}
