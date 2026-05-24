"use client";
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Define color palette (Blue & Gold)
const COLORS = {
  deepest: '#062130',
  darkest: '#0a3147',
  dark: '#154462',
  medium: '#2c5f88',
  light: '#4a86b1',
  gold: '#c9a84c',
  petalBlue: 'rgba(74,134,177,0.2)',
  petalPink: 'rgba(212,132,154,0.35)',
  petalGold: 'rgba(201,168,76,0.2)',
  petalDarkPink: 'rgba(176,80,112,0.25)',
  detailsBg: 'rgba(10,49,71,0.35)',
  ring: 'rgba(201,168,76,0.4)',
}

const PATTERN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cg fill='none' stroke='${encodeURIComponent(COLORS.gold)}' stroke-width='0.6' opacity='0.13'%3E%3Cpolygon points='60,10 85,30 85,70 60,90 35,70 35,30'/%3E%3Cpolygon points='60,25 75,35 75,65 60,75 45,65 45,35'/%3E%3Cline x1='60' y1='10' x2='60' y2='0'/%3E%3Cline x1='85' y1='30' x2='120' y2='15'/%3E%3Cline x1='85' y1='70' x2='120' y2='85'/%3E%3Cline x1='60' y1='90' x2='60' y2='120'/%3E%3Cline x1='35' y1='70' x2='0' y2='85'/%3E%3Cline x1='35' y1='30' x2='0' y2='15'/%3E%3C/g%3E%3C/svg%3E")`

// EMBEDDED STYLES WITH MOBILE RESPONSIVENESS & EXPLICIT BUTTON FIXES
const FONTS = `
  @import url('https://fonts.googleapis.com/css2?family=Pinyon+Script&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Montserrat:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: ${COLORS.darkest}; overflow-x: hidden; }

  /* Grid Layouts for Buttons */
  .map-btn-grid, .action-btn-grid {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-top: 16px;
  }

  /* Base Button Styling - Forces exact identical dimensions and visible styling */
  .map-btn, .action-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    max-width: 260px; /* Limits size on desktop */
    height: 46px;     /* Forces matching uniform height */
    padding: 0 16px;
    border: 1px solid ${COLORS.gold}88; /* Transparent gold border */
    background-color: ${COLORS.darkest}88; /* Semi-transparent dark background */
    color: #e8c97a;
    font-family: 'Montserrat', sans-serif;
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 2px;
    text-transform: uppercase;
    text-decoration: none;
    border-radius: 4px;
    transition: all 0.3s ease;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }

  /* Interactive States */
  .map-btn:hover, .action-btn:hover {
    background-color: ${COLORS.gold}22 !important;
    border-color: ${COLORS.gold} !important;
    color: #fff !important;
    box-shadow: 0 6px 20px rgba(201, 168, 76, 0.2);
  }

  /* Responsiveness: Switch grids to horizontal rows on tablets and desktops */
  @media (min-width: 480px) {
    .map-btn-grid, .action-btn-grid {
      flex-direction: row;
      gap: 16px;
    }
    .map-btn, .action-btn {
      flex: 1;
      max-width: 180px; /* Uniform width when aligned side-by-side */
    }
  }

  @keyframes floatUp {
    0% { transform: translateY(105vh) scale(0.8); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateY(-10vh) scale(1.2); opacity: 0; }
  }
  @keyframes petalFall {
    0% { transform: translateY(-10vh) rotate(0deg); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 0.8; }
    100% { transform: translateY(105vh) rotate(360deg); opacity: 0; }
  }
`

const Arch = ({ op = 0.2 }: { op?: number }) => (
  <svg viewBox="0 0 300 70" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', opacity: op }}>
    <path d="M10 70 L10 35 Q10 4 150 4 Q290 4 290 35 L290 70" fill="none" stroke={COLORS.gold} strokeWidth="1.2" />
    <path d="M26 70 L26 38 Q26 18 150 18 Q274 18 274 38 L274 70" fill="none" stroke={COLORS.gold} strokeWidth="0.7" />
    <line x1="10" y1="70" x2="290" y2="70" stroke={COLORS.gold} strokeWidth="1.2" />
    <circle cx="150" cy="4" r="3.5" fill={COLORS.gold} />
    {[40,70,100,130,150,170,200,230,260].map((x, i) => (
      <circle key={i} cx={x} cy={70} r="1.8" fill={COLORS.gold} />
    ))}
  </svg>
)

