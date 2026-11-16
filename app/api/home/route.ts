import { NextResponse } from 'next/server'
import { readJson, writeJson } from '@/lib/storage'
import { parseCookies, verifySession } from '@/lib/auth'

export async function GET() {
  const data = readJson('home.json', {})
  return NextResponse.json(data)
}

export async function PUT(req: Request) {
  const cookies = parseCookies(req.headers.get('cookie'))
  const session = verifySession(cookies['session'])
  if (!session || session.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const body = await req.json()
  writeJson('home.json', body)
  return NextResponse.json({ ok: true })
}