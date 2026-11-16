import { NextResponse } from 'next/server'
import { ensureSchema, sql } from '@/lib/db'

export async function POST(req: Request) {
  await ensureSchema()
  const { name, email, message } = await req.json()
  if (!name || !email || !message) {
    return NextResponse.json({ error: 'All fields required' }, { status: 400 })
  }
  await sql`INSERT INTO contact_submissions (name, email, message) VALUES (${name}, ${email}, ${message})`
  return NextResponse.json({ ok: true })
}