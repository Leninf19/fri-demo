import { useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { BUSINESSES } from '../data/businesses.js'
import StarRating from '../components/ui/StarRating.jsx'

export default function CompetitorIntel() {
  const [selectedId, setSelectedId] = useState(BUSINESSES[0].id)
  const biz = BUSINESSES.find(b => b.id === selectedId)

  const avgCompRating = biz.competitors.reduce((a, c) => a + c.rating, 0) / biz.competitors.length
  const bestComp = biz.competitors.reduce((a, c) => c.rating > a.rating ? c : a)

  const chartData = [
    { name: biz.name.split(' ')[0], rating: biz.rating, isYou: true },
    ...biz.competitors.map(c => ({ name: c.name.split(' ')[0], rating: c.rating, isYou: false })),
  ]

  const opportunities = [
    `Maintain response rate above ${biz.responseRate}% — only ${biz.competitors.filter(c => c.rating > 4.2).length} competitors match your engagement levels.`,
    `${bestComp.name} leads the competitive set at ${bestComp.rating}★ with ${bestComp.reviews.toLocaleString()} reviews. Close the review volume gap through post-visit follow-up campaigns.`,
    `Highlight your unique differentiators — ${biz.topPraise[0]} and ${biz.topPraise[1]} are attributes competitors rarely mention. Make these central to your marketing.`,
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--color-text-1)', letterSpacing: '-0.02em' }}>Competitor Intelligence</h1>
          <p style={{ fontSize: 13, color: 'var(--color-text-2)', marginTop: 2 }}>Competitive landscape analysis for your locations</p>
        </div>
        <select
          value={selectedId}
          onChange={e => setSelectedId(e.target.value)}
          style={{
            padding: '8px 12px',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            fontSize: 13, fontWeight: 500,
            color: 'var(--color-text-1)',
            background: 'var(--color-surface)',
            cursor: 'pointer', outline: 'none',
            boxShadow: 'var(--shadow-xs)',
          }}
        >
          {BUSINESSES.map(b => (
            <option key={b.id} value={b.id}>{b.emoji} {b.name}</option>
          ))}
        </select>
      </div>

      {/* Headline metrics */}
      <div className="competitor-kpi-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 22 }}>
        {[
          { label: 'Your Rating', value: `${biz.rating}★`, sub: biz.name, color: 'var(--color-accent)' },
          { label: 'Category Avg', value: `${avgCompRating.toFixed(1)}★`, sub: 'Competitor average', color: 'var(--color-text-3)' },
          { label: 'Best Competitor', value: `${bestComp.rating}★`, sub: bestComp.name, color: 'var(--color-info)' },
        ].map(m => (
          <div key={m.label} className="card" style={{ padding: '18px 20px', textAlign: 'center' }}>
            <div className="text-label" style={{ color: 'var(--color-text-3)', marginBottom: 8 }}>{m.label}</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: m.color, lineHeight: 1, marginBottom: 4 }}>{m.value}</div>
            <div style={{ fontSize: 11, color: 'var(--color-text-3)' }}>{m.sub}</div>
          </div>
        ))}
      </div>

      <div className="competitor-main-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 18, marginBottom: 20 }}>
        {/* Bar chart */}
        <div className="card" style={{ padding: '22px 22px 16px' }}>
          <div style={{ marginBottom: 16 }}>
            <div className="text-title">Head-to-Head Comparison</div>
            <div style={{ fontSize: 11, color: 'var(--color-text-3)' }}>Gold = your location</div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData} margin={{ top: 4, right: 4, bottom: 20, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: 'var(--color-text-3)' }} tickLine={false} axisLine={false} />
              <YAxis domain={[3, 5]} tick={{ fontSize: 10, fill: 'var(--color-text-3)' }} tickLine={false} axisLine={false} tickCount={5} />
              <Tooltip contentStyle={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 8, fontSize: 12 }} formatter={v => [`${v}★`, 'Rating']} />
              <Bar dataKey="rating" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, i) => (
                  <Cell key={i} fill={entry.isYou ? '#9A6B00' : '#E8E4DF'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* AI summary */}
        <div className="ai-card" style={{ padding: '20px' }}>
          <div className="ai-label" style={{ marginBottom: 10 }}>✦ Competitive Summary</div>
          <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.8)', lineHeight: 1.7 }}>
            <strong style={{ color: '#FCD34D' }}>{biz.name}</strong> holds a competitive advantage in this market with a {biz.rating}★ average.
          </p>
          <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, marginTop: 10 }}>
            <strong style={{ color: '#f87171' }}>{bestComp.name}</strong> is the nearest competitive threat at {bestComp.rating}★ with {bestComp.reviews.toLocaleString()} reviews — {Math.round((bestComp.reviews / biz.totalReviews - 1) * 100)}% more social proof.
          </p>
          <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, marginTop: 10 }}>
            Increasing <strong style={{ color: '#FCD34D' }}>review velocity</strong> through response rate improvement and post-visit follow-up is the fastest path to widening the gap.
          </p>
        </div>
      </div>

      {/* Competitor table */}
      <div className="card" style={{ overflow: 'hidden', marginBottom: 20 }}>
        <div style={{ padding: '18px 20px 12px' }}>
          <div className="text-title">Nearby Competitors</div>
        </div>
        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
        <table className="data-table" style={{ minWidth: 380 }}>
          <thead>
            <tr>
              <th>Business</th>
              <th>Rating</th>
              <th>Reviews</th>
              <th>Distance</th>
              <th>vs You</th>
            </tr>
          </thead>
          <tbody>
            {biz.competitors.map((c, i) => {
              const diff = (c.rating - biz.rating).toFixed(1)
              return (
                <tr key={i}>
                  <td style={{ fontWeight: 600, color: 'var(--color-text-1)', fontSize: 13 }}>{c.name}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-text-1)' }}>{c.rating}</span>
                      <StarRating stars={Math.round(c.rating)} size={10} />
                    </div>
                  </td>
                  <td style={{ color: 'var(--color-text-2)' }}>{c.reviews.toLocaleString()}</td>
                  <td style={{ color: 'var(--color-text-3)' }}>{c.distance}</td>
                  <td>
                    <span style={{ fontSize: 12, fontWeight: 700, color: parseFloat(diff) > 0 ? 'var(--color-danger)' : 'var(--color-success)' }}>
                      {parseFloat(diff) > 0 ? '+' : ''}{diff}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        </div>
      </div>

      {/* Opportunities */}
      <div className="card" style={{ padding: '20px' }}>
        <div className="text-title" style={{ marginBottom: 14 }}>Competitive Opportunities</div>
        {opportunities.map((opp, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--color-accent-lt)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 12, fontWeight: 700, color: 'var(--color-accent)' }}>
              {i + 1}
            </div>
            <p style={{ fontSize: 13, color: 'var(--color-text-2)', lineHeight: 1.65 }}>{opp}</p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
