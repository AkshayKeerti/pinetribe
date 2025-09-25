'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface LoadingScreenProps {
  onComplete: () => void
  duration?: number
}

export default function LoadingScreen({ onComplete, duration = 3000 }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Animate progress bar
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 2
      })
    }, duration / 50)

    // Hide loading screen after duration
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onComplete, 500) // Wait for fade out animation
    }, duration)

    return () => {
      clearTimeout(timer)
      clearInterval(progressInterval)
    }
  }, [duration, onComplete])

  if (!isVisible) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-forest-500 via-forest-600 to-forest-700 flex items-center justify-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-white/5 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-white/8 rounded-full animate-bounce delay-500"></div>
        <div className="absolute top-1/4 right-1/3 w-24 h-24 bg-white/6 rounded-full animate-bounce delay-700"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo with animation */}
        <div className="mb-8 transform transition-all duration-1000 ease-out">
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-white/20 rounded-full blur-xl scale-150 animate-pulse"></div>
            
            {/* Logo container */}
            <div className="relative bg-white/10 backdrop-blur-sm rounded-full p-8 shadow-2xl">
              <Image
                src="/pinetribe-white.svg"
                alt="PineTribe Logo"
                width={160}
                height={42}
                className="h-10 w-auto animate-pulse"
                priority
              />
            </div>
          </div>
        </div>

        {/* Loading text */}
        <div className="text-center mb-8">
          <h2 className="text-white text-xl font-semibold mb-2 animate-fade-in">
            Welcome to PineTribe
          </h2>
          <p className="text-white/80 text-sm animate-fade-in delay-500">
            Move in Nature • Meet your Tribe • Grow Together
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Loading dots */}
        <div className="flex space-x-2 mt-6">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  )
}
