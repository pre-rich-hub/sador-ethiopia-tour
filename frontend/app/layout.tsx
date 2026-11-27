import type { Metadata, Viewport } from 'next'
import { site } from '@/content/site'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  icons: {
    icon: [{ url: '/favicon-32.png', sizes: '32x32', type: 'image/png' }],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#1d1813',
  width: 'device-width',
  initialScale: 1,
}

/** Passthrough: `[locale]/layout.tsx` owns <html lang>. */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
