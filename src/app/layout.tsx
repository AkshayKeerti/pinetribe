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
    // For now, always show loading screen for testing
    // Later we can implement smart logic based on user preferences
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
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
