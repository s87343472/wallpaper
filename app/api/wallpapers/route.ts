import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(request: Request) {
  try {
    const wallpaperDir = path.join(process.cwd(), 'public', 'wallpapers')
    const files = fs.readdirSync(wallpaperDir)

    const wallpapers = files.map((file, index) => ({
      id: index + 1,
      src: `/wallpapers/${file}`,
      alt: file.split('.')[0].replace(/-/g, ' '),
      isPremium: Math.random() < 0.5,
      description: `A beautiful wallpaper featuring ${file.split('.')[0].replace(/-/g, ' ')}.`,
      compatibleDevices: ['iPhone 14 Pro', 'iPhone 14', 'iPhone 13 Pro', 'iPhone 13'],
      tags: [file.split('.')[0].split('-')[0]]
    }))

    return NextResponse.json(wallpapers)
  } catch (error) {
    console.error('Error in API route:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
