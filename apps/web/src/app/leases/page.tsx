/**
 * Leases Page - Premium Glassmorphic Design
 * Lease Management Dashboard
 */

'use client';

import { useQuery } from '@tanstack/react-query';
import { ProtectedRoute } from '../../components/protected-route';
import { Navigation } from '../../components/navigation';
import { FileText, Plus, AlertCircle, TrendingUp, Calendar, DollarSign, Eye, Search } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import apiClient from '../../lib/api';

function LeasesContent() {
  const router = useRouter();
  const { data: leases, isLoading } = useQuery({
    queryKey: ['leases'],
    queryFn: async () => {
      const response = await apiClient.get('/leases');
      return response.data;
    },
  });

  const { data: expiringLeases } = useQuery({
    queryKey: ['leases', 'expiring'],
    queryFn: async () => {
      const response = await apiClient.get('/leases/expiring?days=90');
      return response.data;
    },
  });

  const stats = {
    total: leases?.length || 0,
    active: leases?.filter((l: any) => l.status === 'ACTIVE').length || 0,
    expiring: expiringLeases?.length || 0,
    totalRevenue: leases?.reduce((sum: number, l: any) => sum + (l.monthlyRent || 0), 0) || 0,
  };

  const statCards = [
    { label: 'Toplam Sözleşme', value: stats.total, icon: FileText, gradient: 'from-blue-500 to-cyan-500' },
    { label: 'Aktif', value: stats.active, icon: TrendingUp, gradient: 'from-green-500 to-emerald-500' },
    { label: 'Yakında Bitecek', value: stats.expiring, icon: AlertCircle, gradient: 'from-yellow-500 to-orange-500' },
    { label: 'Aylık Toplam', value: `₺${stats.totalRevenue.toLocaleString('tr-TR')}`, icon: DollarSign, gradient: 'from-purple-500 to-pink-500' },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="md:ml-64 pt-16 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white text-shadow flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-xl">
                  <FileText className="w-7 h-7 text-white" />
                </div>
                Kira Sözleşmeleri
              </h1>
              <p className="text-white/70 mt-2">
                Tüm kira sözleşmelerini yönetin ve takip edin
              </p>
            </div>
            
            <div className="flex gap-3">
              <Link href="/dashboard" className="btn-glass">
                Dashboard
              </Link>
              <Link href="/leases/create" className="btn-glass !bg-gradient-to-r from-green-500 to-emerald-500 glow-secondary">
                <Plus className="w-5 h-5 mr-2" />
                Yeni Sözleşme
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((stat, idx) => (
              <div key={idx} className="glass-card p-6">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-white/60 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-white text-shadow">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Expiring Soon Alert */}
          {expiringLeases && expiringLeases.length > 0 && (
            <div className="glass-card p-6 border-l-4 border-yellow-500/50">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">
                    Dikkat: {expiringLeases.length} sözleşmenin süresi 90 gün içinde dolacak
                  </h3>
                  <p className="text-white/70 text-sm mb-4">
                    Bu sözleşmeleri gözden geçirmeniz ve yenileme sürecini başlatmanız önerilir.
                  </p>
                  <Link href="/leases?filter=expiring" className="btn-glass inline-flex items-center gap-2">
                    Detayları Görüntüle
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Search */}
          <div className="glass-strong rounded-2xl p-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder="Sözleşme ara..."
                className="w-full pl-12 pr-4 py-3 glass rounded-full text-white placeholder-white/40 focus-glass transition-smooth"
              />
            </div>
          </div>

          {/* Leases Grid */}
          <div className="glass-strong rounded-3xl p-8">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00e5cc]"></div>
              </div>
            ) : leases && leases.length > 0 ? (
              <div className="space-y-4">
                {leases.map((lease: any) => (
                  <div
                    key={lease.id}
                    onClick={() => router.push(`/leases/${lease.id}`)}
                    className="group glass-card p-6 cursor-pointer relative overflow-hidden"
                  >
                    {/* Status Badge */}
                    <div className={`absolute top-4 right-4 badge-glass ${
                      lease.status === 'ACTIVE' ? 'bg-green-500/20 border-green-500/30' :
                      lease.status === 'EXPIRING_SOON' ? 'bg-yellow-500/20 border-yellow-500/30' :
                      lease.status === 'EXPIRED' ? 'bg-red-500/20 border-red-500/30' :
                      'bg-gray-500/20 border-gray-500/30'
                    }`}>
                      {lease.status}
                    </div>

                    <div className="flex items-start gap-6">
                      {/* Icon */}
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                        <FileText className="w-7 h-7 text-white" />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:gradient-text transition-all">
                          {lease.contractNumber || 'No contract number'}
                        </h3>
                        <p className="text-white/70 mb-3">{lease.store?.name || 'Unknown store'}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center gap-2 text-white/60">
                            <Calendar className="w-4 h-4" />
                            <span>{lease.startDate ? new Date(lease.startDate).toLocaleDateString('tr-TR') : '-'}</span>
                          </div>
                          <div className="flex items-center gap-2 text-white/60">
                            <Calendar className="w-4 h-4" />
                            <span>{lease.endDate ? new Date(lease.endDate).toLocaleDateString('tr-TR') : '-'}</span>
                          </div>
                          <div className="flex items-center gap-2 text-white/60">
                            <DollarSign className="w-4 h-4" />
                            <span>₺{lease.monthlyRent?.toLocaleString('tr-TR') || '0'}</span>
                          </div>
                          <div className="flex justify-end">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(`/leases/${lease.id}`);
                              }}
                              className="btn-glass !py-2 !px-4 inline-flex items-center gap-2"
                            >
                              <Eye className="w-4 h-4" />
                              Detay
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <p className="text-white/60 mb-4">Henüz sözleşme eklenmemiş</p>
                <Link href="/leases/create" className="btn-glass inline-flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  İlk Sözleşmeyi Ekle
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function LeasesPage() {
  return (
    <ProtectedRoute>
      <LeasesContent />
    </ProtectedRoute>
  );
}
