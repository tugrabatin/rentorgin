/**
 * Risk Management Page
 * Premium Glassmorphic Design
 * Risk Yönetimi Sayfası
 */

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ProtectedRoute } from '../../components/protected-route';
import { Navigation } from '../../components/navigation';
import Link from 'next/link';
import { 
  AlertTriangle, 
  Plus, 
  TrendingUp,
  Shield,
  AlertCircle,
  CheckCircle,
  X,
  ArrowRight,
  Sparkles,
  Filter
} from 'lucide-react';
import apiClient from '../../lib/api';

function RiskContent() {
  const queryClient = useQueryClient();

  const { data: risks, isLoading } = useQuery({
    queryKey: ['risks'],
    queryFn: async () => {
      const response = await apiClient.get('/risk');
      return response.data;
    },
  });

  const { data: statistics } = useQuery({
    queryKey: ['risk-statistics'],
    queryFn: async () => {
      const response = await apiClient.get('/risk/statistics');
      return response.data;
    },
  });

  const { data: riskScore } = useQuery({
    queryKey: ['risk-score'],
    queryFn: async () => {
      const response = await apiClient.get('/risk/score');
      return response.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/risk/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['risks'] });
      queryClient.invalidateQueries({ queryKey: ['risk-statistics'] });
      queryClient.invalidateQueries({ queryKey: ['risk-score'] });
    },
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', { 
      style: 'currency', 
      currency: 'TRY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return 'bg-red-500/20 border-red-500/30 text-red-400';
      case 'HIGH': return 'bg-orange-500/20 border-orange-500/30 text-orange-400';
      case 'MEDIUM': return 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400';
      case 'LOW': return 'bg-green-500/20 border-green-500/30 text-green-400';
      default: return 'bg-gray-500/20 border-gray-500/30 text-gray-400';
    }
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      FINANCIAL: 'Finansal',
      OPERATIONAL: 'Operasyonel',
      LEGAL: 'Yasal',
      RELATIONSHIP: 'İlişki',
      MARKET: 'Pazar',
      OTHER: 'Diğer',
    };
    return labels[category] || category;
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      IDENTIFIED: 'Tespit Edildi',
      ASSESSING: 'Değerlendiriliyor',
      MITIGATING: 'Azaltılıyor',
      MONITORING: 'İzleniyor',
      RESOLVED: 'Çözüldü',
      ACCEPTED: 'Kabul Edildi',
    };
    return labels[status] || status;
  };

  const getRiskScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    if (score >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen relative">
      <Navigation />
      
      <main className="md:ml-64 pt-16 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Hero Section */}
          <div className="hero-gradient glass-strong rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#00d4ff]/20 to-transparent rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-br from-red-500/20 to-transparent rounded-full blur-3xl" style={{ animationDelay: '1s' }} />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="badge-glass flex items-center gap-2">
                  <Sparkles className="w-3 h-3 text-[#00d4ff]" />
                  <span>Risk Yönetimi</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-3 text-shadow flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center shadow-xl">
                      <Shield className="w-7 h-7 text-white" />
                    </div>
                    Risk Yönetimi
                  </h1>
                  <p className="text-white/70 text-lg">
                    Riskleri tanımlayın, değerlendirin ve yönetin
                  </p>
                </div>
                
                <Link href="/risk/create" className="btn-glass !bg-gradient-to-r from-red-500 to-pink-500 glow-primary">
                  <Plus className="w-5 h-5 mr-2" />
                  Yeni Risk Ekle
                </Link>
              </div>
            </div>
          </div>

          {/* Risk Score */}
          {riskScore !== undefined && (
            <div className="glass-strong rounded-3xl p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm mb-2">Genel Risk Skoru</p>
                  <p className={`text-6xl font-bold ${getRiskScoreColor(riskScore)} text-shadow`}>
                    {riskScore.toFixed(0)}
                  </p>
                  <p className="text-white/50 text-sm mt-2">/ 100 (Yüksek = Düşük Risk)</p>
                </div>
                <div className="w-32 h-32 rounded-full border-8 border-white/10 flex items-center justify-center relative">
                  <div 
                    className={`absolute inset-0 rounded-full border-8 border-transparent ${
                      riskScore >= 80 ? 'border-green-400' :
                      riskScore >= 60 ? 'border-yellow-400' :
                      riskScore >= 40 ? 'border-orange-400' :
                      'border-red-400'
                    }`}
                    style={{
                      clipPath: `inset(0 ${100 - riskScore}% 0 0)`,
                    }}
                  />
                  <Shield className="w-12 h-12 text-white/20" />
                </div>
              </div>
            </div>
          )}

          {/* Statistics */}
          {statistics && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="glass-card p-6 relative group">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center shadow-lg">
                    <AlertTriangle className="w-7 h-7 text-white" />
                  </div>
                </div>
                <p className="text-white/60 text-sm font-medium mb-2">Toplam Risk</p>
                <p className="text-3xl font-bold text-white text-shadow">
                  {statistics.totalRisks}
                </p>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>

              <div className="glass-card p-6 relative group">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center shadow-lg">
                    <AlertCircle className="w-7 h-7 text-white" />
                  </div>
                </div>
                <p className="text-white/60 text-sm font-medium mb-2">Kritik Risk</p>
                <p className="text-3xl font-bold text-red-400 text-shadow">
                  {statistics.criticalCount}
                </p>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>

              <div className="glass-card p-6 relative group">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg">
                    <TrendingUp className="w-7 h-7 text-white" />
                  </div>
                </div>
                <p className="text-white/60 text-sm font-medium mb-2">Yüksek Risk</p>
                <p className="text-3xl font-bold text-orange-400 text-shadow">
                  {statistics.highCount}
                </p>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>

              <div className="glass-card p-6 relative group">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg">
                    <AlertCircle className="w-7 h-7 text-white" />
                  </div>
                </div>
                <p className="text-white/60 text-sm font-medium mb-2">Çözülmemiş</p>
                <p className="text-3xl font-bold text-yellow-400 text-shadow">
                  {statistics.unresolvedCount}
                </p>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            </div>
          )}

          {/* Risks List */}
          <div className="glass-strong rounded-3xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center shadow-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white text-shadow">
                  Riskler
                </h2>
              </div>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00d4ff]"></div>
              </div>
            ) : risks && risks.length > 0 ? (
              <div className="space-y-4">
                {risks.map((risk: any) => (
                  <div key={risk.id} className="group glass-card p-6 relative overflow-hidden hover:glass-strong transition-all">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-xl font-bold text-white group-hover:gradient-text transition-all">
                            {risk.title}
                          </h3>
                          <span className={`badge-glass ${getSeverityColor(risk.severity)}`}>
                            {risk.severity}
                          </span>
                          <span className="badge-glass bg-blue-500/20 border-blue-500/30 text-blue-400">
                            {getCategoryLabel(risk.category)}
                          </span>
                        </div>

                        {risk.description && (
                          <p className="text-white/70 text-sm mb-4">{risk.description}</p>
                        )}

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          {risk.potentialImpact !== null && (
                            <div>
                              <p className="text-white/50 text-xs mb-1">Potansiyel Etki</p>
                              <p className="text-white font-semibold">
                                {formatCurrency(risk.potentialImpact)}
                              </p>
                            </div>
                          )}
                          {risk.probability !== null && (
                            <div>
                              <p className="text-white/50 text-xs mb-1">Olasılık</p>
                              <p className="text-white font-semibold">{risk.probability}%</p>
                            </div>
                          )}
                          {risk.mitigationCost !== null && (
                            <div>
                              <p className="text-white/50 text-xs mb-1">Azaltma Maliyeti</p>
                              <p className="text-white font-semibold">
                                {formatCurrency(risk.mitigationCost)}
                              </p>
                            </div>
                          )}
                          <div>
                            <p className="text-white/50 text-xs mb-1">Durum</p>
                            <p className="text-white font-semibold">{getStatusLabel(risk.status)}</p>
                          </div>
                        </div>

                        {risk.mitigationPlan && (
                          <div className="glass-light rounded-xl p-4 mb-4">
                            <p className="text-white/60 text-xs mb-2">Azaltma Planı</p>
                            <p className="text-white/80 text-sm">{risk.mitigationPlan}</p>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          href={`/risk/${risk.id}`}
                          className="btn-glass !p-2 w-10 h-10 flex items-center justify-center"
                        >
                          <ArrowRight className="w-5 h-5 text-white/80" />
                        </Link>
                        <button
                          onClick={() => {
                            if (confirm('Bu riski silmek istediğinizden emin misiniz?')) {
                              deleteMutation.mutate(risk.id);
                            }
                          }}
                          className="btn-glass !p-2 w-10 h-10 flex items-center justify-center hover:!bg-red-500/20"
                        >
                          <X className="w-5 h-5 text-white/80" />
                        </button>
                      </div>
                    </div>

                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Shield className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <p className="text-white/60 mb-4">Henüz risk eklenmemiş</p>
                <Link href="/risk/create" className="btn-glass inline-flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  İlk Risk'i Ekle
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function RiskPage() {
  return (
    <ProtectedRoute>
      <RiskContent />
    </ProtectedRoute>
  );
}







