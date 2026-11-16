import { NextResponse } from 'next/server'
import { parseCookies, verifySession } from '@/lib/auth'

export async function GET(req: Request) {
  const cookies = parseCookies(req.headers.get('cookie'))
  const session = verifySession(cookies['session'])
  if (!session) return NextResponse.json({ user: null }, { status: 401 })
  return NextResponse.json({ user: session })
}