'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Heart, Menu, X } from 'lucide-react'

const navItems = [
  { href: '/#our-work', label: 'Our work' },
  { href: '/leadership', label: 'Our people' },
  { href: '/contact', label: 'Get in touch' },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="Het Dhuran Special Needs Centre home" onClick={() => setMenuOpen(false)}>
          <span className="brand-icon"><Heart size={19} strokeWidth={2.3} /></span>
          <span className="brand-copy"><strong>het dhuran</strong><small>Special Needs Centre</small></span>
        </Link>

        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>

        <nav className={`header-nav${menuOpen ? ' header-nav-open' : ''}`} aria-label="Main navigation">
          {navItems.map(({ href, label }) => <Link key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</Link>)}
          <Link className="nav-donate" href="/donate" onClick={() => setMenuOpen(false)}>Support us <ArrowUpRight size={15} /></Link>
        </nav>
      </div>
    </header>
  )
}
