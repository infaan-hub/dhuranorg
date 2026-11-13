import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react'
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

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Wasiliana nasi</CardTitle>
            <CardDescription>Karibu kituoni au tuandikie.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <p className="font-medium">Anwani</p>
                  <p className="text-sm text-muted-foreground">
                    Makunduchi, Mkoa wa Kusini Unguja
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-1 h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <p className="font-medium">Simu</p>
                  <p className="text-sm text-muted-foreground">
                    <a href="tel:+255780981880" className="text-primary hover:underline">
                      0780 981 880
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-1 h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <p className="font-medium">Barua pepe</p>
                  <p className="text-sm text-muted-foreground">
                    <a href="mailto:info@kituo-matumaini.example" className="text-primary hover:underline">
                      info@kituo-matumaini.example
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-1 h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <p className="font-medium">Saa za kazi</p>
                  <p className="text-sm text-muted-foreground">
                    Jumatatu hadi Ijumaa, 2:00 asubuhi hadi 10:00 jioni
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tuandikie ujumbe</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault()
              e.currentTarget.reset()
              alert('Ujumbe umepokelewa. Tutawasiliana nawe hivi karibuni.')
            }}>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="cJ">Jina</Label>
                  <Input id="cJ" required className="w-full" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cS">Simu</Label>
                  <Input id="cS" type="tel" required className="w-full" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cM">Ujumbe</Label>
                <Textarea id="cM" required rows={4} className="w-full" />
              </div>
              <Button type="submit" className="w-full">
                <Send className="h-4 w-4 mr-2" /> Tuma ujumbe
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}