import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { REVIEWS, generateReply } from '../data/reviews.js'
import { BUSINESSES } from '../data/businesses.js'
import StarRating from '../components/ui/StarRating.jsx'
import { useToast } from '../components/ui/Toast.jsx'

function Avatar({ name, size = 36 }) {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2)
  const colors = ['#d97706', '#166534', '#1E40AF', '#92400E', '#7c3aed', '#0891b2']
  const color = colors[name.charCodeAt(0) % colors.length]
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.35, fontWeight: 700, color: 'white', flexShrink: 0 }}>
      {initials}
    </div>
  )
}

function ReplyModal({ review, onClose, onConfirm }) {
  const biz = BUSINESSES.find(b => b.id === review.business)
  const [text, setText] = useState(generateReply(review, BUSINESSES))

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, zIndex: 8000, background: 'rgba(26,23,20,0.55)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        onClick={e => e.stopPropagation()}
        style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--color-border)', width: '100%', maxWidth: 520, padding: '24px' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--color-text-1)' }}>AI-Generated Reply</div>
            <div style={{ fontSize: 11, color: 'var(--color-text-3)', marginTop: 2 }}>{biz?.emoji} {biz?.name} · {review.reviewer}</div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-3)', fontSize: 20, padding: 4 }}>×</button>
        </div>

        {/* Original review */}
        <div style={{ background: 'var(--color-surface-2)', borderRadius: 'var(--radius-md)', padding: '12px', marginBottom: 14, border: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <StarRating stars={review.stars} size={11} />
            <span style={{ fontSize: 11, color: 'var(--color-text-3)' }}>{review.date}</span>
          </div>
          <p style={{ fontSize: 12, color: 'var(--color-text-2)', lineHeight: 1.5 }}>{review.text}</p>
        </div>

        <div style={{ marginBottom: 4 }}>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-3)', marginBottom: 6 }}>Your Response (editable)</div>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            rows={5}
            style={{
              width: '100%', padding: '12px', fontSize: 13,
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              resize: 'vertical', outline: 'none',
              color: 'var(--color-text-1)',
              background: 'var(--color-surface)',
              lineHeight: 1.6,
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
          <button
            onClick={() => onConfirm(text)}
            style={{
              flex: 1, padding: '10px 16px',
              background: 'var(--color-success)',
              color: 'white', border: 'none',
              borderRadius: 'var(--radius-md)',
              fontWeight: 700, fontSize: 13,
              cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            Copy &amp; Mark Replied
          </button>
          <button
            onClick={onClose}
            style={{
              padding: '10px 16px',
              background: 'transparent',
              color: 'var(--color-text-2)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600, fontSize: 13,
              cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function ReviewExplorer() {
  const [search, setSearch] = useState('')
  const [stars, setStars] = useState('all')
  const [bizFilter, setBizFilter] = useState('all')
  const [needsReply, setNeedsReply] = useState(false)
  const [visible, setVisible] = useState(15)
  const [replied, setReplied] = useState(new Set())
  const [replyTarget, setReplyTarget] = useState(null)
  const toast = useToast()

  const allBizIds = [...new Set(REVIEWS.map(r => r.business))]

  const filtered = REVIEWS.filter(r => {
    if (search && !r.text.toLowerCase().includes(search.toLowerCase()) && !r.reviewer.toLowerCase().includes(search.toLowerCase())) return false
    if (stars !== 'all' && r.stars !== parseInt(stars)) return false
    if (bizFilter !== 'all' && r.business !== bizFilter) return false
    if (needsReply && (r.responded || replied.has(r.id))) return false
    return true
  })

  const handleConfirmReply = (text) => {
    navigator.clipboard?.writeText(text).catch(() => {})
    setReplied(prev => new Set([...prev, replyTarget.id]))
    setReplyTarget(null)
    toast('Response copied to clipboard and marked as replied!')
  }

  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--color-text-1)', letterSpacing: '-0.02em' }}>Review Explorer</h1>
        <p style={{ fontSize: 13, color: 'var(--color-text-2)', marginTop: 2 }}>Search and respond to every customer review</p>
      </div>

      {/* Filter bar */}
      <div className="card" style={{ padding: '14px 18px', marginBottom: 18, display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
        <input
          type="search"
          placeholder="Search reviews or reviewer names..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            flex: '1 1 220px', padding: '7px 12px',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            fontSize: 13, outline: 'none',
            color: 'var(--color-text-1)',
            background: 'var(--color-surface)',
          }}
        />
        {[
          { key: 'stars', value: stars, onChange: setStars, options: [['all','All Stars'],['5','5★'],['4','4★'],['3','3★'],['2','2★'],['1','1★']] },
          { key: 'biz', value: bizFilter, onChange: setBizFilter, options: [['all','All Businesses'], ...BUSINESSES.map(b => [b.id, `${b.emoji} ${b.name}`])] },
        ].map(f => (
          <select
            key={f.key}
            value={f.value}
            onChange={e => f.onChange(e.target.value)}
            style={{
              padding: '7px 10px',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              fontSize: 12, color: 'var(--color-text-2)',
              background: 'var(--color-surface)', cursor: 'pointer', outline: 'none',
            }}
          >
            {f.options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        ))}
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, color: 'var(--color-text-2)', cursor: 'pointer' }}>
          <input type="checkbox" checked={needsReply} onChange={e => setNeedsReply(e.target.checked)} />
          Needs Reply
        </label>
        <div style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--color-text-3)', fontWeight: 600 }}>
          Showing {Math.min(visible, filtered.length)} of {filtered.length} reviews
        </div>
      </div>

      {/* Review list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <AnimatePresence>
          {filtered.slice(0, visible).map(r => {
            const biz = BUSINESSES.find(b => b.id === r.business)
            const isReplied = r.responded || replied.has(r.id)
            return (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                className="card"
                style={{ padding: '18px 20px' }}
              >
                <div style={{ display: 'flex', gap: 14 }}>
                  <Avatar name={r.reviewer} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-1)' }}>{r.reviewer}</span>
                      <span className="badge badge-neutral">{biz?.emoji} {biz?.name}</span>
                      <StarRating stars={r.stars} size={11} />
                      <span style={{ fontSize: 10, color: 'var(--color-text-3)', marginLeft: 'auto' }}>{r.date}</span>
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--color-text-2)', lineHeight: 1.65, marginBottom: 12 }}>{r.text}</p>

                    {/* Response */}
                    {isReplied && (r.response || replied.has(r.id)) && (
                      <div style={{
                        background: 'var(--color-surface-2)',
                        border: '1px solid var(--color-border)',
                        borderLeft: '3px solid var(--color-accent)',
                        borderRadius: 'var(--radius-md)',
                        padding: '10px 14px',
                        marginBottom: 10,
                      }}>
                        <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-accent)', marginBottom: 4 }}>Owner Response</div>
                        <p style={{ fontSize: 12, color: 'var(--color-text-2)', lineHeight: 1.55 }}>
                          {r.response || 'Response marked as sent via platform.'}
                        </p>
                      </div>
                    )}

                    {/* Actions */}
                    {!isReplied && (
                      <button
                        onClick={() => setReplyTarget(r)}
                        style={{
                          padding: '6px 14px',
                          background: 'var(--color-accent-lt)',
                          color: 'var(--color-accent)',
                          border: '1px solid rgba(154,107,0,0.2)',
                          borderRadius: 'var(--radius-md)',
                          fontSize: 12, fontWeight: 700,
                          cursor: 'pointer', fontFamily: 'inherit',
                        }}
                      >
                        ✦ Generate Reply
                      </button>
                    )}
                    {isReplied && (
                      <span className="badge badge-success">✓ Responded</span>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {visible < filtered.length && (
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <button
            onClick={() => setVisible(v => v + 10)}
            style={{
              padding: '10px 28px',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              fontSize: 13, fontWeight: 600,
              color: 'var(--color-text-2)',
              cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            Load More ({filtered.length - visible} remaining)
          </button>
        </div>
      )}

      {/* Reply Modal */}
      <AnimatePresence>
        {replyTarget && (
          <ReplyModal
            review={replyTarget}
            onClose={() => setReplyTarget(null)}
            onConfirm={handleConfirmReply}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
