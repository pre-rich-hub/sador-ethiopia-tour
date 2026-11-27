import { site } from '@/content/site'
import { cn } from '@/lib/cn'

/** Brand-coloured social icons on white circles. */
const icons: Record<string, React.ReactNode> = {
  Instagram: (
    <svg viewBox="0 0 24 24" className="size-[22px]" aria-hidden>
      <defs>
        <radialGradient id="ig-grad" cx="30%" cy="107%" r="150%">
          <stop offset="0" stopColor="#fdf497" />
          <stop offset="0.05" stopColor="#fdf497" />
          <stop offset="0.45" stopColor="#fd5949" />
          <stop offset="0.6" stopColor="#d6249f" />
          <stop offset="0.9" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <path
        fill="url(#ig-grad)"
        d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1.1.4 2.2.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1.1.4-2.2.4-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1.1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1.1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 4.6a5.2 5.2 0 1 0 0 10.4 5.2 5.2 0 0 0 0-10.4Zm0 8.6a3.4 3.4 0 1 1 0-6.8 3.4 3.4 0 0 1 0 6.8Zm5.4-9.9a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Z"
      />
    </svg>
  ),
  YouTube: (
    <svg viewBox="0 0 24 24" className="size-6" aria-hidden>
      <path fill="#FF0000" d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8Z" />
      <path fill="#fff" d="m9.7 15.1 5.8-3.1-5.8-3.1v6.2Z" />
    </svg>
  ),
  Facebook: (
    <svg viewBox="0 0 24 24" className="size-[26px]" aria-hidden>
      <path fill="#1877F2" d="M24 12a12 12 0 1 0-13.9 11.9v-8.4H7.1V12h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9V12h3.4l-.5 3.5h-2.9v8.4A12 12 0 0 0 24 12Z" />
      <path fill="#fff" d="m16.7 15.5.5-3.5h-3.4V9.8c0-1 .5-1.9 2-1.9h1.5v-3s-1.4-.2-2.7-.2c-2.7 0-4.5 1.7-4.5 4.7V12h-3v3.5h3v8.4a12 12 0 0 0 3.7 0v-8.4h2.9Z" />
    </svg>
  ),
  TikTok: (
    <svg viewBox="0 0 24 24" className="size-[22px]" aria-hidden>
      <path fill="#25F4EE" d="M9.4 9.7v-.9a7 7 0 0 0-1-.1 7.3 7.3 0 0 0-4.1 13.3A7.3 7.3 0 0 1 9.4 9.7Z" />
      <path fill="#25F4EE" d="M9.6 19.6a3.3 3.3 0 0 0 3.3-3.2V.6h2.9a5.5 5.5 0 0 1-.1-1H11.8v15.8a3.3 3.3 0 0 1-4.8 2.8 3.3 3.3 0 0 0 2.6 1.4Zm11.6-13.6V5a5.5 5.5 0 0 1-3-.9 5.5 5.5 0 0 0 3 1.9Z" />
      <path fill="#FE2C55" d="M18.2 4.1a5.5 5.5 0 0 1-1.4-3.6h-1a5.5 5.5 0 0 0 2.4 3.6ZM8.4 11.8a3.3 3.3 0 0 0-1.5 6.3 3.3 3.3 0 0 1 3.6-5.3V8.8a7 7 0 0 0-1-.1h-.2v3.1a3.3 3.3 0 0 0-.9 0Zm12.8-5.8v3a9.3 9.3 0 0 1-5.4-1.8v7.9a7.3 7.3 0 0 1-11.5 6 7.3 7.3 0 0 0 12.5-5.1V8.2a9.3 9.3 0 0 0 5.4 1.7V6.1a5.5 5.5 0 0 1-1-.1Z" />
      <path fill="#000" d="M15.8 16V8.2a9.3 9.3 0 0 0 5.4 1.7V7a5.5 5.5 0 0 1-3-1.9 5.5 5.5 0 0 1-2.4-3.6h-2.9v15.8a3.3 3.3 0 0 1-6 1.8 3.3 3.3 0 0 1 1.5-6.3 3.3 3.3 0 0 1 1 .2V9.7a7.3 7.3 0 0 0-5.1 12.4 7.3 7.3 0 0 0 11.5-6Z" />
    </svg>
  ),
  X: (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
      <path fill="#000" d="M18.2 2.3h3.4l-7.4 8.4 8.7 11.5h-6.8l-5.3-7-6.1 7H1.3l7.9-9L.8 2.3h7l4.8 6.4 5.6-6.4Zm-1.2 17.9h1.9L7 4.2H5l12 16Z" />
    </svg>
  ),
  Threads: (
    <svg viewBox="0 0 24 24" className="size-[22px]" aria-hidden>
      <path fill="#000" d="M17.7 11.1c-.1 0-.2-.1-.3-.1-.2-3-1.8-4.7-4.6-4.7-1.7 0-3.1.7-3.9 2l1.5 1c.6-.9 1.5-1.1 2.4-1.1 1 0 1.8.3 2.3.9.3.4.6 1 .7 1.7-.8-.1-1.7-.2-2.6-.1-2.6.1-4.3 1.7-4.2 3.8.1 1.1.6 2 1.5 2.6.8.5 1.7.8 2.8.7 1.4-.1 2.5-.6 3.3-1.6.6-.7 1-1.7 1.1-2.9.7.4 1.2.9 1.4 1.6.5 1.1.5 2.9-.9 4.3-1.3 1.3-2.8 1.8-5.1 1.8-2.6 0-4.5-.8-5.8-2.4-1.2-1.5-1.8-3.6-1.8-6.4s.6-4.9 1.8-6.4c1.3-1.6 3.2-2.4 5.8-2.4 2.6 0 4.6.8 5.9 2.4.6.8 1.1 1.8 1.4 2.9l1.8-.5c-.4-1.4-1-2.6-1.8-3.6C18 1.6 15.6.6 12.5.6h-.1C9.3.6 6.9 1.6 5.3 3.6 3.9 5.4 3.2 7.8 3.1 11v.1c0 3.1.8 5.6 2.2 7.4 1.6 2 4 3 7.1 3h.1c2.8 0 4.7-.7 6.3-2.3 2.1-2.1 2-4.8 1.3-6.4-.5-1.2-1.4-2.1-2.5-2.7Zm-4.9 4.6c-1.1.1-2.3-.4-2.4-1.5 0-.8.6-1.7 2.4-1.8h.6c.6 0 1.2.1 1.7.2-.2 2.5-1.4 3-2.3 3.1Z" />
    </svg>
  ),
}

