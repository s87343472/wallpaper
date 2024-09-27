import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Footer() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (isMobile) {
    return (
      <footer className="bg-gray-100 py-2 text-center">
        <p className="text-sm text-gray-600">&copy; 2023 iWallpaper. All rights reserved.</p>
      </footer>
    )
  }

  return (
    <footer className="bg-gray-100 mt-8">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">About Us</h3>
            <p className="text-sm text-gray-600">
              We make cool pictures for your phone. Find pretty backgrounds to make your phone look awesome!
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="text-sm text-gray-600">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/categories">Types of Pictures</Link></li>
              <li><Link href="/premium">Special Pictures</Link></li>
              <li><Link href="/about">About Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Rules</h3>
            <ul className="text-sm text-gray-600">
              <li><Link href="/privacy-policy">How We Keep You Safe</Link></li>
              <li><Link href="/terms-of-service">Rules for Using Our Site</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Say Hi!</h3>
            <ul className="text-sm text-gray-600">
              <li><a href="#" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer">Twitter</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}