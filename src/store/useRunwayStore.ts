import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface TransactionItem {
  id: string
  day: number
  date: string
  label: string
  category: string
  note: string
  amount: string
  numAmount: number
  tone: 'income' | 'expense' | 'bill' | 'subscription' | 'shock'
}

export interface SubscriptionItem {
  id: string
  label: string
  detail: string
  amount: number
  annual: string
  renewDay: number
  color: string
  active: boolean
}

export interface CommitmentItem {
  id: string
  day: number
  label: string
  amount: number
  dueText: string
  paid: boolean
}

export interface GoalItem {
  id: string
  name: string
  detail: string
  saved: number
  target: number
  eta: string
  color: string
  priority: string
}

export interface ShockItem {
  id: string
  title: string
  amount: number
  day: number
  description: string
  resolved: boolean
  resolutionMethod?: 'balance' | 'goal' | 'deferred'
  goalDeductedId?: string
}

interface RunwayState {
  currentDay: number
  activeDay: number
  balance: number
  transactions: TransactionItem[]
  subscriptions: SubscriptionItem[]
  commitments: CommitmentItem[]
  goals: GoalItem[]
  goalPace: number
  pendingShocks: ShockItem[]
  activeShock: ShockItem | null

  // Actions
  advanceDay: () => void
  fastForward: (targetDay?: number) => void
  setActiveDay: (day: number) => void
  addTransaction: (tx: { label: string; amount: number; type: 'income' | 'expense' | 'bill'; category?: string; note?: string; day?: number }) => void
  commitDecision: (decision: { label: string; amount: number; day: number; type: string }) => void
  cancelSubscription: (id: string) => void
  reactivateSubscription: (id: string) => void
  payCommitment: (id: string) => void
  setGoalPace: (pace: number) => void
  addGoal: (goal: Omit<GoalItem, 'id'>) => void
  triggerRandomShock: () => void
  resolveShock: (shockId: string, method: 'balance' | 'goal' | 'deferred', goalId?: string) => void
  dismissActiveShock: () => void
  resetDemo: () => void

  // Selectors
  getSafeToSpend: () => number
  getDailyAllowance: () => number
  getEndForecast: () => number
  getRiskPercentage: () => number
  getHealthScore: () => number
}

const initialTransactions: TransactionItem[] = [
  { id: 'tx-1', day: 9, date: 'Today, 9 Jun', label: 'Food & drinks', category: 'Food', note: 'Corner Cafe', amount: '−₹340', numAmount: -340, tone: 'expense' },
  { id: 'tx-2', day: 8, date: '8 Jun', label: 'Freelance payout', category: 'Income', note: 'Client transfer', amount: '+₹2,400', numAmount: 2400, tone: 'income' },
  { id: 'tx-3', day: 5, date: '5 Jun', label: 'Spotify renewal', category: 'Subscription', note: 'Monthly renewal', amount: '−₹199', numAmount: -199, tone: 'subscription' },
  { id: 'tx-4', day: 3, date: '3 Jun', label: 'Groceries', category: 'Essentials', note: 'Fresh Basket', amount: '−₹120', numAmount: -120, tone: 'expense' },
  { id: 'tx-5', day: 1, date: '1 Jun', label: 'Starting Balance Deposit', category: 'Income', note: 'Acme Studio', amount: '+₹3,600', numAmount: 3600, tone: 'income' },
]

const initialSubscriptions: SubscriptionItem[] = [
  { id: 'sub-1', label: 'Spotify', detail: 'Music & podcasts', amount: 199, annual: '₹2,388/yr', renewDay: 14, color: 'violet', active: true },
  { id: 'sub-2', label: 'Netflix', detail: 'Entertainment', amount: 499, annual: '₹5,988/yr', renewDay: 18, color: 'danger', active: true },
  { id: 'sub-3', label: 'iCloud+', detail: 'Storage', amount: 75, annual: '₹900/yr', renewDay: 25, color: 'blue', active: true },
]

const initialCommitments: CommitmentItem[] = [
  { id: 'comm-1', day: 12, label: 'Phone bill', amount: 850, dueText: 'Due in 3 days', paid: false },
  { id: 'comm-2', day: 20, label: 'Internet bill', amount: 499, dueText: 'Due in 11 days', paid: false },
  { id: 'comm-3', day: 28, label: 'Rent contribution', amount: 1200, dueText: 'Due in 19 days', paid: false },
]

const initialGoals: GoalItem[] = [
  { id: 'goal-1', name: 'Emergency buffer', detail: 'Your safety net', saved: 3200, target: 5000, eta: '18 days', color: 'lime', priority: 'Essential' },
  { id: 'goal-2', name: 'Goa weekend', detail: 'Trip in July', saved: 1850, target: 4000, eta: '31 days', color: 'violet', priority: 'Fun' },
  { id: 'goal-3', name: 'New laptop', detail: 'MacBook Air fund', saved: 740, target: 8500, eta: '112 days', color: 'blue', priority: 'Planned' },
]

