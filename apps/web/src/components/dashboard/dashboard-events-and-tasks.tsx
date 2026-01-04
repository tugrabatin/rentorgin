/**
 * Dashboard Events and Tasks Component
 * Timeline of upcoming operational events + pending tasks panel
 */

'use client';

import Link from 'next/link';
import { 
  Calendar,
  TrendingUp,
  Store,
  Wrench,
  Clock,
  ArrowRight,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  location: string;
  type: 'yenileme' | 'artis' | 'acilis' | 'bakim';
  priority: 'yüksek' | 'normal' | 'düşük';
  href?: string;
}

interface Task {
  id: string;
  title: string;
  location: string;
  dueDate: string;
  status: 'acik' | 'devam-ediyor';
  href?: string;
}

export function DashboardEventsAndTasks() {
  const events: TimelineEvent[] = [
    {
      id: '1',
      date: '01.02.2026',
      title: 'Sözleşme bitişi',
      location: 'Zorlu Center - Mağaza A',
      type: 'yenileme',
      priority: 'yüksek',
      href: '/leases/1'
    },
    {
      id: '2',
      date: '05.02.2026',
      title: 'Kira artış tarihi (TÜFE + 2%)',
      location: 'İstinyePark - Mağaza B',
      type: 'artis',
      priority: 'normal',
      href: '/leases/2'
    },
    {
      id: '3',
      date: '12.02.2026',
      title: 'Yeni franchise açılışı',
      location: 'Ankara / Ankamall',
      type: 'acilis',
      priority: 'yüksek',
      href: '/leasing-manager'
    },
    {
      id: '4',
      date: '18.02.2026',
      title: 'Periyodik bakım kontrolü',
      location: 'Vadistanbul - Mağaza C',
      type: 'bakim',
      priority: 'normal',
      href: '/stores/3'
    },
    {
      id: '5',
      date: '25.02.2026',
      title: 'Sözleşme bitişi',
      location: 'Emaar Square - Mağaza D',
      type: 'yenileme',
      priority: 'normal',
      href: '/leases/4'
    }
  ];

  const tasks: Task[] = [
    {
      id: '1',
      title: 'Kira indirimi müzakeresi',
      location: 'Metropol AVM',
      dueDate: '28.01.2026',
      status: 'acik',
      href: '/leasing-manager'
    },
    {
      id: '2',
      title: 'Yeni lokasyon fizibilite',
      location: 'İzmir - Konak',
      dueDate: '30.01.2026',
      status: 'devam-ediyor',
      href: '/analytics'
    },
    {
      id: '3',
      title: 'Sözleşme yenileme teklifi',
      location: 'Zorlu Center',
      dueDate: '31.01.2026',
      status: 'acik',
      href: '/leases/1'
    },
    {
      id: '4',
      title: 'Ciro raporlama eksikleri',
      location: 'Forum İstanbul',
      dueDate: '02.02.2026',
      status: 'devam-ediyor',
      href: '/analytics'
    },
    {
      id: '5',
      title: 'AVM yönetimi toplantısı',
      location: 'İstinyePark',
      dueDate: '03.02.2026',
      status: 'acik',
      href: '/malls'
    }
  ];

  const getEventIcon = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'yenileme':
        return Calendar;
      case 'artis':
        return TrendingUp;
      case 'acilis':
        return Store;
      case 'bakim':
        return Wrench;
      default:
        return Calendar;
    }
  };

  const getEventBadgeColor = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'yenileme':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'artis':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'acilis':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'bakim':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getEventBadgeLabel = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'yenileme':
        return 'Yenileme';
      case 'artis':
        return 'Artış';
      case 'acilis':
        return 'Açılış';
      case 'bakim':
        return 'Bakım';
      default:
        return 'Diğer';
    }
  };

  const getPriorityBadge = (priority: TimelineEvent['priority']) => {
    if (priority === 'yüksek') {
      return (
        <div className="glass-light rounded-full px-2.5 py-1 flex items-center gap-1.5 border border-red-500/30">
          <AlertCircle className="w-3 h-3 text-red-400" />
          <span className="text-xs font-semibold text-red-400">Önemli</span>
        </div>
      );
    } else if (priority === 'normal') {
      return (
        <div className="glass-light rounded-full px-2.5 py-1 flex items-center gap-1.5 border border-white/10">
          <span className="text-xs font-medium text-white/60">Normal</span>
        </div>
      );
    }
    return null;
  };

  const getTaskStatusBadge = (status: Task['status']) => {
    if (status === 'devam-ediyor') {
      return (
        <div className="glass-light rounded-full px-2.5 py-1 flex items-center gap-1.5 border border-yellow-500/30">
          <Clock className="w-3 h-3 text-yellow-400" />
          <span className="text-xs font-semibold text-yellow-400">Devam Ediyor</span>
        </div>
      );
    } else {
      return (
        <div className="glass-light rounded-full px-2.5 py-1 flex items-center gap-1.5 border border-white/20">
          <span className="text-xs font-medium text-white/60">Açık</span>
        </div>
      );
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Timeline - Left (2/3) */}
      <div className="lg:col-span-2">
        <div className="glass-card p-6">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  Yaklaşan Olaylar
                </h2>
                <p className="text-white/60 text-sm">
                  Sözleşme yenilemeleri, kira artışları ve kritik tarihler
                </p>
              </div>
            </div>
          </div>

          {/* Timeline Events */}
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
            {events.map((event, index) => {
              const EventIcon = getEventIcon(event.type);
              
              const cardContent = (
                <div className="flex items-start gap-4">
                  {/* Date & Icon */}
                  <div className="flex-shrink-0">
                    <div className="text-center mb-2">
                      <p className="text-white/90 font-bold text-sm">
                        {event.date.split('.')[0]}
                      </p>
                      <p className="text-white/50 text-xs">
                        {event.date.split('.')[1]}/{event.date.split('.')[2].slice(2)}
                      </p>
                    </div>
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${
                      event.type === 'yenileme' ? 'from-blue-500 to-cyan-500' :
                      event.type === 'artis' ? 'from-green-500 to-emerald-500' :
                      event.type === 'acilis' ? 'from-purple-500 to-pink-500' :
                      'from-yellow-500 to-orange-500'
                    } flex items-center justify-center shadow-lg`}>
                      <EventIcon className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex-1">
                        <h3 className="text-white font-semibold text-sm mb-1 group-hover:gradient-text transition-all">
                          {event.title}
                        </h3>
                        <p className="text-white/60 text-xs">
                          {event.location}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white/80 flex-shrink-0 transition-colors group-hover:translate-x-1 transition-transform" />
                    </div>

                    {/* Badges */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className={`glass-light rounded-full px-2.5 py-1 text-xs font-medium border ${getEventBadgeColor(event.type)}`}>
                        {getEventBadgeLabel(event.type)}
                      </div>
                      {getPriorityBadge(event.priority)}
                    </div>
                  </div>
                </div>
              );
              
              return event.href ? (
                <Link
                  key={event.id}
                  href={event.href}
                  className="glass-light p-4 rounded-xl hover:glass transition-smooth group cursor-pointer relative"
                >
                  {cardContent}
                </Link>
              ) : (
                <div
                  key={event.id}
                  className="glass-light p-4 rounded-xl hover:glass transition-smooth group cursor-pointer relative"
                >
                  {cardContent}
                </div>
              );
            })}
          </div>

          {/* View All Link */}
          <div className="mt-4 pt-4 border-t border-white/10">
            <Link href="/leasing-manager" className="flex items-center justify-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors group">
              <span>Tüm olayları görüntüle</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Tasks - Right (1/3) */}
      <div className="lg:col-span-1">
        <div className="glass-card p-6">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  Bekleyen Görevler
                </h2>
                <p className="text-white/60 text-sm">
                  Açık aksiyonlar
                </p>
              </div>
            </div>
          </div>

          {/* Task List */}
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
            {tasks.map((task) => {
              const taskContent = (
                <>
                  <div className="mb-3">
                    <h3 className="text-white font-semibold text-sm mb-1.5 group-hover:gradient-text transition-all">
                      {task.title}
                    </h3>
                    <p className="text-white/60 text-xs mb-2">
                      {task.location}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-white/50">
                      <Clock className="w-3 h-3" />
                      <span>Son: {task.dueDate}</span>
                    </div>
                  </div>

                  {/* Status Badge */}
                  {getTaskStatusBadge(task.status)}
                </>
              );
              
              return task.href ? (
                <Link
                  key={task.id}
                  href={task.href}
                  className="glass-light p-4 rounded-xl hover:glass transition-smooth group cursor-pointer"
                >
                  {taskContent}
                </Link>
              ) : (
                <div
                  key={task.id}
                  className="glass-light p-4 rounded-xl hover:glass transition-smooth group cursor-pointer"
                >
                  {taskContent}
                </div>
              );
            })}
          </div>

          {/* View All Link */}
          <div className="mt-4 pt-4 border-t border-white/10">
            <Link href="/leasing-manager" className="flex items-center justify-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors group">
              <span>Tüm görevler</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}



