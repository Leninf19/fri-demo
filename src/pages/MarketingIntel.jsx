import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BUSINESSES } from '../data/businesses.js'
import { REVIEWS } from '../data/reviews.js'
import { useToast } from '../components/ui/Toast.jsx'

const PRAISE_DATA = [
  { attribute: 'Birria Tacos', mentions: 142, business: 'Casa Tequila Demo', examples: ['Best birria tacos I have ever had.', 'Birria tacos are what dreams are made of.', '$2.50 birria tacos on Taco Tuesday is unbeatable.'] },
  { attribute: 'Handmade Pasta', mentions: 118, business: 'Bella Italian Kitchen', examples: ['The handmade pasta here is genuinely extraordinary.', 'House-made tonnarelli with the perfect texture.', 'Gnocchi was pillowy perfection.'] },
  { attribute: 'Oat Milk Lattes', mentions: 97, business: 'Future Coffee Co.', examples: ['Consistently perfect oat milk latte.', 'Best oat milk latte in Austin.', 'The baristas make the perfect oat milk latte every time.'] },
  { attribute: 'Margaritas', mentions: 89, business: 'Casa Tequila Demo', examples: ['Margaritas here are next level.', 'The jalapeño margarita has me hooked.', 'House margaritas made from scratch — you can taste the difference.'] },
  { attribute: 'Waterfront Views', mentions: 76, business: 'Blue Harbor Seafood', examples: ['Beautiful waterfront view.', 'Gulf Coast atmosphere makes every bite feel like a vacation.', 'Waterfront seating made this a memorable dinner.'] },
  { attribute: 'Friendly Staff', mentions: 74, business: 'Multiple Locations', examples: ['Staff was incredibly friendly.', 'Team remembers your order after the second visit.', 'Server Rosa went above and beyond.'] },
  { attribute: 'Caring Dental Team', mentions: 68, business: 'Downtown Dental', examples: ['The staff is wonderfully kind.', 'Hygienist Ashley was gentle and professional.', 'Dr. Chen explained every step before doing it.'] },
  { attribute: 'Tiramisu', mentions: 52, business: 'Bella Italian Kitchen', examples: ['Best tiramisu outside of Rome.', 'They surprised us with a complimentary tiramisu.', 'The tiramisu is something I am still dreaming about.'] },
]

const CAPTIONS = [
  {
    platform: 'Instagram',
    icon: '📸',
    text: '142 customers can\'t stop talking about our birria tacos — and honestly, we understand. The consommé is slow-simmered for 12 hours, the tortillas are pressed fresh every morning, and the outdoor patio is waiting for you.\n\nTaco Tuesday: $2.50 birria tacos + free parking validation before 6pm. 🌮\n\n#BirriaLife #ElPasoEats #CasaTequila #BestTacos',
  },
  {
    platform: 'Facebook',
    icon: '📘',
    text: 'Our guests have spoken — 142 rave reviews mention our birria tacos as the best in El Paso. Here\'s what makes them different: 12-hour slow-cooked consommé, fresh-pressed tortillas, and ingredients sourced from local farms.\n\nJoin us for Taco Tuesday: $2.50 birria tacos, all day. See you at the patio!',
  },
  {
    platform: 'Google Post',
    icon: '🔍',
    text: 'NEW: Taco Tuesday every week — $2.50 birria tacos with free parking validation before 6 PM. Our birria tacos are our most-reviewed dish, with over 140 customers calling them the best in El Paso. Reserve your table online.',
  },
]

const OPPORTUNITIES = [
  {
    title: 'Feature Birria Tacos in next Instagram post',
    detail: '142 mentions make it your most sellable asset. Pair with behind-the-scenes kitchen content for maximum engagement.',
    impact: 'High',
    effort: 'Low',
  },
  {
    title: 'Launch a Taco Tuesday promotion',
    detail: 'Strongest positive mention spike occurs Tuesday mentions. A $2.50 taco promotion drives volume on your slowest day.',
    impact: 'High',
    effort: 'Low',
  },
  {
    title: 'Create a "Why Handmade Matters" content series',
    detail: '118 pasta mentions at Bella Italian include language about quality and craft. A content series justifies premium pricing.',
    impact: 'Medium',
    effort: 'Medium',
  },
  {
    title: 'Leverage waterfront views for Blue Harbor',
    detail: '76 mentions of the waterfront experience. Drone footage or sunset shots during golden hour would generate organic shares.',
    impact: 'High',
    effort: 'Medium',
  },
]

