'use client'

import { useState, useEffect } from 'react'
import { TreePine, User, Calendar, Trophy, Users, Settings, Home } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('home')

  useEffect(() => {
    const userData = localStorage.getItem('pinetribe_user')
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push('/')
    }
  }, [router])

  const navigation = [
    { id: 'home', name: 'Home', href: '/dashboard', icon: Home },
    { id: 'membership', name: 'Pass', href: '/dashboard/membership', icon: User },
    { id: 'activities', name: 'Classes', href: '/dashboard/activities', icon: Calendar },
    { id: 'progress', name: 'Progress', href: '/dashboard/progress', icon: Trophy },
    { id: 'groups', name: 'Tribe', href: '/dashboard/groups', icon: Users },
  ]

  const handleTabClick = (tab: any) => {
    setActiveTab(tab.id)
    router.push(tab.href)
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TreePine className="w-8 h-8 text-forest-500" />
              <span className="text-xl font-bold text-gray-900">PineTribe</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
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
