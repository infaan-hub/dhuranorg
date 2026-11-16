'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function ResetForm() {
  const params = useSearchParams()
  const token = params.get('token') || ''
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('')
    const res = await fetch('/api/auth/reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password }),
    })
    const data = await res.json().catch(() => ({}))
    setStatus(res.ok ? 'Password reset. You can now sign in.' : (data.error || 'Failed'))
  }

  return (
    <div className="site-shell">
      <section className="work-section container" style={{ maxWidth: '480px' }}>
        <div className="section-heading">
          <div>
            <p className="eyebrow">Admin</p>
            <h2>Reset password</h2>
          </div>
        </div>
        <form onSubmit={submit} style={{ display: 'grid', gap: '12px' }}>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New password (min 4 chars)" style={inputStyle} />
          <button type="submit" className="button button-accent" style={{ justifySelf: 'start' }}>Reset password</button>
          {status && <p style={{ color: 'var(--muted-ink)', margin: 0 }}>{status}</p>}
        </form>
      </section>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="site-shell"><section className="work-section container"><p>Loading…</p></section></div>}>
      <ResetForm />
    </Suspense>
  )
}

const inputStyle: React.CSSProperties = {
  padding: '12px 14px',
  border: '1px solid var(--line)',
  borderRadius: '9px',
  background: 'var(--surface)',
  color: 'var(--ink)',
  width: '100%',
}