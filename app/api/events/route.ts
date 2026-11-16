import { NextResponse } from 'next/server'
import { ensureSchema, sql } from '@/lib/db'
import { parseCookies, verifySession } from '@/lib/auth'

export async function GET() {
  await ensureSchema()
  const rows = await sql`SELECT id, title, date, description AS text FROM events ORDER BY created_at DESC`
  return NextResponse.json(rows)
}

export async function POST(req: Request) {
  const cookies = parseCookies(req.headers.get('cookie'))
  const session = verifySession(cookies['session'])
  if (!session || session.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await ensureSchema()
  const body = await req.json()
  const rows = await sql`
    INSERT INTO events (title, date, description)
    VALUES (${body.title || 'Untitled'}, ${body.date || ''}, ${body.text || ''})
    RETURNING id, title, date, description AS text
  `
  return NextResponse.json(rows[0])
}

export async function DELETE(req: Request) {
  const cookies = parseCookies(req.headers.get('cookie'))
  const session = verifySession(cookies['session'])
  if (!session || session.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await ensureSchema()
  const { id } = await req.json()
  await sql`DELETE FROM events WHERE id = ${id}`
  return NextResponse.json({ ok: true })
}