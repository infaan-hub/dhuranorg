import { ensureSchema, sql } from '@/lib/db'
import { CalendarCheck } from 'lucide-react'
import { Breadcrumbs } from '@/components/breadcrumbs'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = {
  title: 'Events | Het Dhuran Special Needs Centre',
  description: 'Upcoming activities and events.',
}

export default async function EventsPage() {
  await ensureSchema()
  const events = await sql`SELECT id, title, date, description AS text FROM events ORDER BY created_at DESC`

  return (
    <div className="site-shell">
      <section className="work-section container">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Events' }]} />
        <div className="section-heading">
          <div>
            <p className="eyebrow">Events</p>
            <h2 id="events-title">Upcoming activities and events.</h2>
          </div>
        </div>
        <div style={{ display: 'grid', gap: '12px' }}>
          {events.length === 0 && <p style={{ color: 'var(--muted-ink)' }}>No events yet.</p>}
          {events.map((e: any) => (
            <div key={e.id} style={{ border: '1px solid var(--line)', borderRadius: '9px', padding: '14px', background: 'var(--surface)' }}>
              <h3 style={{ margin: '0 0 4px' }}>{e.title}</h3>
              {e.date && <p style={{ margin: '0 0 6px', fontSize: '13px', color: 'var(--muted-ink)' }}>{e.date}</p>}
              <p style={{ margin: 0, color: 'var(--muted-ink)' }}>{e.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}