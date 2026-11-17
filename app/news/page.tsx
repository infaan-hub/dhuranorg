export const dynamic = 'force-dynamic'

import Link from 'next/link'
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
  const posts = await sql`
    SELECT id, title, published_date AS date, body AS text, COALESCE(image_url, '') AS image
    FROM news_items
    WHERE status = 'published'
    ORDER BY created_at DESC
  `

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
              {post.image && (
                <Link href={`/news/${post.id}`} style={{ display: 'block', marginBottom: '16px' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.image}
                    alt={post.title}
                    style={{ width: '100%', height: '190px', objectFit: 'cover', borderRadius: '10px', border: '1px solid var(--line)' }}
                  />
                </Link>
              )}
              <CalendarCheck className="service-icon" size={23} strokeWidth={1.7} aria-hidden="true" />
              <h3>
                <Link href={`/news/${post.id}`} style={{ color: 'inherit' }}>
                  {post.title}
                </Link>
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--muted-ink)', margin: '0 0 6px' }}>{post.date}</p>
              <div dangerouslySetInnerHTML={{ __html: post.text }} />
              <ShareButtons title={post.title} />
              <Link href={`/news/${post.id}`} className="text-link">
                Read article <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>

        {posts.length === 0 && (
          <p style={{ color: 'var(--muted-ink)' }}>No news articles yet. Please check back soon.</p>
        )}
      </section>
    </div>
  )
}
