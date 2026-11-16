import { neon } from '@neondatabase/serverless'

export const sql = neon(process.env.DATABASE_URL!)

let schemaReady: Promise<void> | null = null

export function ensureSchema(): Promise<void> {
  if (schemaReady) return schemaReady
  schemaReady = (async () => {
    await sql`
      CREATE TABLE IF NOT EXISTS admins (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        username text NOT NULL UNIQUE,
        password_hash text NOT NULL,
        full_name text,
        email text,
        role text NOT NULL DEFAULT 'admin',
        reset_token text,
        reset_expires timestamptz,
        created_at timestamptz NOT NULL DEFAULT now()
      )
    `
    await sql`ALTER TABLE admins ADD COLUMN IF NOT EXISTS reset_token text`
    await sql`ALTER TABLE admins ADD COLUMN IF NOT EXISTS reset_expires timestamptz`
    await sql`
      CREATE TABLE IF NOT EXISTS home_content (
        id int PRIMARY KEY DEFAULT 1,
        data jsonb NOT NULL,
        updated_at timestamptz NOT NULL DEFAULT now()
      )
    `
    await sql`
      CREATE TABLE IF NOT EXISTS gallery_items (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        label text NOT NULL,
        category text,
        image_url text,
        created_at timestamptz NOT NULL DEFAULT now()
      )
    `
    await sql`
      CREATE TABLE IF NOT EXISTS news_items (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        title text NOT NULL,
        published_date text,
        body text,
        status text NOT NULL DEFAULT 'published',
        created_at timestamptz NOT NULL DEFAULT now()
      )
    `
    await sql`ALTER TABLE news_items ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'published'`
    await sql`
      CREATE TABLE IF NOT EXISTS site_stats (
        id int PRIMARY KEY DEFAULT 1,
        total_visits bigint NOT NULL DEFAULT 0
      )
    `
    await sql`
      CREATE TABLE IF NOT EXISTS page_views (
        path text PRIMARY KEY,
        count bigint NOT NULL DEFAULT 0
      )
    `
    await sql`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        name text,
        email text,
        message text,
        created_at timestamptz NOT NULL DEFAULT now()
      )
    `
    await sql`
      CREATE TABLE IF NOT EXISTS media_items (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        name text,
        url text NOT NULL,
        created_at timestamptz NOT NULL DEFAULT now()
      )
    `
    await sql`
      CREATE TABLE IF NOT EXISTS events (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        title text NOT NULL,
        date text,
        description text,
        created_at timestamptz NOT NULL DEFAULT now()
      )
    `
    // seed home content if empty
    const rows = await sql`SELECT id FROM home_content WHERE id = 1`
    if (rows.length === 0) {
      const defaultData = {
        heroEyebrow: 'Health care, therapy and support in Jambiani',
        heroTitle: 'Care for every one , every day.',
        heroDescription: 'Het Dhuran Special Needs Centre provides health care, therapy, learning and nutrition support for children and young adults in Jambiani, Zanzibar.',
        heroBackground: '',
        services: [
          { icon: 'BookOpen', title: 'Individual learning', text: 'Special education and sensory activities shaped around each child’s pace, interests and needs.' },
          { icon: 'Accessibility', title: 'Movement & therapy', text: 'Physical therapy and rehabilitation support mobility, confidence and everyday independence.' },
          { icon: 'HeartHandshake', title: 'Health & nourishment', text: 'Medical and nutritional care supported by specialized health staff and trained local physiotherapists.' },
        ],
        healthItems: [
          { icon: 'Stethoscope', title: 'Medical care', text: 'Routine check-ups, medication support and follow-up with local clinics and specialists.' },
          { icon: 'Activity', title: 'Therapy & rehabilitation', text: 'Physiotherapy and movement programmes that build mobility, confidence and independence.' },
          { icon: 'Apple', title: 'Nutrition', text: 'Nutritional assessment and support to help every child grow strong and healthy.' },
          { icon: 'CalendarCheck', title: 'Clinic follow-ups', text: 'Scheduled reviews and reminders so no child misses important care.' },
        ],
        careItems: [
          { icon: 'Stethoscope', title: 'Assessment', text: 'Initial assessment and personalised care planning for each child.', href: 'https://zan-medibook.vercel.app/', cta: 'Book a visit' },
          { icon: 'Accessibility', title: 'Therapy', text: 'Physiotherapy and movement programmes that build mobility and independence.', href: '#health', cta: 'Learn more' },
          { icon: 'Apple', title: 'Nutrition', text: 'Nutritional assessment and support to help every child grow strong and healthy.', href: '#health', cta: 'Learn more' },
          { icon: 'CalendarCheck', title: 'Follow-ups', text: 'Scheduled reviews and reminders so no child misses important care.', href: 'https://zan-medibook.vercel.app/', cta: 'Contact us' },
        ],
      }
      await sql`INSERT INTO home_content (id, data) VALUES (1, ${JSON.stringify(defaultData)}::jsonb)`
    }
    const srows = await sql`SELECT id FROM site_stats WHERE id = 1`
    if (srows.length === 0) {
      await sql`INSERT INTO site_stats (id, total_visits) VALUES (1, 0)`
    }
    // seed gallery if empty
    const gcount = await sql`SELECT count(*)::int AS c FROM gallery_items`
    if (gcount[0].c === 0) {
      const seeds = [
        { label: 'Community volunteers', category: 'Community' },
        { label: 'Learning activities', category: 'Learning' },
        { label: 'Therapy sessions', category: 'Therapy' },
        { label: 'Nutrition support', category: 'Health' },
        { label: 'Visitors & partners', category: 'Community' },
        { label: 'Centre life', category: 'General' },
      ]
      for (const s of seeds) {
        await sql`INSERT INTO gallery_items (label, category) VALUES (${s.label}, ${s.category})`
      }
    }
    // seed events if empty
    const ecount = await sql`SELECT count(*)::int AS c FROM events`
    if (ecount[0].c === 0) {
      const seeds = [
        { title: 'Community activity day', date: '2026-12-05', description: 'Families, caregivers and volunteers come together for learning and play.' },
        { title: 'Health and nutrition week', date: '2026-12-12', description: 'Routine check-ups and nutrition support for the children.' },
      ]
      for (const s of seeds) {
        await sql`INSERT INTO events (title, date, description) VALUES (${s.title}, ${s.date}, ${s.description})`
      }
    }
    // seed news if empty
    const ncount = await sql`SELECT count(*)::int AS c FROM news_items`
    if (ncount[0].c === 0) {
      const seeds = [
        { title: 'Welcome to our new website', published_date: '2026', body: 'We are sharing more about our work, our children and our community in Jambiani.' },
        { title: 'Community activity day', published_date: '2026', body: 'Families, caregivers and volunteers came together for a day of learning and play.' },
        { title: 'Health and nutrition week', published_date: '2026', body: 'Routine check-ups and nutrition support for the children at the centre.' },
      ]
      for (const s of seeds) {
        await sql`INSERT INTO news_items (title, published_date, body) VALUES (${s.title}, ${s.published_date}, ${s.body})`
      }
    }
  })().catch((e) => {
    schemaReady = null
    throw e
  })
  return schemaReady
}