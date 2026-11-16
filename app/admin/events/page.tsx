'use client'

import { useEffect, useState } from 'react'

type Ev = { id: string; title: string; date: string; text: string }

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Ev[]>([])
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [text, setText] = useState('')
  const [status, setStatus] = useState('')

  useEffect(() => {
    fetch('/api/events').then((r) => r.json()).then(setEvents)
  }, [])

  async function add(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, date, text }),
    })
    if (res.ok) {
      const item = await res.json()
      setEvents((prev) => [item, ...prev])
      setTitle(''); setDate(''); setText('')
      setStatus('Added')
    } else setStatus('Failed')
  }

  async function remove(id: string) {
    const res = await fetch('/api/events', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    if (res.ok) setEvents((prev) => prev.filter((ev) => ev.id !== id))
  }

  return (
    <div>
      <h1 style={{ font: '500 28px/1.2 var(--font-heading)', margin: '0 0 20px' }}>Events management</h1>
      <form onSubmit={add} style={{ display: 'grid', gap: '8px', marginBottom: '20px' }}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" style={inputStyle} />
        <input value={date} onChange={(e) => setDate(e.target.value)} placeholder="Date" style={inputStyle} />
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Description" rows={3} style={inputStyle} />
        <button type="submit" className="button button-accent" style={{ justifySelf: 'start' }}>Add event</button>
      </form>
      <div style={{ display: 'grid', gap: '12px' }}>
        {events.map((ev) => (
          <div key={ev.id} style={{ border: '1px solid var(--line)', borderRadius: '9px', padding: '12px', background: 'var(--surface)' }}>
            <strong>{ev.title}</strong>
            {ev.date && <p style={{ margin: '4px 0', fontSize: '13px', color: 'var(--muted-ink)' }}>{ev.date}</p>}
            <p style={{ margin: '4px 0', color: 'var(--muted-ink)' }}>{ev.text}</p>
            <button onClick={() => remove(ev.id)} style={{ marginTop: '6px', padding: '6px 10px', borderRadius: '9px', border: '1px solid var(--line)', background: 'transparent', color: 'var(--ink)', cursor: 'pointer' }}>Delete</button>
          </div>
        ))}
      </div>
      {status && <p style={{ color: 'var(--muted-ink)', marginTop: '12px' }}>{status}</p>}
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  padding: '10px 12px',
  border: '1px solid var(--line)',
  borderRadius: '9px',
  background: 'var(--surface)',
  color: 'var(--ink)',
  width: '100%',
}