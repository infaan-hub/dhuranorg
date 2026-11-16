import { NextResponse } from 'next/server'
import { ensureSchema, sql } from '@/lib/db'

export async function POST(req: Request) {
  try {
    await ensureSchema()
    await sql`UPDATE site_stats SET total_visits = total_visits + 1 WHERE id = 1`
    const { path } = await req.json().catch(() => ({ path: '/' }))
    await sql`
      INSERT INTO page_views (path, count) VALUES (${path || '/'}, 1)
      ON CONFLICT (path) DO UPDATE SET count = page_views.count + 1
    `
  } catch {
    // ignore
  }
  return NextResponse.json({ ok: true })
}