/**
 * Settings Page
 * Premium Glassmorphism Settings & Session Management
 * 
 * Ayarlar Sayfası
 * Premium Glassmorphism Ayarlar ve Oturum Yönetimi
 */

'use client';

import { useState } from 'react';
import { useAuth } from '../auth-context';
import { ProtectedRoute } from '../../components/protected-route';
import { Navigation } from '../../components/navigation';
import { GlassCard } from '@/components/ui/glass-card';
import { GlassButton } from '@/components/ui/glass-button';
import { GlassInput } from '@/components/ui/glass-input';
import { GlassBadge } from '@/components/ui/glass-badge';
import { Settings as SettingsIcon, Download, Upload, User, Shield, Bell, Globe } from 'lucide-react';
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
    <div className="min-h-screen">
      <Navigation />
      
      <main className="md:ml-64 pt-16 p-8 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-glass-text flex items-center gap-3">
              <SettingsIcon className="w-10 h-10 text-accent-cyan" />
              Ayarlar
            </h1>
            <p className="text-glass-textMuted mt-2">
              Hesap ayarları ve oturum yönetimi
            </p>
          </div>

          {/* Tabs */}
          <GlassCard className="mb-8 overflow-hidden">
            <div className="flex border-b border-glass-border">
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-smooth ${
                  activeTab === 'profile'
                    ? 'glass-medium border-b-2 border-accent-cyan text-glass-text'
                    : 'text-glass-textMuted hover:glass-light'
                }`}
              >
                <User className="w-5 h-5 inline-block mr-2" />
                Profil
              </button>
              <button
                onClick={() => setActiveTab('session')}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-smooth ${
                  activeTab === 'session'
                    ? 'glass-medium border-b-2 border-accent-cyan text-glass-text'
                    : 'text-glass-textMuted hover:glass-light'
                }`}
              >
                <Download className="w-5 h-5 inline-block mr-2" />
                Oturum Yönetimi
              </button>
            </div>

            <div className="p-8">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-glass-text mb-6 flex items-center gap-2">
                      <User className="w-5 h-5 text-accent-cyan" />
                      Kullanıcı Bilgileri
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <GlassInput
                          label="Ad"
                          value={user?.firstName || ''}
                          disabled
                        />
                        <GlassInput
                          label="Soyad"
                          value={user?.lastName || ''}
                          disabled
                        />
                      </div>

                      <GlassInput
                        label="E-posta"
                        type="email"
                        value={user?.email || ''}
                        disabled
                      />

                      <div>
                        <label className="block text-sm font-medium text-glass-text mb-2">Rol</label>
                        <GlassBadge variant="info" className="px-4 py-2">
                          <Shield className="w-4 h-4" />
                          {user?.role}
                        </GlassBadge>
                      </div>

                      <GlassInput
                        label="Tenant ID"
                        value={user?.tenantId || ''}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-glass-border">
                    <h3 className="text-lg font-semibold text-glass-text mb-4 flex items-center gap-2">
                      <Bell className="w-5 h-5 text-accent-cyan" />
                      Tercihler
                    </h3>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          className="w-5 h-5 rounded accent-accent-cyan cursor-pointer"
                          defaultChecked
                        />
                        <span className="text-sm text-glass-textMuted group-hover:text-glass-text transition-smooth">
                          E-posta bildirimleri
                        </span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          className="w-5 h-5 rounded accent-accent-cyan cursor-pointer"
                          defaultChecked
                        />
                        <span className="text-sm text-glass-textMuted group-hover:text-glass-text transition-smooth">
                          Performans raporları
                        </span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          className="w-5 h-5 rounded accent-accent-cyan cursor-pointer"
                        />
                        <span className="text-sm text-glass-textMuted group-hover:text-glass-text transition-smooth">
                          Pazarlama e-postaları
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Session Tab */}
              {activeTab === 'session' && (
                <div className="space-y-6">
                  {/* Export Session */}
                  <GlassCard variant="light" className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-glass bg-gradient-to-br from-accent-cyan/20 to-accent-teal/20 border border-accent-cyan/30">
                        <Download className="w-6 h-6 text-accent-cyan" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-glass-text mb-2">
                          Oturumu Dışa Aktar
                        </h3>
                        <p className="text-sm text-glass-textMuted mb-4">
                          Mevcut oturum verilerinizi JSON formatında kaydedin
                        </p>
                        <div className="space-y-3">
                          <GlassInput
                            placeholder="Oturum adı (opsiyonel)"
                            value={sessionName}
                            onChange={(e) => setSessionName(e.target.value)}
                          />
                          <GlassButton
                            variant="primary"
                            onClick={handleExportSession}
                            icon={<Download className="w-4 h-4" />}
                          >
                            Dışa Aktar
                          </GlassButton>
                        </div>
                      </div>
                    </div>
                  </GlassCard>

                  {/* Import Session */}
                  <GlassCard variant="light" className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-glass bg-gradient-to-br from-accent-teal/20 to-accent-petroleum/20 border border-accent-teal/30">
                        <Upload className="w-6 h-6 text-accent-teal" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-glass-text mb-2">
                          Oturumu İçe Aktar
                        </h3>
                        <p className="text-sm text-glass-textMuted mb-4">
                          Daha önce kaydettiğiniz oturum verilerini yükleyin
                        </p>
                        <label className="cursor-pointer">
                          <input
                            type="file"
                            accept=".json"
                            onChange={handleImportSession}
                            className="hidden"
                          />
                          <GlassButton
                            variant="secondary"
                            icon={<Upload className="w-4 h-4" />}
                            onClick={(e: any) => {
                              e.preventDefault();
                              e.currentTarget.previousSibling?.click();
                            }}
                          >
                            Dosya Seç
                          </GlassButton>
                        </label>
                      </div>
                    </div>
                  </GlassCard>

                  {/* Warning */}
                  <GlassCard variant="light" className="p-4 border-l-4 border-yellow-500/50">
                    <div className="flex gap-3">
                      <Bell className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-glass-text mb-1">Dikkat</p>
                        <p className="text-xs text-glass-textMuted">
                          Oturum verilerini içe aktarmak mevcut verilerinizi değiştirebilir. 
                          İşleme devam etmeden önce bir yedek aldığınızdan emin olun.
                        </p>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              )}
            </div>
          </GlassCard>
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
