'use client'

import { useEffect, useState } from 'react'

type M = { id: string; name: string; url: string }

export default function AdminMediaPage() {
  const [items, setItems] = useState<M[]>([])
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [status, setStatus] = useState('')

  useEffect(() => {
    fetch('/api/media').then((r) => r.json()).then(setItems)
  }, [])

  async function uploadFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (!f) return
    const r = new FileReader()
    r.onload = async () => {
      const dataUrl = String(r.result)
      const res = await fetch('/api/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: f.name, url: dataUrl }),
      })
      if (res.ok) {
        const item = await res.json()
        setItems((prev) => [item, ...prev])
        setStatus('Uploaded')
      } else setStatus('Upload failed')
    }
    r.readAsDataURL(f)
  }

  async function addUrl(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/media', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, url }),
    })
    if (res.ok) {
      const item = await res.json()
      setItems((prev) => [item, ...prev])
      setName(''); setUrl('')
      setStatus('Added')
    } else setStatus('Add failed')
  }

  async function remove(id: string) {
    const res = await fetch('/api/media', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    if (res.ok) setItems((prev) => prev.filter((m) => m.id !== id))
  }

  function copy(url: string) {
    navigator.clipboard?.writeText(url)
    setStatus('URL copied')
  }

  return (
    <div>
      <h1 style={{ font: '500 28px/1.2 var(--font-heading)', margin: '0 0 20px' }}>Media library</h1>
      <div style={{ display: 'grid', gap: '12px', marginBottom: '20px' }}>
        <input type="file" accept="image/*" onChange={uploadFile} />
        <form onSubmit={addUrl} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr auto', gap: '8px' }}>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" style={inputStyle} />
          <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Image URL" style={inputStyle} />
          <button type="submit" className="button button-accent">Add URL</button>
        </form>
      </div>
      {status && <p style={{ color: 'var(--muted-ink)', marginBottom: '12px' }}>{status}</p>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '12px' }}>
        {items.map((m) => (
          <div key={m.id} style={{ border: '1px solid var(--line)', borderRadius: '9px', padding: '8px', background: 'var(--surface)' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={m.url} alt={m.name} style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '6px' }} />
            <p style={{ margin: '6px 0', fontSize: '12px', color: 'var(--muted-ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.name}</p>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button onClick={() => copy(m.url)} style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid var(--line)', background: 'transparent', color: 'var(--ink)', cursor: 'pointer', fontSize: '12px' }}>Copy URL</button>
              <button onClick={() => remove(m.id)} style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid var(--line)', background: 'transparent', color: 'var(--ink)', cursor: 'pointer', fontSize: '12px' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  padding: '10px 12px',
  border: '1px solid var(--line)',
  borderRadius: '9px',
  background: 'var(--surface)',
  color: 'var(--ink)',
}