'use client'

import { useState } from 'react'
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  Clock,
  Gauge,
  HelpCircle,
  Home,
  RotateCcw,
  Settings2,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Target,
  WalletCards,
  X,
  Zap,
} from 'lucide-react'

const navItems = [
  { label: 'Cockpit', href: '/', icon: Home },
  { label: 'Decision Lab', href: '/decision-lab', icon: Zap },
  { label: 'Money', href: '/money', icon: WalletCards },
  { label: 'Goals', href: '/goals', icon: Target },
  { label: 'Health', href: '/health', icon: Gauge },
]

const presets = [
  { label: 'Sneakers', amount: 2499, day: 10, type: 'expense', note: 'One-time want' },
  { label: 'Weekend trip', amount: 1800, day: 14, type: 'expense', note: 'Leisure escape' },
  { label: 'Add Netflix', amount: 199, day: 18, type: 'subscription', note: 'Monthly recurring' },
  { label: 'Cancel Spotify', amount: -119, day: 14, type: 'subscription', note: 'Trim subscription' },
  { label: 'Save ₹500', amount: 500, day: 11, type: 'goal', note: 'Transfer to Buffer' },
]

function Sidebar() {
  return (
    <nav className="sidebar" aria-label="Primary navigation">
      <div className="brand">
        <span className="brand-mark"><Zap size={15} fill="currentColor" /></span>
        <span>Runway</span>
      </div>
      <div className="nav-items">
        {navItems.map(({ label, href, icon: Icon }) => (
          <a
            href={href}
            key={label}
            className={`nav-link ${label === 'Decision Lab' ? 'active' : ''}`}
            aria-current={label === 'Decision Lab' ? 'page' : undefined}
          >
            <Icon size={18} strokeWidth={1.8} />
            <span>{label}</span>
          </a>
        ))}
      </div>
      <div className="sidebar-bottom">
        <a href="#" className="nav-link"><Settings2 size={18} /> Settings</a>
        <div className="profile">
          <span className="avatar">AS</span>
          <span><strong>Arjun S.</strong><small>Personal runway</small></span>
          <ChevronRight size={15} />
        </div>
      </div>
    </nav>
  )
}

function MobileNav() {
  return (
    <nav className="mobile-nav" aria-label="Mobile navigation">
      <div className="mobile-nav-items">
        {navItems.map(({ label, href, icon: Icon }) => (
          <a
            href={href}
            key={label}
            className={`nav-link ${label === 'Decision Lab' ? 'active' : ''}`}
          >
            <Icon size={18} />
            <span>{label === 'Decision Lab' ? 'Lab' : label}</span>
          </a>
        ))}
      </div>
    </nav>
  )
}

