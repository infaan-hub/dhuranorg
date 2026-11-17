export const dynamic = 'force-dynamic'
export const revalidate = 0

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, CalendarCheck } from 'lucide-react'
import { ensureSchema, sql } from '@/lib/db'
import { Breadcrumbs } from '@/components/breadcrumbs'

type Event = {
  id: string
  title: string
  date: string | null
  text: string | null
  image: string
}

export default async function EventDetailPage({ params }: { params: { id: string } }) {
  await ensureSchema()

  let event: Event | null = null
  try {
    const rows = await sql`
      SELECT id, title, date, description AS text, COALESCE(image_url, '') AS image
      FROM events
      WHERE id = ${params.id}
      LIMIT 1
    `
    event = (rows[0] as Event) ?? null
  } catch {
    event = null
  }

  if (!event) notFound()

  return (
    <div className="site-shell">
      <section className="work-section container" style={{ maxWidth: '900px' }}>
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Recent events', href: '/events' },
            { label: event.title },
          ]}
        />

        <article>
          <p className="eyebrow">Recent events</p>
          <h1 style={{ font: '500 clamp(2rem, 4vw, 3rem)/1.15 var(--font-heading)', margin: '10px 0 10px', color: 'var(--ink)' }}>
            {event.title}
          </h1>
          {event.date && (
            <p style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', margin: '0 0 26px', fontSize: '14px', color: 'var(--muted-ink)' }}>
              <CalendarCheck size={16} /> {event.date}
            </p>
          )}

          {event.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={event.image}
              alt={event.title}
              style={{
                display: 'block',
                width: '100%',
                maxHeight: '520px',
                objectFit: 'cover',
                borderRadius: '14px',
                border: '1px solid var(--line)',
                margin: '0 0 30px',
              }}
            />
          )}

          <p style={{ margin: 0, fontSize: '17px', lineHeight: 1.8, color: 'var(--ink)', whiteSpace: 'pre-line' }}>
            {event.text || ''}
          </p>
        </article>

        <Link
          href="/events"
          className="text-link"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '36px' }}
        >
          <ArrowLeft size={16} /> Back to all events
        </Link>
      </section>
    </div>
  )
}
