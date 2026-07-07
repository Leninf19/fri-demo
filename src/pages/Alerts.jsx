import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const INITIAL_ALERTS = [
  {
    id: 1,
    type: 'critical',
    icon: '🔴',
    title: 'HVAC Complaints — Elite Fitness Club',
    body: '12 reviews in the past 14 days mention temperature issues in the weight room. Customer satisfaction impact is ongoing. Immediate facility action required.',
    time: '2 hours ago',
    read: false,
  },
  {
    id: 2,
    type: 'warning',
    icon: '🟡',
    title: 'Blue Harbor Seafood — Response Rate Below Threshold',
    body: 'Response rate has dropped to 65%, falling below the 70% minimum threshold. Each week at this level risks measurable rating impact. Assign a response manager.',
    time: '5 hours ago',
    read: false,
  },
  {
    id: 3,
    type: 'warning',
    icon: '🟡',
    title: 'Sunrise Landscaping — No-Show Complaint',
    body: 'Customer Amy C. left a 2-star review citing a missed appointment with no communication. Follow up with the client directly to resolve.',
    time: '1 day ago',
    read: false,
  },
  {
    id: 4,
    type: 'positive',
    icon: '🟢',
    title: 'Downtown Dental — Rating Milestone',
    body: 'Rating reached 4.7★ this month — the highest in the portfolio and the strongest single month in 12-month history. Excellent patient experience execution.',
    time: '2 days ago',
    read: false,
  },
  {
    id: 5,
    type: 'positive',
    icon: '🟢',
    title: 'Future Coffee Co. — 92% Response Rate Achieved',
    body: 'Future Coffee Co. achieved the highest response rate in the portfolio this month. This is the gold standard for review engagement. Share best practices with other locations.',
    time: '3 days ago',
    read: false,
  },
  {
    id: 6,
    type: 'info',
    icon: 'ℹ️',
    title: 'AI Summary Generation Queue',
    body: '7 new reviews are awaiting AI summary classification. These will be processed and categorized within the next sync cycle.',
    time: '4 days ago',
    read: false,
  },
]

const TYPE_STYLES = {
  critical: { bg: '#FEF2F2', border: '#FECACA', left: '#991B1B', label: 'CRITICAL', labelColor: '#991B1B' },
  warning: { bg: '#FFFBEB', border: '#FDE68A', left: '#d97706', label: 'WARNING', labelColor: '#92400E' },
  positive: { bg: '#F0FDF4', border: '#BBF7D0', left: '#166534', label: 'POSITIVE', labelColor: '#166534' },
  info: { bg: '#EFF6FF', border: '#BFDBFE', left: '#1E40AF', label: 'INFO', labelColor: '#1E40AF' },
}

export default function Alerts() {
  const [alerts, setAlerts] = useState(INITIAL_ALERTS)

  const markAllRead = () => setAlerts(prev => prev.map(a => ({ ...a, read: true })))
  const dismiss = (id) => setAlerts(prev => prev.filter(a => a.id !== id))

  const unread = alerts.filter(a => !a.read).length

  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--color-text-1)', letterSpacing: '-0.02em' }}>Alerts</h1>
            {unread > 0 && <span className="badge badge-danger">{unread} unread</span>}
          </div>
          <p style={{ fontSize: 13, color: 'var(--color-text-2)', marginTop: 2 }}>Critical issues, warnings, and positive milestones</p>
        </div>
        {unread > 0 && (
          <button
            onClick={markAllRead}
            style={{
              padding: '8px 16px',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              fontSize: 12, fontWeight: 600,
              color: 'var(--color-text-2)',
              cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            Mark all read
          </button>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <AnimatePresence>
          {alerts.map(alert => {
            const style = TYPE_STYLES[alert.type]
            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 60, scale: 0.97 }}
                style={{
                  background: style.bg,
                  border: `1px solid ${style.border}`,
                  borderLeft: `4px solid ${style.left}`,
                  borderRadius: 'var(--radius-lg)',
                  padding: '16px 18px',
                  opacity: alert.read ? 0.7 : 1,
                  transition: 'opacity 0.2s',
                }}
              >
                <div style={{ display: 'flex', gap: 12 }}>
                  <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>{alert.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 6 }}>
                      <div>
                        <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: style.labelColor, marginRight: 8 }}>{style.label}</span>
                        {!alert.read && <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: style.left, verticalAlign: 'middle' }} />}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                        <span style={{ fontSize: 10, color: 'var(--color-text-3)' }}>{alert.time}</span>
                        <button
                          onClick={() => dismiss(alert.id)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-3)', fontSize: 16, padding: 0, lineHeight: 1 }}
                          title="Dismiss"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-1)', marginBottom: 4 }}>{alert.title}</div>
                    <p style={{ fontSize: 12.5, color: 'var(--color-text-2)', lineHeight: 1.6 }}>{alert.body}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {alerts.length === 0 && (
        <div className="card" style={{ padding: '48px', textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>✓</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-text-1)', marginBottom: 6 }}>All clear</div>
          <p style={{ fontSize: 13, color: 'var(--color-text-2)' }}>No active alerts at this time.</p>
        </div>
      )}
    </motion.div>
  )
}
