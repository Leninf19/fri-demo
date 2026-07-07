import { motion, AnimatePresence } from 'framer-motion'

export default function WelcomeModal({ open, onStartTour, onExplore }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 10000,
            background: 'rgba(26,23,20,0.55)',
            backdropFilter: 'blur(6px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 16,
          }}
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            style={{
              background: 'var(--color-surface)',
              borderRadius: 'var(--radius-xl)',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid var(--color-border)',
              width: '100%',
              maxWidth: 460,
              padding: '36px 32px 32px',
              textAlign: 'center',
            }}
          >
            {/* Logo area */}
            <div style={{ marginBottom: 20 }}>
              <div style={{
                width: 52, height: 52, borderRadius: 'var(--radius-lg)',
                background: 'var(--color-accent-lt)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 16px',
                fontSize: 24,
              }}>
                ✦
              </div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: 6 }}>
                Future Marketing Studio
              </div>
              <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--color-text-1)', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 4 }}>
                Future Review Intelligence
              </h1>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-full)', padding: '3px 10px', fontSize: 11, color: 'var(--color-text-2)', fontWeight: 600, marginBottom: 16 }}>
                Interactive Demo
              </div>
              <p style={{ fontSize: 13, color: 'var(--color-text-2)', lineHeight: 1.6 }}>
                Experience how businesses use AI to monitor reviews, uncover customer trends, improve reputation, and make smarter marketing decisions.
              </p>
              <p style={{ fontSize: 12, color: 'var(--color-text-3)', marginTop: 8 }}>
                This demo contains sample data from 8 fictional businesses.
              </p>
            </div>

            {/* Feature list */}
            <div style={{
              background: 'var(--color-surface-2)', borderRadius: 'var(--radius-md)',
              padding: '14px 16px', marginBottom: 24, textAlign: 'left',
              border: '1px solid var(--color-border)',
            }}>
              {[
                { icon: '✓', text: 'Real AI-powered analytics engine' },
                { icon: '✓', text: '5,918 simulated customer reviews' },
                { icon: '✓', text: '8 businesses across 5 industries' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 0', fontSize: 13, color: 'var(--color-text-1)' }}>
                  <span style={{ color: 'var(--color-success)', fontWeight: 700 }}>{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={onStartTour}
                style={{
                  flex: 1, padding: '11px 16px',
                  background: 'var(--color-accent)',
                  color: 'white', border: 'none',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: 700, fontSize: 13,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#7d5500'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--color-accent)'}
              >
                Start Guided Tour
              </button>
              <button
                onClick={onExplore}
                style={{
                  flex: 1, padding: '11px 16px',
                  background: 'transparent',
                  color: 'var(--color-text-2)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: 600, fontSize: 13,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'background 0.15s, color 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-surface-2)'; e.currentTarget.style.color = 'var(--color-text-1)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--color-text-2)'; }}
              >
                Explore Freely
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
