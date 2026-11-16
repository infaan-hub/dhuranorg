'use client'

import { useState } from 'react'
import { Breadcrumbs } from '@/components/breadcrumbs'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('')
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    })
    if (res.ok) { setStatus('Message sent. We will get back to you.'); setName(''); setEmail(''); setMessage('') }
    else { const d = await res.json().catch(() => ({})); setStatus(d.error || 'Failed to send') }
  }

  return (
    <div className="site-shell">
      <section className="work-section container" style={{ maxWidth: '640px' }}>
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />
        <div className="section-heading">
          <div>
            <p className="eyebrow">Contact</p>
            <h2>Get in touch.</h2>
          </div>
        </div>
        <form onSubmit={submit} style={{ display: 'grid', gap: '12px' }}>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" style={inputStyle} />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" style={inputStyle} />
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message" rows={5} style={inputStyle} />
          <button type="submit" className="button button-accent" style={{ justifySelf: 'start' }}>Send message</button>
          {status && <p style={{ color: 'var(--muted-ink)', margin: 0 }}>{status}</p>}
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