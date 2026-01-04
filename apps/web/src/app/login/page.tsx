/**
 * Login Page
 * User authentication page
 * 
 * Giriş Sayfası
 * Kullanıcı kimlik doğrulama sayfası
 */

'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/auth-context';
import Link from 'next/link';
import { LogIn, Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react';

export default function LoginPage() {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [backendStatus, setBackendStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  // Check backend status on mount
  useEffect(() => {
    const checkBackend = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002/api/v1';
        const response = await fetch(`${apiUrl}/health`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        
        if (response.ok) {
          setBackendStatus('online');
        } else {
          setBackendStatus('offline');
        }
      } catch (err) {
        setBackendStatus('offline');
      }
    };

    checkBackend();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message || 'Giriş başarısız oldu');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-500 text-white mb-4">
            <LogIn className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">BASIS</h1>
          <p className="text-gray-600 mt-2">
            Kurumsal Kiralama Yönetim Platformu
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Backend Status */}
          {backendStatus === 'checking' && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
              <p className="text-sm text-blue-700">Backend kontrol ediliyor...</p>
            </div>
          )}
          
          {backendStatus === 'online' && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <p className="text-sm text-green-700">Backend API çalışıyor</p>
            </div>
          )}
          
          {backendStatus === 'offline' && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-red-900 mb-1">Backend API çalışmıyor</p>
                  <p className="text-sm text-red-700 mb-3">
                    Backend servisine bağlanılamıyor. Lütfen backend API'yi başlatın.
                  </p>
                  <div className="mt-3 p-3 bg-red-100 rounded border border-red-200">
                    <p className="text-xs font-medium text-red-900 mb-2">Hızlı çözüm:</p>
                    <ol className="text-xs text-red-800 space-y-1 list-decimal list-inside">
                      <li>Yeni bir terminal açın</li>
                      <li><code className="bg-red-200 px-1 rounded">cd apps/api</code> komutunu çalıştırın</li>
                      <li><code className="bg-red-200 px-1 rounded">npm run start:dev</code> komutunu çalıştırın</li>
                      <li>Backend başladıktan sonra bu sayfayı yenileyin</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          )}

          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Giriş Yap
          </h2>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-red-900 mb-1">Hata</p>
                  <p className="text-sm text-red-700">{error}</p>
                  {error.includes('Backend servisine bağlanılamıyor') && (
                    <div className="mt-3 p-3 bg-red-100 rounded border border-red-200">
                      <p className="text-xs font-medium text-red-900 mb-2">Çözüm önerileri:</p>
                      <ul className="text-xs text-red-800 space-y-1 list-disc list-inside">
                        <li>Backend API'nin çalıştığından emin olun</li>
                        <li>Terminal'de <code className="bg-red-200 px-1 rounded">cd apps/api && npm run start:dev</code> komutunu çalıştırın</li>
                        <li>API URL'in doğru olduğunu kontrol edin</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                E-posta
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="ornek@sirket.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Şifre
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || backendStatus === 'offline'}
              className="w-full py-3 px-4 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Giriş yapılıyor...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Giriş Yap</span>
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm font-medium text-blue-900 mb-2">
              Demo Hesabı:
            </p>
            <p className="text-sm text-blue-700">
              E-posta: <code className="bg-blue-100 px-2 py-0.5 rounded">admin@demo.com</code>
            </p>
            <p className="text-sm text-blue-700">
              Şifre: <code className="bg-blue-100 px-2 py-0.5 rounded">hashed_password_123</code>
            </p>
          </div>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Hesabınız yok mu?{' '}
              <Link href="/register" className="text-primary-500 hover:text-primary-600 font-medium">
                Kayıt Olun
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
            ← Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  );
}

