'use client'

import { useState } from 'react'
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bell,
  CalendarDays,
  Check,
  ChevronRight,
  CircleHelp,
  Gauge,
  Home,
  Menu,
  Moon,
  Plus,
  RotateCcw,
  Settings2,
  Sun,
  Table,
  Target,
  TrendingUp,
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

const initialEvents = [
  { day: 1, amount: '₹2,400', label: 'Freelance payout', tone: 'income' },
  { day: 3, amount: '−₹120', label: 'Groceries', tone: 'expense' },
  { day: 5, amount: '−₹199', label: 'Spotify renewal', tone: 'expense' },
  { day: 9, amount: '−₹340', label: 'Food & drinks', tone: 'expense' },
  { day: 12, amount: '−₹850', label: 'Phone bill', tone: 'bill' },
  { day: 16, amount: '₹3,600', label: 'Salary', tone: 'income' },
  { day: 20, amount: '−₹499', label: 'Internet bill', tone: 'bill' },
]

function Sidebar({ mobile = false }: { mobile?: boolean }) {
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
          <a href="#" className="nav-link"><Settings2 size={18} /> Settings</a>
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
  const [currentDay, setCurrentDay] = useState(9)
  const [activeDay, setActiveDay] = useState(9)
  const [events, setEvents] = useState(initialEvents)
  const [showTable, setShowTable] = useState(false)
  const [quickAddOpen, setQuickAddOpen] = useState(false)
  const [quickAmount, setQuickAmount] = useState('')
  const [quickLabel, setQuickLabel] = useState('')
  const [quickType, setQuickType] = useState('expense')
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const handleAdvanceDay = () => {
    if (currentDay < 30) {
      const nextDay = currentDay + 1
      setCurrentDay(nextDay)
      setActiveDay(nextDay)
      setToastMessage(`Day advanced to Day ${nextDay} of 30`)
      setTimeout(() => setToastMessage(null), 3000)
    }
  }

  const handleFastForward = () => {
    setCurrentDay(30)
    setActiveDay(30)
    setToastMessage('Fast-forwarded to Day 30!')
    setTimeout(() => setToastMessage(null), 3000)
  }

  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!quickAmount || !quickLabel) return
    const num = Number(quickAmount)
    const newEvent = {
      day: currentDay,
      amount: quickType === 'income' ? `+₹${num.toLocaleString('en-IN')}` : `−₹${num.toLocaleString('en-IN')}`,
      label: quickLabel,
      tone: quickType,
    }
    setEvents([newEvent, ...events])
    setQuickAmount('')
    setQuickLabel('')
    setQuickAddOpen(false)
    setToastMessage(`Logged ${quickLabel} (₹${num}) on Day ${currentDay}`)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const selectedDayEvents = events.filter((e) => e.day === activeDay)

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
            <button className="text-button" onClick={handleAdvanceDay}>
              <CalendarDays size={15} /> Advance day
            </button>
            <button className="text-button subtle" onClick={handleFastForward}>
              Fast-forward <ArrowRight size={15} />
            </button>
            <button
              className="primary-button"
              onClick={() => setQuickAddOpen(true)}
            >
              <Plus size={17} /> Quick add
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
                const status =
                  day < currentDay
                    ? day === 3 || day === 5
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
                  Viewing Day {activeDay} ({selectedDayEvents.length} events)
                </span>
              )}
            </div>
          </section>

          {/* Inspected Day Banner if different from today */}
          {activeDay !== currentDay && (
            <div style={{ marginTop: '12px', padding: '12px 18px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '12px' }}>
                <strong>Inspecting Day {activeDay}:</strong> {selectedDayEvents.length > 0 ? selectedDayEvents.map(e => `${e.label} (${e.amount})`).join(', ') : 'No transactions recorded on this day.'}
              </span>
              <button className="text-button subtle" onClick={() => setActiveDay(currentDay)}>
                Back to today
              </button>
            </div>
          )}

          {/* Hero Allowance & Balance Bento */}
          <section className="hero-grid">
            <article className="card allowance-card">
              <div className="allowance-copy">
                <p className="eyebrow lime-text">SAFE TO SPEND TODAY</p>
                <div className="allowance-number">
                  ₹{Math.max(0, 187 - (currentDay > 9 ? (currentDay - 9) * 4 : 0))}
                  <span>/ day</span>
                </div>
                <p className="hero-caption">
                  <TrendingUp size={15} /> You&apos;re ₹340 ahead of pace
                </p>
              </div>
              <div className="allowance-ring" aria-label="62 percent of today's allowance used">
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
                <strong className="lime-text">
                  ₹{Math.max(0, 187 - (currentDay > 9 ? (currentDay - 9) * 4 : 0))}
                </strong>
              </div>
            </article>

            <article className="card balance-card">
              <div className="card-heading">
                <div>
                  <p className="eyebrow violet-text">CURRENT BALANCE</p>
                  <h2>₹5,400</h2>
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
                <span />
              </div>
              <p className="muted balance-note">70% of your starting fuel remains</p>
            </article>
          </section>

          {/* Dashboard Grid */}
          <div className="dashboard-grid">
            {/* Runway Chart */}
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
                    <desc id="chart-desc">Your balance trends from 5,400 rupees today to an estimated 1,180 rupees on day 30.</desc>
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
                      <strong>₹{Math.round(5400 - (d / 30) * 4220).toLocaleString('en-IN')}</strong>
                      <span className="muted">₹{Math.round(4800 - (d / 30) * 4400).toLocaleString('en-IN')}</span>
                      <span className="safe-text">₹{Math.round(5800 - (d / 30) * 3800).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
              )}

              <p className="chart-note">
                <span className="note-check"><Check size={12} /></span>
                Your forecast stays above the ₹1,000 shock cushion across all 30 days.
              </p>
            </section>

            {/* Side Stack */}
            <div className="side-stack">
              {/* Upcoming */}
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
                  {events.slice(3, 6).map((event) => (
                    <div className="event-row" key={`${event.day}-${event.label}`}>
                      <div className={`event-day ${event.tone}`}>D{event.day}</div>
                      <div className="event-copy">
                        <strong>{event.label}</strong>
                        <small>{event.day >= currentDay ? `Due in ${event.day - currentDay} days` : 'Past event'}</small>
                      </div>
                      <strong className={event.tone === 'income' ? 'income-text' : ''}>
                        {event.amount}
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
                <div className="goal-row">
                  <div className="goal-icon">⌁</div>
                  <div className="goal-copy">
                    <strong>Headphones</strong>
                    <small>₹3,200 of ₹5,000</small>
                    <div className="goal-progress"><span /></div>
                  </div>
                  <div className="goal-eta">
                    <strong>Day 24</strong>
                    <small>on track</small>
                  </div>
                </div>
                <div className="goal-row">
                  <div className="goal-icon violet">⌂</div>
                  <div className="goal-copy">
                    <strong>Emergency buffer</strong>
                    <small>₹1,000 of ₹2,500</small>
                    <div className="goal-progress violet-progress"><span /></div>
                  </div>
                  <div className="goal-eta">
                    <strong>Day 30</strong>
                    <small>68% pace</small>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Quick Add Modal */}
        {quickAddOpen && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', display: 'grid', placeItems: 'center', zIndex: 100 }}>
            <div className="card" style={{ width: '90%', maxWidth: '420px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, font: '700 18px Sora' }}>Quick Add Transaction</h3>
                <button className="icon-button" onClick={() => setQuickAddOpen(false)}>
                  <X size={16} />
                </button>
              </div>
              <form onSubmit={handleQuickAdd} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div className="form-group">
                  <label>Label</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chai, Groceries, Movie"
                    value={quickLabel}
                    onChange={(e) => setQuickLabel(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Amount (₹)</label>
                  <input
                    type="number"
                    required
                    placeholder="150"
                    value={quickAmount}
                    onChange={(e) => setQuickAmount(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Type</label>
                  <select
                    value={quickType}
                    onChange={(e) => setQuickType(e.target.value)}
                  >
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                    <option value="bill">Bill</option>
                  </select>
                </div>
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button type="button" className="outline-button" style={{ flex: 1 }} onClick={() => setQuickAddOpen(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="primary-button" style={{ flex: 1, justifyContent: 'center' }}>
                    Save Event
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

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
