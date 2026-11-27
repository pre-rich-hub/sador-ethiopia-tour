import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { img } from '@/lib/images'
import { site } from '@/content/site'
import { buttonClass, ButtonLink } from '@/components/ui/ButtonLink'

export function PlanCta({ image = 'gheralta-abuna-yemata' }: { image?: string }) {
  const t = useTranslations('Cta')
  return (
    <section className="container-x py-16 sm:py-24">
      <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-ink px-7 py-16 text-sand sm:px-14 sm:py-24">
        <Image src={img(image)} alt="" fill sizes="100vw" className="-z-20 object-cover opacity-55" />
        <div className="absolute inset-0 -z-10 bg-ink/70" />
        <div className="mx-auto max-w-2xl text-center">
          <p className="kicker justify-center text-sand/70">{t('kicker')}</p>
          <h2 className="mt-5 text-balance text-4xl leading-[1.05] sm:text-6xl">
            {t.rich('title', { em: (c) => <em className="italic">{c}</em> })}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-sand/80">{t('body')}</p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/contact">{t('primary')}</ButtonLink>
            <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className={buttonClass('glass')}>
              {t('whatsapp')}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
