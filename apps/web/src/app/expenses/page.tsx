/**
 * Expenses Page - Premium Glassmorphic Design
 * Expense Management Dashboard
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import apiClient from '../../lib/api';
import { ProtectedRoute } from '../../components/protected-route';
import { Navigation } from '../../components/navigation';
import { 
  Wallet, 
  Plus, 
  CheckCircle, 
  AlertCircle,
  DollarSign,
  Eye,
  Trash2,
  Search,
  Filter,
  X
} from 'lucide-react';

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
  isDisputed: boolean;
  store: {
    id: string;
    name: string;
    code: string;
    city: string;
  };
}

function ExpensesContent() {
  const router = useRouter();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    fetchExpenses();
  }, [filterType, filterStatus]);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filterType) params.append('type', filterType);
      if (filterStatus) params.append('status', filterStatus);

      const response = await apiClient.get(`/expenses?${params.toString()}`);
      setExpenses(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load expenses');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkPaid = async (id: string) => {
    try {
      await apiClient.put(`/expenses/${id}/mark-paid`);
      fetchExpenses();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to mark as paid');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu gideri silmek istediğinizden emin misiniz?')) return;
    try {
      await apiClient.delete(`/expenses/${id}`);
      fetchExpenses();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete expense');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PAID': return 'bg-green-500/20 border-green-500/30';
      case 'PENDING': return 'bg-yellow-500/20 border-yellow-500/30';
      case 'OVERDUE': return 'bg-red-500/20 border-red-500/30';
      default: return 'bg-gray-500/20 border-gray-500/30';
    }
  };

  const formatCurrency = (amount: number, currency: string = 'TRY') => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency }).format(amount);
  };

  const formatDate = (date: string) => new Date(date).toLocaleDateString('tr-TR');

  // Stats
  const stats = [
    { label: 'Toplam Gider', value: formatCurrency(expenses.reduce((sum, e) => sum + e.amount, 0)), icon: Wallet, gradient: 'from-blue-500 to-cyan-500' },
    { label: 'Ödenmiş', value: expenses.filter(e => e.status === 'PAID').length, icon: CheckCircle, gradient: 'from-green-500 to-emerald-500' },
    { label: 'Bekleyen', value: expenses.filter(e => e.status === 'PENDING').length, icon: AlertCircle, gradient: 'from-yellow-500 to-orange-500' },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="md:ml-64 pt-16 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white text-shadow flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-xl">
                  <Wallet className="w-7 h-7 text-white" />
                </div>
                Giderler
              </h1>
              <p className="text-white/70 mt-2">Mağaza giderlerini yönetin ve takip edin</p>
            </div>
            
            <Link href="/expenses/create" className="btn-glass !bg-gradient-to-r from-yellow-500 to-orange-500">
              <Plus className="w-5 h-5 mr-2" />
              Yeni Gider Ekle
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="glass-card p-6">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-white/60 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-white text-shadow">{stat.value}</p>
              </div>
            ))}
          </div>

          {error && (
            <div className="glass-card p-6 border-l-4 border-red-500/50">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-red-400" />
                <p className="text-red-400">{error}</p>
              </div>
            </div>
          )}

          {/* Filters */}
          <div className="glass-strong rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Filter className="w-5 h-5 text-[#00d4ff]" />
              <h3 className="text-lg font-semibold text-white">Filtreler</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-3 glass rounded-xl text-white focus-glass transition-smooth"
              >
                <option value="">Tüm Tipler</option>
                <option value="RENT">Kira</option>
                <option value="CAC">Ortak Alan</option>
                <option value="MARKETING">Pazarlama</option>
                <option value="UTILITIES">Elektrik/Su</option>
                <option value="MAINTENANCE">Bakım</option>
                <option value="OTHER">Diğer</option>
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 glass rounded-xl text-white focus-glass transition-smooth"
              >
                <option value="">Tüm Durumlar</option>
                <option value="PENDING">Bekleyen</option>
                <option value="PAID">Ödenmiş</option>
                <option value="OVERDUE">Gecikmiş</option>
              </select>

              <button
                onClick={() => { setFilterType(''); setFilterStatus(''); }}
                className="btn-glass inline-flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Filtreleri Temizle
              </button>
            </div>
          </div>

          {/* Expenses List */}
          <div className="glass-strong rounded-3xl p-8">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff6b35]"></div>
              </div>
            ) : expenses.length > 0 ? (
              <div className="space-y-4">
                {expenses.map((expense) => (
                  <div key={expense.id} className="group glass-card p-6 relative overflow-hidden">
                    <div className={`absolute top-4 right-4 badge-glass ${getStatusColor(expense.status)}`}>
                      {expense.status}
                    </div>

                    <div className="flex items-start gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                        <DollarSign className="w-7 h-7 text-white" />
                      </div>

                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:gradient-text transition-all">
                          {expense.store.name}
                        </h3>
                        <p className="text-white/70 text-sm mb-3">{expense.type} {expense.description && `- ${expense.description}`}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                          <div>
                            <p className="text-white/50 text-xs mb-1">Tutar</p>
                            <p className="text-white font-bold">{formatCurrency(expense.amount, expense.currency)}</p>
                          </div>
                          <div>
                            <p className="text-white/50 text-xs mb-1">Vade</p>
                            <p className="text-white">{formatDate(expense.dueDate)}</p>
                          </div>
                          {expense.paidDate && (
                            <div>
                              <p className="text-white/50 text-xs mb-1">Ödeme</p>
                              <p className="text-white">{formatDate(expense.paidDate)}</p>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          {expense.status === 'PENDING' && (
                            <button
                              onClick={() => handleMarkPaid(expense.id)}
                              className="btn-glass !py-2 !px-4 inline-flex items-center gap-2"
                            >
                              <CheckCircle className="w-4 h-4" />
                              Öde
                            </button>
                          )}
                          <button
                            onClick={() => router.push(`/expenses/${expense.id}`)}
                            className="btn-glass !py-2 !px-4 inline-flex items-center gap-2"
                          >
                            <Eye className="w-4 h-4" />
                            Detay
                          </button>
                          <button
                            onClick={() => handleDelete(expense.id)}
                            className="btn-glass !py-2 !px-4 inline-flex items-center gap-2 hover:!bg-red-500/20"
                          >
                            <Trash2 className="w-4 h-4" />
                            Sil
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Wallet className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <p className="text-white/60 mb-4">Henüz gider eklenmemiş</p>
                <Link href="/expenses/create" className="btn-glass inline-flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  İlk Gideri Ekle
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ExpensesPage() {
  return (
    <ProtectedRoute>
      <ExpensesContent />
    </ProtectedRoute>
  );
}
