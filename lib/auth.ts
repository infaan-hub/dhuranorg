import type { Role } from '@/types'
import { loadSession, saveSession, clearSession } from '@/lib/storage'

export function isAuthenticated(session: { role: Role } | null): boolean {
  return !!session?.role
}

export function isParent(session: { role: Role } | null): boolean {
  return session?.role === 'parent'
}

export function isAdmin(session: { role: Role } | null): boolean {
  return session?.role === 'admin'
}

export function canAccessParentAccount(
  session: { role: Role; kid?: string } | null,
  childId: string
): boolean {
  if (!isParent(session)) return false
  return session.kid === childId
}

export function canAccessAdmin(session: { role: Role } | null): boolean {
  return isAdmin(session)
}

/**
 * Verify admin password (mirrors v7: if($('aPw').value!=ADMIN))
 */
export function verifyAdminPassword(input: string): boolean {
  return input === process.env.NEXT_PUBLIC_ADMIN_PASSWORD
}

/**
 * Store parent login session (mirrors v7 lgP submit)
 */
export function createParentSession(kidNo: string): void {
  saveSession({ role: 'parent', kid: kidNo })
}

/**
 * Store admin login session (mirrors v7 lgA submit)
 */
export function createAdminSession(viewChild?: string): void {
  saveSession({ role: 'admin', view: viewChild })
}

/**
 * Logout (mirrors v7 nOut click)
 */
export function logout(): void {
  clearSession()
}