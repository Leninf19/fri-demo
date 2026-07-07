import { motion } from 'framer-motion'

const STAFF = [
  {
    name: 'Rosa',
    business: 'Casa Tequila Demo',
    emoji: '🌮',
    mentions: 28,
    sentiment: 97,
    stars: 4.9,
    excerpts: [
      'The server Rosa went above and beyond to make the evening special.',
      'Rosa remembered our anniversary and brought out complimentary dessert.',
      'Best server I have had in years — Rosa made the whole experience.',
    ],
    role: 'Server',
  },
  {
    name: 'Dr. Chen',
    business: 'Downtown Dental',
    emoji: '🦷',
    mentions: 24,
    sentiment: 99,
    stars: 5.0,
    excerpts: [
      'Dr. Chen explained every step before doing it.',
      'Dr. Chen resolved the emergency quickly and professionally.',
      'Dr. Chen noticed a cavity I had no idea about. Thorough and caring.',
    ],
    role: 'Lead Dentist',
  },
  {
    name: 'Marco',
    business: 'Elite Fitness Club',
    emoji: '💪',
    mentions: 19,
    sentiment: 94,
    stars: 4.8,
    excerpts: [
      'Trainer Marco helped me fix my squat form in one session.',
      'Marco developed a program specifically around my injury history.',
      'Marco is the most knowledgeable trainer I have worked with.',
    ],
    role: 'Personal Trainer',
  },
  {
    name: 'Lorenzo',
    business: 'Bella Italian Kitchen',
    emoji: '🍝',
    mentions: 15,
    sentiment: 98,
    stars: 4.9,
    excerpts: [
      'Our server Lorenzo knew every dish by heart.',
      'Lorenzo made the perfect wine pairing suggestions.',
      'Lorenzo has the gift of making guests feel like the only table in the room.',
    ],
    role: 'Server',
  },
  {
    name: 'Ashley',
    business: 'Downtown Dental',
    emoji: '🦷',
    mentions: 12,
    sentiment: 96,
    stars: 4.8,
    excerpts: [
      'The hygienist Ashley was gentle and professional.',
      'Ashley gave great tips for at-home care — went above and beyond.',
      'Ashley makes an experience I dread something I actually look forward to.',
    ],
    role: 'Dental Hygienist',
  },
  {
    name: 'Miguel',
    business: 'Palm Bay Construction',
    emoji: '🔨',
    mentions: 9,
    sentiment: 98,
    stars: 5.0,
    excerpts: [
      'Project manager Miguel was outstanding.',
      'Miguel kept us updated every single day of the project.',
      'Miguel problem-solved every obstacle without a single complaint.',
    ],
    role: 'Project Manager',
  },
]

export default function EmployeeIntel() {
  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--color-text-1)', letterSpacing: '-0.02em' }}>Employee Intelligence</h1>
        <p style={{ fontSize: 13, color: 'var(--color-text-2)', marginTop: 2 }}>Staff members mentioned by name in customer reviews</p>
      </div>

      {/* AI Insight */}
      <div className="ai-card" style={{ padding: '20px', marginBottom: 24 }}>
        <div className="ai-label" style={{ marginBottom: 10 }}>✦ AI Insight</div>
        <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.8)', lineHeight: 1.7 }}>
          Staff recognition in reviews is strongly correlated with 5-star ratings. Reviews mentioning a team member by name are <strong style={{ color: '#FCD34D' }}>3.2× more likely to be 5-star</strong> compared to anonymous reviews.
        </p>
        <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, marginTop: 10 }}>
          Consider launching a <strong style={{ color: '#FCD34D' }}>staff spotlight program</strong> in your marketing — featuring team members on social media not only humanizes your brand, it correlates with higher review volumes. Downtown Dental's Dr. Chen drives the highest review quality in the entire portfolio.
        </p>
      </div>

      {/* Summary metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 24 }}>
        {[
          { label: 'Staff Members Mentioned', value: '6', sub: 'Across 5 locations' },
          { label: 'Total Staff Mentions', value: '107', sub: 'In 5,918 reviews' },
          { label: 'Staff-Mention Rating', value: '4.93★', sub: 'Avg when staff named' },
        ].map(m => (
          <div key={m.label} className="card" style={{ padding: '18px 20px', textAlign: 'center' }}>
            <div className="text-label" style={{ color: 'var(--color-text-3)', marginBottom: 6 }}>{m.label}</div>
            <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--color-text-1)', lineHeight: 1, marginBottom: 4 }}>{m.value}</div>
            <div style={{ fontSize: 11, color: 'var(--color-text-3)' }}>{m.sub}</div>
          </div>
        ))}
      </div>

      {/* Staff cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
        {STAFF.map(s => (
          <div key={s.name} className="card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-lg)', background: 'var(--color-accent-lt)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                {s.emoji}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--color-text-1)' }}>{s.name}</div>
                <div style={{ fontSize: 11, color: 'var(--color-text-3)' }}>{s.role} · {s.business}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--color-accent)' }}>{s.mentions}</div>
                <div style={{ fontSize: 10, color: 'var(--color-text-3)' }}>mentions</div>
              </div>
            </div>

            {/* Metrics */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
              <div style={{ flex: 1, background: 'var(--color-success-bg)', borderRadius: 'var(--radius-md)', padding: '8px 10px', textAlign: 'center' }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--color-success)' }}>{s.sentiment}%</div>
                <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-success)', opacity: 0.8 }}>Positive</div>
              </div>
              <div style={{ flex: 1, background: 'var(--color-accent-lt)', borderRadius: 'var(--radius-md)', padding: '8px 10px', textAlign: 'center' }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--color-accent)' }}>{s.stars}★</div>
                <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-accent)', opacity: 0.8 }}>Avg Stars</div>
              </div>
            </div>

            {/* Excerpts */}
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-3)', marginBottom: 8 }}>Review Excerpts</div>
              {s.excerpts.map((ex, i) => (
                <div key={i} style={{ fontSize: 11.5, color: 'var(--color-text-2)', lineHeight: 1.55, padding: '7px 10px', background: 'var(--color-surface-2)', borderRadius: 'var(--radius-md)', marginBottom: 5, borderLeft: '3px solid var(--color-accent-md)' }}>
                  "{ex}"
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
