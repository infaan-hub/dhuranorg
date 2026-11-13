'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, User, Shield, LogOut, Heart, Home, Users, Phone } from 'lucide-react'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-20 w-full">
      <div className="p-4 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary" />
            <Link
              href="/"
              className="font-semibold text-primary tracking-tight"
            >
              Dhuran Supporting Organization
            </Link>
          </div>

          <div className="flex items-center gap-1 w-full lg:w-auto justify-center lg:justify-end">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full bg-primary text-white"
              aria-label="Menyu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <nav
              id="mobile-menu"
              className={`lg:hidden mt-4 flex flex-col gap-1 p-3 bg-card rounded-xl shadow-md border border-border ${
                mobileMenuOpen ? 'block' : 'hidden'
              }`}
            >
              <Link href="/" className="block px-3 py-2 rounded-lg hover:bg-muted">
                <Home className="w-4 h-4 mr-2" /> Nyumbani
              </Link>
              <Link href="/leadership" className="block px-3 py-2 rounded-lg hover:bg-muted">
                <Users className="w-4 h-4 mr-2" /> Uongozi
              </Link>
              <Link href="/donate" className="block px-3 py-2 rounded-lg hover:bg-muted">
                <Heart className="w-4 h-4 mr-2" /> Mchangiaji
              </Link>
              <Link href="/contact" className="block px-3 py-2 rounded-lg hover:bg-muted">
                <Phone className="w-4 h-4 mr-2" /> Wasiliana
              </Link>
              <Link href="/login" className="block px-3 py-2 rounded-lg hover:bg-muted">
                <User className="w-4 h-4 mr-2" /> Mzazi
              </Link>
              <Link href="/admin" className="block px-3 py-2 rounded-lg hover:bg-muted">
                <Shield className="w-4 h-4 mr-2" /> Msimamizi
              </Link>
            </nav>

            <div className="flex items-center gap-2">
              <Link href="/login">
                <button className="px-4 py-2 text-sm font-medium rounded-full border border-border hover:bg-muted">
                  <User className="w-4 h-4 mr-2" /> Mzazi
                </button>
              </Link>
              <Link href="/admin">
                <button className="px-4 py-2 text-sm font-medium rounded-full bg-primary text-white hover:bg-primary/90">
                  <Shield className="w-4 h-4 mr-2" /> Msimamizi
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}