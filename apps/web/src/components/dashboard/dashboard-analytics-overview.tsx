/**
 * Dashboard Analytics Overview Component
 * Analytics visualizations: Kira vs Ciro trends and ratio analysis
 */

'use client';

import { useState } from 'react';
import { 
  TrendingUp,
  BarChart3,
  Filter,
  AlertTriangle,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export function DashboardAnalyticsOverview() {
  const [trendPeriod, setTrendPeriod] = useState('12');
  const [selectedRegion, setSelectedRegion] = useState('tümü');

  // Dummy data for visualization
  const monthlyData = [
    { month: 'Oca', kira: 120, ciro: 580 },
    { month: 'Şub', kira: 125, ciro: 620 },
    { month: 'Mar', kira: 128, ciro: 650 },
    { month: 'Nis', kira: 130, ciro: 640 },
    { month: 'May', kira: 132, ciro: 680 },
    { month: 'Haz', kira: 135, ciro: 720 },
    { month: 'Tem', kira: 138, ciro: 750 },
    { month: 'Ağu', kira: 140, ciro: 780 },
    { month: 'Eyl', kira: 142, ciro: 760 },
    { month: 'Eki', kira: 145, ciro: 800 },
    { month: 'Kas', kira: 148, ciro: 820 },
    { month: 'Ara', kira: 150, ciro: 850 },
  ];

  const ratioData = [
    { region: 'İstanbul - Avrupa', ratio: 18.5, status: 'iyi' },
    { region: 'İstanbul - Anadolu', ratio: 19.2, status: 'iyi' },
    { region: 'Ankara', ratio: 21.8, status: 'orta' },
    { region: 'İzmir', ratio: 17.3, status: 'iyi' },
    { region: 'Bursa', ratio: 24.5, status: 'risk' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'iyi':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'orta':
        return <AlertCircle className="w-4 h-4 text-yellow-400" />;
      case 'risk':
        return <AlertTriangle className="w-4 h-4 text-red-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'iyi':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'orta':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'risk':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'iyi':
        return 'İyi';
      case 'orta':
        return 'Orta';
      case 'risk':
        return 'Riskli';
      default:
        return 'Bilinmiyor';
    }
  };

  // Calculate max values for chart scaling
  const maxKira = Math.max(...monthlyData.map(d => d.kira));
  const maxCiro = Math.max(...monthlyData.map(d => d.ciro));

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white text-shadow">
            Analitik Özet
          </h2>
          <p className="text-white/60 text-sm mt-1">
            Kira, ciro ve verimlilik metriklerine genel bakış
          </p>
        </div>
        <div className="h-px flex-1 ml-6 bg-gradient-to-r from-white/20 to-transparent" />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT: Kira vs Ciro Trend Chart */}
        <div className="glass-card p-6">
          {/* Chart Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  Kira ve Ciro – Son 12 Ay
                </h3>
                <p className="text-white/60 text-xs">
                  Aylık trend karşılaştırması (bin ₺)
                </p>
              </div>
            </div>

            {/* Period Filter */}
            <div className="flex items-center gap-2">
              {['3', '6', '12'].map((period) => (
                <button
                  key={period}
                  onClick={() => setTrendPeriod(period)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-smooth ${
                    trendPeriod === period
                      ? 'glass-strong text-white'
                      : 'glass-light text-white/60 hover:text-white'
                  }`}
                >
                  {period} Ay
                </button>
              ))}
            </div>
          </div>

          {/* Chart Area - Simple Bar Representation */}
          <div className="space-y-4 mb-6">
            {monthlyData.slice(-parseInt(trendPeriod)).map((data, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-xs text-white/60 mb-1">
                  <span className="font-medium">{data.month}</span>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
                      {data.kira}K
                    </span>
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500" />
                      {data.ciro}K
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {/* Kira Bar */}
                  <div className="flex-1 h-2 glass-light rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-500"
                      style={{ width: `${(data.kira / maxKira) * 100}%` }}
                    />
                  </div>
                  {/* Ciro Bar */}
                  <div className="flex-1 h-2 glass-light rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${(data.ciro / maxCiro) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* AI Insight */}
          <div className="glass-light rounded-xl p-4 border border-cyan-500/20">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500/20 to-teal-500/20 flex items-center justify-center border border-cyan-500/30 flex-shrink-0">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <p className="text-xs font-semibold text-cyan-400 mb-1">
                  AI Insight
                </p>
                <p className="text-white/80 text-sm">
                  Son 3 ayda kira/ciro oranı <span className="font-bold text-white">%17.8</span> seviyesinde sabit kaldı. 
                  Ciro artış trendi <span className="font-bold text-green-400">olumlu</span>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Kira/Ciro Ratio by Region */}
        <div className="glass-card p-6">
          {/* Chart Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  Kira / Ciro Oranı
                </h3>
                <p className="text-white/60 text-xs">
                  Bölgelere göre performans (%)
                </p>
              </div>
            </div>

            {/* Region Filter */}
            <button className="flex items-center gap-2 glass-light px-3 py-2 rounded-xl hover:glass transition-smooth">
              <Filter className="w-4 h-4 text-white/60" />
              <span className="text-xs font-medium text-white/80">Bölge</span>
            </button>
          </div>

          {/* Horizontal Bar Chart */}
          <div className="space-y-4 mb-6">
            {ratioData.map((data, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-white/80 font-medium">{data.region}</span>
                  <span className="text-white font-bold">{data.ratio}%</span>
                </div>
                <div className="relative">
                  <div className="h-3 glass-light rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        data.status === 'iyi' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                        data.status === 'orta' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                        'bg-gradient-to-r from-red-500 to-pink-500'
                      }`}
                      style={{ width: `${Math.min(data.ratio * 3, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Risk Table */}
          <div className="glass-light rounded-xl p-4 border border-white/10">
            <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-400" />
              Dikkat Gereken Lokasyonlar
            </h4>
            <div className="space-y-2">
              {ratioData.filter(d => d.status !== 'iyi').map((data, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(data.status)}
                    <span className="text-white/80 text-sm">{data.region}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold text-sm">{data.ratio}%</span>
                    <div className={`glass-light rounded-full px-2 py-0.5 text-xs font-medium border ${getStatusColor(data.status)}`}>
                      {getStatusLabel(data.status)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}









