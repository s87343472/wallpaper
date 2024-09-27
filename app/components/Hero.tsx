'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)

    if (isMobile) {
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, 3000)

      return () => {
        clearTimeout(timer)
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [isMobile])

  if (!isVisible && isMobile) {
    return null
  }

  return (
    <section className={`bg-gradient-to-r from-blue-500 to-purple-600 text-white py-10 md:py-20 transition-all duration-300 ease-in-out ${isMobile ? 'scale-80' : ''}`}>
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Cool Pictures for Your Phone</h1>
        <p className="text-lg md:text-xl mb-8">Make your phone look awesome with our pretty pictures</p>
        <div className="flex justify-center space-x-4">
          <Link href="/categories" className="bg-white text-blue-600 hover:bg-blue-100 font-semibold py-2 px-6 rounded-full transition duration-300">
            See All Types
          </Link>
          <Link href="/premium" className="bg-yellow-400 text-blue-900 hover:bg-yellow-300 font-semibold py-2 px-6 rounded-full transition duration-300">
            Get Special Pics
          </Link>
        </div>
      </div>
    </section>
  )
}