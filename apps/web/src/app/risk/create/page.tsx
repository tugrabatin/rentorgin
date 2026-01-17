/**
 * Create Risk Page
 * Premium Glassmorphic Design
 * Risk Oluşturma Sayfası
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '../../../components/protected-route';
import { Navigation } from '../../../components/navigation';
import Link from 'next/link';
import { 
  AlertTriangle, 
  ArrowLeft,
  Save
} from 'lucide-react';
import apiClient from '../../../lib/api';

function CreateRiskContent() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    category: 'FINANCIAL',
    severity: 'MEDIUM',
    title: '',
    description: '',
    potentialImpact: '',
    probability: '',
    mitigationPlan: '',
    mitigationCost: '',
    status: 'IDENTIFIED',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        ...formData,
        potentialImpact: formData.potentialImpact ? parseFloat(formData.potentialImpact) : undefined,
        probability: formData.probability ? parseFloat(formData.probability) : undefined,
        mitigationCost: formData.mitigationCost ? parseFloat(formData.mitigationCost) : undefined,
      };

      await apiClient.post('/risk', payload);
      router.push('/risk');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Risk oluşturulamadı');
    } finally {
      setLoading(false);
    }
  };

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
            <div>
              <h1 className="text-4xl font-bold text-white text-shadow flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center shadow-xl">
                  <AlertTriangle className="w-7 h-7 text-white" />
                </div>
                Yeni Risk Ekle
              </h1>
              <p className="text-white/70 mt-2">Risk bilgilerini girin</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="glass-strong rounded-3xl p-8 space-y-6">
            {error && (
              <div className="glass-card p-4 border-l-4 border-red-500/50">
                <p className="text-red-400">{error}</p>
              </div>
            )}

            {/* Title */}
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Risk Başlığı <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Örn: Kira artış riski"
                required
                className="w-full px-4 py-3 glass rounded-xl text-white placeholder-white/40 focus-glass transition-smooth"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Kategori <span className="text-red-400">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
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

            {/* Severity */}
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Önem Derecesi <span className="text-red-400">*</span>
              </label>
              <select
                value={formData.severity}
                onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
                required
                className="w-full px-4 py-3 glass rounded-xl text-white focus-glass transition-smooth"
              >
                <option value="LOW">Düşük</option>
                <option value="MEDIUM">Orta</option>
                <option value="HIGH">Yüksek</option>
                <option value="CRITICAL">Kritik</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Açıklama
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                placeholder="Risk hakkında detaylı açıklama..."
                className="w-full px-4 py-3 glass rounded-xl text-white placeholder-white/40 focus-glass transition-smooth resize-none"
              />
            </div>

            {/* Potential Impact */}
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Potansiyel Etki (₺)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.potentialImpact}
                onChange={(e) => setFormData({ ...formData, potentialImpact: e.target.value })}
                placeholder="0.00"
                min="0"
                className="w-full px-4 py-3 glass rounded-xl text-white placeholder-white/40 focus-glass transition-smooth"
              />
            </div>

            {/* Probability */}
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Olasılık (%)
              </label>
              <input
                type="number"
                value={formData.probability}
                onChange={(e) => setFormData({ ...formData, probability: e.target.value })}
                placeholder="0-100"
                min="0"
                max="100"
                className="w-full px-4 py-3 glass rounded-xl text-white placeholder-white/40 focus-glass transition-smooth"
              />
            </div>

            {/* Mitigation Plan */}
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Azaltma Planı
              </label>
              <textarea
                value={formData.mitigationPlan}
                onChange={(e) => setFormData({ ...formData, mitigationPlan: e.target.value })}
                rows={4}
                placeholder="Risk azaltma için alınacak önlemler..."
                className="w-full px-4 py-3 glass rounded-xl text-white placeholder-white/40 focus-glass transition-smooth resize-none"
              />
            </div>

            {/* Mitigation Cost */}
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Azaltma Maliyeti (₺)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.mitigationCost}
                onChange={(e) => setFormData({ ...formData, mitigationCost: e.target.value })}
                placeholder="0.00"
                min="0"
                className="w-full px-4 py-3 glass rounded-xl text-white placeholder-white/40 focus-glass transition-smooth"
              />
            </div>

            {/* Status */}
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
              </select>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="btn-glass !bg-gradient-to-r from-red-500 to-pink-500 glow-primary flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                {loading ? 'Oluşturuluyor...' : 'Risk Oluştur'}
              </button>
              <Link href="/risk" className="btn-glass">
                İptal
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default function CreateRiskPage() {
  return (
    <ProtectedRoute>
      <CreateRiskContent />
    </ProtectedRoute>
  );
}









