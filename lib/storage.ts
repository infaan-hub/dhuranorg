import fs from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')

export function readJson<T>(file: string, fallback: T): T {
  try {
    const full = path.join(DATA_DIR, file)
    if (!fs.existsSync(full)) return fallback
    const raw = fs.readFileSync(full, 'utf8')
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function writeJson(file: string, data: unknown): void {
  const full = path.join(DATA_DIR, file)
  fs.writeFileSync(full, JSON.stringify(data, null, 2), 'utf8')
}