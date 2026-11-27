import { Fraunces, Inter } from 'next/font/google'
import type { ReactNode } from 'react'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['opsz'],
  variable: '--font-fraunces',
  display: 'swap',
})

export function DocumentShell({ lang, children }: { lang: string; children: ReactNode }) {
  return (
    <html lang={lang} className={`${inter.variable} ${fraunces.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
