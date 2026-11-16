import { BookOpen, HelpCircle, Stethoscope } from 'lucide-react'
import { Breadcrumbs } from '@/components/breadcrumbs'

export const metadata = {
  title: 'Resources for families | Dhuran Special Needs Centre',
  description: 'Care guides, clinic info and FAQs.',
}

const faqs = [
  { q: 'Who do you support?', a: 'Children and young adults with disabilities in Jambiani and surrounding areas.' },
  { q: 'How can I visit?', a: 'Call ahead on +255 780 981 880 or email info@hetdhuran.org to arrange a visit.' },
  { q: 'How can I book a visit?', a: 'Call +255 780 981 880 or email info@hetdhuran.org to arrange a visit.' },
  { q: 'Do you offer therapy?', a: 'Yes — physiotherapy and movement programmes are part of our care.' },
]

export default function ResourcesPage() {
  return (
    <div className="site-shell">
      <section className="work-section container" aria-labelledby="resources-title">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Resources' }]} />
        <div className="section-heading">
          <div>
            <p className="eyebrow">Resources for families</p>
            <h2 id="resources-title">Care guides, clinic info and FAQs.</h2>
          </div>
          <p className="section-intro">
            Helpful information for families, caregivers and partners.
          </p>
        </div>

        <div className="services-grid">
          <article className="service-item">
            <BookOpen className="service-icon" size={23} strokeWidth={1.7} aria-hidden="true" />
            <h3>Care guides</h3>
            <p>Everyday tips for learning, movement and wellbeing at home.</p>
          </article>
          <article className="service-item">
            <Stethoscope className="service-icon" size={23} strokeWidth={1.7} aria-hidden="true" />
            <h3>Clinic info</h3>
            <p>Local clinics and specialists we work with for follow-ups and care.</p>
          </article>
          <article className="service-item">
            <HelpCircle className="service-icon" size={23} strokeWidth={1.7} aria-hidden="true" />
            <h3>FAQs</h3>
            <p>Answers to common questions about the centre and our services.</p>
          </article>
        </div>

        <div style={{ marginTop: '40px' }}>
          {faqs.map(({ q, a }) => (
            <div key={q} style={{ borderTop: '1px solid var(--line)', padding: '18px 0' }}>
              <h3 style={{ margin: '0 0 6px', font: '500 20px/1.25 var(--font-heading)' }}>{q}</h3>
              <p style={{ margin: 0, color: 'var(--muted-ink)' }}>{a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}