'use client'

import { useState } from 'react'
import { ArrowLeft, Check, Star, Zap } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { PLANS } from '@/utils/planUtils'
import { PlanType } from '@/types/plan'

export default function PlanSelection() {
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('free')

  const handleContinue = () => {
    // Store selected plan and proceed to signup
    localStorage.setItem('selected_plan', selectedPlan)
    router.push('/auth/signup')
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-6 pt-12">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="text-sm text-gray-500">Choose Your Plan</div>
      </div>

      {/* Content */}
      <div className="px-6 pb-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Choose Your Adventure</h1>
          <p className="text-gray-600 text-lg">Select the plan that fits your fitness journey</p>
        </div>

        {/* Plan Cards */}
        <div className="space-y-4 mb-8">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`relative border-2 rounded-3xl p-6 transition-all cursor-pointer ${
                selectedPlan === plan.id
                  ? 'border-forest-500 bg-forest-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-6 bg-forest-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  Most Popular
                </div>
              )}

              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600">{plan.tagline}</p>
                </div>
                
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900">{plan.price}</div>
                  <div className="text-sm text-gray-600">
                    {plan.id === 'free' ? 'per activity' : 'per month'}
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">What's included:</h4>
                <div className="grid grid-cols-1 gap-2">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-forest-600 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Limitations for free plan */}
              {plan.limitations.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Limitations:</h4>
                  <div className="space-y-1">
                    {plan.limitations.map((limitation, index) => (
                      <div key={index} className="flex items-center gap-3 text-gray-500">
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        <span className="text-sm">{limitation}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          className="w-full bg-forest-600 text-white font-semibold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 text-lg shadow-lg hover:bg-forest-700 transition-all"
        >
          Continue with {selectedPlan === 'free' ? 'Free' : 'Premium'}
          <Zap className="w-5 h-5" />
        </button>

        {/* Additional Info */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            You can upgrade or downgrade your plan anytime
          </p>
        </div>
      </div>
    </div>
  )
}
