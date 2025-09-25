'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { UserPlan, PlanType, SubscriptionStatus } from '@/types/plan'

interface PlanContextType {
  userPlan: UserPlan | null
  setUserPlan: (plan: UserPlan) => void
  updatePlan: (planType: PlanType) => void
  isPremium: boolean
  isLoading: boolean
}

const PlanContext = createContext<PlanContextType | undefined>(undefined)

export function PlanProvider({ children }: { children: ReactNode }) {
  const [userPlan, setUserPlan] = useState<UserPlan | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load user plan from localStorage
    const savedPlan = localStorage.getItem('pinetribe_user_plan')
    if (savedPlan) {
      setUserPlan(JSON.parse(savedPlan))
    } else {
      // Default to free plan for new users
      const defaultPlan: UserPlan = {
        planType: 'free',
        subscriptionStatus: 'inactive',
        activitiesUsed: 0
      }
      setUserPlan(defaultPlan)
      localStorage.setItem('pinetribe_user_plan', JSON.stringify(defaultPlan))
    }
    setIsLoading(false)
  }, [])

  const updatePlan = (planType: PlanType) => {
    const newPlan: UserPlan = {
      planType,
      subscriptionStatus: planType === 'premium' ? 'active' : 'inactive',
      activitiesUsed: userPlan?.activitiesUsed || 0,
      subscriptionEndDate: planType === 'premium' ? 
        new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() : undefined
    }
    
    setUserPlan(newPlan)
    localStorage.setItem('pinetribe_user_plan', JSON.stringify(newPlan))
  }

  const isPremium = userPlan?.planType === 'premium' && userPlan?.subscriptionStatus === 'active'

  return (
    <PlanContext.Provider value={{
      userPlan,
      setUserPlan,
      updatePlan,
      isPremium,
      isLoading
    }}>
      {children}
    </PlanContext.Provider>
  )
}

export function usePlan() {
  const context = useContext(PlanContext)
  if (context === undefined) {
    throw new Error('usePlan must be used within a PlanProvider')
  }
  return context
}
