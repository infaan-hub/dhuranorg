export const dynamic = 'force-dynamic'
export const revalidate = 0

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { cookies } from 'next/headers'
import { ArrowLeft, CalendarCheck } from 'lucide-react'
import { ensureSchema, sql } from '@/lib/db'
import { verifySession } from '@/lib/auth'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { ShareButtons } from '@/components/share-buttons'

type NewsPost = {
  id: string
  title: string
  date: string | null
  text: string | null
  status: string
  image: string
}

export default async function NewsDetailPage({ params }: { params: { id: string } }) {
  await ensureSchema()

  let post: NewsPost | null = null
  try {
    const rows = await sql`
      SELECT id, title, published_date AS date, body AS text, status, COALESCE(image_url, '') AS image
      FROM news_items
      WHERE id = ${params.id}
      LIMIT 1
    `
    post = (rows[0] as NewsPost) ?? null
  } catch {
    post = null
  }

  // Drafts are only visible to a signed-in admin.
  const session = verifySession(cookies().get('session')?.value)
  if (!post || (post.status !== 'published' && session?.role !== 'admin')) notFound()

  return (
    <div className="site-shell">
      <section className="work-section container" style={{ maxWidth: '900px' }}>
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'News', href: '/news' },
            { label: post.title },
          ]}
        />

        <article>
          <p className="eyebrow">News &amp; blog</p>
          <h1 style={{ font: '500 clamp(2rem, 4vw, 3rem)/1.15 var(--font-heading)', margin: '10px 0 10px', color: 'var(--ink)' }}>
            {post.title}
          </h1>
          {post.date && (
            <p style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', margin: '0 0 26px', fontSize: '14px', color: 'var(--muted-ink)' }}>
              <CalendarCheck size={16} /> {post.date}
            </p>
          )}

          {post.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.image}
              alt={post.title}
              style={{
                display: 'block',
                width: '100%',
                maxHeight: '520px',
                objectFit: 'cover',
                borderRadius: '14px',
                border: '1px solid var(--line)',
                margin: '0 0 30px',
              }}
            />
          )}

          <div
            style={{ fontSize: '17px', lineHeight: 1.8, color: 'var(--ink)' }}
            dangerouslySetInnerHTML={{ __html: post.text || '' }}
          />

          <div style={{ marginTop: '32px', paddingTop: '18px', borderTop: '1px solid var(--line)' }}>
            <ShareButtons title={post.title} />
          </div>
        </article>

        <Link
          href="/news"
          className="text-link"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '36px' }}
        >
          <ArrowLeft size={16} /> Back to all news
        </Link>
      </section>
    </div>
  )
}
