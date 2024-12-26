'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { loginUser } from '@/store/slices/authSlice'

export default function LoginPage() {
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const dispatch = useDispatch()
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await dispatch(loginUser(credentials)).unwrap()
      router.push('/dashboard')
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  return (
    <div className="max-w-md w-full space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        {/* Form fields here */}
      </form>
    </div>
  )
}