const shockDeck: Omit<ShockItem, 'id' | 'resolved'>[] = [
  { title: 'Screen Shattered', amount: 1200, day: 11, description: 'Dropped your phone on pavement during the commute. Screen glass replacement required immediately.' },
  { title: "Friend's Birthday Trip", amount: 850, day: 15, description: "Surprise weekend group getaway booked by friends. Split share for petrol and stay." },
  { title: 'Emergency Dentist Visit', amount: 1500, day: 21, description: 'Sudden wisdom tooth pain requiring consultation and medication.' },
  { title: 'College Lab Supplies', amount: 650, day: 13, description: 'Mandatory semester project materials and hardware components kit.' },
]

export const useRunwayStore = create<RunwayState>()(
  persist(
    (set, get) => ({
      currentDay: 9,
      activeDay: 9,
      balance: 5400,
      transactions: initialTransactions,
      subscriptions: initialSubscriptions,
      commitments: initialCommitments,
      goals: initialGoals,
      goalPace: 500,
      pendingShocks: [],
      activeShock: null,

      advanceDay: () => {
        const { currentDay, commitments, subscriptions, balance } = get()
        if (currentDay >= 30) return
        const nextDay = currentDay + 1

        let newBalance = balance
        const updatedCommitments = commitments.map((c) => {
          if (c.day === nextDay && !c.paid) {
            newBalance -= c.amount
            return { ...c, paid: true, dueText: 'Auto-paid today' }
          }
          return { ...c, dueText: c.day > nextDay ? `Due in ${c.day - nextDay} days` : 'Past' }
        })

        // Check subscription auto-renew
        subscriptions.forEach((s) => {
          if (s.active && s.renewDay === nextDay) {
            newBalance -= s.amount
          }
        })

        // 35% chance to trigger random shock on days 10, 14, 19 if none active
        let nextShock = get().activeShock
        if (!nextShock && (nextDay === 11 || nextDay === 16 || nextDay === 22)) {
          const shockChoice = shockDeck[(nextDay % shockDeck.length)]
          nextShock = {
            id: `shock-${Date.now()}`,
            ...shockChoice,
            day: nextDay,
            resolved: false,
          }
        }

        set({
          currentDay: nextDay,
          activeDay: nextDay,
          balance: newBalance,
          commitments: updatedCommitments,
          activeShock: nextShock,
        })
      },

      fastForward: (targetDay = 30) => {
        set({
          currentDay: Math.min(30, targetDay),
          activeDay: Math.min(30, targetDay),
        })
      },

      setActiveDay: (day: number) => {
        set({ activeDay: Math.max(1, Math.min(30, day)) })
      },

      addTransaction: ({ label, amount, type, category = 'Essentials', note = 'Manual entry', day }) => {
        const { currentDay, balance, transactions } = get()
        const targetDay = day || currentDay
        const isIncome = type === 'income'
        const signedAmount = isIncome ? amount : -amount

        const newTx: TransactionItem = {
          id: `tx-${Date.now()}`,
          day: targetDay,
          date: `Day ${targetDay}`,
          label,
          category,
          note,
          amount: isIncome ? `+₹${amount.toLocaleString('en-IN')}` : `−₹${amount.toLocaleString('en-IN')}`,
          numAmount: signedAmount,
          tone: isIncome ? 'income' : type === 'bill' ? 'bill' : 'expense',
        }

        set({
          balance: balance + signedAmount,
          transactions: [newTx, ...transactions],
        })
      },

      commitDecision: ({ label, amount, day, type }) => {
        const { balance, transactions } = get()
        const isCancel = type === 'subscription' && amount < 0
        const signed = isCancel ? Math.abs(amount) : -amount

        const newTx: TransactionItem = {
          id: `tx-${Date.now()}`,
          day,
          date: `Day ${day} (Simulated)`,
          label,
          category: type === 'subscription' ? 'Subscription' : type === 'goal' ? 'Savings' : 'Discretionary',
          note: isCancel ? 'Subscription Cancelled' : 'Committed Decision',
          amount: signed > 0 ? `+₹${signed.toLocaleString('en-IN')}` : `−₹${Math.abs(signed).toLocaleString('en-IN')}`,
          numAmount: signed,
          tone: signed > 0 ? 'income' : 'expense',
        }

        set({
          balance: balance + signed,
          transactions: [newTx, ...transactions],
        })
      },

      cancelSubscription: (id: string) => {
        const { subscriptions, balance, transactions, currentDay } = get()
        const sub = subscriptions.find((s) => s.id === id)
        if (!sub) return

        const updated = subscriptions.map((s) => (s.id === id ? { ...s, active: false } : s))
        const refundTx: TransactionItem = {
          id: `tx-${Date.now()}`,
          day: currentDay,
          date: `Day ${currentDay}`,
          label: `Cancelled ${sub.label}`,
          category: 'Subscription',
          note: `Saved ₹${sub.amount}/mo`,
          amount: `+₹${sub.amount}`,
          numAmount: sub.amount,
          tone: 'income',
        }

        set({
          subscriptions: updated,
          balance: balance + sub.amount,
          transactions: [refundTx, ...transactions],
        })
      },

      reactivateSubscription: (id: string) => {
        set((state) => ({
          subscriptions: state.subscriptions.map((s) => (s.id === id ? { ...s, active: true } : s)),
        }))
      },

      payCommitment: (id: string) => {
        const { commitments, balance, transactions, currentDay } = get()
        const comm = commitments.find((c) => c.id === id)
        if (!comm || comm.paid) return

        const updated = commitments.map((c) => (c.id === id ? { ...c, paid: true, dueText: 'Paid today' } : c))
        const tx: TransactionItem = {
          id: `tx-${Date.now()}`,
          day: currentDay,
          date: `Day ${currentDay}`,
          label: comm.label,
          category: 'Commitment',
          note: 'Marked paid',
          amount: `−₹${comm.amount}`,
          numAmount: -comm.amount,
          tone: 'bill',
        }

        set({
          commitments: updated,
          balance: balance - comm.amount,
          transactions: [tx, ...transactions],
        })
      },

      setGoalPace: (pace: number) => {
        set({ goalPace: pace })
      },

      addGoal: (goal) => {
        const newGoal: GoalItem = {
          ...goal,
          id: `goal-${Date.now()}`,
        }
        set((state) => ({ goals: [...state.goals, newGoal] }))
      },

      triggerRandomShock: () => {
        const choice = shockDeck[Math.floor(Math.random() * shockDeck.length)]
        set({
          activeShock: {
            id: `shock-${Date.now()}`,
            ...choice,
            day: get().currentDay,
            resolved: false,
          },
        })
      },

      resolveShock: (shockId: string, method: 'balance' | 'goal' | 'deferred', goalId?: string) => {
        const { activeShock, balance, goals, transactions, currentDay } = get()
        if (!activeShock || activeShock.id !== shockId) return

        let newBalance = balance
        let updatedGoals = [...goals]

        if (method === 'balance') {
          newBalance -= activeShock.amount
        } else if (method === 'goal' && goalId) {
          updatedGoals = goals.map((g) => {
            if (g.id === goalId) {
              return { ...g, saved: Math.max(0, g.saved - activeShock.amount) }
            }
            return g
          })
        }

        const shockTx: TransactionItem = {
          id: `tx-${Date.now()}`,
          day: currentDay,
          date: `Day ${currentDay}`,
          label: `Shock: ${activeShock.title}`,
          category: 'Unexpected',
          note: method === 'goal' ? 'Drawn from Savings Goal' : method === 'deferred' ? 'Deferred / Borrowed' : 'Absorbed in Balance',
          amount: method === 'deferred' ? '₹0' : `−₹${activeShock.amount}`,
          numAmount: method === 'deferred' ? 0 : -activeShock.amount,
          tone: 'shock',
        }

        set({
          balance: newBalance,
          goals: updatedGoals,
          transactions: [shockTx, ...transactions],
          activeShock: null,
        })
      },

      dismissActiveShock: () => {
        set({ activeShock: null })
      },

      resetDemo: () => {
        set({
          currentDay: 9,
          activeDay: 9,
          balance: 5400,
          transactions: initialTransactions,
          subscriptions: initialSubscriptions,
          commitments: initialCommitments,
          goals: initialGoals,
          goalPace: 500,
          pendingShocks: [],
          activeShock: null,
        })
      },

      getSafeToSpend: () => {
        const { balance, commitments, goalPace } = get()
        const upcomingCommitments = commitments
          .filter((c) => !c.paid)
          .reduce((sum, c) => sum + c.amount, 0)
        const shockCushion = 1000
        return Math.max(0, balance - upcomingCommitments - (goalPace / 2) - shockCushion)
      },

      getDailyAllowance: () => {
        const { currentDay } = get()
        const safeToSpend = get().getSafeToSpend()
        const daysLeft = Math.max(1, 31 - currentDay)
        return Math.max(0, Math.round(safeToSpend / daysLeft))
      },

      getEndForecast: () => {
        const { balance, currentDay, commitments } = get()
        const unpaidBills = commitments.filter((c) => !c.paid).reduce((s, c) => s + c.amount, 0)
        const daysRemaining = 30 - currentDay
        const dailyBurn = 140
        return Math.round(balance - unpaidBills - (daysRemaining * dailyBurn))
      },

      getRiskPercentage: () => {
        const end = get().getEndForecast()
        if (end <= 0) return 85
        if (end < 1000) return 32
        return 8
      },

      getHealthScore: () => {
        const { balance, subscriptions, commitments } = get()
        let score = 75
        if (balance > 4000) score += 7
        if (subscriptions.filter((s) => s.active).length <= 2) score += 5
        if (commitments.every((c) => c.paid)) score += 8
        if (get().getEndForecast() > 1000) score += 5
        return Math.min(98, score)
      },
    }),
    {
      name: 'runway-store-v1',
    }
  )
)
