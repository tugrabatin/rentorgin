/**
 * Settings Page
 * User settings and session management
 * 
 * Ayarlar Sayfası
 * Kullanıcı ayarları ve oturum yönetimi
 */

'use client';

import { useState } from 'react';
import { useAuth } from '../../contexts/auth-context';
import { ProtectedRoute } from '../../components/protected-route';
import { Navigation } from '../../components/navigation';
import { Settings as SettingsIcon, Download, Upload, User, Save } from 'lucide-react';
import apiClient from '../../lib/api';

function SettingsContent() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'session'>('profile');
  const [sessionName, setSessionName] = useState('');

  const handleExportSession = async () => {
    try {
      const response = await apiClient.post('/session/export', {
        userId: user?.id,
        name: sessionName || `Session_${new Date().toISOString()}`,
      });

      alert(`Session export başarılı! ID: ${response.data.sessionId}`);
      setSessionName('');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Export başarısız oldu');
    }
  };

  const handleImportSession = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const sessionData = JSON.parse(text);

      const response = await apiClient.post('/session/import', {
        userId: user?.id,
        sessionData,
      });

      alert('Session import başarılı!');
    } catch (err: any) {
      alert('Import başarısız oldu');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <SettingsIcon className="w-8 h-8" />
            Ayarlar
          </h1>
          <p className="text-gray-600 mt-1">
            Hesap ayarları ve oturum yönetimi
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex-1 px-6 py-4 text-sm font-medium transition ${
                  activeTab === 'profile'
                    ? 'border-b-2 border-primary-500 text-primary-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <User className="w-5 h-5 inline-block mr-2" />
                Profil
              </button>
              <button
                onClick={() => setActiveTab('session')}
                className={`flex-1 px-6 py-4 text-sm font-medium transition ${
                  activeTab === 'session'
                    ? 'border-b-2 border-primary-500 text-primary-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Download className="w-5 h-5 inline-block mr-2" />
                Oturum Yönetimi
              </button>
            </div>
          </div>

          <div className="p-8">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Kullanıcı Bilgileri
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Ad</label>
                        <input
                          type="text"
                          value={user?.firstName || ''}
                          disabled
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Soyad</label>
                        <input
                          type="text"
                          value={user?.lastName || ''}
                          disabled
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">E-posta</label>
                      <input
                        type="email"
                        value={user?.email || ''}
                        disabled
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Rol</label>
                      <input
                        type="text"
                        value={user?.role || ''}
                        disabled
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tenant ID</label>
                      <input
                        type="text"
                        value={user?.tenantId || ''}
                        disabled
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm"
                      />
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-700">
                      💡 Profil düzenleme v0.3.0'da eklenecektir.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Session Tab */}
            {activeTab === 'session' && (
              <div className="space-y-6">
                {/* Export Session */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Oturum Dışa Aktar
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Mevcut çalışma oturumunuzu JSON olarak kaydedin ve daha sonra geri yükleyin.
                  </p>
                  
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={sessionName}
                      onChange={(e) => setSessionName(e.target.value)}
                      placeholder="Oturum adı (opsiyonel)"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                    <button
                      onClick={handleExportSession}
                      className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition flex items-center gap-2"
                    >
                      <Download className="w-5 h-5" />
                      Dışa Aktar
                    </button>
                  </div>
                </div>

                {/* Import Session */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Oturum İçe Aktar
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Daha önce kaydedilmiş bir oturumu geri yükleyin.
                  </p>
                  
                  <label className="block">
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportSession}
                      className="hidden"
                      id="session-import"
                    />
                    <label
                      htmlFor="session-import"
                      className="inline-flex items-center gap-2 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition cursor-pointer"
                    >
                      <Upload className="w-5 h-5" />
                      JSON Dosyası Seç
                    </label>
                  </label>
                </div>

                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-700">
                    ⚠️ Oturum içe aktarma işlemi mevcut çalışma alanınızı değiştirecektir.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <SettingsContent />
    </ProtectedRoute>
  );
}






