import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useToast } from '../components/ui/Toast.jsx'

const QUESTIONS = [
  'What should I improve?',
  'Where am I losing customers?',
  'What are my strengths?',
  'How do I compare to competitors?',
  'Which location needs the most attention?',
  'How do I get more reviews?',
]

const ANSWERS = {
  'What should I improve?': {
    title: 'Top Improvement Opportunities',
    body: `Based on analysis of 5,918 reviews across your 8 locations, here are your highest-impact improvement opportunities:

**1. Wait Time Management**
87 reviews mention excessive wait times, concentrated at Casa Tequila on weekend evenings and Elite Fitness during the 5–7 PM peak. A reservation system or off-peak promotion could reduce complaints by an estimated 40%, with a projected rating improvement of 0.15–0.25★ within 90 days.

**2. Review Response Rate**
Blue Harbor Seafood and Elite Fitness Club respond to less than 70% of reviews. Increasing to a 90%+ response rate has been shown to improve overall rating by 0.2–0.4★ over 6 months. This is the single highest-ROI action you can take today.

**3. HVAC at Elite Fitness**
12 separate reviews in the past 30 days mention temperature issues in the weight room. This is a fixable operational issue with immediate customer satisfaction impact. Delay costs approximately 2–3 additional negative reviews per week.

**4. Billing Clarity at Downtown Dental**
8 reviews mention confusion around insurance coverage and billing. Adding a pre-visit cost estimate would eliminate this friction point for what is otherwise your highest-rated location.`,
  },
  'Where am I losing customers?': {
    title: 'Customer Loss Analysis',
    body: `Across your portfolio, three primary friction points are driving customer loss:

**1. First-Time Visitors at Elite Fitness (High Risk)**
Reviews from first-time visitors show 34% negative sentiment — primarily driven by overcrowding and temperature issues. First impressions determine whether someone joins or walks away. This location requires immediate operational attention.

**2. Weekend Dining at Casa Tequila**
Customers who mention "wait" or "parking" in their reviews are 71% less likely to return within 60 days. You're losing repeat diners on your busiest — and most profitable — nights. Validated parking or a reservation system would retain an estimated 15–20 covers per weekend night.

**3. Inconsistency at Blue Harbor Seafood**
15% of reviews specifically mention "inconsistent quality." Customers who have an inconsistent experience are 3× more likely to choose a competitor for their next visit than customers with a poor — but consistent — experience. Consistency beats perfection.

**Opportunity:** Your best-performing locations (Downtown Dental, Future Coffee) share one trait — they address problems in reviews within 2 hours. This responsiveness creates second chances.`,
  },
  'What are my strengths?': {
    title: 'Portfolio Strengths',
    body: `Your portfolio has genuine competitive advantages that deserve amplification:

**1. Quality and Craft (Consistent across 6/8 locations)**
The most common positive theme across your portfolio is authentic quality — "handmade," "fresh," "real," "from scratch." This is rare and valuable. Lean into it in your marketing rather than competing on price or convenience.

**2. Staff Excellence (Downtown Dental and Bella Italian)**
Reviews mentioning staff by name are 3.2× more likely to be 5 stars. Dr. Chen (24 mentions), Rosa (28 mentions), and Lorenzo (15 mentions) are personal brand assets. This level of staff loyalty is something competitors cannot easily replicate.

**3. Response Rate Leadership (Future Coffee at 92%)**
Future Coffee Co. has built the strongest review response culture in the portfolio. This earns trust signals from Google's algorithm and creates a visible proof of care that prospects can see before they visit.

**4. Unique Atmospheres (Blue Harbor, Casa Tequila)**
Waterfront dining and outdoor patio experiences are mentioned as primary reasons for first visits. These physical differentiators should be the hero of your visual marketing.`,
  },
  'How do I compare to competitors?': {
    title: 'Competitive Position',
    body: `Your portfolio holds a strong competitive position in 6 of 8 markets:

**Leaders (0.2★+ advantage)**
Downtown Dental: 4.7★ vs market average of 4.47★. Largest competitive moat.
Future Coffee Co.: 4.6★ in a competitive Austin coffee market. Strong hold.

**Competitive (within 0.2★ of best competitor)**
Casa Tequila: 4.4★ vs Cantina Real at 4.3★. Narrow lead — maintain focus.
Bella Italian: 4.5★ vs Uchi Austin at 4.6★. Losing to a famous competitor on ratings, winning on intimacy and handmade quality.

**Attention Required**
Elite Fitness: 4.1★ vs Life Time Fitness at 4.4★. Structural disadvantage growing. Operational fixes needed before marketing investment.
Blue Harbor: 4.3★ vs Water Street Seafood at 4.5★. Strong competitor with 63% more reviews. Close the response rate gap first.

**Key Insight:** Your advantage is rarely in having the highest rating — it's in having the most authentic and consistent experience. Competitors with more reviews are beatable through quality and responsiveness.`,
  },
  'Which location needs the most attention?': {
    title: 'Priority Location: Elite Fitness Club',
    body: `Elite Fitness Club requires immediate attention across three distinct vectors:

**Rating Trajectory: Declining**
The 3-month trend shows a -0.09★ decline, accelerating from a stable 12-month baseline. At current pace, the location will breach the 4.0★ threshold within 6–8 weeks — a psychologically significant barrier for new member acquisition.

**Root Cause: HVAC + Crowding (fixable)**
12 reviews in 30 days mention temperature issues in the weight room. This is not a perception problem — it is an operational failure with a concrete solution. The HVAC repair is the single highest-priority action.

**Response Rate: 62% (lowest in portfolio)**
Below 70% response rate has measurable impact on Google ranking and new member trust signals. At current volume (39 reviews/month), 15 reviews are going unaddressed monthly.

**Recommended Action Plan:**
1. Repair HVAC immediately — respond to all existing complaints acknowledging the fix
2. Set up peak-hour capacity management (member check-in alerts at 80% capacity)
3. Assign a dedicated response manager — commit to 4-hour response window
4. Launch "off-peak" membership incentive to reduce crowding at 5–7 PM

Timeline to recovery: 60–90 days with consistent execution.`,
  },
  'How do I get more reviews?': {
    title: 'Review Velocity Strategy',
    body: `Your portfolio currently generates 438 reviews per month. Here's how to increase that by 40–60% within 90 days:

**1. Post-Visit Follow-Up (Highest Impact)**
Restaurants and service businesses that send a follow-up message within 2 hours of a visit see 3.4× more reviews per visit. A simple "How was your experience today?" text or email with a direct Google review link is the single most effective tactic.

**2. Respond to Every Review (Review Generation Engine)**
Data shows that businesses responding to 90%+ of reviews receive 35% more reviews over the following 6 months. Responsiveness signals to customers that their voice matters — which makes more customers want to use it.

**3. In-Location Prompts (Low Effort, Real Volume)**
A table card at Casa Tequila, a sign near the dental checkout, a screen at the gym reception — physical prompts with QR codes generate 8–12% conversion from satisfied visitors. No technology required.

**4. Staff Training (Organic and Authentic)**
Train staff to invite happy customers verbally: "We'd love to hear your feedback on Google if you have a moment." Reviews from staff-invited customers average 4.7★ vs 4.1★ for unprompted reviews.

**Current benchmark:** 438 reviews/month. Target: 610–660 reviews/month at 90 days.`,
  },
}

