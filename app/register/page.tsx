'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, email, username, password }),
    })
    setLoading(false)
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      setError(data.error || 'Registration failed')
      return
    }
    router.push('/admin/dashboard')
    router.refresh()
  }

  return (
    <div className="site-shell">
      <section className="work-section container" style={{ maxWidth: '480px' }}>
        <div className="section-heading">
          <div>
            <p className="eyebrow">Admin</p>
            <h2>Register</h2>
          </div>
        </div>
        <form onSubmit={submit} style={{ display: 'grid', gap: '14px' }}>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full name"
            style={{ padding: '12px 14px', border: '1px solid var(--line)', borderRadius: '9px', background: 'var(--surface)', color: 'var(--ink)' }}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            style={{ padding: '12px 14px', border: '1px solid var(--line)', borderRadius: '9px', background: 'var(--surface)', color: 'var(--ink)' }}
          />
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
            placeholder="Password (min 4 chars)"
            style={{ padding: '12px 14px', border: '1px solid var(--line)', borderRadius: '9px', background: 'var(--surface)', color: 'var(--ink)' }}
          />
          {error && <p style={{ color: 'var(--destructive, #c0392b)', margin: 0 }}>{error}</p>}
          <button type="submit" className="button button-accent" disabled={loading}>
            {loading ? 'Creating…' : 'Create account'}
          </button>
        </form>
        <p style={{ marginTop: '16px', fontSize: '14px', color: 'var(--muted-ink)' }}>
          Already have an account? <a href="/login" style={{ color: 'var(--clay)' }}>Sign in</a>
        </p>
      </section>
    </div>
  )
}