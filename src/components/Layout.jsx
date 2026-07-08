import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar from './Sidebar.jsx'

export default function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-bg)' }}>
      {/* Desktop Sidebar */}
      <div style={{ display: 'none' }} className="lg-sidebar">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(26,23,20,0.5)', zIndex: 200 }}
            />
            <motion.div
              initial={{ x: -228 }}
              animate={{ x: 0 }}
              exit={{ x: -228 }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              style={{ position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 201, display: 'flex' }}
            >
              <Sidebar onClose={() => setMobileOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Mobile top bar */}
        <div style={{
          height: 'var(--header-h)',
          background: 'var(--color-surface)',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex', alignItems: 'center', padding: '0 16px', gap: 12,
          flexShrink: 0,
        }} className="mobile-topbar">
          <button
            onClick={() => setMobileOpen(true)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, color: 'var(--color-text-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, flexShrink: 0 }}
            aria-label="Open navigation menu"
          >
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
              <rect y="0" width="18" height="1.5" rx="1" fill="currentColor"/>
              <rect y="6" width="12" height="1.5" rx="1" fill="currentColor"/>
              <rect y="12" width="18" height="1.5" rx="1" fill="currentColor"/>
            </svg>
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
            <div style={{ width: 26, height: 26, borderRadius: 6, background: 'linear-gradient(135deg,#2E72F8,#0E28A0)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: 8, fontWeight: 900, color: '#fff', letterSpacing: '-0.5px' }}>FRI</span>
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-text-3)', lineHeight: 1 }}>Future Marketing Studio</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-1)', lineHeight: 1.3, letterSpacing: '-0.01em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Review Intelligence</div>
            </div>
          </div>
        </div>

        {/* Snapshot bar */}
        <div style={{
          borderBottom: '1px solid var(--color-border)',
          background: 'var(--color-surface)',
          padding: '6px 24px',
          display: 'flex', gap: 8, alignItems: 'center',
          flexWrap: 'wrap',
        }}>
          {[
            'Mon, Jul 7',
            'Updated just now',
            '8 locations',
            '5,918 reviews',
          ].map(label => (
            <span key={label} style={{
              fontSize: 10, fontWeight: 500,
              color: 'var(--color-text-3)',
              background: 'var(--color-surface-2)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-full)',
              padding: '2px 8px',
            }}>
              {label}
            </span>
          ))}
        </div>

        {/* Content */}
        <main style={{ flex: 1, maxWidth: '100%', overflowX: 'hidden' }} className="fri-main">
          {children}
        </main>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .lg-sidebar { display: flex !important; position: fixed; left: 0; top: 0; bottom: 0; z-index: 100; }
          .mobile-topbar { display: none !important; }
          .fri-main { margin-left: var(--sidebar-w); padding: 24px 28px 48px; }
        }
        @media (max-width: 1023px) {
          .fri-main { padding: 20px 20px 40px; }
        }
        @media (max-width: 640px) {
          .fri-main { padding: 16px 14px 32px; }
        }
      `}</style>
    </div>
  )
}
