export const dynamic = 'force-dynamic'

import { unstable_noStore as noStore } from 'next/cache'
import { ensureSchema, sql } from '@/lib/db'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { HomeGallery } from '@/components/home-gallery'

export const metadata = {
  title: 'Gallery | Dhuran Special Needs Centre',
  description: 'Photos, milestones and descriptions from across our centre sections.',
}

export default async function GalleryPage() {
  noStore()
  await ensureSchema()
  let items: any[] = []
  try {
    items = await sql`
      SELECT id, label, category, COALESCE(description, '') AS description, image_url AS image 
      FROM gallery_items 
      ORDER BY created_at ASC
    `
  } catch {
    items = []
  }

  return (
    <div className="site-shell">
      <section className="work-section container" aria-labelledby="gallery-title">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Gallery' }]} />
        <div className="section-heading">
          <div>
            <p className="eyebrow">Gallery</p>
            <h2 id="gallery-title">Photos and moments from the centre.</h2>
          </div>
          <p className="section-intro">
            Explore photos and descriptions across each of our programmes, care initiatives and community activities.
          </p>
        </div>

        <HomeGallery items={items} />
      </section>
    </div>
  )
}
