/**
 * Leasing Manager Dashboard
 * Kiralama Yöneticisi Dashboard
 * 
 * Main dashboard for leasing operations, franchise projects, and job descriptions
 * Kiralama operasyonları, franchise projeleri ve iş tanımları için ana dashboard
 * 
 * Premium Glassmorphic Design - macOS Big Sur Inspired
 */

'use client';

import { useQuery } from '@tanstack/react-query';
import { ProtectedRoute } from '../../components/protected-route';
import { Navigation } from '../../components/navigation';
import Link from 'next/link';
import { 
  ClipboardList, 
  Building2, 
  FileText, 
  Inbox,
  TrendingUp,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  Briefcase,
  Plus,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import apiClient from '../../lib/api';

function LeasingManagerContent() {
  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ['leasing-manager-dashboard'],
    queryFn: async () => {
      const response = await apiClient.get('/leasing-manager/dashboard');
      return response.data;
    },
  });

  const { data: tasksData } = useQuery({
    queryKey: ['leasing-tasks'],
    queryFn: async () => {
      const response = await apiClient.get('/leasing-manager/tasks?limit=5');
      return response.data;
    },
  });

  const { data: projectsData } = useQuery({
    queryKey: ['franchise-projects'],
    queryFn: async () => {
      const response = await apiClient.get('/leasing-manager/franchise-projects?limit=5');
      return response.data;
    },
  });

  const { data: requestsData } = useQuery({
    queryKey: ['leasing-requests'],
    queryFn: async () => {
      const response = await apiClient.get('/leasing-manager/requests?limit=5');
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00d4ff]"></div>
      </div>
    );
  }

  const stats = dashboardData || { tasks: {}, projects: {}, requests: {} };

  return (
    <div className="min-h-screen relative">
      <Navigation />
      
      <main className="md:ml-64 pt-16 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Hero Section */}
          <div className="hero-gradient glass-strong rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#00d4ff]/20 to-transparent rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-3xl" style={{ animationDelay: '1s' }} />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="badge-glass flex items-center gap-2">
                  <Sparkles className="w-3 h-3 text-[#00d4ff]" />
                  <span>Kiralama Yöneticisi</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-3 text-shadow flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-xl">
                      <Briefcase className="w-7 h-7 text-white" />
                    </div>
                    Kiralama Yöneticisi
                  </h1>
                  <p className="text-white/70 text-lg">
                    Görevler, franchise projeleri ve talepleri yönetin
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <Link href="/dashboard" className="btn-glass">
                    Dashboard
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pending Tasks */}
            <div className="glass-card p-6 relative group">
              <div className="flex items-start justify-between mb-6">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg`}>
                  <Clock className="w-7 h-7 text-white" />
                </div>
                <div className="badge-glass bg-yellow-500/20 border-yellow-500/30">
                  Bekleyen
                </div>
              </div>
              <p className="text-white/60 text-sm font-medium mb-2">Bekleyen Görev</p>
              <p className="text-5xl font-bold text-white text-shadow">
                {stats.tasks?.pending || 0}
              </p>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>

            {/* Active Projects */}
            <div className="glass-card p-6 relative group">
              <div className="flex items-start justify-between mb-6">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg`}>
                  <Building2 className="w-7 h-7 text-white" />
                </div>
                <div className="badge-glass bg-blue-500/20 border-blue-500/30">
                  Aktif
                </div>
              </div>
              <p className="text-white/60 text-sm font-medium mb-2">Franchise Projesi</p>
              <p className="text-5xl font-bold text-white text-shadow">
                {stats.projects?.total || 0}
              </p>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>

            {/* Open Requests */}
            <div className="glass-card p-6 relative group">
              <div className="flex items-start justify-between mb-6">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg`}>
                  <Inbox className="w-7 h-7 text-white" />
                </div>
                <div className="badge-glass bg-purple-500/20 border-purple-500/30">
                  Açık
                </div>
              </div>
              <p className="text-white/60 text-sm font-medium mb-2">Açık Talep</p>
              <p className="text-5xl font-bold text-white text-shadow">
                {stats.requests?.open || 0}
              </p>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>

            {/* Completed Tasks */}
            <div className="glass-card p-6 relative group">
              <div className="flex items-start justify-between mb-6">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg`}>
                  <CheckCircle className="w-7 h-7 text-white" />
                </div>
                <div className="badge-glass bg-green-500/20 border-green-500/30">
                  Tamamlandı
                </div>
              </div>
              <p className="text-white/60 text-sm font-medium mb-2">Tamamlanan Görev</p>
              <p className="text-5xl font-bold text-white text-shadow">
                {stats.tasks?.completed || 0}
              </p>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          </div>

          {/* Recent Tasks */}
          <div className="glass-strong rounded-3xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                  <ClipboardList className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white text-shadow">
                  Son Görevler
                </h2>
              </div>
              <Link 
                href="/leasing-manager/tasks" 
                className="btn-glass !p-2 w-10 h-10 flex items-center justify-center"
              >
                <ArrowRight className="w-5 h-5 text-white/80" />
              </Link>
            </div>
            
            {tasksData && tasksData.length > 0 ? (
              <div className="space-y-3">
                {tasksData.slice(0, 5).map((task: any) => (
                  <div 
                    key={task.id} 
                    className="glass-card p-4 group hover:glass-strong transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-white mb-1 group-hover:gradient-text transition-all">
                          {task.title}
                        </h3>
                        <p className="text-sm text-white/60">{task.category}</p>
                      </div>
                      <div className="flex items-center gap-3">
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
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <ClipboardList className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <p className="text-white/60 mb-4">Görev bulunamadı</p>
                <Link href="/leasing-manager/tasks/create" className="btn-glass inline-flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  İlk Görevi Ekle
                </Link>
              </div>
            )}
          </div>

          {/* Recent Projects & Requests */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Franchise Projects */}
            <div className="glass-strong rounded-3xl p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white text-shadow">
                    Franchise Projeleri
                  </h2>
                </div>
                <Link 
                  href="/leasing-manager/projects" 
                  className="btn-glass !p-2 w-10 h-10 flex items-center justify-center"
                >
                  <ArrowRight className="w-5 h-5 text-white/80" />
                </Link>
              </div>
              
              {projectsData && projectsData.length > 0 ? (
                <div className="space-y-3">
                  {projectsData.slice(0, 5).map((project: any) => (
                    <div 
                      key={project.id} 
                      className="glass-card p-4 group hover:glass-strong transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-white mb-1 group-hover:gradient-text transition-all">
                            {project.name}
                          </h3>
                          <p className="text-sm text-white/60">
                            {project.targetCity || 'Lokasyon belirtilmedi'}
                          </p>
                        </div>
                        <span className={`badge-glass ${
                          project.status === 'OPENED' ? 'bg-green-500/20 border-green-500/30 text-green-400' :
                          project.status === 'APPROVED' ? 'bg-blue-500/20 border-blue-500/30 text-blue-400' :
                          'bg-gray-500/20 border-gray-500/30 text-gray-400'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Building2 className="w-16 h-16 text-white/20 mx-auto mb-4" />
                  <p className="text-white/60 mb-4">Proje bulunamadı</p>
                  <Link href="/leasing-manager/projects/create" className="btn-glass inline-flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    İlk Projeyi Ekle
                  </Link>
                </div>
              )}
            </div>

            {/* Leasing Requests */}
            <div className="glass-strong rounded-3xl p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
                    <Inbox className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white text-shadow">
                    Talepler
                  </h2>
                </div>
                <Link 
                  href="/leasing-manager/requests" 
                  className="btn-glass !p-2 w-10 h-10 flex items-center justify-center"
                >
                  <ArrowRight className="w-5 h-5 text-white/80" />
                </Link>
              </div>
              
              {requestsData && requestsData.length > 0 ? (
                <div className="space-y-3">
                  {requestsData.slice(0, 5).map((request: any) => (
                    <div 
                      key={request.id} 
                      className="glass-card p-4 group hover:glass-strong transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-white mb-1 group-hover:gradient-text transition-all">
                            {request.title}
                          </h3>
                          <p className="text-sm text-white/60">{request.type}</p>
                        </div>
                        <span className={`badge-glass ${
                          request.status === 'RESOLVED' ? 'bg-green-500/20 border-green-500/30 text-green-400' :
                          request.status === 'IN_PROGRESS' ? 'bg-blue-500/20 border-blue-500/30 text-blue-400' :
                          'bg-yellow-500/20 border-yellow-500/30 text-yellow-400'
                        }`}>
                          {request.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Inbox className="w-16 h-16 text-white/20 mx-auto mb-4" />
                  <p className="text-white/60 mb-4">Talep bulunamadı</p>
                  <Link href="/leasing-manager/requests/create" className="btn-glass inline-flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    İlk Talebi Ekle
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link 
              href="/leasing-manager/tasks/create" 
              className="group glass-card p-6 text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4 shadow-xl group-hover:scale-110 transition-transform">
                  <ClipboardList className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-white mb-2 group-hover:gradient-text transition-all">
                  Yeni Görev
                </h3>
                <p className="text-sm text-white/60">Kiralama görevi oluştur</p>
              </div>
            </Link>

            <Link 
              href="/leasing-manager/projects/create" 
              className="group glass-card p-6 text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4 shadow-xl group-hover:scale-110 transition-transform">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-white mb-2 group-hover:gradient-text transition-all">
                  Yeni Proje
                </h3>
                <p className="text-sm text-white/60">Franchise projesi başlat</p>
              </div>
            </Link>

            <Link 
              href="/leasing-manager/job-descriptions" 
              className="group glass-card p-6 text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-4 shadow-xl group-hover:scale-110 transition-transform">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-white mb-2 group-hover:gradient-text transition-all">
                  İş Tanımı
                </h3>
                <p className="text-sm text-white/60">İş tanımı oluştur</p>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function LeasingManagerPage() {
  return (
    <ProtectedRoute>
      <LeasingManagerContent />
    </ProtectedRoute>
  );
}








