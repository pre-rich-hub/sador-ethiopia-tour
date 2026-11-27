import { useTranslations } from 'next-intl'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { SunArc } from '@/components/ui/SunArc'

export default function NotFound() {
  const t = useTranslations('NotFound')
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden bg-ink pt-24 text-sand">
      <SunArc className="absolute -bottom-2 left-1/2 w-[640px] -translate-x-1/2 opacity-20" />
      <div className="container-x relative text-center">
        <p className="font-serif text-8xl font-light">404</p>
        <h1 className="mt-4 text-4xl sm:text-5xl">{t('title')}</h1>
        <p className="mx-auto mt-4 max-w-md text-sand/70">{t('body')}</p>
        <div className="mt-8 flex justify-center gap-3">
          <ButtonLink href="/">{t('home')}</ButtonLink>
          <ButtonLink href="/tours" variant="glass">
            {t('tours')}
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
