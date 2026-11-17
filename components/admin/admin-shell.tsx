'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LogOut, PanelLeftClose, PanelLeftOpen } from 'lucide-react'

const links = [
  { href: '/admin/dashboard', label: 'Dashboard' },
  { href: '/admin/editor', label: 'Home editor' },
  { href: '/admin/gallery', label: 'Gallery' },
  { href: '/admin/news', label: 'News' },
  { href: '/admin/events', label: 'Events' },
  { href: '/admin/media', label: 'Media' },
]

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(true)

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
    router.refresh()
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: open ? '220px 1fr' : '64px 1fr',
        minHeight: '100vh',
        transition: 'grid-template-columns .2s ease',
      }}
    >
      <aside
        style={{
          background: 'var(--dark)',
          color: 'var(--paper)',
          padding: open ? '24px 16px' : '16px 10px',
          overflow: 'hidden',
          transition: 'padding .2s ease',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: open ? 'space-between' : 'center',
            gap: '8px',
            marginBottom: open ? '20px' : 0,
          }}
        >
          {open && <div style={{ fontWeight: 700, fontSize: '18px', whiteSpace: 'nowrap' }}>Admin</div>}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? 'Close sidebar' : 'Open sidebar'}
            aria-expanded={open}
            title={open ? 'Close sidebar' : 'Open sidebar'}
            style={{
              display: 'grid',
              placeItems: 'center',
              flex: '0 0 auto',
              width: '34px',
              height: '34px',
              padding: 0,
              borderRadius: '8px',
              border: '1px solid rgba(243, 238, 232, .35)',
              background: 'transparent',
              color: 'var(--paper)',
              cursor: 'pointer',
            }}
          >
            {open ? <PanelLeftClose size={17} /> : <PanelLeftOpen size={17} />}
          </button>
        </div>

        {open && (
          <>
            <nav style={{ display: 'grid', gap: '6px' }}>
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '9px',
                    whiteSpace: 'nowrap',
                    color: pathname === l.href ? 'var(--dark)' : 'var(--paper)',
                    background: pathname === l.href ? 'var(--paper)' : 'transparent',
                  }}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <button
              onClick={logout}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                marginTop: '20px',
                padding: '7px 12px',
                borderRadius: '8px',
                border: '1px solid var(--paper)',
                background: 'transparent',
                color: 'var(--paper)',
                cursor: 'pointer',
                fontSize: '13px',
              }}
            >
              <LogOut size={14} /> Logout
            </button>
          </>
        )}
      </aside>
      <main style={{ padding: '28px', background: 'var(--paper)', minWidth: 0 }}>{children}</main>
    </div>
  )
}
