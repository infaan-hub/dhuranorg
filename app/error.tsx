'use client'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="site-shell">
      <section className="work-section container" style={{ textAlign: 'center' }}>
        <h2>Something went wrong</h2>
        <p style={{ color: 'var(--muted-ink)' }}>{error.message}</p>
        <button onClick={reset} className="button button-accent" style={{ marginTop: '16px' }}>Try again</button>
      </section>
    </div>
  )
}