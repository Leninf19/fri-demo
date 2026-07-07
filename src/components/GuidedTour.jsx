import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

/* ── Animation hooks ──────────────────────────────────────────────────────── */
function useCycle(n, ms) {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI(x => (x + 1) % n), ms)
    return () => clearInterval(id)
  }, [])
  return i
}

function usePhase(delays) {
  const [phase, setPhase] = useState(0)
  useEffect(() => {
    const timers = delays.map((d, i) => setTimeout(() => setPhase(i + 1), d))
    return () => timers.forEach(clearTimeout)
  }, [])
  return phase
}

function useTypewriter(text, startAt, speed = 18) {
  const [typed, setTyped] = useState('')
  useEffect(() => {
    if (!startAt) return
    let i = 0
    setTyped('')
    const id = setInterval(() => {
      i++
      setTyped(text.slice(0, i))
      if (i >= text.length) clearInterval(id)
    }, speed)
    return () => clearInterval(id)
  }, [startAt, text])
  return typed
}

/* ── CSS injection ────────────────────────────────────────────────────────── */
const TOUR_CSS = `
@keyframes fri-sweep{0%{transform:translateX(-120%)}100%{transform:translateX(240%)}}
@keyframes fri-blink{0%,100%{opacity:1}50%{opacity:0}}
@keyframes fri-ring{0%{box-shadow:0 0 0 0 rgba(154,107,0,0.45)}70%{box-shadow:0 0 0 8px rgba(154,107,0,0)}100%{box-shadow:0 0 0 0 rgba(154,107,0,0)}}
@keyframes fri-dot-bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
.fri-sweep{animation:fri-sweep 2.2s cubic-bezier(.4,0,.6,1) infinite}
.fri-cursor::after{content:'|';animation:fri-blink .85s step-end infinite;color:#9A6B00;font-weight:300}
.fri-ring{animation:fri-ring 1.6s ease-out infinite}
`
function InjectCSS() {
  useEffect(() => {
    const id = 'fri-gtour-css'
    if (document.getElementById(id)) return
    const s = document.createElement('style')
    s.id = id; s.textContent = TOUR_CSS
    document.head.appendChild(s)
    return () => document.getElementById(id)?.remove()
  }, [])
  return null
}

/* ══════════════════════════════════════════════════════════════════════════════
   PREVIEW COMPONENTS — each is mounted fresh per step via key={step}
══════════════════════════════════════════════════════════════════════════════ */

/* ── P1: Command Center ─────────────────────────────────────────────────── */
function P1_CommandCenter() {
  const active = useCycle(4, 1050)
  const CARDS = [
    { label:'Health Score', val:'88', unit:'', note:'Grade B+', col:'#d97706' },
    { label:'Avg Rating', val:'4.4', unit:'★', note:'↑ +0.12 vs last qtr', col:'#d97706' },
    { label:'Positive Sentiment', val:'84', unit:'%', note:'Customer feeling', col:'#22c55e' },
    { label:'Reviews / Month', val:'87', unit:'', note:'1,284 total reviews', col:'#60a5fa' },
  ]
  return (
    <div style={{display:'flex',flexDirection:'column',gap:8,height:'100%'}}>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:7}}>
        {CARDS.map((c,i) => (
          <motion.div key={i}
            animate={{
              borderColor: active===i ? 'rgba(154,107,0,0.65)' : 'rgba(255,255,255,0.07)',
              boxShadow: active===i ? '0 0 0 1px rgba(154,107,0,0.2), 0 0 20px rgba(154,107,0,0.14)' : '0 0 0 0 transparent',
              background: active===i ? 'rgba(154,107,0,0.08)' : 'rgba(255,255,255,0.03)',
            }}
            transition={{duration:0.4}}
            style={{border:'1px solid rgba(255,255,255,0.07)',borderRadius:10,padding:'12px 13px'}}
          >
            <div style={{fontSize:9,fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:'rgba(255,255,255,0.3)',marginBottom:7}}>{c.label}</div>
            <motion.div
              animate={{color: active===i ? c.col : 'rgba(255,255,255,0.78)'}}
              transition={{duration:0.4}}
              style={{fontSize:24,fontWeight:800,lineHeight:1,fontVariantNumeric:'tabular-nums'}}
            >{c.val}{c.unit}</motion.div>
            <div style={{fontSize:9,color:'rgba(255,255,255,0.28)',marginTop:4}}>{c.note}</div>
          </motion.div>
        ))}
      </div>
      <div style={{flex:1,background:'linear-gradient(135deg,rgba(26,20,16,0.95),rgba(37,26,15,0.9))',border:'1px solid rgba(154,107,0,0.22)',borderRadius:10,padding:'12px 13px',display:'flex',flexDirection:'column',justifyContent:'center'}}>
        <div style={{fontSize:9,fontWeight:700,letterSpacing:'0.16em',textTransform:'uppercase',color:'#FCD34D',marginBottom:7}}>✦ AI Executive Intelligence</div>
        <div style={{fontSize:11,color:'rgba(255,255,255,0.5)',lineHeight:1.7}}>
          Portfolio avg <strong style={{color:'#FCD34D'}}>4.4★</strong> — up 12% vs last quarter. <strong style={{color:'#86efac'}}>Downtown Dental</strong> leads at 4.8★. <strong style={{color:'#f87171'}}>Elite Fitness</strong> needs immediate attention.
        </div>
      </div>
    </div>
  )
}

