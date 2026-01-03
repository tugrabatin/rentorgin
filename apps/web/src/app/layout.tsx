/**
 * Root Layout
 * Main application shell with theme and language support
 * 
 * Ana Düzen
 * Tema ve dil desteği ile ana uygulama kabuk
 */

import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'BASIS - Enterprise Rental Management',
  description: 'BASIS - Premium Glassmorphic Enterprise Rental Management Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}








