'use client'

import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import WallpaperGrid from './components/WallpaperGrid'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import LoginModal from './components/LoginModal'

interface Wallpaper {
  id: number
  src: string
  alt: string
  isPremium: boolean
}

export default function Home() {
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([])
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isHeroVisible, setIsHeroVisible] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    fetch('/api/wallpapers')
      .then(response => response.json())
      .then(data => setWallpapers(data))
      .catch(error => console.error('Error fetching wallpapers:', error))

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)

    if (isMobile) {
      const timer = setTimeout(() => {
        setIsHeroVisible(false)
      }, 3000)

      return () => {
        clearTimeout(timer)
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [isMobile])

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {isHeroVisible && <Hero />}
        <div className={`container mx-auto px-4 ${isHeroVisible ? 'py-8' : 'pt-4 pb-8'}`}>
          <SearchBar />
          <WallpaperGrid wallpapers={wallpapers} />
        </div>
      </main>
      <Footer />
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </div>
  )
}