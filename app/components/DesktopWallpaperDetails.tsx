'use client'

import { useState } from 'react'
import Image from 'next/image'
import DownloadButton from './DownloadButton'

interface Wallpaper {
  id: number
  src: string
  alt: string
  isPremium: boolean
  description: string
  compatibleDevices: string[]
  tags: string[]
}

interface DesktopWallpaperDetailsProps {
  wallpaper: Wallpaper | null
  onPremiumClick: () => void
}

const deviceDimensions = {
  'iPhone 12 Pro': { width: 390, height: 844 },
  'iPhone 13 Pro': { width: 390, height: 844 },
  'iPhone 14 Pro': { width: 393, height: 852 },
  'iPhone 15 Pro Max': { width: 430, height: 932 },
}

export default function DesktopWallpaperDetails({ wallpaper, onPremiumClick }: DesktopWallpaperDetailsProps) {
  const [selectedDevice, setSelectedDevice] = useState('iPhone 14 Pro')
  const [isEnlarged, setIsEnlarged] = useState(false)

  if (!wallpaper) {
    return <div>Loading...</div>
  }

  const { width, height } = deviceDimensions[selectedDevice as keyof typeof deviceDimensions]
  const enlargedSize = deviceDimensions['iPhone 15 Pro Max']

  const toggleEnlarged = () => {
    setIsEnlarged(!isEnlarged)
  }

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-1/2 flex justify-center items-start relative">
        <div 
          className="cursor-pointer"
          style={{ 
            width: `${width}px`, 
            height: `${height}px`,
            maxWidth: '100%',
            maxHeight: `${height}px`,
          }}
          onClick={toggleEnlarged}
        >
          <Image
            src={wallpaper.src}
            alt={wallpaper.alt}
            width={width}
            height={height}
            objectFit="contain"
            className="rounded-[3rem]"
          />
        </div>
        {isEnlarged && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div 
              className="relative cursor-pointer"
              style={{ 
                width: `${enlargedSize.width}px`, 
                height: `${enlargedSize.height}px`,
                maxWidth: '90vw',
                maxHeight: '90vh',
              }}
              onClick={toggleEnlarged}
            >
              <Image
                src={wallpaper.src}
                alt={wallpaper.alt}
                layout="fill"
                objectFit="contain"
                className="rounded-[3rem]"
              />
            </div>
          </div>
        )}
      </div>
      <div className="md:w-1/2">
        <h1 className="text-3xl font-bold mb-4">{wallpaper.alt}</h1>
        <p className="text-gray-600 mb-6">{wallpaper.description || 'A beautiful wallpaper for your iPhone.'}</p>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Compatible Devices</h2>
          <div className="flex flex-wrap gap-2">
            {Object.keys(deviceDimensions).map((device) => (
              <button
                key={device}
                onClick={() => setSelectedDevice(device)}
                className={`px-3 py-1 rounded text-sm ${
                  selectedDevice === device
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {device}
              </button>
            ))}
          </div>
        </div>
        
        {wallpaper.tags && wallpaper.tags.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {wallpaper.tags.map((tag) => (
                <span key={tag} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <a 
          href={`/api/download?file=${encodeURIComponent(wallpaper.filename || '')}`}
          className="download-button"
          onClick={(e) => {
            if (!wallpaper.filename) {
              e.preventDefault();
              alert('No filename available for download');
            }
          }}
        >
          Download
        </a>
      </div>
    </div>
  )
}
