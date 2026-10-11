'use client'

import { useState } from 'react'
import { AlertTriangle, Check, ShieldAlert, Sparkles, X, Wallet, Target, Clock } from 'lucide-react'
import { useRunwayStore } from '@/src/store/useRunwayStore'

export function ShockModal() {
  const activeShock = useRunwayStore((s) => s.activeShock)
  const resolveShock = useRunwayStore((s) => s.resolveShock)
  const dismissActiveShock = useRunwayStore((s) => s.dismissActiveShock)
  const goals = useRunwayStore((s) => s.goals)
  const balance = useRunwayStore((s) => s.balance)

  const [selectedGoalId, setSelectedGoalId] = useState(goals[0]?.id || '')

  if (!activeShock) return null

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(5, 7, 10, 0.85)',
      backdropFilter: 'blur(8px)',
      display: 'grid',
      placeItems: 'center',
      zIndex: 200,
      padding: '16px'
    }}>
      <div className="card" style={{
        maxWidth: '520px',
        width: '100%',
        border: '1px solid rgba(251, 113, 133, 0.4)',
        background: 'linear-gradient(145deg, rgba(251, 113, 133, 0.08), transparent 60%), #12151C',
        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.6)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
          <div>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              font: '700 10px Sora',
              textTransform: 'uppercase',
              color: 'var(--danger)',
              background: 'rgba(251, 113, 133, 0.15)',
              padding: '4px 10px',
              borderRadius: '999px',
              marginBottom: '8px'
            }}>
              <AlertTriangle size={13} /> LIFE HAPPENS · UNEXPECTED EXPENSE
            </span>
            <h2 style={{ margin: 0, font: '700 24px Sora', letterSpacing: '-0.04em' }}>
              {activeShock.title}
            </h2>
          </div>
          <button className="icon-button" onClick={dismissActiveShock} aria-label="Close modal">
            <X size={16} />
          </button>
        </div>

        <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: 1.6, margin: '0 0 18px' }}>
          {activeShock.description}
        </p>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '14px 18px',
          background: 'rgba(255, 255, 255, 0.03)',
          borderRadius: '12px',
          border: '1px solid var(--border)',
          marginBottom: '20px'
        }}>
          <div>
            <span style={{ fontSize: '11px', color: 'var(--muted)', display: 'block' }}>Sudden Cost</span>
            <strong style={{ font: '800 28px Sora', color: 'var(--danger)' }}>
              ₹{activeShock.amount.toLocaleString('en-IN')}
            </strong>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '11px', color: 'var(--muted)', display: 'block' }}>Current Balance</span>
            <strong style={{ font: '700 16px Sora' }}>₹{balance.toLocaleString('en-IN')}</strong>
          </div>
        </div>

        <p className="eyebrow violet-text" style={{ marginBottom: '10px' }}>
          HOW DO YOU WANT TO HANDLE THIS TRADE-OFF?
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {/* Choice 1: Absorb in Balance */}
          <button
            onClick={() => resolveShock(activeShock.id, 'balance')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              borderRadius: '12px',
              border: '1px solid var(--border)',
              background: 'rgba(255, 255, 255, 0.02)',
              color: 'var(--foreground)',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.15s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: 'rgba(251, 113, 133, 0.15)', color: 'var(--danger)', display: 'grid', placeItems: 'center' }}>
                <Wallet size={16} />
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '13px' }}>Absorb in Daily Balance</strong>
                <small style={{ color: 'var(--muted)', fontSize: '11px' }}>
                  Drops balance to ₹{(balance - activeShock.amount).toLocaleString('en-IN')}; lowers daily allowance.
                </small>
              </div>
            </div>
            <span className="outline-button" style={{ fontSize: '11px', padding: '6px 12px' }}>Choose</span>
          </button>

          {/* Choice 2: Dip into Goal */}
          <div style={{
            padding: '12px 16px',
            borderRadius: '12px',
            border: '1px solid var(--border)',
            background: 'rgba(255, 255, 255, 0.02)',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: 'rgba(124, 92, 255, 0.15)', color: 'var(--violet)', display: 'grid', placeItems: 'center' }}>
                  <Target size={16} />
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '13px' }}>Dip into a Savings Goal</strong>
                  <small style={{ color: 'var(--muted)', fontSize: '11px' }}>
                    Protects today&apos;s daily allowance but pushes back target ETA.
                  </small>
                </div>
              </div>
              <button
                className="primary-button"
                style={{ fontSize: '11px', padding: '6px 14px' }}
                onClick={() => resolveShock(activeShock.id, 'goal', selectedGoalId)}
              >
                Dip Fund
              </button>
            </div>
            <select
              value={selectedGoalId}
              onChange={(e) => setSelectedGoalId(e.target.value)}
              style={{
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid var(--border)',
                color: 'var(--foreground)',
                padding: '8px 12px',
                borderRadius: '8px',
                fontSize: '12px'
              }}
            >
              {goals.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name} (₹{g.saved.toLocaleString('en-IN')} available)
                </option>
              ))}
            </select>
          </div>

          {/* Choice 3: Defer / Borrow */}
          <button
            onClick={() => resolveShock(activeShock.id, 'deferred')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              borderRadius: '12px',
              border: '1px solid var(--border)',
              background: 'rgba(255, 255, 255, 0.02)',
              color: 'var(--foreground)',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.15s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: 'rgba(251, 191, 36, 0.15)', color: 'var(--warning)', display: 'grid', placeItems: 'center' }}>
                <Clock size={16} />
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '13px' }}>Defer / Borrow from Friend</strong>
                <small style={{ color: 'var(--muted)', fontSize: '11px' }}>
                  Zero deduction now; adds debt obligation to settle next cycle.
                </small>
              </div>
            </div>
            <span className="outline-button" style={{ fontSize: '11px', padding: '6px 12px' }}>Defer</span>
          </button>
        </div>
      </div>
    </div>
  )
}
