/**
 * Dashboard Segment Cards
 * Dynamically renders dashboard highlight cards based on the active customer segment.
 * Cards come from the centralized SegmentUIConfig.
 */

'use client';

import { useSegment } from '../../contexts/segment-context';
import { useLanguage } from '../../contexts/language-context';
import {
  Wallet,
  Calendar,
  FileWarning,
  CheckSquare,
  RefreshCw,
  MapPin,
  TrendingDown,
  Hammer,
  FileText,
  HeadphonesIcon,
  BarChart3,
  Package,
  Truck,
  DollarSign,
  Users,
  ClipboardCheck,
  Shield,
  Activity,
  AlertTriangle,
} from 'lucide-react';
import type { DashboardCard } from '../../config/segment-ui-config';
import type { LucideIcon } from 'lucide-react';

const CARD_ICON_MAP: Record<string, LucideIcon> = {
  'monthly-expense': Wallet,
  'upcoming-payments': Calendar,
  'missing-docs': FileWarning,
  'todos': CheckSquare,
  'upcoming-renewals': RefreshCw,
  'region-summary': MapPin,
  'budget-deviation': TrendingDown,
  'opening-status': Hammer,
  'opening-steps': Hammer,
  'pending-docs': FileText,
  'open-support-tickets': HeadphonesIcon,
  'performance-summary': BarChart3,
  'noncompliant-products': Package,
  'pending-deliveries': Truck,
  'supply-cost-impact': DollarSign,
  'pipeline-status': Users,
  'pending-openings': Hammer,
  'audit-findings': ClipboardCheck,
  'network-performance': Activity,
  'supply-compliance': Shield,
  'supply-revenue': DollarSign,
  'risky-franchisees': AlertTriangle,
};

const CARD_GRADIENT_CYCLE = [
  'from-blue-500/10 to-cyan-500/10',
  'from-green-500/10 to-emerald-500/10',
  'from-yellow-500/10 to-orange-500/10',
  'from-purple-500/10 to-pink-500/10',
  'from-red-500/10 to-rose-500/10',
  'from-teal-500/10 to-sky-500/10',
  'from-indigo-500/10 to-violet-500/10',
];

const CARD_ICON_GRADIENT_CYCLE = [
  'from-blue-500 to-cyan-500',
  'from-green-500 to-emerald-500',
  'from-yellow-500 to-orange-500',
  'from-purple-500 to-pink-500',
  'from-red-500 to-rose-500',
  'from-teal-500 to-sky-500',
  'from-indigo-500 to-violet-500',
];

export function DashboardSegmentCards() {
  const { uiConfig } = useSegment();
  const { language } = useLanguage();

  if (!uiConfig || uiConfig.dashboard.length === 0) {
    return null;
  }

  const cards = [...uiConfig.dashboard].sort((a, b) => a.priority - b.priority);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white text-shadow mb-2">
          {language === 'tr' ? 'Segment Öncelikleri' : 'Segment Priorities'}
        </h2>
        <p className="text-white/60 text-sm">
          {language === 'tr'
            ? 'İşletme tipinize göre öne çıkan göstergeler'
            : 'Key indicators based on your business type'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, idx) => {
          const Icon = CARD_ICON_MAP[card.id] || BarChart3;
          const gradient = CARD_GRADIENT_CYCLE[idx % CARD_GRADIENT_CYCLE.length];
          const iconGrad = CARD_ICON_GRADIENT_CYCLE[idx % CARD_ICON_GRADIENT_CYCLE.length];

          return (
            <div
              key={card.id}
              className={`glass-card p-5 bg-gradient-to-br ${gradient} relative group cursor-pointer`}
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${iconGrad} flex items-center justify-center shadow-lg`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-white/90 text-sm font-semibold">
                {language === 'tr' ? card.labelTR : card.labelEN}
              </p>
              <p className="text-white/50 text-xs mt-1">—</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
