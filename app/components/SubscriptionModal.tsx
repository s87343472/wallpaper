'use client'

import { useState } from 'react'

interface SubscriptionModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SubscriptionModal({ isOpen, onClose }: SubscriptionModalProps) {
  const [plan, setPlan] = useState('monthly')

  const handleSubscribe = () => {
    // TODO: Implement actual subscription logic
    console.log('Subscribing to plan:', plan)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-4">Subscribe to Premium</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Select a plan:</label>
          <select
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="monthly">Monthly - $9.99/month</option>
            <option value="yearly">Yearly - $99.99/year</option>
          </select>
        </div>
        <div className="flex justify-between items-center">
          <button onClick={handleSubscribe} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Subscribe</button>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">Cancel</button>
        </div>
      </div>
    </div>
  )
}
