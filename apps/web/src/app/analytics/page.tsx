/**
 * Analytics Page - Premium Glassmorphic Design
 * Performance Analytics Dashboard
 */

'use client';

import { useQuery } from '@tanstack/react-query';
import { ProtectedRoute } from '../../components/protected-route';
import { Navigation } from '../../components/navigation';
import { BarChart3, TrendingUp, DollarSign, Building2, Activity, MapPin, Sparkles } from 'lucide-react';
import Link from 'next/link';
import apiClient from '../../lib/api';

function AnalyticsContent() {
  const { data: portfolio, isLoading } = useQuery({
    queryKey: ['analytics', 'portfolio'],
    queryFn: async () => {
      const response = await apiClient.get('/analytics/portfolio');
      return response.data;
    },
  });

  const { data: storeStats } = useQuery({
    queryKey: ['stores', 'statistics'],
    queryFn: async () => {
      const response = await apiClient.get('/stores/statistics');
      return response.data;
    },
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const kpis = [
    { label: 'Toplam Mağaza', value: storeStats?.total || 0, subtitle: `${storeStats?.active || 0} aktif`, icon: Building2, gradient: 'from-blue-500 to-cyan-500' },
    { label: 'Toplam Ciro', value: portfolio?.totalRevenue ? formatCurrency(portfolio.totalRevenue) : '-', subtitle: 'Son 30 gün', icon: DollarSign, gradient: 'from-green-500 to-emerald-500' },
    { label: 'Toplam Kira', value: portfolio?.totalRent ? formatCurrency(portfolio.totalRent) : '-', subtitle: 'Aylık', icon: DollarSign, gradient: 'from-purple-500 to-pink-500' },
    { label: 'Kira/Ciro Oranı', value: portfolio?.averageRentToRevenueRatio ? `${portfolio.averageRentToRevenueRatio.toFixed(1)}%` : '-', subtitle: (portfolio?.averageRentToRevenueRatio || 0) > 25 ? 'Yüksek' : 'İyi', icon: BarChart3, gradient: 'from-yellow-500 to-orange-500' },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="md:ml-64 pt-16 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="glass-strong rounded-3xl p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00d4ff] mx-auto mb-4"></div>
              <p className="text-white/60">Yükleniyor...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="md:ml-64 pt-16 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white text-shadow flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-xl">
                  <BarChart3 className="w-7 h-7 text-white" />
                </div>
                Analitik Dashboard
              </h1>
              <p className="text-white/70 mt-2">
                Portföy performansı ve metrikler
              </p>
            </div>
            <Link href="/dashboard" className="btn-glass">Dashboard</Link>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpis.map((kpi, idx) => (
              <div key={idx} className="glass-card p-6 relative group">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${kpi.gradient} flex items-center justify-center mb-4 shadow-xl group-hover:scale-110 transition-transform`}>
                  <kpi.icon className="w-7 h-7 text-white" />
                </div>
                <p className="text-white/60 text-sm mb-1">{kpi.label}</p>
                <p className="text-3xl font-bold text-white text-shadow mb-2">{kpi.value}</p>
                <p className="text-white/50 text-xs">{kpi.subtitle}</p>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            ))}
          </div>

          {/* City Distribution */}
          {storeStats?.byCity && storeStats.byCity.length > 0 && (
            <div className="glass-strong rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Şehir Dağılımı</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {storeStats.byCity.map((item: any, idx: number) => (
                  <div key={idx} className="glass-card p-4 group">
                    <p className="text-white font-bold text-2xl mb-1">{item.count}</p>
                    <p className="text-white/60 text-sm">{item.city}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Analytics */}
          {portfolio?.analytics && portfolio.analytics.length > 0 && (
            <div className="glass-strong rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Son Performans</h2>
              </div>
              <div className="space-y-4">
                {portfolio.analytics.slice(0, 5).map((item: any, idx: number) => (
                  <div key={idx} className="glass-card p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">{item.store}</p>
                        <p className="text-white/60 text-sm">{item.month}/{item.year}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold">{formatCurrency(item.revenue)}</p>
                        <p className="text-white/60 text-sm">Kira/Ciro: {item.rentToRevenueRatio?.toFixed(1)}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Coming Soon */}
          <div className="glass-strong rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#00d4ff]/20 to-transparent rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00d4ff] to-[#00e5cc] flex items-center justify-center shadow-xl animate-float">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">Gelişmiş Grafikler Yakında</h3>
                  <p className="text-white/70">
                    Zaman serisi grafikleri, karşılaştırmalı analizler ve AI destekli öngörüler geliştirilmektedir.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function AnalyticsPage() {
  return (
    <ProtectedRoute>
      <AnalyticsContent />
    </ProtectedRoute>
  );
}
