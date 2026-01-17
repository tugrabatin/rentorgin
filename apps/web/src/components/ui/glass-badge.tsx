/**
 * Glass Badge Component
 * Premium glassmorphism status badges
 * 
 * Glass Rozet Bileşeni
 * Premium glassmorphism durum rozetleri
 */

'use client';

import { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface GlassBadgeProps {
  children: ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
  glow?: boolean;
  className?: string;
}

export function GlassBadge({
  children,
  variant = 'neutral',
  glow = false,
  className,
}: GlassBadgeProps) {
  const variantClasses = {
    success: 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-300',
    warning: 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30 text-yellow-300',
    error: 'bg-gradient-to-r from-red-500/20 to-rose-500/20 border-red-500/30 text-red-300',
    info: 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-300',
    neutral: 'glass-light border-glass-border text-glass-text',
  };

  const glowClasses = {
    success: 'shadow-[0_0_20px_rgba(34,197,94,0.5)]',
    warning: 'shadow-[0_0_20px_rgba(251,191,36,0.5)]',
    error: 'shadow-[0_0_20px_rgba(239,68,68,0.5)]',
    info: 'shadow-[0_0_20px_rgba(59,130,246,0.5)]',
    neutral: '',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium',
        'backdrop-blur-glass border',
        'transition-smooth',
        variantClasses[variant],
        glow && glowClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}












