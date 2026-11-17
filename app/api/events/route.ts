import { NextResponse } from 'next/server'
import { ensureSchema, sql } from '@/lib/db'
import { parseCookies, verifySession } from '@/lib/auth'

export async function GET() {
  await ensureSchema()
  const rows = await sql`SELECT id, title, date, description AS text, COALESCE(image_url, '') AS image FROM events ORDER BY created_at DESC`
  return NextResponse.json(rows)
}

export async function POST(req: Request) {
  const cookies = parseCookies(req.headers.get('cookie'))
  const session = verifySession(cookies['session'])
  if (!session || session.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await ensureSchema()
  const body = await req.json()
  const rows = await sql`
    INSERT INTO events (title, date, description, image_url)
    VALUES (${body.title || 'Untitled'}, ${body.date || ''}, ${body.text || ''}, ${body.image || ''})
    RETURNING id, title, date, description AS text, COALESCE(image_url, '') AS image
  `
  return NextResponse.json(rows[0])
}

export async function PUT(req: Request) {
  const cookies = parseCookies(req.headers.get('cookie'))
  const session = verifySession(cookies['session'])
  if (!session || session.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await ensureSchema()
  const payload = await req.json()
  const items = Array.isArray(payload) ? payload : [payload]
  for (const item of items) {
    if (!item?.id) continue
    await sql`
      UPDATE events SET
        title = ${item.title || 'Untitled'},
        date = ${item.date || ''},
        description = ${item.text || ''},
        image_url = ${item.image || ''}
      WHERE id = ${item.id}
    `
  }
  return NextResponse.json({ ok: true })
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
