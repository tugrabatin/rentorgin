'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import apiClient from '../../../lib/api';

interface Expense {
  id: string;
  type: string;
  category?: string;
  description?: string;
  amount: number;
  currency: string;
  dueDate: string;
  paidDate?: string;
  status: string;
  invoiceNumber?: string;
  invoiceUrl?: string;
  isDisputed: boolean;
  disputeReason?: string;
  store: {
    id: string;
    name: string;
    code: string;
    city: string;
    brand?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export default function ExpenseDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [expense, setExpense] = useState<Expense | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      fetchExpense();
    }
  }, [id]);

  const fetchExpense = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(`/expenses/${id}`);
      setExpense(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Gider yüklenemedi');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkPaid = async () => {
    try {
      await apiClient.put(`/expenses/${id}/mark-paid`);
      fetchExpense();
    } catch (err: any) {
      alert(err.response?.data?.message || 'İşlem başarısız');
    }
  };

  const handleDelete = async () => {
    if (!confirm('Bu gideri silmek istediğinizden emin misiniz?')) return;

    try {
      await apiClient.delete(`/expenses/${id}`);
      router.push('/expenses');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Silme işlemi başarısız');
    }
  };

  const formatCurrency = (amount: number, currency: string = 'TRY') => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PAID':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'OVERDUE':
        return 'bg-red-100 text-red-800';
      case 'CANCELLED':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Gider yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error || !expense) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Gider bulunamadı'}</p>
          <Link href="/expenses" className="text-blue-600 hover:text-blue-800">
            ← Geri Dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/expenses" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
            ← Tüm Giderler
          </Link>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gider Detayı</h1>
              <p className="mt-2 text-gray-600">#{expense.invoiceNumber || expense.id.slice(0, 8)}</p>
            </div>
            <span
              className={`px-4 py-2 text-sm font-semibold rounded-full ${getStatusColor(
                expense.status
              )}`}
            >
              {expense.status}
            </span>
          </div>
        </div>

        {/* Main Info Card */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Mağaza</h3>
                <p className="text-lg font-semibold text-gray-900">{expense.store.name}</p>
                <p className="text-sm text-gray-600">
                  {expense.store.code} • {expense.store.city}
                </p>
                {expense.store.brand && (
                  <p className="text-sm text-gray-600">Marka: {expense.store.brand}</p>
                )}
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Gider Tipi</h3>
                <p className="text-lg text-gray-900">{expense.type}</p>
                {expense.category && (
                  <p className="text-sm text-gray-600">Kategori: {expense.category}</p>
                )}
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Açıklama</h3>
                <p className="text-gray-900">{expense.description || 'Açıklama yok'}</p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Tutar</h3>
                <p className="text-3xl font-bold text-gray-900">
                  {formatCurrency(expense.amount, expense.currency)}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Vade Tarihi</h3>
                <p className="text-lg text-gray-900">{formatDate(expense.dueDate)}</p>
              </div>

              {expense.paidDate && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Ödeme Tarihi</h3>
                  <p className="text-lg text-green-600">{formatDate(expense.paidDate)}</p>
                </div>
              )}

              {expense.invoiceNumber && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Fatura No</h3>
                  <p className="text-lg text-gray-900">{expense.invoiceNumber}</p>
                </div>
              )}
            </div>
          </div>

          {/* Dispute Info */}
          {expense.isDisputed && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <h4 className="text-sm font-semibold text-red-900 mb-2">⚠️ İtiraz Var</h4>
              {expense.disputeReason && (
                <p className="text-sm text-red-700">{expense.disputeReason}</p>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">İşlemler</h3>
          <div className="flex flex-wrap gap-4">
            {expense.status === 'PENDING' && (
              <button
                onClick={handleMarkPaid}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                ✓ Ödendi Olarak İşaretle
              </button>
            )}

            <Link
              href={`/expenses/${expense.id}/edit`}
              className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Düzenle
            </Link>

            <button
              onClick={handleDelete}
              className="px-6 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
            >
              Sil
            </button>

            {expense.invoiceUrl && (
              <a
                href={expense.invoiceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                📄 Faturayı Görüntüle
              </a>
            )}
          </div>
        </div>

        {/* Metadata */}
        <div className="mt-6 bg-gray-100 rounded-lg p-4 text-sm text-gray-600">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-medium">Oluşturulma:</span> {formatDate(expense.createdAt)}
            </div>
            <div>
              <span className="font-medium">Son Güncelleme:</span> {formatDate(expense.updatedAt)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}







