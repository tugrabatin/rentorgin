/**
 * Dashboard Quick Actions Component
 * Task-oriented shortcuts for common leasing operations
 */

'use client';

import Link from 'next/link';
import { 
  MapPin,
  Calendar,
  TrendingDown,
  Building2,
  Bot,
  Languages,
  ArrowRight
} from 'lucide-react';

interface QuickAction {
  title: string;
  description: string;
  href: string;
  icon: any;
  gradient: string;
  iconGradient: string;
}

export function DashboardQuickActions() {
  const actions: QuickAction[] = [
    {
      title: 'Yeni Mağaza / Lokasyon Değerlendirmesi',
      description: 'Bölge analizi ve fizibilite çalışması başlat',
      href: '/analytics?view=feasibility',
      icon: MapPin,
      gradient: 'from-blue-500/20 to-cyan-500/20',
      iconGradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Yaklaşan Yenilemeler',
      description: 'Son 90 gün içinde biten sözleşmeler',
      href: '/leases?filter=expiring',
      icon: Calendar,
      gradient: 'from-green-500/20 to-emerald-500/20',
      iconGradient: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Kira İndirimi / Revizyon Talepleri',
      description: 'Açık müzakere ve pazarlık süreçleri',
      href: '/leasing-manager?type=discount',
      icon: TrendingDown,
      gradient: 'from-yellow-500/20 to-orange-500/20',
      iconGradient: 'from-yellow-500 to-orange-500',
    },
    {
      title: 'Franchise Projeleri',
      description: 'Devam eden franchise açılış ve fırsatları',
      href: '/leasing-manager?tab=franchises',
      icon: Building2,
      gradient: 'from-purple-500/20 to-fuchsia-500/20',
      iconGradient: 'from-purple-500 to-fuchsia-500',
    },
    {
      title: 'AI Asistan – Müzakere Desteği',
      description: 'AVM veya malik ile görüşmeler için strateji önerisi al',
      href: '/ai-assistant?context=negotiation',
      icon: Bot,
      gradient: 'from-pink-500/20 to-rose-500/20',
      iconGradient: 'from-pink-500 to-rose-500',
    },
    {
      title: 'Çeviri ve Sözleşme İnceleme',
      description: 'Uzun kira sözleşmelerini çevir ve analiz et',
      href: '/translation',
      icon: Languages,
      gradient: 'from-indigo-500/20 to-purple-500/20',
      iconGradient: 'from-indigo-500 to-purple-500',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white text-shadow">
            Hızlı Erişim
          </h2>
          <p className="text-white/60 text-sm mt-1">
            En sık kullanılan işlemlere tek tıkla ulaşın
          </p>
        </div>
        <div className="h-px flex-1 ml-6 bg-gradient-to-r from-white/20 to-transparent" />
      </div>

      {/* Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {actions.map((action, index) => (
          <Link
            key={index}
            href={action.href}
            className="group glass-card p-6 relative overflow-hidden"
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
            
            <div className="relative z-10">
              {/* Icon Bubble */}
              <div className="flex items-start justify-between mb-5">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${action.iconGradient} flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:rotate-3 transition-transform`}>
                  <action.icon className="w-7 h-7 text-white" />
                </div>
                
                <div className="btn-glass !p-2 w-10 h-10 flex items-center justify-center transform group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-5 h-5 text-white/80" />
                </div>
              </div>
              
              {/* Text Content */}
              <div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:gradient-text transition-all leading-snug">
                  {action.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {action.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}








