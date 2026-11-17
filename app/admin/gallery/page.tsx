'use client'

import { useEffect, useState } from 'react'
import { ImageIcon, Trash2, Upload, Plus, CheckCircle, RefreshCw } from 'lucide-react'

type Item = { id: string; label: string; category: string; description: string; image: string }

const DEFAULT_SECTIONS = [
  'Care within the community',
  'Health & wellbeing',
  'Our vision and mission',
  'Recent events',
  'General',
]

export default function AdminGalleryPage() {
  const [items, setItems] = useState<Item[]>([])
  const [label, setLabel] = useState('')
  const [category, setCategory] = useState(DEFAULT_SECTIONS[0])
  const [customCategory, setCustomCategory] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [status, setStatus] = useState('')
  const [filterSection, setFilterSection] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/gallery')
      .then((r) => r.json())
      .then((data) => {
        setItems(data)
        setLoading(false)
      })
      .catch(() => {
        setStatus('Failed to load gallery items')
        setLoading(false)
      })
  }, [])

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>, targetCallback: (url: string) => void) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      targetCallback(String(reader.result))
    }
    reader.onerror = () => {
      setStatus('Failed to read image file')
    }
    reader.readAsDataURL(file)
  }

  async function add(e: React.FormEvent) {
    e.preventDefault()
    const activeCategory = category === '__custom__' ? customCategory.trim() || 'General' : category
    if (!label.trim()) {
      setStatus('Please enter an image title/label')
      return
    }

    setStatus('Adding image...')
    const res = await fetch('/api/gallery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        label,
        category: activeCategory,
        description,
        image,
      }),
    })

    if (res.ok) {
      const item = await res.json()
      setItems((prev) => [...prev, item])
      setLabel('')
      setDescription('')
      setImage('')
      if (category === '__custom__') setCustomCategory('')
      setStatus('Added successfully to section "' + activeCategory + '"')
    } else {
      setStatus('Failed to add image')
    }
  }

  async function remove(id: string) {
    if (!confirm('Are you sure you want to delete this gallery item?')) return
    const res = await fetch('/api/gallery', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    if (res.ok) {
      setItems((prev) => prev.filter((i) => i.id !== id))
      setStatus('Item deleted')
    } else {
      setStatus('Failed to delete item')
    }
  }

  function updateItem(id: string, field: keyof Item, value: string) {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, [field]: value } : i)))
  }

  async function saveAll() {
    setStatus('Saving all changes...')
    const res = await fetch('/api/gallery', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(items),
    })
    setStatus(res.ok ? 'All gallery changes saved and published!' : 'Failed to save changes')
  }

  const existingSections = Array.from(new Set(items.map((i) => i.category).filter(Boolean)))
  const allSections = Array.from(new Set([...DEFAULT_SECTIONS, ...existingSections]))
  const displayedItems = filterSection === 'All' ? items : items.filter((i) => i.category === filterSection)

  return (
    <div style={{ maxWidth: '1100px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ font: '500 28px/1.2 var(--font-heading)', margin: '0 0 8px' }}>Gallery Management</h1>
        <p style={{ margin: 0, color: 'var(--muted-ink)', fontSize: '15px' }}>
          Add images to each specific section. These images and their descriptions are displayed on the home page Gallery section and the full Gallery page.
        </p>
      </div>

      {/* Add New Section Card */}
      <section style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px', padding: '24px', marginBottom: '36px' }}>
        <h2 style={{ font: '500 20px/1.2 var(--font-heading)', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={20} /> Add new image to a section
        </h2>

        <form onSubmit={add} style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px' }}>
          <div style={{ display: 'grid', gap: '14px' }}>
            <div>
              <label style={labelStyle}>Assign to Section</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={inputStyle}
              >
                {allSections.map((sec) => (
                  <option key={sec} value={sec}>
                    {sec}
                  </option>
                ))}
                <option value="__custom__">+ Enter custom section name...</option>
              </select>
              {category === '__custom__' && (
                <input
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  placeholder="Enter custom section name"
                  style={{ ...inputStyle, marginTop: '8px' }}
                />
              )}
            </div>

            <div>
              <label style={labelStyle}>Image Title / Label</label>
              <input
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="e.g. Physiotherapy & Mobility Session"
                style={inputStyle}
                required
              />
            </div>

            <div>
              <label style={labelStyle}>Description about this image</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what is shown in this photo and its importance to this section..."
                rows={3}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Image (Upload file or enter URL)</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '8px' }}>
                <input
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="Paste image URL (https://...)"
                  style={inputStyle}
                />
                <label style={{ ...buttonSecondaryStyle, display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                  <Upload size={16} /> Upload file
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, setImage)}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>
            </div>

            <button type="submit" className="button button-accent" style={{ justifySelf: 'start', marginTop: '6px' }}>
              <Plus size={16} /> Add to Section Gallery
            </button>
          </div>

          {/* Live Preview Box */}
          <div>
            <label style={labelStyle}>Live card preview</label>
            <div style={{ border: '1px solid var(--line)', borderRadius: '10px', background: 'var(--paper)', overflow: 'hidden' }}>
              <div style={{ height: '180px', background: 'rgba(0,0,0,0.05)', display: 'grid', placeItems: 'center', overflow: 'hidden', position: 'relative' }}>
                {image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ textAlign: 'center', color: 'var(--muted-ink)' }}>
                    <ImageIcon size={38} strokeWidth={1.5} style={{ margin: '0 auto 6px' }} />
                    <span style={{ fontSize: '13px' }}>Image preview</span>
                  </div>
                )}
                <span style={{ position: 'absolute', top: '8px', left: '8px', fontSize: '11px', fontWeight: 600, padding: '3px 8px', borderRadius: '6px', background: 'var(--paper)', color: 'var(--ink)', border: '1px solid var(--line)' }}>
                  {category === '__custom__' ? customCategory || 'Custom section' : category}
                </span>
              </div>
              <div style={{ padding: '16px' }}>
                <h3 style={{ margin: '0 0 6px', font: '500 18px/1.2 var(--font-heading)', color: 'var(--ink)' }}>
                  {label || 'Image title will appear here'}
                </h3>
                <p style={{ margin: 0, fontSize: '13px', color: 'var(--muted-ink)', lineHeight: '1.5' }}>
                  {description || 'Description about this photo will appear here...'}
                </p>
              </div>
            </div>
          </div>
        </form>
      </section>

      {/* Existing Gallery Items */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2 style={{ font: '500 22px/1.2 var(--font-heading)', margin: '0 0 4px' }}>
              Current Gallery Items ({items.length})
            </h2>
            <p style={{ margin: 0, color: 'var(--muted-ink)', fontSize: '14px' }}>
              Edit image descriptions, titles or assigned sections below.
            </p>
          </div>

          {/* Filter by section */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '13px', color: 'var(--muted-ink)' }}>Filter by section:</span>
            <select
              value={filterSection}
              onChange={(e) => setFilterSection(e.target.value)}
              style={{ ...inputStyle, width: 'auto', padding: '6px 12px' }}
            >
              <option value="All">All sections ({items.length})</option>
              {allSections.map((sec) => (
                <option key={sec} value={sec}>
                  {sec} ({items.filter((i) => i.category === sec).length})
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <p style={{ color: 'var(--muted-ink)' }}>Loading gallery items...</p>
        ) : displayedItems.length === 0 ? (
          <p style={{ color: 'var(--muted-ink)' }}>No gallery items found for this section filter.</p>
        ) : (
          <div style={{ display: 'grid', gap: '16px' }}>
            {displayedItems.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '170px 1fr auto',
                  gap: '16px',
                  alignItems: 'center',
                  background: 'var(--surface)',
                  border: '1px solid var(--line)',
                  borderRadius: '10px',
                  padding: '14px',
                }}
              >
                {/* Thumbnail */}
                <div style={{ height: '120px', width: '170px', borderRadius: '8px', overflow: 'hidden', background: 'rgba(0,0,0,0.05)', position: 'relative' }}>
                  {item.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.image} alt={item.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center', color: 'var(--muted-ink)' }}>
                      <ImageIcon size={28} />
                    </div>
                  )}
                  <label style={{ position: 'absolute', bottom: '6px', right: '6px', padding: '3px 8px', background: 'rgba(0,0,0,0.65)', color: 'white', borderRadius: '4px', fontSize: '11px', cursor: 'pointer' }}>
                    Replace
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, (url) => updateItem(item.id, 'image', url))}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>

                {/* Details Form */}
                <div style={{ display: 'grid', gap: '8px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--muted-ink)', display: 'block', marginBottom: '2px' }}>Title</span>
                      <input
                        value={item.label}
                        onChange={(e) => updateItem(item.id, 'label', e.target.value)}
                        placeholder="Title / Label"
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--muted-ink)', display: 'block', marginBottom: '2px' }}>Assigned Section</span>
                      <select
                        value={item.category}
                        onChange={(e) => updateItem(item.id, 'category', e.target.value)}
                        style={inputStyle}
                      >
                        {allSections.map((sec) => (
                          <option key={sec} value={sec}>
                            {sec}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--muted-ink)', display: 'block', marginBottom: '2px' }}>Description</span>
                    <textarea
                      value={item.description || ''}
                      onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      placeholder="Description about this image..."
                      rows={2}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--muted-ink)', display: 'block', marginBottom: '2px' }}>Image URL</span>
                    <input
                      value={item.image || ''}
                      onChange={(e) => updateItem(item.id, 'image', e.target.value)}
                      placeholder="Image URL"
                      style={{ ...inputStyle, fontSize: '12px' }}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div>
                  <button
                    type="button"
                    onClick={() => remove(item.id)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid #e57373',
                      background: 'transparent',
                      color: '#d32f2f',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '13px',
                    }}
                    title="Delete item"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', gap: '16px', marginTop: '24px', alignItems: 'center' }}>
          <button onClick={saveAll} className="button button-accent">
            Save all changes
          </button>
          {status && (
            <span style={{ color: 'var(--ink)', background: 'var(--surface)', padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--line)', fontSize: '13px', fontWeight: 500 }}>
              {status}
            </span>
          )}
        </div>
      </section>
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '13px',
  fontWeight: 600,
  color: 'var(--ink)',
  marginBottom: '4px',
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

const buttonSecondaryStyle: React.CSSProperties = {
  padding: '10px 16px',
  borderRadius: '9px',
  border: '1px solid var(--line)',
  background: 'var(--paper)',
  color: 'var(--ink)',
  fontWeight: 600,
  fontSize: '14px',
}
