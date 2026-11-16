export const dynamic = 'force-dynamic'
export const revalidate = 0

import { NextResponse } from 'next/server'
import { unstable_noStore as noStore } from 'next/cache'
import { ensureSchema, sql } from '@/lib/db'
import { parseCookies, verifySession } from '@/lib/auth'

export async function GET() {
  noStore()
  await ensureSchema()
  const rows = await sql`SELECT id, title, published_date AS date, body AS text FROM news_items ORDER BY created_at DESC`
  return NextResponse.json(rows)
}

export async function POST(req: Request) {
  const cookies = parseCookies(req.headers.get('cookie'))
  const session = verifySession(cookies['session'])
  if (!session || session.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await ensureSchema()
  const body = await req.json()
  const rows = await sql`
    INSERT INTO news_items (title, published_date, body)
    VALUES (${body.title || 'Untitled'}, ${body.date || new Date().getFullYear().toString()}, ${body.text || ''})
    RETURNING id, title, published_date AS date, body AS text
  `
  return NextResponse.json(rows[0])
}

export async function PUT(req: Request) {
  const cookies = parseCookies(req.headers.get('cookie'))
  const session = verifySession(cookies['session'])
  if (!session || session.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await ensureSchema()
  const body = await req.json() as any[]
  await sql`DELETE FROM news_items`
  for (const item of body) {
    await sql`INSERT INTO news_items (id, title, published_date, body) VALUES (${item.id}, ${item.title}, ${item.date}, ${item.text})`
  }
  return NextResponse.json({ ok: true })
}

export async function DELETE(req: Request) {
  const cookies = parseCookies(req.headers.get('cookie'))
  const session = verifySession(cookies['session'])
  if (!session || session.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await ensureSchema()
  const { id } = await req.json()
  await sql`DELETE FROM news_items WHERE id = ${id}`
  return NextResponse.json({ ok: true })
}