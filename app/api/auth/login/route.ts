import { NextResponse } from 'next/server'
import { readJson } from '@/lib/storage'
import { verifyPassword, createSession } from '@/lib/auth'

type User = { id: string; username: string; password: string; role: 'admin' }

export async function POST(req: Request) {
  const { username, password } = await req.json()
  const users = readJson<User[]>('users.json', [])
  const user = users.find((u) => u.username === username)
  if (!user || !verifyPassword(password, user.password)) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }
  const token = createSession({ userId: user.id, username: user.username, role: 'admin' })
  const res = NextResponse.json({ ok: true, username: user.username })
  res.cookies.set('session', token, { httpOnly: true, path: '/', sameSite: 'lax' })
  return res
}