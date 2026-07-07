/**
 * ProductIcon — FutureMark Product Brand System v3.0
 *
 * All product icons share the same construction:
 *   - 1000×1000 viewBox (scales from 16px to any display size)
 *   - rx=160 rounded square container (16% corner radius)
 *   - 225° gradient (FM diagonal direction: upper-right → lower-left)
 *   - Two FM diagonal bars at 70°: top accent (28%) + bottom primary (18%)
 *   - F-prefix product code in ultra-heavy geometric sans
 *
 * Font sizing by code length:
 *   - 2-char (FM, FA, FC): font-size 420, letter-spacing -18
 *   - 3-char (FRI, FAI, FAN, FAT, FCM): font-size 300, letter-spacing -10
 *   - 4-char (FSEO, FCRM): font-size 230, letter-spacing -5
 */

export const PRODUCTS = {
  fm:   { name: 'Future Marketing Studio',    abbr: 'FM',   c1: '#2A2320', c2: '#0A0806' },
  fri:  { name: 'Future Review Intelligence', abbr: 'FRI',  c1: '#2E72F8', c2: '#0E28A0' },
  fseo: { name: 'Future SEO',                 abbr: 'FSEO', c1: '#12CC8A', c2: '#067A52' },
  fa:   { name: 'Future Ads',                 abbr: 'FA',   c1: '#FC7830', c2: '#B23A08' },
  fc:   { name: 'Future Content',             abbr: 'FC',   c1: '#22C862', c2: '#10783A' },
  fai:  { name: 'Future AI',                  abbr: 'FAI',  c1: '#A860F8', c2: '#6820C8' },
  fcrm: { name: 'Future CRM',                 abbr: 'FCRM', c1: '#18B8F0', c2: '#0568A8' },
  fan:  { name: 'Future Analytics',           abbr: 'FAN',  c1: '#12D8C8', c2: '#098880' },
  fat:  { name: 'Future Automations',         abbr: 'FAT',  c1: '#7878F8', c2: '#3838C8' },
  fcm:  { name: 'Future Campaigns',           abbr: 'FCM',  c1: '#F040A0', c2: '#A01060' },
}

const VARIANTS = {
  color:        (p) => ({ bg1: p.c1, bg2: p.c2, fg: '#FFFFFF', barTop: 'rgba(255,255,255,0.28)', barBot: 'rgba(255,255,255,0.18)', grad: true }),
  reversed:     (p) => ({ bg1: '#0A0806', bg2: '#0A0806', fg: p.c1, barTop: 'rgba(255,255,255,0.12)', barBot: 'rgba(255,255,255,0.08)', grad: false }),
  mono:         ()  => ({ bg1: '#0A0806', bg2: '#0A0806', fg: '#FFFFFF', barTop: 'rgba(255,255,255,0.28)', barBot: 'rgba(255,255,255,0.18)', grad: false }),
  'mono-light': ()  => ({ bg1: '#F9F8F6', bg2: '#F9F8F6', fg: '#0A0806', barTop: 'rgba(0,0,0,0.16)', barBot: 'rgba(0,0,0,0.10)', grad: false }),
}

let _uid = 0

export function ProductIcon({
  product = 'fm',
  size = 32,
  variant = 'color',
  className = '',
  style = {},
}) {
  const p = PRODUCTS[product] || PRODUCTS.fm
  const varFn = VARIANTS[variant] || VARIANTS.color
  const v = varFn(p)
  const uid = ++_uid
  const gradId = `pi-grad-${uid}`
  const clipId = `pi-clip-${uid}`

  const len = p.abbr.length
  const fontSize = len <= 2 ? 420 : len === 3 ? 300 : 230
  const letterSpacing = len <= 2 ? -18 : len === 3 ? -10 : -5

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 1000 1000"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ flexShrink: 0, display: 'block', ...style }}
      aria-label={p.name}
      role="img"
    >
      <defs>
        {v.grad && (
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
        <rect width="1000" height="1000" fill={v.grad ? `url(#${gradId})` : v.bg1} />
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
          fontSize={fontSize}
          fill={v.fg}
          letterSpacing={letterSpacing}
        >
          {p.abbr}
        </text>
      </g>
    </svg>
  )
}

export default ProductIcon
