import { NavLink } from 'react-router-dom'

function FRIIcon({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }} aria-hidden="true">
      <defs>
        <linearGradient id="sb-fri-grad" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2E72F8"/>
          <stop offset="100%" stopColor="#0E28A0"/>
        </linearGradient>
        <clipPath id="sb-fri-clip">
          <rect width="1000" height="1000" rx="160"/>
        </clipPath>
      </defs>
      <g clipPath="url(#sb-fri-clip)">
        <rect width="1000" height="1000" fill="url(#sb-fri-grad)"/>
        <path d="M-200,80 L1200,80 L1171,160 L-229,160 Z" fill="rgba(255,255,255,0.28)"/>
        <path d="M-200,855 L1200,855 L1176,920 L-224,920 Z" fill="rgba(255,255,255,0.18)"/>
        <text x="500" y="640" textAnchor="middle"
          fontFamily="'Arial Black','Helvetica Neue',Arial,sans-serif"
          fontWeight="900" fontSize="300" fill="white" letterSpacing="-10">FRI</text>
      </g>
    </svg>
  )
}

const NAV = [
  {
    section: 'OVERVIEW',
    items: [
      { label: 'Command Center', path: '/overview', icon: '⊞' },
      { label: 'Locations', path: '/locations', icon: '◎' },
      { label: 'Reviews', path: '/explorer', icon: '☆' },
    ],
  },
  {
    section: 'AI INTELLIGENCE',
    items: [
      { label: 'Complaint Intel', path: '/intelligence', icon: '⚠' },
      { label: 'Competitor Intel', path: '/competitive', icon: '◈' },
      { label: 'Marketing Intel', path: '/marketing', icon: '◆' },
      { label: 'Employee Intel', path: '/employee', icon: '♦' },
      { label: 'AI Advisor', path: '/advisor', icon: '✦' },
    ],
  },
  {
    section: 'OPERATIONS',
    items: [
      { label: 'Response Center', path: '/actions', icon: '↩' },
      { label: 'Trends', path: '/trends', icon: '∿' },
      { label: 'Alerts', path: '/alerts', icon: '◉' },
    ],
  },
  {
    section: 'REPORTING',
    items: [
      { label: 'Executive Reports', path: '/executive', icon: '▤' },
      { label: 'Reports', path: '/reports', icon: '≡' },
    ],
  },
]

export default function Sidebar({ onClose }) {
  return (
    <aside style={{
      width: 'var(--sidebar-w)',
      height: '100vh',
      background: 'var(--color-surface)',
      borderRight: '1px solid var(--color-border)',
      display: 'flex', flexDirection: 'column',
      overflowY: 'auto', overflowX: 'hidden',
      flexShrink: 0,
    }}>
      {/* Brand */}
      <div style={{ padding: '14px 14px 12px', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <FRIIcon size={32} />
        <div>
          <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-text-3)', marginBottom: 2, lineHeight: 1 }}>
            Future Marketing Studio
          </div>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-1)', letterSpacing: '-0.02em', lineHeight: 1 }}>
            Review Intelligence
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '10px 10px' }}>
        {NAV.map(group => (
          <div key={group.section} style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-3)', padding: '0 8px', marginBottom: 4 }}>
              {group.section}
            </div>
            {group.items.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
                onClick={onClose}
                style={{ marginBottom: 2, display: 'flex' }}
              >
                <span style={{ fontSize: 13, opacity: 0.7 }}>{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div style={{ padding: '12px 14px', borderTop: '1px solid var(--color-border)' }}>
        <div style={{ fontSize: 10, color: 'var(--color-text-3)', fontWeight: 500 }}>Demo Mode · 8 Locations</div>
      </div>
    </aside>
  )
}
