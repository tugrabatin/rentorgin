/**
 * Budget Detail Page
 * Premium Glassmorphic Design
 * Bütçe Detay Sayfası
 */

'use client';

import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '../../../components/protected-route';
import { Navigation } from '../../../components/navigation';
import Link from 'next/link';
import { 
  DollarSign, 
  ArrowLeft,
  Edit,
  TrendingUp,
  TrendingDown,
  Calendar,
  Target,
  Save,
  X
} from 'lucide-react';
import apiClient from '../../../lib/api';

function BudgetDetailContent({ id }: { id: string }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    plannedAmount: '',
    actualAmount: '',
    status: '',
  });

  const { data: budget, isLoading } = useQuery({
    queryKey: ['budget', id],
    queryFn: async () => {
      const response = await apiClient.get(`/budget/${id}`);
      return response.data;
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: any) => {
      await apiClient.put(`/budget/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budget', id] });
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
      setIsEditing(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await apiClient.delete(`/budget/${id}`);
    },
    onSuccess: () => {
      router.push('/budget');
    },
  });

  useEffect(() => {
    if (budget && !isEditing) {
      setFormData({
        plannedAmount: budget.plannedAmount?.toString() || '',
        actualAmount: budget.actualAmount?.toString() || '',
        status: budget.status || '',
      });
    }
  }, [budget, isEditing]);

  const handleSave = () => {
    updateMutation.mutate({
      plannedAmount: formData.plannedAmount ? parseFloat(formData.plannedAmount) : undefined,
      actualAmount: formData.actualAmount ? parseFloat(formData.actualAmount) : undefined,
      status: formData.status,
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', { 
      style: 'currency', 
      currency: 'TRY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00d4ff]"></div>
      </div>
    );
  }

  if (!budget) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white/60">Bütçe bulunamadı</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <Navigation />
      
      <main className="md:ml-64 pt-16 p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="flex items-center gap-4">
            <Link href="/budget" className="btn-glass !p-2 w-10 h-10 flex items-center justify-center">
              <ArrowLeft className="w-5 h-5 text-white/80" />
            </Link>
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-white text-shadow flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-xl">
                  <DollarSign className="w-7 h-7 text-white" />
                </div>
                Bütçe Detayı
              </h1>
              <p className="text-white/70 mt-2">
                {getScopeLabel(budget.scope)} {budget.scopeValue && `- ${budget.scopeValue}`}
              </p>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="btn-glass flex items-center gap-2"
              >
                <Edit className="w-5 h-5" />
                Düzenle
              </button>
            )}
          </div>

          {/* Budget Details */}
          <div className="glass-strong rounded-3xl p-8 space-y-6">
            {isEditing ? (
              <>
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Planlanan Tutar (₺)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.plannedAmount}
                    onChange={(e) => setFormData({ ...formData, plannedAmount: e.target.value })}
                    className="w-full px-4 py-3 glass rounded-xl text-white placeholder-white/40 focus-glass transition-smooth"
                  />
                </div>

                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Gerçekleşen Tutar (₺)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.actualAmount}
                    onChange={(e) => setFormData({ ...formData, actualAmount: e.target.value })}
                    className="w-full px-4 py-3 glass rounded-xl text-white placeholder-white/40 focus-glass transition-smooth"
                  />
                </div>

                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Durum
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-3 glass rounded-xl text-white focus-glass transition-smooth"
                  >
                    <option value="DRAFT">Taslak</option>
                    <option value="APPROVED">Onaylandı</option>
                    <option value="ACTIVE">Aktif</option>
                    <option value="CLOSED">Kapatıldı</option>
                  </select>
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <button
                    onClick={handleSave}
                    disabled={updateMutation.isPending}
                    className="btn-glass !bg-gradient-to-r from-green-500 to-emerald-500 glow-primary flex items-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    {updateMutation.isPending ? 'Kaydediliyor...' : 'Kaydet'}
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="btn-glass"
                  >
                    İptal
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="glass-card p-6">
                    <p className="text-white/60 text-sm mb-2">Yıl</p>
                    <p className="text-2xl font-bold text-white">{budget.year}</p>
                  </div>
                  {budget.quarter && (
                    <div className="glass-card p-6">
                      <p className="text-white/60 text-sm mb-2">Çeyrek</p>
                      <p className="text-2xl font-bold text-white">Q{budget.quarter}</p>
                    </div>
                  )}
                  <div className="glass-card p-6">
                    <p className="text-white/60 text-sm mb-2">Kapsam</p>
                    <p className="text-xl font-bold text-white">
                      {getScopeLabel(budget.scope)}
                    </p>
                    {budget.scopeValue && (
                      <p className="text-white/60 text-sm mt-1">{budget.scopeValue}</p>
                    )}
                  </div>
                  <div className="glass-card p-6">
                    <p className="text-white/60 text-sm mb-2">Durum</p>
                    <p className="text-xl font-bold text-white">{budget.status}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                  <div className="glass-card p-6">
                    <p className="text-white/60 text-sm mb-2">Planlanan</p>
                    <p className="text-3xl font-bold text-white text-shadow">
                      {formatCurrency(budget.plannedAmount)}
                    </p>
                  </div>
                  {budget.actualAmount !== null && (
                    <div className="glass-card p-6">
                      <p className="text-white/60 text-sm mb-2">Gerçekleşen</p>
                      <p className="text-3xl font-bold text-white text-shadow">
                        {formatCurrency(budget.actualAmount)}
                      </p>
                    </div>
                  )}
                  {budget.variance !== null && (
                    <div className={`glass-card p-6 ${
                      budget.variance >= 0 ? 'border-red-500/30' : 'border-green-500/30'
                    }`}>
                      <p className="text-white/60 text-sm mb-2">Fark</p>
                      <div className="flex items-center gap-2">
                        {budget.variance >= 0 ? (
                          <TrendingUp className="w-5 h-5 text-red-400" />
                        ) : (
                          <TrendingDown className="w-5 h-5 text-green-400" />
                        )}
                        <p className={`text-3xl font-bold ${
                          budget.variance >= 0 ? 'text-red-400' : 'text-green-400'
                        }`}>
                          {formatCurrency(budget.variance)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                  <button
                    onClick={() => {
                      if (confirm('Bu bütçeyi silmek istediğinizden emin misiniz?')) {
                        deleteMutation.mutate();
                      }
                    }}
                    className="btn-glass hover:!bg-red-500/20 flex items-center gap-2"
                  >
                    <X className="w-5 h-5" />
                    Sil
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function BudgetDetailPage({ params }: { params: { id: string } }) {
  return (
    <ProtectedRoute>
      <BudgetDetailContent id={params.id} />
    </ProtectedRoute>
  );
}








