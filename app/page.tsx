import Link from 'next/link'

export default function Page() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Kituo cha Matumaini</h1>
      <p className="mb-6">
        Dhuran Supporting Organization — Next.js migration from v7 HTML.
      </p>
      <nav className="space-y-2">
        <Link href="/donate" className="px-4 py-2 bg-primary text-white rounded-full">
          Mchangiaji (Donate)
        </Link>
        <Link href="/contact" className="px-4 py-2 bg-muted text-foreground rounded-full">
          Wasiliana (Contact)
        </Link>
        <Link href="/login" className="px-4 py-2 border border-border rounded-full">
          Ingia (Login)
        </Link>
      </nav>
    </div>
  )
}