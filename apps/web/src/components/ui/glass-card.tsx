/**
 * Glass Card Component
 * Premium glassmorphism card with hover effects
 * 
 * Glass Kart Bileşeni
 * Hover efektleri ile premium glassmorphism kart
 */

'use client';

import { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'light' | 'medium' | 'strong';
  hover?: boolean;
  glow?: boolean;
  accentBorder?: boolean;
  onClick?: () => void;
}

export function GlassCard({
  children,
  className,
  variant = 'default',
  hover = false,
  glow = false,
  accentBorder = false,
  onClick,
}: GlassCardProps) {
  const variantClasses = {
    default: 'glass',
    light: 'glass-light',
    medium: 'glass-medium',
    strong: 'glass-strong',
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        'rounded-glass transition-smooth',
        variantClasses[variant],
        hover && 'glass-hover cursor-pointer',
        glow && 'glow-accent',
        accentBorder && 'glass-border-accent',
        className
      )}
    >
      {children}
    </div>
  );
}












