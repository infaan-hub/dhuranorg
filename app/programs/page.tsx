import { Accessibility, Apple, BookOpen, CalendarCheck, Stethoscope } from 'lucide-react'
import { Breadcrumbs } from '@/components/breadcrumbs'

export const metadata = {
  title: 'Programmes | Dhuran Special Needs Centre',
  description: 'Individual learning, movement & therapy, health & nourishment.',
}

const programmes = [
  { icon: BookOpen, title: 'Individual learning', text: 'Special education and sensory activities shaped around each child’s pace, interests and needs.' },
  { icon: Accessibility, title: 'Movement & therapy', text: 'Physical therapy and rehabilitation support mobility, confidence and everyday independence.' },
  { icon: Stethoscope, title: 'Medical care', text: 'Routine check-ups, medication support and follow-up with local clinics and specialists.' },
  { icon: Apple, title: 'Nutrition', text: 'Nutritional assessment and support to help every child grow strong and healthy.' },
  { icon: CalendarCheck, title: 'Clinic follow-ups', text: 'Scheduled reviews and reminders so no child misses important care.' },
]

export default function ProgramsPage() {
  return (
    <div className="site-shell">
      <section className="work-section container" aria-labelledby="programs-title">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Programmes' }]} />
        <div className="section-heading">
          <div>
            <p className="eyebrow">Our work</p>
            <h2 id="programs-title">Care that meets each child where they are.</h2>
          </div>
          <p className="section-intro">
            Education, therapy, healthcare and nutrition work together so every child can learn, move and thrive.
          </p>
        </div>

        <div className="services-grid">
          {programmes.map(({ icon: Icon, title, text }) => (
            <article className="service-item" key={title}>
              <Icon className="service-icon" size={23} strokeWidth={1.7} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}