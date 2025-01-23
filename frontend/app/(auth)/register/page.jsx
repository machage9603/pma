'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { registerUser, registerWithGoogle } from '../../store/slices/authSlice'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/app/components/ui/card"
import { Separator } from "@/app/components/ui/separator"
import { Checkbox } from "@/app/components/ui/checkbox"
import { Mail, Lock, User, ArrowRight, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from "@/app/components/ui/alert"
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
        //error log
        console.log('Client ID:', process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
          callback: handleGoogleResponse,
          auto_select: false,
          context: 'signup',
          ux_mode: 'popup',
        })

        const googleSignInDiv = document.getElementById('googleSignInDiv')
        if (googleSignInDiv) {
          window.google.accounts.id.renderButton(googleSignInDiv, {
            theme: 'outline',
            size: 'large',
            width: '300',
            type: 'standard',
            text: 'signup_with',
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
    if (!termsAccepted) {
      errors.terms = 'Please accept the terms and conditions'
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

      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Create an account
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {formErrors.google && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{formErrors.google}</AlertDescription>
              </Alert>
            )}

            <div id="googleSignInDiv" className="w-full" />

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or Enter your details
                </span>
              </div>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="John Doe"
                    className="pl-10 h-12"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="name@example.com"
                    className="pl-10 h-12"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    placeholder="Create a password"
                    className="pl-10 h-12"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
                {formErrors.password && (
                  <p className="text-sm text-red-500 mt-1">{formErrors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    placeholder="Confirm your password"
                    className="pl-10 h-12"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
                {formErrors.confirmPassword && (
                  <p className="text-sm text-red-500 mt-1">{formErrors.confirmPassword}</p>
                )}
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(checked) => {
                    setTermsAccepted(checked)
                    if (checked) setFormErrors(prev => ({ ...prev, terms: '' }))
                  }}
                  disabled={isLoading}
                  className="mt-1"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the{' '}
                  <Link href="/terms" className="text-blue-600 hover:text-blue-500">
                    Terms of Service
                  </Link>
                  {' '}and{' '}
                  <Link href="/privacy" className="text-blue-600 hover:text-blue-500">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              {formErrors.terms && (
                <p className="text-sm text-red-500 mt-1">{formErrors.terms}</p>
              )}

              {formErrors.submit && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{formErrors.submit}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full h-12"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Creating account...
                  </span>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter>
            <p className="text-center text-sm text-gray-600 w-full">
              Already have an account?{' '}
              <Link
                href="/login"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}