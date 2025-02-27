'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { registerUser, registerWithGoogle } from '../../store/slices/authSlice'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Separator } from "@/app/components/ui/separator"
import { Checkbox } from "@/app/components/ui/checkbox"
import { Mail, Lock, User, EyeOff, Eye, AlertCircle, Loader2 } from 'lucide-react'
import Link from 'next/link'
import Script from 'next/script'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [formErrors, setFormErrors] = useState({})
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [googleScriptLoaded, setGoogleScriptLoaded] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()

  const handleGoogleResponse = useCallback(async (response) => {
    if (response.credential) {
      setIsLoading(true)
      try {
        await dispatch(registerWithGoogle(response.credential)).unwrap()
        router.push('/dashboard')
      } catch (error) {
        setFormErrors({ google: 'Google registration failed. Please try again.' })
      } finally {
        setIsLoading(false)
      }
    }
  }, [dispatch, router])

  const initializeGoogleSignUp = useCallback(() => {
    if (window.google?.accounts) {
      try {
        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
          callback: handleGoogleResponse,
          auto_select: false,
          context: 'signup',
          ux_mode: 'popup',
        })

        const googleSignInDiv = document.getElementById('googleSignInButton')
        if (googleSignInDiv) {
          window.google.accounts.id.renderButton(googleSignInDiv, {
            theme: 'filled_blue',
            size: 'large',
            width: '100%',
            type: 'standard',
            text: 'signup_with',
            shape: 'rectangular',
            logo_alignment: 'center'
          })
        }
      } catch (error) {
        console.error('Google Sign-Up initialization error:', error)
      }
    }
  }, [handleGoogleResponse])

  useEffect(() => {
    if (googleScriptLoaded) {
      initializeGoogleSignUp()
    }
  }, [googleScriptLoaded, initializeGoogleSignUp])

  const validateForm = () => {
    const errors = {}
    if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters'
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match'
    }
    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errors = validateForm()

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    setIsLoading(true)
    try {
      await dispatch(registerUser(formData)).unwrap()
      router.push('/login')
    } catch (error) {
      setFormErrors({ submit: 'Registration failed. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="lazyOnload"
        onLoad={() => setGoogleScriptLoaded(true)}
        onError={(error) => {
          console.error('Google Script Load Error:', error)
          setFormErrors({ google: 'Failed to load Google Sign-Up' })
        }}
      />

      <div className="min-h-screen flex items-center justify-center bg-[#0D0F18] py-8 px-1 sm:px-1 lg:px-1">
        <div className="w-full space-y-4 max-w-md mx-auto">
          {/* Logo and welcome text */}
          <div className="text-center">
            <div className="inline-flex justify-center mb-4">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4L4 8L12 12L20 8L12 4Z" fill="#5D5FEF" />
                <path d="M4 12L12 16L20 12" fill="#5D5FEF" opacity="0.7" />
                <path d="M4 16L12 20L20 16" fill="#5D5FEF" opacity="0.4" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-2 text-white">Sign Up for Free</h1>
            <p className="text-gray-400">
              Already have an account? <Link href="/login" className="text-purple-400 hover:text-purple-300 font-medium">Sign in</Link>
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Error displays */}
            {formErrors.google && (
              <div className="bg-red-900/20 border border-red-800 text-red-400 rounded-lg p-3 text-sm flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <p>{formErrors.google}</p>
              </div>
            )}

            {formErrors.submit && (
              <div className="bg-red-900/20 border border-red-800 text-red-400 rounded-lg p-3 text-sm flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <p>{formErrors.submit}</p>
              </div>
            )}

            {/* Google Sign-In */}
            <div id="googleSignInButton" className="w-full" />

            {/* Fallback button if Google script fails to load */}
            {!googleScriptLoaded && (
              <Button
                type="button"
                className="w-full h-12 bg-white text-gray-800 hover:bg-gray-100 rounded-lg font-medium flex items-center justify-center"
                disabled={isLoading}
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
                Sign up with Google
              </Button>
            )}

            {/* Divider */}
            <div className="relative py-1">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full bg-[#2A2D3A]" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#0D0F18] px-2 text-gray-500">
                  or
                </span>
              </div>
            </div>
            {/* Email input */}
            <div className="space-y-1">
              <Label htmlFor="email" className="text-gray-300 text-sm font-medium">Email address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="rutomustgo@example.com"
                  className="bg-[#1A1D2A] border-[#2A2D3A] text-white h-12 pl-10 pr-4 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password input */}
            <div className="space-y-1">
              <Label htmlFor="password" className="text-gray-300 text-sm font-medium">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Create a password"
                  className="bg-[#1A1D2A] border-[#2A2D3A] text-white h-12 pl-10 pr-12 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {formErrors.password && (
                <p className="text-sm text-red-400 mt-1">{formErrors.password}</p>
              )}
            </div>

            {/* Confirm Password input */}
            <div className="space-y-1">
              <Label htmlFor="confirmPassword" className="text-gray-300 text-sm font-medium">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  placeholder="Confirm your password"
                  className="bg-[#1A1D2A] border-[#2A2D3A] text-white h-12 pl-10 pr-12 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {formErrors.confirmPassword && (
                <p className="text-sm text-red-400 mt-1">{formErrors.confirmPassword}</p>
              )}
            </div>
            {/* Create Account button */}
            <Button
              type="submit"
              className="w-full h-12 bg-[#5D5FEF] hover:bg-[#4B4DD6] text-white rounded-lg font-medium flex items-center justify-center mt-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </Button>
            <div className="mt-8 text-center text-xs text-gray-500 space-y-8">
              <p>
                By Signing Up, you acknowledge that you read, and agree to our{' '}
                <Link href="/terms" className="text-gray-400 hover:text-white">
                  Terms of Service
                </Link>
                {' '}and our{' '}
                <Link href="/privacy" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}