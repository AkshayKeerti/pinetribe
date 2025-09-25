'use client'

import { useState } from 'react'
import { Trophy, Target, Calendar, Users, Star, Award, TrendingUp } from 'lucide-react'

export default function Progress() {
  const [activeTab, setActiveTab] = useState('overview')

  const stats = {
    classesCompleted: 12,
    currentStreak: 5,
    longestStreak: 12,
    badgesEarned: 8,
    totalBadges: 15,
    tribeMembers: 24,
    monthlyGoal: 8,
    monthlyProgress: 6
  }

  const badges = [
    {
      id: 1,
      name: 'First Steps',
      description: 'Complete your first class',
      icon: '🌱',
      earned: true,
      earnedDate: '2024-01-15',
      rarity: 'common'
    },
    {
      id: 2,
      name: 'Forest Explorer',
      description: 'Try 3 different activity types',
      icon: '🌲',
      earned: true,
      earnedDate: '2024-02-03',
      rarity: 'common'
    },
    {
      id: 3,
      name: 'Streak Master',
      description: 'Maintain a 7-day streak',
      icon: '🔥',
      earned: true,
      earnedDate: '2024-02-10',
      rarity: 'rare'
    },
    {
      id: 4,
      name: 'Social Butterfly',
      description: 'Meet 10 tribe members',
      icon: '🦋',
      earned: true,
      earnedDate: '2024-02-20',
      rarity: 'common'
    },
    {
      id: 5,
      name: 'Early Bird',
      description: 'Complete 5 morning classes',
      icon: '🐦',
      earned: true,
      earnedDate: '2024-03-01',
      rarity: 'common'
    },
    {
      id: 6,
      name: 'Mountain Climber',
      description: 'Complete 3 hiking classes',
      icon: '⛰️',
      earned: true,
      earnedDate: '2024-03-08',
      rarity: 'rare'
    },
    {
      id: 7,
      name: 'Zen Master',
      description: 'Complete 10 yoga sessions',
      icon: '🧘',
      earned: true,
      earnedDate: '2024-03-15',
      rarity: 'rare'
    },
    {
      id: 8,
      name: 'Tribe Leader',
      description: 'Lead a group activity',
      icon: '👑',
      earned: true,
      earnedDate: '2024-03-22',
      rarity: 'epic'
    },
    {
      id: 9,
      name: 'Night Owl',
      description: 'Complete 5 evening classes',
      icon: '🦉',
      earned: false,
      rarity: 'common'
    },
    {
      id: 10,
      name: 'Speed Demon',
      description: 'Complete 5 running classes',
      icon: '💨',
      earned: false,
      rarity: 'common'
    },
    {
      id: 11,
      name: 'Circuit Champion',
      description: 'Complete 10 circuit training sessions',
      icon: '💪',
      earned: false,
      rarity: 'rare'
    },
    {
      id: 12,
      name: 'Forest Guardian',
      description: 'Complete 20 classes total',
      icon: '🛡️',
      earned: false,
      rarity: 'epic'
    }
  ]

  const recentActivity = [
    {
      type: 'class',
      title: 'Morning Yoga Flow',
      date: '2024-03-25',
      points: 50,
      badge: null
    },
    {
      type: 'badge',
      title: 'Tribe Leader',
      date: '2024-03-22',
      points: 100,
      badge: '👑'
    },
    {
      type: 'class',
      title: 'Forest Trail Run',
      date: '2024-03-20',
      points: 75,
      badge: null
    },
    {
      type: 'streak',
      title: '5-day streak achieved!',
      date: '2024-03-19',
      points: 25,
      badge: null
    },
    {
      type: 'class',
      title: 'Sunset Circuit',
      date: '2024-03-18',
      points: 60,
      badge: null
    }
  ]

  const earnedBadges = badges.filter(badge => badge.earned)
  const unearnedBadges = badges.filter(badge => !badge.earned)

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-700'
      case 'rare': return 'bg-blue-100 text-blue-700'
      case 'epic': return 'bg-purple-100 text-purple-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="forest-gradient rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Grow with the Tribe</h1>
        <p className="text-white/90 text-lg">
          Track your progress and celebrate your achievements
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card text-center">
          <div className="text-3xl font-bold text-forest-600 mb-2">
            {stats.classesCompleted}
          </div>
          <div className="text-sm text-gray-600">Classes Completed</div>
        </div>
        
        <div className="card text-center">
          <div className="text-3xl font-bold text-pine-600 mb-2">
            {stats.currentStreak}
          </div>
          <div className="text-sm text-gray-600">Current Streak</div>
        </div>
        
        <div className="card text-center">
          <div className="text-3xl font-bold text-forest-600 mb-2">
            {stats.badgesEarned}
          </div>
          <div className="text-sm text-gray-600">Badges Earned</div>
        </div>
        
        <div className="card text-center">
          <div className="text-3xl font-bold text-pine-600 mb-2">
            {stats.tribeMembers}
          </div>
          <div className="text-sm text-gray-600">Tribe Members</div>
        </div>
      </div>

      {/* Monthly Goal Progress */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900">Monthly Goal</h3>
          <span className="text-sm text-gray-600">
            {stats.monthlyProgress}/{stats.monthlyGoal} classes
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
          <div 
            className="forest-gradient h-3 rounded-full transition-all duration-500"
            style={{ width: `${(stats.monthlyProgress / stats.monthlyGoal) * 100}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between text-sm text-gray-600">
          <span>{stats.monthlyProgress} completed</span>
          <span>{stats.monthlyGoal - stats.monthlyProgress} to go</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'overview'
              ? 'text-forest-600 border-b-2 border-forest-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('badges')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'badges'
              ? 'text-forest-600 border-b-2 border-forest-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Badges ({stats.badgesEarned})
        </button>
        <button
          onClick={() => setActiveTab('activity')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'activity'
              ? 'text-forest-600 border-b-2 border-forest-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Recent Activity
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid gap-6">
          {/* Achievements Summary */}
          <div className="card">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Achievements Summary</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Longest Streak</span>
                  <span className="font-semibold">{stats.longestStreak} days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Classes</span>
                  <span className="font-semibold">{stats.classesCompleted}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Badge Progress</span>
                  <span className="font-semibold">{stats.badgesEarned}/{stats.totalBadges}</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Tribe Connections</span>
                  <span className="font-semibold">{stats.tribeMembers}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Monthly Progress</span>
                  <span className="font-semibold">{Math.round((stats.monthlyProgress / stats.monthlyGoal) * 100)}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Member Since</span>
                  <span className="font-semibold">Jan 2024</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card text-center">
              <TrendingUp className="w-8 h-8 text-forest-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900 mb-1">+25%</div>
              <div className="text-sm text-gray-600">vs last month</div>
            </div>
            
            <div className="card text-center">
              <Target className="w-8 h-8 text-pine-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900 mb-1">75%</div>
              <div className="text-sm text-gray-600">goal completion</div>
            </div>
            
            <div className="card text-center">
              <Users className="w-8 h-8 text-forest-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900 mb-1">8</div>
              <div className="text-sm text-gray-600">new connections</div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'badges' && (
        <div className="space-y-6">
          {/* Earned Badges */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Earned Badges ({earnedBadges.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {earnedBadges.map((badge) => (
                <div key={badge.id} className="card hover:shadow-md transition-shadow">
                  <div className="text-center">
                    <div className="text-4xl mb-3">{badge.icon}</div>
                    <h4 className="font-semibold text-gray-900 mb-2">{badge.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">{badge.description}</p>
                    <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(badge.rarity)}`}>
                      {badge.rarity}
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      Earned {badge.earnedDate ? new Date(badge.earnedDate).toLocaleDateString() : 'Recently'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Unearned Badges */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Available Badges ({unearnedBadges.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {unearnedBadges.map((badge) => (
                <div key={badge.id} className="card opacity-60 hover:opacity-80 transition-opacity">
                  <div className="text-center">
                    <div className="text-4xl mb-3 grayscale">{badge.icon}</div>
                    <h4 className="font-semibold text-gray-900 mb-2">{badge.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">{badge.description}</p>
                    <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(badge.rarity)}`}>
                      {badge.rarity}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'activity' && (
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="card">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-forest-100 rounded-full flex items-center justify-center">
                  {activity.badge ? (
                    <span className="text-2xl">{activity.badge}</span>
                  ) : (
                    <Trophy className="w-6 h-6 text-forest-600" />
                  )}
                </div>
                
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{activity.title}</h4>
                  <p className="text-sm text-gray-600">
                    {new Date(activity.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                
                <div className="text-right">
                  <div className="text-sm font-semibold text-forest-600">+{activity.points}</div>
                  <div className="text-xs text-gray-500">points</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
