import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export function middleware(request) {
  const token = request.cookies.get('token')?.value

  // Check if the user is trying to access auth pages while logged in
  if (token && request.nextUrl.pathname.startsWith('/(auth)')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Check if the user is trying to access protected pages while logged out
  if (!token && !request.nextUrl.pathname.startsWith('/(auth)')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}