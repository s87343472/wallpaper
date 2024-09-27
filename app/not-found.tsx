'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const [countdown, setCountdown] = useState(3)
  const router = useRouter()

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)

    const redirect = setTimeout(() => {
      router.push('/')
    }, 3000)

    return () => {
      clearInterval(timer)
      clearTimeout(redirect)
    }
  }, [router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl mb-4">Oops! We can't find that page.</h2>
        <p className="mb-8">Don't worry! We'll take you back home in {countdown} seconds.</p>
        <Link 
          href="/" 
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Go Home Now
        </Link>
      </div>
    </div>
  )
}
