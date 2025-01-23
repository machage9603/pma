'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../store/slices/authSlice'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../components/ui/card"
import { Separator } from "@/app/components/ui/separator"
import Link from 'next/link'
import { Mail, Lock, ArrowRight } from 'lucide-react'
import { googleConfig } from '../../utils/google-auth'
import Script from 'next/script'


export default function LoginPage() {
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    // Initialize Google OAuth
    const initializeGoogleAuth = () => {
      window.google?.accounts.id.initialize({
        client_id: googleConfig.clientId,
        callback: handleGoogleResponse
      });
    };

    // Load Google OAuth script
    if (window.google?.accounts) {
      initializeGoogleAuth();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await dispatch(loginUser(credentials)).unwrap()
      router.push('/profile')
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  const handleGoogleLogin = () => {
    window.google?.accounts.id.prompt((notification) => {
      if (notification.isNotDisplayed()) {
        console.error('Google Sign-In popup was not displayed:', notification.getNotDisplayedReason());
      } else if (notification.isSkippedMoment()) {
        console.warn('User skipped Google Sign-In:', notification.getSkippedReason());
      }
    });
  }

  const handleGoogleResponse = async (response) => {
    if (response.credential) {
      try {
        await dispatch(authenticateWithGoogle(response.credential)).unwrap();
        router.push('/profile');
      } catch (error) {
        console.error('Google login failed:', error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={handleGoogleLogin}
          >
            <img
              src="#"
              alt="Google"
              className="mr-2 h-5 w-5"
            />
            Continue with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="name@example.com"
                  className="pl-10"
                  value={credentials.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="Enter your password"
                  className="pl-10"
                  value={credentials.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              Sign in
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-center text-sm text-gray-600 w-full">
            Don't have an account?{' '}
            <Link
              href="/register"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}