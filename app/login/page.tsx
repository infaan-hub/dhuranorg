'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function LoginForm() {
  const router = useRouter()
  const params = useSearchParams()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    setLoading(false)
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      setError(data.error || 'Login failed')
      return
    }
    const next = params.get('next') || '/admin/dashboard'
    router.push(next)
    router.refresh()
  }

  return (
    <div className="site-shell">
      <section className="work-section container" style={{ maxWidth: '480px' }}>
        <div className="section-heading">
          <div>
            <p className="eyebrow">Admin</p>
            <h2>Login</h2>
          </div>
        </div>
        <form onSubmit={submit} style={{ display: 'grid', gap: '14px' }}>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            style={{ padding: '12px 14px', border: '1px solid var(--line)', borderRadius: '9px', background: 'var(--surface)', color: 'var(--ink)' }}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            style={{ padding: '12px 14px', border: '1px solid var(--line)', borderRadius: '9px', background: 'var(--surface)', color: 'var(--ink)' }}
          />
          {error && <p style={{ color: 'var(--destructive, #c0392b)', margin: 0 }}>{error}</p>}
          <button type="submit" className="button button-accent" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
        <p style={{ marginTop: '16px', fontSize: '14px', color: 'var(--muted-ink)' }}>
          No account? <a href="/register" style={{ color: 'var(--clay)' }}>Register</a>
        </p>
      </section>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="site-shell"><section className="work-section container"><p>Loading…</p></section></div>}>
      <LoginForm />
    </Suspense>
  )
}