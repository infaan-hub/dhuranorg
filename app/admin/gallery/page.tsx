'use client'

import { useEffect, useState } from 'react'

type Item = { id: string; label: string; category: string; image: string }

export default function AdminGalleryPage() {
  const [items, setItems] = useState<Item[]>([])
  const [label, setLabel] = useState('')
  const [category, setCategory] = useState('')
  const [image, setImage] = useState('')
  const [status, setStatus] = useState('')

  useEffect(() => {
    fetch('/api/gallery').then((r) => r.json()).then(setItems)
  }, [])

  async function add(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/gallery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ label, category, image }),
    })
    if (res.ok) {
      const item = await res.json()
      setItems((prev) => [...prev, item])
      setLabel(''); setCategory(''); setImage('')
      setStatus('Added')
    } else setStatus('Add failed')
  }

  async function remove(id: string) {
    const res = await fetch('/api/gallery', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    if (res.ok) setItems((prev) => prev.filter((i) => i.id !== id))
  }

  async function updateItem(id: string, field: keyof Item, value: string) {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, [field]: value } : i)))
  }

  async function saveAll() {
    const res = await fetch('/api/gallery', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(items),
    })
    setStatus(res.ok ? 'Saved' : 'Save failed')
  }

  return (
    <div>
      <h1 style={{ font: '500 28px/1.2 var(--font-heading)', margin: '0 0 20px' }}>Gallery management</h1>

      <form onSubmit={add} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '8px', marginBottom: '20px' }}>
        <input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Label" style={inputStyle} />
        <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" style={inputStyle} />
        <input value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image URL" style={inputStyle} />
        <button type="submit" className="button button-accent">Add</button>
      </form>

      <div style={{ display: 'grid', gap: '10px' }}>
        {items.map((item) => (
          <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '8px', alignItems: 'center' }}>
            <input value={item.label} onChange={(e) => updateItem(item.id, 'label', e.target.value)} style={inputStyle} />
            <input value={item.category} onChange={(e) => updateItem(item.id, 'category', e.target.value)} style={inputStyle} />
            <input value={item.image} onChange={(e) => updateItem(item.id, 'image', e.target.value)} style={inputStyle} />
            <button onClick={() => remove(item.id)} style={{ padding: '10px 12px', borderRadius: '9px', border: '1px solid var(--line)', background: 'transparent', color: 'var(--ink)', cursor: 'pointer' }}>Delete</button>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '12px', marginTop: '16px', alignItems: 'center' }}>
        <button onClick={saveAll} className="button button-accent">Save all changes</button>
        {status && <span style={{ color: 'var(--muted-ink)' }}>{status}</span>}
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