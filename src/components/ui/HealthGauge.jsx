export default function HealthGauge({ score, grade, size = 80 }) {
  const r = (size / 2) - 7
  const circ = 2 * Math.PI * r
  const dash = (score / 100) * circ
  const color = score >= 90 ? '#166534' : score >= 80 ? '#9A6B00' : score >= 70 ? '#d97706' : '#991B1B'

  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', position: 'absolute' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--color-border)" strokeWidth={6} />
        <circle
          cx={size/2} cy={size/2} r={r} fill="none"
          stroke={color} strokeWidth={6}
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 0.6s cubic-bezier(0.16,1,0.3,1)' }}
        />
      </svg>
      <div style={{ textAlign: 'center', zIndex: 1 }}>
        <div style={{ fontSize: size > 70 ? 20 : 14, fontWeight: 800, color: 'var(--color-text-1)', lineHeight: 1 }}>{score}</div>
        {grade && <div style={{ fontSize: 10, fontWeight: 700, color, letterSpacing: '0.05em', marginTop: 2 }}>{grade}</div>}
      </div>
    </div>
  )
}
