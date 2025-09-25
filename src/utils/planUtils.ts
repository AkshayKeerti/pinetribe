import { Plan, PlanType, UserPlan } from '@/types/plan'

export const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Free Explorer',
    tagline: 'Browse all activities, pay per session',
    price: '$0',
    features: [
      'View all PineTribe activities',
      'Browse groups and community content',
      'Basic progress tracking',
      'Upgrade to join groups and activities'
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
      'Join groups and community features',
      'No per-session payments',
      'Priority booking',
      'Guest passes for friends',
      'Exclusive member events',
      'Advanced progress tracking'
    ],
    buttonText: 'Go Premium',
    buttonClass: 'bg-forest-600 text-white hover:bg-forest-700',
    icon: '👑',
    color: 'text-yellow-600',
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

export const canAccessFeature = (userPlan: UserPlan, feature: string): boolean => {
  if (userPlan.planType === 'premium') {
    return true
  }
  
  // Free tier restrictions
  const restrictedFeatures = [
    'join_group',
    'book_activity', 
    'icebreaker_social',
    'group_chat',
    'create_group',
    'send_wave'
  ]
  
  return !restrictedFeatures.includes(feature)
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