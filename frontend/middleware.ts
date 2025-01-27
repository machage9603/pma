// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Retrieve the token from cookies
  const token = request.cookies.get('token')?.value;
  const url = request.nextUrl;

  const publicPaths = ['/', '/login', '/register', '/dashboard/projects/create'];

  // Allow access to public paths, API routes, and static assets
  if (
    url.pathname.startsWith('/api/') ||
    url.pathname.startsWith('/_next/') ||
    url.pathname.includes('/public/') ||
    publicPaths.includes(url.pathname)
  ) {
    return NextResponse.next();
  }

  console.log('Request Path:', url.pathname);
  console.log('Token from cookies:', token);

  // Protected routes - redirect if no token
  if (!token && !publicPaths.includes(url.pathname)) {
    console.log('Redirecting logged-out user to /login');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Auth pages - redirect logged-in users to dashboard
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
     * 4. .*\..* (static files)
     */
    '/((?!api|_next|public|.*\\..*).*)',
  ],
};
