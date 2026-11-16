export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { ensureSchema, sql } from '@/lib/db'
import { parseCookies, verifySession } from '@/lib/auth'

export async function GET() {
  await ensureSchema()
  const rows = await sql`SELECT data FROM home_content WHERE id = 1`
  const data = rows[0]?.data ?? {}
  return NextResponse.json(data)
}

export async function PUT(req: Request) {
  const cookies = parseCookies(req.headers.get('cookie'))
  const session = verifySession(cookies['session'])
  if (!session || session.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  await ensureSchema()
  const body = await req.json()
  await sql`UPDATE home_content SET data = ${JSON.stringify(body)}::jsonb, updated_at = now() WHERE id = 1`
  return NextResponse.json({ ok: true })
}