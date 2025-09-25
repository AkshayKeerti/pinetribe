import { Plan, PlanType, UserPlan } from '@/types/plan'

export const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Start your journey with unsupervised activities',
    price: {
      perActivity: 8
    },
    features: [
      'Unsupervised yoga sessions',
      'Trail running access',
      'Basic hiking routes',
      'Simple progress tracking',
      'Community access'
    ],
    limitations: [
      'No instructor-led classes',
      'Limited group features',
      'Basic progress tracking only',
      'No priority booking',
      'No guest passes'
    ],
    color: 'gray'
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Unlock the full PineTribe experience',
    price: {
      monthly: 29,
      annual: 290
    },
    features: [
      'Unlimited instructor-led classes',
      'Premium forest locations',
      'Full group features & chat',
      'Advanced progress tracking',
      'Priority booking',
      '2 guest passes per month',
      'Exclusive events',
      'Personal trainer consultations'
    ],
    limitations: [],
    color: 'forest',
    popular: true
  }
]

export const getPlanById = (id: PlanType): Plan | undefined => {
  return PLANS.find(plan => plan.id === id)
}

export const getPlanFeatures = (planType: PlanType): string[] => {
  const plan = getPlanById(planType)
  return plan?.features || []
}

export const getPlanLimitations = (planType: PlanType): string[] => {
  const plan = getPlanById(planType)
  return plan?.limitations || []
}

export const canAccessFeature = (userPlan: UserPlan, feature: string): boolean => {
  if (userPlan.planType === 'premium') {
    return true
  }
  
  // Free tier limitations
  const premiumFeatures = [
    'instructor-led',
    'premium-locations',
    'group-chat',
    'advanced-tracking',
    'priority-booking',
    'guest-passes',
    'exclusive-events'
  ]
  
  return !premiumFeatures.includes(feature)
}

export const getUpgradeMessage = (currentPlan: PlanType): string => {
  if (currentPlan === 'free') {
    return 'Upgrade to Premium to unlock all features!'
  }
  return 'You have access to all features!'
}

export const calculateSavings = (planType: PlanType, activitiesPerMonth: number): number => {
  if (planType === 'free') {
    const freePlan = getPlanById('free')
    const premiumPlan = getPlanById('premium')
    
    if (freePlan?.price.perActivity && premiumPlan?.price.monthly) {
      const freeCost = activitiesPerMonth * freePlan.price.perActivity
      const premiumCost = premiumPlan.price.monthly
      return Math.max(0, freeCost - premiumCost)
    }
  }
  return 0
}
