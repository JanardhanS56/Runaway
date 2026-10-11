'use client'

import { useState } from 'react'
import {
  ArrowDownRight,
  ArrowRight,
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
  Settings2,
  Target,
  TrendingUp,
  WalletCards,
  Zap,
} from 'lucide-react'

const navItems = [
  { label: 'Cockpit', href: '/', icon: Home },
  { label: 'Decision Lab', href: '/decision-lab', icon: Zap },
  { label: 'Money', href: '/money', icon: WalletCards },
  { label: 'Goals', href: '/goals', icon: Target },
  { label: 'Health', href: '/health', icon: Gauge },
]

const events = [
  { day: 1, amount: '₹2,400', label: 'Freelance payout', tone: 'income' },
  { day: 3, amount: '−₹120', label: 'Groceries', tone: 'expense' },
  { day: 5, amount: '−₹199', label: 'Spotify renewal', tone: 'expense' },
  { day: 9, amount: '−₹340', label: 'Food & drinks', tone: 'expense' },
  { day: 12, amount: '−₹850', label: 'Phone bill', tone: 'bill' },
  { day: 16, amount: '₹3,600', label: 'Salary', tone: 'income' },
]

function Sidebar({ mobile = false }: { mobile?: boolean }) {
  return <nav className={mobile ? 'mobile-nav' : 'sidebar'} aria-label="Primary navigation">
    {!mobile && <div className="brand"><span className="brand-mark"><Zap size={15} fill="currentColor" /></span><span>Runway</span></div>}
    <div className={mobile ? 'mobile-nav-items' : 'nav-items'}>{navItems.map(({ label, href, icon: Icon }) => <a href={href} key={label} className={`nav-link ${label === 'Cockpit' ? 'active' : ''}`} aria-current={label === 'Cockpit' ? 'page' : undefined}><Icon size={18} strokeWidth={1.8} /><span>{mobile && label === 'Decision Lab' ? 'Lab' : label}</span></a>)}</div>
    {!mobile && <div className="sidebar-bottom"><a href="#" className="nav-link"><Settings2 size={18} /> Settings</a><div className="profile"><span className="avatar">AS</span><span><strong>Arjun S.</strong><small>Personal runway</small></span><ChevronRight size={15} /></div></div>}
  </nav>
}

function Topbar() {
  return <header className="topbar"><div className="topbar-left"><button className="icon-button menu-button" aria-label="Open menu"><Menu size={20} /></button><div><p className="eyebrow">YOUR RUNWAY</p><h1>Cockpit</h1></div></div><div className="top-actions"><span className="day-pill"><span className="pulse-dot" /> Day 9 <span className="muted">of 30</span></span><button className="text-button"><CalendarDays size={15} /> Advance day</button><button className="text-button subtle">Fast-forward <ArrowRight size={15} /></button><button className="icon-button" aria-label="Toggle theme"><Moon size={18} /></button><button className="primary-button"><Plus size={17} /> Quick add</button></div></header>
}

function DayStrip() {
  const [activeDay, setActiveDay] = useState(9)
  return <section className="day-strip-section" aria-labelledby="days-heading"><div className="section-heading"><div><p className="eyebrow lime-text">TIME MACHINE</p><h2 id="days-heading">Your 30-day runway</h2></div><span className="muted small-copy">Click a day to inspect</span></div><div className="day-strip" role="list" aria-label="Runway days">{Array.from({ length: 30 }, (_, index) => { const day = index + 1; const status = day < 9 ? (day === 3 || day === 5 ? 'spent' : 'healthy') : day === 9 ? 'today' : day > 22 ? 'risk' : 'future'; return <button key={day} className={`day-cell ${status} ${activeDay === day ? 'selected' : ''}`} onClick={() => setActiveDay(day)} aria-label={`Day ${day}${day === 9 ? ', today' : ''}`} aria-pressed={activeDay === day}><span>{day}</span></button> })}</div><div className="day-strip-key"><span><i className="key-dot healthy" /> Ahead of pace</span><span><i className="key-dot spent" /> Spent today</span><span><i className="key-dot risk" /> Risk building</span></div></section>
}

function HeroAllowance() {
  return <section className="hero-grid"><article className="card allowance-card"><div className="allowance-copy"><p className="eyebrow lime-text">SAFE TO SPEND TODAY</p><div className="allowance-number">₹187<span>/ day</span></div><p className="hero-caption"><TrendingUp size={15} /> You&apos;re ₹340 ahead of pace</p></div><div className="allowance-ring" aria-label="62 percent of today's allowance used"><div><strong>62%</strong><small>used</small></div></div><div className="allowance-footer"><span>Today&apos;s allowance</span><strong>₹300</strong><span className="divider-dot" /><span>Left to spend</span><strong className="lime-text">₹187</strong></div></article><article className="card balance-card"><div className="card-heading"><div><p className="eyebrow violet-text">CURRENT BALANCE</p><h2>₹5,400</h2></div><span className="balance-icon"><WalletCards size={17} /></span></div><div className="balance-meta"><span><i className="tiny-dot income" /> Income this month</span><strong>₹6,000</strong></div><div className="balance-meta"><span><i className="tiny-dot expense" /> Spent so far</span><strong>₹2,100</strong></div><div className="mini-progress"><span /></div><p className="muted balance-note">70% of your starting fuel remains</p></article></section>
}

