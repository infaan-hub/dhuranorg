export default function Loading() {
  return (
    <div className="site-shell">
      <section className="work-section container">
        <div style={{ height: '40px', width: '40%', background: 'var(--line)', borderRadius: '8px', marginBottom: '16px' }} />
        <div style={{ height: '24px', width: '60%', background: 'var(--line)', borderRadius: '8px', marginBottom: '24px' }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px' }}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ height: '180px', background: 'var(--line)', borderRadius: '12px' }} />
          ))}
        </div>
      </section>
    </div>
  )
}