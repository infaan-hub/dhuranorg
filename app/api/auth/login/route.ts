import { NextResponse } from 'next/server'
import { ensureSchema, sql } from '@/lib/db'
import { verifyPassword, createSession } from '@/lib/auth'

export async function POST(req: Request) {
  await ensureSchema()
  const { username, password } = await req.json()
  const rows = await sql`SELECT id, username, password_hash FROM admins WHERE username = ${username}`
  const user = rows[0]
  if (!user || !verifyPassword(password, user.password_hash)) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }
  const token = createSession({ userId: user.id, username: user.username, role: 'admin' })
  const res = NextResponse.json({ ok: true, username: user.username })
  res.cookies.set('session', token, { httpOnly: true, path: '/', sameSite: 'lax' })
  return res
}