import fs from 'fs'
import os from 'os'
import path from 'path'

const PRIMARY_DIR = path.join(process.cwd(), 'data')
const TMP_DIR = path.join(os.tmpdir(), 'dhuran-data')

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

export function readJson<T>(file: string, fallback: T): T {
  for (const dir of [TMP_DIR, PRIMARY_DIR]) {
    try {
      const full = path.join(dir, file)
      if (fs.existsSync(full)) {
        const raw = fs.readFileSync(full, 'utf8')
        return JSON.parse(raw) as T
      }
    } catch {
      // try next
    }
  }
  return fallback
}

export function writeJson(file: string, data: unknown): void {
  const dirs = [PRIMARY_DIR, TMP_DIR]
  let lastErr: unknown
  for (const dir of dirs) {
    try {
      ensureDir(dir)
      const full = path.join(dir, file)
      fs.writeFileSync(full, JSON.stringify(data, null, 2), 'utf8')
      return
    } catch (e) {
      lastErr = e
    }
  }
  throw lastErr
}