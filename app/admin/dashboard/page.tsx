import { readJson } from '@/lib/storage'

export default function DashboardPage() {
  const stats = readJson<any>('stats.json', { visits: 0, pageViews: {} })
  const news = readJson<any[]>('news.json', [])
  const gallery = readJson<any[]>('gallery.json', [])

  return (
    <div>
      <h1 style={{ font: '500 28px/1.2 var(--font-heading)', margin: '0 0 20px' }}>Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px', padding: '20px' }}>
          <div style={{ fontSize: '13px', color: 'var(--muted-ink)' }}>Guest visits</div>
          <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--ink)' }}>{stats.visits ?? 0}</div>
        </div>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px', padding: '20px' }}>
          <div style={{ fontSize: '13px', color: 'var(--muted-ink)' }}>News articles</div>
          <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--ink)' }}>{news.length}</div>
        </div>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px', padding: '20px' }}>
          <div style={{ fontSize: '13px', color: 'var(--muted-ink)' }}>Gallery items</div>
          <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--ink)' }}>{gallery.length}</div>
        </div>
      </div>

      <h2 style={{ font: '500 20px/1.2 var(--font-heading)', margin: '28px 0 12px' }}>Page views</h2>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px', padding: '16px' }}>
        {Object.keys(stats.pageViews || {}).length === 0 && <p style={{ color: 'var(--muted-ink)', margin: 0 }}>No data yet.</p>}
        {Object.entries(stats.pageViews || {}).map(([p, c]: any) => (
          <div key={p} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--line)' }}>
            <span>{p}</span>
            <span>{c}</span>
          </div>
        ))}
      </div>
    </div>
  )
}