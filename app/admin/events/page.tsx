'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Eye, Plus, Save, Trash2 } from 'lucide-react'
import { ImageField } from '@/components/admin/image-field'

type Ev = {
  id: string
  title: string
  date: string
  text: string
  image: string
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Ev[]>([])
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [text, setText] = useState('')
  const [image, setImage] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(true)
  const [savingId, setSavingId] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/events')
      .then((r) => r.json())
      .then((data) => {
        setEvents(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(() => {
        setStatus('Failed to load events')
        setLoading(false)
      })
  }, [])

  async function add(e: React.FormEvent) {
    e.preventDefault()
    setStatus('Adding event...')
    const res = await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, date, text, image }),
    })
    if (res.ok) {
      const item = await res.json()
      setEvents((prev) => [item, ...prev])
      setTitle(''); setDate(''); setText(''); setImage('')
      setStatus('Event added')
    } else setStatus('Failed to add event')
  }

  function updateEvent(id: string, field: keyof Ev, value: string) {
    setEvents((prev) => prev.map((ev) => (ev.id === id ? { ...ev, [field]: value } : ev)))
  }

  async function saveEvent(ev: Ev) {
    setSavingId(ev.id)
    setStatus('Saving...')
    const res = await fetch('/api/events', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ev),
    })
    setSavingId(null)
    setStatus(res.ok ? `Saved "${ev.title}"` : 'Save failed')
  }

  async function remove(ev: Ev) {
    if (!confirm(`Delete "${ev.title}"? This cannot be undone.`)) return
    const res = await fetch('/api/events', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: ev.id }),
    })
    if (res.ok) {
      setEvents((prev) => prev.filter((item) => item.id !== ev.id))
      setStatus('Event deleted')
    } else {
      setStatus('Delete failed')
    }
  }

  return (
    <div style={{ maxWidth: '1080px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ font: '500 28px/1.2 var(--font-heading)', margin: '0 0 8px' }}>Events management</h1>
        <p style={{ margin: 0, color: 'var(--muted-ink)', fontSize: '15px' }}>
          Add, edit and delete events, and upload the image shown on each event page.
        </p>
      </div>

      {/* New event */}
      <section style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px', padding: '24px', marginBottom: '36px' }}>
        <h2 style={{ font: '500 20px/1.2 var(--font-heading)', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={20} /> Add a new event
        </h2>

        <form onSubmit={add} style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '24px' }}>
          <ImageField
            label="Event image"
            value={image}
            onChange={setImage}
            onError={setStatus}
            previewHeight={160}
          />

          <div style={{ display: 'grid', gap: '10px' }}>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" style={inputStyle} required />
            <input value={date} onChange={(e) => setDate(e.target.value)} placeholder="Date (e.g. 2026-12-05)" style={inputStyle} />
            <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Description" rows={4} style={inputStyle} />
            <button type="submit" className="button button-accent" style={{ justifySelf: 'start' }}>
              <Plus size={16} /> Add event
            </button>
          </div>
        </form>
      </section>

      {/* Existing events */}
      <section>
        <div style={{ marginBottom: '16px' }}>
          <h2 style={{ font: '500 22px/1.2 var(--font-heading)', margin: '0 0 4px' }}>
            Events ({events.length})
          </h2>
          <p style={{ margin: 0, color: 'var(--muted-ink)', fontSize: '14px' }}>
            Edit any field and press Save changes on that event to publish the update.
          </p>
        </div>

        {status && (
          <p style={{ color: 'var(--ink)', background: 'var(--surface)', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '13px', marginBottom: '16px' }}>
            {status}
          </p>
        )}

        {loading ? (
          <p style={{ color: 'var(--muted-ink)' }}>Loading events...</p>
        ) : events.length === 0 ? (
          <p style={{ color: 'var(--muted-ink)' }}>No events yet. Add one above.</p>
        ) : (
          <div style={{ display: 'grid', gap: '16px' }}>
            {events.map((ev) => (
              <article
                key={ev.id}
                style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '10px', padding: '16px' }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '16px' }}>
                  <ImageField
                    label="Event image"
                    value={ev.image || ''}
                    onChange={(value) => updateEvent(ev.id, 'image', value)}
                    onError={setStatus}
                    previewHeight={150}
                  />

                  <div style={{ display: 'grid', gap: '8px' }}>
                    <label style={labelStyle}>
                      Title
                      <input value={ev.title} onChange={(e) => updateEvent(ev.id, 'title', e.target.value)} style={{ ...inputStyle, marginTop: '3px', fontWeight: 600 }} />
                    </label>
                    <label style={labelStyle}>
                      Date
                      <input value={ev.date || ''} onChange={(e) => updateEvent(ev.id, 'date', e.target.value)} style={{ ...inputStyle, marginTop: '3px' }} />
                    </label>
                    <label style={labelStyle}>
                      Description
                      <textarea value={ev.text || ''} onChange={(e) => updateEvent(ev.id, 'text', e.target.value)} rows={3} style={{ ...inputStyle, marginTop: '3px' }} />
                    </label>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '14px', flexWrap: 'wrap' }}>
                  <button type="button" onClick={() => saveEvent(ev)} disabled={savingId === ev.id} className="button button-accent" style={{ minHeight: '40px', padding: '0 16px', fontSize: '14px' }}>
                    <Save size={15} /> {savingId === ev.id ? 'Saving...' : 'Save changes'}
                  </button>
                  <Link
                    href={`/event/${ev.id}`}
                    target="_blank"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '9px 14px', borderRadius: '9px', border: '1px solid var(--line)', background: 'var(--paper)', color: 'var(--ink)', fontSize: '13px', fontWeight: 600 }}
                  >
                    <Eye size={15} /> View event
                  </Link>
                  <button
                    type="button"
                    onClick={() => remove(ev)}
                    style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '9px 14px', borderRadius: '9px', border: '1px solid #e57373', background: 'transparent', color: '#d32f2f', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}
                  >
                    <Trash2 size={15} /> Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '13px',
  fontWeight: 600,
  color: 'var(--ink)',
}

const inputStyle: React.CSSProperties = {
  padding: '10px 12px',
  border: '1px solid var(--line)',
  borderRadius: '9px',
  background: 'var(--surface)',
  color: 'var(--ink)',
  width: '100%',
  fontFamily: 'inherit',
  fontSize: '14px',
}
