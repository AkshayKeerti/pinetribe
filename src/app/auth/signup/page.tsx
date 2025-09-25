'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, Mail, Apple, Chrome, User, Camera, ChevronRight, Check } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function Signup() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'premium'>('free')
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    photo: null as File | null,
    fitnessLevel: '',
    interests: [] as string[]
  })

  // Get selected plan from localStorage
  useEffect(() => {
    const savedPlan = localStorage.getItem('selected_plan')
    if (savedPlan) {
      setSelectedPlan(savedPlan as 'free' | 'premium')
    }
  }, [])

  const fitnessLevels = [
    { value: 'beginner', label: 'Beginner', description: 'New to outdoor fitness', icon: '🌱' },
    { value: 'intermediate', label: 'Intermediate', description: 'Some experience', icon: '🌿' },
    { value: 'advanced', label: 'Advanced', description: 'Very experienced', icon: '🌲' }
  ]

  const interests = [
    { name: 'Yoga', icon: '🧘' },
    { name: 'Running', icon: '🏃' },
    { name: 'Hiking', icon: '🥾' },
    { name: 'Circuit Training', icon: '💪' },
    { name: 'Social Events', icon: '🎉' },
    { name: 'Meditation', icon: '🧘‍♀️' },
    { name: 'Nature Photography', icon: '📸' },
    { name: 'Group Challenges', icon: '🏆' }
  ]

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleAutoFill = () => {
    setFormData({
      email: 'demo@pinetribe.com',
      name: 'Alex Johnson',
      photo: null,
      fitnessLevel: 'intermediate',
      interests: ['Yoga', 'Running', 'Hiking', 'Social Events']
    })
  }

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  const handleSubmit = () => {
    // Mock authentication - store user data with plan info
    const userData = {
      ...formData,
      planType: selectedPlan,
      subscriptionStatus: selectedPlan === 'premium' ? 'active' : 'inactive',
      activitiesUsed: 0,
      subscriptionEndDate: selectedPlan === 'premium' ? 
        new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() : undefined
    }
    
    localStorage.setItem('pinetribe_user', JSON.stringify(userData))
    localStorage.setItem('pinetribe_user_plan', JSON.stringify({
      planType: selectedPlan,
      subscriptionStatus: selectedPlan === 'premium' ? 'active' : 'inactive',
      activitiesUsed: 0,
      subscriptionEndDate: selectedPlan === 'premium' ? 
        new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() : undefined
    }))
    
    router.push('/dashboard')
  }

  if (step === 0) {
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
          <div className="text-sm text-gray-500">Step 1 of 4</div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
        <div className="text-center mb-8">
          <div className="inline-block px-4 py-2 bg-forest-100 text-forest-700 rounded-full text-sm font-medium mb-4">
            {selectedPlan === 'free' ? '🆓 Free Plan' : '⭐ Premium Plan'}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Join PineTribe</h1>
          <p className="text-gray-600 text-lg">Choose how you'd like to sign up</p>
        </div>

          <div className="space-y-4 mb-8">
            <button className="w-full flex items-center gap-4 p-4 border-2 border-gray-200 rounded-2xl hover:border-forest-300 hover:bg-forest-50 transition-all">
              <Mail className="w-6 h-6 text-gray-600" />
              <span className="font-semibold text-gray-900">Continue with Email</span>
            </button>

            <button className="w-full flex items-center gap-4 p-4 border-2 border-gray-200 rounded-2xl hover:border-forest-300 hover:bg-forest-50 transition-all">
              <Apple className="w-6 h-6 text-gray-600" />
              <span className="font-semibold text-gray-900">Continue with Apple</span>
            </button>

            <button className="w-full flex items-center gap-4 p-4 border-2 border-gray-200 rounded-2xl hover:border-forest-300 hover:bg-forest-50 transition-all">
              <Chrome className="w-6 h-6 text-gray-600" />
              <span className="font-semibold text-gray-900">Continue with Google</span>
            </button>
          </div>

          <button
            onClick={() => setStep(1)}
            className="w-full bg-forest-600 text-white font-semibold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 text-lg shadow-lg hover:bg-forest-700 transition-all"
          >
            Quick Signup with Email
            <ChevronRight className="w-5 h-5" />
          </button>

          <button
            onClick={handleAutoFill}
            className="w-full text-forest-600 hover:text-forest-700 font-medium py-3 transition-colors duration-200"
          >
            🚀 Demo Mode - Auto Fill Details
          </button>
        </div>
      </div>
    )
  }

  if (step === 1) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pt-12">
          <button
            onClick={() => setStep(0)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="text-sm text-gray-500">Step 2 of 4</div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Create Your Profile</h1>
            <p className="text-gray-600 text-lg">Tell us about yourself</p>
          </div>

          <div className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-forest-500 focus:border-forest-500 text-lg"
                placeholder="your@email.com"
              />
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-forest-500 focus:border-forest-500 text-lg"
                placeholder="Your name"
              />
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Profile Photo
              </label>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                  <Camera className="w-10 h-10 text-gray-400" />
                </div>
                <button className="px-6 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-medium">
                  Upload Photo
                </button>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full bg-forest-600 text-white font-semibold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 text-lg shadow-lg hover:bg-forest-700 transition-all disabled:bg-gray-300"
              disabled={!formData.email || !formData.name}
            >
              Continue
              <ChevronRight className="w-5 h-5" />
            </button>

            <button
              onClick={handleAutoFill}
              className="w-full text-gray-500 hover:text-gray-700 font-medium py-2 transition-colors duration-200 text-sm"
            >
              ✨ Auto-fill demo data
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pt-12">
          <button
            onClick={() => setStep(1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="text-sm text-gray-500">Step 3 of 4</div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Fitness Level</h1>
            <p className="text-gray-600 text-lg">Help us recommend the right activities</p>
          </div>

          <div className="space-y-4 mb-8">
            {fitnessLevels.map((level) => (
              <button
                key={level.value}
                onClick={() => handleInputChange('fitnessLevel', level.value)}
                className={`w-full p-6 text-left border-2 rounded-2xl transition-all ${
                  formData.fitnessLevel === level.value
                    ? 'border-forest-500 bg-forest-50'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{level.icon}</div>
                  <div>
                    <div className="font-semibold text-gray-900 text-lg">{level.label}</div>
                    <div className="text-gray-600">{level.description}</div>
                  </div>
                  {formData.fitnessLevel === level.value && (
                    <Check className="w-6 h-6 text-forest-600 ml-auto" />
                  )}
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={() => setStep(3)}
            className="w-full bg-forest-600 text-white font-semibold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 text-lg shadow-lg hover:bg-forest-700 transition-all disabled:bg-gray-300"
            disabled={!formData.fitnessLevel}
          >
            Continue
            <ChevronRight className="w-5 h-5" />
          </button>

          <button
            onClick={handleAutoFill}
            className="w-full text-gray-500 hover:text-gray-700 font-medium py-2 transition-colors duration-200 text-sm"
          >
            ✨ Auto-select Intermediate
          </button>
        </div>
      </div>
    )
  }

  if (step === 3) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pt-12">
          <button
            onClick={() => setStep(2)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="text-sm text-gray-500">Step 4 of 4</div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Your Interests</h1>
            <p className="text-gray-600 text-lg">Select activities you're interested in</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {interests.map((interest) => (
              <button
                key={interest.name}
                onClick={() => handleInterestToggle(interest.name)}
                className={`p-4 border-2 rounded-2xl transition-all ${
                  formData.interests.includes(interest.name)
                    ? 'border-forest-500 bg-forest-50'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">{interest.icon}</div>
                  <div className="font-medium text-sm">{interest.name}</div>
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-forest-600 text-white font-semibold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 text-lg shadow-lg hover:bg-forest-700 transition-all disabled:bg-gray-300"
            disabled={formData.interests.length === 0}
          >
            Complete Setup
            <ChevronRight className="w-5 h-5" />
          </button>

          <button
            onClick={handleAutoFill}
            className="w-full text-gray-500 hover:text-gray-700 font-medium py-2 transition-colors duration-200 text-sm"
          >
            ✨ Auto-select popular activities
          </button>
        </div>
      </div>
    )
  }

  return null
}
