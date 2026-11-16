'use client'

import { useEffect, useState } from 'react'
import { Search as SearchIcon } from 'lucide-react'
import { Breadcrumbs } from '@/components/breadcrumbs'

export default function SearchPage() {
  const [q, setQ] = useState('')
  const [news, setNews] = useState<any[]>([])
  const [gallery, setGallery] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/news').then((r) => r.json()),
      fetch('/api/gallery').then((r) => r.json()),
    ]).then(([n, g]) => { setNews(n); setGallery(g); setLoading(false) })
  }, [])

  const ql = q.toLowerCase()
  const newsRes = news.filter((n) => (n.title + ' ' + n.text).toLowerCase().includes(ql))
  const galRes = gallery.filter((g) => (g.label + ' ' + g.category).toLowerCase().includes(ql))

  return (
    <div className="site-shell">
      <section className="work-section container">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Search' }]} />
        <div className="section-heading">
          <div>
            <p className="eyebrow">Search</p>
            <h2>Search the site.</h2>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search news, gallery..." style={{ flex: 1, padding: '12px 14px', border: '1px solid var(--line)', borderRadius: '9px', background: 'var(--surface)', color: 'var(--ink)' }} />
          <SearchIcon size={20} style={{ alignSelf: 'center', color: 'var(--muted-ink)' }} />
        </div>
        {loading ? <p>Loading…</p> : (
          <>
            <h3 style={{ font: '500 18px/1.2 var(--font-heading)' }}>News ({newsRes.length})</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '8px' }}>
              {newsRes.map((n) => <li key={n.id} style={{ border: '1px solid var(--line)', borderRadius: '9px', padding: '10px', background: 'var(--surface)' }}><strong>{n.title}</strong><p style={{ margin: 0, color: 'var(--muted-ink)' }}>{n.text}</p></li>)}
            </ul>
            <h3 style={{ font: '500 18px/1.2 var(--font-heading)', marginTop: '20px' }}>Gallery ({galRes.length})</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '8px' }}>
              {galRes.map((g) => <li key={g.id} style={{ border: '1px solid var(--line)', borderRadius: '9px', padding: '10px', background: 'var(--surface)' }}>{g.label} <span style={{ color: 'var(--muted-ink)' }}>({g.category})</span></li>)}
            </ul>
          </>
        )}
      </section>
    </div>
  )
}