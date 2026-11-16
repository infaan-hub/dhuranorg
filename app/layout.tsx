import type { Metadata } from 'next'
import { Fraunces, Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Tracker } from '@/components/tracker'
import { Providers } from '@/components/providers'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const fraunces = Fraunces({ subsets: ['latin'], weight: 'variable', variable: '--font-fraunces', display: 'swap' })

export const metadata: Metadata = {
  title: 'Dhuran Special Needs Centre | Health care in community',
  description:
    'Dhuran Special Needs Centre provides health care, therapy, learning and nutrition support for children and young adults in Jambiani, Zanzibar.',
  metadataBase: new URL('https://dhuranorg.vercel.app'),
  openGraph: {
    title: 'Dhuran Special Needs Centre | Health care in community',
    description:
      'Dhuran Special Needs Centre provides health care, therapy, learning and nutrition support for children and young adults in Jambiani, Zanzibar.',
    url: 'https://dhuranorg.vercel.app',
    siteName: 'Dhuran Special Needs Centre',
    images: [
      {
        url: '/hero-donor-poster.jpg',
        width: 1200,
        height: 630,
        alt: 'Dhuran Special Needs Centre',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dhuran Special Needs Centre | Health care in community',
    description:
      'Dhuran Special Needs Centre provides health care, therapy, learning and nutrition support for children and young adults in Jambiani, Zanzibar.',
    images: ['/hero-donor-poster.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="antialiased min-h-screen bg-background text-foreground">
        <Providers>
          <Header />
          <Tracker />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
