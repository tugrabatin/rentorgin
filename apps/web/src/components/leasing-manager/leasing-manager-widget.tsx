/**
 * Leasing Manager Dashboard Widget
 * Dashboard için Kiralama Yöneticisi özet widget'ı
 * Premium Glassmorphic Design
 */

'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Briefcase, Clock, Building2, Inbox, ArrowRight } from 'lucide-react';
import apiClient from '../../lib/api';

export function LeasingManagerWidget() {
  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ['leasing-manager-dashboard'],
    queryFn: async () => {
      const response = await apiClient.get('/leasing-manager/dashboard');
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="glass-card p-6 animate-pulse">
        <div className="h-6 bg-white/10 rounded w-1/3 mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-white/10 rounded"></div>
          <div className="h-4 bg-white/10 rounded"></div>
          <div className="h-4 bg-white/10 rounded"></div>
        </div>
      </div>
    );
  }

  const stats = dashboardData || { tasks: {}, projects: {}, requests: {} };

  return (
    <div className="glass-card p-6 relative group">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-lg font-bold text-white text-shadow">
            Kiralama Yöneticisi
          </h2>
        </div>
        <Link 
          href="/leasing-manager" 
          className="btn-glass !p-2 w-10 h-10 flex items-center justify-center"
        >
          <ArrowRight className="w-5 h-5 text-white/80" />
        </Link>
      </div>

      <div className="space-y-4">
        {/* Pending Tasks */}
        <div className="glass-light rounded-2xl p-4 group hover:glass transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Bekleyen Görevler</p>
                <p className="text-xs text-white/60">Dikkat gerektiren</p>
              </div>
            </div>
            <span className="text-2xl font-bold text-yellow-400">
              {stats.tasks?.pending || 0}
            </span>
          </div>
        </div>

        {/* Active Projects */}
        <div className="glass-light rounded-2xl p-4 group hover:glass transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Franchise Projeleri</p>
                <p className="text-xs text-white/60">Aktif projeler</p>
              </div>
            </div>
            <span className="text-2xl font-bold text-blue-400">
              {stats.projects?.total || 0}
            </span>
          </div>
        </div>

        {/* Open Requests */}
        <div className="glass-light rounded-2xl p-4 group hover:glass transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                <Inbox className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Açık Talepler</p>
                <p className="text-xs text-white/60">Yanıt bekleyen</p>
              </div>
            </div>
            <span className="text-2xl font-bold text-purple-400">
              {stats.requests?.open || 0}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/leasing-manager/tasks"
            className="text-center px-3 py-2 glass-light hover:glass rounded-xl text-sm font-medium text-white transition-all"
          >
            Görevler
          </Link>
          <Link
            href="/leasing-manager/job-descriptions"
            className="text-center px-3 py-2 glass-light hover:glass rounded-xl text-sm font-medium text-white transition-all"
          >
            İş Tanımı
          </Link>
        </div>
      </div>
    </div>
  );
}








