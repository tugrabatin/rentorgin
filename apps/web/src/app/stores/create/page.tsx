/**
 * Create Store Page
 * Form to create a new store
 * 
 * Mağaza Oluşturma Sayfası
 * Yeni mağaza oluşturma formu
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '../../../components/protected-route';
import { Building2, ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import apiClient from '../../../lib/api';

function CreateStoreContent() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    brand: '',
    concept: '',
    country: 'Türkiye',
    city: '',
    district: '',
    address: '',
    squareMeters: '',
    status: 'PLANNING',
    openingDate: '',
    mallId: '',
  });

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
        mallId: formData.mallId || undefined,
      };

      await apiClient.post('/stores', payload);
      router.push('/stores');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Mağaza oluşturulamadı');
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
            href="/stores"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Mağazalara Dön
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Building2 className="w-8 h-8" />
            Yeni Mağaza Ekle
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
            {/* Basic Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Temel Bilgiler</h3>
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Fashion Store İstanbul"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mağaza Kodu *
                  </label>
                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="FST-IST-001"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Fashion Brand"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Premium Fashion"
                  />
                </div>
              </div>
            </div>

            {/* Location */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Lokasyon</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ülke *
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Şehir *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="İstanbul"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    İlçe
                  </label>
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Beşiktaş"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="150.00"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adres *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="İstanbul AVM, Kat 2, No: 45"
                  />
                </div>
              </div>
            </div>

            {/* Status & Dates */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Durum & Tarihler</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Durum
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4 pt-6 border-t">
              <Link
                href="/stores"
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
                {isSubmitting ? 'Kaydediliyor...' : 'Kaydet'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function CreateStorePage() {
  return (
    <ProtectedRoute>
      <CreateStoreContent />
    </ProtectedRoute>
  );
}


















