import { getTranslations, setRequestLocale } from 'next-intl/server'
import { terms } from '@/content/pages'
import { site } from '@/content/site'
import { alternates } from '@/lib/seo'
import { PageHero } from '@/components/ui/PageHero'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Terms' })
  return { title: t('title'), alternates: alternates(locale, '/terms') }
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('Terms')
  const tn = await getTranslations('Nav')
  return (
    <>
      <PageHero image="gondar-castle" kicker={site.name} title={t('title')} crumbs={[{ label: tn('home'), href: '/' }, { label: t('title') }]} />
      <section className="container-x grid gap-12 py-16 sm:py-24 lg:grid-cols-[240px_1fr] lg:gap-20">
        <nav className="lg:sticky lg:top-28 lg:self-start" aria-label={t('contents')}>
          <p className="kicker mb-4 text-muted">{t('contents')}</p>
          <ol className="space-y-2 text-sm">
            {terms.map((s, i) => (
              <li key={s.title}>
                <a href={`#s${i}`} className="text-muted hover:text-ink/70">
                  {i + 1}. {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="max-w-3xl space-y-12">
          {terms.map((s, i) => (
            <section key={s.title} id={`s${i}`} className="scroll-mt-28">
              <h2 className="font-serif text-3xl">
                <span>{i + 1}.</span> {s.title}
              </h2>
              <div className="prose-sador mt-4">
                {s.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>
          ))}
          <p className="rounded-2xl bg-paper p-6 text-sm text-muted ring-1 ring-line">{t('questions', { email: site.email })}</p>
        </div>
      </section>
    </>
  )
}
