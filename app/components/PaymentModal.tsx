'use client'

import { useState } from 'react'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  amount: number
}

export default function PaymentModal({ isOpen, onClose, amount }: PaymentModalProps) {
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement actual payment logic
    console.log('Processing payment:', { cardNumber, expiry, cvc, amount })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-4">Payment</h2>
        <form onSubmit={handlePayment}>
          <div className="mb-4">
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4 flex space-x-4">
            <div className="flex-1">
              <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">Expiry Date</label>
              <input
                type="text"
                id="expiry"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                placeholder="MM/YY"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div className="flex-1">
              <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">CVC</label>
              <input
                type="text"
                id="cvc"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
          </div>
          <p className="mb-4">Total: ${amount.toFixed(2)}</p>
          <div className="flex justify-between items-center">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Pay Now</button>
            <button type="button" onClick={onClose} className="text-gray-600 hover:text-gray-800">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}
