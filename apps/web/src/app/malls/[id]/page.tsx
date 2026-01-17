/**
 * Mall Detail Page
 * View mall details and related stores
 * 
 * AVM Detay Sayfası
 * AVM detaylarını ve ilgili mağazaları görüntüle
 */

'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { ProtectedRoute } from '../../../components/protected-route';
import { Navigation } from '../../../components/navigation';
import { ShoppingBag, ArrowLeft, MapPin, Building2, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import apiClient from '../../../lib/api';

function MallDetailContent() {
  const params = useParams();
  const mallId = params.id as string;

  const { data: mall, isLoading } = useQuery({
    queryKey: ['mall', mallId],
    queryFn: async () => {
      const response = await apiClient.get(`/malls/${mallId}`);
      return response.data;
    },
  });

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

  if (!mall) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-600">AVM bulunamadı</p>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/malls"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            AVM'lere Dön
          </Link>
          
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <ShoppingBag className="w-8 h-8" />
            {mall.name}
          </h1>
          <p className="text-gray-600 mt-1">{mall.type}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">AVM Bilgileri</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Adres</p>
                    <p className="text-gray-900">{mall.address}</p>
                    <p className="text-gray-900">{mall.district && `${mall.district}, `}{mall.city}</p>
                    <p className="text-gray-900">{mall.country}</p>
                  </div>
                </div>

                {mall.managementCompany && (
                  <div>
                    <p className="text-sm text-gray-500">Yönetim Şirketi</p>
                    <p className="text-gray-900">{mall.managementCompany}</p>
                  </div>
                )}

                <div>
                  <p className="text-sm text-gray-500">İlişki Kalitesi</p>
                  <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                    mall.relationshipQuality === 'EXCELLENT' ? 'bg-green-100 text-green-800' :
                    mall.relationshipQuality === 'GOOD' ? 'bg-blue-100 text-blue-800' :
                    mall.relationshipQuality === 'FAIR' ? 'bg-yellow-100 text-yellow-800' :
                    mall.relationshipQuality === 'POOR' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {mall.relationshipQuality}
                  </span>
                </div>
              </div>
            </div>

            {/* Contacts */}
            {mall.contacts && mall.contacts.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">İletişim Kişileri</h2>
                <div className="space-y-4">
                  {mall.contacts.map((contact: any) => (
                    <div key={contact.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{contact.name}</p>
                          {contact.title && (
                            <p className="text-sm text-gray-600">{contact.title}</p>
                          )}
                        </div>
                        {contact.isPrimary && (
                          <span className="px-2 py-1 text-xs font-semibold bg-primary-100 text-primary-800 rounded">
                            Birincil
                          </span>
                        )}
                      </div>
                      <div className="mt-3 space-y-1">
                        {contact.email && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Mail className="w-4 h-4" />
                            <a href={`mailto:${contact.email}`} className="hover:text-primary-600">
                              {contact.email}
                            </a>
                          </div>
                        )}
                        {contact.phone && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone className="w-4 h-4" />
                            <a href={`tel:${contact.phone}`} className="hover:text-primary-600">
                              {contact.phone}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Stores in this Mall */}
            {mall.stores && mall.stores.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Mağazalarımız ({mall.stores.length})
                </h2>
                <div className="space-y-3">
                  {mall.stores.map((store: any) => (
                    <Link
                      key={store.id}
                      href={`/stores/${store.id}`}
                      className="block p-4 border border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{store.name}</p>
                          <p className="text-sm text-gray-600">{store.code}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          store.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {store.status}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">İstatistikler</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Toplam Mağaza</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {mall.stores?.length || 0}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Aktif Sözleşme</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {mall.leases?.filter((l: any) => l.status === 'ACTIVE').length || 0}
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

export default function MallDetailPage() {
  return (
    <ProtectedRoute>
      <MallDetailContent />
    </ProtectedRoute>
  );
}


















