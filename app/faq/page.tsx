import { Breadcrumbs } from '@/components/breadcrumbs'

export const metadata = {
  title: 'FAQ | Het Dhuran Special Needs Centre',
  description: 'Frequently asked questions.',
}

const faqs = [
  { q: 'Who do you support?', a: 'Children and young adults with disabilities in Jambiani and surrounding areas.' },
  { q: 'How can I book a visit?', a: 'Call +255 780 981 880 or email info@hetdhuran.org to arrange a visit.' },
  { q: 'Do you offer therapy?', a: 'Yes — physiotherapy and movement programmes are part of our care.' },
  { q: 'What are your visiting hours?', a: 'Monday – Friday, 8:00 – 16:00. Please call ahead.' },
  { q: 'How can I help?', a: 'You can volunteer, partner, or sponsor a child. Contact us to learn more.' },
]

export default function FaqPage() {
  return (
    <div className="site-shell">
      <section className="work-section container" aria-labelledby="faq-title">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]} />
        <div className="section-heading">
          <div>
            <p className="eyebrow">FAQ</p>
            <h2 id="faq-title">Frequently asked questions.</h2>
          </div>
        </div>
        <div style={{ display: 'grid', gap: '12px' }}>
          {faqs.map((f) => (
            <details key={f.q} style={{ border: '1px solid var(--line)', borderRadius: '9px', padding: '14px', background: 'var(--surface)' }}>
              <summary style={{ cursor: 'pointer', fontWeight: 600, color: 'var(--ink)' }}>{f.q}</summary>
              <p style={{ margin: '10px 0 0', color: 'var(--muted-ink)' }}>{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  )
}