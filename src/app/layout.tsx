'use client'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react'
import './globals.css'
import LoadingScreen from '@/components/LoadingScreen'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PineTribe - Move in Nature. Meet your Tribe. Grow Together.',
  description: 'Join PineTribe for outdoor fitness classes, group activities, and community building in nature.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if this is the first visit
    const hasVisited = localStorage.getItem('pinetribe_has_visited')
    
    if (hasVisited) {
      // Skip loading screen for returning users
      setIsLoading(false)
    } else {
      // Show loading screen for first-time visitors
      localStorage.setItem('pinetribe_has_visited', 'true')
    }
  }, [])

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        {isLoading && <LoadingScreen onComplete={handleLoadingComplete} duration={3000} />}
        <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
          {children}
        </div>
      </body>
    </html>
  )
}
