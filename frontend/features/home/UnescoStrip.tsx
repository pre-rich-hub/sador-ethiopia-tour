import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { unescoSites } from '@/lib/content'
import { img } from '@/lib/images'
import { Link } from '@/i18n/navigation'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Accent } from '@/components/ui/SectionHeader'
import { Reveal } from '@/components/ui/Reveal'

export function UnescoStrip() {
  const t = useTranslations('Home.unesco')
  const sites = unescoSites.slice(0, 6)
  return (
    <section className="container-x py-24 sm:py-32">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:items-center">
        <Reveal className="text-center">
          <p className="font-serif text-[7rem] font-light leading-none sm:text-[9rem]">12</p>
          <h2 className="mt-2 text-balance text-4xl leading-[1.06] sm:text-5xl">{t.rich('title', { em: (c) => <Accent>{c}</Accent> })}</h2>
          <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed text-muted">{t('lede')}</p>
          <ButtonLink href="/unesco-world-heritage-sites" variant="outline" className="mt-8">
            {t('cta')}
          </ButtonLink>
        </Reveal>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {sites.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={(i % 3) * 70}>
              <Link href={`/unesco-world-heritage-sites#${s.slug}`} className="group block">
                <div className="relative aspect-square overflow-hidden rounded-[1.5rem]">
                  <Image src={img(s.image)} alt="" fill sizes="(max-width:640px) 50vw, 20vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute left-3 top-3 rounded-full bg-paper/90 px-2.5 py-1 text-[0.7rem] font-semibold">{s.inscribed}</span>
                </div>
                <p className="mt-3 font-serif text-lg leading-tight group-hover:text-ink/70">{s.title}</p>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
