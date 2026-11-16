'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Heart, Menu, X } from 'lucide-react'

const navItems = [
  { href: '/about', label: 'About' },
  { href: '/programs', label: 'Programmes' },
  { href: '/news', label: 'News' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/resources', label: 'Resources' },
  { href: 'mailto:info@hetdhuran.org', label: 'Contact us' },
]

export function Header() {
  const [open, setOpen] = useState(false)

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

          <span className="header-spacer" aria-hidden="true" />

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
          {navItems.map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}>
              {label}
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