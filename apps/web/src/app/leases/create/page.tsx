/**
 * Create Lease Page
 * Multi-step form to create a new lease contract
 * 
 * Kira Oluşturma Sayfası
 * Yeni kira sözleşmesi oluşturmak için çok adımlı form
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '../../../components/protected-route';
import { FileText, ArrowLeft, Save, Building2 } from 'lucide-react';
import Link from 'next/link';
import apiClient from '../../../lib/api';

function CreateLeaseContent() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [stores, setStores] = useState<any[]>([]);
  const [malls, setMalls] = useState<any[]>([]);
  
  const [formData, setFormData] = useState({
    storeId: '',
    mallId: '',
    contractNumber: '',
    startDate: '',
    endDate: '',
    signedDate: '',
    monthlyRent: '',
    currency: 'TRY',
    escalationType: 'FIXED_PERCENTAGE',
    escalationRate: '15',
    escalationIndex: '',
    renewalOptionMonths: '60',
    renewalNoticeMonths: '6',
    commonAreaCharges: '',
    securityDeposit: '',
    fitOutPeriodDays: '',
  });

  // Load stores and malls
  useEffect(() => {
    const loadData = async () => {
      try {
        const [storesRes, mallsRes] = await Promise.all([
          apiClient.get('/stores'),
          apiClient.get('/malls'),
        ]);
        setStores(storesRes.data);
        setMalls(mallsRes.data);
      } catch (err) {
        console.error('Failed to load data:', err);
      }
    };
    loadData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        monthlyRent: parseFloat(formData.monthlyRent),
        escalationRate: parseFloat(formData.escalationRate),
        renewalOptionMonths: formData.renewalOptionMonths ? parseInt(formData.renewalOptionMonths) : undefined,
        renewalNoticeMonths: formData.renewalNoticeMonths ? parseInt(formData.renewalNoticeMonths) : undefined,
        commonAreaCharges: formData.commonAreaCharges ? parseFloat(formData.commonAreaCharges) : undefined,
        securityDeposit: formData.securityDeposit ? parseFloat(formData.securityDeposit) : undefined,
        fitOutPeriodDays: formData.fitOutPeriodDays ? parseInt(formData.fitOutPeriodDays) : undefined,
        mallId: formData.mallId || undefined,
        signedDate: formData.signedDate || undefined,
        escalationIndex: formData.escalationIndex || undefined,
      };

      await apiClient.post('/leases', payload);
      router.push('/leases');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Sözleşme oluşturulamadı');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/leases"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Sözleşmelere Dön
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FileText className="w-8 h-8" />
            Yeni Kira Sözleşmesi
          </h1>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-md p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Store & Mall Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Mağaza Seçimi</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mağaza *
                  </label>
                  <select
                    name="storeId"
                    value={formData.storeId}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Mağaza seçin...</option>
                    {stores.map((store) => (
                      <option key={store.id} value={store.id}>
                        {store.name} ({store.code})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    AVM
                  </label>
                  <select
                    name="mallId"
                    value={formData.mallId}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">AVM seçin (opsiyonel)</option>
                    {malls.map((mall) => (
                      <option key={mall.id} value={mall.id}>
                        {mall.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Contract Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sözleşme Bilgileri</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sözleşme Numarası *
                  </label>
                  <input
                    type="text"
                    name="contractNumber"
                    value={formData.contractNumber}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="CNT-2024-001"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Başlangıç Tarihi *
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bitiş Tarihi *
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    İmza Tarihi
                  </label>
                  <input
                    type="date"
                    name="signedDate"
                    value={formData.signedDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>

            {/* Financial Terms */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Finansal Şartlar</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Aylık Kira *
                  </label>
                  <input
                    type="number"
                    name="monthlyRent"
                    value={formData.monthlyRent}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="50000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Para Birimi
                  </label>
                  <select
                    name="currency"
                    value={formData.currency}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="TRY">TRY (₺)</option>
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Artış Tipi *
                  </label>
                  <select
                    name="escalationType"
                    value={formData.escalationType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="NONE">Artış Yok</option>
                    <option value="FIXED_PERCENTAGE">Sabit Yüzde</option>
                    <option value="INDEX_BASED">Endeks Bazlı</option>
                    <option value="REVENUE_BASED">Ciro Bazlı</option>
                    <option value="CUSTOM">Özel</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Artış Oranı (%)
                  </label>
                  <input
                    type="number"
                    name="escalationRate"
                    value={formData.escalationRate}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    step="0.1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="15"
                  />
                </div>

                {formData.escalationType === 'INDEX_BASED' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Endeks (TÜFE, ÜFE vb.)
                    </label>
                    <input
                      type="text"
                      name="escalationIndex"
                      value={formData.escalationIndex}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="TÜFE"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ortak Alan Giderleri (OAG)
                  </label>
                  <input
                    type="number"
                    name="commonAreaCharges"
                    value={formData.commonAreaCharges}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="8000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Depozito
                  </label>
                  <input
                    type="number"
                    name="securityDeposit"
                    value={formData.securityDeposit}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="150000"
                  />
                </div>
              </div>
            </div>

            {/* Renewal Options */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Yenileme Seçenekleri</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Yenileme Opsiyonu (Ay)
                  </label>
                  <input
                    type="number"
                    name="renewalOptionMonths"
                    value={formData.renewalOptionMonths}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="60"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bildirim Süresi (Ay)
                  </label>
                  <input
                    type="number"
                    name="renewalNoticeMonths"
                    value={formData.renewalNoticeMonths}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="6"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tadilat Süresi (Gün)
                  </label>
                  <input
                    type="number"
                    name="fitOutPeriodDays"
                    value={formData.fitOutPeriodDays}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="30"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4 pt-6 border-t">
              <Link
                href="/leases"
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                İptal
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition disabled:opacity-50 flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                {isSubmitting ? 'Kaydediliyor...' : 'Sözleşmeyi Kaydet'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function CreateLeasePage() {
  return (
    <ProtectedRoute>
      <CreateLeaseContent />
    </ProtectedRoute>
  );
}


