const Corner = ({ flip = false, flipY = false }: { flip?: boolean; flipY?: boolean }) => (
  <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"
    style={{ width: '100%', height: '100%', transform: `${flip ? 'scaleX(-1)' : ''} ${flipY ? 'scaleY(-1)' : ''}`.trim() }}>
    <g fill="none">
      <path d="M5 115 Q5 5 115 5" stroke={COLORS.gold} strokeWidth="0.7" opacity="0.28" />
      <path d="M18 18 Q28 8 38 18 Q28 28 18 18Z" fill={COLORS.gold} opacity="0.65" />
      <path d="M8 28 Q18 18 28 28 Q18 38 8 28Z"   fill={COLORS.gold} opacity="0.42" />
      <path d="M28 8  Q38 18 28 28 Q18 18 28 8Z"  fill={COLORS.gold} opacity="0.42" />
      <path d="M38 18 Q46 12 54 18 Q46 28 36 24 Q42 22 38 18Z" fill={COLORS.gold} opacity="0.38" />
      <polygon points="18,18 20,14 22,18 26,18 23,21 24,25 18,23 12,25 13,21 10,18 14,18 16,14" fill={COLORS.gold} opacity="0.28" />
      <path d="M38 18 Q50 30 44 60" stroke={COLORS.gold} strokeWidth="0.9" opacity="0.38" fill="none" />
      <path d="M18 38 Q30 50 60 44" stroke={COLORS.gold} strokeWidth="0.9" opacity="0.33" fill="none" />
      <path d="M14 54 Q20 48 26 54 Q20 60 14 54Z" fill={COLORS.gold} opacity="0.38" />
      <path d="M8 60 Q14 54 20 60 Q14 66 8 60Z"    fill={COLORS.gold} opacity="0.28" />
      <ellipse cx="30" cy="34" rx="7" ry="2.8" fill={COLORS.light} opacity="0.38" transform="rotate(-48,30,34)" />
      <ellipse cx="36" cy="26" rx="6" ry="2.5" fill={COLORS.light} opacity="0.3"  transform="rotate(-70,36,26)" />
      <circle cx="34" cy="14" r="1.8" fill="#e8c97a" opacity="0.6" />
      <circle cx="14" cy="34" r="1.8" fill="#e8c97a" opacity="0.55" />
      <circle cx="12" cy="54" r="1.3" fill="#e8c97a" opacity="0.45" />
    </g>
  </svg>
)

const Petals = () => (
  <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 1 }}>
    {Array.from({ length: 18 }).map((_, i) => {
      const colors = [COLORS.petalPink, COLORS.petalGold, COLORS.petalBlue, COLORS.petalDarkPink]
      const s = 5 + i % 7
      return (
        <div key={i} style={{
          position: 'absolute', borderRadius: '50% 0 50% 0',
          width: s, height: s,
          background: colors[i % colors.length],
          left: `${(i * 5.7) % 100}%`,
          animation: `petalFall ${10 + i % 8}s ${i * 0.55}s linear infinite`,
          opacity: 0,
        }} />
      )
    })}
  </div>
)

const GoldLine = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 14, justifyContent: 'center', margin: '28px auto', width: '100%' }}>
    <div style={{ flex: 1, maxWidth: 100, height: 1, background: `linear-gradient(to right, transparent, ${COLORS.gold})` }} />
    <span style={{ color: COLORS.gold, fontSize: 13, opacity: 0.8 }}>✦</span>
    <div style={{ flex: 1, maxWidth: 100, height: 1, background: `linear-gradient(to left, transparent, ${COLORS.gold})` }} />
  </div>
)

const InfoRow = ({ label, value, sub }: { label: string; value: string; sub?: string }) => (
  <div style={{ textAlign: 'center' }}>
    <div style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 8, letterSpacing: 4, textTransform: 'uppercase', color: `rgba(201,168,76,0.5)`, marginBottom: 6 }}>{label}</div>
    <div style={{ fontFamily: '"Cormorant Garamond",serif', fontStyle: 'italic', fontSize: 'clamp(16px,3vw,21px)', color: '#e8c97a', letterSpacing: 1, lineHeight: 1.5 }}>{value}</div>
    {sub && <div style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 10, letterSpacing: 2, color: 'rgba(232,201,122,0.55)', marginTop: 4 }}>{sub}</div>}
  </div>
)

