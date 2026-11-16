'use client'

export function ShareButtons({ title }: { title: string }) {
  const url = typeof window !== 'undefined' ? window.location.href : ''
  const encoded = encodeURIComponent(url)
  const text = encodeURIComponent(title)
  return (
    <div style={{ display: 'flex', gap: '8px', marginTop: '8px', fontSize: '12px' }}>
      <a href={`https://twitter.com/intent/tweet?text=${text}&url=${encoded}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--clay)' }}>Share on X</a>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--clay)' }}>Facebook</a>
      <button onClick={() => navigator.clipboard?.writeText(url)} style={{ background: 'none', border: 'none', color: 'var(--clay)', cursor: 'pointer', padding: 0, font: 'inherit' }}>Copy link</button>
    </div>
  )
}