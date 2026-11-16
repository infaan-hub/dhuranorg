import { NextResponse } from 'next/server'
import { readJson, writeJson } from '@/lib/storage'
import { parseCookies, verifySession } from '@/lib/auth'

export async function GET(req: Request) {
  const cookies = parseCookies(req.headers.get('cookie'))
  const session = verifySession(cookies['session'])
  if (!session || session.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const stats = readJson('stats.json', { visits: 0, pageViews: {} })
  return NextResponse.json(stats)
}