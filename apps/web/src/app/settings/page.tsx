/**
 * Settings Page
 * User settings and session management
 * 
 * Ayarlar Sayfası
 * Kullanıcı ayarları ve oturum yönetimi
 */

'use client';

import { useState } from 'react';
import { useAuth } from '../auth-context';
import { ProtectedRoute } from '../../components/protected-route';
import { Navigation } from '../../components/navigation';
import { Settings as SettingsIcon, Download, Upload, User } from 'lucide-react';
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
      await apiClient.post('/session/import', {
        userId: user?.id,
        sessionData,
      });
      alert('Session import başarılı!');
    } catch (err: any) {
      alert('Import başarısız oldu');
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-8">
            <SettingsIcon className="w-8 h-8 text-blue-400" />
            <h1 className="text-3xl font-bold text-white">Ayarlar</h1>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden">
            <div className="flex border-b border-white/20">
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex-1 px-6 py-4 text-sm font-medium transition ${
                  activeTab === 'profile'
                    ? 'bg-white/10 text-white border-b-2 border-blue-400'
                    : 'text-white/70 hover:bg-white/5'
                }`}
              >
                <User className="w-5 h-5 inline-block mr-2" />
                Profil
              </button>
              <button
                onClick={() => setActiveTab('session')}
                className={`flex-1 px-6 py-4 text-sm font-medium transition ${
                  activeTab === 'session'
                    ? 'bg-white/10 text-white border-b-2 border-blue-400'
                    : 'text-white/70 hover:bg-white/5'
                }`}
              >
                <Download className="w-5 h-5 inline-block mr-2" />
                Oturum Yönetimi
              </button>
            </div>

            <div className="p-6">
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-xl font-semibold text-white mb-4">Profil Bilgileri</h2>
                  {user && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-white/70 text-sm mb-2">E-posta</label>
                        <div className="bg-white/5 rounded-lg px-4 py-3 text-white">
                          {user.email}
                        </div>
                      </div>
                      <div>
                        <label className="block text-white/70 text-sm mb-2">Ad</label>
                        <div className="bg-white/5 rounded-lg px-4 py-3 text-white">
                          {user.firstName}
                        </div>
                      </div>
                      <div>
                        <label className="block text-white/70 text-sm mb-2">Soyad</label>
                        <div className="bg-white/5 rounded-lg px-4 py-3 text-white">
                          {user.lastName}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'session' && (
                <div>
                  <h2 className="text-xl font-semibold text-white mb-4">Oturum Yönetimi</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white/70 text-sm mb-2">Session Adı</label>
                      <input
                        type="text"
                        value={sessionName}
                        onChange={(e) => setSessionName(e.target.value)}
                        placeholder="Session adı (opsiyonel)"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex gap-4">
                      <button
                        onClick={handleExportSession}
                        className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-3 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition flex items-center justify-center gap-2"
                      >
                        <Download className="w-5 h-5" />
                        Export Session
                      </button>
                      <label className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold py-3 rounded-lg hover:from-green-600 hover:to-emerald-600 transition flex items-center justify-center gap-2 cursor-pointer">
                        <Upload className="w-5 h-5" />
                        Import Session
                        <input
                          type="file"
                          accept=".json"
                          onChange={handleImportSession}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

export default SettingsContent;
