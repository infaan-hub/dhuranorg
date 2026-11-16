import { NextResponse } from 'next/server'
import { ensureSchema, sql } from '@/lib/db'
import { hashPassword, createSession } from '@/lib/auth'

export async function POST(req: Request) {
  await ensureSchema()
  const { username, password, fullName, email } = await req.json()
  if (!username || !password || String(password).length < 4) {
    return NextResponse.json({ error: 'Username and password (min 4 chars) required' }, { status: 400 })
  }
  if (!fullName) return NextResponse.json({ error: 'Full name is required' }, { status: 400 })
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
  }

  const countRows = await sql`SELECT count(*)::int AS c FROM admins`
  if (countRows[0].c >= 3) {
    return NextResponse.json({ error: 'Maximum of 3 admins allowed' }, { status: 403 })
  }
  const existing = await sql`SELECT id FROM admins WHERE username = ${username} OR email = ${email}`
  if (existing.length > 0) {
    return NextResponse.json({ error: 'Username or email already registered' }, { status: 409 })
  }

  const passwordHash = hashPassword(password)
  const rows = await sql`
    INSERT INTO admins (username, password_hash, full_name, email, role)
    VALUES (${username}, ${passwordHash}, ${fullName}, ${email}, 'admin')
    RETURNING id, username
  `
  const user = rows[0]
  const token = createSession({ userId: user.id, username: user.username, role: 'admin' })
  const res = NextResponse.json({ ok: true, username: user.username })
  res.cookies.set('session', token, { httpOnly: true, path: '/', sameSite: 'lax' })
  return res
}