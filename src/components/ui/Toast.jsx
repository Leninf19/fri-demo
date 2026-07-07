import { useState, useEffect, createContext, useContext, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const ToastCtx = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500)
  }, [])

  return (
    <ToastCtx.Provider value={addToast}>
      {children}
      <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 9998, display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
        <AnimatePresence>
          {toasts.map(t => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              style={{
                padding: '10px 18px',
                borderRadius: 'var(--radius-full)',
                fontSize: 13,
                fontWeight: 500,
                color: 'white',
                boxShadow: 'var(--shadow-lg)',
                background: t.type === 'success' ? '#166534' : t.type === 'error' ? '#991B1B' : '#1A1714',
                whiteSpace: 'nowrap',
              }}
            >
              {t.type === 'success' && '✓ '}{t.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastCtx.Provider>
  )
}

export function useToast() {
  return useContext(ToastCtx)
}
