export const dynamic = 'force-dynamic'

import { unstable_noStore as noStore } from 'next/cache'
import { ensureSchema, sql } from '@/lib/db'
import { CalendarCheck } from 'lucide-react'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { ShareButtons } from '@/components/share-buttons'

export const metadata = {
  title: 'News & Blog | Dhuran Special Needs Centre',
  description: 'Updates, events and community activities.',
}

export default async function NewsPage() {
  noStore()
  await ensureSchema()
  const posts = await sql`SELECT id, title, published_date AS date, body AS text FROM news_items ORDER BY created_at DESC`

  return (
    <div className="site-shell">
      <section className="work-section container" aria-labelledby="news-title">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'News' }]} />
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
          {posts.map((post: any) => (
            <article className="service-item" key={post.id}>
              <CalendarCheck className="service-icon" size={23} strokeWidth={1.7} aria-hidden="true" />
              <h3>{post.title}</h3>
              <p style={{ fontSize: '13px', color: 'var(--muted-ink)', margin: '0 0 6px' }}>{post.date}</p>
              <div dangerouslySetInnerHTML={{ __html: post.text }} />
              <ShareButtons title={post.title} />
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}