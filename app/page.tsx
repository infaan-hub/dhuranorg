export const dynamic = 'force-dynamic'

import { unstable_noStore as noStore } from 'next/cache'
import { ensureSchema, sql } from '@/lib/db'
import { Accessibility, Activity, Apple, ArrowUpRight, BookOpen, CalendarCheck, HeartHandshake, Stethoscope } from 'lucide-react'

const iconMap: Record<string, any> = {
  Accessibility,
  Activity,
  Apple,
  BookOpen,
  CalendarCheck,
  HeartHandshake,
  Stethoscope,
}

type Item = { icon?: string; title: string; text: string; href?: string; cta?: string }

export default async function Page() {
  noStore()
  await ensureSchema()
  const rows = await sql`SELECT data FROM home_content WHERE id = 1`
  const home = (rows[0]?.data ?? {}) as any
  const heroEyebrow = home.heroEyebrow ?? 'Health care, therapy and support in Jambiani'
  const heroTitle = home.heroTitle ?? 'Care for every one , every day.'
  const heroDescription = home.heroDescription ?? 'Het Dhuran Special Needs Centre provides health care, therapy, learning and nutrition support for children and young adults in Jambiani, Zanzibar.'
  const heroBackground = home.heroBackground ?? ''
  const services: Item[] = home.services ?? []
  const healthItems: Item[] = home.healthItems ?? []
  const careItems: Item[] = home.careItems ?? []

  await ensureSchema()
  const latestNews = await sql`SELECT id, title, published_date AS date, body AS text FROM news_items WHERE status = 'published' ORDER BY created_at DESC LIMIT 3`
  const upcomingEvents = await sql`SELECT id, title, date, description AS text FROM events ORDER BY created_at DESC LIMIT 3`

  return (
    <div className="site-shell">
      <section className="hero-wrap" aria-labelledby="hero-title">
        <div className="hero" style={heroBackground ? { background: `var(--dark) url(${heroBackground}) center/cover no-repeat` } : undefined}>
          <div className="hero-inner container">
            <div className="hero-copy">
              <p className="eyebrow">{heroEyebrow}</p>
              <h1 id="hero-title">{heroTitle}</h1>
              <p className="hero-description">{heroDescription}</p>
              <div className="hero-actions">
                <a href="#our-work" className="button button-accent">Our services <ArrowUpRight size={17} /></a>
                <a href="mailto:info@hetdhuran.org" className="text-link">Contact us</a>
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
          {services.map(({ icon, title, text }) => {
            const Icon = icon ? iconMap[icon] : null
            return (
              <article className="service-item" key={title}>
                {Icon && <Icon className="service-icon" size={23} strokeWidth={1.7} aria-hidden="true" />}
                <h3>{title}</h3>
                <p>{text}</p>
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
          {healthItems.map(({ icon, title, text }) => {
            const Icon = icon ? iconMap[icon] : null
            return (
              <article className="service-item" key={title}>
                {Icon && <Icon className="service-icon" size={23} strokeWidth={1.7} aria-hidden="true" />}
                <h3>{title}</h3>
                <p>{text}</p>
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
          {careItems.map(({ icon, title, text, href, cta }) => {
            const Icon = icon ? iconMap[icon] : null
            return (
              <article className="service-item" key={title}>
                {Icon && <Icon className="service-icon" size={23} strokeWidth={1.7} aria-hidden="true" />}
                <h3>{title}</h3>
                <p>{text}</p>
                {href && cta && <a href={href} className="text-link">{cta} <ArrowUpRight size={14} /></a>}
              </article>
            )
          })}
        </div>
      </section>

      <section className="work-section container" id="news" aria-labelledby="news-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Latest news</p>
            <h2 id="news-title">Updates from the centre.</h2>
          </div>
          <p className="section-intro">Recent articles and stories from Het Dhuran.</p>
        </div>
        <div className="services-grid">
          {latestNews.length === 0 && <p style={{ color: 'var(--muted-ink)' }}>No news yet.</p>}
          {latestNews.map((n: any) => (
            <article className="service-item" key={n.id}>
              <CalendarCheck className="service-icon" size={23} strokeWidth={1.7} aria-hidden="true" />
              <h3>{n.title}</h3>
              <p style={{ fontSize: '13px', color: 'var(--muted-ink)', margin: '0 0 6px' }}>{n.date}</p>
              <p>{n.text}</p>
            </article>
          ))}
        </div>
        <div className="section-action">
          <a href="/news" className="button button-accent">View all news <ArrowUpRight size={17} /></a>
        </div>
      </section>

      <section className="work-section container" id="events" aria-labelledby="events-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Events</p>
            <h2 id="events-title">Upcoming activities.</h2>
          </div>
          <p className="section-intro">Join us at the centre.</p>
        </div>
        <div className="services-grid">
          {upcomingEvents.length === 0 && <p style={{ color: 'var(--muted-ink)' }}>No events yet.</p>}
          {upcomingEvents.map((e: any) => (
            <article className="service-item" key={e.id}>
              <CalendarCheck className="service-icon" size={23} strokeWidth={1.7} aria-hidden="true" />
              <h3>{e.title}</h3>
              {e.date && <p style={{ fontSize: '13px', color: 'var(--muted-ink)', margin: '0 0 6px' }}>{e.date}</p>}
              <p>{e.text}</p>
            </article>
          ))}
        </div>
        <div className="section-action">
          <a href="/events" className="button button-accent">View all events <ArrowUpRight size={17} /></a>
        </div>
      </section>
    </div>
  )
}