'use client'

import { useState } from 'react'
import { User, Bell, Shield, HelpCircle, LogOut, Edit3 } from 'lucide-react'

export default function Settings() {
  const [user, setUser] = useState<any>(null)
  const [notifications, setNotifications] = useState({
    classReminders: true,
    groupMessages: true,
    newBadges: true,
    weeklyDigest: false,
    marketing: false
  })

  useState(() => {
    const userData = localStorage.getItem('pinetribe_user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  })

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }))
  }

  const handleLogout = () => {
    localStorage.removeItem('pinetribe_user')
    window.location.href = '/'
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="forest-gradient rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-white/90 text-lg">
          Manage your account and preferences
        </p>
      </div>

      {/* Profile Settings */}
      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <User className="w-6 h-6 text-forest-600" />
          <h2 className="text-xl font-semibold text-gray-900">Profile</h2>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-forest-100 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-forest-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{user?.name || 'Your Name'}</h3>
              <p className="text-gray-600">{user?.email || 'your@email.com'}</p>
              <p className="text-sm text-gray-500">Member since January 2024</p>
            </div>
            <button className="btn-secondary flex items-center gap-2">
              <Edit3 className="w-4 h-4" />
              Edit Profile
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fitness Level
              </label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent">
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Activities
              </label>
              <div className="text-sm text-gray-600">
                {user?.interests?.join(', ') || 'Yoga, Running, Hiking'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-6 h-6 text-forest-600" />
          <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
        </div>

        <div className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </div>
                <div className="text-sm text-gray-600">
                  {key === 'classReminders' && 'Get notified before your booked classes'}
                  {key === 'groupMessages' && 'Receive notifications for group messages'}
                  {key === 'newBadges' && 'Celebrate when you earn new badges'}
                  {key === 'weeklyDigest' && 'Weekly summary of your progress'}
                  {key === 'marketing' && 'Updates about new features and events'}
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => handleNotificationChange(key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-forest-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-forest-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy & Security */}
      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-6 h-6 text-forest-600" />
          <h2 className="text-xl font-semibold text-gray-900">Privacy & Security</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Profile Visibility</div>
              <div className="text-sm text-gray-600">Control who can see your profile</div>
            </div>
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent">
              <option value="public">Public</option>
              <option value="tribe">Tribe Members Only</option>
              <option value="private">Private</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Activity Sharing</div>
              <div className="text-sm text-gray-600">Share your progress with tribe members</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-forest-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-forest-600"></div>
            </label>
          </div>

          <button className="btn-secondary w-full">
            Change Password
          </button>
        </div>
      </div>

      {/* Support */}
      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <HelpCircle className="w-6 h-6 text-forest-600" />
          <h2 className="text-xl font-semibold text-gray-900">Support</h2>
        </div>

        <div className="space-y-4">
          <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="font-medium text-gray-900">Help Center</div>
            <div className="text-sm text-gray-600">Find answers to common questions</div>
          </button>

          <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="font-medium text-gray-900">Contact Support</div>
            <div className="text-sm text-gray-600">Get help from our support team</div>
          </button>

          <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="font-medium text-gray-900">Feedback</div>
            <div className="text-sm text-gray-600">Share your thoughts and suggestions</div>
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="card border-red-200">
        <div className="flex items-center gap-3 mb-6">
          <LogOut className="w-6 h-6 text-red-600" />
          <h2 className="text-xl font-semibold text-red-900">Account</h2>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleLogout}
            className="w-full p-4 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors"
          >
            <div className="font-medium">Sign Out</div>
            <div className="text-sm">Sign out of your PineTribe account</div>
          </button>

          <button className="w-full p-4 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors">
            <div className="font-medium">Delete Account</div>
            <div className="text-sm">Permanently delete your account and data</div>
          </button>
        </div>
      </div>
    </div>
  )
}
