/**
 * Stores Page - Premium Glassmorphic Design
 * Store Management Dashboard
 */

'use client';

import { useQuery } from '@tanstack/react-query';
import { Building2, Plus, MapPin, TrendingUp, Users, Search } from 'lucide-react';
import Link from 'next/link';
import { ProtectedRoute } from '../../components/protected-route';
import { Navigation } from '../../components/navigation';

function StoresContent() {
  const { data: stores, isLoading, refetch } = useQuery({
    queryKey: ['stores'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3002/api/v1/stores', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch stores');
      return response.json();
    },
  });

  // Mock statistics
  const stats = [
    { label: 'Toplam Mağaza', value: stores?.length || 0, icon: Building2, gradient: 'from-blue-500 to-cyan-500' },
    { label: 'Aktif Mağaza', value: stores?.filter((s: any) => s.status === 'ACTIVE').length || 0, icon: TrendingUp, gradient: 'from-green-500 to-emerald-500' },
    { label: 'Şehir Sayısı', value: [...new Set(stores?.map((s: any) => s.city) || [])].length, icon: MapPin, gradient: 'from-purple-500 to-pink-500' },
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
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-xl">
                  <Building2 className="w-7 h-7 text-white" />
                </div>
                Mağazalar
              </h1>
              <p className="text-white/70 mt-2">
                Tüm mağaza lokasyonlarını yönetin
              </p>
            </div>
            
            <div className="flex gap-3">
              <Link href="/dashboard" className="btn-glass">
                Dashboard
              </Link>
              <Link href="/stores/create" className="btn-glass !bg-gradient-to-r from-blue-500 to-cyan-500 glow-primary">
                <Plus className="w-5 h-5 mr-2" />
                Yeni Mağaza
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-white/60 text-sm">{stat.label}</p>
                <p className="text-4xl font-bold text-white text-shadow mt-2">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Search Bar */}
          <div className="glass-strong rounded-2xl p-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder="Mağaza ara..."
                className="w-full pl-12 pr-4 py-3 glass rounded-full text-white placeholder-white/40 focus-glass transition-smooth"
              />
            </div>
          </div>

          {/* Stores Grid */}
          <div className="glass-strong rounded-3xl p-8">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00d4ff]"></div>
              </div>
            ) : stores && stores.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stores.map((store: any) => (
                  <Link
                    key={store.id}
                    href={`/stores/${store.id}`}
                    className="group glass-card p-6 relative overflow-hidden"
                  >
                    {/* Status Badge */}
                    <div className={`absolute top-4 right-4 badge-glass ${
                      store.status === 'ACTIVE' ? 'bg-green-500/20 border-green-500/30' :
                      store.status === 'PLANNING' ? 'bg-blue-500/20 border-blue-500/30' :
                      'bg-gray-500/20 border-gray-500/30'
                    }`}>
                      {store.status}
                    </div>

                    {/* Icon */}
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4 shadow-xl group-hover:scale-110 transition-transform">
                      <Building2 className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-white group-hover:gradient-text transition-all">
                          {store.name}
                        </h3>
                      </div>
                      
                      <p className="text-white/50 text-sm font-mono mb-3">{store.code}</p>
                      
                      {store.brand && (
                        <p className="text-white/70 text-sm mb-3">{store.brand}</p>
                      )}
                      
                      <div className="flex items-center gap-4 text-sm text-white/60">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{store.city}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{store.squareMeters} m²</span>
                        </div>
                      </div>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Building2 className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <p className="text-white/60 mb-4">Henüz mağaza eklenmemiş</p>
                <Link href="/stores/create" className="btn-glass inline-flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  İlk Mağazayı Ekle
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function StoresPage() {
  return (
    <ProtectedRoute>
      <StoresContent />
    </ProtectedRoute>
  );
}
