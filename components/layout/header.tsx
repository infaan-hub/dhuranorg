'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, Globe, Menu, X } from 'lucide-react'
import { useLang } from '@/lib/i18n'

const navItems = [
  { href: '/about', key: 'about' },
  { href: '/programs', key: 'programmes' },
  { href: '/news', key: 'news' },
  { href: '/gallery', key: 'gallery' },
  { href: '/resources', key: 'resources' },
  { href: '/events', key: 'events' },
  { href: '/faq', key: 'faq' },
  { href: '/search', key: 'search' },
  { href: '/contact', key: 'contact' },
  { href: 'https://zan-medibook.vercel.app/', key: 'connect' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const { lang, setLang, t } = useLang()
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <>
      <header className="site-header" id="top">
        <div className="container header-inner">
          {isAdmin ? (
            <span className="header-spacer" aria-hidden="true" />
          ) : (
            <button
              className="menu-toggle"
              type="button"
              aria-label={open ? 'Close navigation' : 'Open navigation'}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={21} /> : <Menu size={21} />}
            </button>
          )}

          <a href="#top" className="brand brand-right" aria-label="Dhuran Special Needs Centre home" onClick={() => setOpen(false)}>
            <span className="brand-copy"><strong>dhuran</strong><small>Special Needs Centre</small></span>
          </a>
        </div>
      </header>

      <div className={`sidebar-overlay${open ? ' sidebar-overlay-open' : ''}`} onClick={() => setOpen(false)} aria-hidden="true" />
      <aside className={`sidebar${open ? ' sidebar-open' : ''}`} aria-label="Main navigation" aria-hidden={!open}>
        <div className="sidebar-head">
          <a href="#top" className="brand sidebar-brand" onClick={() => setOpen(false)}>
            <span className="brand-copy"><strong>dhuran</strong><small>Special Needs Centre</small></span>
          </a>
          <button
            className="sidebar-close"
            type="button"
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
          >
            <X size={18} />
          </button>
        </div>
        <div className="sidebar-settings">
          <button className="sidebar-setting-btn" type="button" onClick={() => setLang(lang === 'en' ? 'sw' : 'en')}>
            <Globe size={16} /> {lang.toUpperCase()}
          </button>
        </div>
        <nav className="sidebar-nav">
          {navItems.map(({ href, key }) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}>
              {t(key)}
              {href.startsWith('mailto') ? <ArrowUpRight size={15} /> : null}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  )
}