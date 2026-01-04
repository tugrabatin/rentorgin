'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import apiClient from '../../../lib/api';

interface MonthlySummary {
  year: number;
  storeId: string;
  months: Array<{
    month: number;
    year: number;
    totalAmount: number;
    paidAmount: number;
    pendingAmount: number;
    count: number;
  }>;
  yearTotal: number;
}

interface Statistics {
  totalAmount: number;
  paidAmount: number;
  pendingAmount: number;
  overdueAmount: number;
  totalCount: number;
  byType: Record<string, number>;
  byStatus: Record<string, number>;
  currency: string;
}

export default function ExpenseAnalyticsPage() {
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [monthlySummary, setMonthlySummary] = useState<MonthlySummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    fetchData();
  }, [selectedYear]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [statsRes, monthlyRes] = await Promise.all([
        apiClient.get('/expenses/statistics'),
        apiClient.get(`/expenses/monthly-summary?year=${selectedYear}`),
      ]);
      setStatistics(statsRes.data);
      setMonthlySummary(monthlyRes.data);
    } catch (err) {
      console.error('Failed to load analytics', err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number, currency: string = 'TRY') => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const getMonthName = (month: number) => {
    const months = [
      'Ocak',
      'Şubat',
      'Mart',
      'Nisan',
      'Mayıs',
      'Haziran',
      'Temmuz',
      'Ağustos',
      'Eylül',
      'Ekim',
      'Kasım',
      'Aralık',
    ];
    return months[month - 1];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Analiz yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/expenses" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
            ← Geri Dön
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Gider Analitiği</h1>
          <p className="mt-2 text-gray-600">Gider dağılımınızı ve trendlerinizi görüntüleyin</p>
        </div>

        {/* Overall Statistics */}
        {statistics && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <p className="text-sm text-gray-600">Toplam Gider</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {formatCurrency(statistics.totalAmount, statistics.currency)}
                </p>
                <p className="text-xs text-gray-500 mt-1">{statistics.totalCount} kayıt</p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <p className="text-sm text-gray-600">Ödenmiş</p>
                <p className="text-2xl font-bold text-green-600 mt-2">
                  {formatCurrency(statistics.paidAmount, statistics.currency)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  %{((statistics.paidAmount / statistics.totalAmount) * 100).toFixed(1)}
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <p className="text-sm text-gray-600">Bekleyen</p>
                <p className="text-2xl font-bold text-yellow-600 mt-2">
                  {formatCurrency(statistics.pendingAmount, statistics.currency)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  %{((statistics.pendingAmount / statistics.totalAmount) * 100).toFixed(1)}
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <p className="text-sm text-gray-600">Gecikmiş</p>
                <p className="text-2xl font-bold text-red-600 mt-2">
                  {formatCurrency(statistics.overdueAmount, statistics.currency)}
                </p>
                <p className="text-xs text-gray-500 mt-1">Acil ödenecek</p>
              </div>
            </div>

            {/* By Type */}
            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <h2 className="text-xl font-semibold mb-6">Tipe Göre Dağılım</h2>
              <div className="space-y-4">
                {Object.entries(statistics.byType)
                  .sort((a, b) => b[1] - a[1])
                  .map(([type, amount]) => {
                    const percentage = (amount / statistics.totalAmount) * 100;
                    return (
                      <div key={type} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium text-gray-700">{type}</span>
                          <span className="text-gray-900">
                            {formatCurrency(amount, statistics.currency)} ({percentage.toFixed(1)}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* By Status */}
            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <h2 className="text-xl font-semibold mb-6">Duruma Göre Dağılım</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {Object.entries(statistics.byStatus).map(([status, amount]) => {
                  const percentage = (amount / statistics.totalAmount) * 100;
                  const colorClass =
                    status === 'PAID'
                      ? 'text-green-600'
                      : status === 'PENDING'
                      ? 'text-yellow-600'
                      : status === 'OVERDUE'
                      ? 'text-red-600'
                      : 'text-gray-600';

                  return (
                    <div key={status} className="text-center p-6 border border-gray-200 rounded-lg">
                      <p className="text-sm text-gray-600 mb-2">{status}</p>
                      <p className={`text-2xl font-bold ${colorClass}`}>
                        {formatCurrency(amount, statistics.currency)}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">%{percentage.toFixed(1)}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* Monthly Trends */}
        {monthlySummary && (
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Aylık Trend</h2>
              <div className="flex gap-2">
                {[2024, 2025, 2026].map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      selectedYear === year
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Ay</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">
                      Toplam
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">
                      Ödenmiş
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">
                      Bekleyen
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">
                      Adet
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {monthlySummary.months.map((month) => (
                    <tr key={month.month} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        {getMonthName(month.month)}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900">
                        {formatCurrency(month.totalAmount)}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-green-600">
                        {formatCurrency(month.paidAmount)}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-yellow-600">
                        {formatCurrency(month.pendingAmount)}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-600">{month.count}</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50 font-semibold">
                    <td className="px-4 py-3 text-sm text-gray-900">Toplam {selectedYear}</td>
                    <td className="px-4 py-3 text-sm text-right text-gray-900">
                      {formatCurrency(monthlySummary.yearTotal)}
                    </td>
                    <td className="px-4 py-3 text-sm text-right" colSpan={3}></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}







