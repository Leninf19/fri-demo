import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { REVIEWS, generateReply } from '../data/reviews.js'
import { BUSINESSES } from '../data/businesses.js'
import StarRating from '../components/ui/StarRating.jsx'
import { useToast } from '../components/ui/Toast.jsx'

function Avatar({ name, size = 36 }) {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2)
  const colors = ['#d97706', '#166534', '#1E40AF', '#92400E', '#7c3aed']
  const color = colors[name.charCodeAt(0) % colors.length]
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.35, fontWeight: 700, color: 'white', flexShrink: 0 }}>
      {initials}
    </div>
  )
}

export default function ResponseCenter() {
  const [bizFilter, setBizFilter] = useState('all')
  const [replied, setReplied] = useState(new Set())
  const [replyTarget, setReplyTarget] = useState(null)
  const [replyText, setReplyText] = useState('')
  const toast = useToast()

  const pending = REVIEWS.filter(r => !r.responded && !replied.has(r.id))
  const filtered = pending.filter(r => bizFilter === 'all' || r.business === bizFilter)

  const openReply = (r) => {
    setReplyTarget(r)
    setReplyText(generateReply(r, BUSINESSES))
  }

  const confirmReply = () => {
    navigator.clipboard?.writeText(replyText).catch(() => {})
    setReplied(prev => new Set([...prev, replyTarget.id]))
    setReplyTarget(null)
    toast('Marked as replied!')
  }

  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--color-text-1)', letterSpacing: '-0.02em' }}>Response Center</h1>
            <span className="badge badge-danger">{filtered.length} Pending</span>
          </div>
          <p style={{ fontSize: 13, color: 'var(--color-text-2)', marginTop: 2 }}>Reviews awaiting your response</p>
        </div>
        <select
          value={bizFilter}
          onChange={e => setBizFilter(e.target.value)}
          style={{
            padding: '8px 12px',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            fontSize: 13, fontWeight: 500,
            color: 'var(--color-text-1)',
            background: 'var(--color-surface)',
            cursor: 'pointer', outline: 'none',
          }}
        >
          <option value="all">All Businesses</option>
          {BUSINESSES.map(b => (
            <option key={b.id} value={b.id}>{b.emoji} {b.name}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 && (
        <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>✓</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-text-1)', marginBottom: 6 }}>All caught up!</div>
          <p style={{ fontSize: 13, color: 'var(--color-text-2)' }}>No pending reviews for this selection.</p>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <AnimatePresence>
          {filtered.map(r => {
            const biz = BUSINESSES.find(b => b.id === r.business)
            return (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 40, scale: 0.97 }}
                className="card"
                style={{ padding: '18px 20px', borderLeft: `4px solid ${r.stars <= 2 ? 'var(--color-danger)' : r.stars === 3 ? '#d97706' : 'var(--color-border)'}` }}
              >
                <div style={{ display: 'flex', gap: 14 }}>
                  <Avatar name={r.reviewer} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 6 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-1)' }}>{r.reviewer}</span>
                      <span className="badge badge-neutral">{biz?.emoji} {biz?.name}</span>
                      <StarRating stars={r.stars} size={11} />
                      <span style={{ fontSize: 10, color: 'var(--color-text-3)', marginLeft: 'auto' }}>{r.date}</span>
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--color-text-2)', lineHeight: 1.65, marginBottom: 12 }}>{r.text}</p>
                    <button
                      onClick={() => openReply(r)}
                      style={{
                        padding: '7px 16px',
                        background: 'var(--color-accent)',
                        color: 'white', border: 'none',
                        borderRadius: 'var(--radius-md)',
                        fontSize: 12, fontWeight: 700,
                        cursor: 'pointer', fontFamily: 'inherit',
                      }}
                    >
                      ✦ Generate AI Reply
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Reply Modal */}
      <AnimatePresence>
        {replyTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: 8000, background: 'rgba(26,23,20,0.55)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
            onClick={() => setReplyTarget(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.96 }}
              onClick={e => e.stopPropagation()}
              style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--color-border)', width: '100%', maxWidth: 520, padding: '24px' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--color-text-1)' }}>AI-Generated Reply</div>
                <button onClick={() => setReplyTarget(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-3)', fontSize: 20 }}>×</button>
              </div>
              <div style={{ marginBottom: 4 }}>
                <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-3)', marginBottom: 6 }}>Response (editable)</div>
                <textarea
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  rows={6}
                  style={{
                    width: '100%', padding: '12px', fontSize: 13,
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    resize: 'vertical', outline: 'none',
                    color: 'var(--color-text-1)',
                    background: 'var(--color-surface)',
                    lineHeight: 1.6, fontFamily: 'inherit',
                  }}
                />
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
                <button onClick={confirmReply} style={{ flex: 1, padding: '10px 16px', background: 'var(--color-success)', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>
                  Mark as Replied
                </button>
                <button onClick={() => setReplyTarget(null)} style={{ padding: '10px 16px', background: 'transparent', color: 'var(--color-text-2)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
