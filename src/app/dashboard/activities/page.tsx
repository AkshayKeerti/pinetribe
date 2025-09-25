'use client'

import { useState } from 'react'
import { Calendar, Clock, MapPin, Users, Star, Filter, Search, Crown, Lock, Zap } from 'lucide-react'
import { usePlan } from '@/contexts/PlanContext'
import { canAccessFeature } from '@/utils/planUtils'

export default function Activities() {
  const { userPlan, isPremium } = usePlan()
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedActivity, setSelectedActivity] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const activities = [
    { value: 'all', label: 'All Activities' },
    { value: 'yoga', label: 'Yoga' },
    { value: 'running', label: 'Running' },
    { value: 'hiking', label: 'Hiking' },
    { value: 'circuit', label: 'Circuit Training' },
    { value: 'social', label: 'Social Events' }
  ]

  const classes = [
    {
      id: 1,
      title: 'Morning Yoga Flow',
      instructor: 'Sarah Chen',
      time: '7:00 AM',
      duration: '60 min',
      location: 'Oak Grove',
      level: 'Beginner',
      type: 'yoga',
      spotsLeft: 8,
      maxSpots: 12,
      rating: 4.9,
      price: 15,
      description: 'Start your day with guided yoga flows led by our expert instructor.',
      equipment: 'Yoga mat provided'
    },
    {
      id: 2,
      title: 'Forest Trail Run',
      instructor: 'Mike Rodriguez',
      time: '6:00 PM',
      duration: '45 min',
      location: 'Pine Ridge Trail',
      level: 'Intermediate',
      type: 'running',
      spotsLeft: 5,
      maxSpots: 15,
      rating: 4.8,
      price: 12,
      description: 'Guided trail run with pace coaching and technique tips.',
      equipment: 'Running shoes provided'
    },
    {
      id: 3,
      title: 'Sunset Circuit',
      instructor: 'Emma Wilson',
      time: '7:30 PM',
      duration: '50 min',
      location: 'Meadow Clearing',
      level: 'All Levels',
      type: 'circuit',
      spotsLeft: 12,
      maxSpots: 20,
      rating: 4.7,
      price: 18,
      description: 'High-energy circuit training as the sun sets over the meadow.',
      equipment: 'All equipment provided'
    },
    {
      id: 4,
      title: 'Mountain Hike',
      instructor: 'Alex Thompson',
      time: '9:00 AM',
      duration: '3 hours',
      location: 'Summit Trail',
      level: 'Advanced',
      type: 'hiking',
      spotsLeft: 3,
      maxSpots: 10,
      rating: 4.9,
      price: 25,
      description: 'Challenging hike to the mountain summit with breathtaking views.',
      equipment: 'Hiking boots, water bottle'
    },
    {
      id: 5,
      title: 'Tribe Social',
      instructor: 'Community',
      time: '6:30 PM',
      duration: '2 hours',
      location: 'Fire Pit Area',
      level: 'All Levels',
      type: 'social',
      spotsLeft: 25,
      maxSpots: 30,
      rating: 4.8,
      price: 10,
      description: 'Weekly social gathering with games, food, and community bonding.',
      equipment: 'None required'
    },
    {
      id: 6,
      title: 'Meditation Circle',
      instructor: 'Luna Park',
      time: '8:00 AM',
      duration: '30 min',
      location: 'Zen Garden',
      level: 'All Levels',
      type: 'yoga',
      spotsLeft: 15,
      maxSpots: 20,
      rating: 4.9,
      price: 8,
      description: 'Guided meditation in our peaceful zen garden setting.',
      equipment: 'Cushions provided'
    },
    {
      id: 7,
      title: 'Sunrise Yoga',
      instructor: 'Maya Patel',
      time: '6:30 AM',
      duration: '75 min',
      location: 'Lake View',
      level: 'Intermediate',
      type: 'yoga',
      spotsLeft: 6,
      maxSpots: 15,
      rating: 4.9,
      price: 20,
      description: 'Energizing morning yoga session with stunning lake views.',
      equipment: 'Yoga mat provided'
    },
    {
      id: 8,
      title: 'Night Trail Run',
      instructor: 'Jake Morrison',
      time: '8:00 PM',
      duration: '60 min',
      location: 'Moonlight Trail',
      level: 'Advanced',
      type: 'running',
      spotsLeft: 4,
      maxSpots: 12,
      rating: 4.8,
      price: 22,
      description: 'Adventure run under the stars with headlamps provided.',
      equipment: 'Headlamps provided'
    }
  ]

  const filteredClasses = classes.filter(classItem => {
    const matchesActivity = selectedActivity === 'all' || classItem.type === selectedActivity
    const matchesSearch = classItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         classItem.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         classItem.location.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesActivity && matchesSearch
  })

  const handleBookClass = (classId: number) => {
    const classItem = classes.find(c => c.id === classId)
    if (!classItem) return
    
    if (!userPlan || !canAccessFeature(userPlan, 'book_activity')) {
      alert('Upgrade to Premium to book activities and join classes!')
      return
    }
    
    if (isPremium) {
      alert(`Booked: ${classItem.title}\nTime: ${classItem.time}\nLocation: ${classItem.location}\n\nFree with Premium membership!`)
    } else {
      alert(`Booked: ${classItem.title}\nCost: $${classItem.price}\nTime: ${classItem.time}\nLocation: ${classItem.location}\n\nPayment required to confirm booking.`)
    }
  }

  const handleUpgrade = () => {
    alert('Upgrade to Premium to join all activities for free!')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-forest-500 to-forest-700 rounded-3xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">PineTribe Sessions</h1>
        <p className="text-white/90">
          {isPremium ? 'Join any activity for free with Premium!' : 'Browse activities - upgrade to Premium to join classes'}
        </p>
      </div>

      {/* Plan Status Banner */}
      {!isPremium && (
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <Crown className="w-6 h-6 text-yellow-600" />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Upgrade to Premium</h3>
              <p className="text-sm text-gray-600">Join activities and access all community features with Premium</p>
            </div>
            <button
              onClick={handleUpgrade}
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-600 transition-colors"
            >
              Upgrade
            </button>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <div className="flex flex-col gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search classes, instructors, or locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent"
            />
          </div>

          {/* Activity Filter */}
          <div className="flex gap-2 overflow-x-auto">
            {activities.map((activity) => (
              <button
                key={activity.value}
                onClick={() => setSelectedActivity(activity.value)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  selectedActivity === activity.value
                    ? 'bg-forest-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {activity.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Classes Grid */}
      <div className="space-y-4">
        {filteredClasses.map((classItem) => (
          <div key={classItem.id} className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="text-3xl">
                {classItem.type === 'yoga' ? '🧘' : 
                 classItem.type === 'running' ? '🏃' : 
                 classItem.type === 'hiking' ? '🥾' : 
                 classItem.type === 'circuit' ? '💪' : '🎉'}
              </div>
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
                    <span>{classItem.time} • {classItem.duration}</span>
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
                
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <span>Instructor:</span>
                  <span className="font-medium">{classItem.instructor}</span>
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-yellow-600">{classItem.rating}</span>
                </div>

                <p className="text-gray-600 mb-3">{classItem.description}</p>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="font-medium">Equipment:</span>
                  <span>{classItem.equipment}</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                {isPremium ? (
                  <>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">Free</div>
                      <div className="text-xs text-gray-600">with Premium</div>
                    </div>
                    <button
                      onClick={() => handleBookClass(classItem.id)}
                      className="bg-forest-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-forest-700 transition-colors"
                    >
                      Book Now
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
                      className="bg-yellow-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-yellow-600 transition-colors flex items-center gap-2 justify-center"
                    >
                      <Crown className="w-4 h-4" />
                      Upgrade to Book
                    </button>
                  </>
                )}

                {classItem.spotsLeft > 0 && classItem.spotsLeft <= 3 && (
                  <p className="text-xs text-orange-600 text-center">
                    Only {classItem.spotsLeft} spots left!
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredClasses.length === 0 && (
        <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
          <div className="text-gray-400 mb-4">
            <Calendar className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No classes found</h3>
          <p className="text-gray-600">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  )
}