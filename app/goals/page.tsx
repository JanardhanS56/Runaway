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
  Plus,
  RotateCcw,
  Settings2,
  Target,
  WalletCards,
  X,
  Zap,
} from 'lucide-react'
import { useRunwayStore } from '@/src/store/useRunwayStore'
import { ShockModal } from '@/src/components/ShockModal'
import { CommandPalette } from '@/src/components/CommandPalette'
import { useHydrated } from '@/src/lib/useHydrated'

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
            className={`nav-link ${label === 'Goals' ? 'active' : ''}`}
            aria-current={label === 'Goals' ? 'page' : undefined}
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
            className={`nav-link ${label === 'Goals' ? 'active' : ''}`}
          >
            <Icon size={18} />
            <span>{label === 'Decision Lab' ? 'Lab' : label}</span>
          </a>
        ))}
      </div>
    </nav>
  )
}

export default function GoalsPage() {
  const goals = useRunwayStore((s) => s.goals)
  const goalPace = useRunwayStore((s) => s.goalPace)
  const setGoalPace = useRunwayStore((s) => s.setGoalPace)
  const addGoal = useRunwayStore((s) => s.addGoal)
  const currentDay = useRunwayStore((s) => s.currentDay)
  const getDailyAllowance = useRunwayStore((s) => s.getDailyAllowance)

  const hydrated = useHydrated()
  const [newGoalOpen, setNewGoalOpen] = useState(false)
  const [goalName, setGoalName] = useState('')
  const [goalTarget, setGoalTarget] = useState('')
  const [goalInitial, setGoalInitial] = useState('')
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [cmdOpen, setCmdOpen] = useState(false)

  const totalSaved = hydrated ? goals.reduce((sum, goal) => sum + goal.saved, 0) : 0
  const totalTarget = hydrated ? goals.reduce((sum, goal) => sum + goal.target, 0) : 0
  const dailyAllowance = hydrated ? getDailyAllowance() : 0

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault()
    if (!goalName || !goalTarget) return

    addGoal({
      name: goalName,
      detail: 'Personal savings goal',
      saved: Number(goalInitial) || 0,
      target: Number(goalTarget),
      eta: '45 days',
      color: goals.length % 2 === 0 ? 'violet' : 'blue',
      priority: 'Active',
    })

    setGoalName('')
    setGoalTarget('')
    setGoalInitial('')
    setNewGoalOpen(false)
    setToastMessage(`Goal "${goalName}" created!`)
    setTimeout(() => setToastMessage(null), 2500)
  }

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <div>
              <p className="eyebrow">YOUR RUNWAY</p>
              <h1>Goals</h1>
            </div>
          </div>
          <div className="top-actions">
            <span className="day-pill">
              <span className="pulse-dot" /> Day {currentDay} <span className="muted">of 30</span>
            </span>
            <button className="primary-button" onClick={() => setNewGoalOpen(true)}>
              <Plus size={17} /> Add goal
            </button>
          </div>
        </header>

        <div className="goals-content">
          <section className="goals-intro">
            <div>
              <p className="eyebrow lime-text">SAVINGS PLAN</p>
              <h2>Make room for what matters.</h2>
              <p>Small, intentional transfers turn today&apos;s runway into tomorrow&apos;s options.</p>
            </div>
            <div className="goal-total">
              <span className="muted">Saved across goals</span>
              <strong>₹{totalSaved.toLocaleString('en-IN')}</strong>
              <small>
                {Math.round((totalSaved / totalTarget) * 100)}% of your ₹{totalTarget.toLocaleString('en-IN')} total target
              </small>
            </div>
          </section>

          <section className="goals-overview">
            <div className="card goal-summary-card">
              <div className="summary-heading">
                <div>
                  <p className="eyebrow">TOTAL PROGRESS</p>
                  <h3>
                    ₹{totalSaved.toLocaleString('en-IN')}{' '}
                    <span>of ₹{totalTarget.toLocaleString('en-IN')}</span>
                  </h3>
                </div>
                <span className="summary-icon">
                  <Target size={17} />
                </span>
              </div>
              <div className="progress-track">
                <span style={{ width: `${Math.min(100, (totalSaved / totalTarget) * 100)}%` }} />
              </div>
              <div className="summary-footer">
                <span>
                  <Check size={13} /> You&apos;re on track
                </span>
                <strong>₹{goalPace.toLocaleString('en-IN')} / month pace</strong>
              </div>
            </div>

            {/* Tradeoff Slider connected to Store */}
            <div className="card tradeoff-card">
              <p className="eyebrow violet-text">THE TRADE-OFF</p>
              <h3>How ambitious should we be?</h3>
              <p>More saved now means less daily spending room.</p>
              <label htmlFor="pace">
                Monthly goal pace <strong>₹{goalPace.toLocaleString('en-IN')}</strong>
              </label>
              <input
                id="pace"
                type="range"
                min="200"
                max="1200"
                step="50"
                value={goalPace}
                onChange={(event) => setGoalPace(Number(event.target.value))}
              />
              <div className="range-labels">
                <span>More daily breathing room</span>
                <span>Faster goal completion</span>
              </div>
              <div className="allowance-impact">
                <span>Live Daily Allowance</span>
                <strong className="lime-text">₹{dailyAllowance} / day</strong>
                <small>
                  {goalPace > 600 ? 'Aggressive pace' : 'Balanced pace'}
                </small>
              </div>
            </div>
          </section>

          <div className="section-heading goals-section-heading">
            <div>
              <p className="eyebrow">YOUR GOALS</p>
              <h2>Progress, not pressure.</h2>
            </div>
            <button className="outline-button" onClick={() => setNewGoalOpen(true)}>
              <Plus size={14} /> New goal
            </button>
          </div>

          <section className="goal-list">
            {goals.map((goal) => {
              const progress = Math.min(100, Math.round((goal.saved / goal.target) * 100))
              return (
                <article className="card goal-card" key={goal.id}>
                  <div className={`goal-orb ${goal.color}`}>
                    <Target size={19} />
                  </div>
                  <div className="goal-main">
                    <div className="goal-title">
                      <div>
                        <span className="goal-priority">{goal.priority}</span>
                        <h3>{goal.name}</h3>
                        <p>{goal.detail}</p>
                      </div>
                    </div>
                    <div className="goal-numbers">
                      <strong>₹{goal.saved.toLocaleString('en-IN')}</strong>
                      <span>of ₹{goal.target.toLocaleString('en-IN')}</span>
                      <b>{progress}%</b>
                    </div>
                    <div className="goal-progress">
                      <span className={goal.color} style={{ width: `${progress}%` }} />
                    </div>
                    <div className="goal-meta">
                      <span>Estimated completion <strong>{goal.eta}</strong></span>
                      <span className="muted">On schedule</span>
                    </div>
                  </div>
                </article>
              )
            })}
          </section>
        </div>

        {/* Create Goal Modal */}
        {newGoalOpen && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', display: 'grid', placeItems: 'center', zIndex: 100 }}>
            <div className="card" style={{ width: '90%', maxWidth: '420px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, font: '700 18px Sora' }}>Create New Savings Goal</h3>
                <button className="icon-button" onClick={() => setNewGoalOpen(false)}>
                  <X size={16} />
                </button>
              </div>
              <form onSubmit={handleCreateGoal} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div className="form-group">
                  <label>Goal Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. New Headphones, Goa Trip"
                    value={goalName}
                    onChange={(e) => setGoalName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Target Amount (₹)</label>
                  <input
                    type="number"
                    required
                    placeholder="5000"
                    value={goalTarget}
                    onChange={(e) => setGoalTarget(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Initial Contribution (₹)</label>
                  <input
                    type="number"
                    placeholder="500"
                    value={goalInitial}
                    onChange={(e) => setGoalInitial(e.target.value)}
                  />
                </div>
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button type="button" className="outline-button" style={{ flex: 1 }} onClick={() => setNewGoalOpen(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="primary-button" style={{ flex: 1, justifyContent: 'center' }}>
                    Save Goal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <ShockModal />
        <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />

        {toastMessage && (
          <div className="goal-toast" role="status">
            <span><Check size={14} /> {toastMessage}</span>
            <button aria-label="Dismiss" onClick={() => setToastMessage(null)}>
              <X size={14} />
            </button>
          </div>
        )}
      </main>
      <MobileNav />
    </div>
  )
}
