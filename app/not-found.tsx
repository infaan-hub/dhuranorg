import Link from 'next/link'
import { Home, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center" style={{ maxWidth: '480px' }}>
        <div className="text-6xl mb-4">404</div>
        <h1 className="text-3xl font-bold mb-2">Ukurasa haupatikani</h1>
        <p className="text-muted-foreground mb-6">
          Kurasa unatafuta haipo au ilifutwa.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button asChild className="bg-primary text-white">
            <Link href="/"><Home className="w-4 h-4 mr-2" /> Home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/search"><Search className="w-4 h-4 mr-2" /> Search</Link>
          </Button>
        </div>
        <div style={{ marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', fontSize: '14px' }}>
          <Link href="/about" style={{ color: 'var(--clay)' }}>About</Link>
          <Link href="/programs" style={{ color: 'var(--clay)' }}>Programmes</Link>
          <Link href="/news" style={{ color: 'var(--clay)' }}>News</Link>
          <Link href="/gallery" style={{ color: 'var(--clay)' }}>Gallery</Link>
          <Link href="/resources" style={{ color: 'var(--clay)' }}>Resources</Link>
        </div>
      </div>
    </div>
  )
}