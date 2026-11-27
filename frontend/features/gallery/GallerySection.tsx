import { useTranslations } from 'next-intl'
import { Reveal } from '@/components/ui/Reveal'
import { Gallery } from './Gallery'

/** Titled photo gallery shown on tour and destination detail pages. */
export function GallerySection({ photos, title, tone = 'sand' }: { photos: string[]; title: string; tone?: 'sand' | 'paper' }) {
  const t = useTranslations('Gallery')
  if (!photos.length) return null
  return (
    <section className={tone === 'paper' ? 'bg-paper py-20 sm:py-24' : 'py-20 sm:py-24'}>
      <div className="container-x">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="kicker text-muted">{t('kicker')}</p>
            <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">{t('title', { name: title })}</h2>
          </div>
          <p className="text-sm text-muted">{t('count', { count: photos.length })}</p>
        </Reveal>
        <Gallery photos={photos} title={title} />
      </div>
    </section>
  )
}
