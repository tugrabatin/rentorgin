/**
 * App Providers
 * React Query, Auth, Theme, Language and global state providers
 * 
 * Uygulama Sağlayıcıları
 * React Query, Auth, Tema, Dil ve global durum sağlayıcıları
 */

'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { AuthProvider } from '../contexts/auth-context';
import { ThemeProvider } from '../contexts/theme-context';
import { LanguageProvider } from '../contexts/language-context';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

