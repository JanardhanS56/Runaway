'use client'

import { useState, useEffect } from 'react'
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronRight,
  Gauge,
  Home,
  Menu,
  Moon,
  Plus,
  RotateCcw,
  Search,
  Settings2,
  Sparkles,
  Table,
  Target,
  TrendingUp,
  WalletCards,
  X,
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

function Sidebar({ mobile = false }: { mobile?: boolean }) {
  const resetDemo = useRunwayStore((s) => s.resetDemo)
  return (
    <nav className={mobile ? 'mobile-nav' : 'sidebar'} aria-label="Primary navigation">
      {!mobile && (
        <div className="brand">
          <span className="brand-mark"><Zap size={15} fill="currentColor" /></span>
          <span>Runway</span>
        </div>
      )}
      <div className={mobile ? 'mobile-nav-items' : 'nav-items'}>
        {navItems.map(({ label, href, icon: Icon }) => (
          <a
            href={href}
            key={label}
            className={`nav-link ${label === 'Cockpit' ? 'active' : ''}`}
            aria-current={label === 'Cockpit' ? 'page' : undefined}
          >
            <Icon size={18} strokeWidth={1.8} />
            <span>{mobile && label === 'Decision Lab' ? 'Lab' : label}</span>
          </a>
        ))}
      </div>
      {!mobile && (
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
      )}
    </nav>
  )
}

