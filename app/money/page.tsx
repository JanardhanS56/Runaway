'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  Filter,
  Gauge,
  Home,
  Plus,
  RotateCcw,
  Search,
  Settings2,
  Target,
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
            className={`nav-link ${label === 'Money' ? 'active' : ''}`}
            aria-current={label === 'Money' ? 'page' : undefined}
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
            className={`nav-link ${label === 'Money' ? 'active' : ''}`}
          >
            <Icon size={18} />
            <span>{label === 'Decision Lab' ? 'Lab' : label}</span>
          </a>
        ))}
      </div>
    </nav>
  )
}

function TransactionIcon({ tone }: { tone: string }) {
  return (
    <span className={`money-icon ${tone}`}>
      {tone === 'income' ? (
        <ArrowDownRight size={16} />
      ) : tone === 'subscription' ? (
        <Zap size={15} />
      ) : (
        <ArrowUpRight size={16} />
      )}
    </span>
  )
}

export default function MoneyPage() {
  const router = useRouter()
  const transactions = useRunwayStore((s) => s.transactions)
  const subscriptions = useRunwayStore((s) => s.subscriptions)
  const commitments = useRunwayStore((s) => s.commitments)
  const currentDay = useRunwayStore((s) => s.currentDay)
  const cancelSubscription = useRunwayStore((s) => s.cancelSubscription)
  const payCommitment = useRunwayStore((s) => s.payCommitment)

  const [tab, setTab] = useState('Transactions')
  const [search, setSearch] = useState('')
  const [cmdOpen, setCmdOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const filtered = transactions.filter((item) =>
    `${item.label} ${item.category} ${item.note}`.toLowerCase().includes(search.toLowerCase())
  )

  const totalSpent = transactions
    .filter((t) => t.numAmount < 0)
    .reduce((sum, t) => sum + Math.abs(t.numAmount), 0)

  const totalIncome = transactions
    .filter((t) => t.numAmount > 0)
    .reduce((sum, t) => sum + t.numAmount, 0)

  const unpaidCommitmentsTotal = commitments
    .filter((c) => !c.paid)
    .reduce((sum, c) => sum + c.amount, 0)

  const handleSimulateCancel = (sub: typeof subscriptions[0]) => {
    router.push(`/decision-lab?cancel=${encodeURIComponent(sub.label)}&amount=${sub.amount}`)
  }

  const handlePay = (id: string, label: string) => {
    payCommitment(id)
    setToastMessage(`Marked ${label} as paid!`)
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
              <h1>Money</h1>
            </div>
          </div>
          <div className="top-actions">
            <span className="day-pill">
              <span className="pulse-dot" /> Day {currentDay} <span className="muted">of 30</span>
            </span>
            <button className="primary-button" onClick={() => setCmdOpen(true)}>
              <Plus size={17} /> Add transaction (⌘K)
            </button>
          </div>
        </header>

        <div className="money-content">
          <section className="money-intro">
            <div>
              <p className="eyebrow lime-text">LEDGER</p>
              <h2>Where your fuel goes</h2>
              <p>Every rupee in your runway, clearly accounted for.</p>
            </div>
            <div className="money-summary">
              <div>
                <span className="muted">Spent this month</span>
                <strong>₹{totalSpent.toLocaleString('en-IN')}</strong>
                <small className="safe-text">
                  <ArrowDownRight size={13} /> Active ledger tracking
                </small>
              </div>
              <div>
                <span className="muted">Income recorded</span>
                <strong>₹{totalIncome.toLocaleString('en-IN')}</strong>
                <small className="income-text">Verified deposits</small>
              </div>
            </div>
          </section>

          {/* Navigation Tabs */}
          <div className="money-tabs" role="tablist" aria-label="Money views">
            {['Transactions', 'Subscriptions', 'Commitments'].map((item) => (
              <button
                key={item}
                role="tab"
                aria-selected={tab === item}
                className={tab === item ? 'active' : ''}
                onClick={() => setTab(item)}
              >
                {item}
                {item === 'Transactions' && <span>{transactions.length}</span>}
                {item === 'Subscriptions' && <span>{subscriptions.length}</span>}
                {item === 'Commitments' && <span>{commitments.filter((c) => !c.paid).length}</span>}
              </button>
            ))}
          </div>

          {/* Transactions Tab */}
          {tab === 'Transactions' && (
            <section className="card money-table-card">
              <div className="money-toolbar">
                <div className="search-box">
                  <Search size={15} />
                  <input
                    aria-label="Search transactions"
                    placeholder="Search by name, category, or note..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  {search && (
                    <button aria-label="Clear search" onClick={() => setSearch('')}>
                      <X size={14} />
                    </button>
                  )}
                </div>
                <button className="outline-button" onClick={() => setCmdOpen(true)}>
                  <Plus size={14} /> Quick Entry
                </button>
              </div>

              <div className="transaction-table" role="table" aria-label="Transactions">
                <div className="transaction-head" role="row">
                  <span>Transaction</span>
                  <span>Category</span>
                  <span>Day / Date</span>
                  <span>Amount</span>
                </div>
                {filtered.map((item) => (
                  <div className="transaction-row" role="row" key={item.id}>
                    <div className="transaction-name">
                      <TransactionIcon tone={item.tone} />
                      <div>
                        <strong>{item.label}</strong>
                        <small>{item.note}</small>
                      </div>
                    </div>
                    <span className="category-pill">{item.category}</span>
                    <span className="muted">{item.date}</span>
                    <strong className={item.tone === 'income' ? 'income-text' : item.tone === 'shock' ? 'danger-text' : ''}>
                      {item.amount}
                    </strong>
                  </div>
                ))}
                {filtered.length === 0 && (
                  <div style={{ padding: '32px', textAlign: 'center', color: 'var(--muted)', fontSize: '13px' }}>
                    No transactions match your search.
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Subscriptions Tab */}
          {tab === 'Subscriptions' && (
            <section className="money-cards-grid">
              {subscriptions.map((item) => (
                <article className="card subscription-card" key={item.id}>
                  <div className="subscription-top">
                    <span className={`subscription-logo ${item.color}`}>{item.label[0]}</span>
                    <span style={{ fontSize: '11px', color: item.active ? 'var(--safe)' : 'var(--muted)', fontWeight: 600 }}>
                      {item.active ? '● Active' : '○ Cancelled'}
                    </span>
                  </div>
                  <strong className="subscription-name">{item.label}</strong>
                  <p>{item.detail}</p>
                  <div className="subscription-price">
                    <strong>
                      ₹{item.amount}
                      <small>/month</small>
                    </strong>
                    <span>{item.annual}</span>
                  </div>
                  <div className="subscription-renew">
                    <span>Renews Day {item.renewDay}</span>
                    {item.active ? (
                      <button onClick={() => handleSimulateCancel(item)}>
                        Simulate cancel <ArrowRight size={12} />
                      </button>
                    ) : (
                      <span className="muted">Saved ₹{item.amount}/mo</span>
                    )}
                  </div>
                </article>
              ))}
            </section>
          )}

          {/* Commitments Tab */}
          {tab === 'Commitments' && (
            <section className="card commitment-card">
              <div className="section-heading">
                <div>
                  <p className="eyebrow lime-text">UPCOMING OBLIGATIONS</p>
                  <h2>Commitments</h2>
                </div>
                <button className="outline-button" onClick={() => setCmdOpen(true)}>
                  <Plus size={14} /> Add commitment
                </button>
              </div>
              <div className="commitment-total">
                <span>Total upcoming before day 30</span>
                <strong>₹{unpaidCommitmentsTotal.toLocaleString('en-IN')}</strong>
              </div>
              {commitments.map((item) => (
                <div className="commitment-row" key={item.id}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span className="event-day bill">D{item.day}</span>
                    <span>
                      <strong style={{ textDecoration: item.paid ? 'line-through' : 'none' }}>
                        {item.label}
                      </strong>
                      <small>{item.paid ? 'Paid' : item.dueText}</small>
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <strong>₹{item.amount.toLocaleString('en-IN')}</strong>
                    {!item.paid ? (
                      <button
                        className="icon-button"
                        onClick={() => handlePay(item.id, item.label)}
                        title="Mark paid"
                      >
                        <Check size={15} />
                      </button>
                    ) : (
                      <span style={{ fontSize: '11px', color: 'var(--safe)', fontWeight: 600 }}>✓ Paid</span>
                    )}
                  </div>
                </div>
              ))}
            </section>
          )}
        </div>

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
