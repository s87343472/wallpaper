'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

interface HeaderProps {
  onLoginClick: () => void
}

export default function Header({ onLoginClick }: HeaderProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const menuItems = (
    <>
      <li><Link href="/" className="text-gray-600 hover:text-blue-600">Home</Link></li>
      <li><Link href="/categories" className="text-gray-600 hover:text-blue-600">Types</Link></li>
      <li><Link href="/premium" className="text-gray-600 hover:text-blue-600">Special Pics</Link></li>
      <li><Link href="/about" className="text-gray-600 hover:text-blue-600">About Us</Link></li>
      <li><button onClick={onLoginClick} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Sign In</button></li>
    </>
  )

  return (
    <header className="bg-white shadow-md py-2">
      <nav className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="font-bold text-blue-600 text-xl">iWallpaper</Link>
        {isMobile ? (
          <button onClick={toggleMenu} className="text-gray-600 hover:text-blue-600">
            <Menu size={24} />
          </button>
        ) : (
          <ul className="flex space-x-4 items-center">
            {menuItems}
          </ul>
        )}
      </nav>
      {isMobile && isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed inset-y-0 right-0 w-64 bg-white shadow-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <Link href="/" className="text-xl font-bold text-blue-600">iWallpaper</Link>
              <button onClick={toggleMenu} className="text-gray-600 hover:text-blue-600">
                <X size={24} />
              </button>
            </div>
            <ul className="space-y-4">
              {menuItems}
            </ul>
          </div>
        </div>
      )}
    </header>
  )
}