const ScriptName = ({ name, size = 'large' }: { name: string; size?: 'large' | 'medium' }) => {
  const fs = size === 'large'
    ? 'clamp(62px,14vw,112px)'
    : 'clamp(30px,6vw,46px)'
  return (
    <div style={{
      fontFamily: '"Pinyon Script", cursive',
      fontSize: fs,
      lineHeight: 1.1,
      background: `linear-gradient(90deg, ${COLORS.gold} 0%, #f5dfa0 40%, ${COLORS.gold} 70%, #e8c97a 100%)`,
      backgroundSize: '200% auto',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    }}>
      {name}
    </div>
  )
}

const EnvelopeScreen = ({ onOpen }: { onOpen: () => void }) => {
  const [opening, setOpening] = useState(false)
  const go = () => { if (opening) return; setOpening(true); setTimeout(onOpen, 1300) }

  return (
    <motion.div key="env"
      initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.7 } }}
      onClick={go}
      style={{ position: 'fixed', inset: 0, cursor: 'pointer', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: `radial-gradient(ellipse at center,${COLORS.dark} 0%,${COLORS.darkest} 60%,${COLORS.deepest} 100%)` }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: PATTERN, backgroundSize: '120px 120px' }} />
      <Petals />

      <motion.div initial={{ scale: 0.75, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.9, ease: 'easeOut' }}
        style={{ position: 'relative', width: 'clamp(240px,72vw,340px)', zIndex: 2 }}>
        <svg viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', filter: `drop-shadow(0 18px 50px rgba(6,33,48,0.8))` }}>
          <defs>
            <linearGradient id="eB" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={COLORS.medium}/><stop offset="100%" stopColor={COLORS.dark}/></linearGradient>
            <linearGradient id="eF" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={COLORS.light}/><stop offset="100%" stopColor={COLORS.medium}/></linearGradient>
          </defs>
          <rect x="0" y="30" width="320" height="190" rx="5" fill="url(#eB)" />
          <line x1="24" y1="58" x2="296" y2="58" stroke={COLORS.gold} strokeWidth="0.6" opacity="0.4" />
          <polygon points="0,30 160,130 0,220"     fill={COLORS.dark} opacity="0.6" />
          <polygon points="320,30 160,130 320,220" fill={COLORS.darkest} opacity="0.55" />
          <polygon points="0,220 320,220 160,130"  fill={COLORS.medium} opacity="0.7" />
          <text x="160" y="188" fontFamily="Georgia,serif" fontSize="15" fill={COLORS.gold} textAnchor="middle" opacity="0.65">A ♥ S</text>
          
          <motion.polygon points="0,30 320,30 160,130" fill="url(#eF)"
            style={{ transformOrigin: '160px 30px' }}
            animate={opening ? { scaleY: -1 } : { scaleY: 1 }}
            transition={{ duration: 0.85, ease: [0.4, 0, 0.2, 1] }} />
          <line x1="0" y1="30" x2="320" y2="30" stroke={COLORS.gold} strokeWidth="0.7" opacity="0.5" />
        </svg>

        <motion.div
          animate={opening ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
          transition={{ duration: 0.25 }}
          whileHover={{ scale: 1.1 }}
          style={{ position: 'absolute', bottom: -14, left: '50%', transform: 'translateX(-50%)', width: 46, height: 46, borderRadius: '50%', background: 'radial-gradient(circle,#b05070,#6b1f35)', boxShadow: '0 4px 20px rgba(107,31,53,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: '#f5dfa0' }}>
          ♥
        </motion.div>
      </motion.div>

      <motion.p animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 2 }}
        style={{ marginTop: 44, zIndex: 2, fontFamily: 'Montserrat,sans-serif', fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: 'rgba(232,201,122,0.75)' }}>
        {opening ? 'Opening…' : 'Tap to open your invitation'}
      </motion.p>
    </motion.div>
  )
}

