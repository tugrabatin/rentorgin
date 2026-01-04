/**
 * Settings Page
 * Settings, Theme, Language & Session Management
 * 
 * Ayarlar Sayfası
 * Ayarlar, Tema, Dil ve Oturum Yönetimi
 */

'use client';

import { useState } from 'react';
import { useAuth } from '../../contexts/auth-context';
import { useLanguage } from '../../contexts/language-context';
import { useTheme } from '../../contexts/theme-context';
import { ProtectedRoute } from '../../components/protected-route';
import { Navigation } from '../../components/navigation';
import { Settings as SettingsIcon, Download, Upload, User, Shield, Bell, Palette, Globe } from 'lucide-react';
import { ThemeSelector } from '../../components/ui/theme-selector';
import { LanguageSelector } from '../../components/ui/language-selector';
import apiClient from '../../lib/api';

function SettingsContent() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { theme, themeConfig } = useTheme();
  const [activeTab, setActiveTab] = useState<'profile' | 'preferences' | 'session'>('profile');
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      <main className="md:ml-64 pt-16 p-8">
        <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <SettingsIcon className="w-8 h-8 text-[#00d4ff]" />
              {t('nav.settings')}
            </h1>
            <p className="text-white/60 mt-1">
              {t('nav.settings')} - Theme: {themeConfig.label}
            </p>
          </div>

          {/* Tabs */}
          <div className="glass-strong rounded-3xl overflow-hidden">
            <div className="flex border-b border-white/10">
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-smooth ${
                  activeTab === 'profile'
                    ? 'glass-strong text-[#00d4ff] border-b-2 border-[#00d4ff]'
                    : 'text-white/60 hover:glass-light hover:text-white'
                }`}
              >
                <User className="w-5 h-5 inline-block mr-2" />
                Profile
              </button>
              <button
                onClick={() => setActiveTab('preferences')}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-smooth ${
                  activeTab === 'preferences'
                    ? 'glass-strong text-[#00d4ff] border-b-2 border-[#00d4ff]'
                    : 'text-white/60 hover:glass-light hover:text-white'
                }`}
              >
                <Palette className="w-5 h-5 inline-block mr-2" />
                Preferences
              </button>
              <button
                onClick={() => setActiveTab('session')}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-smooth ${
                  activeTab === 'session'
                    ? 'glass-strong text-[#00d4ff] border-b-2 border-[#00d4ff]'
                    : 'text-white/60 hover:glass-light hover:text-white'
                }`}
              >
                <Download className="w-5 h-5 inline-block mr-2" />
                Session
              </button>
            </div>

            <div className="p-8">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <User className="w-5 h-5 text-[#00d4ff]" />
                      Kullanıcı Bilgileri
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-white/60 mb-1">
                            Ad
                          </label>
                          <input
                            type="text"
                            value={user?.firstName || ''}
                            disabled
                            className="w-full px-3 py-2 glass rounded-lg text-white/50"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Soyad
                          </label>
                          <input
                            type="text"
                            value={user?.lastName || ''}
                            disabled
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          E-posta
                        </label>
                        <input
                          type="email"
                          value={user?.email || ''}
                          disabled
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Rol
                        </label>
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-blue-500" />
                          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm">
                            {user?.role}
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Tenant ID
                        </label>
                        <input
                          type="text"
                          value={user?.tenantId || ''}
                          disabled
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-500"
                        />
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* Preferences Tab */}
              {activeTab === 'preferences' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Palette className="w-5 h-5 text-[#00d4ff]" />
                      {t('theme.title')}
                    </h3>
                    <p className="text-white/60 text-sm mb-4">
                      Choose your preferred theme
                    </p>
                    <div className="flex gap-3">
                      <ThemeSelector />
                    </div>
                    <div className="mt-4 glass rounded-2xl p-4 border border-white/10">
                      <p className="text-sm text-white/60">
                        Current theme: <span className="text-white font-semibold capitalize">{themeConfig.label}</span>
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Globe className="w-5 h-5 text-[#00d4ff]" />
                      Language
                    </h3>
                    <p className="text-white/60 text-sm mb-4">
                      Choose your preferred language
                    </p>
                    <div className="flex gap-3">
                      <LanguageSelector />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Bell className="w-5 h-5 text-[#00d4ff]" />
                      {t('common.notifications')}
                    </h3>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer glass rounded-2xl p-4 hover:glass-strong transition-smooth">
                        <input
                          type="checkbox"
                          className="w-5 h-5 rounded accent-[#00d4ff] cursor-pointer"
                          defaultChecked
                        />
                        <span className="text-white/80">Email notifications</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer glass rounded-2xl p-4 hover:glass-strong transition-smooth">
                        <input
                          type="checkbox"
                          className="w-5 h-5 rounded accent-[#00d4ff] cursor-pointer"
                          defaultChecked
                        />
                        <span className="text-white/80">Performance reports</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer glass rounded-2xl p-4 hover:glass-strong transition-smooth">
                        <input
                          type="checkbox"
                          className="w-5 h-5 rounded accent-[#00d4ff] cursor-pointer"
                        />
                        <span className="text-white/80">Marketing emails</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Session Tab */}
              {activeTab === 'session' && (
                <div className="space-y-6">
                  {/* Export Session */}
                  <div className="glass rounded-2xl p-6 border border-[#00d4ff]/20">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl glass-strong border border-[#00d4ff]/30">
                        <Download className="w-6 h-6 text-[#00d4ff]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-2">
                          Export Session
                        </h3>
                        <p className="text-sm text-white/60 mb-4">
                          Save your current session data in JSON format
                        </p>
                        <div className="space-y-3">
                          <input
                            type="text"
                            placeholder="Session name (optional)"
                            value={sessionName}
                            onChange={(e) => setSessionName(e.target.value)}
                            className="w-full px-4 py-3 glass rounded-xl text-white placeholder-white/40 focus-glass transition-smooth"
                          />
                          <button
                            onClick={handleExportSession}
                            className="btn-glass flex items-center gap-2"
                          >
                            <Download className="w-4 h-4" />
                            Export
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Import Session */}
                  <div className="glass rounded-2xl p-6 border border-[#00e5cc]/20">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl glass-strong border border-[#00e5cc]/30">
                        <Upload className="w-6 h-6 text-[#00e5cc]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-2">
                          Import Session
                        </h3>
                        <p className="text-sm text-white/60 mb-4">
                          Load previously saved session data
                        </p>
                        <label className="cursor-pointer">
                          <input
                            type="file"
                            accept=".json"
                            onChange={handleImportSession}
                            className="hidden"
                          />
                          <button
                            className="btn-glass flex items-center gap-2"
                            onClick={(e: any) => {
                              e.preventDefault();
                              const input = e.currentTarget.previousSibling as HTMLInputElement;
                              input?.click();
                            }}
                          >
                            <Upload className="w-4 h-4" />
                            Select File
                          </button>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Warning */}
                  <div className="glass-strong border-l-4 border-yellow-500 rounded-2xl p-4">
                    <div className="flex gap-3">
                      <Bell className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-white/80">
                          Importing session data may overwrite your current data. 
                          Make sure you have a backup before proceeding.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        </div>
      </main>
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
