import type { AppData, Child, Donation, Event, GalleryItem, Role } from '@/types'

const KM_DATA_KEY = 'kmData'
const KM_MEDIA_DB = 'kmMedia'
const KM_SESSION_KEY = 'kmS'

const DEFAULT_DATA: AppData = {
  kids: [],
  dons: [],
  gal: [],
  ev: [],
}

export const DEFAULT_BANK = {
  benki: '',
  jina: '',
  akaunti: '',
  tawi: '',
  swift: '',
  sarafu: 'TZS',
  link: '',
  maelezo: '',
}

export const DEFAULT_ADMIN_PASSWORD =
  process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123'

export const DEFAULT_TEMPLATE =
  'Habari , ukumbusho kutoka :  ana kliniki {siku} ({tarehe}). Tafadhali mlete kliniki. Kwa maelezo piga .'

export function loadData(): AppData {
  if (typeof window === 'undefined') return DEFAULT_DATA
  try {
    const raw = localStorage.getItem(KM_DATA_KEY)
    if (!raw) return DEFAULT_DATA
    const parsed = JSON.parse(raw) as Partial<AppData>
    return {
      kids: parsed.kids || [],
      dons: parsed.dons || [],
      gal: parsed.gal || [],
      ev: parsed.ev || [],
      tpl: parsed.tpl,
    }
  } catch {
    return DEFAULT_DATA
  }
}

export function saveData(data: AppData): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(KM_DATA_KEY, JSON.stringify(data))
  } catch {
    if (typeof window !== 'undefined') {
      console.error('Hifadhi imejaa. Tumia picha ndogo.')
    }
  }
}

export function loadSession(): { role: Role; kid?: string; view?: string; act?: string } {
  if (typeof window === 'undefined') return { role: null }
  try {
    const raw = sessionStorage.getItem(KM_SESSION_KEY)
    if (!raw) return { role: null }
    return JSON.parse(raw)
  } catch {
    return { role: null }
  }
}

export function saveSession(session: { role: Role; kid?: string; view?: string; act?: string }): void {
  if (typeof window === 'undefined') return
  try {
    sessionStorage.setItem(KM_SESSION_KEY, JSON.stringify(session))
  } catch {
    // sessionStorage may be unavailable in private mode
  }
}

export function clearSession(): void {
  if (typeof window === 'undefined') return
  try {
    sessionStorage.removeItem(KM_SESSION_KEY)
  } catch {
    // ignore
  }
}

class MediaStore {
  private dbPromise: Promise<IDBDatabase | null> | null = null

  private open(): Promise<IDBDatabase | null> {
    if (this.dbPromise) return this.dbPromise
    if (typeof window === 'undefined' || !('indexedDB' in window)) {
      this.dbPromise = Promise.resolve(null)
      return this.dbPromise
    }
    this.dbPromise = new Promise((resolve) => {
      try {
        const req = indexedDB.open(KM_MEDIA_DB, 1)
        req.onupgradeneeded = () => {
          req.result.createObjectStore('m')
        }
        req.onsuccess = () => resolve(req.result)
        req.onerror = () => resolve(null)
      } catch {
        resolve(null)
      }
    })
    return this.dbPromise
  }

  async put(key: string, value: string): Promise<boolean> {
    const db = await this.open()
    if (!db) return false
    return new Promise((resolve) => {
      const tx = db.transaction('m', 'readwrite')
      tx.objectStore('m').put(value, key)
      tx.oncomplete = () => resolve(true)
      tx.onerror = () => resolve(false)
    })
  }

  async get(key: string): Promise<string | null> {
    const db = await this.open()
    if (!db) return null
    return new Promise((resolve) => {
      const q = db.transaction('m').objectStore('m').get(key)
      q.onsuccess = () => resolve(q.result ?? null)
      q.onerror = () => resolve(null)
    })
  }

  async del(key: string): Promise<void> {
    const db = await this.open()
    if (!db) return
    db.transaction('m', 'readwrite').objectStore('m').delete(key)
  }
}

export const mediaStore = new MediaStore()

export function compressImage(
  file: File,
  maxDimension: number = 900,
  quality: number = 0.7
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const scale = Math.min(1, maxDimension / Math.max(img.width, img.height))
        const canvas = document.createElement('canvas')
        canvas.width = img.width * scale
        canvas.height = img.height * scale
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('Canvas context unavailable'))
          return
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/jpeg', quality))
      }
      img.onerror = () => reject(new Error('Image load failed'))
      img.src = e.target?.result as string
    }
    reader.onerror = () => reject(new Error('File read failed'))
    reader.readAsDataURL(file)
  })
}

export function generateChildNo(existing: Child[]): string {
  const next = existing.length + 1
  return `KM-${String(next).padStart(4, '0')}`
}

export function generatePassword(): string {
  return Math.random().toString(36).slice(2, 8)
}

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10)
}

export function todaySwahili(): string {
  return new Date().toLocaleDateString('sw-TZ')
}

export function formatTsh(amount: number): string {
  return new Intl.NumberFormat('sw-TZ', {
    style: 'currency',
    currency: 'TZS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}