'use client'

import { useState, useEffect } from 'react'
import MobileWallpaperDetails from './MobileWallpaperDetails'
import DesktopWallpaperDetails from './DesktopWallpaperDetails'

interface Wallpaper {
  id: number
  src: string
  alt: string
  isPremium: boolean
  description: string
  compatibleDevices: string[]
  tags: string[]
}

interface WallpaperDetailsProps {
  wallpaper: Wallpaper | null
  onPremiumClick: () => void
}

export default function WallpaperDetails({ wallpaper, onPremiumClick }: WallpaperDetailsProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (!wallpaper) {
    return <div>Loading...</div>
  }

  return isMobile ? (
    <MobileWallpaperDetails wallpaper={wallpaper} onPremiumClick={onPremiumClick} />
  ) : (
    <DesktopWallpaperDetails wallpaper={wallpaper} onPremiumClick={onPremiumClick} />
  )
}