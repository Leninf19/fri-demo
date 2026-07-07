import { useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { BUSINESSES } from '../data/businesses.js'

const REPORT_TYPES = [
  { id: 'monthly', label: 'Monthly Performance', icon: '📊', desc: 'Rating trends, review volume, and response rates for the selected period.' },
  { id: 'sentiment', label: 'Sentiment Analysis', icon: '💬', desc: 'Positive, neutral, and negative review breakdown with keyword frequency.' },
  { id: 'competitor', label: 'Competitor Benchmarking', icon: '◈', desc: 'Side-by-side comparison against nearby competitors by category.' },
  { id: 'response', label: 'Response Rate Audit', icon: '↩', desc: 'How quickly and consistently each location responds to reviews.' },
]

export default function Reports() {
  const [selectedId, setSelectedId] = useState('all')
  const [selectedType, setSelectedType] = useState('monthly')

  const biz = selectedId === 'all' ? null : BUSINESSES.find(b => b.id === selectedId)

  const avgRating = biz
    ? biz.rating
    : (BUSINESSES.reduce((s, b) => s + b.rating, 0) / BUSINESSES.length).toFixed(2)

  const totalReviews = biz
    ? biz.totalReviews
    : BUSINESSES.reduce((s, b) => s + b.totalReviews, 0)

  const avgResponse = biz
    ? biz.responseRate
    : Math.round(BUSINESSES.reduce((s, b) => s + b.responseRate, 0) / BUSINESSES.length)

  const chartData = biz
    ? biz.monthlyTrend.map((d, i) => ({
        month: ['Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May','Jun'][i],
        reviews: d.count,
        rating: d.avg,
      }))
    : ['Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May','Jun'].map((month, i) => ({
        month,
        reviews: Math.round(BUSINESSES.reduce((s, b) => s + b.monthlyTrend[i].count, 0)),
        rating: parseFloat((BUSINESSES.reduce((s, b) => s + b.monthlyTrend[i].avg, 0) / BUSINESSES.length).toFixed(2)),
      }))

  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--color-text-1)', letterSpacing: '-0.02em' }}>Reports</h1>
          <p style={{ fontSize: 13, color: 'var(--color-text-2)', marginTop: 2 }}>Export and analyze performance data</p>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <select
            value={selectedId}
            onChange={e => setSelectedId(e.target.value)}
            style={{ padding: '8px 12px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', fontSize: 13, fontWeight: 500, color: 'var(--color-text-1)', background: 'var(--color-surface)', cursor: 'pointer', outline: 'none' }}
          >
            <option value="all">All Locations</option>
            {BUSINESSES.map(b => <option key={b.id} value={b.id}>{b.emoji} {b.name}</option>)}
          </select>
          <button style={{ padding: '8px 16px', background: 'var(--color-accent)', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
            Export PDF
          </button>
        </div>
      </div>

      {/* Report type selector */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10, marginBottom: 24 }}>
        {REPORT_TYPES.map(rt => (
          <button
            key={rt.id}
            onClick={() => setSelectedType(rt.id)}
            style={{
              padding: '14px 16px',
              background: selectedType === rt.id ? 'var(--color-accent-lt)' : 'var(--color-surface)',
              border: `1px solid ${selectedType === rt.id ? 'rgba(154,107,0,0.35)' : 'var(--color-border)'}`,
              borderRadius: 'var(--radius-lg)',
              cursor: 'pointer', textAlign: 'left',
              fontFamily: 'inherit',
              transition: 'background 0.14s, border-color 0.14s',
            }}
          >
            <div style={{ fontSize: 18, marginBottom: 6 }}>{rt.icon}</div>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: selectedType === rt.id ? 'var(--color-accent)' : 'var(--color-text-1)', marginBottom: 4 }}>{rt.label}</div>
            <div style={{ fontSize: 11, color: 'var(--color-text-3)', lineHeight: 1.4 }}>{rt.desc}</div>
          </button>
        ))}
      </div>

      {/* KPI Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 14, marginBottom: 24 }}>
        {[
          { label: 'Average Rating', value: avgRating, suffix: '★', color: '#d97706' },
          { label: 'Total Reviews', value: totalReviews.toLocaleString(), suffix: '', color: 'var(--color-text-1)' },
          { label: 'Avg Response Rate', value: avgResponse + '%', suffix: '', color: 'var(--color-success)' },
          { label: 'Locations Tracked', value: biz ? 1 : BUSINESSES.length, suffix: '', color: 'var(--color-info)' },
        ].map(kpi => (
          <div key={kpi.label} className="card" style={{ padding: '16px 18px' }}>
            <div className="text-label" style={{ color: 'var(--color-text-3)', marginBottom: 8 }}>{kpi.label}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: kpi.color, lineHeight: 1 }}>{kpi.value}{kpi.suffix}</div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 18, marginBottom: 24 }}>
        <div className="card" style={{ padding: '20px 20px 12px' }}>
          <div className="text-title" style={{ color: 'var(--color-text-1)', marginBottom: 4 }}>Monthly Review Volume</div>
          <div style={{ fontSize: 11, color: 'var(--color-text-3)', marginBottom: 16 }}>12-month trend</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'var(--color-text-3)' }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: 'var(--color-text-3)' }} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 8, fontSize: 12 }}
                formatter={(v, name) => [v, name === 'reviews' ? 'Reviews' : 'Avg Rating']}
              />
              <Bar dataKey="reviews" fill="var(--color-accent)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Business breakdown */}
        <div className="card" style={{ padding: '20px' }}>
          <div className="text-title" style={{ color: 'var(--color-text-1)', marginBottom: 16 }}>Location Breakdown</div>
          {BUSINESSES.map(b => (
            <div key={b.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 16 }}>{b.emoji}</span>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-1)' }}>{b.name.split(' ').slice(0, 2).join(' ')}</div>
                  <div style={{ fontSize: 10, color: 'var(--color-text-3)' }}>{b.totalReviews.toLocaleString()} reviews</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-1)' }}>{b.rating}★</div>
                <div style={{ fontSize: 10, color: b.responseRate >= 80 ? 'var(--color-success)' : b.responseRate >= 60 ? 'var(--color-warning)' : 'var(--color-danger)' }}>
                  {b.responseRate}% response
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Export options */}
      <div className="card" style={{ padding: '20px' }}>
        <div className="text-title" style={{ color: 'var(--color-text-1)', marginBottom: 14 }}>Export Options</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 10 }}>
          {[
            { label: 'PDF Report', icon: '📄', desc: 'Formatted for stakeholders' },
            { label: 'CSV Data', icon: '📋', desc: 'Raw data for analysis' },
            { label: 'PowerPoint', icon: '📑', desc: 'Presentation-ready slides' },
            { label: 'Email Summary', icon: '📧', desc: 'Send to your team' },
          ].map(opt => (
            <button
              key={opt.label}
              style={{
                padding: '14px 16px',
                background: 'var(--color-surface-2)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer', textAlign: 'left',
                fontFamily: 'inherit',
                transition: 'background 0.12s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--color-accent-lt)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--color-surface-2)'}
            >
              <div style={{ fontSize: 20, marginBottom: 4 }}>{opt.icon}</div>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--color-text-1)', marginBottom: 2 }}>{opt.label}</div>
              <div style={{ fontSize: 11, color: 'var(--color-text-3)' }}>{opt.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
