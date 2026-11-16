import { NextResponse } from 'next/server'
import { ensureSchema, sql } from '@/lib/db'
import { parseCookies, verifySession } from '@/lib/auth'

export async function GET(req: Request) {
  const cookies = parseCookies(req.headers.get('cookie'))
  const session = verifySession(cookies['session'])
  if (!session || session.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await ensureSchema()
  const totalRows = await sql`SELECT total_visits FROM site_stats WHERE id = 1`
  const viewRows = await sql`SELECT path, count FROM page_views`
  const pageViews: Record<string, number> = {}
  for (const r of viewRows) pageViews[r.path] = Number(r.count)
  return NextResponse.json({ visits: Number(totalRows[0]?.total_visits ?? 0), pageViews })
}