import type { Metadata } from 'next'
import { Fraunces, Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Tracker } from '@/components/tracker'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const fraunces = Fraunces({ subsets: ['latin'], weight: 'variable', variable: '--font-fraunces', display: 'swap' })

export const metadata: Metadata = {
  title: 'Het Dhuran Special Needs Centre | Health care in community',
  description:
    'Het Dhuran Special Needs Centre provides health care, therapy, learning and nutrition support for children and young adults in Jambiani, Zanzibar.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="antialiased min-h-screen bg-background text-foreground">
        <Header />
        <Tracker />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
