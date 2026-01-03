/**
 * Create Expense Page
 * Create new expense
 * 
 * Gider Oluştur Sayfası
 * Yeni gider oluştur
 */

'use client';

import { ProtectedRoute } from '../../../components/protected-route';
import { Navigation } from '../../../components/navigation';
import Link from 'next/link';
import { ArrowLeft, Plus } from 'lucide-react';

export default function CreateExpensePage() {
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
            <div className="flex items-center gap-3 mb-6">
              <Plus className="w-8 h-8 text-blue-400" />
              <h1 className="text-3xl font-bold text-white">Yeni Gider Ekle</h1>
            </div>
            <p className="text-white/70">Gider oluşturma formu yakında eklenecek.</p>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
