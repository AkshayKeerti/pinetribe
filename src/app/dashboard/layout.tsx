'use client'

import { useState, useEffect } from 'react'
import { TreePine, User, Calendar, Trophy, Users, Settings, Home, Crown } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import { PlanProvider, usePlan } from '@/contexts/PlanContext'
import Image from 'next/image'
import LoadingScreen from '@/components/LoadingScreen'

const navigation = [
  { id: 'home', name: 'Home', href: '/dashboard', icon: Home },
  { id: 'membership', name: 'Pass', href: '/dashboard/membership', icon: User },
  { id: 'activities', name: 'Classes', href: '/dashboard/activities', icon: Calendar },
  { id: 'progress', name: 'Progress', href: '/dashboard/progress', icon: Trophy },
  { id: 'groups', name: 'Tribe', href: '/dashboard/groups', icon: Users },
]

function DashboardContent({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { userPlan, isPremium } = usePlan()
  const [user, setUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('home')

  useEffect(() => {
    const userData = localStorage.getItem('pinetribe_user')
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      // Check if user is coming from plans page (they might not have user data yet)
      const userPlan = localStorage.getItem('pinetribe_user_plan')
      if (userPlan) {
        // User has a plan but no user data - redirect to signup to complete profile
        router.push('/auth/signup')
      } else {
        // No user data and no plan - redirect to home
        router.push('/')
      }
    }
  }, [router])

  // Update active tab based on current pathname
  useEffect(() => {
    const currentTab = navigation.find(tab => tab.href === pathname)
    if (currentTab) {
      setActiveTab(currentTab.id)
    }
  }, [pathname])

  const handleTabClick = (tab: any) => {
    setActiveTab(tab.id)
    router.push(tab.href)
  }

  if (!user) {
    return <LoadingScreen onComplete={() => {}} duration={2000} />
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Image
                src="/pinetribe-green.svg"
                alt="PineTribe Logo"
                width={120}
                height={32}
                className="h-8 w-auto"
                priority
              />
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
                <div className="flex items-center gap-1 mt-1">
                  {isPremium ? (
                    <div className="flex items-center gap-1">
                      <Crown className="w-3 h-3 text-yellow-500" />
                      <span className="text-xs text-yellow-600 font-medium">Premium</span>
                    </div>
                  ) : (
                    <span className="text-xs text-gray-500">Free Plan</span>
                  )}
                </div>
              </div>
              <div className="w-10 h-10 bg-forest-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-forest-600" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-6">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-20">
        <div className="flex">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item)}
                className={`flex-1 flex flex-col items-center py-3 px-2 transition-colors ${
                  isActive ? 'text-forest-600' : 'text-gray-500'
                }`}
              >
                <Icon className={`w-6 h-6 mb-1 ${isActive ? 'text-forest-600' : 'text-gray-400'}`} />
                <span className={`text-xs font-medium ${isActive ? 'text-forest-600' : 'text-gray-500'}`}>
                  {item.name}
                </span>
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PlanProvider>
      <DashboardContent>{children}</DashboardContent>
    </PlanProvider>
  )
}
