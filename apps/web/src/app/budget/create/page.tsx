/**
 * Create Budget Page
 * Premium Glassmorphic Design
 * Bütçe Oluşturma Sayfası
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '../../../components/protected-route';
import { Navigation } from '../../../components/navigation';
import Link from 'next/link';
import { 
  DollarSign, 
  ArrowLeft,
  Save,
  Calendar,
  Target
} from 'lucide-react';
import apiClient from '../../../lib/api';

function CreateBudgetContent() {
  const router = useRouter();
  const currentYear = new Date().getFullYear();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    year: currentYear,
    quarter: '',
    scope: 'COMPANY',
    scopeValue: '',
    plannedAmount: '',
    status: 'DRAFT',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        ...formData,
        quarter: formData.quarter ? parseInt(formData.quarter) : undefined,
        plannedAmount: parseFloat(formData.plannedAmount),
      };

      await apiClient.post('/budget', payload);
      router.push('/budget');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Bütçe oluşturulamadı');
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
            <Link href="/budget" className="btn-glass !p-2 w-10 h-10 flex items-center justify-center">
              <ArrowLeft className="w-5 h-5 text-white/80" />
            </Link>
            <div>
              <h1 className="text-4xl font-bold text-white text-shadow flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-xl">
                  <DollarSign className="w-7 h-7 text-white" />
                </div>
                Yeni Bütçe Oluştur
              </h1>
              <p className="text-white/70 mt-2">Planlanan bütçe bilgilerini girin</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="glass-strong rounded-3xl p-8 space-y-6">
            {error && (
              <div className="glass-card p-4 border-l-4 border-red-500/50">
                <p className="text-red-400">{error}</p>
              </div>
            )}

            {/* Year */}
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Yıl <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                min={2020}
                max={2030}
                required
                className="w-full px-4 py-3 glass rounded-xl text-white placeholder-white/40 focus-glass transition-smooth"
              />
            </div>

            {/* Quarter */}
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Çeyrek (Opsiyonel)
              </label>
              <select
                value={formData.quarter}
                onChange={(e) => setFormData({ ...formData, quarter: e.target.value })}
                className="w-full px-4 py-3 glass rounded-xl text-white focus-glass transition-smooth"
              >
                <option value="">Yıllık Bütçe</option>
                <option value="1">Q1 (Ocak-Mart)</option>
                <option value="2">Q2 (Nisan-Haziran)</option>
                <option value="3">Q3 (Temmuz-Eylül)</option>
                <option value="4">Q4 (Ekim-Aralık)</option>
              </select>
            </div>

            {/* Scope */}
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Kapsam <span className="text-red-400">*</span>
              </label>
              <select
                value={formData.scope}
                onChange={(e) => setFormData({ ...formData, scope: e.target.value, scopeValue: '' })}
                required
                className="w-full px-4 py-3 glass rounded-xl text-white focus-glass transition-smooth"
              >
                <option value="COMPANY">Şirket</option>
                <option value="COUNTRY">Ülke</option>
                <option value="CITY">Şehir</option>
                <option value="BRAND">Marka</option>
                <option value="MALL_TYPE">AVM Tipi</option>
              </select>
            </div>

            {/* Scope Value */}
            {(formData.scope === 'CITY' || formData.scope === 'BRAND' || formData.scope === 'MALL_TYPE') && (
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  {formData.scope === 'CITY' ? 'Şehir' : formData.scope === 'BRAND' ? 'Marka' : 'AVM Tipi'}
                </label>
                <input
                  type="text"
                  value={formData.scopeValue}
                  onChange={(e) => setFormData({ ...formData, scopeValue: e.target.value })}
                  placeholder={formData.scope === 'CITY' ? 'Örn: İstanbul' : formData.scope === 'BRAND' ? 'Örn: Fashion Brand' : 'Örn: Shopping Mall'}
                  className="w-full px-4 py-3 glass rounded-xl text-white placeholder-white/40 focus-glass transition-smooth"
                />
              </div>
            )}

            {/* Planned Amount */}
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Planlanan Tutar (₺) <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.plannedAmount}
                onChange={(e) => setFormData({ ...formData, plannedAmount: e.target.value })}
                placeholder="0.00"
                required
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
                <option value="DRAFT">Taslak</option>
                <option value="APPROVED">Onaylandı</option>
                <option value="ACTIVE">Aktif</option>
                <option value="CLOSED">Kapatıldı</option>
              </select>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="btn-glass !bg-gradient-to-r from-green-500 to-emerald-500 glow-primary flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                {loading ? 'Oluşturuluyor...' : 'Bütçe Oluştur'}
              </button>
              <Link href="/budget" className="btn-glass">
                İptal
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default function CreateBudgetPage() {
  return (
    <ProtectedRoute>
      <CreateBudgetContent />
    </ProtectedRoute>
  );
}








