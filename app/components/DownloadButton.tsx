'use client'

interface DownloadButtonProps {
  wallpaperId: number
  isPremium: boolean
  onPremiumClick: () => void
}

export default function DownloadButton({ wallpaperId, isPremium, onPremiumClick }: DownloadButtonProps) {
  const handleDownload = () => {
    if (isPremium) {
      onPremiumClick()
    } else {
      // 对于非高级壁纸，直接开始下载
      window.location.href = `/api/download/${wallpaperId}`
    }
  }

  return (
    <button
      onClick={handleDownload}
      className={`w-full px-6 py-3 rounded-full font-semibold ${
        isPremium ? 'bg-yellow-400 text-blue-900 hover:bg-yellow-300' : 'bg-blue-600 text-white hover:bg-blue-700'
      }`}
    >
      {isPremium ? 'Get Special Picture' : 'Get Free Picture'}
    </button>
  )
}
