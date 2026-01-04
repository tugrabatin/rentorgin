/**
 * Edit Store Page
 * Form to edit existing store
 * 
 * Mağaza Düzenleme Sayfası
 * Mevcut mağazayı düzenleme formu
 */

'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ProtectedRoute } from '../../../../components/protected-route';
import { Navigation } from '../../../../components/navigation';
import { Building2, ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import apiClient from '../../../../lib/api';

function EditStoreContent() {
  const params = useParams();
  const router = useRouter();
  const storeId = params.id as string;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    concept: '',
    address: '',
    district: '',
    squareMeters: '',
    status: 'ACTIVE',
    openingDate: '',
  });

  useEffect(() => {
    const loadStore = async () => {
      try {
        const response = await apiClient.get(`/stores/${storeId}`);
        const store = response.data;
        setFormData({
          name: store.name || '',
          brand: store.brand || '',
          concept: store.concept || '',
          address: store.address || '',
          district: store.district || '',
          squareMeters: store.squareMeters?.toString() || '',
          status: store.status || 'ACTIVE',
          openingDate: store.openingDate ? store.openingDate.split('T')[0] : '',
        });
      } catch (err) {
        setError('Mağaza yüklenemedi');
      } finally {
        setIsLoading(false);
      }
    };
    loadStore();
  }, [storeId]);

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
        squareMeters: parseFloat(formData.squareMeters),
        openingDate: formData.openingDate || undefined,
      };

      await apiClient.put(`/stores/${storeId}`, payload);
      router.push(`/stores/${storeId}`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Güncelleme başarısız oldu');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href={`/stores/${storeId}`}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Mağaza Detayına Dön
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Building2 className="w-8 h-8" />
            Mağaza Düzenle
          </h1>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-md p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mağaza Adı *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Marka
                </label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Konsept
                </label>
                <input
                  type="text"
                  name="concept"
                  value={formData.concept}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alan (m²) *
                </label>
                <input
                  type="number"
                  name="squareMeters"
                  value={formData.squareMeters}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Durum
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="PLANNING">Planlama</option>
                  <option value="ACTIVE">Aktif</option>
                  <option value="RENOVATION">Tadilat</option>
                  <option value="CLOSING">Kapanıyor</option>
                  <option value="CLOSED">Kapalı</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Açılış Tarihi
                </label>
                <input
                  type="date"
                  name="openingDate"
                  value={formData.openingDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adres
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4 pt-6 border-t">
              <Link
                href={`/stores/${storeId}`}
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
                {isSubmitting ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function EditStorePage() {
  return (
    <ProtectedRoute>
      <EditStoreContent />
    </ProtectedRoute>
  );
}

















