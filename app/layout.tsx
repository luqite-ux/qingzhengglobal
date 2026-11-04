import type { Metadata, Viewport } from 'next'
import { Archivo, IBM_Plex_Mono } from 'next/font/google'
import { SiteHeader } from '@/components/site/header'
import { SiteFooter } from '@/components/site/footer'
import { OrganizationJsonLd } from '@/components/site/json-ld'
import { site } from '@/lib/site'
import { cookies } from 'next/headers'
import { PREVIEW_COOKIE } from '@/lib/site-content/site-content'
import './globals.css'

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
})

const description =
  'Kingsen automotive automation equipment from Taicang Qingzheng Automation Equipment Co., Ltd.: production and assembly lines, fixtures and turntables, and standard workstations designed, customized and manufactured for your project.'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Kingsen | Automotive Automation Equipment, Taicang Qingzheng Automation',
    template: '%s | Kingsen',
  },
  description,
  applicationName: site.brand,
  alternates: { canonical: '/' },
  icons: { icon: [{ url: '/icon.png', type: 'image/png' }], apple: [{ url: '/icon.png' }] },
  openGraph: {
    type: 'website',
    siteName: site.brand,
    title: 'Kingsen | Automotive Automation Equipment',
    description,
    url: site.url,
  },
}

export const viewport: Viewport = {
  themeColor: '#14161A',
  width: 'device-width',
  initialScale: 1,
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const preview = Boolean((await cookies()).get(PREVIEW_COOKIE)?.value)
  return (
    <html lang="en" className={`${archivo.variable} ${plexMono.variable}`}>
      <body className="font-sans antialiased">
        {preview ? <div className="bg-gold px-4 py-2 text-center text-sm font-semibold text-graphite">Content preview · not indexed <form className="ml-3 inline" action="/api/site-content/exit-preview" method="post"><button className="underline" type="submit">Exit preview</button></form></div> : null}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-graphite focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-on-dark"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <OrganizationJsonLd />
      </body>
    </html>
  )
}
