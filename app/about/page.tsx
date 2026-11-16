import { HeartHandshake, MapPin, Sparkles } from 'lucide-react'
import { Breadcrumbs } from '@/components/breadcrumbs'

export const metadata = {
  title: 'About | Dhuran Special Needs Centre',
  description: 'Our story, mission and community in Jambiani, Zanzibar.',
}

export default function AboutPage() {
  return (
    <div className="site-shell">
      <section className="work-section container" aria-labelledby="about-title">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />
        <div className="section-heading">
          <div>
            <p className="eyebrow">Our story</p>
            <h2 id="about-title">A health centre for children with disabilities.</h2>
          </div>
          <p className="section-intro">
            Dhuran Special Needs Centre brings families, caregivers and local professionals together in Jambiani, Zanzibar.
          </p>
        </div>

        <div className="services-grid">
          <article className="service-item">
            <Sparkles className="service-icon" size={23} strokeWidth={1.7} aria-hidden="true" />
            <h3>Our mission</h3>
            <p>To provide health care, therapy, learning and nutrition support so every child can grow, move and thrive.</p>
          </article>
          <article className="service-item">
            <HeartHandshake className="service-icon" size={23} strokeWidth={1.7} aria-hidden="true" />
            <h3>Our approach</h3>
            <p>Education, therapy, healthcare and nutrition work together, shaped around each child’s pace, interests and needs.</p>
          </article>
          <article className="service-item">
            <MapPin className="service-icon" size={23} strokeWidth={1.7} aria-hidden="true" />
            <h3>Our community</h3>
            <p>Rooted in Jambiani, we walk alongside families and local professionals so progress is shared and sustained.</p>
          </article>
        </div>
      </section>

      <section className="work-section container" aria-labelledby="context-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Jambiani context</p>
            <h2 id="context-title">Growing together in Zanzibar.</h2>
          </div>
          <p className="section-intro">
            We serve around 50 children and young adults, celebrating small steps and nurturing possibility every day.
          </p>
        </div>
        <p className="section-intro" style={{ maxWidth: '720px' }}>
          Every child has their own way forward. We bring learning, movement and attentive care together to help them find it — with caring people beside them for each new step.
        </p>
      </section>
    </div>
  )
}