'use client'

import { useState } from 'react'
import { ArrowDownRight, ArrowRight, ArrowUpRight, CalendarDays, Check, ChevronDown, Filter, Plus, Search, Settings2, Target, WalletCards, X, Zap, Home, Gauge } from 'lucide-react'

const navItems = [
  { label: 'Cockpit', href: '/', icon: Home },
  { label: 'Decision Lab', href: '/decision-lab', icon: Zap },
  { label: 'Money', href: '/money', icon: WalletCards },
  { label: 'Goals', href: '/goals', icon: Target },
  { label: 'Health', href: '/health', icon: Gauge },
]

const transactions = [
  { date: 'Today, 9 Jun', label: 'Food & drinks', category: 'Food', note: 'Corner Cafe', amount: '−₹340', tone: 'expense' },
  { date: '8 Jun', label: 'Freelance payout', category: 'Income', note: 'Client transfer', amount: '+₹2,400', tone: 'income' },
  { date: '5 Jun', label: 'Spotify renewal', category: 'Subscription', note: 'Monthly renewal', amount: '−₹199', tone: 'subscription' },
  { date: '3 Jun', label: 'Groceries', category: 'Essentials', note: 'Fresh Basket', amount: '−₹120', tone: 'expense' },
  { date: '1 Jun', label: 'Salary', category: 'Income', note: 'Acme Studio', amount: '+₹3,600', tone: 'income' },
]

const subscriptions = [
  { label: 'Spotify', detail: 'Music & podcasts', amount: '₹199', annual: '₹2,388/yr', renew: 'Renews in 26 days', color: 'violet' },
  { label: 'Netflix', detail: 'Entertainment', amount: '₹499', annual: '₹5,988/yr', renew: 'Renews in 12 days', color: 'danger' },
  { label: 'iCloud+', detail: 'Storage', amount: '₹75', annual: '₹900/yr', renew: 'Renews in 18 days', color: 'blue' },
]

function Sidebar() {
  return <nav className="sidebar money-sidebar" aria-label="Primary navigation"><div className="brand"><span className="brand-mark"><Zap size={15} fill="currentColor" /></span><span>Runway</span></div><div className="nav-items">{navItems.map(({ label, href, icon: Icon }) => <a href={href} key={label} className={`nav-link ${label === 'Money' ? 'active' : ''}`} aria-current={label === 'Money' ? 'page' : undefined}><Icon size={18} strokeWidth={1.8} /><span>{label}</span></a>)}</div><div className="sidebar-bottom"><a href="#" className="nav-link"><Settings2 size={18} /> Settings</a><div className="profile"><span className="avatar">AS</span><span><strong>Arjun S.</strong><small>Personal runway</small></span><ArrowRight size={15} /></div></div></nav>
}

function MobileNav() { return <nav className="mobile-nav" aria-label="Mobile navigation"><div className="mobile-nav-items">{navItems.map(({ label, href, icon: Icon }) => <a href={href} key={label} className={`nav-link ${label === 'Money' ? 'active' : ''}`}><Icon size={18} /><span>{label === 'Decision Lab' ? 'Lab' : label}</span></a>)}</div></nav> }

function TransactionIcon({ tone }: { tone: string }) { return <span className={`money-icon ${tone}`}>{tone === 'income' ? <ArrowDownRight size={16} /> : tone === 'subscription' ? <Zap size={15} /> : <ArrowUpRight size={16} />}</span> }

