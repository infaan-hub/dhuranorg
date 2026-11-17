export const dynamic = 'force-dynamic'

import { unstable_noStore as noStore } from 'next/cache'
import { ensureSchema, sql } from '@/lib/db'
import { HomeGallery } from '@/components/home-gallery'
import {
  Accessibility,
  Activity,
  Apple,
  ArrowUpRight,
  BookOpen,
  CalendarCheck,
  Compass,
  Heart,
  HeartHandshake,
  Scale,
  ShieldCheck,
  Stethoscope,
  Target,
  Users,
} from 'lucide-react'

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
  const heroDescription = home.heroDescription ?? 'Dhuran Special Needs Centre provides health care, therapy, learning and nutrition support for children and young adults in Jambiani, Zanzibar.'
  const heroBackground = home.heroBackground ?? ''
  const services: Item[] = home.services ?? []
  const healthItems: Item[] = home.healthItems ?? []

  await ensureSchema()
  let latestNews: any[] = []
  let recentEvents: any[] = []
  let galleryItems: any[] = []
  try {
    latestNews = await sql`SELECT id, title, published_date AS date, body AS text, COALESCE(image_url, '') AS image FROM news_items WHERE status = 'published' ORDER BY created_at DESC LIMIT 3`
    recentEvents = await sql`SELECT id, title, date, description AS text, COALESCE(image_url, '') AS image FROM events ORDER BY created_at DESC LIMIT 3`
    galleryItems = await sql`
      SELECT id, label, category, COALESCE(description, '') AS description, image_url AS image 
      FROM gallery_items 
      ORDER BY created_at ASC
    `
  } catch {
    // fallback if DB connection fails
  }

  const defaultEvents = [
    {
      id: 'default-1',
      title: 'Community activity day',
      date: '2026-12-05',
      text: 'Families, caregivers and volunteers come together for learning, play and solidarity.',
      image: '',
    },
    {
      id: 'default-2',
      title: 'Health and nutrition week',
      date: '2026-12-12',
      text: 'Routine check-ups, nutrition assessment and tailored dietary support for children.',
      image: '',
    },
    {
      id: 'default-3',
      title: 'Caregiver empowerment workshop',
      date: '2026-12-19',
      text: 'Building practical caregiving skills, mobility exercises and emotional support for parents.',
      image: '',
    },
  ]

  const displayEvents = recentEvents.length > 0 ? recentEvents : defaultEvents

  return (
    <div className="site-shell">
      <section className="hero-wrap" aria-labelledby="hero-title">
        <div className="hero" style={heroBackground ? { background: `var(--dark) url(${heroBackground}) center/cover no-repeat` } : undefined}>
          <div className="hero-inner container">
            <div className="hero-copy">
              <p className="eyebrow">{heroEyebrow}</p>
              <h1 id="hero-title">{heroTitle}</h1>
              <p className="hero-description">{heroDescription}</p>
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

      <section className="work-section container" id="vision-mission" aria-labelledby="vision-mission-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Our vision and mission</p>
            <h2 id="vision-mission-title">Compass, mission and values.</h2>
          </div>
          <p className="section-intro">
            Dhuran Supporting Organization is an organization that supports children with disabilities, mental health challenges and malnutrition, with its office in Makunduchi, South Unguja.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px', marginBottom: '56px' }}>
          <article className="service-item" style={{ minHeight: 'auto', background: 'var(--surface)', padding: '32px 28px', borderRadius: '12px', border: '1px solid var(--line)' }}>
            <Compass className="service-icon" size={28} strokeWidth={1.8} aria-hidden="true" />
            <h3 style={{ marginTop: '14px', marginBottom: '10px' }}>Compass</h3>
            <p style={{ maxWidth: '100%', color: 'var(--muted-ink)', fontSize: '15px', lineHeight: '1.65' }}>
              To have a society where every child, especially those with disabilities, mental health challenges or malnutrition, has access to good health, education and an equal opportunity to achieve their dreams.
            </p>
          </article>

          <article className="service-item" style={{ minHeight: 'auto', background: 'var(--surface)', padding: '32px 28px', borderRadius: '12px', border: '1px solid var(--line)' }}>
            <Target className="service-icon" size={28} strokeWidth={1.8} aria-hidden="true" />
            <h3 style={{ marginTop: '14px', marginBottom: '10px' }}>Mission</h3>
            <p style={{ maxWidth: '100%', color: 'var(--muted-ink)', fontSize: '15px', lineHeight: '1.65' }}>
              Serving children with special needs with good nutrition, treatment, counseling and assistive devices; building parenting skills for parents and caregivers; and collaborating with the community and stakeholders so that donations are used transparently and responsibly.
            </p>
          </article>
        </div>

        <div>
          <div style={{ marginBottom: '24px' }}>
            <p className="eyebrow" style={{ marginBottom: '6px' }}>Core values</p>
            <h3 style={{ font: '500 24px/1.2 var(--font-heading)', color: 'var(--ink)', margin: 0, letterSpacing: '-0.015em' }}>
              The principles behind our care.
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            <article className="service-item" style={{ minHeight: 'auto', padding: '20px 16px 12px 0' }}>
              <Heart className="service-icon" size={23} strokeWidth={1.8} aria-hidden="true" />
              <h3>Love</h3>
              <p>Every child is welcomed with compassion and respect.</p>
            </article>

            <article className="service-item" style={{ minHeight: 'auto', padding: '20px 16px 12px 0' }}>
              <ShieldCheck className="service-icon" size={23} strokeWidth={1.8} aria-hidden="true" />
              <h3>Transparency</h3>
              <p>Contributions and their use are visible and reported.</p>
            </article>

            <article className="service-item" style={{ minHeight: 'auto', padding: '20px 16px 12px 0' }}>
              <Scale className="service-icon" size={23} strokeWidth={1.8} aria-hidden="true" />
              <h3>Equality</h3>
              <p>All children receive services without discrimination.</p>
            </article>

            <article className="service-item" style={{ minHeight: 'auto', padding: '20px 16px 12px 0' }}>
              <Users className="service-icon" size={23} strokeWidth={1.8} aria-hidden="true" />
              <h3>Collaboration</h3>
              <p>We work together with parents, caregivers and the community.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="work-section container" id="gallery" aria-labelledby="gallery-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Gallery</p>
            <h2 id="gallery-title">Moments from across our centre.</h2>
          </div>
          <p className="section-intro">
            Explore photos, milestones and everyday moments across each of our care programmes and community activities.
          </p>
        </div>

        <HomeGallery items={galleryItems} />

        <div className="section-action">
          <a href="/gallery" className="button button-accent">
            View full gallery <ArrowUpRight size={17} />
          </a>
        </div>
      </section>

      <section className="work-section container" id="news" aria-labelledby="news-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Latest news</p>
            <h2 id="news-title">Updates from the centre.</h2>
          </div>
          <p className="section-intro">Recent articles and stories from Dhuran.</p>
        </div>
        <div className="services-grid">
          {latestNews.length === 0 && <p style={{ color: 'var(--muted-ink)' }}>No news yet.</p>}
          {latestNews.map((n: any) => (
            <article className="service-item" key={n.id}>
              {n.image && (
                <a href={`/news/${n.id}`} style={{ display: 'block', marginBottom: '14px' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={n.image}
                    alt={n.title}
                    style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '10px', border: '1px solid var(--line)' }}
                  />
                </a>
              )}
              <CalendarCheck className="service-icon" size={23} strokeWidth={1.7} aria-hidden="true" />
              <h3>
                <a href={`/news/${n.id}`} style={{ color: 'inherit' }}>{n.title}</a>
              </h3>
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
            <p className="eyebrow">Recent events</p>
            <h2 id="events-title">Recent activities and gatherings.</h2>
          </div>
          <p className="section-intro">Community gatherings, health workshops and recent programmes at the centre.</p>
        </div>
        <div className="services-grid">
          {displayEvents.map((e: any) => {
            const hasPage = !String(e.id).startsWith('default-')
            return (
              <article className="service-item" key={e.id}>
                {e.image && (
                  hasPage ? (
                    <a href={`/event/${e.id}`} style={{ display: 'block', marginBottom: '14px' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={e.image}
                        alt={e.title}
                        style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '10px', border: '1px solid var(--line)' }}
                      />
                    </a>
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={e.image}
                      alt={e.title}
                      style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '10px', border: '1px solid var(--line)', marginBottom: '14px' }}
                    />
                  )
                )}
                <CalendarCheck className="service-icon" size={23} strokeWidth={1.7} aria-hidden="true" />
                <h3>
                  {hasPage ? (
                    <a href={`/event/${e.id}`} style={{ color: 'inherit' }}>{e.title}</a>
                  ) : (
                    e.title
                  )}
                </h3>
                {e.date && <p style={{ fontSize: '13px', color: 'var(--muted-ink)', margin: '0 0 6px' }}>{e.date}</p>}
                <p>{e.text}</p>
              </article>
            )
          })}
        </div>
        <div className="section-action">
          <a href="/events" className="button button-accent">View all events <ArrowUpRight size={17} /></a>
        </div>
      </section>
    </div>
  )
}