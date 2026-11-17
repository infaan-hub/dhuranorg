'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Eye, Plus, Save, Trash2 } from 'lucide-react'
import { ImageField } from '@/components/admin/image-field'

type Post = {
  id: string
  title: string
  date: string
  text: string
  status: string
  image: string
}

export default function AdminNewsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [text, setText] = useState('')
  const [postStatus, setPostStatus] = useState('published')
  const [image, setImage] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(true)
  const [savingId, setSavingId] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/news')
      .then((r) => r.json())
      .then((data) => {
        setPosts(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(() => {
        setStatus('Failed to load articles')
        setLoading(false)
      })
  }, [])

  async function add(e: React.FormEvent) {
    e.preventDefault()
    setStatus('Posting article...')
    const res = await fetch('/api/news', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, date, text, status: postStatus, image }),
    })
    if (res.ok) {
      const item = await res.json()
      setPosts((prev) => [item, ...prev])
      setTitle(''); setDate(''); setText(''); setImage(''); setPostStatus('published')
      setStatus('Article posted')
    } else setStatus('Post failed')
  }

  function updatePost(id: string, field: keyof Post, value: string) {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)))
  }

  async function savePost(post: Post) {
    setSavingId(post.id)
    setStatus('Saving...')
    const res = await fetch('/api/news', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    })
    setSavingId(null)
    setStatus(res.ok ? `Saved "${post.title}"` : 'Save failed')
  }

  async function remove(post: Post) {
    if (!confirm(`Delete "${post.title}"? This cannot be undone.`)) return
    const res = await fetch('/api/news', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: post.id }),
    })
    if (res.ok) {
      setPosts((prev) => prev.filter((p) => p.id !== post.id))
      setStatus('Article deleted')
    } else {
      setStatus('Delete failed')
    }
  }

  return (
    <div style={{ maxWidth: '1080px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ font: '500 28px/1.2 var(--font-heading)', margin: '0 0 8px' }}>News management</h1>
        <p style={{ margin: 0, color: 'var(--muted-ink)', fontSize: '15px' }}>
          Post, edit and delete articles, and upload the image shown on each article page.
        </p>
      </div>

      {/* New article */}
      <section style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px', padding: '24px', marginBottom: '36px' }}>
        <h2 style={{ font: '500 20px/1.2 var(--font-heading)', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={20} /> Post a new article
        </h2>

        <form onSubmit={add} style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '24px' }}>
          <ImageField
            label="Article image"
            value={image}
            onChange={setImage}
            onError={setStatus}
            previewHeight={160}
          />

          <div style={{ display: 'grid', gap: '10px' }}>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" style={inputStyle} required />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <input value={date} onChange={(e) => setDate(e.target.value)} placeholder="Date (e.g. 2026 or 2026-12-05)" style={inputStyle} />
              <select value={postStatus} onChange={(e) => setPostStatus(e.target.value)} style={inputStyle}>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Article text" rows={4} style={inputStyle} />
            <button type="submit" className="button button-accent" style={{ justifySelf: 'start' }}>
              <Plus size={16} /> Post article
            </button>
          </div>
        </form>
      </section>

      {/* Existing articles */}
      <section>
        <div style={{ marginBottom: '16px' }}>
          <h2 style={{ font: '500 22px/1.2 var(--font-heading)', margin: '0 0 4px' }}>
            Articles ({posts.length})
          </h2>
          <p style={{ margin: 0, color: 'var(--muted-ink)', fontSize: '14px' }}>
            Edit any field and press Save changes on that article to publish the update.
          </p>
        </div>

        {status && (
          <p style={{ color: 'var(--ink)', background: 'var(--surface)', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '13px', marginBottom: '16px' }}>
            {status}
          </p>
        )}

        {loading ? (
          <p style={{ color: 'var(--muted-ink)' }}>Loading articles...</p>
        ) : posts.length === 0 ? (
          <p style={{ color: 'var(--muted-ink)' }}>No articles yet. Post one above.</p>
        ) : (
          <div style={{ display: 'grid', gap: '16px' }}>
            {posts.map((post) => (
              <article
                key={post.id}
                style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '10px', padding: '16px' }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '16px' }}>
                  <ImageField
                    label="Article image"
                    value={post.image || ''}
                    onChange={(value) => updatePost(post.id, 'image', value)}
                    onError={setStatus}
                    previewHeight={150}
                  />

                  <div style={{ display: 'grid', gap: '8px' }}>
                    <label style={labelStyle}>
                      Title
                      <input value={post.title} onChange={(e) => updatePost(post.id, 'title', e.target.value)} style={{ ...inputStyle, marginTop: '3px', fontWeight: 600 }} />
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      <label style={labelStyle}>
                        Date
                        <input value={post.date || ''} onChange={(e) => updatePost(post.id, 'date', e.target.value)} style={{ ...inputStyle, marginTop: '3px' }} />
                      </label>
                      <label style={labelStyle}>
                        Status
                        <select value={post.status || 'published'} onChange={(e) => updatePost(post.id, 'status', e.target.value)} style={{ ...inputStyle, marginTop: '3px' }}>
                          <option value="published">Published</option>
                          <option value="draft">Draft</option>
                        </select>
                      </label>
                    </div>
                    <label style={labelStyle}>
                      Article text
                      <textarea value={post.text || ''} onChange={(e) => updatePost(post.id, 'text', e.target.value)} rows={3} style={{ ...inputStyle, marginTop: '3px' }} />
                    </label>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '14px', flexWrap: 'wrap' }}>
                  <button type="button" onClick={() => savePost(post)} disabled={savingId === post.id} className="button button-accent" style={{ minHeight: '40px', padding: '0 16px', fontSize: '14px' }}>
                    <Save size={15} /> {savingId === post.id ? 'Saving...' : 'Save changes'}
                  </button>
                  <Link
                    href={`/news/${post.id}`}
                    target="_blank"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '9px 14px', borderRadius: '9px', border: '1px solid var(--line)', background: 'var(--paper)', color: 'var(--ink)', fontSize: '13px', fontWeight: 600 }}
                  >
                    <Eye size={15} /> View article
                  </Link>
                  <button
                    type="button"
                    onClick={() => remove(post)}
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