export function SocialIcons({ className }: { className?: string }) {
  return (
    <ul className={cn('flex flex-wrap gap-3', className)}>
      {site.social.filter((s) => s.name !== 'Tripadvisor').map((s) => (
        <li key={s.name}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.name}
            title={s.name}
            className="grid size-12 place-items-center rounded-full bg-white shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            {icons[s.name]}
          </a>
        </li>
      ))}
    </ul>
  )
}

/** Tripadvisor owl mark (simplified). */
export function TripadvisorMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <circle cx="16" cy="16" r="16" fill="#34e0a1" />
      <path fill="#000" d="M25.6 12.9 27.4 11h-4a12.5 12.5 0 0 0-14.8 0h-4l1.8 1.9a5.6 5.6 0 1 0 7.6 8.2l2 2.2 2-2.2a5.6 5.6 0 1 0 7.6-8.2ZM10.4 22a3.8 3.8 0 1 1 0-7.6 3.8 3.8 0 0 1 0 7.6Zm5.6-3.9A5.6 5.6 0 0 0 12.3 13a10.7 10.7 0 0 1 7.4 0 5.6 5.6 0 0 0-3.7 5.1Zm5.6 3.9a3.8 3.8 0 1 1 0-7.6 3.8 3.8 0 0 1 0 7.6Zm0-5.8a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-11.2 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
    </svg>
  )
}

/** Tripadvisor owl + wordmark, used where the brand should be recognisable at a glance. */
export function TripadvisorLogo({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 text-[1.05rem] font-bold tracking-tight text-black', className)}>
      <TripadvisorMark className="size-7" />
      Tripadvisor
    </span>
  )
}
