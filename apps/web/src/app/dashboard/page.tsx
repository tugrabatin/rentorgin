/**
 * Dashboard Page
 * Main dashboard with overview statistics
 * 
 * Dashboard Sayfası
 * Genel bakış istatistikleri ile ana dashboard
 */

'use client';

import { useQuery } from '@tanstack/react-query';
import { ProtectedRoute } from '../../components/protected-route';
import { Navigation } from '../../components/navigation';
import Link from 'next/link';
import { Building2, FileText, TrendingUp, AlertCircle } from 'lucide-react';
import apiClient from '../../lib/api';

function DashboardContent() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      try {
        const response = await apiClient.get('/dashboard/stats');
        return response.data;
      } catch (error) {
        // If API is not available, return default stats
        return {
          totalStores: 0,
          totalLeases: 0,
          activeLeases: 0,
          expiringSoon: 0,
        };
      }
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00d4ff]"></div>
      </div>
    );
  }

  const dashboardStats = stats || {
    totalStores: 0,
    totalLeases: 0,
    activeLeases: 0,
    expiringSoon: 0,
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-white mb-8">Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm mb-2">Toplam Mağaza</p>
                  <p className="text-3xl font-bold text-white">{dashboardStats.totalStores}</p>
                </div>
                <Building2 className="w-12 h-12 text-blue-400" />
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm mb-2">Toplam Sözleşme</p>
                  <p className="text-3xl font-bold text-white">{dashboardStats.totalLeases}</p>
                </div>
                <FileText className="w-12 h-12 text-green-400" />
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm mb-2">Aktif Sözleşme</p>
                  <p className="text-3xl font-bold text-white">{dashboardStats.activeLeases}</p>
                </div>
                <TrendingUp className="w-12 h-12 text-yellow-400" />
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm mb-2">Yakında Bitecek</p>
                  <p className="text-3xl font-bold text-white">{dashboardStats.expiringSoon}</p>
                </div>
                <AlertCircle className="w-12 h-12 text-red-400" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/stores" className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition">
              <h2 className="text-xl font-bold text-white mb-2">Mağazalar</h2>
              <p className="text-white/70">Mağaza yönetimi ve lokasyon bilgileri</p>
            </Link>

            <Link href="/leases" className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition">
              <h2 className="text-xl font-bold text-white mb-2">Kira Sözleşmeleri</h2>
              <p className="text-white/70">Sözleşme yönetimi ve takibi</p>
            </Link>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

export default DashboardContent;
