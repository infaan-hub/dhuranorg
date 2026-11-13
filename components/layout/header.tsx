'use client'

import { useState } from 'react'
import Link from 'next/link'
import { X, Menu, User, Shield, LogOut, Heart, Home, Users, Phone } from 'lucide-react'

export function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-20 w-full">
        <div className="p-4 bg-card border-b border-border">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary" />
              <Link
                href="/"
                className="font-semibold text-primary tracking-tight"
              >

              </Link>
            </div>

            <div className="flex items-center gap-1 w-full lg:w-auto justify-center lg:justify-end">
              <button
                onClick={() => setSidebarOpen((prev) => !prev)}
                className="lg:hidden p-2 rounded-full bg-primary text-white"
                aria-expanded={sidebarOpen}
                aria-label="Toggle navigation menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2">
                <Link href="/login">
                  <button className="px-4 py-2 text-sm font-medium rounded-full border border-border hover:bg-muted">
                    <User className="w-4 h-4 mr-2" />
                  </button>
                </Link>
                <Link href="/admin">
                  <button className="px-4 py-2 text-sm font-medium rounded-full bg-primary text-white hover:bg-primary/90">
                    <Shield className="w-4 h-4 mr-2" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-card transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Navigation sidebar"
      >
        <div className="p-4 flex justify-between items-center border-b border-border">
          <h2 className="text-sm font-semibold text-foreground"></h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 hover:bg-muted rounded-full"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="p-4 space-y-2" aria-label="Sidebar navigation">
          <Link
            href="/"
            className="block px-3 py-2 rounded-lg text-foreground hover:bg-muted hover:text-primary transition-colors"
          >
            <Home className="w-4 h-4 mr-2" />
          </Link>
          <Link
            href="/programs"
            className="block px-3 py-2 rounded-lg text-foreground hover:bg-muted hover:text-primary transition-colors"
          >
          </Link>
          <Link
            href="/health"
            className="block px-3 py-2 rounded-lg text-foreground hover:bg-muted hover:text-primary transition-colors"
          >
          </Link>
          <Link
            href="/women"
            className="block px-3 py-2 rounded-lg text-foreground hover:bg-muted hover:text-primary transition-colors"
          >
          </Link>
          <Link
            href="/support"
            className="block px-3 py-2 rounded-lg bg-primary text-white text-center font-medium hover:bg-primary/90 transition-colors"
          >
          </Link>
        </nav>
      </aside>

      {/* Sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  )
}