/* ── P2: Reviews Explorer ───────────────────────────────────────────────── */
function P2_Reviews() {
  const phase = usePhase([500, 1300, 2100, 3200])
  const ROWS = [
    {name:'Marcus T.', stars:5, text:'Best birria tacos ever had.', badge:'Positive', bc:'#22c55e', bg:'rgba(34,197,94,0.1)'},
    {name:'Maria S.',  stars:2, text:'Waited over an hour Thursday.', badge:'Negative', bc:'#f87171', bg:'rgba(248,113,113,0.1)'},
    {name:'Isabella M.',stars:5, text:'Never disappoints. 3 years.', badge:'Positive', bc:'#22c55e', bg:'rgba(34,197,94,0.1)'},
  ]
  return (
    <div style={{display:'flex',flexDirection:'column',gap:8,height:'100%'}}>
      <div style={{background:'rgba(255,255,255,0.025)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:10,overflow:'hidden',position:'relative'}}>
        {phase === 1 && (
          <div style={{position:'absolute',inset:0,overflow:'hidden',pointerEvents:'none',zIndex:2}}>
            <div className="fri-sweep" style={{position:'absolute',top:0,bottom:0,width:'28%',background:'linear-gradient(90deg,transparent,rgba(154,107,0,0.06),rgba(154,107,0,0.13),rgba(154,107,0,0.06),transparent)'}}/>
          </div>
        )}
        <div style={{display:'grid',gridTemplateColumns:'80px 48px 1fr 66px',borderBottom:'1px solid rgba(255,255,255,0.06)',padding:'7px 12px',gap:8}}>
          {['Reviewer','Stars','Review','Sentiment'].map(h=>(
            <div key={h} style={{fontSize:9,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em',color:'rgba(255,255,255,0.28)'}}>{h}</div>
          ))}
        </div>
        {ROWS.map((row,i) => (
          <motion.div key={i}
            animate={{
              background: phase>=2 && i===1 ? 'rgba(248,113,113,0.07)' : 'transparent',
            }}
            transition={{duration:0.35}}
            style={{display:'grid',gridTemplateColumns:'80px 48px 1fr 66px',gap:8,padding:'9px 12px',borderBottom:i<2?'1px solid rgba(255,255,255,0.04)':'none',borderLeft:phase>=2&&i===1?'2px solid rgba(248,113,113,0.5)':'2px solid transparent',transition:'border-left-color 0.3s'}}
          >
            <div style={{fontSize:10.5,fontWeight:600,color:'rgba(255,255,255,0.7)',whiteSpace:'nowrap'}}>{row.name}</div>
            <div style={{fontSize:10,color:'#d97706'}}>{'★'.repeat(row.stars)}</div>
            <div style={{fontSize:10,color:'rgba(255,255,255,0.38)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{row.text}</div>
            <AnimatePresence>
              {(i !== 1 || phase >= 3) && (
                <motion.div
                  initial={i===1 ? {scale:0.8,opacity:0} : false}
                  animate={{scale:1,opacity:1}}
                  style={{display:'inline-flex',alignItems:'center',justifyContent:'center',fontSize:9,fontWeight:700,color:row.bc,background:row.bg,border:`1px solid ${row.bc}33`,borderRadius:99,padding:'2px 7px',height:'fit-content'}}
                >{row.badge}</motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {phase >= 4 && (
          <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} style={{background:'rgba(154,107,0,0.07)',border:'1px solid rgba(154,107,0,0.22)',borderRadius:10,padding:'11px 13px',flex:1,display:'flex',flexDirection:'column',justifyContent:'center'}}>
            <div style={{fontSize:9,fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:'#FCD34D',marginBottom:6}}>✦ AI Suggested Response</div>
            <div style={{fontSize:11,color:'rgba(255,255,255,0.5)',lineHeight:1.65}}>"Maria, we sincerely apologize for the long wait. We're adding Thursday evening staff. Please reach out directly — we'd love to make this right for you."</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── P3: Trends / Analytics ─────────────────────────────────────────────── */
function P3_Trends() {
  const [drawn, setDrawn] = useState(false)
  const phase = usePhase([350, 1100, 1900])
  useEffect(() => { const id = setTimeout(() => setDrawn(true), 250); return () => clearTimeout(id) }, [])

  const W=280, H=72
  const vals = [4.2,4.3,4.1,4.3,4.4,4.5,4.3,4.4,4.6,4.4,4.5,4.4]
  const min=3.8, max=5.0
  const pts = vals.map((v,i)=>[i/(vals.length-1)*W, H-((v-min)/(max-min))*H])
  const linePath = 'M'+pts.map(([x,y])=>`${x.toFixed(1)},${y.toFixed(1)}`).join(' L')
  const areaPath = linePath+` L ${W},${H} L 0,${H} Z`
  const METS = [
    {label:'Avg Rating',val:'4.4',delta:'+0.12'},
    {label:'Total Reviews',val:'1,284',delta:'+23%'},
    {label:'Response Rate',val:'78%',delta:'+5pp'},
  ]
  return (
    <div style={{display:'flex',flexDirection:'column',gap:8,height:'100%'}}>
      <div style={{background:'rgba(255,255,255,0.025)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:10,padding:'13px 14px 9px'}}>
        <div style={{fontSize:10,fontWeight:700,color:'rgba(255,255,255,0.55)',marginBottom:10}}>Rating Trend — 12 Months</div>
        <svg viewBox={`0 0 ${W} ${H}`} style={{width:'100%',height:68,overflow:'visible'}}>
          <defs>
            <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9A6B00" stopOpacity="0.28"/>
              <stop offset="100%" stopColor="#9A6B00" stopOpacity="0"/>
            </linearGradient>
            <clipPath id="c1">
              <motion.rect x="0" y="-4" height={H+8} initial={{width:0}} animate={{width: drawn ? W : 0}} transition={{duration:1.5,ease:[0.4,0,0.2,1]}}/>
            </clipPath>
          </defs>
          {[0.25,0.5,0.75].map(t=>(
            <line key={t} x1="0" y1={t*H} x2={W} y2={t*H} stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
          ))}
          <path d={areaPath} fill="url(#g1)" clipPath="url(#c1)"/>
          <path d={linePath} fill="none" stroke="#9A6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" clipPath="url(#c1)"/>
          {drawn && <motion.circle cx={pts[8][0]} cy={pts[8][1]} r="3.5" fill="#9A6B00" initial={{scale:0}} animate={{scale:1}} transition={{delay:1.45,type:'spring'}}/>}
          <AnimatePresence>
            {phase>=3 && (
              <motion.g initial={{opacity:0,y:-4}} animate={{opacity:1,y:0}}>
                <rect x={pts[8][0]-22} y={pts[8][1]-26} width={44} height={17} rx="4" fill="#1c1410" stroke="rgba(154,107,0,0.45)" strokeWidth="1"/>
                <text x={pts[8][0]} y={pts[8][1]-13} textAnchor="middle" fill="#FCD34D" fontSize="9" fontWeight="700">4.6★ Peak</text>
              </motion.g>
            )}
          </AnimatePresence>
        </svg>
        <div style={{display:'flex',justifyContent:'space-between',marginTop:3}}>
          {['Jul','Sep','Nov','Jan','Mar','Jun'].map(m=><div key={m} style={{fontSize:8,color:'rgba(255,255,255,0.22)'}}>{m}</div>)}
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:7}}>
        {METS.map((m,i) => (
          <motion.div key={i}
            initial={{opacity:0,y:6}}
            animate={{opacity:phase>=2?1:0,y:phase>=2?0:6}}
            transition={{delay:i*0.1}}
            style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:9,padding:'10px 11px'}}
          >
            <div style={{fontSize:8,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em',color:'rgba(255,255,255,0.28)',marginBottom:5}}>{m.label}</div>
            <div style={{fontSize:17,fontWeight:800,color:'rgba(255,255,255,0.8)',lineHeight:1}}>{m.val}</div>
            <div style={{fontSize:9,color:'#22c55e',marginTop:3}}>{m.delta}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ── P4: Complaint Intel ────────────────────────────────────────────────── */
function P4_Complaint() {
  const phase = usePhase([300,800,1300,1800,2600])
  const ITEMS = [
    {label:'Wait Times',count:34,pct:71,col:'#f87171'},
    {label:'Parking Issues',count:18,pct:38,col:'#fb923c'},
    {label:'Noise Level',count:11,pct:23,col:'#fbbf24'},
    {label:'Inconsistent Quality',count:9,pct:19,col:'#a3e635'},
  ]
  return (
    <div style={{display:'flex',flexDirection:'column',gap:7,height:'100%'}}>
      {ITEMS.map((c,i) => (
        <motion.div key={i}
          initial={{opacity:0,x:-10}}
          animate={{opacity:phase>=i+1?1:0,x:phase>=i+1?0:-10}}
          transition={{duration:0.3}}
          style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:9,padding:'10px 12px'}}
        >
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:7}}>
            <div style={{fontSize:11,fontWeight:600,color:'rgba(255,255,255,0.7)'}}>{c.label}</div>
            <div style={{fontSize:9,fontWeight:700,color:c.col,background:`${c.col}18`,border:`1px solid ${c.col}30`,borderRadius:99,padding:'2px 7px'}}>{c.count} mentions</div>
          </div>
          <div style={{height:4,background:'rgba(255,255,255,0.06)',borderRadius:99,overflow:'hidden'}}>
            <motion.div
              initial={{width:0}}
              animate={{width:phase>=i+1?`${c.pct}%`:0}}
              transition={{duration:0.65,delay:0.1,ease:'easeOut'}}
              style={{height:'100%',background:c.col,borderRadius:99}}
            />
          </div>
        </motion.div>
      ))}
      <AnimatePresence>
        {phase>=5 && (
          <motion.div initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} style={{background:'rgba(154,107,0,0.07)',border:'1px solid rgba(154,107,0,0.22)',borderRadius:9,padding:'10px 12px',marginTop:'auto'}}>
            <div style={{fontSize:9,fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:'#FCD34D',marginBottom:5}}>✦ AI Recommendation</div>
            <div style={{fontSize:10.5,color:'rgba(255,255,255,0.48)',lineHeight:1.65}}>34 reviews cite wait times. Adding a reservation system could reduce this complaint category by ~60% within 90 days.</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── P5: Competitor Intel ───────────────────────────────────────────────── */
function P5_Competitor() {
  const phase = usePhase([250,900,1600,2500])
  const COMPS = [
    {name:'El Paso Taqueria',rating:4.1,pct:82,reviews:'923',growth:'+3%',col:'#60a5fa'},
    {name:'Cantina Real',rating:4.3,pct:86,reviews:'1,102',growth:'+7%',col:'#a78bfa'},
    {name:'Los Compadres',rating:3.9,pct:78,reviews:'445',growth:'+1%',col:'#6b7280'},
  ]
  return (
    <div style={{display:'flex',flexDirection:'column',gap:8,height:'100%'}}>
      <motion.div
        animate={{
          borderColor:phase>=1?'rgba(154,107,0,0.55)':'rgba(255,255,255,0.07)',
          boxShadow:phase>=1?'0 0 0 1px rgba(154,107,0,0.18),0 4px 18px rgba(154,107,0,0.1)':'none',
        }}
        style={{background:'rgba(154,107,0,0.06)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:10,padding:'12px 14px'}}
      >
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:8}}>
          <div>
            <div style={{fontSize:9,fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:'#9A6B00',marginBottom:3}}>YOU</div>
            <div style={{fontSize:13,fontWeight:700,color:'rgba(255,255,255,0.88)'}}>Casa Tequila Demo</div>
          </div>
          <div style={{textAlign:'right'}}>
            <div style={{fontSize:22,fontWeight:800,color:'#d97706'}}>4.4★</div>
            <div style={{fontSize:9,color:'#22c55e'}}>+12% this quarter</div>
          </div>
        </div>
        <div style={{height:4,background:'rgba(255,255,255,0.06)',borderRadius:99,overflow:'hidden'}}>
          <motion.div initial={{width:0}} animate={{width:phase>=1?'88%':0}} transition={{duration:0.75,ease:'easeOut'}} style={{height:'100%',background:'#9A6B00',borderRadius:99}}/>
        </div>
        <div style={{fontSize:8,color:'rgba(255,255,255,0.25)',marginTop:4}}>1,284 total reviews</div>
      </motion.div>
      {COMPS.map((c,i) => (
        <motion.div key={i}
          initial={{opacity:0,x:10}}
          animate={{opacity:phase>=i+2?1:0,x:phase>=i+2?0:10}}
          transition={{duration:0.3}}
          style={{background:'rgba(255,255,255,0.025)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:9,padding:'10px 13px'}}
        >
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:6}}>
            <div style={{fontSize:11,fontWeight:600,color:'rgba(255,255,255,0.55)'}}>{c.name}</div>
            <div style={{display:'flex',alignItems:'center',gap:8}}>
              <div style={{fontSize:14,fontWeight:800,color:'rgba(255,255,255,0.5)'}}>{c.rating}★</div>
              <div style={{fontSize:9,color:'rgba(255,255,255,0.28)'}}>{c.growth}</div>
            </div>
          </div>
          <div style={{height:3,background:'rgba(255,255,255,0.05)',borderRadius:99,overflow:'hidden'}}>
            <motion.div initial={{width:0}} animate={{width:phase>=i+2?`${c.pct}%`:0}} transition={{duration:0.6,ease:'easeOut'}} style={{height:'100%',background:c.col,borderRadius:99}}/>
          </div>
        </motion.div>
      ))}
      <AnimatePresence>
        {phase>=4 && (
          <motion.div initial={{opacity:0,scale:0.94}} animate={{opacity:1,scale:1}} style={{display:'flex',alignItems:'center',gap:8,background:'rgba(34,197,94,0.07)',border:'1px solid rgba(34,197,94,0.22)',borderRadius:9,padding:'9px 12px',marginTop:'auto'}}>
            <span style={{fontSize:15}}>🏆</span>
            <div style={{fontSize:11,fontWeight:700,color:'#22c55e'}}>Area leader — #1 rating with highest review growth</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── P6: Marketing Intel ────────────────────────────────────────────────── */
function P6_Marketing() {
  const phase = usePhase([400,1100,1800,2500])
  const TAGS = ['birria tacos × 127','outdoor patio × 89','margaritas × 94','friendly staff × 76']
  const RECS = [
    {icon:'📸',label:'Social Campaign',desc:'"Birria Tacos" content series',col:'#FCD34D'},
    {icon:'🗺️',label:'Google Profile Update',desc:'Highlight patio & outdoor seating',col:'#86efac'},
  ]
  return (
    <div style={{display:'flex',flexDirection:'column',gap:8,height:'100%'}}>
      <div style={{background:'rgba(255,255,255,0.025)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:10,padding:'12px 14px'}}>
        <div style={{fontSize:9,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.1em',color:'rgba(255,255,255,0.28)',marginBottom:8}}>Review Analysis — Casa Tequila Demo</div>
        <div style={{fontSize:12,color:'rgba(255,255,255,0.55)',lineHeight:1.7,fontStyle:'italic'}}>
          "Best{' '}
          <motion.mark animate={{background:phase>=1?'rgba(252,211,77,0.18)':'transparent'}} style={{color:phase>=1?'#FCD34D':'inherit',borderRadius:3,padding:'0 2px',background:'transparent',fontStyle:'italic'}}>birria tacos</motion.mark>
          {' '}I've ever had. The{' '}
          <motion.mark animate={{background:phase>=1?'rgba(134,239,172,0.15)':'transparent'}} style={{color:phase>=1?'#86efac':'inherit',borderRadius:3,padding:'0 2px',background:'transparent',fontStyle:'italic'}}>outdoor patio</motion.mark>
          {' '}made the experience{' '}
          <motion.mark animate={{background:phase>=1?'rgba(147,197,253,0.15)':'transparent'}} style={{color:phase>=1?'#93c5fd':'inherit',borderRadius:3,padding:'0 2px',background:'transparent',fontStyle:'italic'}}>perfect.</motion.mark>
          "
        </div>
      </div>
      <AnimatePresence>
        {phase>=2 && (
          <motion.div initial={{opacity:0,y:5}} animate={{opacity:1,y:0}} style={{display:'flex',gap:5,flexWrap:'wrap'}}>
            {TAGS.map((tag,i) => (
              <motion.div key={tag} initial={{opacity:0,scale:0.88}} animate={{opacity:1,scale:1}} transition={{delay:i*0.08}} style={{fontSize:10,fontWeight:600,color:'#FCD34D',background:'rgba(154,107,0,0.12)',border:'1px solid rgba(154,107,0,0.25)',borderRadius:99,padding:'3px 8px'}}>{tag}</motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      {RECS.map((r,i) => (
        <AnimatePresence key={i}>
          {phase>=i+3 && (
            <motion.div initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}} style={{display:'flex',alignItems:'center',gap:10,background:`${r.col}08`,border:`1px solid ${r.col}20`,borderRadius:9,padding:'10px 12px'}}>
              <span style={{fontSize:16,flexShrink:0}}>{r.icon}</span>
              <div style={{flex:1}}>
                <div style={{fontSize:11,fontWeight:700,color:r.col}}>{r.label}</div>
                <div style={{fontSize:10,color:'rgba(255,255,255,0.35)'}}>{r.desc}</div>
              </div>
              <div style={{fontSize:9,fontWeight:700,color:r.col,background:`${r.col}15`,border:`1px solid ${r.col}25`,borderRadius:99,padding:'2px 8px',flexShrink:0}}>Recommended</div>
            </motion.div>
          )}
        </AnimatePresence>
      ))}
    </div>
  )
}

/* ── P7: AI Advisor ─────────────────────────────────────────────────────── */
function P7_AIAdvisor() {
  const phase = usePhase([500,1400,2400])
  const FULL = 'Your top complaint is weekend wait times (34 reviews, 71% of all negatives). Implement OpenTable and promote it on Google — estimated 18% rating improvement within 60 days.'
  const typed = useTypewriter(FULL, phase >= 3)
  return (
    <div style={{display:'flex',flexDirection:'column',gap:8,height:'100%'}}>
      <div style={{background:'rgba(154,107,0,0.07)',border:'1px solid rgba(154,107,0,0.2)',borderRadius:10,padding:'10px 13px',display:'flex',alignItems:'center',gap:10}}>
        <div style={{width:30,height:30,background:'rgba(154,107,0,0.18)',borderRadius:9,display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,flexShrink:0}}>✦</div>
        <div>
          <div style={{fontSize:11,fontWeight:700,color:'#FCD34D'}}>AI Advisor</div>
          <div style={{fontSize:9,color:'rgba(255,255,255,0.3)'}}>Powered by your review data</div>
        </div>
        <div style={{marginLeft:'auto',display:'flex',gap:3,alignItems:'center'}}>
          {[0,1,2].map(i=><div key={i} style={{width:5,height:5,borderRadius:'50%',background:'#22c55e',animation:'pulse-dot 1.2s ease-in-out infinite',animationDelay:`${i*0.2}s`}}/>)}
        </div>
      </div>
      <div style={{flex:1,display:'flex',flexDirection:'column',gap:8}}>
        <AnimatePresence>
          {phase>=1 && (
            <motion.div initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} style={{alignSelf:'flex-end',background:'rgba(255,255,255,0.07)',border:'1px solid rgba(255,255,255,0.09)',borderRadius:'10px 10px 3px 10px',padding:'9px 12px',maxWidth:'80%'}}>
              <div style={{fontSize:12,color:'rgba(255,255,255,0.72)'}}>What's hurting our rating the most?</div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {phase===2 && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} style={{display:'flex',gap:5,padding:'6px 10px',alignItems:'center'}}>
              {[0,1,2].map(i=>(
                <motion.div key={i}
                  animate={{y:[0,-5,0]}}
                  transition={{duration:0.55,repeat:Infinity,delay:i*0.15}}
                  style={{width:6,height:6,borderRadius:'50%',background:'#9A6B00'}}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {phase>=3 && (
            <motion.div initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} style={{background:'linear-gradient(135deg,rgba(26,20,16,0.96),rgba(37,26,15,0.96))',border:'1px solid rgba(154,107,0,0.28)',borderRadius:'10px 10px 10px 3px',padding:'12px 13px',maxWidth:'92%'}}>
              <div style={{fontSize:9,fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:'#FCD34D',marginBottom:6}}>✦ AI Analysis</div>
              <div style={{fontSize:11.5,color:'rgba(255,255,255,0.6)',lineHeight:1.7}}>
                {typed}
                {typed.length < FULL.length && <span className="fri-cursor"/>}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ── P8: Response Center / Actions ─────────────────────────────────────── */
function P8_Actions() {
  const phase = usePhase([400,1200,2100,3200])
  const STATUSES = ['Open','In Progress','Resolved']
  const STATUS_COLORS = ['#f87171','#fbbf24','#22c55e']
  const STATUS_BG = ['rgba(248,113,113,0.1)','rgba(251,191,36,0.1)','rgba(34,197,94,0.1)']
  const si = Math.min(phase, 2)
  return (
    <div style={{display:'flex',flexDirection:'column',gap:8,height:'100%'}}>
      <div style={{background:'rgba(248,113,113,0.06)',border:'1px solid rgba(248,113,113,0.2)',borderRadius:10,padding:'12px 14px'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:7}}>
          <div style={{fontSize:11,fontWeight:700,color:'rgba(255,255,255,0.72)'}}>Recurring Issue Detected</div>
          <div style={{fontSize:9,fontWeight:700,color:'#f87171',background:'rgba(248,113,113,0.14)',border:'1px solid rgba(248,113,113,0.3)',borderRadius:99,padding:'2px 7px',flexShrink:0}}>High Priority</div>
        </div>
        <div style={{fontSize:10.5,color:'rgba(255,255,255,0.42)',lineHeight:1.65}}>Wait times mentioned in 34 reviews this month. Staff capacity may be insufficient for current demand volume.</div>
      </div>
      <AnimatePresence>
        {phase>=1 && (
          <motion.button
            initial={{opacity:0}}
            animate={{opacity:1}}
            className="fri-ring"
            style={{background:'#9A6B00',color:'white',border:'none',borderRadius:9,padding:'10px 16px',fontSize:12,fontWeight:700,cursor:'default',fontFamily:'inherit',width:'100%',letterSpacing:'0.01em'}}
          >+ Create Action Task</motion.button>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {phase>=2 && (
          <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:10,padding:'12px 14px'}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:7}}>
              <div style={{fontSize:12,fontWeight:700,color:'rgba(255,255,255,0.8)'}}>Implement Reservation System</div>
              <motion.div
                animate={{background:STATUS_BG[si],borderColor:`${STATUS_COLORS[si]}40`,color:STATUS_COLORS[si]}}
                transition={{duration:0.35}}
                style={{fontSize:9,fontWeight:700,borderRadius:99,padding:'2px 8px',border:'1px solid',flexShrink:0}}
              >{STATUSES[si]}</motion.div>
            </div>
            <div style={{fontSize:10,color:'rgba(255,255,255,0.32)',lineHeight:1.5,marginBottom:10}}>AI generated · Priority: High · Est. impact: 18% fewer wait complaints</div>
            <div style={{height:3,background:'rgba(255,255,255,0.06)',borderRadius:99,overflow:'hidden'}}>
              <motion.div
                animate={{width: si===0?'5%' : si===1?'45%' : '100%'}}
                transition={{duration:0.55,ease:'easeOut'}}
                style={{height:'100%',background:STATUS_COLORS[si],borderRadius:99}}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {phase>=4 && (
          <motion.div initial={{opacity:0,scale:0.94}} animate={{opacity:1,scale:1}} style={{display:'flex',alignItems:'center',gap:8,background:'rgba(34,197,94,0.06)',border:'1px solid rgba(34,197,94,0.2)',borderRadius:9,padding:'9px 12px',marginTop:'auto'}}>
            <span style={{fontSize:15}}>✓</span>
            <div style={{fontSize:11,color:'rgba(255,255,255,0.5)',lineHeight:1.5}}>Task created — AI will track review sentiment changes after implementation</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   STEP DEFINITIONS
══════════════════════════════════════════════════════════════════════════ */
const STEPS = [
  {
    route:'/overview',
    eyebrow:'Step 1 — Command Center',
    title:'Your entire portfolio, one view.',
    subtitle:'Real-time health score, AI executive summary, and priority queue — all without opening a single spreadsheet.',
    features:['Portfolio health score & grade','AI executive intelligence, updated daily','Priority response queue for urgent reviews'],
    Preview: P1_CommandCenter,
  },
  {
    route:'/explorer',
    eyebrow:'Step 2 — Reviews',
    title:'Every review, instantly searchable.',
    subtitle:'Filter by star rating, business, or keyword. AI reads each review and generates a response in seconds.',
    features:['Full-text search across all reviews','Auto-sentiment analysis on every review','AI-drafted responses with one click'],
    Preview: P2_Reviews,
  },
  {
    route:'/trends',
    eyebrow:'Step 3 — Analytics',
    title:'See the patterns others miss.',
    subtitle:'12-month rating trends, review velocity, and response benchmarks — visualized and ready to share.',
    features:['Interactive rating trend charts','Review volume growth tracking','Response rate benchmarking over time'],
    Preview: P3_Trends,
  },
  {
    route:'/intelligence',
    eyebrow:'Step 4 — Complaint Intelligence',
    title:'Know exactly what\'s frustrating customers.',
    subtitle:'AI clusters every complaint by category, ranked by frequency. No more reading through hundreds of 1-star reviews.',
    features:['Auto-categorized complaint clusters','Frequency and severity scoring','Specific operational fix recommendations'],
    Preview: P4_Complaint,
  },
  {
    route:'/competitive',
    eyebrow:'Step 5 — Competitor Intelligence',
    title:'Know where you stand.',
    subtitle:'Compare your rating, review velocity, and growth trajectory against nearby competitors by category.',
    features:['Side-by-side competitor comparison','Rating gap and growth analysis','Positioning opportunity identification'],
    Preview: P5_Competitor,
  },
  {
    route:'/marketing',
    eyebrow:'Step 6 — Marketing Intelligence',
    title:'Turn reviews into campaigns.',
    subtitle:'AI extracts your most-praised attributes and builds campaign briefs, content direction, and posting strategy automatically.',
    features:['Top-praised attribute extraction','Campaign brief generation','Social content direction by theme'],
    Preview: P6_Marketing,
  },
  {
    route:'/advisor',
    eyebrow:'Step 7 — AI Advisor',
    title:'Ask anything about your business.',
    subtitle:'Ask the AI a plain-English question about your reputation. Get specific, data-driven answers — not generic advice.',
    features:['Natural language business queries','Data-backed, specific recommendations','ROI estimates tied to real review patterns'],
    Preview: P7_AIAdvisor,
  },
  {
    route:'/actions',
    eyebrow:'Step 8 — Response Center',
    title:'Close the loop on every issue.',
    subtitle:'Convert complaints into tracked action tasks. Watch sentiment improve as issues get resolved.',
    features:['One-click action task creation','AI-prioritized issue triage','Progress tracking from Open to Resolved'],
    Preview: P8_Actions,
  },
]

/* ══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════════════════ */
export default function GuidedTour({ active, onComplete }) {
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (active) setStep(0); setDone(false)
  }, [active])

  useEffect(() => {
    if (active && STEPS[step]) navigate(STEPS[step].route)
  }, [step, active])

  if (!active) return null

  const current = STEPS[step]
  const Preview = current.Preview
  const isLast = step === STEPS.length - 1

  /* ── Tour complete ── */
  if (done) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
          style={{position:'fixed',inset:0,zIndex:10000,background:'rgba(8,6,4,0.8)',backdropFilter:'blur(10px)',display:'flex',alignItems:'center',justifyContent:'center',padding:16}}
        >
          <motion.div
            initial={{scale:0.94,opacity:0,y:16}} animate={{scale:1,opacity:1,y:0}}
            transition={{type:'spring',stiffness:280,damping:24}}
            style={{background:'#0f0c09',border:'1px solid rgba(154,107,0,0.3)',borderRadius:20,boxShadow:'0 32px 64px rgba(0,0,0,0.7),0 0 0 1px rgba(154,107,0,0.08)',width:'100%',maxWidth:460,padding:'40px 36px',textAlign:'center'}}
          >
            <motion.div
              animate={{boxShadow:['0 0 0 0 rgba(154,107,0,0.4)','0 0 0 16px rgba(154,107,0,0)','0 0 0 0 rgba(154,107,0,0)']}}
              transition={{duration:2,repeat:Infinity}}
              style={{width:56,height:56,background:'rgba(154,107,0,0.15)',border:'1px solid rgba(154,107,0,0.35)',borderRadius:16,display:'flex',alignItems:'center',justifyContent:'center',fontSize:24,margin:'0 auto 20px'}}
            >✦</motion.div>
            <div style={{fontSize:10,fontWeight:700,letterSpacing:'0.18em',textTransform:'uppercase',color:'#9A6B00',marginBottom:8}}>Future Marketing Studio</div>
            <h2 style={{fontSize:24,fontWeight:800,color:'#ffffff',letterSpacing:'-0.02em',lineHeight:1.15,marginBottom:14}}>Ready to see your own data?</h2>
            <p style={{fontSize:13,color:'rgba(255,255,255,0.5)',lineHeight:1.7,marginBottom:28}}>You've just seen what Future Review Intelligence does for 8 demo businesses. Connect your Google Business Profile and get your own dashboard — live, in minutes.</p>
            <div style={{display:'flex',gap:10}}>
              <a
                href="https://futuremark.studio/contact.html"
                target="_blank" rel="noopener noreferrer"
                style={{flex:1,padding:'12px 16px',background:'#9A6B00',color:'white',textDecoration:'none',borderRadius:10,fontWeight:700,fontSize:13,display:'inline-flex',alignItems:'center',justifyContent:'center',transition:'background 0.15s'}}
                onMouseEnter={e=>e.currentTarget.style.background='#7d5500'}
                onMouseLeave={e=>e.currentTarget.style.background='#9A6B00'}
              >Book a Strategy Call →</a>
              <button
                onClick={onComplete}
                style={{flex:1,padding:'12px 16px',background:'transparent',color:'rgba(255,255,255,0.4)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:10,fontWeight:600,fontSize:13,cursor:'pointer',fontFamily:'inherit'}}
                onMouseEnter={e=>e.currentTarget.style.color='rgba(255,255,255,0.7)'}
                onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.4)'}
              >Continue Exploring</button>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    )
  }

  /* ── Active tour step ── */
  return (
    <>
      <InjectCSS/>
      <AnimatePresence>
        <motion.div
          initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
          style={{position:'fixed',inset:0,zIndex:10000,background:'rgba(8,6,4,0.72)',backdropFilter:'blur(8px)',display:'flex',alignItems:'center',justifyContent:'center',padding:16}}
          onClick={e=>e.stopPropagation()}
        >
          <motion.div
            initial={{opacity:0,scale:0.97,y:12}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:0.97}}
            transition={{type:'spring',stiffness:320,damping:28}}
            style={{background:'#0f0c09',border:'1px solid rgba(154,107,0,0.18)',borderRadius:18,boxShadow:'0 32px 64px rgba(0,0,0,0.75),0 0 0 1px rgba(154,107,0,0.07)',width:'100%',maxWidth:880,overflow:'hidden',display:'flex',flexDirection:'column'}}
          >
            {/* ── Top bar ── */}
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'14px 20px 14px',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
              <div style={{display:'flex',alignItems:'center',gap:10}}>
                <div style={{fontSize:9,fontWeight:700,letterSpacing:'0.16em',textTransform:'uppercase',color:'rgba(154,107,0,0.75)'}}>Future Review Intelligence</div>
                <div style={{width:1,height:10,background:'rgba(255,255,255,0.1)'}}/>
                <div style={{fontSize:9,color:'rgba(255,255,255,0.3)',fontWeight:500}}>Product Tour</div>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:10}}>
                {/* Progress dots */}
                <div style={{display:'flex',gap:5,alignItems:'center'}}>
                  {STEPS.map((_,i)=>(
                    <motion.div
                      key={i}
                      animate={{
                        background: i===step ? '#9A6B00' : i<step ? 'rgba(154,107,0,0.4)' : 'rgba(255,255,255,0.12)',
                        width: i===step ? 18 : 6,
                      }}
                      transition={{duration:0.3}}
                      style={{height:6,borderRadius:99,cursor:'pointer'}}
                      onClick={()=>setStep(i)}
                    />
                  ))}
                </div>
                <button
                  onClick={onComplete}
                  style={{background:'none',border:'none',cursor:'pointer',fontSize:12,color:'rgba(255,255,255,0.3)',fontFamily:'inherit',fontWeight:500,padding:'4px 8px',borderRadius:6,transition:'color 0.15s'}}
                  onMouseEnter={e=>e.currentTarget.style.color='rgba(255,255,255,0.6)'}
                  onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.3)'}
                >Skip tour</button>
              </div>
            </div>

            {/* ── Body ── */}
            <div style={{display:'flex',minHeight:0}}>
              {/* Left panel */}
              <div style={{width:300,flexShrink:0,padding:'24px 24px 20px',borderRight:'1px solid rgba(255,255,255,0.05)',display:'flex',flexDirection:'column'}}>
                <AnimatePresence mode="wait">
                  <motion.div key={step} initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-10}} transition={{duration:0.22}} style={{flex:1,display:'flex',flexDirection:'column'}}>
                    <div style={{fontSize:9,fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:'#9A6B00',marginBottom:10}}>{current.eyebrow}</div>
                    <h2 style={{fontSize:18,fontWeight:800,color:'#ffffff',letterSpacing:'-0.02em',lineHeight:1.2,marginBottom:10}}>{current.title}</h2>
                    <p style={{fontSize:12,color:'rgba(255,255,255,0.42)',lineHeight:1.7,marginBottom:20}}>{current.subtitle}</p>
                    {/* Feature list */}
                    <div style={{display:'flex',flexDirection:'column',gap:8,flex:1}}>
                      {current.features.map((f,i)=>(
                        <motion.div key={f} initial={{opacity:0,x:-6}} animate={{opacity:1,x:0}} transition={{delay:i*0.08+0.15}} style={{display:'flex',alignItems:'flex-start',gap:8}}>
                          <div style={{width:16,height:16,background:'rgba(154,107,0,0.15)',border:'1px solid rgba(154,107,0,0.3)',borderRadius:5,display:'flex',alignItems:'center',justifyContent:'center',fontSize:9,color:'#9A6B00',flexShrink:0,marginTop:1}}>✓</div>
                          <div style={{fontSize:11.5,color:'rgba(255,255,255,0.5)',lineHeight:1.5}}>{f}</div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
                {/* Nav buttons */}
                <div style={{display:'flex',gap:8,marginTop:20}}>
                  {step>0 && (
                    <button
                      onClick={()=>setStep(s=>s-1)}
                      style={{flex:1,padding:'9px 14px',background:'transparent',color:'rgba(255,255,255,0.35)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:9,fontWeight:600,fontSize:12,cursor:'pointer',fontFamily:'inherit',transition:'color 0.15s,border-color 0.15s'}}
                      onMouseEnter={e=>{e.currentTarget.style.color='rgba(255,255,255,0.6)';e.currentTarget.style.borderColor='rgba(255,255,255,0.2)'}}
                      onMouseLeave={e=>{e.currentTarget.style.color='rgba(255,255,255,0.35)';e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'}}
                    >← Back</button>
                  )}
                  <button
                    onClick={()=>isLast?setDone(true):setStep(s=>s+1)}
                    style={{flex:1,padding:'9px 14px',background:'#9A6B00',color:'white',border:'none',borderRadius:9,fontWeight:700,fontSize:12,cursor:'pointer',fontFamily:'inherit',transition:'background 0.15s'}}
                    onMouseEnter={e=>e.currentTarget.style.background='#7d5500'}
                    onMouseLeave={e=>e.currentTarget.style.background='#9A6B00'}
                  >{isLast ? 'Finish Tour ✦' : 'Next →'}</button>
                </div>
                {/* Step counter */}
                <div style={{textAlign:'center',marginTop:12,fontSize:10,color:'rgba(255,255,255,0.2)'}}>
                  {step+1} of {STEPS.length}
                </div>
              </div>

              {/* Right panel — animated preview */}
              <div style={{flex:1,padding:'20px',background:'rgba(255,255,255,0.012)',minWidth:0,overflow:'hidden'}}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}}
                    transition={{duration:0.25,ease:[0.4,0,0.2,1]}}
                    style={{height:'100%',minHeight:340}}
                  >
                    <Preview/>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  )
}
