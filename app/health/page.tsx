'use client'

import { useState } from 'react'
import { ArrowRight, CalendarDays, Check, ChevronDown, Gauge, Home, ShieldCheck, Target, WalletCards, Zap } from 'lucide-react'

const navItems = [
  { label: 'Cockpit', href: '/', icon: Home },
  { label: 'Decision Lab', href: '/decision-lab', icon: Zap },
  { label: 'Money', href: '/money', icon: WalletCards },
  { label: 'Goals', href: '/goals', icon: Target },
  { label: 'Health', href: '/health', icon: Gauge },
]

const components = [
  { label: 'Runway', score: 91, weight: '25%', reason: 'Your projected balance stays above the ₹1,000 shock buffer.', color: 'lime' },
  { label: 'Spend pace', score: 84, weight: '20%', reason: 'You are ₹340 ahead of your expected pace this month.', color: 'safe' },
  { label: 'Savings progress', score: 76, weight: '20%', reason: 'Two of three goals are on track for their target dates.', color: 'violet' },
  { label: 'Commitment coverage', score: 88, weight: '15%', reason: 'Upcoming bills are covered with ₹2,480 left after commitments.', color: 'blue' },
  { label: 'Risk exposure', score: 72, weight: '15%', reason: 'There is a 14% chance of running short before day 30.', color: 'warning' },
  { label: 'Subscriptions', score: 64, weight: '5%', reason: 'Subscriptions are 14% of your budget; aim for under 10%.', color: 'danger' },
]

function Sidebar() { return <nav className="sidebar" aria-label="Primary navigation"><div className="brand"><span className="brand-mark"><Zap size={15} fill="currentColor" /></span><span>Runway</span></div><div className="nav-items">{navItems.map(({ label, href, icon: Icon }) => <a href={href} key={label} className={`nav-link ${label === 'Health' ? 'active' : ''}`} aria-current={label === 'Health' ? 'page' : undefined}><Icon size={18} strokeWidth={1.8} /><span>{label}</span></a>)}</div><div className="sidebar-bottom"><a href="#" className="nav-link"><Gauge size={18} /> Settings</a><div className="profile"><span className="avatar">AS</span><span><strong>Arjun S.</strong><small>Personal runway</small></span><ArrowRight size={15} /></div></div></nav> }
function MobileNav() { return <nav className="mobile-nav" aria-label="Mobile navigation"><div className="mobile-nav-items">{navItems.map(({ label, href, icon: Icon }) => <a href={href} key={label} className={`nav-link ${label === 'Health' ? 'active' : ''}`}><Icon size={18} /><span>{label === 'Decision Lab' ? 'Lab' : label}</span></a>)}</div></nav> }

export default function HealthPage() {
  const [expanded, setExpanded] = useState<string | null>(null)
  return <div className="app-shell"><Sidebar /><main className="main-content"><header className="topbar"><div><p className="eyebrow">YOUR RUNWAY</p><h1>Health</h1></div><div className="top-actions"><span className="day-pill"><span className="pulse-dot" /> Day 9 <span className="muted">of 30</span></span><button className="text-button"><CalendarDays size={15} /> June 2026 <ChevronDown size={13} /></button></div></header><div className="health-content"><section className="health-intro"><div><p className="eyebrow lime-text">FINANCIAL HEALTH</p><h2>A clearer view of your runway.</h2><p>Your score is explainable, actionable, and built from the decisions already on your ledger.</p></div><div className="health-score"><div className="score-ring"><strong>82</strong><span>/ 100</span></div><div><span className="health-status"><Check size={13} /> Healthy</span><small>Up 6 points this month</small></div></div></section><section className="health-layout"><div className="card health-breakdown"><div className="card-heading"><div><p className="eyebrow">SCORE BREAKDOWN</p><h3>What is driving your score?</h3></div><span className="score-date">Updated today</span></div><div className="health-bars">{components.map((item) => <button className={`health-row ${expanded === item.label ? 'open' : ''}`} key={item.label} onClick={() => setExpanded(expanded === item.label ? null : item.label)} aria-expanded={expanded === item.label}><span className={`health-dot ${item.color}`} /><span className="health-row-copy"><strong>{item.label}</strong><small>{item.weight} of score</small></span><span className="health-track"><span className={item.color} style={{ width: `${item.score}%` }} /></span><strong className="health-number">{item.score}</strong><ChevronDown size={15} className="health-chevron" />{expanded === item.label && <span className="health-reason">{item.reason}</span>}</button>)}</div></div><aside className="health-side"><div className="card health-tip-card"><span className="tip-icon"><ShieldCheck size={18} /></span><p className="eyebrow violet-text">ONE THING TO TRY</p><h3>Trim one recurring cost.</h3><p>Reducing subscriptions by ₹199 would lift your score by about 3 points and add room to your daily allowance.</p><button className="outline-button" onClick={() => setExpanded('Subscriptions')}>Review subscriptions <ArrowRight size={13} /></button></div><div className="card health-check-card"><div className="card-heading"><div><p className="eyebrow">THIS MONTH</p><h3>Strong foundations</h3></div><span className="check-badge"><Check size={14} /></span></div><ul><li><Check size={13} /> Bills are covered</li><li><Check size={13} /> Emergency buffer is growing</li><li><Check size={13} /> Spend pace is under control</li></ul></div></aside></section><section className="health-note"><span><Gauge size={15} /></span><p><strong>Health is not a judgment.</strong> It is a signal that helps you decide what to do next while there is still time to change the outcome.</p></section></div></main><MobileNav /></div>
}
