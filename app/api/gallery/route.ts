import { NextResponse } from 'next/server'
import { ensureSchema, sql } from '@/lib/db'
import { parseCookies, verifySession } from '@/lib/auth'

export async function GET() {
  await ensureSchema()
  const rows = await sql`SELECT id, label, category, image_url AS image FROM gallery_items ORDER BY created_at ASC`
  return NextResponse.json(rows)
}

export async function POST(req: Request) {
  const cookies = parseCookies(req.headers.get('cookie'))
  const session = verifySession(cookies['session'])
  if (!session || session.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await ensureSchema()
  const body = await req.json()
  const rows = await sql`
    INSERT INTO gallery_items (label, category, image_url)
    VALUES (${body.label || 'Untitled'}, ${body.category || 'General'}, ${body.image || ''})
    RETURNING id, label, category, image_url AS image
  `
  return NextResponse.json(rows[0])
}

export async function PUT(req: Request) {
  const cookies = parseCookies(req.headers.get('cookie'))
  const session = verifySession(cookies['session'])
  if (!session || session.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await ensureSchema()
  const body = await req.json() as any[]
  // replace all
  await sql`DELETE FROM gallery_items`
  for (const item of body) {
    await sql`INSERT INTO gallery_items (id, label, category, image_url) VALUES (${item.id}, ${item.label}, ${item.category}, ${item.image})`
  }
  return NextResponse.json({ ok: true })
}

export async function DELETE(req: Request) {
  const cookies = parseCookies(req.headers.get('cookie'))
  const session = verifySession(cookies['session'])
  if (!session || session.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await ensureSchema()
  const { id } = await req.json()
  await sql`DELETE FROM gallery_items WHERE id = ${id}`
  return NextResponse.json({ ok: true })
}