export default function Page() {
  const currentDay = useRunwayStore((s) => s.currentDay)
  const activeDay = useRunwayStore((s) => s.activeDay)
  const balance = useRunwayStore((s) => s.balance)
  const transactions = useRunwayStore((s) => s.transactions)
  const commitments = useRunwayStore((s) => s.commitments)
  const goals = useRunwayStore((s) => s.goals)
  const advanceDay = useRunwayStore((s) => s.advanceDay)
  const fastForward = useRunwayStore((s) => s.fastForward)
  const setActiveDay = useRunwayStore((s) => s.setActiveDay)
  const getDailyAllowance = useRunwayStore((s) => s.getDailyAllowance)
  const getEndForecast = useRunwayStore((s) => s.getEndForecast)
  const triggerRandomShock = useRunwayStore((s) => s.triggerRandomShock)

  const [showTable, setShowTable] = useState(false)
  const [cmdOpen, setCmdOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  useEffect(() => {
    const handleOpenCmd = () => setCmdOpen(true)
    window.addEventListener('open-command-palette', handleOpenCmd)
    return () => window.removeEventListener('open-command-palette', handleOpenCmd)
  }, [])

  const dailyAllowance = getDailyAllowance()
  const forecastEnd = getEndForecast()
  const selectedDayTransactions = transactions.filter((t) => t.day === activeDay)

  const handleAdvance = () => {
    advanceDay()
    setToastMessage(`Advanced to Day ${currentDay + 1}`)
    setTimeout(() => setToastMessage(null), 2500)
  }

  const handleFastForward = () => {
    fastForward(30)
    setToastMessage('Fast-forwarded to Day 30!')
    setTimeout(() => setToastMessage(null), 2500)
  }

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content">
        {/* Topbar */}
        <header className="topbar">
          <div className="topbar-left">
            <button className="icon-button menu-button" aria-label="Open menu">
              <Menu size={20} />
            </button>
            <div>
              <p className="eyebrow">YOUR RUNWAY</p>
              <h1>Cockpit</h1>
            </div>
          </div>
          <div className="top-actions">
            <span className="day-pill">
              <span className="pulse-dot" /> Day {currentDay} <span className="muted">of 30</span>
            </span>
            <button className="text-button" onClick={handleAdvance}>
              <CalendarDays size={15} /> Advance day
            </button>
            <button className="text-button subtle" onClick={handleFastForward}>
              Fast-forward <ArrowRight size={15} />
            </button>
            <button
              className="outline-button"
              onClick={triggerRandomShock}
              title="Test unexpected expense shock"
              style={{ color: 'var(--danger)', borderColor: 'rgba(251, 113, 133, 0.3)' }}
            >
              <AlertTriangle size={15} /> Life Happens
            </button>
            <button
              className="primary-button"
              onClick={() => setCmdOpen(true)}
            >
              <Plus size={17} /> Quick add (⌘K)
            </button>
          </div>
        </header>

        <div className="mobile-day">
          <span className="pulse-dot" /> Day {currentDay} <span className="muted">of 30</span>
        </div>

        <div className="cockpit-content">
          {/* Day Strip */}
          <section className="day-strip-section" aria-labelledby="days-heading">
            <div className="section-heading">
              <div>
                <p className="eyebrow lime-text">TIME MACHINE</p>
                <h2 id="days-heading">Your 30-day runway</h2>
              </div>
              <span className="muted small-copy">Click any day to inspect ledger events</span>
            </div>
            <div className="day-strip" role="list" aria-label="Runway days">
              {Array.from({ length: 30 }, (_, index) => {
                const day = index + 1
                const hasTransactions = transactions.some((t) => t.day === day)
                const status =
                  day < currentDay
                    ? hasTransactions
                      ? 'spent'
                      : 'healthy'
                    : day === currentDay
                    ? 'today'
                    : day > 22
                    ? 'risk'
                    : 'future'
                return (
                  <button
                    key={day}
                    className={`day-cell ${status} ${activeDay === day ? 'selected' : ''}`}
                    onClick={() => setActiveDay(day)}
                    aria-label={`Day ${day}${day === currentDay ? ', today' : ''}`}
                    aria-pressed={activeDay === day}
                  >
                    <span>{day}</span>
                  </button>
                )
              })}
            </div>
            <div className="day-strip-key">
              <span><i className="key-dot healthy" /> Ahead of pace</span>
              <span><i className="key-dot spent" /> Spent today</span>
              <span><i className="key-dot risk" /> Risk building</span>
              {activeDay !== currentDay && (
                <span style={{ marginLeft: 'auto', color: 'var(--primary)' }}>
                  Viewing Day {activeDay} ({selectedDayTransactions.length} events)
                </span>
              )}
            </div>
          </section>

          {/* Inspected Day Banner */}
          {activeDay !== currentDay && (
            <div style={{ marginTop: '12px', padding: '12px 18px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '12px' }}>
                <strong>Inspecting Day {activeDay}:</strong> {selectedDayTransactions.length > 0 ? selectedDayTransactions.map(e => `${e.label} (${e.amount})`).join(', ') : 'No transactions recorded on this day.'}
              </span>
              <button className="text-button subtle" onClick={() => setActiveDay(currentDay)}>
                Back to today
              </button>
            </div>
          )}

          {/* Hero Allowance Bento */}
          <section className="hero-grid">
            <article className="card allowance-card">
              <div className="allowance-copy">
                <p className="eyebrow lime-text">SAFE TO SPEND TODAY</p>
                <div className="allowance-number">
                  ₹{dailyAllowance}
                  <span>/ day</span>
                </div>
                <p className="hero-caption">
                  <TrendingUp size={15} /> You&apos;re ₹340 ahead of pace
                </p>
              </div>
              <div className="allowance-ring" aria-label="Allowance usage ring">
                <div>
                  <strong>62%</strong>
                  <small>used</small>
                </div>
              </div>
              <div className="allowance-footer">
                <span>Today&apos;s allowance</span>
                <strong>₹300</strong>
                <span className="divider-dot" />
                <span>Left to spend</span>
                <strong className="lime-text">₹{dailyAllowance}</strong>
              </div>
            </article>

            <article className="card balance-card">
              <div className="card-heading">
                <div>
                  <p className="eyebrow violet-text">CURRENT BALANCE</p>
                  <h2>₹{balance.toLocaleString('en-IN')}</h2>
                </div>
                <span className="balance-icon">
                  <WalletCards size={17} />
                </span>
              </div>
              <div className="balance-meta">
                <span><i className="tiny-dot income" /> Income this month</span>
                <strong>₹6,000</strong>
              </div>
              <div className="balance-meta">
                <span><i className="tiny-dot expense" /> Spent so far</span>
                <strong>₹2,100</strong>
              </div>
              <div className="mini-progress">
                <span style={{ width: `${Math.min(100, Math.max(10, (balance / 10000) * 100))}%` }} />
              </div>
              <p className="muted balance-note">
                {Math.round((balance / 10000) * 100)}% of your starting ₹10,000 fuel remains
              </p>
            </article>
          </section>

          {/* Dashboard Grid */}
          <div className="dashboard-grid">
            {/* Forecast Chart */}
            <section className="card runway-card" aria-labelledby="runway-heading">
              <div className="chart-header">
                <div>
                  <p className="eyebrow violet-text">FORECAST</p>
                  <h2 id="runway-heading">Balance over 30 days</h2>
                </div>
                <button
                  className="outline-button"
                  onClick={() => setShowTable(!showTable)}
                >
                  {showTable ? 'View chart' : 'View as table'} <ArrowRight size={14} />
                </button>
              </div>

              <div className="chart-legend">
                <span><i className="legend-line real" /> Your balance</span>
                <span><i className="legend-line band" /> Confidence range</span>
                <span><i className="legend-dot" /> Day {currentDay}</span>
              </div>

              {!showTable ? (
                <div className="chart-wrap">
                  <svg viewBox="0 0 760 270" role="img" preserveAspectRatio="none">
                    <title id="chart-title">Thirty day balance forecast</title>
                    <desc id="chart-desc">Your balance trends from {balance} rupees today to an estimated {forecastEnd} rupees on day 30.</desc>
                    <defs>
                      <linearGradient id="chartBand" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0" stopColor="#C6F432" stopOpacity=".15" />
                        <stop offset="1" stopColor="#C6F432" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <g className="grid-lines">
                      <line x1="34" y1="38" x2="740" y2="38" />
                      <line x1="34" y1="92" x2="740" y2="92" />
                      <line x1="34" y1="146" x2="740" y2="146" />
                      <line x1="34" y1="200" x2="740" y2="200" />
                    </g>
                    <path
                      className="band-area"
                      d="M34 63 C180 78 230 81 310 105 C420 130 535 143 740 184 L740 38 C570 44 450 49 310 66 C180 45 100 45 34 38Z"
                      fill="url(#chartBand)"
                    />
                    <path
                      className="real-line"
                      d="M34 63 C180 78 230 81 310 105 C420 130 535 143 740 184"
                    />
                    <line
                      className="today-line"
                      x1={34 + (currentDay / 30) * 706}
                      y1="25"
                      x2={34 + (currentDay / 30) * 706}
                      y2="225"
                    />
                    <circle
                      className="today-point"
                      cx={34 + (currentDay / 30) * 706}
                      cy={63 + (currentDay / 30) * 121}
                      r="5"
                    />
                    <text x="2" y="42">₹6k</text>
                    <text x="2" y="96">₹4k</text>
                    <text x="2" y="150">₹2k</text>
                    <text x="7" y="204">₹0</text>
                    <text x="31" y="248">Day 1</text>
                    <text x="213" y="248">9</text>
                    <text x="375" y="248">16</text>
                    <text x="535" y="248">23</text>
                    <text x="701" y="248">30</text>
                  </svg>
                </div>
              ) : (
                <div style={{ marginTop: '12px', maxHeight: '220px', overflowY: 'auto' }}>
                  <div className="transaction-head">
                    <span>Day</span>
                    <span>Projected Balance</span>
                    <span>Range Low</span>
                    <span>Range High</span>
                  </div>
                  {[1, 5, 9, 14, 20, 25, 30].map((d) => (
                    <div className="transaction-row" key={d}>
                      <span>Day {d}</span>
                      <strong>₹{Math.round(balance - (d / 30) * 4220).toLocaleString('en-IN')}</strong>
                      <span className="muted">₹{Math.round(balance * 0.85).toLocaleString('en-IN')}</span>
                      <span className="safe-text">₹{Math.round(balance * 1.05).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
              )}

              <p className="chart-note">
                <span className="note-check"><Check size={12} /></span>
                {forecastEnd > 1000
                  ? `Your forecast ends at ₹${forecastEnd.toLocaleString('en-IN')}, above the ₹1,000 shock cushion.`
                  : `Warning: Forecast ends at ₹${forecastEnd.toLocaleString('en-IN')}, dropping below safety buffer.`}
              </p>
            </section>

            {/* Side Stack */}
            <div className="side-stack">
              {/* Upcoming Commitments */}
              <section className="card upcoming-card">
                <div className="section-heading">
                  <div>
                    <p className="eyebrow lime-text">UP NEXT</p>
                    <h2>Upcoming commitments</h2>
                  </div>
                  <a href="/money" className="icon-button" aria-label="View all commitments">
                    <ArrowRight size={17} />
                  </a>
                </div>
                <div className="event-list">
                  {commitments.slice(0, 3).map((comm) => (
                    <div className="event-row" key={comm.id}>
                      <div className="event-day bill">D{comm.day}</div>
                      <div className="event-copy">
                        <strong>{comm.label}</strong>
                        <small>{comm.paid ? 'Paid' : comm.dueText}</small>
                      </div>
                      <strong className={comm.paid ? 'muted' : ''}>
                        ₹{comm.amount.toLocaleString('en-IN')}
                      </strong>
                    </div>
                  ))}
                </div>
              </section>

              {/* Goals */}
              <section className="card goals-card">
                <div className="section-heading">
                  <div>
                    <p className="eyebrow violet-text">SAVING WITH INTENT</p>
                    <h2>Goals</h2>
                  </div>
                  <a href="/goals" className="icon-button" aria-label="View all goals">
                    <ArrowRight size={17} />
                  </a>
                </div>
                {goals.slice(0, 2).map((goal) => (
                  <div className="goal-row" key={goal.id}>
                    <div className={`goal-icon ${goal.color === 'violet' ? 'violet' : ''}`}>
                      {goal.color === 'violet' ? '⌂' : '⌁'}
                    </div>
                    <div className="goal-copy">
                      <strong>{goal.name}</strong>
                      <small>₹{goal.saved.toLocaleString('en-IN')} of ₹{goal.target.toLocaleString('en-IN')}</small>
                      <div className={`goal-progress ${goal.color === 'violet' ? 'violet-progress' : ''}`}>
                        <span style={{ width: `${Math.round((goal.saved / goal.target) * 100)}%` }} />
                      </div>
                    </div>
                    <div className="goal-eta">
                      <strong>{goal.eta}</strong>
                      <small>on track</small>
                    </div>
                  </div>
                ))}
              </section>
            </div>
          </div>
        </div>

        {/* Global Life Happens Shock Modal */}
        <ShockModal />

        {/* Global ⌘K Command Palette */}
        <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />

        {/* Toast */}
        {toastMessage && (
          <div className="goal-toast" role="status">
            <span><Check size={14} /> {toastMessage}</span>
            <button aria-label="Dismiss" onClick={() => setToastMessage(null)}>
              <X size={14} />
            </button>
          </div>
        )}
      </main>
      <Sidebar mobile />
    </div>
  )
}
