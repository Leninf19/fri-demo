import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const LINKS = [
  { label: 'Dashboard Overview', path: '/overview' },
  { label: 'Manage Locations', path: '/locations' },
  { label: 'Browse Reviews', path: '/explorer' },
  { label: 'Analytics & Trends', path: '/trends' },
  { label: 'AI Insights', path: '/intelligence' },
  { label: 'Competitor Analysis', path: '/competitive' },
  { label: 'Marketing Intel', path: '/marketing' },
  { label: 'AI Advisor', path: '/advisor' },
]

export default function HelpWidget({ onRestartTour }) {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            style={{ position: 'fixed', inset: 0, zIndex: 9993 }}
          />
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            style={{
              position: 'fixed', bottom: 72, right: 20, zIndex: 9994,
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-xl)',
              boxShadow: 'var(--shadow-lg)',
              width: 220, padding: '16px 0 8px',
            }}
          >
            <div style={{ padding: '0 16px 12px', borderBottom: '1px solid var(--color-border)', marginBottom: 4 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text-1)' }}>What would you like to learn?</div>
            </div>
            {LINKS.map(l => (
              <button
                key={l.path}
                onClick={() => { navigate(l.path); setOpen(false) }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  width: '100%', padding: '7px 16px',
                  background: 'none', border: 'none',
                  textAlign: 'left', cursor: 'pointer',
                  fontSize: 12.5, fontWeight: 500,
                  color: 'var(--color-text-2)',
                  fontFamily: 'inherit',
                  transition: 'background 0.1s, color 0.1s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-surface-2)'; e.currentTarget.style.color = 'var(--color-text-1)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--color-text-2)'; }}
              >
                <span style={{ fontSize: 10 }}>›</span> {l.label}
              </button>
            ))}
            <div style={{ borderTop: '1px solid var(--color-border)', margin: '8px 0 0', padding: '8px 16px 0' }}>
              <button
                onClick={() => { onRestartTour(); setOpen(false) }}
                style={{
                  width: '100%', padding: '7px 12px',
                  background: 'var(--color-accent-lt)',
                  color: 'var(--color-accent)',
                  border: 'none', borderRadius: 'var(--radius-md)',
                  fontWeight: 700, fontSize: 12,
                  cursor: 'pointer', fontFamily: 'inherit',
                }}
              >
                Restart Guided Tour
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          position: 'fixed', bottom: 20, right: 20, zIndex: 9994,
          width: 44, height: 44,
          background: 'var(--color-accent)',
          color: 'white', border: 'none', borderRadius: '50%',
          fontSize: 18, fontWeight: 700,
          cursor: 'pointer',
          boxShadow: 'var(--shadow-md)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background 0.15s, transform 0.15s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = '#7d5500'; e.currentTarget.style.transform = 'scale(1.06)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'var(--color-accent)'; e.currentTarget.style.transform = 'scale(1)'; }}
        title="Help"
      >
        {open ? '×' : '?'}
      </button>
    </>
  )
}
