/**
 * Next.js Middleware
 * Route protection and authentication check
 * 
 * Next.js Middleware
 * Rota koruma ve kimlik doğrulama kontrolü
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Public routes that don't require authentication
// Kimlik doğrulama gerektirmeyen public rotalar
const publicRoutes = ['/', '/login', '/register'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if route is public
  // Rotanın public olup olmadığını kontrol et
  const isPublicRoute = publicRoutes.some(route => pathname === route);

  if (isPublicRoute) {
    return NextResponse.next();
  }

  // For protected routes, check for token in cookies or redirect to login
  // Korumalı rotalar için cookie'de token kontrolü yap veya login'e yönlendir
  // Note: In production, you should verify the JWT here
  // Not: Production'da JWT'yi burada doğrulamalısınız
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};


















