/**
 * App Providers
 * React Query, Auth, Theme, Language, Segment and global state providers
 */

'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { AuthProvider } from '../contexts/auth-context';
import { ThemeProvider } from '../contexts/theme-context';
import { LanguageProvider } from '../contexts/language-context';
import { SegmentProvider } from '../contexts/segment-context';
import { SegmentGate } from '../components/segment-gate';

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
            <SegmentProvider>
              <SegmentGate>
                {children}
              </SegmentGate>
            </SegmentProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
