import Image from 'next/image'
import { useFormatter, useTranslations } from 'next-intl'
import { posts } from '@/lib/content'
import { img } from '@/lib/images'
import { Link } from '@/i18n/navigation'
import { SectionHeader, Accent } from '@/components/ui/SectionHeader'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Reveal } from '@/components/ui/Reveal'

export function JournalTeaser() {
  const t = useTranslations('Home.journal')
  const tb = useTranslations('Blog')
  const format = useFormatter()
  const [lead, ...rest] = posts.slice(0, 4)
  return (
    <section className="container-x pb-24 sm:pb-32">
      <SectionHeader align="center" kicker={t('kicker')} title={t.rich('title', { em: (c) => <Accent>{c}</Accent> })} action={<ButtonLink href="/blog" variant="outline">{t('cta')}</ButtonLink>} />
      <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
        <Reveal>
          <Link href={`/blog/${lead.slug}`} className="group block">
            <div className="relative aspect-[16/11] overflow-hidden rounded-[2rem]">
              <Image src={img(lead.cover)} alt="" fill sizes="(max-width:1024px) 100vw, 55vw" className="object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
            </div>
            <p className="mt-5 text-sm text-muted">
              {format.dateTime(new Date(lead.date), { dateStyle: 'long' })} · {tb('minutes', { n: lead.readingMinutes })}
            </p>
            <h3 className="mt-2 font-serif text-3xl leading-tight group-hover:text-ink/70 sm:text-4xl">{lead.title}</h3>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted">{lead.excerpt}</p>
          </Link>
        </Reveal>
        <ul className="divide-y divide-line">
          {rest.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={i * 70} className="py-5 first:pt-0">
              <Link href={`/blog/${p.slug}`} className="group grid grid-cols-[112px_1fr] items-center gap-5">
                <div className="relative aspect-square overflow-hidden rounded-2xl">
                  <Image src={img(p.cover)} alt="" fill sizes="112px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div>
                  <p className="text-xs text-muted">{format.dateTime(new Date(p.date), { dateStyle: 'medium' })}</p>
                  <h3 className="mt-1 font-serif text-xl leading-snug group-hover:text-ink/70">{p.title}</h3>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
