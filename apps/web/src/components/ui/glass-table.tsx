/**
 * Glass Table Component
 * Premium glassmorphism data table
 * 
 * Glass Tablo Bileşeni
 * Premium glassmorphism veri tablosu
 */

'use client';

import { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface Column {
  key: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, row: any) => ReactNode;
}

interface GlassTableProps {
  columns: Column[];
  data: any[];
  emptyMessage?: string;
  emptyIcon?: ReactNode;
  onRowClick?: (row: any) => void;
  className?: string;
}

export function GlassTable({
  columns,
  data,
  emptyMessage = 'Veri bulunamadı',
  emptyIcon,
  onRowClick,
  className,
}: GlassTableProps) {
  if (!data || data.length === 0) {
    return (
      <div className={cn('glass rounded-glass p-12 text-center', className)}>
        {emptyIcon && (
          <div className="flex justify-center mb-4">
            {emptyIcon}
          </div>
        )}
        <p className="text-glass-textMuted">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={cn('glass rounded-glass overflow-hidden', className)}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="glass-medium border-b border-glass-border">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    'px-6 py-4 text-sm font-semibold text-glass-text tracking-wider',
                    column.align === 'center' && 'text-center',
                    column.align === 'right' && 'text-right',
                    !column.align && 'text-left'
                  )}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                onClick={() => onRowClick?.(row)}
                className={cn(
                  'border-b border-glass-borderLight transition-smooth',
                  'hover:glass-light',
                  onRowClick && 'cursor-pointer hover:shadow-md'
                )}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={cn(
                      'px-6 py-4 text-sm text-glass-textMuted',
                      column.align === 'center' && 'text-center',
                      column.align === 'right' && 'text-right',
                      !column.align && 'text-left'
                    )}
                  >
                    {column.render
                      ? column.render(row[column.key], row)
                      : row[column.key] || '-'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}












