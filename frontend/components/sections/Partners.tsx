import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { site } from '@/content/site'

export function Partners() {
  const t = useTranslations('Home')
  return (
    <section className="hidden border-y border-line bg-paper py-12 md:block">
      <div className="container-x flex flex-col items-center gap-8 md:flex-row md:justify-between">
        <p className="kicker shrink-0 text-muted">{t('partners')}</p>
        <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {site.partners.map((p) => (
            <li key={p.name}>
              <Image src={p.logo} alt={p.name} width={140} height={60} className="h-10 w-auto object-contain opacity-70 mix-blend-multiply grayscale transition hover:opacity-100 hover:grayscale-0" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
