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

interface MobileWallpaperDetailsProps {
  wallpaper: Wallpaper | null
  onPremiumClick: () => void
}

const deviceDimensions = {
  'iPhone 12 Pro': { width: 390, height: 844 },
  'iPhone 13 Pro': { width: 390, height: 844 },
  'iPhone 14 Pro': { width: 393, height: 852 },
  'iPhone 15 Pro Max': { width: 430, height: 932 },
}

export default function MobileWallpaperDetails({ wallpaper, onPremiumClick }: MobileWallpaperDetailsProps) {
  const [selectedDevice, setSelectedDevice] = useState('iPhone 14 Pro')
  const [isEnlarged, setIsEnlarged] = useState(false)
  const [downloadError, setDownloadError] = useState('')

  if (!wallpaper) {
    return <div>Loading...</div>
  }

  const { width, height } = deviceDimensions[selectedDevice as keyof typeof deviceDimensions]

  const toggleEnlarged = () => {
    setIsEnlarged(!isEnlarged)
  }

  const handleDownload = (e) => {
    e.preventDefault();
    if (!wallpaper.src) {
      setDownloadError('No file available for download');
      return;
    }

    const filename = wallpaper.src.split('/').pop();
    window.location.href = `/api/download?file=${encodeURIComponent(filename)}`;
  };

  console.log('Wallpaper object:', wallpaper); // 添加这行来调试

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold mb-4">{wallpaper.alt}</h1>
      
      <div className="relative mb-4">
        <div 
          className="cursor-pointer mx-auto"
          style={{ 
            width: `${width}px`, 
            height: `${height}px`,
            maxWidth: '100%',
            maxHeight: '70vh',
          }}
          onClick={toggleEnlarged}
        >
          <Image
            src={wallpaper.src}
            alt={wallpaper.alt}
            layout="fill"
            objectFit="contain"
            className="rounded-[2rem]"
          />
        </div>
        {isEnlarged && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={toggleEnlarged}>
            <Image
              src={wallpaper.src}
              alt={wallpaper.alt}
              layout="fill"
              objectFit="contain"
              className="rounded-[2rem]"
            />
          </div>
        )}
      </div>

      <div className="mb-4">
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

      <p className="text-gray-600 mb-4">{wallpaper.description || 'A beautiful wallpaper for your iPhone.'}</p>

      {wallpaper.tags && wallpaper.tags.length > 0 && (
        <div className="mb-4">
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

      <button 
        onClick={handleDownload}
        className="download-button"
      >
        Download
      </button>
      {downloadError && <p className="text-red-500">{downloadError}</p>}

    </div>
  )
}
