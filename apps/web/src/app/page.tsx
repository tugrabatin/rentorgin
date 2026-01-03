/**
 * Home Page
 * Landing page with navigation
 * 
 * Ana Sayfa
 * Navigasyon ile açılış sayfası
 */

import Link from 'next/link';
import { Building2, FileText, BarChart3, Bot, FileCheck, Settings } from 'lucide-react';

export default function HomePage() {
  const modules = [
    {
      name: 'Mağazalar',
      nameEn: 'Stores',
      icon: Building2,
      href: '/stores',
      description: 'Mağaza lokasyonları ve bilgileri',
      color: 'bg-blue-500',
    },
    {
      name: 'Kira Sözleşmeleri',
      nameEn: 'Leases',
      icon: FileText,
      href: '/leases',
      description: 'Kira sözleşmesi yönetimi',
      color: 'bg-green-500',
    },
    {
      name: 'Analitik',
      nameEn: 'Analytics',
      icon: BarChart3,
      href: '/analytics',
      description: 'Performans ve lokasyon analizi',
      color: 'bg-purple-500',
    },
    {
      name: 'AI Asistan',
      nameEn: 'AI Assistant',
      icon: Bot,
      href: '/ai-assistant',
      description: 'Yapay zeka destekli karar desteği',
      color: 'bg-pink-500',
    },
    {
      name: 'Çeviri',
      nameEn: 'Translation',
      icon: FileCheck,
      href: '/translation',
      description: 'Sözleşme çeviri motoru',
      color: 'bg-orange-500',
    },
    {
      name: 'Ayarlar',
      nameEn: 'Settings',
      icon: Settings,
      href: '/settings',
      description: 'Uygulama ayarları ve oturum yönetimi',
      color: 'bg-gray-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                BASIS
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Kurumsal Kiralama Yönetim Platformu v0.1.0
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login" className="px-4 py-2 border border-primary-500 text-primary-500 rounded-lg hover:bg-primary-50 transition">
                Giriş Yap
              </Link>
              <Link href="/register" className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition">
                Kayıt Ol
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Hoş Geldiniz
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Tüm mağaza kiralama süreçlerinizi tek bir platformdan yönetin.
            8 modül, yapay zeka desteği, gelişmiş analitik.
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <Link
              key={module.href}
              href={module.href}
              className="block group"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all p-6 border border-gray-200 dark:border-gray-700">
                <div className={`${module.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <module.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 transition">
                  {module.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {module.nameEn}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  {module.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-16 bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Platform Özellikleri
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                ✅ Modüler Mimari
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                Her modül bağımsız çalışır, kolayca genişletilebilir
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                🤖 AI Destekli
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                Her ekranda bağlam-farkındalıklı yapay zeka asistanı
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                🌐 Multi-Tenant
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                SaaS'a hazır, çoklu müşteri desteği
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                📊 Gelişmiş Analitik
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                Detaylı performans metrikleri ve raporlama
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-600 dark:text-gray-400">
          <p>BASIS v0.1.0 | © 2025 | Kurumsal Kiralama Yönetim Platformu</p>
          <p className="text-sm mt-2">
            <Link href="/api/docs" className="hover:text-primary-500">API Documentation</Link>
            {' | '}
            <Link href="/docs/principles" className="hover:text-primary-500">Principles</Link>
            {' | '}
            <Link href="/docs/glossary" className="hover:text-primary-500">Glossary</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}

