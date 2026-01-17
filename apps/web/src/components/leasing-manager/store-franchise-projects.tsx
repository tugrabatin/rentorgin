/**
 * Store Franchise Projects Component
 * Mağazaya bağlı franchise projelerini gösterir
 * Premium Glassmorphic Design
 */

'use client';

import { useQuery } from '@tanstack/react-query';
import { Building2, TrendingUp, MapPin, Plus } from 'lucide-react';
import apiClient from '../../lib/api';

interface StoreProjectsProps {
  storeId: string;
}

export function StoreFranchiseProjects({ storeId }: StoreProjectsProps) {
  const { data: projects, isLoading } = useQuery({
    queryKey: ['store-franchise-projects', storeId],
    queryFn: async () => {
      const response = await apiClient.get(`/leasing-manager/franchise-projects?storeId=${storeId}`);
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-white/10 rounded w-1/4"></div>
          <div className="h-24 bg-white/10 rounded"></div>
          <div className="h-24 bg-white/10 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white text-shadow">
            Franchise Projeleri
          </h2>
        </div>
        <button className="btn-glass !bg-gradient-to-r from-purple-500 to-pink-500 glow-primary">
          <Plus className="w-4 h-4 mr-2" />
          Yeni Proje
        </button>
      </div>

      {projects && projects.length > 0 ? (
        <div className="space-y-4">
          {projects.map((project: any) => (
            <div key={project.id} className="glass-card p-5 group hover:glass-strong transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-1 group-hover:gradient-text transition-all">
                    {project.name}
                  </h3>
                  {project.code && (
                    <p className="text-xs text-white/50 mb-2 font-mono">Kod: {project.code}</p>
                  )}
                  {project.targetCity && (
                    <p className="text-sm text-white/60 flex items-center gap-1 mb-2">
                      <MapPin className="w-4 h-4" />
                      {project.targetCity}
                      {project.targetRegion && `, ${project.targetRegion}`}
                    </p>
                  )}
                </div>
                <span className={`badge-glass ${
                  project.status === 'OPENED' ? 'bg-green-500/20 border-green-500/30 text-green-400' :
                  project.status === 'APPROVED' ? 'bg-blue-500/20 border-blue-500/30 text-blue-400' :
                  project.status === 'IN_CONSTRUCTION' ? 'bg-orange-500/20 border-orange-500/30 text-orange-400' :
                  project.status === 'EVALUATION' ? 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400' :
                  'bg-gray-500/20 border-gray-500/30 text-gray-400'
                }`}>
                  {project.status}
                </span>
              </div>

              {/* Financial Info */}
              {(project.estimatedCapex || project.expectedRevenue) && (
                <div className="grid grid-cols-2 gap-3 mb-3">
                  {project.estimatedCapex && (
                    <div className="glass-light p-3 rounded-xl">
                      <p className="text-xs text-white/60">Yatırım</p>
                      <p className="text-sm font-semibold text-white">
                        ₺{(project.estimatedCapex / 1000).toFixed(0)}K
                      </p>
                    </div>
                  )}
                  {project.expectedRevenue && (
                    <div className="glass-light p-3 rounded-xl">
                      <p className="text-xs text-white/60">Tahmini Gelir</p>
                      <p className="text-sm font-semibold text-white">
                        ₺{(project.expectedRevenue / 1000).toFixed(0)}K
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Feasibility Score */}
              {project.feasibilityScore !== null && project.feasibilityScore !== undefined && (
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-blue-400" />
                  <span className="text-white/60">Fizibilite Skoru:</span>
                  <span className={`font-semibold ${
                    project.feasibilityScore >= 80 ? 'text-green-400' :
                    project.feasibilityScore >= 60 ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>
                    {project.feasibilityScore}/100
                  </span>
                </div>
              )}

              {project.notes && (
                <p className="text-xs text-white/50 mt-2 pt-2 border-t border-white/10">
                  {project.notes}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 glass-card">
          <Building2 className="w-12 h-12 text-white/20 mx-auto mb-3" />
          <p className="text-white/60 mb-4">Bu mağaza için henüz proje bulunmuyor</p>
          <button className="btn-glass !bg-gradient-to-r from-purple-500 to-pink-500 glow-primary inline-flex items-center gap-2">
            <Plus className="w-4 h-4" />
            İlk Projeyi Ekle
          </button>
        </div>
      )}
    </div>
  );
}










