import { Compass, Heart, HeartHandshake, MapPin, Scale, ShieldCheck, Target, Users } from 'lucide-react'
import { Breadcrumbs } from '@/components/breadcrumbs'

export const metadata = {
  title: 'About | Dhuran Supporting Organization',
  description: 'Our vision, mission, values and story in Makunduchi and Jambiani, Zanzibar.',
}

export default function AboutPage() {
  return (
    <div className="site-shell">
      <section className="work-section container" aria-labelledby="about-title">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />
        <div className="section-heading">
          <div>
            <p className="eyebrow">Our vision and mission</p>
            <h2 id="about-title">Dhuran Supporting Organization.</h2>
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

      <section className="work-section container" aria-labelledby="context-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Community context</p>
            <h2 id="context-title">Growing together in Zanzibar.</h2>
          </div>
          <p className="section-intro">
            We serve children and young adults across Jambiani, Makunduchi and South Unguja, celebrating small steps and nurturing possibility every day.
          </p>
        </div>
        <div className="services-grid">
          <article className="service-item">
            <HeartHandshake className="service-icon" size={23} strokeWidth={1.7} aria-hidden="true" />
            <h3>Our approach</h3>
            <p>Education, therapy, healthcare and nutrition work together, shaped around each child’s pace, interests and needs.</p>
          </article>
          <article className="service-item">
            <MapPin className="service-icon" size={23} strokeWidth={1.7} aria-hidden="true" />
            <h3>Our community</h3>
            <p>Rooted in South Unguja, we walk alongside families and local professionals so progress is shared and sustained.</p>
          </article>
        </div>
      </section>
    </div>
  )
}