/**
 * BASIS Dashboard
 * Premium Glassmorphic Design - macOS Big Sur Inspired
 * Professional Operations Cockpit for Leasing Managers
 */

'use client';

import { useAuth } from '../../contexts/auth-context';
import { ProtectedRoute } from '../../components/protected-route';
import { Navigation } from '../../components/navigation';
import { DashboardKpiRow } from '../../components/dashboard/dashboard-kpi-row';
import { DashboardEventsAndTasks } from '../../components/dashboard/dashboard-events-and-tasks';
import { DashboardAnalyticsOverview } from '../../components/dashboard/dashboard-analytics-overview';
import { DashboardQuickActions } from '../../components/dashboard/dashboard-quick-actions';
import { DashboardSegmentCards } from '../../components/dashboard/dashboard-segment-cards';
import { 
  Sparkles,
  Zap
} from 'lucide-react';

function DashboardContent() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen relative">
      <Navigation />
      
      {/* Main Content with Sidebar Offset */}
      <main className="md:ml-64 pt-16 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Hero Section with Gradient Banner */}
          <div className="hero-gradient glass-strong rounded-3xl p-8 relative overflow-hidden">
            {/* Floating decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#00d4ff]/20 to-transparent rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-br from-[#ff006e]/20 to-transparent rounded-full blur-3xl" style={{ animationDelay: '1s' }} />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="badge-glass flex items-center gap-2">
                  <Sparkles className="w-3 h-3 text-[#00d4ff]" />
                  <span>Dashboard</span>
                </div>
                <div className="badge-glass flex items-center gap-2">
                  <Zap className="w-3 h-3 text-[#00e5cc]" />
                  <span>Operations Cockpit</span>
                </div>
              </div>
              
              <h1 className="text-4xl font-bold text-white mb-3 text-shadow">
                Hoş geldiniz, <span className="gradient-text">{user?.firstName} {user?.lastName}</span>
              </h1>
              <p className="text-white/70 text-lg">
                Portföyünüzün güncel durumuna hızlı bakış
              </p>
            </div>
          </div>

          {/* BLOCK 0: Segment-based Priority Cards */}
          <DashboardSegmentCards />

          {/* BLOCK 1: Üst Özet Alanı - KPI Row */}
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white text-shadow mb-2">
                Bugünün Özeti
              </h2>
              <p className="text-white/60 text-sm">
                Portföyünüzün güncel durumuna hızlı bakış
              </p>
            </div>
            <DashboardKpiRow />
          </div>

          {/* BLOCK 2: Operasyon & Zaman Tüneli Bloğu */}
          <DashboardEventsAndTasks />

          {/* BLOCK 3: Analitik & Görselleştirme Bloğu */}
          <DashboardAnalyticsOverview />

          {/* BLOCK 4: Hızlı Erişim & Kısa Yollar Bloğu */}
          <DashboardQuickActions />

          {/* Footer */}
          <div className="text-center py-6">
            <p className="text-white/40 text-sm">
              BASIS <span className="gradient-text font-semibold">v0.4.0</span> | © 2025 | Kurumsal Kiralama Yönetim Platformu
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
