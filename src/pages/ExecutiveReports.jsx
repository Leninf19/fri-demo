import { useState } from 'react'
import { motion } from 'framer-motion'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { BUSINESSES } from '../data/businesses.js'
import { useToast } from '../components/ui/Toast.jsx'
import HealthGauge from '../components/ui/HealthGauge.jsx'

const PERIODS = ['Last 30 Days', 'Last Quarter', 'Last Year']
const MONTHS = ['Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May','Jun']

export default function ExecutiveReports() {
  const [selectedId, setSelectedId] = useState(BUSINESSES[0].id)
  const [period, setPeriod] = useState('Last 30 Days')
  const biz = BUSINESSES.find(b => b.id === selectedId)
  const toast = useToast()

  const chartData = biz.monthlyTrend.map((d, i) => ({ month: MONTHS[i], avg: d.avg, count: d.count }))

  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--color-text-1)', letterSpacing: '-0.02em' }}>Executive Reports</h1>
          <p style={{ fontSize: 13, color: 'var(--color-text-2)', marginTop: 2 }}>Board-ready performance summaries</p>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <select
            value={selectedId}
            onChange={e => setSelectedId(e.target.value)}
            style={{ padding: '8px 12px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', fontSize: 13, fontWeight: 500, color: 'var(--color-text-1)', background: 'var(--color-surface)', cursor: 'pointer', outline: 'none' }}
          >
            {BUSINESSES.map(b => <option key={b.id} value={b.id}>{b.emoji} {b.name}</option>)}
          </select>
          <select
            value={period}
            onChange={e => setPeriod(e.target.value)}
            style={{ padding: '8px 12px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', fontSize: 13, fontWeight: 500, color: 'var(--color-text-1)', background: 'var(--color-surface)', cursor: 'pointer', outline: 'none' }}
          >
            {PERIODS.map(p => <option key={p}>{p}</option>)}
          </select>
          <button
            onClick={() => toast('PDF export is available in the full platform.')}
            style={{ padding: '8px 16px', background: 'var(--color-accent)', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}
          >
            Download PDF
          </button>
        </div>
      </div>

      {/* Report content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* Executive Summary */}
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-text-3)', marginBottom: 4 }}>Section 1</div>
              <div className="text-section">Executive Summary</div>
            </div>
            <span className="badge badge-accent">{period}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 24, alignItems: 'center' }}>
            <HealthGauge score={biz.healthScore} grade={biz.healthGrade} size={88} />
            <div>
              <p style={{ fontSize: 13, color: 'var(--color-text-2)', lineHeight: 1.75 }}>
                <strong>{biz.name}</strong> maintained a <strong>{biz.rating}★</strong> average rating during {period.toLowerCase()}, with <strong>{biz.monthlyReviews} new reviews</strong> and a response rate of <strong>{biz.responseRate}%</strong>. The overall health score of <strong>{biz.healthScore}/100 ({biz.healthGrade})</strong> reflects strong customer satisfaction fundamentals with specific areas for operational improvement.
              </p>
              <p style={{ fontSize: 13, color: 'var(--color-text-2)', lineHeight: 1.75, marginTop: 10 }}>
                Rating trend shows a <strong style={{ color: biz.ratingDelta >= 0 ? 'var(--color-success)' : 'var(--color-danger)' }}>
                  {biz.ratingDelta >= 0 ? '+' : ''}{biz.ratingDelta.toFixed(2)}★
                </strong> movement from the prior period, placing this location among the <strong>top performers</strong> in the portfolio.
              </p>
            </div>
          </div>
        </div>

        {/* Rating Performance */}
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-text-3)', marginBottom: 4 }}>Section 2</div>
          <div className="text-section" style={{ marginBottom: 18 }}>Rating Performance</div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={chartData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="gold2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#9A6B00" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#9A6B00" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'var(--color-text-3)' }} tickLine={false} axisLine={false} />
              <YAxis domain={[3.5, 5]} tick={{ fontSize: 10, fill: 'var(--color-text-3)' }} tickLine={false} axisLine={false} tickCount={4} />
              <Tooltip contentStyle={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 8, fontSize: 12 }} formatter={v => [`${v}★`]} />
              <Area type="monotone" dataKey="avg" stroke="#9A6B00" strokeWidth={2.5} fill="url(#gold2)" dot={{ r: 3, fill: '#9A6B00', strokeWidth: 0 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Review Volume + Response Performance */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div className="card" style={{ padding: '24px' }}>
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-text-3)', marginBottom: 4 }}>Section 3</div>
            <div className="text-section" style={{ marginBottom: 18 }}>Review Volume</div>
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={chartData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 9, fill: 'var(--color-text-3)' }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 9, fill: 'var(--color-text-3)' }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ fontSize: 11, border: '1px solid var(--color-border)', borderRadius: 6 }} />
                <Bar dataKey="count" fill="#d97706" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="card" style={{ padding: '24px' }}>
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-text-3)', marginBottom: 4 }}>Section 4</div>
            <div className="text-section" style={{ marginBottom: 18 }}>Response Performance</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: 'Response Rate', value: `${biz.responseRate}%`, color: biz.responseRate >= 80 ? 'var(--color-success)' : 'var(--color-warning)', bar: biz.responseRate },
                { label: 'Avg Response Time', value: biz.avgResponseTime, color: 'var(--color-text-1)', bar: null },
                { label: 'Positive Sentiment', value: `${biz.sentiment.positive}%`, color: 'var(--color-success)', bar: biz.sentiment.positive },
              ].map(m => (
                <div key={m.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                    <span style={{ fontSize: 12, color: 'var(--color-text-2)' }}>{m.label}</span>
                    <span style={{ fontSize: 14, fontWeight: 800, color: m.color }}>{m.value}</span>
                  </div>
                  {m.bar !== null && (
                    <div style={{ height: 5, background: 'var(--color-border)', borderRadius: 'var(--radius-full)' }}>
                      <div style={{ height: '100%', width: `${m.bar}%`, background: m.color, borderRadius: 'var(--radius-full)', transition: 'width 0.5s' }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Issues + Top Praise */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {[
            { label: 'Section 5', title: 'Top Issues', items: biz.topComplaints, color: 'var(--color-danger)', badge: 'badge-danger' },
            { label: 'Section 6', title: 'Top Praise', items: biz.topPraise, color: 'var(--color-success)', badge: 'badge-success' },
          ].map(s => (
            <div key={s.title} className="card" style={{ padding: '24px' }}>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-text-3)', marginBottom: 4 }}>{s.label}</div>
              <div className="text-section" style={{ marginBottom: 14 }}>{s.title}</div>
              {s.items.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <div style={{ width: 20, fontSize: 12, fontWeight: 800, color: 'var(--color-text-3)', textAlign: 'right', flexShrink: 0 }}>#{i+1}</div>
                  <span className={`badge ${s.badge}`}>{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Recommendations */}
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-text-3)', marginBottom: 4 }}>Section 7</div>
          <div className="text-section" style={{ marginBottom: 16 }}>Strategic Recommendations</div>
          {[
            `Improve response rate to 90%+ by assigning a dedicated review response workflow — estimated rating improvement of 0.2–0.3★ within 60 days.`,
            `Amplify "${biz.topPraise[0]}" and "${biz.topPraise[1]}" in marketing materials — these attributes drive the highest share of organic review mentions.`,
            `Address "${biz.topComplaints[0]}" proactively — the most mentioned operational issue. A process improvement here would have direct impact on sentiment scores.`,
          ].map((r, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--color-accent-lt)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 11, fontWeight: 700, color: 'var(--color-accent)' }}>{i+1}</div>
              <p style={{ fontSize: 13, color: 'var(--color-text-2)', lineHeight: 1.65 }}>{r}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
