import Image from 'next/image'
import { getFormatter, getTranslations, setRequestLocale } from 'next-intl/server'
import { posts } from '@/lib/content'
import { img } from '@/lib/images'
import { alternates } from '@/lib/seo'
import { Link } from '@/i18n/navigation'
import { PageHero } from '@/components/ui/PageHero'
import { Reveal } from '@/components/ui/Reveal'
import { ExploreButton } from '@/components/ui/ExploreButton'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Blog' })
  return { title: t('metaTitle'), description: t('lede'), alternates: alternates(locale, '/blog') }
}

export default async function BlogIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('Blog')
  const tn = await getTranslations('Nav')
  const tc = await getTranslations('Common')
  const format = await getFormatter()
  const [lead, ...rest] = posts
  return (
    <>
      <PageHero image="meskel-square-aerial" kicker={t('kicker')} title={t('title')} lede={t('lede')} crumbs={[{ label: tn('home'), href: '/' }, { label: tn('blog') }]} />
      <section className="container-x py-16 sm:py-24">
        <Reveal>
          <Link href={`/blog/${lead.slug}`} className="group grid items-center gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[2.25rem]">
              <Image src={img(lead.cover)} alt="" fill priority sizes="(max-width:1024px) 100vw, 60vw" className="object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
            </div>
            <div>
              <p className="kicker text-muted">{t('latest')}</p>
              <h2 className="mt-4 text-4xl leading-tight group-hover:text-ink/70 sm:text-5xl">{lead.title}</h2>
              <p className="mt-5 text-lg leading-relaxed text-muted">{lead.excerpt}</p>
              <p className="mt-6 text-sm text-muted">
                {lead.author} · {format.dateTime(new Date(lead.date), { dateStyle: 'long' })} · {t('minutes', { n: lead.readingMinutes })}
              </p>
              <ExploreButton label={tc('readMore')} className="mt-7" />
            </div>
          </Link>
        </Reveal>
        <div className="mt-20 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 70} className="h-full">
              <Link href={`/blog/${p.slug}`} className="group flex h-full flex-col">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem]">
                  <Image src={img(p.cover)} alt="" fill sizes="(max-width:640px) 100vw, 33vw" className="object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
                </div>
                <p className="mt-5 text-xs text-muted">
                  {format.dateTime(new Date(p.date), { dateStyle: 'long' })} · {t('minutes', { n: p.readingMinutes })}
                </p>
                <h3 className="mt-2 font-serif text-2xl leading-tight group-hover:text-ink/70">{p.title}</h3>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{p.excerpt}</p>
                <div className="mt-auto flex justify-center pt-6">
                  <ExploreButton label={tc('readMore')} />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
