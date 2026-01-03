/**
 * Malls Page - Premium Glassmorphic Design
 * Mall Management Dashboard
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import apiClient from '../../lib/api';
import { ProtectedRoute } from '../../components/protected-route';
import { Navigation } from '../../components/navigation';
import { ShoppingBag, MapPin, Building2, Search } from 'lucide-react';

interface Mall {
  id: string;
  name: string;
  code: string;
  city: string;
  address: string;
  totalArea: number;
  manager?: string;
  _count?: {
    stores: number;
  };
}

function MallsContent() {
  const [malls, setMalls] = useState<Mall[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMalls();
  }, []);

  const fetchMalls = async () => {
    try {
      const response = await apiClient.get('/malls');
      setMalls(response.data);
    } catch (error) {
      console.error('Failed to fetch malls:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { label: 'Toplam AVM', value: malls.length, icon: ShoppingBag, gradient: 'from-indigo-500 to-purple-500' },
    { label: 'Şehir Sayısı', value: [...new Set(malls.map(m => m.city))].length, icon: MapPin, gradient: 'from-blue-500 to-cyan-500' },
    { label: 'Toplam Mağaza', value: malls.reduce((sum, m) => sum + (m._count?.stores || 0), 0), icon: Building2, gradient: 'from-green-500 to-emerald-500' },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="md:ml-64 pt-16 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold text-white text-shadow flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-xl">
                <ShoppingBag className="w-7 h-7 text-white" />
              </div>
              AVM'ler
            </h1>
            <p className="text-white/70 mt-2">
              Alışveriş merkezi ilişkileri
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="glass-card p-6">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-white/60 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-white text-shadow">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Search */}
          <div className="glass-strong rounded-2xl p-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder="AVM ara..."
                className="w-full pl-12 pr-4 py-3 glass rounded-full text-white placeholder-white/40 focus-glass transition-smooth"
              />
            </div>
          </div>

          {/* Malls Grid */}
          <div className="glass-strong rounded-3xl p-8">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8b5cf6]"></div>
              </div>
            ) : malls.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {malls.map((mall) => (
                  <Link
                    key={mall.id}
                    href={`/malls/${mall.id}`}
                    className="group glass-card p-6 relative overflow-hidden"
                  >
                    {/* Icon */}
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-4 shadow-xl group-hover:scale-110 transition-transform">
                      <ShoppingBag className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:gradient-text transition-all">
                        {mall.name}
                      </h3>
                      <p className="text-white/50 text-sm font-mono mb-3">{mall.code}</p>
                      
                      <div className="space-y-2 text-sm text-white/60">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{mall.city}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4" />
                          <span>{mall._count?.stores || 0} Mağaza</span>
                        </div>
                      </div>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <ShoppingBag className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <p className="text-white/60">Henüz AVM eklenmemiş</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function MallsPage() {
  return (
    <ProtectedRoute>
      <MallsContent />
    </ProtectedRoute>
  );
}