export default function DecisionLabPage() {
  const [decisionName, setDecisionName] = useState('Sneakers')
  const [amount, setAmount] = useState(2499)
  const [day, setDay] = useState(10)
  const [decisionType, setDecisionType] = useState('expense')
  const [committed, setCommitted] = useState(false)

  // Simulation calculations
  const baseBalance = 5400
  const baseAllowance = 187
  const baseForecast = 1180
  const baseRisk = 12
  const baseHealth = 82

  const simulatedBalance = decisionType === 'subscription' && amount < 0
    ? baseBalance + 119
    : baseBalance - amount

  const daysLeft = Math.max(1, 30 - day)
  const allowanceImpact = Math.round(amount / daysLeft)
  const simulatedAllowance = Math.max(0, baseAllowance - allowanceImpact)

  const simulatedForecast = decisionType === 'subscription' && amount < 0
    ? baseForecast + 119
    : baseForecast - amount

  const riskIncrease = Math.round((amount / 3000) * 55)
  const simulatedRisk = Math.min(95, Math.max(5, baseRisk + (amount > 0 ? riskIncrease : -5)))

  const healthImpact = Math.round((amount / 2500) * 35)
  const simulatedHealth = Math.min(99, Math.max(15, baseHealth - (amount > 0 ? healthImpact : -4)))

  const isSevere = simulatedForecast < 0 || simulatedRisk > 50
  const isModerate = simulatedForecast < 1000 || simulatedRisk > 25

  const verdict = isSevere
    ? { title: "DON'T", reason: `This leaves you ₹${Math.abs(simulatedForecast).toLocaleString('en-IN')} in the red before day 30.`, tone: 'danger' }
    : isModerate
    ? { title: 'RISKY', reason: 'Your shock cushion drops below the ₹1,000 safety threshold.', tone: 'risky' }
    : { title: 'SAFE', reason: 'You have enough fuel to cover this and maintain your pace.', tone: 'safe' }

  const applyPreset = (p: typeof presets[0]) => {
    setDecisionName(p.label)
    setAmount(p.amount)
    setDay(p.day)
    setDecisionType(p.type)
  }

  const resetDraft = () => {
    setDecisionName('')
    setAmount(0)
    setDay(10)
  }

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <div>
              <p className="eyebrow violet-text">PREVIEW THE RIPPLE EFFECT</p>
              <h1>Decision Lab</h1>
            </div>
          </div>
          <div className="top-actions">
            <span className="day-pill">
              <span className="pulse-dot" /> Day 9 <span className="muted">of 30</span>
            </span>
            <button className="outline-button" onClick={resetDraft}>
              <RotateCcw size={14} /> Reset draft
            </button>
            <button
              className="primary-button"
              onClick={() => setCommitted(true)}
            >
              <Check size={16} /> Commit to runway
            </button>
          </div>
        </header>

        <div className="lab-content">
          <div className="section-heading">
            <div>
              <p className="eyebrow lime-text">SCENARIO TESTING</p>
              <h2>What happens if you spend this?</h2>
            </div>
            <span className="muted small-copy">Ghost line projects the future</span>
          </div>

          <div className="presets-strip">
            <span className="small-copy muted" style={{ alignSelf: 'center', marginRight: '4px' }}>Quick test:</span>
            {presets.map((p) => (
              <button
                key={p.label}
                className="preset-chip"
                onClick={() => applyPreset(p)}
              >
                {p.label} (₹{Math.abs(p.amount)})
              </button>
            ))}
          </div>

          <div className="lab-grid">
            {/* Input Config Card */}
            <div className="card simulator-form">
              <div className="card-heading">
                <div>
                  <p className="eyebrow">DECISION PARAMETERS</p>
                  <h3>Simulate a choice</h3>
                </div>
                <Sparkles size={18} className="violet-text" />
              </div>

              <div className="form-group">
                <label htmlFor="dec-name">What is it for?</label>
                <input
                  id="dec-name"
                  type="text"
                  value={decisionName}
                  onChange={(e) => setDecisionName(e.target.value)}
                  placeholder="e.g. New Headphones, Dinner"
                />
              </div>

              <div className="form-group">
                <label htmlFor="dec-amount">Amount (₹)</label>
                <input
                  id="dec-amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  step="50"
                />
              </div>

              <div className="form-group">
                <label htmlFor="dec-day">Planned for Day (1–30): Day {day}</label>
                <input
                  id="dec-day"
                  type="range"
                  min="9"
                  max="30"
                  value={day}
                  onChange={(e) => setDay(Number(e.target.value))}
                />
                <div className="range-labels">
                  <span>Today (Day 9)</span>
                  <span>End of month (Day 30)</span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="dec-type">Type</label>
                <select
                  id="dec-type"
                  value={decisionType}
                  onChange={(e) => setDecisionType(e.target.value)}
                >
                  <option value="expense">One-time expense</option>
                  <option value="subscription">Subscription</option>
                  <option value="goal">Goal transfer</option>
                </select>
              </div>

              {/* Verdict Banner */}
              <div className={`verdict-banner ${verdict.tone}`}>
                {verdict.tone === 'safe' ? (
                  <ShieldCheck size={24} />
                ) : (
                  <ShieldAlert size={24} />
                )}
                <div>
                  <strong>{verdict.title}</strong>
                  <p>{verdict.reason}</p>
                </div>
              </div>

              {/* Delta Chips */}
              <div className="delta-chips-grid">
                <div className="delta-chip">
                  <span>Balance</span>
                  <strong>₹{simulatedBalance.toLocaleString('en-IN')}</strong>
                  <small className={simulatedBalance < baseBalance ? 'down' : 'up'}>
                    {simulatedBalance < baseBalance ? '▼' : '▲'} ₹{Math.abs(simulatedBalance - baseBalance).toLocaleString('en-IN')}
                  </small>
                </div>
                <div className="delta-chip">
                  <span>Daily Allowance</span>
                  <strong>₹{simulatedAllowance} / day</strong>
                  <small className={simulatedAllowance < baseAllowance ? 'down' : 'up'}>
                    {simulatedAllowance < baseAllowance ? '▼' : '▲'} ₹{Math.abs(simulatedAllowance - baseAllowance)}
                  </small>
                </div>
                <div className="delta-chip">
                  <span>Day 30 Forecast</span>
                  <strong style={{ color: simulatedForecast < 0 ? 'var(--danger)' : 'var(--foreground)' }}>
                    ₹{simulatedForecast.toLocaleString('en-IN')}
                  </strong>
                  <small className={simulatedForecast < baseForecast ? 'down' : 'up'}>
                    {simulatedForecast < baseForecast ? '▼' : '▲'} ₹{Math.abs(simulatedForecast - baseForecast).toLocaleString('en-IN')}
                  </small>
                </div>
                <div className="delta-chip">
                  <span>Risk & Health</span>
                  <strong>{simulatedRisk}% risk · {simulatedHealth} pts</strong>
                  <small className={simulatedHealth < baseHealth ? 'down' : 'up'}>
                    {simulatedHealth < baseHealth ? '▼' : '▲'} {Math.abs(simulatedHealth - baseHealth)} pts
                  </small>
                </div>
              </div>

              {/* Safer Alternatives Box */}
              {isSevere && (
                <div style={{ marginTop: '10px', padding: '14px', background: 'rgba(124, 92, 255, 0.08)', borderRadius: '12px', border: '1px solid rgba(124, 92, 255, 0.2)' }}>
                  <p className="eyebrow violet-text" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Sparkles size={12} /> SMART ADVISOR: SAFER ALTERNATIVES
                  </p>
                  <ul style={{ margin: '8px 0 0', paddingLeft: '18px', fontSize: '11px', color: 'var(--muted)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <li>
                      <strong style={{ color: 'var(--foreground)' }}>Cap amount at ₹{Math.round(amount * 0.45)}:</strong> Keeps your forecast above the ₹1,000 shock buffer.
                    </li>
                    <li>
                      <strong style={{ color: 'var(--foreground)' }}>Postpone to Day 16:</strong> Wait until your salary/freelance deposit clears.
                    </li>
                    <li>
                      <strong style={{ color: 'var(--foreground)' }}>Split into 2 payments:</strong> Pay ₹{Math.round(amount / 2)} now and ₹{Math.round(amount / 2)} next cycle.
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Ghost Chart Card */}
            <div className="card runway-card">
              <div className="chart-header">
                <div>
                  <p className="eyebrow violet-text">VISUAL PROJECTION</p>
                  <h2>30-Day Runway with Ghost Simulation</h2>
                </div>
              </div>

              <div className="chart-legend">
                <span><i className="legend-line real" /> Base runway</span>
                <span><i className="legend-line" style={{ background: 'var(--violet)' }} /> Ghost future</span>
                <span><i className="legend-dot" /> Today</span>
              </div>

              <div className="chart-wrap">
                <svg viewBox="0 0 760 270" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="ghostBand" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0" stopColor="#7C5CFF" stopOpacity="0.18" />
                      <stop offset="1" stopColor="#7C5CFF" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <g className="grid-lines">
                    <line x1="34" y1="38" x2="740" y2="38" />
                    <line x1="34" y1="92" x2="740" y2="92" />
                    <line x1="34" y1="146" x2="740" y2="146" />
                    <line x1="34" y1="200" x2="740" y2="200" />
                  </g>

                  {/* Base Runway Solid Line */}
                  <path
                    className="real-line"
                    d="M34 63 C180 78 230 81 310 105 C420 130 535 143 740 184"
                  />

                  {/* Simulated Ghost Path */}
                  <path
                    d={`M34 63 C180 78 230 81 310 ${Math.min(230, 105 + (amount / 25))} C420 ${Math.min(235, 130 + (amount / 20))} 535 ${Math.min(240, 143 + (amount / 18))} 740 ${Math.min(245, 184 + (amount / 15))}`}
                    fill="none"
                    stroke="#7C5CFF"
                    strokeWidth="2.5"
                    strokeDasharray="6 4"
                  />

                  {/* Marker Lines */}
                  <line className="today-line" x1="225" y1="25" x2="225" y2="225" />
                  <circle className="today-point" cx="225" cy="80" r="5" />

                  {/* Labels */}
                  <text x="2" y="42">₹6k</text>
                  <text x="2" y="96">₹4k</text>
                  <text x="2" y="150">₹2k</text>
                  <text x="7" y="204">₹0</text>
                  <text x="31" y="248">Day 1</text>
                  <text x="213" y="248">9 (Today)</text>
                  <text x="375" y="248">16</text>
                  <text x="535" y="248">23</text>
                  <text x="701" y="248">30</text>
                </svg>
              </div>

              <div style={{ marginTop: '14px', padding: '12px 16px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '10px', border: '1px solid var(--border)' }}>
                <p style={{ margin: 0, fontSize: '11px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Clock size={14} className="violet-text" />
                  <span>
                    Simulating <strong>{decisionName || 'Choice'}</strong> on <strong>Day {day}</strong> reduces your daily safe-to-spend allowance from <strong>₹{baseAllowance}</strong> to <strong className="lime-text">₹{simulatedAllowance}</strong>.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {committed && (
          <div className="goal-toast" role="status">
            <span><Check size={14} /> Decision committed to your live ledger!</span>
            <button aria-label="Dismiss" onClick={() => setCommitted(false)}>
              <X size={14} />
            </button>
          </div>
        )}
      </main>
      <MobileNav />
    </div>
  )
}