const Card = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
    style={{ background: `radial-gradient(ellipse at 50% 0%,${COLORS.dark} 0%,${COLORS.darkest} 55%,${COLORS.deepest} 100%)`, minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>

    <div style={{ position: 'fixed', inset: 0, backgroundImage: PATTERN, backgroundSize: '120px 120px', pointerEvents: 'none', zIndex: 0 }} />
    <Petals />

    {[
      { style: { top: 0, left: 0 },    flip: false, flipY: false },
      { style: { top: 0, right: 0 },    flip: true,  flipY: false },
      { style: { bottom: 0, left: 0 },  flip: false, flipY: true  },
      { style: { bottom: 0, right: 0 }, flip: true,  flipY: true  },
    ].map((c, i) => (
      <div key={i} style={{ position: 'fixed', width: 'clamp(50px,10vw,100px)', height: 'clamp(50px,10vw,100px)', opacity: 0.6, zIndex: 2, ...c.style }}>
        <Corner flip={c.flip} flipY={c.flipY} />
      </div>
    ))}

    <div style={{ position: 'relative', zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: 'clamp(40px,8vw,80px) clamp(16px,4vw,40px)' }}>

      <div style={{ width: '100%', maxWidth: 400, marginBottom: 8 }}>
        <Arch op={0.3} />
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.9 }}
        style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: 'clamp(18px,4vw,28px)', color: '#e8c97a', opacity: 0.9, letterSpacing: 3, marginBottom: 20 }}>
        بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
        style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 'clamp(8px,1.6vw,10px)', letterSpacing: 6, color: 'rgba(232,201,122,0.65)', textTransform: 'uppercase', marginBottom: 6 }}>
        Together with their families
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.65, duration: 1 }}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'clamp(12px, 3vw, 28px)', width: '100%', maxWidth: '600px', margin: '14px auto' }}>
        <ScriptName name="Adil" size="large" />
        <div style={{ fontFamily: '"Pinyon Script",cursive', fontSize: 'clamp(28px, 5vw, 52px)', color: '#d4849a', lineHeight: 1, paddingTop: '10px' }}>&</div>
        <ScriptName name="Sana" size="large" />
      </motion.div>

      {/* Static Public Folder Path Architecture Setup */}
      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.8, duration: 1.2 }}
        style={{
          position: 'relative',
          width: 'clamp(180px, 45vw, 260px)',
          height: 'clamp(250px, 62vw, 360px)',
          margin: '24px auto 12px',
          padding: '5px',
          border: `1px solid rgba(201,168,76,0.35)`,
          borderRadius: '200px 200px 4px 4px',
          background: 'rgba(6,33,48,0.2)',
          boxShadow: '0 20px 45px rgba(0,0,0,0.35)',
          backdropFilter: 'blur(4px)',
        }}
      >
        <div style={{ width: '100%', height: '100%', borderRadius: '194px 194px 2px 2px', overflow: 'hidden', position: 'relative' }}>
          <img 
            src="/wedding-photo.jpg" 
            alt="Sana & Adil" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%', opacity: 0.92 }}
          />
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, transparent 60%, ${COLORS.darkest} 100%)`, opacity: 0.4, pointerEvents: 'none' }} />
        </div>
      </motion.div>

      <GoldLine />

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.9 }}
        style={{ width: '100%', maxWidth: 440 }}>
        <div style={{ border: '1px solid rgba(201,168,76,0.28)', padding: 'clamp(20px,4vw,36px) clamp(14px,3vw,30px)', position: 'relative', background: COLORS.detailsBg, backdropFilter: 'blur(6px)' }}>

          {[
            { top: 0,    left: 0,  borderWidth: '1px 0 0 1px' },
            { top: 0,    right: 0, borderWidth: '1px 1px 0 0' },
            { bottom: 0, left: 0,  borderWidth: '0 0 1px 1px' },
            { bottom: 0, right: 0, borderWidth: '0 1px 1px 0' },
          ].map((s, i) => (
            <div key={i} style={{ position: 'absolute', width: 14, height: 14, borderColor: 'rgba(201,168,76,0.55)', borderStyle: 'solid', ...s }} />
          ))}

          <div style={{ marginBottom: 4 }}>
            <ScriptName name="Adil" size="medium" />
            <div style={{ fontFamily: '"Cormorant Garamond",serif', fontStyle: 'italic', fontSize: 'clamp(11px,2vw,13px)', color: 'rgba(232,201,122,0.55)', marginTop: 4 }}>
              Son of Mr. Aziz & Mrs. Soudha
            </div>
          </div>

          <div style={{ fontFamily: '"Pinyon Script",cursive', fontSize: 'clamp(18px,3vw,26px)', color: '#d4849a', margin: '4px 0' }}>&</div>

          <div style={{ marginBottom: 20 }}>
            <ScriptName name="Sana" size="medium" />
            <div style={{ fontFamily: '"Cormorant Garamond",serif', fontStyle: 'italic', fontSize: 'clamp(11px,2vw,13px)', color: 'rgba(232,201,122,0.55)', marginTop: 4 }}>
              Daughter of Mr. Musthafa & Mrs. Suhra
            </div>
          </div>

          <div style={{ width: '100%', height: 1, background: 'linear-gradient(to right,transparent,rgba(201,168,76,0.3),transparent)', marginBottom: 20 }} />

          <InfoRow label="Date" value="Saturday, 6th June 2026" />
          <div style={{ width: 30, height: 1, background: 'rgba(201,168,76,0.2)', margin: '14px auto' }} />
          <InfoRow label="Time" value="12:00 PM Onwards" />
          <div style={{ width: 30, height: 1, background: 'rgba(201,168,76,0.2)', margin: '14px auto' }} />
          <InfoRow label="Venue" value="Malabar Avenue" sub="Ramanattukara, Calicut, Kerala" />

          <div style={{ width: '100%', height: 1, background: 'linear-gradient(to right,transparent,rgba(201,168,76,0.3),transparent)', margin: '20px 0' }} />

          {/* Map Actions Grid Block */}
          <div className="map-btn-grid">
            <a href="https://maps.google.com/?q=Malabar+Avenue+Ramanattukara" target="_blank" rel="noreferrer" className="map-btn">
              Open in Maps
            </a>
            <a href="https://maps.google.com/?daddr=Malabar+Avenue+Ramanattukara" target="_blank" rel="noreferrer" className="map-btn">
              Get Directions
            </a>
          </div>
        </div>
      </motion.div>

      <GoldLine />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
        style={{ maxWidth: 340, fontFamily: '"Cormorant Garamond",serif', fontStyle: 'italic', fontSize: 'clamp(14px,2.5vw,16px)', color: 'rgba(232,201,122,0.65)', lineHeight: 1.8 }}>
        "We joyfully request the honour of your presence as we begin this blessed journey together."
      </motion.div>

      {/* Communications Actions Grid Block */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
        style={{ width: '100%', maxWidth: 440, marginTop: 20 }}>
        <div className="action-btn-grid">
          <a href="tel:+916282142322" className="action-btn">
            <span>📞</span> Call Family
          </a>
          <a href="https://wa.me/916282142322?text=Hi!%20I%20received%20your%20wedding%20invitation." target="_blank" rel="noreferrer" className="action-btn">
            <span>💬</span> WhatsApp
          </a>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        style={{ marginTop: 40, width: '100%' }}>
        <div style={{ width: '100%', maxWidth: 260, margin: '0 auto 12px', transform: 'scaleY(-1)', opacity: 0.18 }}>
          <Arch op={1} />
        </div>
        <div style={{ fontFamily: '"Pinyon Script",cursive', fontSize: 'clamp(24px,4vw,34px)', color: 'rgba(232,201,122,0.5)' }}>
          With love & blessings
        </div>
        <div style={{ fontFamily: '"Cormorant Garamond",serif', fontStyle: 'italic', fontSize: 13, color: 'rgba(201,168,76,0.3)', marginTop: 8, letterSpacing: 2 }}>
          بارَكَ اللَّهُ لَكُمَا وَبارَكَ عَلَيْكُمَا
        </div>
      </motion.div>

    </div>
  </motion.div>
)

export default function MinimalWeddingCard() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: FONTS }} />
      <AnimatePresence mode="wait">
        {!open
          ? <EnvelopeScreen key="env" onOpen={() => setOpen(true)} />
          : <Card key="card" />
        }
      </AnimatePresence>
    </>
  )
}