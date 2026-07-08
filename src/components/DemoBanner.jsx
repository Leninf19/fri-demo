export default function DemoBanner() {
  return (
    <div className="demo-banner" style={{
      position: 'fixed',
      top: 12,
      right: 16,
      zIndex: 9999,
      background: 'rgba(154,107,0,0.10)',
      border: '1px solid rgba(154,107,0,0.28)',
      borderRadius: 'var(--radius-full)',
      padding: '4px 12px',
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      backdropFilter: 'blur(8px)',
    }}>
      <span className="pulse-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#9A6B00', display: 'inline-block', flexShrink: 0 }} />
      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: '#9A6B00' }}>DEMO MODE</span>
      <span style={{ fontSize: 9, color: 'var(--color-text-3)' }}>Sample Data</span>
    </div>
  )
}
