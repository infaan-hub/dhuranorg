import { NextResponse } from 'next/server'
import { ensureSchema, sql } from '@/lib/db'
import { hashPassword } from '@/lib/auth'

export async function POST(req: Request) {
  await ensureSchema()
  const { token, password } = await req.json()
  if (!token || !password || String(password).length < 4) {
    return NextResponse.json({ error: 'Token and password (min 4 chars) required' }, { status: 400 })
  }
  const rows = await sql`SELECT id FROM admins WHERE reset_token = ${token} AND reset_expires > now()`
  if (rows.length === 0) {
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 })
  }
  const hash = hashPassword(password)
  await sql`UPDATE admins SET password_hash = ${hash}, reset_token = NULL, reset_expires = NULL WHERE reset_token = ${token}`
  return NextResponse.json({ ok: true })
}