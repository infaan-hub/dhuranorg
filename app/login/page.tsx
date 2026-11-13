'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Lock, User, Shield, Login } from 'lucide-react'
import {
  loadData,
  saveData,
  createParentSession,
  createAdminSession,
  DEFAULT_ADMIN_PASSWORD,
} from '@/lib/storage'
import { formatTsh } from '@/lib/utils'
import type { Child } from '@/types'

export default function LoginPage() {
  const router = useRouter()
  const [tab, setTab] = useState<'parent' | 'admin'>('parent')
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const handleParentLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const regNo = (formData.get('regNo') as string).trim().toUpperCase()
    const password = formData.get('password') as string

    try {
      const data = loadData()
      const kid = data.kids.find(
        (k) => k.no === regNo && k.pass === password
      )
      if (!kid) {
        setError('Namba ya usajili au nenosiri si sahihi.')
        setLoading(false)
        return
      }
      createParentSession(kid.no)
      router.push(`/akaunti/${kid.no}`)
      router.refresh()
    } catch {
      setError('Tumilizo limejitikiza. Jaribu tena.')
      setLoading(false)
    }
  }

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const password = formData.get('adminPassword') as string

    if (password !== DEFAULT_ADMIN_PASSWORD) {
      setError('Nenosiri si sahihi.')
      setLoading(false)
      return
    }

    createAdminSession()
    router.push('/admin')
    router.refresh()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Inga
          </CardTitle>
          <CardDescription>
            Namba ya usajili na nenosiri hutolewa na kituo baada ya
            mtoto kusajiliwa.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs
            value={tab}
            onValueChange={(v) => setTab(v as 'parent' | 'admin')}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="parent">
                <User className="w-4 h-4 mr-2" />
              </TabsTrigger>
              <TabsTrigger value="admin">
                <Shield className="w-4 h-4 mr-2" />
              </TabsTrigger>
            </TabsList>

            <TabsContent value="parent" className="space-y-4">
              <form onSubmit={handleParentLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="regNo">Namba ya usajili wa mtoto</Label>
                  <Input
                    id="regNo"
                    placeholder="KM-0001"
                    required
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Nenosiri</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    className="w-full"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Inaingia...' : <Login className="w-4 h-4 mr-2" />}
                </Button>
                <p className="text-xs text-muted-foreground">
                  Namba na nenosiri hutolewa na kituo baada ya mtoto kusajiliwa.
                </p>
              </form>
            </TabsContent>

            <TabsContent value="admin" className="space-y-4">
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="adminPassword">Nenosiri</Label>
                  <Input
                    id="adminPassword"
                    type="password"
                    required
                    className="w-full"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Inaingia...' : <Login className="w-4 h-4 mr-2" />}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        {error && (
          <CardFooter className="bg-red-50 border-red-100 p-3 rounded-lg">
            <p className="text-sm text-red-800 flex items-center gap-2">
              <Lock className="w-4 h-4" /> {error}
            </p>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}