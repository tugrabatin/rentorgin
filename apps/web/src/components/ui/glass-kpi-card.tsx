/**
 * Glass KPI Card Component
 * Premium glassmorphism KPI/metric display cards
 * 
 * Glass KPI Kart Bileşeni
 * Premium glassmorphism KPI/metrik gösterim kartları
 */

'use client';

import { ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface GlassKPICardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
  };
  description?: string;
  variant?: 'default' | 'accent';
  className?: string;
}

export function GlassKPICard({
  label,
  value,
  icon,
  trend,
  description,
  variant = 'default',
  className,
}: GlassKPICardProps) {
  const getTrendIcon = () => {
    if (!trend) return null;
    
    if (trend.direction === 'up') {
      return <TrendingUp className="w-4 h-4 text-green-400" />;
    } else if (trend.direction === 'down') {
      return <TrendingDown className="w-4 h-4 text-red-400" />;
    }
    return <Minus className="w-4 h-4 text-glass-textMuted" />;
  };

  const getTrendColor = () => {
    if (!trend) return '';
    
    if (trend.direction === 'up') return 'text-green-400';
    if (trend.direction === 'down') return 'text-red-400';
    return 'text-glass-textMuted';
  };

  return (
    <div
      className={cn(
        'rounded-glass p-6 transition-smooth glass-hover',
        variant === 'default' && 'glass',
        variant === 'accent' && 'glass-medium glow-accent glass-border-accent',
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-glass-textMuted mb-1">
            {label}
          </p>
          <p className="text-3xl font-bold text-glass-text tracking-tight">
            {value}
          </p>
        </div>
        {icon && (
          <div className={cn(
            'p-3 rounded-glass',
            variant === 'default' && 'glass-light',
            variant === 'accent' && 'bg-gradient-to-br from-accent-cyan/20 to-accent-teal/20 border border-accent-cyan/30'
          )}>
            {icon}
          </div>
        )}
      </div>
      
      {(trend || description) && (
        <div className="flex items-center gap-3">
          {trend && (
            <div className="flex items-center gap-1">
              {getTrendIcon()}
              <span className={cn('text-sm font-medium', getTrendColor())}>
                {Math.abs(trend.value)}%
              </span>
            </div>
          )}
          {description && (
            <p className="text-xs text-glass-textSubtle">
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
}












