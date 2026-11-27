import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { DocumentShell } from '@/components/layout/DocumentShell'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'
import { site } from '@/content/site'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta' })
  return {
    title: { default: t('title'), template: `%s · ${site.name}` },
    description: t('description'),
    openGraph: { siteName: site.name, type: 'website', locale, images: ['/images/lalibela-bete-giorgis-pilgrims.jpg'] },
    twitter: { card: 'summary_large_image' },
  }
}

const CLIENT_NAMESPACES = ['Common', 'Nav', 'Regions', 'Categories', 'Footer', 'Tours', 'Enquiry', 'Gallery'] as const

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  const all = await getMessages()
  // Client components only need these namespaces; the rest render on the server.
  const messages = {
    ...Object.fromEntries(CLIENT_NAMESPACES.map((k) => [k, all[k]])),
    Home: { hero: all.Home.hero, styles: all.Home.styles, reviews: all.Home.reviews },
  }
  const t = await getTranslations('Common')

  return (
    <DocumentShell lang={locale}>
      <NextIntlClientProvider messages={messages}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-sand"
        >
          {t('skip')}
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppButton />
      </NextIntlClientProvider>
    </DocumentShell>
  )
}
