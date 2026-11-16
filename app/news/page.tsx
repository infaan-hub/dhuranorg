import { readJson } from '@/lib/storage'
import { CalendarCheck } from 'lucide-react'

export const metadata = {
  title: 'News & Blog | Het Dhuran Special Needs Centre',
  description: 'Updates, events and community activities.',
}

export default async function NewsPage() {
  const posts = readJson<any[]>('news.json', [])

  return (
    <div className="site-shell">
      <section className="work-section container" aria-labelledby="news-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">News & blog</p>
            <h2 id="news-title">Updates, events and community activities.</h2>
          </div>
          <p className="section-intro">
            Stories from the centre and the people who make it possible.
          </p>
        </div>

        <div className="services-grid">
          {posts.map((post) => (
            <article className="service-item" key={post.id}>
              <CalendarCheck className="service-icon" size={23} strokeWidth={1.7} aria-hidden="true" />
              <h3>{post.title}</h3>
              <p style={{ fontSize: '13px', color: 'var(--muted-ink)', margin: '0 0 6px' }}>{post.date}</p>
              <p>{post.text}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}