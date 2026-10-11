'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  Command,
  CornerDownLeft,
  Gauge,
  HelpCircle,
  Home,
  Plus,
  RotateCcw,
  Search,
  Sparkles,
  Target,
  WalletCards,
  X,
  Zap,
} from 'lucide-react'
import { useRunwayStore } from '@/src/store/useRunwayStore'

export function CommandPalette({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [feedback, setFeedback] = useState<string | null>(null)

  const addTransaction = useRunwayStore((s) => s.addTransaction)
  const triggerRandomShock = useRunwayStore((s) => s.triggerRandomShock)
  const resetDemo = useRunwayStore((s) => s.resetDemo)
  const currentDay = useRunwayStore((s) => s.currentDay)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        if (isOpen) {
          onClose()
        } else {
          // Trigger open via custom event or prop
          window.dispatchEvent(new CustomEvent('open-command-palette'))
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const parseAndExecute = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = query.trim().toLowerCase()
    if (!trimmed) return

    // Quick navigation commands
    if (trimmed === 'cockpit' || trimmed === 'home') {
      router.push('/')
      onClose()
      return
    }
    if (trimmed === 'lab' || trimmed === 'decision lab') {
      router.push('/decision-lab')
      onClose()
      return
    }
    if (trimmed === 'money' || trimmed === 'ledger') {
      router.push('/money')
      onClose()
      return
    }
    if (trimmed === 'goals') {
      router.push('/goals')
      onClose()
      return
    }
    if (trimmed === 'health') {
      router.push('/health')
      onClose()
      return
    }
    if (trimmed === 'shock' || trimmed === 'life happens') {
      triggerRandomShock()
      onClose()
      return
    }
    if (trimmed === 'reset' || trimmed === 'reset demo') {
      resetDemo()
      setFeedback('Demo reset to initial Day 9 state!')
      setTimeout(() => {
        setFeedback(null)
        onClose()
      }, 1000)
      return
    }

    // Natural Language / Regex match: e.g. "120 chai", "450 lunch day 10", "+2500 bonus", "850 wifi bill"
    const regex = /^(?:([+-])?\s*(?:₹|rs\.?)?\s*(\d+(?:\.\d+)?))\s+([a-zA-Z0-9\s&'-]+?)(?:\s+(?:on\s+)?day\s+(\d+))?$/i
    const match = trimmed.match(regex)

    if (match) {
      const sign = match[1]
      const amount = parseFloat(match[2])
      let label = match[3].trim()
      const targetDay = match[4] ? parseInt(match[4], 10) : currentDay

      let isIncome = sign === '+' || label.includes('income') || label.includes('salary') || label.includes('payout')
      let isBill = label.includes('bill') || label.includes('recharge') || label.includes('wifi')

      addTransaction({
        label: label.charAt(0).toUpperCase() + label.slice(1),
        amount,
        type: isIncome ? 'income' : isBill ? 'bill' : 'expense',
        day: targetDay,
      })

      setFeedback(`Logged ₹${amount} for "${label}" on Day ${targetDay}`)
      setTimeout(() => {
        setFeedback(null)
        setQuery('')
        onClose()
      }, 900)
    } else {
      // Fallback: try parsing word amount e.g. "chai 120"
      const reversedRegex = /^([a-zA-Z0-9\s&'-]+?)\s+(?:₹|rs\.?)?\s*(\d+(?:\.\d+)?)$/i
      const revMatch = trimmed.match(reversedRegex)
      if (revMatch) {
        const label = revMatch[1].trim()
        const amount = parseFloat(revMatch[2])
        addTransaction({
          label: label.charAt(0).toUpperCase() + label.slice(1),
          amount,
          type: 'expense',
          day: currentDay,
        })
        setFeedback(`Logged ₹${amount} for "${label}" on Day ${currentDay}`)
        setTimeout(() => {
          setFeedback(null)
          setQuery('')
          onClose()
        }, 900)
      } else {
        setFeedback('Could not parse. Try: "120 chai", "+2000 payout", or "shock"')
      }
    }
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(5, 7, 10, 0.85)',
      backdropFilter: 'blur(8px)',
      display: 'grid',
      placeItems: 'center',
      zIndex: 250,
      padding: '16px'
    }}>
      <div className="card" style={{
        maxWidth: '560px',
        width: '100%',
        padding: '20px',
        border: '1px solid rgba(198, 244, 50, 0.3)',
        boxShadow: '0 16px 50px rgba(0, 0, 0, 0.7)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'var(--primary)', color: '#0B0D12', display: 'grid', placeItems: 'center' }}>
              <Command size={16} />
            </span>
            <span style={{ font: '700 15px Sora', letterSpacing: '-0.02em' }}>Quick Command & Natural Add</span>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close command palette">
            <X size={16} />
          </button>
        </div>

        <form onSubmit={parseAndExecute}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '10px 16px',
            marginBottom: '12px'
          }}>
            <Search size={18} className="muted" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setFeedback(null)
              }}
              placeholder='Type "120 chai", "+2400 payout", "shock", or "lab"...'
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--foreground)',
                fontSize: '14px',
                width: '100%',
                outline: 'none'
              }}
            />
            <span style={{ fontSize: '10px', color: 'var(--muted)', background: 'rgba(255,255,255,0.06)', padding: '2px 6px', borderRadius: '4px' }}>
              Enter ↵
            </span>
          </div>
        </form>

        {feedback && (
          <div style={{
            padding: '8px 12px',
            borderRadius: '8px',
            background: feedback.includes('Logged') || feedback.includes('reset') ? 'rgba(52, 211, 153, 0.15)' : 'rgba(251, 191, 36, 0.15)',
            color: feedback.includes('Logged') || feedback.includes('reset') ? 'var(--safe)' : 'var(--warning)',
            fontSize: '12px',
            fontWeight: 600,
            marginBottom: '12px'
          }}>
            {feedback}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <p className="eyebrow" style={{ fontSize: '9px', marginBottom: '4px' }}>POPULAR ACTIONS & SYNTAX</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <button
              onClick={() => { setQuery('120 chai'); }}
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: '8px', padding: '8px 10px', textAlign: 'left', cursor: 'pointer', color: 'var(--foreground)' }}
            >
              <strong style={{ display: 'block', fontSize: '11px' }}>120 chai</strong>
              <small style={{ color: 'var(--muted)', fontSize: '10px' }}>Log expense instantly</small>
            </button>
            <button
              onClick={() => { triggerRandomShock(); onClose(); }}
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(251, 113, 133, 0.3)', borderRadius: '8px', padding: '8px 10px', textAlign: 'left', cursor: 'pointer', color: 'var(--danger)' }}
            >
              <strong style={{ display: 'block', fontSize: '11px' }}>Trigger Shock</strong>
              <small style={{ color: 'var(--muted)', fontSize: '10px' }}>Life happens surprise</small>
            </button>
            <button
              onClick={() => { router.push('/decision-lab'); onClose(); }}
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: '8px', padding: '8px 10px', textAlign: 'left', cursor: 'pointer', color: 'var(--violet)' }}
            >
              <strong style={{ display: 'block', fontSize: '11px' }}>Go to Decision Lab</strong>
              <small style={{ color: 'var(--muted)', fontSize: '10px' }}>Test what-if scenario</small>
            </button>
            <button
              onClick={() => { resetDemo(); setFeedback('Reset!'); setTimeout(onClose, 600); }}
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: '8px', padding: '8px 10px', textAlign: 'left', cursor: 'pointer', color: 'var(--primary)' }}
            >
              <strong style={{ display: 'block', fontSize: '11px' }}>Reset Demo State</strong>
              <small style={{ color: 'var(--muted)', fontSize: '10px' }}>Clean initial day 9</small>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
