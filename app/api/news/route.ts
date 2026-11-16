import { NextResponse } from 'next/server'
import { readJson, writeJson } from '@/lib/storage'
import { parseCookies, verifySession } from '@/lib/auth'

export async function GET() {
  return NextResponse.json(readJson('news.json', []))
}

export async function POST(req: Request) {
  const cookies = parseCookies(req.headers.get('cookie'))
  const session = verifySession(cookies['session'])
  if (!session || session.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const items = readJson<any[]>('news.json', [])
  const item = { id: crypto.randomUUID(), title: body.title || 'Untitled', date: body.date || new Date().getFullYear().toString(), text: body.text || '' }
  items.unshift(item)
  writeJson('news.json', items)
  return NextResponse.json(item)
}

export async function PUT(req: Request) {
  const cookies = parseCookies(req.headers.get('cookie'))
  const session = verifySession(cookies['session'])
  if (!session || session.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  writeJson('news.json', body)
  return NextResponse.json({ ok: true })
}

export async function DELETE(req: Request) {
  const cookies = parseCookies(req.headers.get('cookie'))
  const session = verifySession(cookies['session'])
  if (!session || session.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await req.json()
  const items = readJson<any[]>('news.json', []).filter((i) => i.id !== id)
  writeJson('news.json', items)
  return NextResponse.json({ ok: true })
}