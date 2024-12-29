import { NextResponse } from 'next/server'

export function middleware(request) {
  const token = request.cookies.get('token')?.value
  const url = request.nextUrl

  console.log('Request Path:', url.pathname)
  console.log('Token:', token)

  // Prevent redirect loop: Already on `/dashboard`
  if (token && url.pathname === '/dashboard') {
    console.log('Already on /dashboard, proceeding...')
    return NextResponse.next()
  }

  // Prevent redirect loop: Already on `/login`
  if (!token && url.pathname === '/login') {
    console.log('Already on /login, proceeding...')
    return NextResponse.next()
  }

  // Redirect logged-in users away from auth pages
  if (token && url.pathname.startsWith('/(auth)')) {
    console.log('Redirecting logged-in user to /dashboard')
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Redirect logged-out users away from protected pages
  if (!token && !url.pathname.startsWith('/(auth)')) {
    console.log('Redirecting logged-out user to /login')
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard',
    '/login',
    '/(auth)/(.*)', // Matches all auth routes
    '/protected/(.*)', // Add protected routes as needed
  ],
}
