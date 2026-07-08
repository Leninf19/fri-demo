import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'
import { BUSINESSES } from '../data/businesses.js'
import { REVIEWS } from '../data/reviews.js'
import HealthGauge from '../components/ui/HealthGauge.jsx'
import StarRating from '../components/ui/StarRating.jsx'

const MONTHS = ['Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May','Jun']

export default function Overview() {
  const [selectedId, setSelectedId] = useState(BUSINESSES[0].id)
  const biz = BUSINESSES.find(b => b.id === selectedId)

  const needsResponse = REVIEWS.filter(r => r.business === selectedId && !r.responded)
  const pendingAll = REVIEWS.filter(r => !r.responded)
  const chartData = biz.monthlyTrend.map((d, i) => ({ month: MONTHS[i], avg: d.avg, count: d.count }))

  const spotlightBizzes = BUSINESSES.slice(0, 4)

  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}>
      {/* Business Selector */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--color-text-1)', letterSpacing: '-0.02em' }}>Command Center</h1>
          <p style={{ fontSize: 13, color: 'var(--color-text-2)', marginTop: 2 }}>Portfolio performance across all locations</p>
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
            cursor: 'pointer',
            outline: 'none',
            boxShadow: 'var(--shadow-xs)',
          }}
        >
          {BUSINESSES.map(b => (
            <option key={b.id} value={b.id}>{b.emoji} {b.name}</option>
          ))}
        </select>
      </div>

      {/* KPI Grid */}
      <div className="kpi-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14, marginBottom: 24 }}>
        {/* Health Score */}
        <div className="card kpi-health" style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
          <HealthGauge score={biz.healthScore} grade={biz.healthGrade} size={72} />
          <div>
            <div className="text-label" style={{ color: 'var(--color-text-3)', marginBottom: 3 }}>Health Score</div>
            <div style={{ fontSize: 11, color: 'var(--color-text-2)' }}>Overall grade</div>
          </div>
        </div>

        {/* Avg Rating */}
        <div className="card" style={{ padding: '18px 20px' }}>
          <div className="text-label" style={{ color: 'var(--color-text-3)', marginBottom: 8 }}>Avg Rating</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontSize: 32, fontWeight: 800, color: 'var(--color-text-1)', lineHeight: 1 }}>{biz.rating}</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: biz.ratingDelta >= 0 ? 'var(--color-success)' : 'var(--color-danger)' }}>
              {biz.ratingDelta >= 0 ? '+' : ''}{biz.ratingDelta.toFixed(2)}
            </span>
          </div>
          <StarRating stars={Math.round(biz.rating)} size={13} />
        </div>

        {/* Positive Sentiment */}
        <div className="card" style={{ padding: '18px 20px' }}>
          <div className="text-label" style={{ color: 'var(--color-text-3)', marginBottom: 8 }}>Positive Sentiment</div>
          <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--color-success)', lineHeight: 1, marginBottom: 6 }}>{biz.sentiment.positive}%</div>
          <div style={{ height: 4, background: 'var(--color-border)', borderRadius: 'var(--radius-full)' }}>
            <div style={{ height: '100%', width: `${biz.sentiment.positive}%`, background: '#166534', borderRadius: 'var(--radius-full)', transition: 'width 0.5s' }} />
          </div>
        </div>

        {/* Reviews This Month */}
        <div className="card" style={{ padding: '18px 20px' }}>
          <div className="text-label" style={{ color: 'var(--color-text-3)', marginBottom: 8 }}>Reviews This Month</div>
          <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--color-text-1)', lineHeight: 1, marginBottom: 4 }}>{biz.monthlyReviews}</div>
          <div style={{ fontSize: 11, color: 'var(--color-text-2)' }}>{biz.totalReviews.toLocaleString()} total reviews</div>
        </div>

        {/* Needs Response */}
        <div className="card" style={{ padding: '18px 20px' }}>
          <div className="text-label" style={{ color: 'var(--color-text-3)', marginBottom: 8 }}>Needs Response</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 32, fontWeight: 800, color: needsResponse.length > 0 ? 'var(--color-danger)' : 'var(--color-success)', lineHeight: 1 }}>{needsResponse.length}</span>
            {needsResponse.length > 0 && <span className="badge badge-danger">Urgent</span>}
          </div>
          <div style={{ fontSize: 11, color: 'var(--color-text-2)', marginTop: 4 }}>{biz.responseRate}% response rate</div>
        </div>
      </div>

      <div className="overview-chart-row" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 18, marginBottom: 24 }}>
        {/* Rating Trend Chart */}
        <div className="card" style={{ padding: '20px 20px 14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <div>
              <div className="text-title" style={{ color: 'var(--color-text-1)' }}>Rating Trend</div>
              <div style={{ fontSize: 11, color: 'var(--color-text-3)' }}>12-month history</div>
            </div>
            <div className="badge badge-accent">{biz.emoji} {biz.name.split(' ').slice(0, 2).join(' ')}</div>
          </div>
          <div className="chart-sm"><ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'var(--color-text-3)' }} tickLine={false} axisLine={false} />
              <YAxis domain={[3.5, 5]} tick={{ fontSize: 10, fill: 'var(--color-text-3)' }} tickLine={false} axisLine={false} tickCount={4} />
              <Tooltip
                contentStyle={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 8, fontSize: 12 }}
                labelStyle={{ color: 'var(--color-text-2)', fontWeight: 600 }}
                formatter={v => [`${v}★`, 'Avg Rating']}
              />
              <Line type="monotone" dataKey="avg" stroke="#9A6B00" strokeWidth={2.5} dot={{ r: 3, fill: '#9A6B00', strokeWidth: 0 }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer></div>
        </div>

        {/* AI Executive Summary */}
        <div className="ai-card" style={{ padding: '20px' }}>
          <div className="ai-label" style={{ marginBottom: 10 }}>✦ AI Executive Intelligence</div>
          <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.78)', lineHeight: 1.7 }}>
            Customers across all 8 locations consistently praise quality, value, and service. The portfolio average rating of <strong style={{ color: '#FCD34D' }}>4.41★</strong> reflects a healthy 12% improvement over the previous quarter.
          </p>
          <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.78)', lineHeight: 1.7, marginTop: 10 }}>
            <strong style={{ color: '#FCD34D' }}>Casa Tequila Demo</strong> and <strong style={{ color: '#FCD34D' }}>Downtown Dental</strong> lead portfolio performance. <strong style={{ color: '#f87171' }}>Elite Fitness Club</strong> requires immediate attention — HVAC complaints are affecting satisfaction scores.
          </p>
          <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.78)', lineHeight: 1.7, marginTop: 10 }}>
            Prioritize review responses for <strong style={{ color: '#FCD34D' }}>Blue Harbor Seafood</strong> where response rate has dropped to 65%.
          </p>
        </div>
      </div>

      {/* Priority Queue + Location Spotlight */}
      <div className="overview-bottom-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        {/* Priority Queue */}
        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div className="text-title" style={{ color: 'var(--color-text-1)' }}>Priority Queue</div>
            <span className="badge badge-danger">{pendingAll.length} Pending</span>
          </div>
          {pendingAll.slice(0, 4).map(r => {
            const b = BUSINESSES.find(x => x.id === r.business)
            return (
              <div key={r.id} style={{
                background: '#FFF8F8',
                border: '1px solid #FECACA',
                borderLeft: '3px solid var(--color-danger)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 14px',
                marginBottom: 10,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text-1)' }}>{r.reviewer}</span>
                    <StarRating stars={r.stars} size={11} />
                  </div>
                  <span className="badge badge-neutral">{b?.emoji} {b?.name.split(' ')[0]}</span>
                </div>
                <p style={{ fontSize: 12, color: 'var(--color-text-2)', lineHeight: 1.5, marginBottom: 8 }}>
                  {r.text.substring(0, 120)}...
                </p>
                <button style={{
                  padding: '5px 12px',
                  background: 'var(--color-danger)',
                  color: 'white', border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 11, fontWeight: 700,
                  cursor: 'pointer', fontFamily: 'inherit',
                }}>
                  Reply Now
                </button>
              </div>
            )
          })}
        </div>

        {/* Location Spotlight */}
        <div className="card" style={{ padding: '20px' }}>
          <div className="text-title" style={{ color: 'var(--color-text-1)', marginBottom: 14 }}>Location Spotlight</div>
          <div className="spotlight-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {spotlightBizzes.map(b => (
              <div key={b.id} className="card card-hover" style={{ padding: '14px', border: '1px solid var(--color-border)' }}>
                <div style={{ fontSize: 20, marginBottom: 6 }}>{b.emoji}</div>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--color-text-1)', marginBottom: 2 }}>{b.name.split(' ').slice(0, 2).join(' ')}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--color-text-1)' }}>{b.rating}</span>
                  <span style={{ fontSize: 11, color: b.trend === 'up' ? 'var(--color-success)' : b.trend === 'down' ? 'var(--color-danger)' : 'var(--color-text-3)' }}>
                    {b.trend === 'up' ? '↑' : b.trend === 'down' ? '↓' : '→'}
                  </span>
                </div>
                <div style={{ fontSize: 10, color: 'var(--color-text-3)' }}>{b.monthlyReviews} reviews/mo · {b.responseRate}% response</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
