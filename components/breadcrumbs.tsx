import Link from 'next/link'

type Crumb = { label: string; href?: string }

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" style={{ fontSize: '13px', color: 'var(--muted-ink)', marginBottom: '16px' }}>
      {items.map((c, i) => (
        <span key={i}>
          {c.href ? <Link href={c.href} style={{ color: 'var(--clay)' }}>{c.label}</Link> : <span>{c.label}</span>}
          {i < items.length - 1 && <span style={{ margin: '0 6px' }}>/</span>}
        </span>
      ))}
    </nav>
  )
}