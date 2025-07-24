import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/dashboard', '/dashboard/create', '/dashboard/edit/:path*'];

export function middleware(request: NextRequest) {
  // Example: check for a cookie named 'token' (adjust as needed)
  const token = request.cookies.get('token')?.value;

  const isProtected = protectedRoutes.includes(request.nextUrl.pathname);

  if (isProtected && !token) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Specify the matcher for middleware
export const config = {
  matcher: ['/dashboard/:path*', '/dashboard', '/dashboard/create', '/dashboard/edit/:path*'],
}; 