export default function AIAdvisor() {
  const [active, setActive] = useState(null)
  const [answer, setAnswer] = useState(null)
  const toast = useToast()

  const handleQuestion = (q) => {
    setActive(q)
    setAnswer(null)
    setTimeout(() => setAnswer(ANSWERS[q] || { title: q, body: 'Analyzing your data...' }), 400)
  }

  const formatBody = (text) => {
    return text.split('\n\n').map((para, i) => {
      if (para.startsWith('**') && para.endsWith('**')) {
        return <p key={i} style={{ fontSize: 13, fontWeight: 800, color: '#FCD34D', marginBottom: 6 }}>{para.replace(/\*\*/g, '')}</p>
      }
      const formatted = para.replace(/\*\*(.*?)\*\*/g, (_, m) => `<strong style="color:#FCD34D">${m}</strong>`)
      return (
        <p key={i} style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.8)', lineHeight: 1.75, marginBottom: 12 }}
          dangerouslySetInnerHTML={{ __html: formatted }}
        />
      )
    })
  }

  const handleCopy = () => {
    if (answer) {
      navigator.clipboard?.writeText(answer.body.replace(/\*\*/g, '')).catch(() => {})
      toast('Insight copied to clipboard!')
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--color-text-1)', letterSpacing: '-0.02em' }}>AI Advisor</h1>
        <p style={{ fontSize: 13, color: 'var(--color-text-2)', marginTop: 2 }}>Ask anything about your review data</p>
      </div>

      <div className="ai-card" style={{ padding: '28px 24px', minHeight: 400 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>✦</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: 'white', letterSpacing: '-0.01em', marginBottom: 4 }}>AI Business Advisor</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>Powered by analysis of 5,918 reviews across 8 locations</div>
        </div>

        {/* Question pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 28 }}>
          {QUESTIONS.map(q => (
            <button
              key={q}
              onClick={() => handleQuestion(q)}
              style={{
                padding: '8px 16px',
                border: active === q ? '1px solid rgba(154,107,0,0.7)' : '1px solid rgba(255,255,255,0.15)',
                borderRadius: 'var(--radius-full)',
                fontSize: 12.5, fontWeight: 600,
                color: active === q ? '#FCD34D' : 'rgba(255,255,255,0.7)',
                background: active === q ? 'rgba(154,107,0,0.2)' : 'rgba(255,255,255,0.04)',
                cursor: 'pointer', fontFamily: 'inherit',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => {
                if (active !== q) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.9)'
                }
              }}
              onMouseLeave={e => {
                if (active !== q) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
                }
              }}
            >
              {q}
            </button>
          ))}
        </div>

        {/* Answer */}
        <AnimatePresence mode="wait">
          {!active && (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ textAlign: 'center', padding: '20px 0' }}>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>Select a question above to receive AI-generated insights</p>
            </motion.div>
          )}
          {active && !answer && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ textAlign: 'center', padding: '20px 0' }}>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Analyzing your review data...</p>
            </motion.div>
          )}
          {active && answer && (
            <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              style={{ borderTop: '1px solid rgba(154,107,0,0.2)', paddingTop: 24 }}>
              <div className="fri-advisor-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div>
                  <div className="ai-label" style={{ marginBottom: 4 }}>✦ Analysis Complete</div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: 'white' }}>{answer.title}</div>
                </div>
                <div className="fri-advisor-btns" style={{ display: 'flex', gap: 8 }}>
                  <button
                    onClick={handleCopy}
                    style={{
                      padding: '6px 12px',
                      background: 'rgba(154,107,0,0.2)',
                      border: '1px solid rgba(154,107,0,0.3)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: 11, fontWeight: 600,
                      color: '#FCD34D', cursor: 'pointer', fontFamily: 'inherit',
                    }}
                  >
                    Copy Insight
                  </button>
                  <button
                    onClick={() => { setActive(null); setAnswer(null) }}
                    style={{
                      padding: '6px 12px',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: 11, fontWeight: 600,
                      color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontFamily: 'inherit',
                    }}
                  >
                    New Question
                  </button>
                </div>
              </div>
              <div>{formatBody(answer.body)}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
