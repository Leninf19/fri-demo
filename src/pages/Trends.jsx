import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts'
import { BUSINESSES } from '../data/businesses.js'

const MONTHS = ['Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May','Jun']

// Combine all businesses into a portfolio trend
const portfolioTrend = MONTHS.map((month, i) => {
  const avgs = BUSINESSES.map(b => b.monthlyTrend[i].avg)
  const counts = BUSINESSES.map(b => b.monthlyTrend[i].count)
  const avg = avgs.reduce((a, b) => a + b, 0) / avgs.length
  const count = counts.reduce((a, b) => a + b, 0)
  return { month, avg: parseFloat(avg.toFixed(2)), count }
})

const sentimentData = [
  { name: 'Positive', value: 84, color: '#166534' },
  { name: 'Neutral', value: 9, color: '#9C9590' },
  { name: 'Negative', value: 7, color: '#991B1B' },
]

const PREDICTIONS = [
  {
    type: 'positive',
    icon: '↑',
    title: 'Downtown Dental on trajectory for 4.8★',
    body: 'Based on 12-month trend data, Downtown Dental is projected to reach a 4.8★ average by Q4 2026, making it the top-rated location in the portfolio. Continue current response rate and patient experience protocols.',
  },
  {
    type: 'negative',
    icon: '⚠',
    title: 'Elite Fitness Club requires intervention',
    body: '3-month negative trend in ratings — primarily driven by HVAC complaints and peak-hour crowding. Without operational changes, rating is projected to drop below 4.0★ within 8 weeks. Recommend immediate facility upgrades.',
  },
  {
    type: 'warning',
    icon: '→',
    title: 'Blue Harbor Seafood response rate risk',
    body: 'Response rate has declined from 79% to 65% over 3 months. Data shows a 0.3★ average impact on businesses with response rates below 70%. Recommend setting a 24-hour maximum response target.',
  },
]