function RunwayChart() {
  return <section className="card runway-card" aria-labelledby="runway-heading"><div className="chart-header"><div><p className="eyebrow violet-text">FORECAST</p><h2 id="runway-heading">Balance over 30 days</h2></div><button className="outline-button">View as table <ArrowRight size={14} /></button></div><div className="chart-legend"><span><i className="legend-line real" /> Your balance</span><span><i className="legend-line band" /> Confidence range</span><span><i className="legend-dot" /> Today</span></div><div className="chart-wrap"><svg viewBox="0 0 760 270" role="img" aria-labelledby="chart-title chart-desc" preserveAspectRatio="none"><title id="chart-title">Thirty day balance forecast</title><desc id="chart-desc">Your balance trends from 5,400 rupees today to an estimated 1,180 rupees on day 30.</desc><defs><linearGradient id="chartBand" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#C6F432" stopOpacity=".15" /><stop offset="1" stopColor="#C6F432" stopOpacity="0" /></linearGradient></defs><g className="grid-lines"><line x1="34" y1="38" x2="740" y2="38" /><line x1="34" y1="92" x2="740" y2="92" /><line x1="34" y1="146" x2="740" y2="146" /><line x1="34" y1="200" x2="740" y2="200" /></g><path className="band-area" d="M34 63 C180 78 230 81 310 105 C420 130 535 143 740 184 L740 38 C570 44 450 49 310 66 C180 45 100 45 34 38Z" fill="url(#chartBand)" /><path className="real-line" d="M34 63 C180 78 230 81 310 105 C420 130 535 143 740 184" /><line className="today-line" x1="225" y1="25" x2="225" y2="225" /><circle className="today-point" cx="225" cy="80" r="5" /><text x="2" y="42">₹6k</text><text x="2" y="96">₹4k</text><text x="2" y="150">₹2k</text><text x="7" y="204">₹0</text><text x="31" y="248">Day 1</text><text x="213" y="248">9</text><text x="375" y="248">16</text><text x="535" y="248">23</text><text x="701" y="248">30</text></svg></div><p className="chart-note"><span className="note-check"><Check size={12} /></span> Your forecast stays above the ₹1,000 shock cushion.</p></section>
}

function Upcoming() { return <section className="card upcoming-card"><div className="section-heading"><div><p className="eyebrow lime-text">UP NEXT</p><h2>Upcoming commitments</h2></div><button className="icon-button" aria-label="View all commitments"><ArrowRight size={17} /></button></div><div className="event-list">{events.slice(3, 6).map(event => <div className="event-row" key={event.label}><div className={`event-day ${event.tone}`}>D{event.day}</div><div className="event-copy"><strong>{event.label}</strong><small>Due in {event.day - 9} days</small></div><strong className={event.tone === 'income' ? 'income-text' : ''}>{event.amount}</strong></div>)}</div></section> }

function Goals() { return <section className="card goals-card"><div className="section-heading"><div><p className="eyebrow violet-text">SAVING WITH INTENT</p><h2>Goals</h2></div><button className="icon-button" aria-label="View all goals"><ArrowRight size={17} /></button></div><div className="goal-row"><div className="goal-icon">⌁</div><div className="goal-copy"><strong>Headphones</strong><small>₹3,200 of ₹5,000</small><div className="goal-progress"><span /></div></div><div className="goal-eta"><strong>Day 24</strong><small>on track</small></div></div><div className="goal-row"><div className="goal-icon violet">⌂</div><div className="goal-copy"><strong>Emergency buffer</strong><small>₹1,000 of ₹2,500</small><div className="goal-progress violet-progress"><span /></div></div><div className="goal-eta"><strong>Day 30</strong><small>68% pace</small></div></div></section> }

export default function Page() { return <div className="app-shell"><Sidebar /><main className="main-content"><Topbar /><div className="mobile-day"><span className="pulse-dot" /> Day 9 <span className="muted">of 30</span></div><div className="cockpit-content"><DayStrip /><HeroAllowance /><div className="dashboard-grid"><RunwayChart /><div className="side-stack"><Upcoming /><Goals /></div></div></div></main><Sidebar mobile /></div> }
