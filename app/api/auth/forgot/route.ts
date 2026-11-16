import { NextResponse } from 'next/server'
import { ensureSchema, sql } from '@/lib/db'
import crypto from 'crypto'

export async function POST(req: Request) {
  await ensureSchema()
  const { email } = await req.json()
  const rows = await sql`SELECT id FROM admins WHERE email = ${email}`
  if (rows.length === 0) {
    // don't reveal existence
    return NextResponse.json({ ok: true })
  }
  const token = crypto.randomBytes(32).toString('hex')
  const expires = new Date(Date.now() + 1000 * 60 * 30) // 30 min
  await sql`UPDATE admins SET reset_token = ${token}, reset_expires = ${expires.toISOString()} WHERE email = ${email}`
  return NextResponse.json({ ok: true, token }) // in production, email this token instead
}