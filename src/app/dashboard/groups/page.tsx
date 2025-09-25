'use client'

import { useState } from 'react'
import { Users, MessageCircle, Hand, Heart, Plus, Search, Filter } from 'lucide-react'

export default function Groups() {
  const [activeTab, setActiveTab] = useState('my-groups')
  const [searchQuery, setSearchQuery] = useState('')

  const myGroups = [
    {
      id: 1,
      name: 'Trail Tribe',
      description: 'Wednesday evening trail runners',
      members: 12,
      activity: 'Running',
      schedule: 'Wed 6:00 PM',
      location: 'Pine Ridge Trail',
      isJoined: true,
      lastActivity: '2 hours ago',
      unreadMessages: 3
    },
    {
      id: 2,
      name: 'Yoga Tribe',
      description: 'Sunday morning yoga enthusiasts',
      members: 8,
      activity: 'Yoga',
      schedule: 'Sun 8:00 AM',
      location: 'Oak Grove',
      isJoined: true,
      lastActivity: '1 day ago',
      unreadMessages: 0
    },
    {
      id: 3,
      name: 'Circuit Squad',
      description: 'High-intensity circuit training',
      members: 15,
      activity: 'Circuit Training',
      schedule: 'Mon, Wed, Fri 7:30 PM',
      location: 'Meadow Clearing',
      isJoined: true,
      lastActivity: '3 hours ago',
      unreadMessages: 1
    }
  ]

  const availableGroups = [
    {
      id: 4,
      name: 'Hiking Heroes',
      description: 'Weekend mountain hiking adventures',
      members: 6,
      activity: 'Hiking',
      schedule: 'Sat 9:00 AM',
      location: 'Summit Trail',
      isJoined: false,
      lastActivity: '1 day ago',
      unreadMessages: 0
    },
    {
      id: 5,
      name: 'Social Circle',
      description: 'Community events and gatherings',
      members: 25,
      activity: 'Social Events',
      schedule: 'Fri 6:30 PM',
      location: 'Fire Pit Area',
      isJoined: false,
      lastActivity: '2 hours ago',
      unreadMessages: 0
    },
    {
      id: 6,
      name: 'Meditation Masters',
      description: 'Mindfulness and meditation sessions',
      members: 10,
      activity: 'Meditation',
      schedule: 'Tue, Thu 8:00 AM',
      location: 'Zen Garden',
      isJoined: false,
      lastActivity: '4 hours ago',
      unreadMessages: 0
    }
  ]

  const icebreakerPrompts = [
    "One forest memory I love is...",
    "My favorite outdoor activity is...",
    "I joined PineTribe because...",
    "My dream adventure would be...",
    "The best part about exercising outdoors is...",
    "I'm most excited to try..."
  ]

  const [selectedPrompt, setSelectedPrompt] = useState(icebreakerPrompts[0])
  const [response, setResponse] = useState('')

  const handleJoinGroup = (groupId: number) => {
    alert('Successfully joined the group! Welcome to the tribe! 🌲')
  }

  const handleLeaveGroup = (groupId: number) => {
    alert('You have left the group. You can rejoin anytime!')
  }

  const handleSendResponse = () => {
    if (response.trim()) {
      alert('Response shared! Your tribe members will see it. 🌟')
      setResponse('')
    }
  }

  const handleWave = () => {
    alert('Wave sent! 👋 Your tribe members will see your friendly greeting.')
  }

  const filteredMyGroups = myGroups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredAvailableGroups = availableGroups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="forest-gradient rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Find Your Tribe</h1>
        <p className="text-white/90 text-lg">
          Connect with like-minded people and build lasting friendships
        </p>
      </div>

      {/* Icebreaker Section */}
      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <Heart className="w-6 h-6 text-pine-600" />
          <h2 className="text-xl font-semibold text-gray-900">Break the Pinecone 🌲✨</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose a prompt to share with your tribe:
            </label>
            <select
              value={selectedPrompt}
              onChange={(e) => setSelectedPrompt(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent"
            >
              {icebreakerPrompts.map((prompt, index) => (
                <option key={index} value={prompt}>{prompt}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your response:
            </label>
            <textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder="Share your thoughts..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent h-24 resize-none"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSendResponse}
              className="btn-primary flex items-center gap-2"
              disabled={!response.trim()}
            >
              <Heart className="w-4 h-4" />
              Share Response
            </button>
            <button
              onClick={handleWave}
              className="btn-secondary flex items-center gap-2"
            >
              <Hand className="w-4 h-4" />
              Send Wave 👋
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="card">
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search groups..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('my-groups')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'my-groups'
              ? 'text-forest-600 border-b-2 border-forest-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          My Groups ({myGroups.length})
        </button>
        <button
          onClick={() => setActiveTab('available')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'available'
              ? 'text-forest-600 border-b-2 border-forest-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Available Groups ({availableGroups.length})
        </button>
      </div>

      {/* My Groups */}
      {activeTab === 'my-groups' && (
        <div className="space-y-6">
          {filteredMyGroups.map((group) => (
            <div key={group.id} className="card hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-semibold text-gray-900">{group.name}</h3>
                    <span className="px-2 py-1 bg-forest-100 text-forest-700 text-xs font-medium rounded-full">
                      {group.activity}
                    </span>
                    {group.unreadMessages > 0 && (
                      <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                        {group.unreadMessages} new
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 mb-4">{group.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{group.members} members</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>📅 {group.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>📍 {group.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>⏰ {group.lastActivity}</span>
                    </div>
                  </div>
                </div>
                
                <div className="ml-6 flex flex-col gap-2">
                  <button className="btn-primary flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Chat
                  </button>
                  <button
                    onClick={() => handleLeaveGroup(group.id)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    Leave Group
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Available Groups */}
      {activeTab === 'available' && (
        <div className="space-y-6">
          {filteredAvailableGroups.map((group) => (
            <div key={group.id} className="card hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-semibold text-gray-900">{group.name}</h3>
                    <span className="px-2 py-1 bg-pine-100 text-pine-700 text-xs font-medium rounded-full">
                      {group.activity}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{group.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{group.members} members</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>📅 {group.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>📍 {group.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>⏰ {group.lastActivity}</span>
                    </div>
                  </div>
                </div>
                
                <div className="ml-6">
                  <button
                    onClick={() => handleJoinGroup(group.id)}
                    className="btn-primary flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Join Group
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Group */}
      <div className="card text-center">
        <div className="py-8">
          <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-forest-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Don't see your tribe?</h3>
          <p className="text-gray-600 mb-6">
            Create your own group and invite others to join your adventure
          </p>
          <button className="btn-primary">
            Create New Group
          </button>
        </div>
      </div>
    </div>
  )
}