export default function MoneyPage() {
  const [tab, setTab] = useState('Transactions')
  const [search, setSearch] = useState('')
  const filtered = transactions.filter((item) => `${item.label} ${item.category} ${item.note}`.toLowerCase().includes(search.toLowerCase()))
  return <div className="app-shell"><Sidebar /><main className="main-content"><header className="topbar"><div className="topbar-left"><div><p className="eyebrow">YOUR RUNWAY</p><h1>Money</h1></div></div><div className="top-actions"><span className="day-pill"><span className="pulse-dot" /> Day 9 <span className="muted">of 30</span></span><button className="text-button"><CalendarDays size={15} /> June 2026 <ChevronDown size={13} /></button><button className="primary-button"><Plus size={17} /> Add transaction</button></div></header><div className="money-content"><section className="money-intro"><div><p className="eyebrow lime-text">LEDGER</p><h2>Where your fuel goes</h2><p>Every rupee in your runway, clearly accounted for.</p></div><div className="money-summary"><div><span className="muted">Spent this month</span><strong>₹2,100</strong><small className="safe-text"><ArrowDownRight size={13} /> 12% under pace</small></div><div><span className="muted">Income this month</span><strong>₹6,000</strong><small className="income-text">2 deposits</small></div></div></section><div className="money-tabs" role="tablist" aria-label="Money views">{['Transactions', 'Subscriptions', 'Commitments'].map((item) => <button key={item} role="tab" aria-selected={tab === item} className={tab === item ? 'active' : ''} onClick={() => setTab(item)}>{item}{item === 'Transactions' && <span>12</span>}{item === 'Subscriptions' && <span>3</span>}</button>)}</div>{tab === 'Transactions' && <section className="card money-table-card"><div className="money-toolbar"><div className="search-box"><Search size={15} /><input aria-label="Search transactions" placeholder="Search transactions" value={search} onChange={(e) => setSearch(e.target.value)} />{search && <button aria-label="Clear search" onClick={() => setSearch('')}><X size={14} /></button>}</div><button className="outline-button"><Filter size={14} /> Filter</button></div><div className="transaction-table" role="table" aria-label="Transactions"><div className="transaction-head" role="row"><span>Transaction</span><span>Category</span><span>Date</span><span>Amount</span></div>{filtered.map((item) => <div className="transaction-row" role="row" key={`${item.date}-${item.label}`}><div className="transaction-name"><TransactionIcon tone={item.tone} /><span><strong>{item.label}</strong><small>{item.note}</small></span></div><span className="category-pill">{item.category}</span><span className="muted">{item.date}</span><strong className={item.tone === 'income' ? 'income-text' : ''}>{item.amount}</strong></div>)}{filtered.length === 0 && <div className="empty-money">No transactions match that search.</div>}</div></section>}{tab === 'Subscriptions' && <section className="money-cards-grid">{subscriptions.map((item) => <article className="card subscription-card" key={item.label}><div className="subscription-top"><span className={`subscription-logo ${item.color}`}>{item.label[0]}</span><button className="icon-button" aria-label={`More options for ${item.label}`}><ChevronDown size={15} /></button></div><strong className="subscription-name">{item.label}</strong><p>{item.detail}</p><div className="subscription-price"><strong>{item.amount}<small>/month</small></strong><span>{item.annual}</span></div><div className="subscription-renew">{item.renew}<button>Simulate cancel <ArrowRight size={12} /></button></div></article>)}</section>}{tab === 'Commitments' && <section className="card commitment-card"><div className="section-heading"><div><p className="eyebrow lime-text">UPCOMING OBLIGATIONS</p><h2>Commitments</h2></div><button className="outline-button"><Plus size={14} /> Add commitment</button></div><div className="commitment-total"><span>Total due before day 30</span><strong>₹1,049</strong></div>{[['D12','Phone bill','₹850','Due in 3 days'],['D20','Internet','₹499','Due in 11 days'],['D28','Rent contribution','₹1,200','Due in 19 days']].map(([day,label,amount,due]) => <div className="commitment-row" key={label}><span className="event-day bill">{day}</span><span><strong>{label}</strong><small>{due}</small></span><strong>{amount}</strong><button className="icon-button" aria-label={`Mark ${label} paid`}><Check size={15} /></button></div>)}</section>}</div></main><MobileNav /></div>
}
