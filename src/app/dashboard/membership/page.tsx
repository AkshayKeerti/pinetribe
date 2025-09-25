'use client'

import { useState, useEffect } from 'react'
import { QrCode, Download, Share, Gift, Calendar, Crown, Zap, Star, Check } from 'lucide-react'
import QRCode from 'qrcode'
import { usePlan } from '@/contexts/PlanContext'
import { PLANS, getPlanById } from '@/utils/planUtils'

export default function Membership() {
  const { userPlan, isPremium, updatePlan } = usePlan()
  const [user, setUser] = useState<any>(null)
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('')
  
  const currentPlan = userPlan ? getPlanById(userPlan.planType) : null
  const membershipData = {
    plan: currentPlan?.name || 'Free',
    renewalDate: userPlan?.subscriptionEndDate ? 
      new Date(userPlan.subscriptionEndDate).toLocaleDateString() : 'N/A',
    perks: currentPlan?.features || [],
    limitations: currentPlan?.limitations || []
  }

  useEffect(() => {
    const userData = localStorage.getItem('pinetribe_user')
    if (userData) {
      setUser(JSON.parse(userData))
    }

    // Generate QR code
    const generateQR = async () => {
      try {
        const qrData = {
          userId: user?.email || 'demo@example.com',
          membershipId: 'PT-2024-001',
          plan: currentPlan?.name || 'Free',
          expires: userPlan?.subscriptionEndDate || 'N/A'
        }
        
        const qrCodeUrl = await QRCode.toDataURL(JSON.stringify(qrData), {
          width: 200,
          margin: 2,
          color: {
            dark: '#2D5016',
            light: '#FFFFFF'
          }
        })
        setQrCodeDataUrl(qrCodeUrl)
      } catch (error) {
        console.error('Error generating QR code:', error)
      }
    }

    generateQR()
  }, [user, currentPlan, userPlan])

  const handleDownloadQR = () => {
    if (qrCodeDataUrl) {
      const link = document.createElement('a')
      link.download = 'pinetribe-membership-qr.png'
      link.href = qrCodeDataUrl
      link.click()
    }
  }

  const handleShareQR = async () => {
    if (navigator.share && qrCodeDataUrl) {
      try {
        const response = await fetch(qrCodeDataUrl)
        const blob = await response.blob()
        const file = new File([blob], 'pinetribe-membership-qr.png', { type: 'image/png' })
        
        await navigator.share({
          title: 'My PineTribe Membership',
          text: 'Check out my PineTribe membership card!',
          files: [file]
        })
      } catch (error) {
        console.error('Error sharing:', error)
        navigator.clipboard.writeText(window.location.href)
        alert('Link copied to clipboard!')
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  const handleUpgrade = () => {
    updatePlan('premium')
    alert('Welcome to Premium! You now have access to all features.')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-forest-500 to-forest-700 rounded-3xl p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <Crown className="w-8 h-8" />
          <h1 className="text-2xl font-bold">Your Tribe Pass</h1>
        </div>
        <p className="text-white/90">
          {isPremium ? 'Premium membership with full access' : 'Free membership with pay-per-activity'}
        </p>
      </div>

      {/* Plan Status Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{membershipData.plan} Plan</h2>
            <p className="text-gray-600">
              {isPremium ? 'Premium membership active' : 'Free membership - pay per activity'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {isPremium ? (
              <div className="flex items-center gap-1">
                <Crown className="w-6 h-6 text-yellow-500" />
                <span className="text-yellow-600 font-medium">Premium</span>
              </div>
            ) : (
              <span className="text-gray-500">Free</span>
            )}
          </div>
        </div>

        {isPremium && (
          <div className="text-sm text-gray-600 mb-4">
            <span className="font-medium">Renewal Date:</span> {membershipData.renewalDate}
          </div>
        )}

        {/* QR Code */}
        <div className="text-center mb-6">
          <div className="text-sm font-medium text-gray-700 mb-3">Your Membership QR Code</div>
          {qrCodeDataUrl ? (
            <div className="inline-block p-4 bg-white border-2 border-gray-200 rounded-lg">
              <img src={qrCodeDataUrl} alt="Membership QR Code" className="w-48 h-48" />
            </div>
          ) : (
            <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center mx-auto">
              <div className="text-gray-400">Loading QR Code...</div>
            </div>
          )}
        </div>

        {/* QR Code Actions */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={handleDownloadQR}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
          <button
            onClick={handleShareQR}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Share className="w-4 h-4" />
            Share
          </button>
        </div>
      </div>

      {/* Plan Benefits */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Your Benefits</h3>
        <div className="space-y-3">
          {membershipData.perks.map((perk, index) => (
            <div key={index} className="flex items-center gap-3">
              <Check className="w-5 h-5 text-forest-600 flex-shrink-0" />
              <span className="text-gray-700">{perk}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Limitations for Free Plan */}
      {!isPremium && membershipData.limitations.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Current Limitations</h3>
          <div className="space-y-3">
            {membershipData.limitations.map((limitation, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <span className="text-gray-600">{limitation}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upgrade Section */}
      {!isPremium && (
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Upgrade to Premium</h3>
            <p className="text-gray-600 mb-4">
              Unlock unlimited instructor-led classes, premium locations, and exclusive features
            </p>
            
            <div className="bg-white rounded-lg p-4 mb-4">
              <div className="text-3xl font-bold text-gray-900 mb-1">$29</div>
              <div className="text-sm text-gray-600">per month</div>
              <div className="text-xs text-green-600 mt-1">Save $58 annually</div>
            </div>

            <button
              onClick={handleUpgrade}
              className="w-full bg-yellow-500 text-white font-semibold py-3 px-6 rounded-xl hover:bg-yellow-600 transition-colors flex items-center justify-center gap-2"
            >
              <Star className="w-5 h-5" />
              Upgrade to Premium
            </button>
          </div>
        </div>
      )}

      {/* Guest Passes (Premium Only) */}
      {isPremium && (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Guest Passes</h3>
            <span className="text-sm text-gray-600">2 remaining this month</span>
          </div>
          
          <div className="bg-beige-50 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-3 mb-2">
              <Gift className="w-5 h-5 text-pine-600" />
              <span className="font-medium text-gray-900">Invite Friends</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Share the PineTribe experience with friends using your guest passes.
            </p>
            <button className="bg-pine-500 text-white px-4 py-2 rounded-lg hover:bg-pine-600 transition-colors">
              Send Guest Pass
            </button>
          </div>

          <div className="text-sm text-gray-600">
            <p>• Guest passes reset monthly</p>
            <p>• Recipients get 1 free class</p>
            <p>• Valid for 30 days from send date</p>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-6 h-6 text-forest-600" />
            <h3 className="text-lg font-semibold text-gray-900">Billing & Subscription</h3>
          </div>
          <p className="text-gray-600 mb-4">
            {isPremium ? 'Manage your subscription and billing preferences.' : 'No active subscription.'}
          </p>
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
            {isPremium ? 'Manage Subscription' : 'View Billing History'}
          </button>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Share className="w-6 h-6 text-pine-600" />
            <h3 className="text-lg font-semibold text-gray-900">Refer Friends</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Earn rewards for bringing friends to the tribe.
          </p>
          <button className="bg-pine-500 text-white px-4 py-2 rounded-lg hover:bg-pine-600 transition-colors">
            Get Referral Link
          </button>
        </div>
      </div>
    </div>
  )
}