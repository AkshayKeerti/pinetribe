'use client'

import { useState, useEffect } from 'react'
import LoadingScreen from '@/components/LoadingScreen'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if loading screen has been shown in this session
    const hasShownLoading = sessionStorage.getItem('pinetribe_loading_shown')
    
    if (hasShownLoading) {
      // Skip loading screen if already shown in this session
      setIsLoading(false)
    } else {
      // Show loading screen for first page load in this session
      sessionStorage.setItem('pinetribe_loading_shown', 'true')
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} duration={3000} />}
      <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </div>
    </>
  )
}
