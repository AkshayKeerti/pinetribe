export type PlanType = 'free' | 'premium'

export type SubscriptionStatus = 'active' | 'inactive' | 'cancelled' | 'trial'

export interface Plan {
  id: PlanType
  name: string
  tagline: string
  price: string
  features: string[]
  buttonText: string
  buttonClass: string
  icon: string
  color: string
  popular?: boolean
}

export interface UserPlan {
  planType: PlanType
  subscriptionStatus: SubscriptionStatus
  subscriptionEndDate?: string
  trialEndDate?: string
  activitiesUsed: number
  monthlyLimit?: number
}

export interface ActivityPlan {
  id: string
  name: string
  type: 'free' | 'premium'
  price?: number
  description: string
  features: string[]
}
