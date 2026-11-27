import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getFormatter, getTranslations, setRequestLocale } from 'next-intl/server'
import { getPost, posts } from '@/lib/content'
import { routing } from '@/i18n/routing'
import { img } from '@/lib/images'
import { alternates } from '@/lib/seo'
import { Link } from '@/i18n/navigation'
import { PageHero } from '@/components/ui/PageHero'
import { PlanCta } from '@/components/sections/PlanCta'


export function generateStaticParams() {
  return routing.locales.flatMap((locale) => posts.map((p) => ({ locale, slug: p.slug })))
}

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params
  const p = getPost(slug)
  if (!p) return {}
  return {
    title: p.title,
    description: p.excerpt,
    alternates: alternates(locale, `/blog/${slug}`),
    openGraph: { type: 'article', publishedTime: p.date, authors: [p.author], images: [img(p.cover)] },
  }
}

export default async function PostPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const p = getPost(slug)
  if (!p) notFound()
  const t = await getTranslations('Blog')
  const tn = await getTranslations('Nav')
  const format = await getFormatter()
  const others = posts.filter((x) => x.slug !== p.slug).slice(0, 3)

  return (
    <>
      <PageHero image={p.cover} kicker={t('kicker')} title={p.title} crumbs={[{ label: tn('home'), href: '/' }, { label: tn('blog'), href: '/blog' }, { label: p.title }]}>
        <p className="text-sm text-sand/75">
          {t('by', { author: p.author })} · {format.dateTime(new Date(p.date), { dateStyle: 'long' })} · {t('minutes', { n: p.readingMinutes })}
        </p>
      </PageHero>
      <article className="container-x py-16 sm:py-24">
        <div className="prose-sador mx-auto max-w-[44rem] text-[1.1rem]">
          {p.blocks.map((b, i) =>
            b.type === 'img' ? (
              <figure key={i} className="relative -mx-2 my-10 aspect-[3/2] overflow-hidden rounded-[1.75rem] sm:-mx-16">
                <Image src={img(b.src)} alt="" fill sizes="(max-width:768px) 100vw, 900px" className="object-cover" />
              </figure>
            ) : b.type === 'h' ? (
              <h2 key={i}>{b.text}</h2>
            ) : (
              <p key={i}>{b.text}</p>
            ),
          )}
          <div className="mt-14 flex items-center gap-4 border-t border-line pt-8">
            <span className="grid size-14 place-items-center rounded-full bg-sun font-serif text-xl font-semibold">{p.author[0]}</span>
            <div>
              <p className="font-semibold">{p.author}</p>
              <p className="text-sm text-muted">{t('authorRole')}</p>
            </div>
          </div>
        </div>
      </article>
      <section className="bg-sand-deep/60 py-20">
        <div className="container-x">
          <h2 className="mb-10 font-serif text-3xl sm:text-4xl">{t('more')}</h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {others.map((o) => (
              <Link key={o.slug} href={`/blog/${o.slug}`} className="group">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem]">
                  <Image src={img(o.cover)} alt="" fill sizes="33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <h3 className="mt-4 font-serif text-xl leading-snug group-hover:text-ink/70">{o.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <PlanCta image={p.cover} />
    </>
  )
}
