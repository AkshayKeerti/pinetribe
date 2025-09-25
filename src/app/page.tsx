'use client'

import { useState } from 'react'
import { ArrowRight, TreePine, Users, Heart, ChevronRight } from 'lucide-react'
import Image from 'next/image'

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0)

  const onboardingSteps = [
    {
      icon: <TreePine className="w-12 h-12 text-white" />,
      title: "Move in Nature",
      subtitle: "Experience fitness in the great outdoors",
      description: "Join our outdoor classes in beautiful forest locations. Yoga, runs, circuits, and hikes await you."
    },
    {
      icon: <Users className="w-12 h-12 text-white" />,
      title: "Meet your Tribe",
      subtitle: "Connect with like-minded people",
      description: "Find your community through shared activities and interests. Build lasting friendships in nature."
    },
    {
      icon: <Heart className="w-12 h-12 text-white" />,
      title: "Grow Together",
      subtitle: "Achieve your goals as a community",
      description: "Track your progress, earn badges, and celebrate milestones together with your tribe."
    }
  ]

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Navigate to signup
      window.location.href = '/auth/signup'
    }
  }

  const handleSkip = () => {
    window.location.href = '/auth/signup'
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/onboarding-bg.jpg"
          alt="Forest background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-between p-6">
        {/* Top Section */}
        <div className="pt-12">
          {/* PineTribe Logo */}
          <div className="flex items-center justify-center mb-16">
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
              <Image
                src="/pinetribe-white.svg"
                alt="PineTribe Logo"
                width={120}
                height={32}
                className="h-8 w-auto"
                priority
              />
            </div>
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center mb-12">
            {onboardingSteps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full mx-1 transition-all duration-300 ${
                  index === currentStep ? 'bg-white w-8' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                {onboardingSteps[currentStep].icon}
              </div>
            </div>
            
            <h1 className="text-4xl font-bold text-white mb-3">
              {onboardingSteps[currentStep].title}
            </h1>
            
            <h2 className="text-xl text-white/90 mb-6">
              {onboardingSteps[currentStep].subtitle}
            </h2>
            
            <p className="text-white/80 text-lg leading-relaxed max-w-sm mx-auto">
              {onboardingSteps[currentStep].description}
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pb-8">
          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={handleNext}
              className="w-full bg-white text-forest-600 font-semibold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 text-lg shadow-lg hover:bg-white/90 transition-all duration-200"
            >
              {currentStep === onboardingSteps.length - 1 ? 'Get Started' : 'Continue'}
              <ChevronRight className="w-5 h-5" />
            </button>
            
            <button
              onClick={handleSkip}
              className="w-full text-white/70 hover:text-white transition-colors duration-200 py-2"
            >
              Skip for now
            </button>
          </div>

          {/* Tagline */}
          <div className="text-center mt-8">
            <p className="text-white/60 text-sm">
              Move in Nature • Meet your Tribe • Grow Together
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
