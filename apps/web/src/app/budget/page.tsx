/**
 * Budget Management Page
 * Premium Glassmorphic Design
 * Bütçe Yönetimi Sayfası
 */

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ProtectedRoute } from '../../components/protected-route';
import { Navigation } from '../../components/navigation';
import Link from 'next/link';
import { 
  DollarSign, 
  Plus, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Target,
  AlertCircle,
  CheckCircle,
  X,
  ArrowRight,
  Sparkles,
  Filter
} from 'lucide-react';
import apiClient from '../../lib/api';

function BudgetContent() {
  const queryClient = useQueryClient();
  const currentYear = new Date().getFullYear();

  const { data: budgets, isLoading } = useQuery({
    queryKey: ['budgets'],
    queryFn: async () => {
      const response = await apiClient.get('/budget');
      return response.data;
    },
  });

  const { data: statistics } = useQuery({
    queryKey: ['budget-statistics'],
    queryFn: async () => {
      const response = await apiClient.get('/budget/statistics');
      return response.data;
    },
  });

  const { data: budgetVsActual } = useQuery({
    queryKey: ['budget-vs-actual', currentYear],
    queryFn: async () => {
      const response = await apiClient.get(`/budget/vs-actual?year=${currentYear}`);
      return response.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/budget/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-500/20 border-green-500/30 text-green-400';
      case 'APPROVED': return 'bg-blue-500/20 border-blue-500/30 text-blue-400';
      case 'DRAFT': return 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400';
      case 'CLOSED': return 'bg-gray-500/20 border-gray-500/30 text-gray-400';
      default: return 'bg-gray-500/20 border-gray-500/30 text-gray-400';
    }
  };

  const getScopeLabel = (scope: string) => {
    const labels: Record<string, string> = {
      COMPANY: 'Şirket',
      COUNTRY: 'Ülke',
      CITY: 'Şehir',
      BRAND: 'Marka',
      MALL_TYPE: 'AVM Tipi',
    };
    return labels[scope] || scope;
  };

  return (
    <div className="min-h-screen relative">
      <Navigation />
      
      <main className="md:ml-64 pt-16 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Hero Section */}
          <div className="hero-gradient glass-strong rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#00d4ff]/20 to-transparent rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-br from-green-500/20 to-transparent rounded-full blur-3xl" style={{ animationDelay: '1s' }} />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="badge-glass flex items-center gap-2">
                  <Sparkles className="w-3 h-3 text-[#00d4ff]" />
                  <span>Bütçe Yönetimi</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-3 text-shadow flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-xl">
                      <DollarSign className="w-7 h-7 text-white" />
                    </div>
                    Bütçe Yönetimi
                  </h1>
                  <p className="text-white/70 text-lg">
                    Planlanan ve gerçekleşen bütçeleri takip edin
                  </p>
                </div>
                
                <Link href="/budget/create" className="btn-glass !bg-gradient-to-r from-green-500 to-emerald-500 glow-primary">
                  <Plus className="w-5 h-5 mr-2" />
                  Yeni Bütçe
                </Link>
              </div>
            </div>
          </div>

          {/* Statistics */}
          {statistics && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="glass-card p-6 relative group">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                    <Target className="w-7 h-7 text-white" />
                  </div>
                </div>
                <p className="text-white/60 text-sm font-medium mb-2">Toplam Bütçe</p>
                <p className="text-3xl font-bold text-white text-shadow">
                  {formatCurrency(statistics.totalPlanned)}
                </p>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>

              <div className="glass-card p-6 relative group">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
                    <CheckCircle className="w-7 h-7 text-white" />
                  </div>
                </div>
                <p className="text-white/60 text-sm font-medium mb-2">Gerçekleşen</p>
                <p className="text-3xl font-bold text-white text-shadow">
                  {formatCurrency(statistics.totalActual)}
                </p>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>

              <div className="glass-card p-6 relative group">
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${
                    (statistics.totalVariance || 0) >= 0 
                      ? 'from-red-500 to-pink-500' 
                      : 'from-green-500 to-emerald-500'
                  } flex items-center justify-center shadow-lg`}>
                    {(statistics.totalVariance || 0) >= 0 ? (
                      <TrendingUp className="w-7 h-7 text-white" />
                    ) : (
                      <TrendingDown className="w-7 h-7 text-white" />
                    )}
                  </div>
                </div>
                <p className="text-white/60 text-sm font-medium mb-2">Fark</p>
                <p className={`text-3xl font-bold text-shadow ${
                  (statistics.totalVariance || 0) >= 0 ? 'text-red-400' : 'text-green-400'
                }`}>
                  {formatCurrency(statistics.totalVariance || 0)}
                </p>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>

              <div className="glass-card p-6 relative group">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                    <Calendar className="w-7 h-7 text-white" />
                  </div>
                </div>
                <p className="text-white/60 text-sm font-medium mb-2">Toplam Bütçe</p>
                <p className="text-3xl font-bold text-white text-shadow">
                  {statistics.totalBudgets}
                </p>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            </div>
          )}

          {/* Budget vs Actual Comparison */}
          {budgetVsActual && (
            <div className="glass-strong rounded-3xl p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white text-shadow">
                    {currentYear} Yılı Bütçe vs Gerçekleşen
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-6">
                  <p className="text-white/60 text-sm mb-2">Planlanan</p>
                  <p className="text-3xl font-bold text-white text-shadow">
                    {formatCurrency(budgetVsActual.planned)}
                  </p>
                </div>
                <div className="glass-card p-6">
                  <p className="text-white/60 text-sm mb-2">Gerçekleşen</p>
                  <p className="text-3xl font-bold text-white text-shadow">
                    {formatCurrency(budgetVsActual.actual)}
                  </p>
                </div>
                <div className={`glass-card p-6 ${
                  budgetVsActual.variance >= 0 ? 'border-red-500/30' : 'border-green-500/30'
                }`}>
                  <p className="text-white/60 text-sm mb-2">Fark</p>
                  <div className="flex items-center gap-2">
                    {budgetVsActual.variance >= 0 ? (
                      <TrendingUp className="w-5 h-5 text-red-400" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-green-400" />
                    )}
                    <p className={`text-3xl font-bold ${
                      budgetVsActual.variance >= 0 ? 'text-red-400' : 'text-green-400'
                    }`}>
                      {formatCurrency(budgetVsActual.variance)}
                    </p>
                  </div>
                  <p className="text-white/50 text-sm mt-2">
                    ({budgetVsActual.variancePercentage.toFixed(1)}%)
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Budgets List */}
          <div className="glass-strong rounded-3xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white text-shadow">
                  Bütçeler
                </h2>
              </div>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00d4ff]"></div>
              </div>
            ) : budgets && budgets.length > 0 ? (
              <div className="space-y-4">
                {budgets.map((budget: any) => (
                  <div key={budget.id} className="group glass-card p-6 relative overflow-hidden hover:glass-strong transition-all">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-xl font-bold text-white group-hover:gradient-text transition-all">
                            {getScopeLabel(budget.scope)} {budget.scopeValue && `- ${budget.scopeValue}`}
                          </h3>
                          <span className={`badge-glass ${getStatusColor(budget.status)}`}>
                            {budget.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-white/50 text-xs mb-1">Yıl</p>
                            <p className="text-white font-semibold">{budget.year}</p>
                          </div>
                          {budget.quarter && (
                            <div>
                              <p className="text-white/50 text-xs mb-1">Çeyrek</p>
                              <p className="text-white font-semibold">Q{budget.quarter}</p>
                            </div>
                          )}
                          <div>
                            <p className="text-white/50 text-xs mb-1">Planlanan</p>
                            <p className="text-white font-semibold">{formatCurrency(budget.plannedAmount)}</p>
                          </div>
                          {budget.actualAmount !== null && (
                            <div>
                              <p className="text-white/50 text-xs mb-1">Gerçekleşen</p>
                              <p className="text-white font-semibold">{formatCurrency(budget.actualAmount)}</p>
                            </div>
                          )}
                        </div>

                        {budget.variance !== null && (
                          <div className="flex items-center gap-2">
                            {budget.variance >= 0 ? (
                              <TrendingUp className="w-4 h-4 text-red-400" />
                            ) : (
                              <TrendingDown className="w-4 h-4 text-green-400" />
                            )}
                            <span className={`text-sm font-semibold ${
                              budget.variance >= 0 ? 'text-red-400' : 'text-green-400'
                            }`}>
                              Fark: {formatCurrency(budget.variance)}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          href={`/budget/${budget.id}`}
                          className="btn-glass !p-2 w-10 h-10 flex items-center justify-center"
                        >
                          <ArrowRight className="w-5 h-5 text-white/80" />
                        </Link>
                        <button
                          onClick={() => {
                            if (confirm('Bu bütçeyi silmek istediğinizden emin misiniz?')) {
                              deleteMutation.mutate(budget.id);
                            }
                          }}
                          className="btn-glass !p-2 w-10 h-10 flex items-center justify-center hover:!bg-red-500/20"
                        >
                          <X className="w-5 h-5 text-white/80" />
                        </button>
                      </div>
                    </div>

                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <DollarSign className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <p className="text-white/60 mb-4">Henüz bütçe eklenmemiş</p>
                <Link href="/budget/create" className="btn-glass inline-flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  İlk Bütçeyi Ekle
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function BudgetPage() {
  return (
    <ProtectedRoute>
      <BudgetContent />
    </ProtectedRoute>
  );
}







