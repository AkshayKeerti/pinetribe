'use client'

import { useState } from 'react'
import { Calendar, Clock, MapPin, Users, Star, Filter, Search, Crown, Lock, Zap } from 'lucide-react'
import { usePlan } from '@/contexts/PlanContext'

export default function Activities() {
  const { isPremium } = usePlan()
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedActivity, setSelectedActivity] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const activities = [
    { value: 'all', label: 'All Activities' },
    { value: 'free', label: 'Free Activities' },
    { value: 'premium', label: 'Premium Activities' },
    { value: 'yoga', label: 'Yoga' },
    { value: 'running', label: 'Running' },
    { value: 'hiking', label: 'Hiking' },
    { value: 'circuit', label: 'Circuit Training' },
    { value: 'social', label: 'Social Events' }
  ]

  const classes = [
    {
      id: 1,
      title: 'Self-Guided Yoga',
      instructor: 'Unsupervised',
      time: '7:00 AM',
      duration: '60 min',
      location: 'Oak Grove',
      level: 'Beginner',
      type: 'yoga',
      planType: 'free',
      spotsLeft: 15,
      maxSpots: 20,
      rating: 4.2,
      price: 8,
      description: 'Practice yoga at your own pace in the peaceful oak grove.',
      equipment: 'Yoga mat required'
    },
    {
      id: 2,
      title: 'Morning Yoga Flow',
      instructor: 'Sarah Chen',
      time: '7:00 AM',
      duration: '60 min',
      location: 'Premium Oak Grove',
      level: 'Beginner',
      type: 'yoga',
      planType: 'premium',
      spotsLeft: 8,
      maxSpots: 12,
      rating: 4.9,
      price: 0,
      description: 'Start your day with guided yoga flows led by our expert instructor.',
      equipment: 'Yoga mat provided'
    },
    {
      id: 3,
      title: 'Trail Running',
      instructor: 'Unsupervised',
      time: '6:00 PM',
      duration: '45 min',
      location: 'Pine Ridge Trail',
      level: 'Intermediate',
      type: 'running',
      planType: 'free',
      spotsLeft: 20,
      maxSpots: 25,
      rating: 4.1,
      price: 5,
      description: 'Run at your own pace through scenic forest trails.',
      equipment: 'Running shoes required'
    },
    {
      id: 4,
      title: 'Forest Trail Run',
      instructor: 'Mike Rodriguez',
      time: '6:00 PM',
      duration: '45 min',
      location: 'Premium Pine Ridge',
      level: 'Intermediate',
      type: 'running',
      planType: 'premium',
      spotsLeft: 5,
      maxSpots: 15,
      rating: 4.8,
      price: 0,
      description: 'Guided trail run with pace coaching and technique tips.',
      equipment: 'Running shoes provided'
    },
    {
      id: 5,
      title: 'Sunset Circuit',
      instructor: 'Emma Wilson',
      time: '7:30 PM',
      duration: '50 min',
      location: 'Meadow Clearing',
      level: 'All Levels',
      type: 'circuit',
      planType: 'premium',
      spotsLeft: 12,
      maxSpots: 20,
      rating: 4.7,
      price: 0,
      description: 'High-energy circuit training as the sun sets over the meadow.',
      equipment: 'All equipment provided'
    },
    {
      id: 6,
      title: 'Mountain Hike',
      instructor: 'Alex Thompson',
      time: '9:00 AM',
      duration: '3 hours',
      location: 'Summit Trail',
      level: 'Advanced',
      type: 'hiking',
      planType: 'premium',
      spotsLeft: 3,
      maxSpots: 10,
      rating: 4.9,
      price: 0,
      description: 'Challenging hike to the mountain summit with breathtaking views.',
      equipment: 'Hiking boots, water bottle'
    },
    {
      id: 7,
      title: 'Tribe Social',
      instructor: 'Community',
      time: '6:30 PM',
      duration: '2 hours',
      location: 'Fire Pit Area',
      level: 'All Levels',
      type: 'social',
      planType: 'premium',
      spotsLeft: 25,
      maxSpots: 30,
      rating: 4.8,
      price: 0,
      description: 'Weekly social gathering with games, food, and community bonding.',
      equipment: 'None required'
    },
    {
      id: 8,
      title: 'Meditation Circle',
      instructor: 'Luna Park',
      time: '8:00 AM',
      duration: '30 min',
      location: 'Zen Garden',
      level: 'All Levels',
      type: 'yoga',
      planType: 'premium',
      spotsLeft: 15,
      maxSpots: 20,
      rating: 4.9,
      price: 0,
      description: 'Guided meditation in our peaceful zen garden setting.',
      equipment: 'Cushions provided'
    }
  ]

  const filteredClasses = classes.filter(classItem => {
    const matchesActivity = selectedActivity === 'all' || 
                           classItem.type === selectedActivity ||
                           (selectedActivity === 'free' && classItem.planType === 'free') ||
                           (selectedActivity === 'premium' && classItem.planType === 'premium')
    const matchesSearch = classItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         classItem.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         classItem.location.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesActivity && matchesSearch
  })

  const handleBookClass = (classId: number) => {
    const classItem = classes.find(c => c.id === classId)
    if (classItem) {
      if (classItem.planType === 'premium' && !isPremium) {
        alert('This is a Premium activity. Upgrade to Premium to access instructor-led classes!')
        return
      }
      
      if (classItem.planType === 'free') {
        alert(`Booked: ${classItem.title}\nCost: $${classItem.price}\nTime: ${classItem.time}\nLocation: ${classItem.location}`)
      } else {
        alert(`Booked: ${classItem.title}\nTime: ${classItem.time}\nLocation: ${classItem.location}`)
      }
    }
  }

  const handleUpgrade = () => {
    alert('Upgrade to Premium to unlock all instructor-led classes and premium features!')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-forest-500 to-forest-700 rounded-3xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">PineTribe Sessions</h1>
        <p className="text-white/90">
          {isPremium ? 'Access all activities' : 'Choose from free activities or upgrade for more'}
        </p>
      </div>

      {/* Plan Status Banner */}
      {!isPremium && (
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <Crown className="w-6 h-6 text-yellow-600" />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Unlock Premium Features</h3>
              <p className="text-sm text-gray-600">Get unlimited access to instructor-led classes</p>
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
                  {classItem.planType === 'premium' ? (
                    <div className="flex items-center gap-1">
                      <Crown className="w-4 h-4 text-yellow-500" />
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                        Premium
                      </span>
                    </div>
                  ) : (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                      Free
                    </span>
                  )}
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
                {classItem.planType === 'free' ? (
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">${classItem.price}</div>
                    <div className="text-xs text-gray-600">per session</div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">Free</div>
                    <div className="text-xs text-gray-600">with Premium</div>
                  </div>
                )}
                
                <button
                  onClick={() => handleBookClass(classItem.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    classItem.planType === 'premium' && !isPremium
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-forest-600 text-white hover:bg-forest-700'
                  }`}
                  disabled={classItem.planType === 'premium' && !isPremium}
                >
                  {classItem.planType === 'premium' && !isPremium ? (
                    <div className="flex items-center gap-1">
                      <Lock className="w-4 h-4" />
                      <span>Premium</span>
                    </div>
                  ) : (
                    'Book Now'
                  )}
                </button>

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