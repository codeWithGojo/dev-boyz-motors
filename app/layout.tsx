import type { Metadata, Viewport } from 'next'
import { Bodoni_Moda, Cormorant_Garamond, Inter, Playfair_Display, Syne } from 'next/font/google'
import './globals.css'
import { PreferencesProvider, themeBootScript } from '@/context/PreferencesContext'
import { ToastProvider } from '@/context/ToastContext'
import { InventoryProvider } from '@/context/InventoryContext'
import { ShopProvider } from '@/context/ShopContext'
import { Footer, GarageDrawer, SiteHeader, SkipLink } from '@/components/SiteChrome'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { CustomCursor } from '@/components/CustomCursor'
import { CommandPalette } from '@/components/CommandPalette'
import { site } from '@/lib/site'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
// One display face per finish (lib/accents.ts). Only the default is preloaded;
// the others download the first time a visitor picks that finish.
const bodoni = Bodoni_Moda({ subsets: ['latin'], variable: '--font-bodoni', style: ['normal', 'italic'] })
const cormorant = Cormorant_Garamond({ subsets: ['latin'], variable: '--font-cormorant', weight: ['400', '500', '600'], style: ['normal', 'italic'], preload: false })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', style: ['normal', 'italic'], preload: false })
const syne = Syne({ subsets: ['latin'], variable: '--font-syne', preload: false })
const fontVariables = [inter.variable, bodoni.variable, cormorant.variable, playfair.variable, syne.variable].join(' ')

export const metadata: Metadata = {
  title: { default: 'DEV BOYZ MOTORS | Luxury Cars in Nigeria', template: '%s | DEV BOYZ MOTORS' },
  description: 'Explore luxury and foreign-used cars with Nigerian prices. Compare models, configure colours, estimate repayments and book a private viewing.',
  metadataBase: new URL(site.url),
  openGraph: { title: 'DEV BOYZ MOTORS', description: 'Luxury cars in Nigeria: compare, configure and book a viewing.', type: 'website', siteName: 'DEV BOYZ MOTORS' },
  twitter: { card: 'summary_large_image' },
}

export const viewport: Viewport = {
  themeColor: [{ media: '(prefers-color-scheme: light)', color: '#EDEBE7' }, { media: '(prefers-color-scheme: dark)', color: '#0e0e0e' }],
}

const organization = {
  '@context': 'https://schema.org',
  '@type': 'AutoDealer',
  name: site.name,
  url: site.url,
  telephone: site.phone,
  areaServed: 'NG',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" data-accent="bronze" className={fontVariables} suppressHydrationWarning>
    <head>
      <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
    </head>
    <body className={inter.className}>
      <PreferencesProvider>
        <ToastProvider>
          <InventoryProvider>
            <ShopProvider>
              <SkipLink />
              <SiteHeader />
              <main id="main" tabIndex={-1} className="outline-none">{children}</main>
              <Footer />
              <GarageDrawer />
              <WhatsAppButton />
              <CommandPalette />
              <CustomCursor />
            </ShopProvider>
          </InventoryProvider>
        </ToastProvider>
      </PreferencesProvider>
    </body>
  </html>
}
