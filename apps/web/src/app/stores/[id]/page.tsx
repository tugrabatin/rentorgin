/**
 * Store Detail Page
 * View and edit store details
 * 
 * Mağaza Detay Sayfası
 * Mağaza detaylarını görüntüle ve düzenle
 */

'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { ProtectedRoute } from '../../../components/protected-route';
import { StoreLeasingTasks } from '../../../components/leasing-manager/store-leasing-tasks';
import { StoreFranchiseProjects } from '../../../components/leasing-manager/store-franchise-projects';
import { Building2, Edit, Trash2, ArrowLeft, Calendar, MapPin, ClipboardList, Briefcase, Info } from 'lucide-react';
import Link from 'next/link';
import apiClient from '../../../lib/api';

function StoreDetailContent() {
  const params = useParams();
  const router = useRouter();
  const storeId = params.id as string;
  const [activeTab, setActiveTab] = useState<'info' | 'tasks' | 'projects'>('info');

  const { data: store, isLoading } = useQuery({
    queryKey: ['store', storeId],
    queryFn: async () => {
      const response = await apiClient.get(`/stores/${storeId}`);
      return response.data;
    },
  });

  const handleDelete = async () => {
    if (!confirm('Bu mağazayı silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      await apiClient.delete(`/stores/${storeId}`);
      router.push('/stores');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Silme başarısız oldu');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Mağaza bulunamadı</p>
          <Link href="/stores" className="text-primary-500 hover:underline mt-4">
            Mağazalara Dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/stores"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Mağazalara Dön
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Building2 className="w-8 h-8" />
                {store.name}
              </h1>
              <p className="text-gray-600 mt-1">{store.code}</p>
            </div>
            <div className="flex gap-3">
              <Link
                href={`/stores/${storeId}/edit`}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Düzenle
              </Link>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Sil
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="glass-card p-2 inline-flex gap-2 rounded-xl">
            <button
              onClick={() => setActiveTab('info')}
              className={`px-6 py-3 rounded-lg font-medium transition flex items-center gap-2 ${
                activeTab === 'info'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-white/50'
              }`}
            >
              <Info className="w-4 h-4" />
              Bilgiler
            </button>
            <button
              onClick={() => setActiveTab('tasks')}
              className={`px-6 py-3 rounded-lg font-medium transition flex items-center gap-2 ${
                activeTab === 'tasks'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-white/50'
              }`}
            >
              <ClipboardList className="w-4 h-4" />
              Kiralama Görevleri
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-6 py-3 rounded-lg font-medium transition flex items-center gap-2 ${
                activeTab === 'projects'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-white/50'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              Franchise Projeleri
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'info' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Details */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Mağaza Bilgileri</h2>
              <dl className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Mağaza Kodu</dt>
                  <dd className="mt-1 text-sm text-gray-900">{store.code}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Marka</dt>
                  <dd className="mt-1 text-sm text-gray-900">{store.brand || '-'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Konsept</dt>
                  <dd className="mt-1 text-sm text-gray-900">{store.concept || '-'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Alan (m²)</dt>
                  <dd className="mt-1 text-sm text-gray-900">{store.squareMeters} m²</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Durum</dt>
                  <dd className="mt-1">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      store.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                      store.status === 'PLANNING' ? 'bg-blue-100 text-blue-800' :
                      store.status === 'CLOSED' ? 'bg-gray-100 text-gray-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {store.status}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Açılış Tarihi</dt>
                  <dd className="mt-1 text-sm text-gray-900 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {store.openingDate ? new Date(store.openingDate).toLocaleDateString('tr-TR') : '-'}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Location */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Adres Bilgileri
              </h2>
              <div className="space-y-2 text-gray-700">
                <p>{store.address}</p>
                <p>{store.district && `${store.district}, `}{store.city}</p>
                <p>{store.country}</p>
              </div>
            </div>

            {/* Leases */}
            {store.leases && store.leases.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Kira Sözleşmeleri</h2>
                <div className="space-y-3">
                  {store.leases.map((lease: any) => (
                    <div key={lease.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{lease.contractNumber}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(lease.startDate).toLocaleDateString('tr-TR')} - 
                            {new Date(lease.endDate).toLocaleDateString('tr-TR')}
                          </p>
                        </div>
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          lease.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {lease.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Mall Info */}
            {store.mall && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">AVM Bilgisi</h3>
                <p className="font-medium text-gray-900">{store.mall.name}</p>
                <p className="text-sm text-gray-600 mt-1">{store.mall.type}</p>
                <Link
                  href={`/malls/${store.mall.id}`}
                  className="mt-4 inline-block text-sm text-primary-500 hover:text-primary-600"
                >
                  AVM Detayına Git →
                </Link>
              </div>
            )}

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Hızlı İstatistikler</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Aktif Kira</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {store.leases?.filter((l: any) => l.status === 'ACTIVE').length || 0}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Alan</p>
                  <p className="text-2xl font-bold text-gray-900">{store.squareMeters} m²</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        )}

        {/* Leasing Tasks Tab */}
        {activeTab === 'tasks' && (
          <div className="glass-card rounded-xl">
            <StoreLeasingTasks storeId={storeId} />
          </div>
        )}

        {/* Franchise Projects Tab */}
        {activeTab === 'projects' && (
          <div className="glass-card rounded-xl">
            <StoreFranchiseProjects storeId={storeId} />
          </div>
        )}
      </div>
    </div>
  );
}

export default function StoreDetailPage() {
  return (
    <ProtectedRoute>
      <StoreDetailContent />
    </ProtectedRoute>
  );
}


















