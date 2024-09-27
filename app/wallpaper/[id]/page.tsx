'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import WallpaperDetails from '../../components/WallpaperDetails'
import SubscriptionModal from '../../components/SubscriptionModal'
import PaymentModal from '../../components/PaymentModal'

interface Wallpaper {
  id: number
  src: string
  alt: string
  isPremium: boolean
  description: string
  compatibleDevices: string[]
  tags: string[]
}

export default function WallpaperPage() {
  const [wallpaper, setWallpaper] = useState<Wallpaper | null>(null)
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    fetch(`/api/wallpapers/${id}`)
      .then(response => response.json())
      .then(data => setWallpaper(data))
      .catch(error => console.error('Error fetching wallpaper:', error))
  }, [id])

  const handlePremiumClick = () => {
    setIsSubscriptionModalOpen(true)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <WallpaperDetails 
          wallpaper={wallpaper} 
          onPremiumClick={handlePremiumClick}
        />
      </main>
      <Footer />
      <SubscriptionModal
        isOpen={isSubscriptionModalOpen}
        onClose={() => setIsSubscriptionModalOpen(false)}
      />
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        amount={9.99}
      />
    </div>
  )
}
