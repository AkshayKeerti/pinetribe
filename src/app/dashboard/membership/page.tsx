'use client'

import { useState, useEffect } from 'react'
import { QrCode, Download, Share, Gift, Calendar, Crown } from 'lucide-react'
import QRCode from 'qrcode'

export default function Membership() {
  const [user, setUser] = useState<any>(null)
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('')
  const [membershipData] = useState({
    plan: 'Active',
    renewalDate: '2024-12-15',
    perks: [
      'Unlimited classes',
      'Guest passes (2/month)',
      'Priority booking',
      'Exclusive events',
      'Forest meditation access'
    ]
  })

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
          plan: 'Active',
          expires: '2024-12-15'
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
  }, [user])

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
        // Fallback to copy link
        navigator.clipboard.writeText(window.location.href)
        alert('Link copied to clipboard!')
      }
    } else {
      // Fallback
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="forest-gradient rounded-2xl p-8 text-white">
        <div className="flex items-center gap-3 mb-4">
          <Crown className="w-8 h-8" />
          <h1 className="text-3xl font-bold">Your Tribe Pass</h1>
        </div>
        <p className="text-white/90 text-lg">
          Your digital membership card for PineTribe
        </p>
      </div>

      {/* Membership Card */}
      <div className="card max-w-md mx-auto">
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <QrCode className="w-10 h-10 text-forest-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {user?.name || 'Member Name'}
          </h2>
          <p className="text-gray-600">{user?.email || 'member@example.com'}</p>
        </div>

        {/* QR Code */}
        <div className="text-center mb-6">
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

        {/* Membership Info */}
        <div className="space-y-4 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Plan</span>
            <span className="font-semibold text-forest-600">{membershipData.plan}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Renewal Date</span>
            <span className="font-semibold">{membershipData.renewalDate}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Member Since</span>
            <span className="font-semibold">Jan 2024</span>
          </div>
        </div>
      </div>

      {/* Plan Details */}
      <div className="card">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Plan Benefits</h3>
        <div className="grid gap-4">
          {membershipData.perks.map((perk, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-6 h-6 bg-forest-100 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-forest-500 rounded-full"></div>
              </div>
              <span className="text-gray-700">{perk}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Guest Passes */}
      <div className="card">
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
          <button className="btn-secondary">
            Send Guest Pass
          </button>
        </div>

        <div className="text-sm text-gray-600">
          <p>• Guest passes reset monthly</p>
          <p>• Recipients get 1 free class</p>
          <p>• Valid for 30 days from send date</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-6 h-6 text-forest-600" />
            <h3 className="text-lg font-semibold text-gray-900">Upgrade Plan</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Unlock premium features and exclusive events.
          </p>
          <button className="btn-primary w-full">
            View Premium Plans
          </button>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <Share className="w-6 h-6 text-pine-600" />
            <h3 className="text-lg font-semibold text-gray-900">Refer Friends</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Earn rewards for bringing friends to the tribe.
          </p>
          <button className="btn-secondary w-full">
            Get Referral Link
          </button>
        </div>
      </div>
    </div>
  )
}
