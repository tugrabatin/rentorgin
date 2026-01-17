/**
 * Glass Input Component
 * Premium glassmorphism form inputs
 * 
 * Glass Girdi Bileşeni
 * Premium glassmorphism form girdileri
 */

'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';

interface GlassInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
  ({ className, label, error, icon, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-glass-text mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-glass-textMuted">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'w-full px-4 py-3 rounded-glass',
              'glass-light border border-glass-border',
              'text-glass-text placeholder-glass-textMuted',
              'focus:glass-medium focus:border-accent-cyan focus:outline-none focus:ring-2 focus:ring-accent-cyan focus:ring-opacity-50',
              'transition-smooth',
              icon && 'pl-12',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

GlassInput.displayName = 'GlassInput';












