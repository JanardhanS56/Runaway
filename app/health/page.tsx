'use client'

import { useState } from 'react'
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  Gauge,
  Home,
  RotateCcw,
  ShieldCheck,
  Target,
  WalletCards,
  Zap,
} from 'lucide-react'
import { useRunwayStore } from '@/src/store/useRunwayStore'
import { ShockModal } from '@/src/components/ShockModal'
import { CommandPalette } from '@/src/components/CommandPalette'

const navItems = [
  { label: 'Cockpit', href: '/', icon: Home },
  { label: 'Decision Lab', href: '/decision-lab', icon: Zap },
  { label: 'Money', href: '/money', icon: WalletCards },
  { label: 'Goals', href: '/goals', icon: Target },
  { label: 'Health', href: '/health', icon: Gauge },
]

function Sidebar() {
  const resetDemo = useRunwayStore((s) => s.resetDemo)
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
            className={`nav-link ${label === 'Health' ? 'active' : ''}`}
            aria-current={label === 'Health' ? 'page' : undefined}
          >
            <Icon size={18} strokeWidth={1.8} />
            <span>{label}</span>
          </a>
        ))}
      </div>
      <div className="sidebar-bottom">
        <button
          onClick={resetDemo}
          className="text-button subtle"
          style={{ width: '100%', justifyContent: 'flex-start' }}
        >
          <RotateCcw size={15} /> Reset Demo State
        </button>
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
            className={`nav-link ${label === 'Health' ? 'active' : ''}`}
          >
            <Icon size={18} />
            <span>{label === 'Decision Lab' ? 'Lab' : label}</span>
          </a>
        ))}
      </div>
    </nav>
  )
}

