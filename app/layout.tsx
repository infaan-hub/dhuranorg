import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from 'next-themes'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Het Dhuran Special Needs Centre | Room to Bloom',
  description:
    'A place to learn, move and belong. Supporting children and young adults with disabilities in Jambiani, Zanzibar through individualized care, education and therapy.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
      <html lang="en" className={inter.variable}>
        <body className="antialiased min-h-screen bg-background text-foreground">
          <Header />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </ThemeProvider>
  )
}
