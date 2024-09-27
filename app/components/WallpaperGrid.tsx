'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Lock } from 'lucide-react'

interface Wallpaper {
  id: number
  src: string
  alt: string
  isPremium: boolean
}

interface WallpaperGridProps {
  wallpapers: Wallpaper[]
}

export default function WallpaperGrid({ wallpapers }: WallpaperGridProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className={`grid ${isMobile ? 'grid-cols-2 gap-2' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'}`}>
      {wallpapers.map((wallpaper) => (
        <div key={wallpaper.id} className="relative group overflow-hidden rounded-lg">
          <Link href={`/wallpaper/${wallpaper.id}`}>
            <Image
              src={wallpaper.src}
              alt={wallpaper.alt}
              width={414}
              height={896}
              className="w-full h-auto transition-transform duration-300 group-hover:scale-110"
            />
            {wallpaper.isPremium && (
              <div className="absolute top-2 right-2 bg-yellow-400 text-blue-900 p-1 rounded-full">
                <Lock size={16} />
              </div>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center">
              <button className="bg-white text-black px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                See More
              </button>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}