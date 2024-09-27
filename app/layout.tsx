import './globals.css'
import { Inter } from 'next/font/google'
import { UserProvider } from './contexts/UserContext';
import { Providers } from "./Providers";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'iWallpaper - Beautiful iPhone Wallpapers',
  description: 'Discover and download high-quality wallpapers for your iPhone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}