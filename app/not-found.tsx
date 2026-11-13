import Link from 'next/link'
import { Home } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center">
        <div className="text-6xl mb-4">404</div>
        <h1 className="text-3xl font-bold mb-2">Ukurasa haupatikani</h1>
        <p className="text-muted-foreground mb-6">
          Kurasa unatafuta haipo au ilifutwa.
        </p>
        <Button asChild className="bg-primary text-white">
          <Link href="/"><Home className="w-4 h-4 mr-2" /></Link>
        </Button>
      </div>
    </div>
  )
}