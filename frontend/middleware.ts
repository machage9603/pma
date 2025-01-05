// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const url = request.nextUrl;
  const publicPaths = ['/', '/login', '/register'];

  // Don't apply middleware to API routes and public assets
  if (
    url.pathname.startsWith('/api/') ||
    url.pathname.startsWith('/_next/') ||
    url.pathname.includes('/public/') ||
    publicPaths.includes(url.pathname)
  ) {
    return NextResponse.next();
  }

  console.log('Request Path:', url.pathname);
  console.log('Token:', token);

  // Protected routes - redirect to login if no token
  if (!token && !publicPaths.includes(url.pathname)) {
    console.log('Redirecting logged-out user to /login');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Auth pages - redirect to dashboard if already logged in
  if (token && (url.pathname === '/login' || url.pathname === '/register')) {
    console.log('Redirecting logged-in user to /dashboard');
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api/ (API routes)
     * 2. /_next/ (Next.js internals)
     * 3. /public/ (public files)
     * 4. .*\..*\..* (static files)
     */
    '/((?!api|_next|public|.*\\..*\\..*).*)',
  ],
};