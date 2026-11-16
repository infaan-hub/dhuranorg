import { NextResponse } from 'next/server'
import { readJson, writeJson } from '@/lib/storage'
import { hashPassword, createSession } from '@/lib/auth'

type User = { id: string; username: string; password: string; role: 'admin' }

export async function POST(req: Request) {
  const { username, password } = await req.json()
  if (!username || !password || String(password).length < 4) {
    return NextResponse.json({ error: 'Username and password (min 4 chars) required' }, { status: 400 })
  }
  const users = readJson<User[]>('users.json', [])
  if (users.some((u) => u.username === username)) {
    return NextResponse.json({ error: 'Username already exists' }, { status: 409 })
  }
  const user: User = {
    id: crypto.randomUUID(),
    username,
    password: hashPassword(password),
    role: 'admin',
  }
  users.push(user)
  writeJson('users.json', users)

  const token = createSession({ userId: user.id, username: user.username, role: 'admin' })
  const res = NextResponse.json({ ok: true, username: user.username })
  res.cookies.set('session', token, { httpOnly: true, path: '/', sameSite: 'lax' })
  return res
}