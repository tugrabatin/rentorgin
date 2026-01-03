/**
 * Store Leasing Tasks Component
 * Mağazaya bağlı kiralama görevlerini gösterir
 * Premium Glassmorphic Design
 */

'use client';

import { useQuery } from '@tanstack/react-query';
import { ClipboardList, Clock, AlertCircle, Plus } from 'lucide-react';
import apiClient from '../../lib/api';

interface StoreTasksProps {
  storeId: string;
}

export function StoreLeasingTasks({ storeId }: StoreTasksProps) {
  const { data: tasks, isLoading } = useQuery({
    queryKey: ['store-leasing-tasks', storeId],
    queryFn: async () => {
      const response = await apiClient.get(`/leasing-manager/tasks?storeId=${storeId}`);
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-white/10 rounded w-1/4"></div>
          <div className="h-20 bg-white/10 rounded"></div>
          <div className="h-20 bg-white/10 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
            <ClipboardList className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white text-shadow">
            Kiralama Görevleri
          </h2>
        </div>
        <button className="btn-glass !bg-gradient-to-r from-blue-500 to-cyan-500 glow-primary">
          <Plus className="w-4 h-4 mr-2" />
          Yeni Görev
        </button>
      </div>

      {tasks && tasks.length > 0 ? (
        <div className="space-y-3">
          {tasks.map((task: any) => (
            <div key={task.id} className="glass-card p-4 group hover:glass-strong transition-all">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-1 group-hover:gradient-text transition-all">
                    {task.title}
                  </h3>
                  {task.description && (
                    <p className="text-sm text-white/60 mb-2">{task.description}</p>
                  )}
                  <div className="flex items-center gap-3 text-xs text-white/50">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {task.dueDate ? new Date(task.dueDate).toLocaleDateString('tr-TR') : 'Tarih yok'}
                    </span>
                    {task.riskLevel !== 'LOW' && (
                      <span className="flex items-center gap-1 text-orange-400">
                        <AlertCircle className="w-3 h-3" />
                        {task.riskLevel}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`badge-glass ${
                    task.priority === 'URGENT' ? 'bg-red-500/20 border-red-500/30 text-red-400' :
                    task.priority === 'HIGH' ? 'bg-orange-500/20 border-orange-500/30 text-orange-400' :
                    task.priority === 'MEDIUM' ? 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400' :
                    'bg-gray-500/20 border-gray-500/30 text-gray-400'
                  }`}>
                    {task.priority}
                  </span>
                  <span className={`badge-glass ${
                    task.status === 'COMPLETED' ? 'bg-green-500/20 border-green-500/30 text-green-400' :
                    task.status === 'IN_PROGRESS' ? 'bg-blue-500/20 border-blue-500/30 text-blue-400' :
                    'bg-gray-500/20 border-gray-500/30 text-gray-400'
                  }`}>
                    {task.status}
                  </span>
                </div>
              </div>
              <div className="text-xs text-white/50 pt-2 border-t border-white/10">
                Kategori: {task.category}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 glass-card">
          <ClipboardList className="w-12 h-12 text-white/20 mx-auto mb-3" />
          <p className="text-white/60 mb-4">Bu mağaza için henüz görev bulunmuyor</p>
          <button className="btn-glass !bg-gradient-to-r from-blue-500 to-cyan-500 glow-primary inline-flex items-center gap-2">
            <Plus className="w-4 h-4" />
            İlk Görevi Ekle
          </button>
        </div>
      )}
    </div>
  );
}