export default function HealthPage() {
  const currentDay = useRunwayStore((s) => s.currentDay)
  const balance = useRunwayStore((s) => s.balance)
  const subscriptions = useRunwayStore((s) => s.subscriptions)
  const commitments = useRunwayStore((s) => s.commitments)
  const goals = useRunwayStore((s) => s.goals)
  const getHealthScore = useRunwayStore((s) => s.getHealthScore)
  const getRiskPercentage = useRunwayStore((s) => s.getRiskPercentage)
  const getEndForecast = useRunwayStore((s) => s.getEndForecast)

  const [expanded, setExpanded] = useState<string | null>(null)
  const [cmdOpen, setCmdOpen] = useState(false)

  const healthScore = getHealthScore()
  const riskP = getRiskPercentage()
  const forecast = getEndForecast()

  const components = [
    {
      label: 'Runway Buffer',
      score: forecast > 1000 ? 92 : 68,
      weight: '25%',
      reason: `Projected end balance is ₹${forecast.toLocaleString('en-IN')}, ${forecast > 1000 ? 'above' : 'below'} the ₹1,000 shock buffer.`,
      color: forecast > 1000 ? 'lime' : 'warning',
    },
    {
      label: 'Spend Pace',
      score: balance > 4500 ? 88 : 74,
      weight: '20%',
      reason: 'Current burn rate aligns with your daily runway allowance.',
      color: 'safe',
    },
    {
      label: 'Savings Progress',
      score: 78,
      weight: '20%',
      reason: `${goals.length} active savings goals are progressing toward target dates.`,
      color: 'violet',
    },
    {
      label: 'Commitment Coverage',
      score: commitments.every((c) => c.paid) ? 98 : 86,
      weight: '15%',
      reason: `${commitments.filter((c) => c.paid).length} of ${commitments.length} commitments are already paid this month.`,
      color: 'blue',
    },
    {
      label: 'Risk Exposure',
      score: Math.max(10, 100 - riskP),
      weight: '15%',
      reason: `Calculated risk of shortfall before Day 30 is ${riskP}%.`,
      color: riskP < 20 ? 'safe' : 'danger',
    },
    {
      label: 'Subscription Load',
      score: subscriptions.filter((s) => s.active).length <= 2 ? 88 : 65,
      weight: '5%',
      reason: `${subscriptions.filter((s) => s.active).length} recurring subscriptions active.`,
      color: subscriptions.filter((s) => s.active).length <= 2 ? 'safe' : 'warning',
    },
  ]

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content">
        <header className="topbar">
          <div>
            <p className="eyebrow">YOUR RUNWAY</p>
            <h1>Health</h1>
          </div>
          <div className="top-actions">
            <span className="day-pill">
              <span className="pulse-dot" /> Day {currentDay} <span className="muted">of 30</span>
            </span>
          </div>
        </header>

        <div className="health-content">
          <section className="health-intro">
            <div>
              <p className="eyebrow lime-text">FINANCIAL HEALTH</p>
              <h2>A clearer view of your runway.</h2>
              <p>Your score is explainable, actionable, and built from the decisions already on your ledger.</p>
            </div>
            <div className="health-score">
              <div
                className="score-ring"
                style={{
                  background: `conic-gradient(var(--primary) 0 ${healthScore}%, #252B37 ${healthScore}% 100%)`,
                }}
              >
                <strong>{healthScore}</strong>
                <span>/ 100</span>
              </div>
              <div>
                <span className="health-status">
                  <Check size={13} /> {healthScore >= 75 ? 'Healthy' : 'Attention Needed'}
                </span>
                <small>{riskP < 20 ? 'Low volatility profile' : 'Guarded risk level'}</small>
              </div>
            </div>
          </section>

          <section className="health-layout">
            <div className="card health-breakdown">
              <div className="card-heading">
                <div>
                  <p className="eyebrow">SCORE BREAKDOWN</p>
                  <h3>What is driving your score?</h3>
                </div>
                <span className="score-date">Updated live</span>
              </div>
              <div className="health-bars">
                {components.map((item) => (
                  <button
                    className={`health-row ${expanded === item.label ? 'open' : ''}`}
                    key={item.label}
                    onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                    aria-expanded={expanded === item.label}
                  >
                    <span className={`health-dot ${item.color}`} />
                    <span className="health-row-copy">
                      <strong>{item.label}</strong>
                      <small>{item.weight} of score</small>
                    </span>
                    <span className="health-track">
                      <span className={item.color} style={{ width: `${item.score}%` }} />
                    </span>
                    <strong className="health-number">{item.score}</strong>
                    <ChevronDown size={15} className="health-chevron" />
                    {expanded === item.label && (
                      <span className="health-reason">{item.reason}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <aside className="health-side">
              <div className="card health-tip-card">
                <span className="tip-icon">
                  <ShieldCheck size={18} />
                </span>
                <p className="eyebrow violet-text">ONE THING TO TRY</p>
                <h3>Trim one recurring cost.</h3>
                <p>
                  Cancelling an unused subscription in the Money tab immediately increases your score and frees up daily allowance.
                </p>
                <a href="/money" className="outline-button">
                  Review subscriptions <ArrowRight size={13} />
                </a>
              </div>

              <div className="card health-check-card">
                <div className="card-heading">
                  <div>
                    <p className="eyebrow">THIS MONTH</p>
                    <h3>Strong foundations</h3>
                  </div>
                  <span className="check-badge">
                    <Check size={14} />
                  </span>
                </div>
                <ul>
                  <li><Check size={13} /> Daily allowance stays positive</li>
                  <li><Check size={13} /> Emergency buffer covers unexpected shocks</li>
                  <li><Check size={13} /> Spend pace is under control</li>
                </ul>
              </div>
            </aside>
          </section>

          <section className="health-note">
            <span>
              <Gauge size={15} />
            </span>
            <p>
              <strong>Health is not a judgment.</strong> It is a signal that helps you decide what to do next while there is still time to change the outcome.
            </p>
          </section>
        </div>

        <ShockModal />
        <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />
      </main>
      <MobileNav />
    </div>
  )
}
