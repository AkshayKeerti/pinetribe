'use client'

import { useState, useEffect } from 'react'
import { Calendar, Clock, MapPin, Users, Star, ChevronRight, Crown, Zap, Lock } from 'lucide-react'
import { usePlan } from '@/contexts/PlanContext'
import { canAccessFeature } from '@/utils/planUtils'

export default function Dashboard() {
  const { userPlan, isPremium } = usePlan()
  const [user, setUser] = useState<any>(null)
  const [upcomingClasses, setUpcomingClasses] = useState([
    {
      id: 1,
      title: 'Morning Yoga Flow',
      instructor: 'Sarah Chen',
      time: '7:00 AM',
      date: 'Today',
      location: 'Oak Grove',
      level: 'Beginner',
      spotsLeft: 8,
      maxSpots: 12,
      emoji: '🧘',
      price: 15
    },
    {
      id: 2,
      title: 'Forest Trail Run',
      instructor: 'Mike Rodriguez',
      time: '6:00 PM',
      date: 'Today',
      location: 'Pine Ridge Trail',
      level: 'Intermediate',
      spotsLeft: 5,
      maxSpots: 15,
      emoji: '🏃',
      price: 12
    },
    {
      id: 3,
      title: 'Sunset Circuit',
      instructor: 'Emma Wilson',
      time: '7:30 PM',
      date: 'Tomorrow',
      location: 'Meadow Clearing',
      level: 'All Levels',
      spotsLeft: 12,
      maxSpots: 20,
      emoji: '💪',
      price: 18
    }
  ])

  const [stats, setStats] = useState({
    classesCompleted: 12,
    currentStreak: 5,
    badgesEarned: 8,
    tribeMembers: 24
  })

  useEffect(() => {
    const userData = localStorage.getItem('pinetribe_user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleBookClass = (classId: number) => {
    const classItem = upcomingClasses.find(c => c.id === classId)
    if (!classItem) return
    
    if (!userPlan || !canAccessFeature(userPlan, 'book_activity')) {
      alert('Upgrade to Premium to book activities and join classes!')
      return
    }
    
    if (isPremium) {
      alert(`Class "${classItem.title}" booked successfully!\nTime: ${classItem.time}\nLocation: ${classItem.location}\n\nFree with Premium membership!`)
    } else {
      alert(`Class "${classItem.title}" booked successfully!\nCost: $${classItem.price}\nTime: ${classItem.time}\nLocation: ${classItem.location}\n\nPayment required to confirm booking.`)
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-br from-forest-500 to-forest-700 rounded-3xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {user?.name?.split(' ')[0]}! 🌲
        </h1>
        <p className="text-white/90">
          {isPremium ? 'Ready for your next adventure in nature?' : 'Browse activities and upgrade to join your tribe!'}
        </p>
      </div>

      {/* Premium Banner for Free Users */}
      {!isPremium && (
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <Crown className="w-6 h-6 text-yellow-600" />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Upgrade to Premium</h3>
              <p className="text-sm text-gray-600">Join activities, groups, and access all community features</p>
            </div>
            <button
              onClick={() => alert('Redirecting to upgrade page...')}
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-600 transition-colors"
            >
              Upgrade
            </button>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
          <div className="text-2xl font-bold text-forest-600 mb-1">
            {stats.classesCompleted}
          </div>
          <div className="text-sm text-gray-600">Classes</div>
        </div>
        
        <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
          <div className="text-2xl font-bold text-pine-600 mb-1">
            {stats.currentStreak}
          </div>
          <div className="text-sm text-gray-600">Day Streak</div>
        </div>
        
        <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
          <div className="text-2xl font-bold text-forest-600 mb-1">
            {stats.badgesEarned}
          </div>
          <div className="text-sm text-gray-600">Badges</div>
        </div>
        
        <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
          <div className="text-2xl font-bold text-pine-600 mb-1">
            {stats.tribeMembers}
          </div>
          <div className="text-sm text-gray-600">Tribe</div>
        </div>
      </div>

      {/* Upcoming Classes */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Upcoming Classes</h2>
          <a href="/dashboard/activities" className="text-forest-600 hover:text-forest-700 font-medium flex items-center gap-1">
            View All
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        <div className="space-y-4">
          {upcomingClasses.map((classItem) => (
            <div key={classItem.id} className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="text-3xl">{classItem.emoji}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900">
                      {classItem.title}
                    </h3>
                    <span className="px-2 py-1 bg-forest-100 text-forest-700 text-xs font-medium rounded-full">
                      {classItem.level}
                    </span>
                  </div>
                  
                  <div className="space-y-1 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{classItem.time} • {classItem.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{classItem.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{classItem.spotsLeft} spots left</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>Instructor:</span>
                    <span className="font-medium">{classItem.instructor}</span>
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-yellow-600">4.9</span>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-2">
                  {isPremium ? (
                    <>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">Free</div>
                        <div className="text-xs text-gray-600">with Premium</div>
                      </div>
                      <button
                        onClick={() => handleBookClass(classItem.id)}
                        className="bg-forest-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-forest-700 transition-colors disabled:bg-gray-300"
                        disabled={classItem.spotsLeft === 0}
                      >
                        {classItem.spotsLeft === 0 ? 'Full' : 'Book'}
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="text-center">
                        <Lock className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                        <div className="text-sm text-gray-600 mb-2">Premium Feature</div>
                      </div>
                      <button
                        onClick={() => handleBookClass(classItem.id)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-yellow-600 transition-colors flex items-center gap-2"
                      >
                        <Crown className="w-4 h-4" />
                        Upgrade to Book
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-4">
          <a href="/dashboard/membership" className="bg-white rounded-2xl p-4 shadow-sm text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-forest-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Membership</h3>
            <p className="text-xs text-gray-600">View your pass</p>
          </a>
          
          <a href="/dashboard/groups" className="bg-white rounded-2xl p-4 shadow-sm text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-pine-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-pine-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Find Tribe</h3>
            <p className="text-xs text-gray-600">Join groups</p>
          </a>
          
          <a href="/dashboard/progress" className="bg-white rounded-2xl p-4 shadow-sm text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-beige-200 rounded-full flex items-center justify-center mx-auto mb-3">
              <Star className="w-6 h-6 text-beige-700" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Progress</h3>
            <p className="text-xs text-gray-600">View badges</p>
          </a>

          <a href="/dashboard/settings" className="bg-white rounded-2xl p-4 shadow-sm text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-6 h-6 text-gray-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Settings</h3>
            <p className="text-xs text-gray-600">Manage account</p>
          </a>
        </div>
      </div>
    </div>
  )
}