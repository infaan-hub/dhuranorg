'use client'

import { useState } from 'react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [token, setToken] = useState('')
  const [status, setStatus] = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('')
    const res = await fetch('/api/auth/forgot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    const data = await res.json().catch(() => ({}))
    if (res.ok) {
      setStatus('If the email exists, a reset link was generated.')
      if (data.token) setToken(data.token)
    } else setStatus(data.error || 'Failed')
  }

  return (
    <div className="site-shell">
      <section className="work-section container" style={{ maxWidth: '480px' }}>
        <div className="section-heading">
          <div>
            <p className="eyebrow">Admin</p>
            <h2>Forgot password</h2>
          </div>
        </div>
        <form onSubmit={submit} style={{ display: 'grid', gap: '12px' }}>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" style={inputStyle} />
          <button type="submit" className="button button-accent" style={{ justifySelf: 'start' }}>Send reset link</button>
          {status && <p style={{ color: 'var(--muted-ink)', margin: 0 }}>{status}</p>}
          {token && (
            <p style={{ color: 'var(--muted-ink)', margin: 0, fontSize: '13px', wordBreak: 'break-all' }}>
              Reset token (demo): {token}<br />
              Use it at <a href={`/reset-password?token=${token}`} style={{ color: 'var(--clay)' }}>/reset-password</a>
            </p>
          )}
        </form>
      </section>
    </div>
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