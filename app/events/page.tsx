import { ensureSchema, sql } from '@/lib/db'
import { CalendarCheck } from 'lucide-react'
import { Breadcrumbs } from '@/components/breadcrumbs'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = {
  title: 'Recent Events | Dhuran Special Needs Centre',
  description: 'Recent and upcoming activities and events.',
}

export default async function EventsPage() {
  await ensureSchema()
  let events: any[] = []
  try {
    events = await sql`SELECT id, title, date, description AS text FROM events ORDER BY created_at DESC`
  } catch {
    events = []
  }

  const defaultEvents = [
    {
      id: '1',
      title: 'Community activity day',
      date: '2026-12-05',
      text: 'Families, caregivers and volunteers come together for learning, play and solidarity.',
    },
    {
      id: '2',
      title: 'Health and nutrition week',
      date: '2026-12-12',
      text: 'Routine check-ups, nutrition assessment and tailored dietary support for children.',
    },
    {
      id: '3',
      title: 'Caregiver empowerment workshop',
      date: '2026-12-19',
      text: 'Building practical caregiving skills, mobility exercises and emotional support for parents.',
    },
  ]

  const displayEvents = events.length > 0 ? events : defaultEvents

  return (
    <div className="site-shell">
      <section className="work-section container">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Recent events' }]} />
        <div className="section-heading">
          <div>
            <p className="eyebrow">Recent events</p>
            <h2 id="events-title">Recent activities and events.</h2>
          </div>
        </div>
        <div style={{ display: 'grid', gap: '12px' }}>
          {displayEvents.map((e: any) => (
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