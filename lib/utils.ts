import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTsh(amount: number): string {
  return new Intl.NumberFormat('sw-TZ', {
    style: 'currency',
    currency: 'TZS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(iso: string | Date): string {
  return new Date(iso).toLocaleDateString('sw-TZ', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatDateShort(iso: string | Date): string {
  return new Date(iso).toLocaleDateString('sw-TZ', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function ageFromDOB(dob?: string): string {
  if (!dob) return ''
  const b = new Date(dob)
  if (isNaN(b.getTime())) return ''
  const n = new Date()
  let m = (n.getFullYear() - b.getFullYear()) * 12 + (n.getMonth() - b.getMonth())
  if (n.getDate() < b.getDate()) m--
  if (m < 0) return ''
  const y = Math.floor(m / 12)
  const r = m % 12
  return ((y ? y + ' miaka ' : '') + (r || !y ? r + ' miezi' : '')).trim()
}

export function escapeHtml(str: string): string {
  return String(str == null ? '' : str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[c] as string))
}