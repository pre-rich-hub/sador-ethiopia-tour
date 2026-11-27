import { useTranslations } from 'next-intl'
import { site } from '@/content/site'

export function WhatsAppButton() {
  const t = useTranslations('Common')
  return (
    <a
      href={site.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('whatsapp')}
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#1f9d55] py-3 pl-3 pr-4 text-sm font-semibold text-white shadow-[0_12px_30px_-10px_rgba(0,0,0,0.5)] transition-transform hover:-translate-y-0.5 sm:bottom-7 sm:right-7"
    >
      <svg viewBox="0 0 24 24" className="size-6" fill="currentColor" aria-hidden>
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91A9.86 9.86 0 0 0 12.04 2Zm5.8 14.07c-.24.68-1.43 1.3-1.97 1.35-.5.05-1.13.07-1.83-.12a16.7 16.7 0 0 1-1.65-.61c-2.9-1.25-4.79-4.17-4.94-4.36-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.01-2.41.27-.29.58-.36.78-.36h.56c.18 0 .42-.07.66.5.24.58.82 2 .89 2.15.07.14.12.31.02.5-.1.19-.14.31-.29.48-.14.17-.3.38-.43.5-.14.15-.29.3-.12.59.17.29.75 1.24 1.61 2 1.11.99 2.04 1.3 2.33 1.44.29.15.46.12.63-.07.17-.19.73-.85.92-1.14.19-.29.39-.24.65-.14.27.1 1.69.8 1.98.94.29.15.48.22.55.34.07.12.07.7-.17 1.38Z" />
      </svg>
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  )
}
