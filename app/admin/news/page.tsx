'use client'

import { useEffect, useState } from 'react'

type Post = { id: string; title: string; date: string; text: string }

export default function AdminNewsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [text, setText] = useState('')
  const [status, setStatus] = useState('')

  useEffect(() => {
    fetch('/api/news').then((r) => r.json()).then(setPosts)
  }, [])

  async function add(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/news', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, date, text }),
    })
    if (res.ok) {
      const item = await res.json()
      setPosts((prev) => [item, ...prev])
      setTitle(''); setDate(''); setText('')
      setStatus('Posted')
    } else setStatus('Post failed')
  }

  async function remove(id: string) {
    const res = await fetch('/api/news', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    if (res.ok) setPosts((prev) => prev.filter((p) => p.id !== id))
  }

  async function updatePost(id: string, field: keyof Post, value: string) {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)))
  }

  async function saveAll() {
    const res = await fetch('/api/news', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(posts),
    })
    setStatus(res.ok ? 'Saved' : 'Save failed')
  }

  return (
    <div>
      <h1 style={{ font: '500 28px/1.2 var(--font-heading)', margin: '0 0 20px' }}>News management</h1>

      <form onSubmit={add} style={{ display: 'grid', gap: '8px', marginBottom: '20px' }}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" style={inputStyle} />
        <input value={date} onChange={(e) => setDate(e.target.value)} placeholder="Date (e.g. 2026)" style={inputStyle} />
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Article text" rows={4} style={inputStyle} />
        <button type="submit" className="button button-accent" style={{ justifySelf: 'start' }}>Post article</button>
      </form>

      <div style={{ display: 'grid', gap: '12px' }}>
        {posts.map((post) => (
          <div key={post.id} style={{ border: '1px solid var(--line)', borderRadius: '9px', padding: '12px', background: 'var(--surface)' }}>
            <input value={post.title} onChange={(e) => updatePost(post.id, 'title', e.target.value)} style={{ ...inputStyle, marginBottom: '6px', fontWeight: 600 }} />
            <input value={post.date} onChange={(e) => updatePost(post.id, 'date', e.target.value)} style={{ ...inputStyle, marginBottom: '6px' }} />
            <textarea value={post.text} onChange={(e) => updatePost(post.id, 'text', e.target.value)} rows={3} style={inputStyle} />
            <button onClick={() => remove(post.id)} style={{ marginTop: '6px', padding: '8px 10px', borderRadius: '9px', border: '1px solid var(--line)', background: 'transparent', color: 'var(--ink)', cursor: 'pointer' }}>Delete</button>
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
  width: '100%',
}