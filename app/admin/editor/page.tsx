'use client'

import { useEffect, useState } from 'react'
import { Accessibility, Activity, Apple, ArrowUpRight, BookOpen, CalendarCheck, HeartHandshake, Stethoscope } from 'lucide-react'

const iconMap: Record<string, any> = { Accessibility, Activity, Apple, BookOpen, CalendarCheck, HeartHandshake, Stethoscope }
const iconNames = Object.keys(iconMap)

type Item = { icon?: string; title: string; text: string; href?: string; cta?: string }

const inputStyle: React.CSSProperties = {
  padding: '10px 12px',
  border: '1px solid var(--line)',
  borderRadius: '9px',
  background: 'var(--surface)',
  color: 'var(--ink)',
  width: '100%',
}

export default function EditorPage() {
  const [heroEyebrow, setHeroEyebrow] = useState('')
  const [heroTitle, setHeroTitle] = useState('')
  const [heroDescription, setHeroDescription] = useState('')
  const [heroBackground, setHeroBackground] = useState('')
  const [services, setServices] = useState<Item[]>([])
  const [healthItems, setHealthItems] = useState<Item[]>([])
  const [careItems, setCareItems] = useState<Item[]>([])
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/home')
      .then((r) => r.json())
      .then((d) => {
        setHeroEyebrow(d.heroEyebrow ?? '')
        setHeroTitle(d.heroTitle ?? '')
        setHeroDescription(d.heroDescription ?? '')
        setHeroBackground(d.heroBackground ?? '')
        setServices(d.services ?? [])
        setHealthItems(d.healthItems ?? [])
        setCareItems(d.careItems ?? [])
        setLoading(false)
      })
      .catch(() => { setStatus('Failed to load'); setLoading(false) })
  }, [])

  function updateItem(list: Item[], setList: (v: Item[]) => void, idx: number, field: keyof Item, value: string) {
    const next = [...list]
    next[idx] = { ...next[idx], [field]: value }
    setList(next)
  }

  function addItem(setList: (v: Item[]) => void, list: Item[]) {
    setList([...list, { icon: 'BookOpen', title: 'New item', text: '' }])
  }

  function removeItem(list: Item[], setList: (v: Item[]) => void, idx: number) {
    setList(list.filter((_, i) => i !== idx))
  }

  async function save() {
    setStatus('')
    const body = {
      heroEyebrow,
      heroTitle,
      heroDescription,
      heroBackground,
      services,
      healthItems,
      careItems,
    }
    const res = await fetch('/api/home', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    setStatus(res.ok ? 'Saved. Public page updated.' : 'Save failed')
  }

  if (loading) return <div className="site-shell"><section className="work-section container"><p>Loading…</p></section></div>

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
      <div style={{ display: 'grid', gap: '20px' }}>
        <h1 style={{ font: '500 28px/1.2 var(--font-heading)', margin: 0 }}>Home editor (live)</h1>

        <section style={{ display: 'grid', gap: '10px' }}>
          <h2 style={{ font: '500 18px/1.2 var(--font-heading)', margin: 0 }}>Hero</h2>
          <input value={heroEyebrow} onChange={(e) => setHeroEyebrow(e.target.value)} placeholder="Eyebrow" style={inputStyle} />
          <input value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} placeholder="Title" style={inputStyle} />
          <textarea value={heroDescription} onChange={(e) => setHeroDescription(e.target.value)} placeholder="Description" rows={3} style={inputStyle} />
          <input value={heroBackground} onChange={(e) => setHeroBackground(e.target.value)} placeholder="Background image URL (optional)" style={inputStyle} />
        </section>

        <ArrayEditor title="Our work (services)" items={services} setItems={setServices} updateItem={updateItem} addItem={addItem} removeItem={removeItem} />
        <ArrayEditor title="Health & wellbeing" items={healthItems} setItems={setHealthItems} updateItem={updateItem} addItem={addItem} removeItem={removeItem} />
        <CareEditor title="Our care" items={careItems} setItems={setCareItems} updateItem={updateItem} addItem={addItem} removeItem={removeItem} />

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button onClick={save} className="button button-accent">Save changes</button>
          {status && <span style={{ color: 'var(--muted-ink)' }}>{status}</span>}
        </div>
      </div>

      {/* Live preview */}
      <div style={{ border: '1px solid var(--line)', borderRadius: '12px', overflow: 'auto', maxHeight: '85vh', background: 'var(--paper)' }}>
        <div className="site-shell">
          <section className="hero-wrap" aria-labelledby="hero-title">
            <div className="hero" style={heroBackground ? { background: `var(--dark) url(${heroBackground}) center/cover no-repeat` } : undefined}>
              <div className="hero-inner container">
                <div className="hero-copy">
                  <p className="eyebrow">{heroEyebrow}</p>
                  <h1 id="hero-title">{heroTitle}</h1>
                  <p className="hero-description">{heroDescription}</p>
                  <div className="hero-actions">
                    <a className="button button-accent">Our services <ArrowUpRight size={17} /></a>
                    <a className="text-link">Contact us</a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="work-section container" id="our-work" aria-labelledby="work-title">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Care within the community</p>
                <h2 id="work-title">Support that strengthens the whole community.</h2>
              </div>
            </div>
            <div className="services-grid">
              {services.map((s, i) => {
                const Icon = s.icon ? iconMap[s.icon] : null
                return (
                  <article className="service-item" key={i}>
                    {Icon && <Icon className="service-icon" size={23} strokeWidth={1.7} aria-hidden="true" />}
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </article>
                )
              })}
            </div>
          </section>

          <section className="work-section container" id="health" aria-labelledby="health-title">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Health & wellbeing</p>
                <h2 id="health-title">Care that supports the whole child.</h2>
              </div>
            </div>
            <div className="services-grid">
              {healthItems.map((s, i) => {
                const Icon = s.icon ? iconMap[s.icon] : null
                return (
                  <article className="service-item" key={i}>
                    {Icon && <Icon className="service-icon" size={23} strokeWidth={1.7} aria-hidden="true" />}
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </article>
                )
              })}
            </div>
          </section>

          <section className="work-section container" id="support" aria-labelledby="support-title">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Our care</p>
              </div>
            </div>
            <div className="services-grid">
              {careItems.map((s, i) => {
                const Icon = s.icon ? iconMap[s.icon] : null
                return (
                  <article className="service-item" key={i}>
                    {Icon && <Icon className="service-icon" size={23} strokeWidth={1.7} aria-hidden="true" />}
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                    {s.href && s.cta && <a className="text-link">{s.cta} <ArrowUpRight size={14} /></a>}
                  </article>
                )
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

function ArrayEditor({ title, items, setItems, updateItem, addItem, removeItem }: any) {
  return (
    <section style={{ display: 'grid', gap: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ font: '500 18px/1.2 var(--font-heading)', margin: 0 }}>{title}</h2>
        <button type="button" onClick={() => addItem(setItems, items)} style={{ padding: '6px 10px', borderRadius: '9px', border: '1px solid var(--line)', background: 'transparent', color: 'var(--ink)', cursor: 'pointer' }}>+ Add</button>
      </div>
      {items.map((item: Item, idx: number) => (
        <div key={idx} style={{ border: '1px solid var(--line)', borderRadius: '9px', padding: '10px', display: 'grid', gap: '6px', background: 'var(--surface)' }}>
          <select value={item.icon || 'BookOpen'} onChange={(e) => updateItem(items, setItems, idx, 'icon', e.target.value)} style={inputStyle}>
            {iconNames.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
          <input value={item.title} onChange={(e) => updateItem(items, setItems, idx, 'title', e.target.value)} placeholder="Title" style={inputStyle} />
          <textarea value={item.text} onChange={(e) => updateItem(items, setItems, idx, 'text', e.target.value)} placeholder="Text" rows={2} style={inputStyle} />
          <button type="button" onClick={() => removeItem(items, setItems, idx)} style={{ padding: '6px 10px', borderRadius: '9px', border: '1px solid var(--line)', background: 'transparent', color: 'var(--ink)', cursor: 'pointer', justifySelf: 'start' }}>Remove</button>
        </div>
      ))}
    </section>
  )
}

function CareEditor({ title, items, setItems, updateItem, addItem, removeItem }: any) {
  return (
    <section style={{ display: 'grid', gap: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ font: '500 18px/1.2 var(--font-heading)', margin: 0 }}>{title}</h2>
        <button type="button" onClick={() => addItem(setItems, items)} style={{ padding: '6px 10px', borderRadius: '9px', border: '1px solid var(--line)', background: 'transparent', color: 'var(--ink)', cursor: 'pointer' }}>+ Add</button>
      </div>
      {items.map((item: Item, idx: number) => (
        <div key={idx} style={{ border: '1px solid var(--line)', borderRadius: '9px', padding: '10px', display: 'grid', gap: '6px', background: 'var(--surface)' }}>
          <select value={item.icon || 'BookOpen'} onChange={(e) => updateItem(items, setItems, idx, 'icon', e.target.value)} style={inputStyle}>
            {iconNames.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
          <input value={item.title} onChange={(e) => updateItem(items, setItems, idx, 'title', e.target.value)} placeholder="Title" style={inputStyle} />
          <textarea value={item.text} onChange={(e) => updateItem(items, setItems, idx, 'text', e.target.value)} placeholder="Text" rows={2} style={inputStyle} />
          <input value={item.href || ''} onChange={(e) => updateItem(items, setItems, idx, 'href', e.target.value)} placeholder="Link (href)" style={inputStyle} />
          <input value={item.cta || ''} onChange={(e) => updateItem(items, setItems, idx, 'cta', e.target.value)} placeholder="CTA text" style={inputStyle} />
          <button type="button" onClick={() => removeItem(items, setItems, idx)} style={{ padding: '6px 10px', borderRadius: '9px', border: '1px solid var(--line)', background: 'transparent', color: 'var(--ink)', cursor: 'pointer', justifySelf: 'start' }}>Remove</button>
        </div>
      ))}
    </section>
  )
}