export default function Trends() {
  const [tab, setTab] = useState('overview')

  const sorted = [...BUSINESSES].sort((a, b) => b.rating - a.rating)

  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--color-text-1)', letterSpacing: '-0.02em' }}>Trends</h1>
        <p style={{ fontSize: 13, color: 'var(--color-text-2)', marginTop: 2 }}>Portfolio analytics and performance forecasting</p>
      </div>

      {/* Tab switcher */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 24, background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: 4, width: 'fit-content' }}>
        {['overview', 'rankings', 'predictions'].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: '7px 18px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              fontSize: 12.5, fontWeight: 600,
              cursor: 'pointer', fontFamily: 'inherit',
              background: tab === t ? 'var(--color-surface)' : 'transparent',
              color: tab === t ? 'var(--color-text-1)' : 'var(--color-text-3)',
              boxShadow: tab === t ? 'var(--shadow-xs)' : 'none',
              transition: 'all 0.15s',
            }}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Portfolio rating trend */}
          <div className="card" style={{ padding: '22px 22px 16px' }}>
            <div style={{ marginBottom: 16 }}>
              <div className="text-title">Portfolio Rating Trend</div>
              <div style={{ fontSize: 11, color: 'var(--color-text-3)' }}>All 8 locations combined · 12 months</div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={portfolioTrend} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#9A6B00" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#9A6B00" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'var(--color-text-3)' }} tickLine={false} axisLine={false} />
                <YAxis domain={[4.0, 4.8]} tick={{ fontSize: 10, fill: 'var(--color-text-3)' }} tickLine={false} axisLine={false} tickCount={5} />
                <Tooltip contentStyle={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 8, fontSize: 12 }} formatter={v => [`${v}★`, 'Avg Rating']} />
                <Area type="monotone" dataKey="avg" stroke="#9A6B00" strokeWidth={2.5} fill="url(#goldGrad)" dot={{ r: 3, fill: '#9A6B00', strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {/* Monthly volume */}
            <div className="card" style={{ padding: '22px 22px 16px' }}>
              <div style={{ marginBottom: 16 }}>
                <div className="text-title">Monthly Review Volume</div>
                <div style={{ fontSize: 11, color: 'var(--color-text-3)' }}>All locations combined</div>
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={portfolioTrend} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'var(--color-text-3)' }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: 'var(--color-text-3)' }} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 8, fontSize: 12 }} formatter={v => [v, 'Reviews']} />
                  <Bar dataKey="count" fill="#d97706" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Sentiment donut */}
            <div className="card" style={{ padding: '22px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ marginBottom: 16 }}>
                <div className="text-title">Portfolio Sentiment</div>
                <div style={{ fontSize: 11, color: 'var(--color-text-3)' }}>Weighted average across all locations</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, flex: 1 }}>
                <ResponsiveContainer width={140} height={140}>
                  <PieChart>
                    <Pie data={sentimentData} cx="50%" cy="50%" innerRadius={38} outerRadius={62} dataKey="value" paddingAngle={2}>
                      {sentimentData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ fontSize: 11, border: '1px solid var(--color-border)', borderRadius: 6 }} formatter={v => [`${v}%`]} />
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {sentimentData.map(s => (
                    <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 2, background: s.color, flexShrink: 0 }} />
                      <span style={{ fontSize: 12, color: 'var(--color-text-2)' }}>{s.name}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-1)', marginLeft: 'auto' }}>{s.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'rankings' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Bar chart */}
          <div className="card" style={{ padding: '22px 22px 16px' }}>
            <div style={{ marginBottom: 16 }}>
              <div className="text-title">Rating by Location</div>
              <div style={{ fontSize: 11, color: 'var(--color-text-3)' }}>Current 30-day average</div>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={sorted} layout="vertical" margin={{ top: 0, right: 20, bottom: 0, left: 130 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
                <XAxis type="number" domain={[3, 5]} tick={{ fontSize: 10, fill: 'var(--color-text-3)' }} tickLine={false} axisLine={false} tickCount={5} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: 'var(--color-text-2)' }} tickLine={false} axisLine={false} width={130} />
                <Tooltip contentStyle={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 8, fontSize: 12 }} formatter={v => [`${v}★`, 'Rating']} />
                <Bar dataKey="rating" radius={[0, 4, 4, 0]}>
                  {sorted.map((b, i) => (
                    <Cell key={i} fill={b.rating >= 4.5 ? '#166534' : b.rating >= 4.0 ? '#9A6B00' : '#991B1B'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Rankings table */}
          <div className="card" style={{ overflow: 'hidden' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Location</th>
                  <th>30d Rating</th>
                  <th>vs Prior</th>
                  <th>Monthly Reviews</th>
                  <th>Response Rate</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((b, i) => (
                  <tr key={b.id}>
                    <td>
                      <span style={{ fontSize: 14, fontWeight: 800, color: i < 3 ? 'var(--color-accent)' : 'var(--color-text-3)' }}>#{i + 1}</span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span>{b.emoji}</span>
                        <div>
                          <div style={{ fontWeight: 700, color: 'var(--color-text-1)', fontSize: 13 }}>{b.name}</div>
                          <div style={{ fontSize: 10, color: 'var(--color-text-3)' }}>{b.category}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span style={{ fontSize: 15, fontWeight: 800, color: b.rating >= 4.5 ? 'var(--color-success)' : b.rating >= 4.0 ? 'var(--color-accent)' : 'var(--color-danger)' }}>{b.rating}★</span>
                    </td>
                    <td>
                      <span style={{ color: b.ratingDelta >= 0 ? 'var(--color-success)' : 'var(--color-danger)', fontWeight: 700, fontSize: 12 }}>
                        {b.ratingDelta >= 0 ? '+' : ''}{b.ratingDelta.toFixed(2)}
                      </span>
                    </td>
                    <td style={{ fontWeight: 600, color: 'var(--color-text-1)' }}>{b.monthlyReviews}</td>
                    <td>
                      <span style={{ fontSize: 12, fontWeight: 700, color: b.responseRate >= 80 ? 'var(--color-success)' : 'var(--color-warning)' }}>{b.responseRate}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'predictions' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="ai-card" style={{ padding: '18px 20px', marginBottom: 4 }}>
            <div className="ai-label" style={{ marginBottom: 8 }}>✦ AI Predictive Analysis</div>
            <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.75)', lineHeight: 1.65 }}>
              Based on 12-month trend analysis across 5,918 reviews. Predictions are generated by analyzing rating velocity, review volume, sentiment trajectory, and response rate patterns.
            </p>
          </div>
          {PREDICTIONS.map((p, i) => (
            <div key={i} className="card" style={{
              padding: '18px 20px',
              borderLeft: `4px solid ${p.type === 'positive' ? 'var(--color-success)' : p.type === 'negative' ? 'var(--color-danger)' : '#d97706'}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>{p.icon}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-text-1)', marginBottom: 6 }}>{p.title}</div>
                  <p style={{ fontSize: 13, color: 'var(--color-text-2)', lineHeight: 1.65 }}>{p.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}
