/**
 * Protected Route Component
 * Wraps protected pages and checks authentication
 * 
 * Korumalı Rota Component'i
 * Korumalı sayfaları sarar ve kimlik doğrulamayı kontrol eder
 */

'use client';

import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../app/auth-context';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only redirect if we're sure user is not authenticated
    // Sadece kullanıcının kesinlikle authenticate olmadığından emin olduğumuzda redirect yap
    if (!isLoading && !user) {
      // Check localStorage as fallback
      // Fallback olarak localStorage'ı kontrol et
      const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
      if (!token) {
        router.push('/login');
      }
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00d4ff]"></div>
      </div>
    );
  }

  if (!user) {
    // Still loading or redirecting - show loading state
    // Hala yükleniyor veya yönlendiriliyor - loading state göster
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00d4ff]"></div>
      </div>
    );
  }

  return <>{children}</>;
}
