import { NextResponse } from 'next/server'
import { readJson, writeJson } from '@/lib/storage'
import { parseCookies, verifySession } from '@/lib/auth'

export async function GET() {
  return NextResponse.json(readJson('gallery.json', []))
}

export async function POST(req: Request) {
  const cookies = parseCookies(req.headers.get('cookie'))
  const session = verifySession(cookies['session'])
  if (!session || session.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const items = readJson<any[]>('gallery.json', [])
  const item = { id: crypto.randomUUID(), label: body.label || 'Untitled', category: body.category || 'General', image: body.image || '' }
  items.push(item)
  writeJson('gallery.json', items)
  return NextResponse.json(item)
}

export async function PUT(req: Request) {
  const cookies = parseCookies(req.headers.get('cookie'))
  const session = verifySession(cookies['session'])
  if (!session || session.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  writeJson('gallery.json', body)
  return NextResponse.json({ ok: true })
}

export async function DELETE(req: Request) {
  const cookies = parseCookies(req.headers.get('cookie'))
  const session = verifySession(cookies['session'])
  if (!session || session.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await req.json()
  const items = readJson<any[]>('gallery.json', []).filter((i) => i.id !== id)
  writeJson('gallery.json', items)
  return NextResponse.json({ ok: true })
}