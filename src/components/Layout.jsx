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
          display: 'flex', alignItems: 'center', padding: '0 16px', gap: 14,
        }} className="mobile-topbar">
          <button
            onClick={() => setMobileOpen(true)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: 'var(--color-text-2)', fontSize: 20, display: 'flex', alignItems: 'center' }}
            aria-label="Open menu"
          >
            ☰
          </button>
          <div>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-text-3)' }}>Future Marketing Studio</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-1)' }}>Future Insights</div>
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
        <main style={{ flex: 1, padding: '24px 24px 40px', maxWidth: '100%', overflowX: 'hidden' }}>
          {children}
        </main>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .lg-sidebar { display: flex !important; position: fixed; left: 0; top: 0; bottom: 0; z-index: 100; }
          .mobile-topbar { display: none !important; }
          main { margin-left: var(--sidebar-w); }
        }
      `}</style>
    </div>
  )
}
