import { NextResponse } from 'next/server'
import { readJson, writeJson } from '@/lib/storage'

export async function POST(req: Request) {
  const stats = readJson<any>('stats.json', { visits: 0, pageViews: {} })
  stats.visits = (stats.visits || 0) + 1
  const { path } = await req.json().catch(() => ({ path: '/' }))
  stats.pageViews = stats.pageViews || {}
  stats.pageViews[path] = (stats.pageViews[path] || 0) + 1
  try { writeJson('stats.json', stats) } catch { /* read-only fs on serverless */ }
  return NextResponse.json({ ok: true })
}