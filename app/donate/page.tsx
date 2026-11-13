'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Heart, CreditCard } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { loadData, saveData } from '@/lib/storage'
import type { Donation } from '@/types'

const PAYMENT_METHODS = ['M-Pesa', 'Tigo Pesa', 'Airtel Money', 'Benki', 'Fedha taslimu kituoni']
const FREQUENCIES = ['Mara moja', 'Kila mwezi', 'Kila robo mwaka']
const SERVICES = ['Lishe', 'Matibabu', 'Elimu', 'Vifaa saidizi']
const DONOR_TYPES = ['Mtu binafsi', 'Kampuni', 'Taasisi au shirika']

export default function DonatePage() {
  const router = useRouter()
  const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set())
  const [donorType, setDonorType] = useState<'Mtu binafsi' | 'Kampuni' | 'Taasisi au shirika'>('Mtu binafsi')
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const toggleService = (service: string) => {
    const next = new Set(selectedServices)
    if (next.has(service)) next.delete(service)
    else next.add(service)
    setSelectedServices(next)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const kidNo = (formData.get('kid') as string) || ''
    const amount = parseInt(formData.get('amount') as string, 10) || 0
    const donorName = (formData.get('donorName') as string).trim()
    const donorPhone = (formData.get('donorPhone') as string).trim()
    const donorEmail = (formData.get('donorEmail') as string).trim()
    const donorLocation = (formData.get('donorLocation') as string).trim()
    const donorAddress = (formData.get('donorAddress') as string).trim()
    const frequency = (formData.get('frequency') as string) || 'Mara moja'
    const paymentMethod = (formData.get('paymentMethod') as string) || 'M-Pesa'
    const message = (formData.get('message') as string).trim()
    const anonymous = formData.get('anonymous') === 'on'

    if (!amount || amount < 1000) {
      setError('Kiasi lazima iwe zaidi ya TSh 1,000.')
      setLoading(false)
      return
    }
    if (!donorName) {
      setError('Jina kamili ni lazima.')
      setLoading(false)
      return
    }
    if (!donorPhone) {
      setError('Namba ya simu ni lazima.')
      setLoading(false)
      return
    }

    try {
      const data = loadData()
      const donation: Donation = {
        id: `don-${Date.now()}`,
        kid: kidNo || 'Yeyote',
        huduma: selectedServices.size > 0 ? Array.from(selectedServices).join(', ') : 'Huduma zote',
        kiasi: amount,
        aina: donorType,
        jina: donorName,
        simu: donorPhone,
        email: donorEmail || undefined,
        makazi: donorLocation || undefined,
        anwani: donorAddress || undefined,
        mara: frequency,
        lipa: paymentMethod,
        ujumbe: message || undefined,
        siri: anonymous,
        siku: new Date().toLocaleDateString('sw-TZ'),
      }

      data.dons.push(donation)
      saveData(data)

      setSuccess('Asante sana! Kituo kitawasiliana nawe kukamilisha mchango.')
      ;(e.currentTarget as HTMLFormElement).reset()
      setSelectedServices(new Set())
      router.refresh()
    } catch {
      setError('Mchango haujawekwe. Jaribu tena.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card className="mb-6 border-l-4 border-primary bg-muted/50 p-6">
        <CardHeader className="flex flex-row items-center space-y-0 pb-2">
          <CreditCard className="h-4 w-4 mr-2" />
          <CardTitle className="text-sm font-normal">Changia kwa kadi ya benki</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm mb-4">
            Chagua njia unayopendelea. Website hii haiombi wala haihifadhi namba ya kadi yako.
          </p>
          <p className="text-sm text-muted-foreground">
            Kwenye maelezo ya malipo andika jina lako na namba ya mtoto (mfano KM-0001) unayemsaidia.
            Kisha tuma fomu iliyo juu ili tuthibitishe mchango wako.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-4 w-4" /> Mchangiaji: msaidie mtoto
          </CardTitle>
          <CardDescription>
            Unaweza kumsaidia mtoto mmoja au kuchagua huduma zote. Kituo kitawasiliana nawe
            kukamilisha mchango.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}
          {success && (
            <div className="rounded-lg border border-green-200 bg-green-50 p-4">
              <p className="text-sm text-green-800">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="kid">Unamsaidia nani?</Label>
              <Input id="kid" placeholder="Chagua mtoto au ondoa" className="w-full" />
            </div>

            <div className="space-y-2">
              <Label>Huduma</Label>
              <div className="grid grid-cols-2 gap-2">
                {SERVICES.map((svc) => (
                  <button
                    key={svc}
                    type="button"
                    onClick={() => toggleService(svc)}
                    className={`
                      flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium border transition-all
                      ${selectedServices.has(svc)
                        ? 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300'
                        : 'bg-muted border-input hover:bg-muted/50'}
                    `}
                  >
                    {svc}
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Usipochagua, mchango unahesabiwa kwa huduma zote.
              </p>
            </div>

            <fieldset className="border border-input rounded-xl p-4">
              <legend className="px-2 font-medium text-primary">Taarifa za mchangiaji</legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="donorType">Aina ya mchangiaji</Label>
                  <select id="donorType" value={donorType} onChange={(e) => setDonorType(e.target.value as any)} className="w-full">
                    {DONOR_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="donorName">Jina kamili au la kampuni</Label>
                  <Input id="donorName" required className="w-full" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="donorPhone">Namba ya simu</Label>
                  <Input id="donorPhone" type="tel" required className="w-full" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="donorEmail">Barua pepe</Label>
                  <Input id="donorEmail" type="email" className="w-full" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="donorLocation">Nchi na mkoa</Label>
                  <Input id="donorLocation" placeholder="Tanzania, Dar es Salaam" className="w-full" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="donorAddress">Mtaa au anwani ya makazi</Label>
                  <Input id="donorAddress" className="w-full" />
                </div>
              </div>
            </fieldset>

            <fieldset className="border border-input rounded-xl p-4">
              <legend className="px-2 font-medium text-primary">Mchango wako</legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Kiasi (TSh)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">TSh</span>
                    <Input id="amount" type="number" min="1000" required className="pl-8 w-full" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="frequency">Utachangia mara ngapi?</Label>
                  <select id="frequency" defaultValue="Mara moja" className="w-full">
                    {FREQUENCIES.map((f) => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="space-y-2 mt-4">
                <Label htmlFor="paymentMethod">Njia ya malipo unayopendelea</Label>
                <select id="paymentMethod" defaultValue="M-Pesa" className="w-full">
                  {PAYMENT_METHODS.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2 mt-4">
                <Label htmlFor="message">Ujumbe kwa kituo (si lazima)</Label>
                <Textarea id="message" rows={3} className="w-full" />
              </div>
              <div className="flex items-center gap-2">
                <input id="anonymous" type="checkbox" className="rounded bg-text border-input text-primary focus:ring-primary" />
                <Label htmlFor="anonymous" className="text-sm cursor-pointer">Sitaki jina langu litajwe hadharani</Label>
              </div>
            </fieldset>

            <Button type="submit" className="w-full" disabled={loading}>
              <Heart className="h-4 w-4 mr-2" />
              {loading ? 'Inapakua...' : 'Tuma mchango'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}