import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifySession, parseCookies } from '@/lib/auth'
import { AdminShell } from '@/components/admin/admin-shell'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies()
  const session = verifySession(cookieStore.get('session')?.value)
  if (!session || session.role !== 'admin') {
    redirect('/login')
  }
  return <AdminShell>{children}</AdminShell>
}