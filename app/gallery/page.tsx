export const dynamic = 'force-dynamic'

import { unstable_noStore as noStore } from 'next/cache'
import { ensureSchema, sql } from '@/lib/db'
import { ImageIcon } from 'lucide-react'

export const metadata = {
  title: 'Gallery | Het Dhuran Special Needs Centre',
  description: 'Photos and videos from the centre.',
}

export default async function GalleryPage() {
  noStore()
  await ensureSchema()
  const items = await sql`SELECT id, label, category, image_url AS image FROM gallery_items ORDER BY created_at ASC`
  const categories = Array.from(new Set(items.map((i: any) => i.category).filter(Boolean)))

  return (
    <div className="site-shell">
      <section className="work-section container" aria-labelledby="gallery-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Gallery</p>
            <h2 id="gallery-title">Photos and videos from the centre.</h2>
          </div>
          <p className="section-intro">
            A glimpse into daily life, learning and community at Het Dhuran.
          </p>
        </div>

        {categories.length > 0 && (
          <p className="section-intro" style={{ maxWidth: '720px', marginBottom: '24px' }}>
            Categories: {categories.join(', ')}
          </p>
        )}

        <div className="services-grid">
          {items.map((item: any) => (
            <article className="service-item" key={item.id}>
              {item.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.image} alt={item.label} style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '9px' }} />
              ) : (
                <ImageIcon className="service-icon" size={23} strokeWidth={1.7} aria-hidden="true" />
              )}
              <h3>{item.label}</h3>
              <p>{item.category}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}