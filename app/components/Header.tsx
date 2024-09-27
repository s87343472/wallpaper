'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

export default function Header() {
  const { data: session } = useSession()

  return (
    <header className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          iWallpaper
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/">Home</Link></li>
            {session ? (
              <>
                <li>Welcome, {session.user?.name}</li>
                <li><button onClick={() => signOut()}>Logout</button></li>
              </>
            ) : (
              <>
                <li><Link href="/login">Login</Link></li>
                <li><Link href="/register">Register</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}