export default function MarketingIntel() {
  const [expanded, setExpanded] = useState(null)
  const [copiedCaption, setCopiedCaption] = useState(null)
  const toast = useToast()

  const maxMentions = PRAISE_DATA[0].mentions

  const handleCopy = (i, text) => {
    navigator.clipboard?.writeText(text).catch(() => {})
    setCopiedCaption(i)
    setTimeout(() => setCopiedCaption(null), 2000)
    toast('Caption copied to clipboard!')
  }

  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--color-text-1)', letterSpacing: '-0.02em' }}>Marketing Intelligence</h1>
        <p style={{ fontSize: 13, color: 'var(--color-text-2)', marginTop: 2 }}>Turn your best reviews into marketing ammunition</p>
      </div>

      {/* Top Praise */}
      <div className="card" style={{ padding: '20px', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <div className="text-title">Top Praised Attributes</div>
            <div style={{ fontSize: 11, color: 'var(--color-text-3)', marginTop: 2 }}>Ranked by mention frequency across all reviews</div>
          </div>
          <span className="badge badge-accent">✦ AI Ranked</span>
        </div>
        {PRAISE_DATA.map((p, i) => (
          <div key={p.attribute}>
            <div
              className="card-hover"
              onClick={() => setExpanded(expanded === i ? null : i)}
              style={{ padding: '10px 12px', borderRadius: 'var(--radius-md)', cursor: 'pointer', marginBottom: 6 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 24, textAlign: 'center', fontSize: 14, fontWeight: 800, color: i < 3 ? 'var(--color-accent)' : 'var(--color-text-3)' }}>
                  #{i + 1}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-1)' }}>{p.attribute}</span>
                    <span style={{ fontSize: 10, color: 'var(--color-text-3)' }}>— {p.business}</span>
                    <span style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 700, color: 'var(--color-text-1)' }}>{p.mentions} mentions</span>
                  </div>
                  <div style={{ height: 5, background: 'var(--color-border)', borderRadius: 'var(--radius-full)' }}>
                    <div style={{ height: '100%', width: `${(p.mentions / maxMentions) * 100}%`, background: 'var(--color-accent)', borderRadius: 'var(--radius-full)', transition: 'width 0.5s' }} />
                  </div>
                </div>
              </div>
            </div>
            <AnimatePresence>
              {expanded === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  style={{ overflow: 'hidden', marginBottom: 8 }}
                >
                  <div style={{ padding: '8px 12px 12px 48px' }}>
                    {p.examples.map((ex, j) => (
                      <div key={j} style={{ fontSize: 12, color: 'var(--color-text-2)', padding: '6px 12px', background: 'var(--color-surface-2)', borderRadius: 'var(--radius-md)', marginBottom: 5, borderLeft: '3px solid var(--color-accent-md)', lineHeight: 1.55 }}>
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

      {/* AI Campaign Builder + Social Captions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginBottom: 20 }}>
        {/* Campaign Builder */}
        <div className="ai-card" style={{ padding: '22px' }}>
          <div className="ai-label" style={{ marginBottom: 12 }}>✦ AI Campaign Generator</div>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Headline</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'white', lineHeight: 1.3 }}>Where Every Taco Tells a Story</div>
          </div>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Campaign Angle</div>
            <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>Lean into authenticity and craft. 142 reviews spontaneously mention birria — that organic enthusiasm is your most powerful marketing asset. Campaign should feel discovered, not advertised.</p>
          </div>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Photo Ideas</div>
            <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>Close-up of birria dipping into consommé with steam visible. Golden hour on the patio. The tortilla press in motion. Hands of the cook — authenticity over perfection.</p>
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Video Ideas</div>
            <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>30-second Reel: Kitchen prep → finished birria plate → customer reaction. No voice-over needed. The visual tells the story.</p>
          </div>
        </div>

        {/* Social Captions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {CAPTIONS.map((c, i) => (
            <div key={i} className="card" style={{ padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span>{c.icon}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text-1)' }}>{c.platform}</span>
                </div>
                <button
                  onClick={() => handleCopy(i, c.text)}
                  style={{
                    padding: '4px 10px',
                    fontSize: 11, fontWeight: 600,
                    background: copiedCaption === i ? 'var(--color-success-bg)' : 'var(--color-accent-lt)',
                    color: copiedCaption === i ? 'var(--color-success)' : 'var(--color-accent)',
                    border: 'none', borderRadius: 'var(--radius-full)',
                    cursor: 'pointer', fontFamily: 'inherit',
                    transition: 'background 0.2s',
                  }}
                >
                  {copiedCaption === i ? '✓ Copied' : 'Copy'}
                </button>
              </div>
              <p style={{ fontSize: 12, color: 'var(--color-text-2)', lineHeight: 1.55, whiteSpace: 'pre-line' }}>{c.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Opportunities */}
      <div className="card" style={{ padding: '20px' }}>
        <div className="text-title" style={{ marginBottom: 14 }}>Marketing Opportunities</div>
        {OPPORTUNITIES.map((opp, i) => (
          <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 12, paddingBottom: 12, borderBottom: i < OPPORTUNITIES.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
            <div style={{ fontSize: 18, flexShrink: 0 }}>→</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-1)' }}>{opp.title}</span>
                <span className={`badge badge-${opp.impact === 'High' ? 'success' : 'warning'}`}>
                  {opp.impact} Impact
                </span>
                <span className={`badge badge-${opp.effort === 'Low' ? 'accent' : 'neutral'}`}>
                  {opp.effort} Effort
                </span>
              </div>
              <p style={{ fontSize: 12, color: 'var(--color-text-2)', lineHeight: 1.55 }}>{opp.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
