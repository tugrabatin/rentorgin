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
  // DISABLED: All routes are public for deployment
  // DEVRE DIŞI: Deploy için tüm route'lar public
  return NextResponse.next();
  
  // Original code (disabled):
  // const { pathname } = request.nextUrl;
  // const isPublicRoute = publicRoutes.some(route => pathname === route);
  // if (isPublicRoute) {
  //   return NextResponse.next();
  // }
  // return NextResponse.next();
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


















