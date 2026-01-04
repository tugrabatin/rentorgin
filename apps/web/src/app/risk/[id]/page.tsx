/**
 * Risk Detail Page
 * Premium Glassmorphic Design
 * Risk Detay Sayfası
 */

'use client';

import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '../../../components/protected-route';
import { Navigation } from '../../../components/navigation';
import Link from 'next/link';
import { 
  AlertTriangle, 
  ArrowLeft,
  Edit,
  Shield,
  Save,
  X,
  TrendingUp
} from 'lucide-react';
import apiClient from '../../../lib/api';

function RiskDetailContent({ id }: { id: string }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    severity: '',
    title: '',
    description: '',
    potentialImpact: '',
    probability: '',
    mitigationPlan: '',
    mitigationCost: '',
    status: '',
  });

  const { data: risk, isLoading } = useQuery({
    queryKey: ['risk', id],
    queryFn: async () => {
      const response = await apiClient.get(`/risk/${id}`);
      return response.data;
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: any) => {
      await apiClient.put(`/risk/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['risk', id] });
      queryClient.invalidateQueries({ queryKey: ['risks'] });
      queryClient.invalidateQueries({ queryKey: ['risk-statistics'] });
      setIsEditing(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await apiClient.delete(`/risk/${id}`);
    },
    onSuccess: () => {
      router.push('/risk');
    },
  });

  useEffect(() => {
    if (risk && !isEditing) {
      setFormData({
        category: risk.category || '',
        severity: risk.severity || '',
        title: risk.title || '',
        description: risk.description || '',
        potentialImpact: risk.potentialImpact?.toString() || '',
        probability: risk.probability?.toString() || '',
        mitigationPlan: risk.mitigationPlan || '',
        mitigationCost: risk.mitigationCost?.toString() || '',
        status: risk.status || '',
      });
    }
  }, [risk, isEditing]);

  const handleSave = () => {
    updateMutation.mutate({
      category: formData.category,
      severity: formData.severity,
      title: formData.title,
      description: formData.description,
      potentialImpact: formData.potentialImpact ? parseFloat(formData.potentialImpact) : undefined,
      probability: formData.probability ? parseFloat(formData.probability) : undefined,
      mitigationPlan: formData.mitigationPlan,
      mitigationCost: formData.mitigationCost ? parseFloat(formData.mitigationCost) : undefined,
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00d4ff]"></div>
      </div>
    );
  }

  if (!risk) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white/60">Risk bulunamadı</p>
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
            <Link href="/risk" className="btn-glass !p-2 w-10 h-10 flex items-center justify-center">
              <ArrowLeft className="w-5 h-5 text-white/80" />
            </Link>
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-white text-shadow flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center shadow-xl">
                  <AlertTriangle className="w-7 h-7 text-white" />
                </div>
                Risk Detayı
              </h1>
              <p className="text-white/70 mt-2">{risk.title}</p>
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

          {/* Risk Details */}
          <div className="glass-strong rounded-3xl p-8 space-y-6">
            {isEditing ? (
              <>
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Risk Başlığı
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 glass rounded-xl text-white placeholder-white/40 focus-glass transition-smooth"
                  />
                </div>

                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Kategori
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 glass rounded-xl text-white focus-glass transition-smooth"
                  >
                    <option value="FINANCIAL">Finansal</option>
                    <option value="OPERATIONAL">Operasyonel</option>
                    <option value="LEGAL">Yasal</option>
                    <option value="RELATIONSHIP">İlişki</option>
                    <option value="MARKET">Pazar</option>
                    <option value="OTHER">Diğer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Önem Derecesi
                  </label>
                  <select
                    value={formData.severity}
                    onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
                    className="w-full px-4 py-3 glass rounded-xl text-white focus-glass transition-smooth"
                  >
                    <option value="LOW">Düşük</option>
                    <option value="MEDIUM">Orta</option>
                    <option value="HIGH">Yüksek</option>
                    <option value="CRITICAL">Kritik</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Açıklama
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 glass rounded-xl text-white placeholder-white/40 focus-glass transition-smooth resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Potansiyel Etki (₺)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.potentialImpact}
                      onChange={(e) => setFormData({ ...formData, potentialImpact: e.target.value })}
                      className="w-full px-4 py-3 glass rounded-xl text-white placeholder-white/40 focus-glass transition-smooth"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Olasılık (%)
                    </label>
                    <input
                      type="number"
                      value={formData.probability}
                      onChange={(e) => setFormData({ ...formData, probability: e.target.value })}
                      min="0"
                      max="100"
                      className="w-full px-4 py-3 glass rounded-xl text-white placeholder-white/40 focus-glass transition-smooth"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Azaltma Planı
                  </label>
                  <textarea
                    value={formData.mitigationPlan}
                    onChange={(e) => setFormData({ ...formData, mitigationPlan: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 glass rounded-xl text-white placeholder-white/40 focus-glass transition-smooth resize-none"
                  />
                </div>

                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Azaltma Maliyeti (₺)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.mitigationCost}
                    onChange={(e) => setFormData({ ...formData, mitigationCost: e.target.value })}
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
                    <option value="IDENTIFIED">Tespit Edildi</option>
                    <option value="ASSESSING">Değerlendiriliyor</option>
                    <option value="MITIGATING">Azaltılıyor</option>
                    <option value="MONITORING">İzleniyor</option>
                    <option value="RESOLVED">Çözüldü</option>
                    <option value="ACCEPTED">Kabul Edildi</option>
                  </select>
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <button
                    onClick={handleSave}
                    disabled={updateMutation.isPending}
                    className="btn-glass !bg-gradient-to-r from-red-500 to-pink-500 glow-primary flex items-center gap-2"
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
                    <p className="text-white/60 text-sm mb-2">Kategori</p>
                    <p className="text-xl font-bold text-white">
                      {getCategoryLabel(risk.category)}
                    </p>
                  </div>
                  <div className="glass-card p-6">
                    <p className="text-white/60 text-sm mb-2">Önem Derecesi</p>
                    <span className={`badge-glass ${getSeverityColor(risk.severity)}`}>
                      {risk.severity}
                    </span>
                  </div>
                  <div className="glass-card p-6">
                    <p className="text-white/60 text-sm mb-2">Durum</p>
                    <p className="text-xl font-bold text-white">
                      {getStatusLabel(risk.status)}
                    </p>
                  </div>
                  <div className="glass-card p-6">
                    <p className="text-white/60 text-sm mb-2">Tespit Tarihi</p>
                    <p className="text-xl font-bold text-white">
                      {new Date(risk.identifiedAt).toLocaleDateString('tr-TR')}
                    </p>
                  </div>
                </div>

                {risk.description && (
                  <div className="glass-card p-6">
                    <p className="text-white/60 text-sm mb-3">Açıklama</p>
                    <p className="text-white/80">{risk.description}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {risk.potentialImpact !== null && (
                    <div className="glass-card p-6">
                      <p className="text-white/60 text-sm mb-2">Potansiyel Etki</p>
                      <p className="text-2xl font-bold text-white text-shadow">
                        {formatCurrency(risk.potentialImpact)}
                      </p>
                    </div>
                  )}
                  {risk.probability !== null && (
                    <div className="glass-card p-6">
                      <p className="text-white/60 text-sm mb-2">Olasılık</p>
                      <p className="text-2xl font-bold text-white text-shadow">
                        {risk.probability}%
                      </p>
                    </div>
                  )}
                  {risk.mitigationCost !== null && (
                    <div className="glass-card p-6">
                      <p className="text-white/60 text-sm mb-2">Azaltma Maliyeti</p>
                      <p className="text-2xl font-bold text-white text-shadow">
                        {formatCurrency(risk.mitigationCost)}
                      </p>
                    </div>
                  )}
                </div>

                {risk.mitigationPlan && (
                  <div className="glass-card p-6">
                    <p className="text-white/60 text-sm mb-3">Azaltma Planı</p>
                    <p className="text-white/80 whitespace-pre-wrap">{risk.mitigationPlan}</p>
                  </div>
                )}

                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                  <button
                    onClick={() => {
                      if (confirm('Bu riski silmek istediğinizden emin misiniz?')) {
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

export default function RiskDetailPage({ params }: { params: { id: string } }) {
  return (
    <ProtectedRoute>
      <RiskDetailContent id={params.id} />
    </ProtectedRoute>
  );
}








