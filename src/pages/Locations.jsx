import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts'
import { BUSINESSES } from '../data/businesses.js'
import { REVIEWS } from '../data/reviews.js'
import { useToast } from '../components/ui/Toast.jsx'
import StarRating from '../components/ui/StarRating.jsx'

const MONTHS = ['Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May','Jun']

function Sparkline({ data }) {
  const d = data.map((v, i) => ({ i, avg: v.avg }))
  return (
    <ResponsiveContainer width="100%" height={48}>
      <LineChart data={d} margin={{ top: 4, right: 4, bottom: 0, left: 4 }}>
        <Line type="monotone" dataKey="avg" stroke="#9A6B00" strokeWidth={2} dot={false} />
        <Tooltip contentStyle={{ fontSize: 10, padding: '2px 6px', border: '1px solid var(--color-border)', borderRadius: 4 }} formatter={v => [`${v}★`]} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default function Locations() {
  const [expanded, setExpanded] = useState(null)
  const toast = useToast()

  const totalReviews = BUSINESSES.reduce((a, b) => a + b.totalReviews, 0)
  const avgRating = (BUSINESSES.reduce((a, b) => a + b.rating, 0) / BUSINESSES.length).toFixed(2)
  const avgResponse = Math.round(BUSINESSES.reduce((a, b) => a + b.responseRate, 0) / BUSINESSES.length)

  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--color-text-1)', letterSpacing: '-0.02em' }}>8 Active Locations</h1>
          <p style={{ fontSize: 13, color: 'var(--color-text-2)', marginTop: 2 }}>Click any card to expand location details</p>
        </div>
        <button
          onClick={() => toast('Location management is available in the full platform.', 'info')}
          style={{
            padding: '9px 16px',
            background: 'var(--color-accent)',
            color: 'white', border: 'none',
            borderRadius: 'var(--radius-md)',
            fontWeight: 700, fontSize: 13,
            cursor: 'pointer', fontFamily: 'inherit',
          }}
        >
          + Add Location
        </button>
      </div>

      {/* Summary stats bar */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
        {[
          { label: 'Total Reviews', value: totalReviews.toLocaleString() },
          { label: 'Portfolio Avg Rating', value: `${avgRating}★` },
          { label: 'Total Locations', value: '8' },
          { label: 'Avg Response Rate', value: `${avgResponse}%` },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: '12px 18px', flex: '1 1 140px' }}>
            <div className="text-label" style={{ color: 'var(--color-text-3)', marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--color-text-1)' }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Location grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 14 }}>
        {BUSINESSES.map(biz => {
          const isExp = expanded === biz.id
          const reviews = REVIEWS.filter(r => r.business === biz.id)
          const rColor = biz.rating >= 4.5 ? '#166534' : biz.rating >= 4.0 ? '#9A6B00' : '#991B1B'

          return (
            <div key={biz.id} className="card" style={{ overflow: 'hidden' }}>
              <div
                className="card-hover"
                onClick={() => setExpanded(isExp ? null : biz.id)}
                style={{ padding: '18px 20px', cursor: 'pointer' }}
              >
                {/* Top row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ fontSize: 28 }}>{biz.emoji}</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-text-1)' }}>{biz.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--color-text-3)' }}>{biz.category}</div>
                    </div>
                  </div>
                  <span className={`badge badge-${biz.trend === 'up' ? 'success' : biz.trend === 'down' ? 'danger' : 'neutral'}`}>
                    {biz.trend === 'up' ? '↑ Up' : biz.trend === 'down' ? '↓ Attention' : '→ Stable'}
                  </span>
                </div>

                <div style={{ fontSize: 10, color: 'var(--color-text-3)', marginBottom: 12 }}>{biz.address}</div>

                {/* Rating */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 10 }}>
                  <span style={{ fontSize: 28, fontWeight: 800, color: rColor }}>{biz.rating}</span>
                  <StarRating stars={Math.round(biz.rating)} size={12} />
                  <span style={{ fontSize: 11, color: 'var(--color-text-3)' }}>{biz.totalReviews.toLocaleString()} reviews</span>
                </div>

                {/* Response rate bar */}
                <div style={{ marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 10, color: 'var(--color-text-3)', fontWeight: 600 }}>Response Rate</span>
                    <span style={{ fontSize: 10, fontWeight: 700, color: biz.responseRate >= 80 ? 'var(--color-success)' : 'var(--color-warning)' }}>{biz.responseRate}%</span>
                  </div>
                  <div style={{ height: 4, background: 'var(--color-border)', borderRadius: 'var(--radius-full)' }}>
                    <div style={{ height: '100%', width: `${biz.responseRate}%`, background: biz.responseRate >= 80 ? '#166534' : '#9A6B00', borderRadius: 'var(--radius-full)', transition: 'width 0.5s' }} />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, color: 'var(--color-text-3)' }}>{biz.monthlyReviews} reviews this month</span>
                  <button
                    onClick={e => { e.stopPropagation(); setExpanded(isExp ? null : biz.id) }}
                    style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-accent)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
                  >
                    {isExp ? 'Close ↑' : 'View Details ↓'}
                  </button>
                </div>
              </div>

              {/* Expanded detail */}
              <AnimatePresence>
                {isExp && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ overflow: 'hidden', borderTop: '1px solid var(--color-border)' }}
                  >
                    <div style={{ padding: '16px 20px' }}>
                      {/* Sparkline */}
                      <div style={{ marginBottom: 14 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-3)', marginBottom: 6 }}>12-Month Rating Trend</div>
                        <Sparkline data={biz.monthlyTrend} />
                      </div>

                      {/* Praise & Complaints */}
                      <div style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-success)', marginBottom: 6 }}>Top Praise</div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                            {biz.topPraise.slice(0, 3).map(p => (
                              <span key={p} className="badge badge-success">{p}</span>
                            ))}
                          </div>
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-danger)', marginBottom: 6 }}>Top Issues</div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                            {biz.topComplaints.slice(0, 2).map(c => (
                              <span key={c} className="badge badge-danger">{c}</span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* 2 recent reviews */}
                      {reviews.slice(0, 2).map(r => (
                        <div key={r.id} style={{ background: 'var(--color-surface-2)', borderRadius: 'var(--radius-md)', padding: '10px 12px', marginBottom: 8, border: '1px solid var(--color-border)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                            <span style={{ fontWeight: 700, fontSize: 12, color: 'var(--color-text-1)' }}>{r.reviewer}</span>
                            <StarRating stars={r.stars} size={10} />
                          </div>
                          <p style={{ fontSize: 11, color: 'var(--color-text-2)', lineHeight: 1.5 }}>
                            {r.text.substring(0, 100)}...
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}
