/**
 * Lease Detail Page
 * View lease contract details and initiate renewal
 * 
 * Kira Detay Sayfası
 * Kira sözleşmesi detaylarını görüntüle ve yenileme başlat
 */

'use client';

import { useQuery, useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { ProtectedRoute } from '../../../components/protected-route';
import { FileText, ArrowLeft, Calendar, DollarSign, RefreshCw, Building2, MapPin } from 'lucide-react';
import Link from 'next/link';
import apiClient from '../../../lib/api';

function LeaseDetailContent() {
  const params = useParams();
  const leaseId = params.id as string;

  const { data: lease, isLoading, refetch } = useQuery({
    queryKey: ['lease', leaseId],
    queryFn: async () => {
      const response = await apiClient.get(`/leases/${leaseId}`);
      return response.data;
    },
  });

  const { data: currentRent } = useQuery({
    queryKey: ['lease', leaseId, 'current-rent'],
    queryFn: async () => {
      const response = await apiClient.get(`/leases/${leaseId}/current-rent`);
      return response.data;
    },
    enabled: !!lease,
  });

  const renewMutation = useMutation({
    mutationFn: async () => {
      const response = await apiClient.post(`/leases/${leaseId}/renew`);
      return response.data;
    },
    onSuccess: () => {
      alert('Yenileme talebi oluşturuldu!');
      refetch();
    },
    onError: (err: any) => {
      alert(err.response?.data?.message || 'Yenileme başlatılamadı');
    },
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: lease?.currency || 'TRY',
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!lease) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Sözleşme bulunamadı</p>
      </div>
    );
  }

  const daysRemaining = lease.daysRemaining || 0;
  const isExpiringSoon = daysRemaining <= 90 && daysRemaining > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/leases"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Sözleşmelere Dön
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <FileText className="w-8 h-8" />
                {lease.contractNumber}
              </h1>
              <p className="text-gray-600 mt-1">
                Versiyon {lease.version}
              </p>
            </div>
            
            {isExpiringSoon && (
              <button
                onClick={() => renewMutation.mutate()}
                disabled={renewMutation.isPending}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Yenileme Başlat
              </button>
            )}
          </div>
        </div>

        {/* Alert if expiring soon */}
        {isExpiringSoon && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="font-medium text-yellow-900">
              ⚠️ Bu sözleşmenin süresi {daysRemaining} gün içinde dolacak!
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contract Basics */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Sözleşme Bilgileri</h2>
              <dl className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Sözleşme No</dt>
                  <dd className="mt-1 text-sm text-gray-900">{lease.contractNumber}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Durum</dt>
                  <dd className="mt-1">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      lease.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                      lease.status === 'EXPIRING_SOON' ? 'bg-yellow-100 text-yellow-800' :
                      lease.status === 'EXPIRED' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {lease.status}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Başlangıç Tarihi</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {new Date(lease.startDate).toLocaleDateString('tr-TR', { 
                      year: 'numeric', month: 'long', day: 'numeric' 
                    })}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Bitiş Tarihi</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {new Date(lease.endDate).toLocaleDateString('tr-TR', { 
                      year: 'numeric', month: 'long', day: 'numeric' 
                    })}
                  </dd>
                </div>
                {lease.signedDate && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">İmza Tarihi</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {new Date(lease.signedDate).toLocaleDateString('tr-TR')}
                    </dd>
                  </div>
                )}
                <div>
                  <dt className="text-sm font-medium text-gray-500">Kalan Gün</dt>
                  <dd className="mt-1 text-sm font-bold text-gray-900">
                    {daysRemaining > 0 ? `${daysRemaining} gün` : 'Süresi dolmuş'}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Financial Terms */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Finansal Şartlar</h2>
              <dl className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Başlangıç Kirası</dt>
                  <dd className="mt-1 text-lg font-bold text-gray-900">
                    {formatCurrency(lease.monthlyRent)}
                  </dd>
                </div>
                {currentRent && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Mevcut Kira</dt>
                    <dd className="mt-1 text-lg font-bold text-primary-600">
                      {formatCurrency(currentRent.currentRent)}
                    </dd>
                  </div>
                )}
                <div>
                  <dt className="text-sm font-medium text-gray-500">Artış Tipi</dt>
                  <dd className="mt-1 text-sm text-gray-900">{lease.escalationType}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Artış Oranı</dt>
                  <dd className="mt-1 text-sm text-gray-900">{lease.escalationRate}%</dd>
                </div>
                {lease.commonAreaCharges && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">OAG</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {formatCurrency(lease.commonAreaCharges)}
                    </dd>
                  </div>
                )}
                {lease.securityDeposit && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Depozito</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {formatCurrency(lease.securityDeposit)}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Renewal History */}
            {lease.renewals && lease.renewals.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Yenileme Geçmişi</h2>
                <div className="space-y-3">
                  {lease.renewals.map((renewal: any) => (
                    <div key={renewal.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">
                            {new Date(renewal.createdAt).toLocaleDateString('tr-TR')}
                          </p>
                          {renewal.notes && (
                            <p className="text-sm text-gray-600 mt-1">{renewal.notes}</p>
                          )}
                        </div>
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          renewal.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                          renewal.status === 'IN_NEGOTIATION' ? 'bg-blue-100 text-blue-800' :
                          renewal.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {renewal.status}
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
            {/* Store Info */}
            {lease.store && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Mağaza
                </h3>
                <p className="font-medium text-gray-900">{lease.store.name}</p>
                <p className="text-sm text-gray-600 mt-1">{lease.store.code}</p>
                <p className="text-sm text-gray-600 mt-2">
                  {lease.store.squareMeters} m²
                </p>
                <Link
                  href={`/stores/${lease.store.id}`}
                  className="mt-4 inline-block text-sm text-primary-500 hover:text-primary-600"
                >
                  Mağaza Detayına Git →
                </Link>
              </div>
            )}

            {/* Mall Info */}
            {lease.mall && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  AVM
                </h3>
                <p className="font-medium text-gray-900">{lease.mall.name}</p>
                <p className="text-sm text-gray-600 mt-1">{lease.mall.type}</p>
                <p className="text-sm text-gray-600 mt-2">
                  {lease.mall.city}, {lease.mall.country}
                </p>
                <Link
                  href={`/malls/${lease.mall.id}`}
                  className="mt-4 inline-block text-sm text-primary-500 hover:text-primary-600"
                >
                  AVM Detayına Git →
                </Link>
              </div>
            )}

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Özet</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Süre</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.ceil((new Date(lease.endDate).getTime() - new Date(lease.startDate).getTime()) / (1000 * 60 * 60 * 24 * 365))} yıl
                  </p>
                </div>
                {currentRent && (
                  <div>
                    <p className="text-sm text-gray-600">Toplam Artış</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {((currentRent.currentRent - lease.monthlyRent) / lease.monthlyRent * 100).toFixed(1)}%
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-600">Yenileme Opsiyonu</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {lease.renewalOptionMonths ? `${lease.renewalOptionMonths} ay` : '-'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LeaseDetailPage() {
  return (
    <ProtectedRoute>
      <LeaseDetailContent />
    </ProtectedRoute>
  );
}
















