/**
 * Dashboard KPI Row Component
 * Enhanced KPI cards with trends and contextual information
 */

'use client';

import Link from 'next/link';
import { 
  Building2, 
  FileText, 
  Wallet,
  ShoppingBag,
  TrendingUp,
  TrendingDown,
  Calendar,
  ArrowUpRight
} from 'lucide-react';

interface KPIMetric {
  label: string;
  value: string | number;
  icon: any;
  trend?: {
    value: string;
    isPositive: boolean | null;
  };
  subMetric?: {
    label: string;
    value: string;
  };
  gradient: string;
  iconBg: string;
  href?: string;
}

export function DashboardKpiRow() {
  const metrics: KPIMetric[] = [
    { 
      label: 'Toplam Mağaza', 
      value: '12', 
      icon: Building2,
      trend: {
        value: '+2',
        isPositive: true,
      },
      subMetric: {
        label: 'Son 30 gün',
        value: 'Aktif: 11'
      },
      gradient: 'metric-blue',
      iconBg: 'from-blue-500 to-cyan-500',
      href: '/stores'
    },
    { 
      label: 'Aktif Sözleşme', 
      value: '10', 
      icon: FileText,
      trend: {
        value: '+1',
        isPositive: true,
      },
      subMetric: {
        label: 'Son 30 gün',
        value: 'Yeni: 1'
      },
      gradient: 'metric-green',
      iconBg: 'from-green-500 to-emerald-500',
      href: '/leases?status=aktif'
    },
    { 
      label: 'Bekleyen Gider', 
      value: '5', 
      icon: Wallet,
      trend: {
        value: '-3',
        isPositive: false,
      },
      subMetric: {
        label: 'Toplam tutar',
        value: '485.000 ₺'
      },
      gradient: 'metric-yellow',
      iconBg: 'from-yellow-500 to-orange-500',
      href: '/expenses?status=bekleyen'
    },
    { 
      label: 'AVM Sayısı', 
      value: '8', 
      icon: ShoppingBag,
      trend: {
        value: '+0',
        isPositive: null,
      },
      subMetric: {
        label: 'Aktif işbirliği',
        value: '7 AVM'
      },
      gradient: 'metric-purple',
      iconBg: 'from-purple-500 to-pink-500',
      href: '/malls'
    },
    { 
      label: 'Yaklaşan Yenileme', 
      value: '3', 
      icon: Calendar,
      trend: {
        value: '+1',
        isPositive: false,
      },
      subMetric: {
        label: 'Son 90 gün',
        value: 'Kritik: 1'
      },
      gradient: 'from-red-500/10 to-orange-500/10',
      iconBg: 'from-red-500 to-orange-500',
      href: '/leases?filter=expiring'
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
      {metrics.map((metric, index) => {
        const cardContent = (
          <>
            {/* Icon Circle */}
            <div className="flex items-start justify-between mb-4">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${metric.iconBg} flex items-center justify-center shadow-lg`}>
                <metric.icon className="w-7 h-7 text-white" />
              </div>
              
              {/* Trend Indicator */}
              {metric.trend && metric.trend.isPositive !== null && (
                <div className={`glass-light rounded-full px-2.5 py-1.5 flex items-center gap-1.5 ${
                  metric.trend.isPositive ? 'glow-primary' : 'glow-pink'
                }`}>
                  {metric.trend.isPositive ? (
                    <TrendingUp className="w-3.5 h-3.5 text-green-400" />
                  ) : (
                    <TrendingDown className="w-3.5 h-3.5 text-red-400" />
                  )}
                  <span className={`text-xs font-bold ${
                    metric.trend.isPositive ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {metric.trend.value}
                  </span>
                </div>
              )}
            </div>
            
            {/* Metric Label & Value */}
            <div className="mb-3">
              <p className="text-white/60 text-sm font-medium mb-2">
                {metric.label}
              </p>
              <p className="text-4xl font-bold text-white text-shadow">
                {metric.value}
              </p>
            </div>
            
            {/* Sub Metric */}
            {metric.subMetric && (
              <div className="glass-light rounded-xl px-3 py-2">
                <p className="text-white/50 text-xs mb-0.5">
                  {metric.subMetric.label}
                </p>
                <p className="text-white/90 text-sm font-semibold">
                  {metric.subMetric.value}
                </p>
              </div>
            )}
            
            {/* Hover Arrow */}
            {metric.href && (
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="w-5 h-5 text-white/40" />
              </div>
            )}
            
            {/* Hover Glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </>
        );
        
        return metric.href ? (
          <Link
            key={index}
            href={metric.href}
            className={`glass-card p-6 ${metric.gradient} relative group cursor-pointer`}
          >
            {cardContent}
          </Link>
        ) : (
          <div
            key={index}
            className={`glass-card p-6 ${metric.gradient} relative group cursor-pointer`}
          >
            {cardContent}
          </div>
        );
      })}
    </div>
  );
}










