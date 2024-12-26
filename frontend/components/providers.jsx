'use client'

import { Provider } from 'react-redux'
import { store } from '@/store'

export function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>
}

// app/(auth)/layout.jsx
export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  )
}