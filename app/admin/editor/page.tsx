'use client'

import { useEffect, useState } from 'react'

export default function EditorPage() {
  const [json, setJson] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/home')
      .then((r) => r.json())
      .then((d) => { setJson(JSON.stringify(d, null, 2)); setLoading(false) })
      .catch(() => { setStatus('Failed to load'); setLoading(false) })
  }, [])

  async function save() {
    setStatus('')
    let parsed: any
    try {
      parsed = JSON.parse(json)
    } catch {
      setStatus('Invalid JSON')
      return
    }
    const res = await fetch('/api/home', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsed),
    })
    if (res.ok) setStatus('Saved. Refresh home page to see changes.')
    else setStatus('Save failed')
  }

  return (
    <div>
      <h1 style={{ font: '500 28px/1.2 var(--font-heading)', margin: '0 0 20px' }}>Home editor</h1>
      <p style={{ color: 'var(--muted-ink)', marginBottom: '16px' }}>
        Edit the full home page content as JSON. Change any text, images or sections.
      </p>
      {loading ? (
        <p>Loading…</p>
      ) : (
        <>
          <textarea
            value={json}
            onChange={(e) => setJson(e.target.value)}
            rows={28}
            style={{
              width: '100%',
              fontFamily: 'monospace',
              fontSize: '13px',
              padding: '14px',
              border: '1px solid var(--line)',
              borderRadius: '9px',
              background: 'var(--surface)',
              color: 'var(--ink)',
            }}
          />
          <div style={{ display: 'flex', gap: '12px', marginTop: '12px', alignItems: 'center' }}>
            <button onClick={save} className="button button-accent">Save changes</button>
            {status && <span style={{ color: 'var(--muted-ink)' }}>{status}</span>}
          </div>
          <h2 style={{ font: '500 20px/1.2 var(--font-heading)', margin: '28px 0 12px' }}>Preview</h2>
          <iframe src="/" style={{ width: '100%', height: '600px', border: '1px solid var(--line)', borderRadius: '9px' }} />
        </>
      )}
    </div>
  )
}