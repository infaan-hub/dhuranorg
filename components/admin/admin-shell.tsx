'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const links = [
  { href: '/admin/dashboard', label: 'Dashboard' },
  { href: '/admin/editor', label: 'Home editor' },
  { href: '/admin/gallery', label: 'Gallery' },
  { href: '/admin/news', label: 'News' },
]

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
    router.refresh()
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', minHeight: '100vh' }}>
      <aside style={{ background: 'var(--dark)', color: 'var(--paper)', padding: '24px 16px' }}>
        <div style={{ fontWeight: 700, fontSize: '18px', marginBottom: '20px' }}>Admin</div>
        <nav style={{ display: 'grid', gap: '6px' }}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                padding: '10px 12px',
                borderRadius: '9px',
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
          style={{ marginTop: '24px', padding: '10px 12px', borderRadius: '9px', border: '1px solid var(--paper)', background: 'transparent', color: 'var(--paper)', cursor: 'pointer', width: '100%' }}
        >
          Logout
        </button>
      </aside>
      <main style={{ padding: '28px', background: 'var(--paper)' }}>{children}</main>
    </div>
  )
}