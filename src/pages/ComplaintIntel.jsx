import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const ISSUES = [
  {
    id: 'wait',
    category: 'Wait Times',
    count: 87,
    pct: 34,
    trend: 'up',
    severity: 'high',
    icon: '⏱',
    examples: [
      'Waited over an hour on a Thursday night which felt excessive. The hostess was not very communicative.',
      'Weekend wait times are out of control. Beautiful food but planning 45-60 minutes just to be seated.',
      'The service at Blue Harbor is painfully slow. Great food when it arrives but the wait is a problem.',
    ],
  },
  {
    id: 'parking',
    category: 'Parking',
    count: 46,
    pct: 18,
    trend: 'flat',
    severity: 'medium',
    icon: '🅿',
    examples: [
      'Parking situation is a real problem. Had to park 3 blocks away.',
      'The gym parking situation is a nightmare during peak hours. Had to circle for 15 minutes.',
      'Great restaurant but zero parking nearby. Added 20 minutes to our experience.',
    ],
  },
  {
    id: 'pricing',
    category: 'Pricing',
    count: 38,
    pct: 15,
    trend: 'flat',
    severity: 'medium',
    icon: '💲',
    examples: [
      'Quality is great but prices have crept up 20% in the last year. Hard to justify weekly visits.',
      'Excellent service but billing was confusing — they charged for items we did not order.',
      'The coffee is worth it but $8 for a latte is steep even by Austin standards.',
    ],
  },
  {
    id: 'service-speed',
    category: 'Service Speed',
    count: 36,
    pct: 14,
    trend: 'up',
    severity: 'medium',
    icon: '🐢',
    examples: [
      'Waited 35 minutes for our food on a slow Tuesday. Not acceptable for a weeknight.',
      'Trainer availability is very limited. Had to wait 2 weeks for a consultation.',
      'The dental office had a 30-minute wait past my appointment time. Happens every visit.',
    ],
  },
  {
    id: 'noise',
    category: 'Noise Level',
    count: 24,
    pct: 9,
    trend: 'flat',
    severity: 'low',
    icon: '🔊',
    examples: [
      'The noise level inside can get overwhelming on busy nights. Hard to have a conversation.',
      'Very loud on weekends. Beautiful space but acoustics make dining uncomfortable.',
    ],
  },
  {
    id: 'equipment',
    category: 'Equipment Issues',
    count: 21,
    pct: 8,
    trend: 'up',
    severity: 'medium',
    icon: '🔧',
    examples: [
      'The AC in the weight room has been broken for 3 weeks. Working out in 80 degree heat.',
      'Multiple treadmills have been out of service for over a month. Limiting equipment options.',
    ],
  },
  {
    id: 'comms',
    category: 'Communication Gaps',
    count: 18,
    pct: 7,
    trend: 'down',
    severity: 'low',
    icon: '📞',
    examples: [
      'Had them scheduled for Thursday and they no-showed without any call or text.',
      'Project updates became sparse after week 3. Had to chase the contractor for status.',
    ],
  },
]

const COLORS = ['#991B1B', '#92400E', '#9A6B00', '#d97706', '#9C9590', '#ca8a04', '#6B7280']

const pieData = ISSUES.map((iss, i) => ({ name: iss.category, value: iss.pct, color: COLORS[i] }))

export default function ComplaintIntel() {
  const [expanded, setExpanded] = useState(null)

  const severityBadge = (s) => {
    if (s === 'high') return <span className="badge badge-danger">High</span>
    if (s === 'medium') return <span className="badge badge-warning">Medium</span>
    return <span className="badge badge-success">Low</span>
  }

  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--color-text-1)', letterSpacing: '-0.02em' }}>Complaint Intelligence</h1>
          <p style={{ fontSize: 13, color: 'var(--color-text-2)', marginTop: 2 }}>AI-categorized issues across all 5,918 reviews</p>
        </div>
        <span className="badge badge-accent">✦ AI Powered</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20, marginBottom: 20 }}>
        {/* Issues list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {ISSUES.map(iss => (
            <div key={iss.id} className="card" style={{ overflow: 'hidden' }}>
              <div
                className="card-hover"
                onClick={() => setExpanded(expanded === iss.id ? null : iss.id)}
                style={{ padding: '16px 18px', cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span style={{ fontSize: 22, flexShrink: 0 }}>{iss.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-text-1)' }}>{iss.category}</span>
                      {severityBadge(iss.severity)}
                      <span style={{ fontSize: 11, color: iss.trend === 'up' ? 'var(--color-danger)' : iss.trend === 'down' ? 'var(--color-success)' : 'var(--color-text-3)', marginLeft: 'auto' }}>
                        {iss.trend === 'up' ? '↑ Increasing' : iss.trend === 'down' ? '↓ Decreasing' : '→ Stable'}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-1)' }}>{iss.count} mentions</span>
                      <span style={{ fontSize: 11, color: 'var(--color-text-3)' }}>{iss.pct}% of complaints</span>
                      <div style={{ flex: 1, height: 4, background: 'var(--color-border)', borderRadius: 'var(--radius-full)' }}>
                        <div style={{ height: '100%', width: `${iss.pct * 2.5}%`, background: iss.severity === 'high' ? 'var(--color-danger)' : iss.severity === 'medium' ? '#d97706' : '#9C9590', borderRadius: 'var(--radius-full)', transition: 'width 0.5s' }} />
                      </div>
                    </div>
                  </div>
                  <span style={{ fontSize: 16, color: 'var(--color-text-3)', transform: expanded === iss.id ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>⌃</span>
                </div>
              </div>

              <AnimatePresence>
                {expanded === iss.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    style={{ overflow: 'hidden', borderTop: '1px solid var(--color-border)', background: 'var(--color-surface-2)' }}
                  >
                    <div style={{ padding: '14px 18px' }}>
                      <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-3)', marginBottom: 10 }}>
                        Sample Review Excerpts
                      </div>
                      {iss.examples.map((ex, i) => (
                        <div key={i} style={{ fontSize: 12, color: 'var(--color-text-2)', lineHeight: 1.55, padding: '8px 12px', background: 'var(--color-surface)', borderRadius: 'var(--radius-md)', marginBottom: 6, border: '1px solid var(--color-border)', borderLeft: '3px solid var(--color-danger)' }}>
                          "{ex}"
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Pie + AI Insight */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card" style={{ padding: '20px' }}>
            <div className="text-title" style={{ marginBottom: 16 }}>Issue Distribution</div>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value" paddingAngle={2}>
                  {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ fontSize: 11, border: '1px solid var(--color-border)', borderRadius: 6 }} formatter={v => [`${v}%`]} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginTop: 8 }}>
              {pieData.map(d => (
                <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: d.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 11, color: 'var(--color-text-2)', flex: 1 }}>{d.name}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-text-1)' }}>{d.value}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="ai-card" style={{ padding: '18px' }}>
            <div className="ai-label" style={{ marginBottom: 10 }}>✦ AI Insight</div>
            <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.8)', lineHeight: 1.7 }}>
              The most impactful operational change would be addressing <strong style={{ color: '#FCD34D' }}>wait time issues</strong>. Reviews mentioning long waits are 68% less likely to become repeat customers.
            </p>
            <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, marginTop: 10 }}>
              Consider off-peak promotions and reservation systems to better distribute demand. This single change could lift portfolio average by an estimated <strong style={{ color: '#FCD34D' }}>0.15-0.25★</strong>.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
