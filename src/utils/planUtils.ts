import { Plan, PlanType, UserPlan } from '@/types/plan'

export const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Free Explorer',
    tagline: 'Browse all activities, pay per session',
    price: '$0',
    features: [
      'View all PineTribe activities',
      'Pay per session when you join',
      'Access to community features',
      'Basic progress tracking'
    ],
    buttonText: 'Start Free',
    buttonClass: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    icon: '🌱',
    color: 'text-gray-600'
  },
  {
    id: 'premium',
    name: 'Premium Tribe Member',
    tagline: 'Join all activities for free',
    price: '$29/month',
    features: [
      'Join ALL activities for FREE',
      'No per-session payments',
      'Priority booking',
      'Guest passes for friends',
      'Exclusive member events',
      'Advanced progress tracking'
    ],
    buttonText: 'Go Premium',
    buttonClass: 'bg-forest-600 text-white hover:bg-forest-700',
    icon: '👑',
    color: 'text-yellow-600'
  }
]

export const getPlanById = (id: PlanType): Plan | undefined => {
  return PLANS.find(plan => plan.id === id)
}

export const getPlanFeatures = (planType: PlanType): string[] => {
  const plan = getPlanById(planType)
  return plan?.features || []
}

export const canAccessFeature = (userPlan: UserPlan, feature: string): boolean => {
  if (userPlan.planType === 'premium') {
    return true
  }
  
  // Free tier can view all activities but needs to pay per session
  return true
}

export const getUpgradeMessage = (currentPlan: PlanType): string => {
  if (currentPlan === 'free') {
    return 'Upgrade to Premium to join all activities for free!'
  }
  return 'You have access to all activities for free!'
}

export const calculateSavings = (planType: PlanType, activitiesPerMonth: number): number => {
  if (planType === 'free') {
    // Average cost per activity for free users
    const avgCostPerActivity = 15
    const freeCost = activitiesPerMonth * avgCostPerActivity
    const premiumCost = 29
    return Math.max(0, freeCost - premiumCost)
  }
  return 0
}