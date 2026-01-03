/**
 * Expense Detail Page
 * Individual expense detail view
 * 
 * Gider Detay Sayfası
 * Tekil gider detay görünümü
 */

'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { ProtectedRoute } from '../../../components/protected-route';
import { Navigation } from '../../../components/navigation';
import Link from 'next/link';
import { ArrowLeft, DollarSign, Calendar, FileText, Building2, CheckCircle, AlertCircle } from 'lucide-react';
import apiClient from '../../../lib/api';

function ExpenseDetailContent() {
  const params = useParams();
  const router = useRouter();
  const expenseId = params.id as string;

  const { data: expense, isLoading, error } = useQuery({
    queryKey: ['expense', expenseId],
    queryFn: async () => {
      try {
        const response = await apiClient.get(`/expenses/${expenseId}`);
        return response.data;
      } catch (error) {
        return null;
      }
    },
    enabled: !!expenseId,
  });

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
          <Navigation />
          <main className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00d4ff]"></div>
            </div>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  if (error || !expense) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
          <Navigation />
          <main className="container mx-auto px-4 py-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <h1 className="text-2xl font-bold text-white mb-4">Gider Bulunamadı</h1>
              <p className="text-white/70 mb-4">Aradığınız gider kaydı bulunamadı.</p>
              <Link href="/expenses" className="btn-glass inline-flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Giderlere Dön
              </Link>
            </div>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <Link href="/expenses" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition">
            <ArrowLeft className="w-4 h-4" />
            Giderlere Dön
          </Link>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-white">Gider Detayı</h1>
              <div className={`px-4 py-2 rounded-lg ${
                expense.status === 'PAID' ? 'bg-green-500/20 text-green-400' :
                expense.status === 'OVERDUE' ? 'bg-red-500/20 text-red-400' :
                'bg-yellow-500/20 text-yellow-400'
              }`}>
                {expense.status === 'PAID' ? 'Ödendi' :
                 expense.status === 'OVERDUE' ? 'Gecikmiş' :
                 'Beklemede'}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <DollarSign className="w-6 h-6 text-blue-400" />
                  <h2 className="text-xl font-semibold text-white">Tutar</h2>
                </div>
                <p className="text-3xl font-bold text-white">
                  {expense.amount.toLocaleString('tr-TR')} {expense.currency}
                </p>
              </div>

              <div className="bg-white/5 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="w-6 h-6 text-green-400" />
                  <h2 className="text-xl font-semibold text-white">Mağaza</h2>
                </div>
                <p className="text-lg text-white">{expense.store?.name || 'N/A'}</p>
                <p className="text-sm text-white/70">{expense.store?.code || ''}</p>
              </div>

              <div className="bg-white/5 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-6 h-6 text-purple-400" />
                  <h2 className="text-xl font-semibold text-white">Vade Tarihi</h2>
                </div>
                <p className="text-lg text-white">
                  {new Date(expense.dueDate).toLocaleDateString('tr-TR')}
                </p>
              </div>

              <div className="bg-white/5 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-6 h-6 text-orange-400" />
                  <h2 className="text-xl font-semibold text-white">Tip</h2>
                </div>
                <p className="text-lg text-white">{expense.type}</p>
                {expense.category && (
                  <p className="text-sm text-white/70">{expense.category}</p>
                )}
              </div>
            </div>

            {expense.description && (
              <div className="mt-6 bg-white/5 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-3">Açıklama</h2>
                <p className="text-white/80">{expense.description}</p>
              </div>
            )}

            {expense.invoiceNumber && (
              <div className="mt-6 bg-white/5 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-3">Fatura Bilgileri</h2>
                <p className="text-white/80">Fatura No: {expense.invoiceNumber}</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

export default ExpenseDetailContent;
