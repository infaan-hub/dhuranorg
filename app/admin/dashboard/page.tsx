import { ensureSchema, sql } from '@/lib/db'

export default async function DashboardPage() {
  await ensureSchema()
  const totalRows = await sql`SELECT total_visits FROM site_stats WHERE id = 1`
  const viewRows = await sql`SELECT path, count FROM page_views`
  const newsRows = await sql`SELECT count(*)::int AS c FROM news_items`
  const galRows = await sql`SELECT count(*)::int AS c FROM gallery_items`
  const pageViews: Record<string, number> = {}
  for (const r of viewRows) pageViews[r.path] = Number(r.count)

  return (
    <div>
      <h1 style={{ font: '500 28px/1.2 var(--font-heading)', margin: '0 0 20px' }}>Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px', padding: '20px' }}>
          <div style={{ fontSize: '13px', color: 'var(--muted-ink)' }}>Guest visits</div>
          <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--ink)' }}>{Number(totalRows[0]?.total_visits ?? 0)}</div>
        </div>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px', padding: '20px' }}>
          <div style={{ fontSize: '13px', color: 'var(--muted-ink)' }}>News articles</div>
          <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--ink)' }}>{newsRows[0].c}</div>
        </div>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px', padding: '20px' }}>
          <div style={{ fontSize: '13px', color: 'var(--muted-ink)' }}>Gallery items</div>
          <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--ink)' }}>{galRows[0].c}</div>
        </div>
      </div>

      <h2 style={{ font: '500 20px/1.2 var(--font-heading)', margin: '28px 0 12px' }}>Page views</h2>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px', padding: '16px' }}>
        {Object.keys(pageViews).length === 0 && <p style={{ color: 'var(--muted-ink)', margin: 0 }}>No data yet.</p>}
        {Object.entries(pageViews).map(([p, c]) => (
          <div key={p} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--line)' }}>
            <span>{p}</span>
            <span>{c}</span>
          </div>
        ))}
      </div>
    </div>
  )
}