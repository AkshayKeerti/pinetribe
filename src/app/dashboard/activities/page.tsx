'use client'

import { useState } from 'react'
import { Calendar, Clock, MapPin, Users, Star, Filter, Search } from 'lucide-react'

export default function Activities() {
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
      price: 'Free',
      description: 'Start your day with gentle yoga flows in the peaceful oak grove.',
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
      price: 'Free',
      description: 'Moderate pace trail run through scenic forest paths.',
      equipment: 'Running shoes required'
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
      price: 'Free',
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
      price: 'Free',
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
      price: 'Free',
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
      price: 'Free',
      description: 'Guided meditation in our peaceful zen garden setting.',
      equipment: 'Cushions provided'
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
    if (classItem) {
      alert(`Booked: ${classItem.title}\nTime: ${classItem.time}\nLocation: ${classItem.location}`)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="forest-gradient rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">PineTribe Sessions</h1>
        <p className="text-white/90 text-lg">
          Discover and book your next outdoor adventure
        </p>
      </div>

      {/* Filters and Search */}
      <div className="card">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
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
      <div className="grid gap-6">
        {filteredClasses.map((classItem) => (
          <div key={classItem.id} className="card hover:shadow-md transition-shadow">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Class Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {classItem.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{classItem.time} • {classItem.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{classItem.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{classItem.spotsLeft} spots left</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-forest-100 text-forest-700 text-xs font-medium rounded-full">
                      {classItem.level}
                    </span>
                    <span className="px-2 py-1 bg-pine-100 text-pine-700 text-xs font-medium rounded-full">
                      {classItem.price}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Instructor:</span>
                    <span className="font-medium">{classItem.instructor}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{classItem.rating}</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{classItem.description}</p>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="font-medium">Equipment:</span>
                  <span>{classItem.equipment}</span>
                </div>
              </div>

              {/* Booking Section */}
              <div className="lg:w-48 flex flex-col justify-between">
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-forest-600 mb-1">
                    {classItem.spotsLeft}
                  </div>
                  <div className="text-sm text-gray-600">
                    of {classItem.maxSpots} spots available
                  </div>
                </div>

                <button
                  onClick={() => handleBookClass(classItem.id)}
                  className="btn-primary w-full"
                  disabled={classItem.spotsLeft === 0}
                >
                  {classItem.spotsLeft === 0 ? 'Class Full' : 'Book Now'}
                </button>

                {classItem.spotsLeft > 0 && classItem.spotsLeft <= 3 && (
                  <p className="text-xs text-orange-600 text-center mt-2">
                    Only {classItem.spotsLeft} spots left!
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredClasses.length === 0 && (
        <div className="card text-center py-12">
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
