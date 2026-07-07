/**
 * FRIIcon — Future Review Intelligence
 * Brand System v3.0
 *
 * Inherits FM logo DNA:
 *   - 1000×1000 coordinate space, rx=160 container (16% corner radius)
 *   - Two FM diagonal bars at 70° — top (accent, 28%) + bottom (primary, 18%)
 *   - "FRI" in ultra-heavy sans, baseline y=640
 *   - Royal Blue gradient at 225° (FM diagonal direction)
 *
 * Each instance gets unique clipPath/gradient IDs via module counter
 * to prevent DOM collisions when multiple icons render on the same page.
 */

const VARIANTS = {
  color: {
    bg1: '#2E72F8',
    bg2: '#0E28A0',
    fg: '#FFFFFF',
    barTop: 'rgba(255,255,255,0.28)',
    barBot: 'rgba(255,255,255,0.18)',
    useGradient: true,
  },
  reversed: {
    bg1: '#0A0806',
    bg2: '#0A0806',
    fg: '#2E72F8',
    barTop: 'rgba(255,255,255,0.12)',
    barBot: 'rgba(255,255,255,0.08)',
    useGradient: false,
  },
  light: {
    bg1: '#DBEAFE',
    bg2: '#DBEAFE',
    fg: '#0E28A0',
    barTop: 'rgba(14,40,160,0.10)',
    barBot: 'rgba(14,40,160,0.06)',
    useGradient: false,
  },
  mono: {
    bg1: '#0A0806',
    bg2: '#0A0806',
    fg: '#FFFFFF',
    barTop: 'rgba(255,255,255,0.28)',
    barBot: 'rgba(255,255,255,0.18)',
    useGradient: false,
  },
  'mono-light': {
    bg1: '#F9F8F6',
    bg2: '#F9F8F6',
    fg: '#0A0806',
    barTop: 'rgba(0,0,0,0.16)',
    barBot: 'rgba(0,0,0,0.10)',
    useGradient: false,
  },
}

let _counter = 0

export function FRIIcon({ size = 32, variant = 'color', className = '', style = {} }) {
  const v = VARIANTS[variant] || VARIANTS.color
  const uid = ++_counter
  const gradId = `fri-grad-${uid}`
  const clipId = `fri-clip-${uid}`

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 1000 1000"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ flexShrink: 0, display: 'block', ...style }}
      aria-label="Future Review Intelligence"
      role="img"
    >
      <defs>
        {v.useGradient && (
          <linearGradient id={gradId} x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={v.bg1} />
            <stop offset="100%" stopColor={v.bg2} />
          </linearGradient>
        )}
        <clipPath id={clipId}>
          <rect width="1000" height="1000" rx="160" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <rect width="1000" height="1000" fill={v.useGradient ? `url(#${gradId})` : v.bg1} />
        {/* Top FM bar — accent, 70° family signature */}
        <path d="M-200,80 L1200,80 L1171,160 L-229,160 Z" fill={v.barTop} />
        {/* Bottom FM bar — primary, mirrors FM logo two-form structure */}
        <path d="M-200,855 L1200,855 L1176,920 L-224,920 Z" fill={v.barBot} />
        <text
          x="500"
          y="640"
          textAnchor="middle"
          fontFamily="'Arial Black','Helvetica Neue',Arial,sans-serif"
          fontWeight="900"
          fontSize="300"
          fill={v.fg}
          letterSpacing="-10"
        >
          FRI
        </text>
      </g>
    </svg>
  )
}

export default FRIIcon
