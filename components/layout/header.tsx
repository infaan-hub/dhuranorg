'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Globe, Heart, Menu, Moon, Sun, X } from 'lucide-react'
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
  { href: 'mailto:info@hetdhuran.org', key: 'contact' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const [dark, setDark] = useState(false)
  const { lang, setLang, t } = useLang()
  useEffect(() => {
    const saved = localStorage.getItem('theme')
    const isDark = saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)
    setDark(isDark)
    document.documentElement.classList.toggle('dark', isDark)
  }, [])
  function toggleTheme() {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return (
    <>
      <header className="site-header" id="top">
        <div className="container header-inner">
          <button
            className="menu-toggle"
            type="button"
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>

          <button className="theme-toggle" type="button" aria-label="Toggle dark mode" onClick={toggleTheme}>
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="theme-toggle" type="button" aria-label="Toggle language" onClick={() => setLang(lang === 'en' ? 'sw' : 'en')}>
            <Globe size={18} /> {lang.toUpperCase()}
          </button>

          <a href="#top" className="brand brand-right" aria-label="Het Dhuran Special Needs Centre home" onClick={() => setOpen(false)}>
            <span className="brand-icon"><Heart size={19} strokeWidth={2.3} /></span>
            <span className="brand-copy"><strong>het dhuran</strong><small>Special Needs Centre</small></span>
          </a>
        </div>
      </header>

      <div className={`sidebar-overlay${open ? ' sidebar-overlay-open' : ''}`} onClick={() => setOpen(false)} aria-hidden="true" />
      <aside className={`sidebar${open ? ' sidebar-open' : ''}`} aria-label="Main navigation">
        <a href="#top" className="brand sidebar-brand" onClick={() => setOpen(false)}>
          <span className="brand-icon"><Heart size={19} strokeWidth={2.3} /></span>
          <span className="brand-copy"><strong>het dhuran</strong><small>Special Needs Centre</small></span>
        </a>
        <nav className="sidebar-nav">
          {navItems.map(({ href, key }) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}>
              {t(key)}
              {href.startsWith('mailto') ? <ArrowUpRight size={15} /> : null}
            </Link>
          ))}
          <a className="nav-donate sidebar-cta" href="mailto:info@hetdhuran.org" onClick={() => setOpen(false)}>
            Contact us <ArrowUpRight size={15} />
          </a>
        </nav>
      </aside>
    </>
  )
}