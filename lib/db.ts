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
    await sql`ALTER TABLE gallery_items ADD COLUMN IF NOT EXISTS description text`
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
    await sql`ALTER TABLE news_items ADD COLUMN IF NOT EXISTS image_url text`
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
    await sql`ALTER TABLE events ADD COLUMN IF NOT EXISTS image_url text`
    // seed home content if empty
    const rows = await sql`SELECT id FROM home_content WHERE id = 1`
    if (rows.length === 0) {
      const defaultData = {
        heroEyebrow: 'Health care, therapy and support in Jambiani',
        heroTitle: 'Care for every one , every day.',
        heroDescription: 'Dhuran Special Needs Centre provides health care, therapy, learning and nutrition support for children and young adults in Jambiani, Zanzibar.',
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
        { label: 'Community volunteers', category: 'Care within the community', description: 'Families and local volunteers collaborating at the centre in Makunduchi and Jambiani.' },
        { label: 'Learning activities', category: 'Care within the community', description: 'Special education and sensory activities shaped around each child’s pace, interests and needs.' },
        { label: 'Therapy sessions', category: 'Health & wellbeing', description: 'Physical therapy and movement programmes that build mobility, confidence and everyday independence.' },
        { label: 'Nutrition support', category: 'Health & wellbeing', description: 'Nutritional assessment and support to help every child grow strong and healthy.' },
        { label: 'Living our compass and values', category: 'Our vision and mission', description: 'Welcoming every child with love, transparency, equality and collaboration across South Unguja.' },
        { label: 'Community activity day', category: 'Recent events', description: 'Families, caregivers and partners gathered for a vibrant day of learning and play.' },
      ]
      for (const s of seeds) {
        await sql`INSERT INTO gallery_items (label, category, description) VALUES (${s.label}, ${s.category}, ${s.description})`
      }
    } else {
      await sql`
        UPDATE gallery_items SET description = CASE 
          WHEN label = 'Community volunteers' THEN 'Families and local volunteers collaborating at the centre in Makunduchi and Jambiani.'
          WHEN label = 'Learning activities' THEN 'Special education and sensory activities shaped around each child’s pace, interests and needs.'
          WHEN label = 'Therapy sessions' THEN 'Physical therapy and movement programmes that build mobility, confidence and everyday independence.'
          WHEN label = 'Nutrition support' THEN 'Nutritional assessment and support to help every child grow strong and healthy.'
          WHEN label = 'Visitors & partners' THEN 'Welcoming every child with love, transparency, equality and collaboration across South Unguja.'
          WHEN label = 'Centre life' THEN 'A welcoming space in South Unguja supporting children with disabilities and special needs.'
          ELSE COALESCE(description, '')
        END
        WHERE description IS NULL OR description = ''
      `
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