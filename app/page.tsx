export const dynamic = 'force-dynamic'

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
    </div>
  )
}