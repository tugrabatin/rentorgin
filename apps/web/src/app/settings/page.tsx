/**
 * Settings Page
 * Settings, Theme, Language, Customer Segment & Session Management
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../contexts/auth-context';
import { useLanguage } from '../../contexts/language-context';
import { useTheme } from '../../contexts/theme-context';
import { useSegment } from '../../contexts/segment-context';
import { ProtectedRoute } from '../../components/protected-route';
import { Navigation } from '../../components/navigation';
import {
  Settings as SettingsIcon,
  Download,
  Upload,
  User,
  Shield,
  Bell,
  Palette,
  Globe,
  Building2,
  Check,
  AlertTriangle,
  X,
} from 'lucide-react';
import { ThemeSelector } from '../../components/ui/theme-selector';
import { LanguageSelector } from '../../components/ui/language-selector';
import apiClient from '../../lib/api';
const CUSTOMER_SEGMENTS = [
  { id: 'A1_SOLO_MARKA', code: 'A1', label: 'SoloMarka', subtitle: 'Tek mağazası var, henüz şubeleşmedi.', description: 'Evrak, gider, tedarik, yapılacaklar — erken düzen.' },
  { id: 'A2_KENDI_ZINCIRI', code: 'A2', label: 'KendiZinciri', subtitle: 'Franchise vermeden, kendi mağazalarıyla büyüyen marka.', description: 'Kira sözleşmeleri, kritik tarihler, AVM süreçleri.' },
  { id: 'A3_FRANCHISE_ALAN', code: 'A3', label: 'FranchiseAlan', subtitle: 'Bir markanın franchise\'ını alıp mağaza işletiyor.', description: 'Açılış süreci, evrak düzeni, destek talepleri.' },
  { id: 'A4_FRANCHISE_ALAN_TEDARIK_ZORUNLU', code: 'A4', label: 'FranchiseAlan-TedarikZorunlu', subtitle: 'Franchise alan ama malzemeyi markadan almak zorunda.', description: 'Zorunlu ürün listeleri, sipariş/teslimat, uygunluk.' },
  { id: 'A5_FRANCHISE_VEREN', code: 'A5', label: 'FranchiseVeren', subtitle: 'Franchise vererek büyüyen marka.', description: 'Aday pipeline, sözleşme, açılış, denetim, destek.' },
  { id: 'A6_FRANCHISE_VEREN_TEDARIK_ZORUNLU', code: 'A6', label: 'FranchiseVeren-TedarikZorunlu', subtitle: 'Franchise veriyor ve franchisee\'yi kendi tedarikine bağlıyor.', description: 'Uyum takibi + tedarik kuralları + gelir optimizasyonu.' },
] as const;

const ADMIN_ROLES = ['ADMIN', 'SUPER_ADMIN'];

function SettingsContent() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { theme, themeConfig } = useTheme();
  const { segment, setSegment, reloadSegment, updateSegmentOnServer } = useSegment();

  const [activeTab, setActiveTab] = useState<'profile' | 'preferences' | 'segment' | 'session'>('profile');
  const [sessionName, setSessionName] = useState('');

  const [currentSegment, setCurrentSegment] = useState<string | null>(null);
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);
  const [segmentLoading, setSegmentLoading] = useState(false);
  const [segmentSaved, setSegmentSaved] = useState(false);
  const [segmentError, setSegmentError] = useState<string | null>(null);

  // Confirmation modal state
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const canEditSegment = user?.role && ADMIN_ROLES.includes(user.role);

  const loadTenantProfile = useCallback(async () => {
    try {
      const response = await apiClient.get('/tenant/profile');
      const seg = response.data.customerSegment || null;
      setCurrentSegment(seg);
      setSelectedSegment(seg);
    } catch {
      // silently continue
    }
  }, []);

  useEffect(() => {
    loadTenantProfile();
  }, [loadTenantProfile]);

  const handleSaveSegment = () => {
    if (!selectedSegment || selectedSegment === currentSegment) return;
    setShowConfirmModal(true);
  };

  const confirmSaveSegment = async () => {
    if (!selectedSegment) return;
    setShowConfirmModal(false);
    setSegmentLoading(true);
    setSegmentError(null);
    setSegmentSaved(false);
    const ok = await updateSegmentOnServer(selectedSegment);
    if (ok) {
      setCurrentSegment(selectedSegment);
      setSegmentSaved(true);
      setTimeout(() => setSegmentSaved(false), 5000);
    } else {
      setSegmentError('Segment kaydedilemedi. Lütfen tekrar deneyin.');
    }
    setSegmentLoading(false);
  };

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
      await apiClient.post('/session/import', { userId: user?.id, sessionData });
      alert('Session import başarılı!');
    } catch {
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
                {(['profile', 'preferences', 'segment', 'session'] as const).map((tab) => {
                  const icons = { profile: User, preferences: Palette, segment: Building2, session: Download };
                  const labels = { profile: 'Profile', preferences: 'Preferences', segment: 'Müşteri Tipi', session: 'Session' };
                  const Icon = icons[tab];
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 px-6 py-4 text-sm font-medium transition-smooth ${
                        activeTab === tab
                          ? 'glass-strong text-[#00d4ff] border-b-2 border-[#00d4ff]'
                          : 'text-white/60 hover:glass-light hover:text-white'
                      }`}
                    >
                      <Icon className="w-5 h-5 inline-block mr-2" />
                      {labels[tab]}
                    </button>
                  );
                })}
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
                            <label className="block text-sm font-medium text-white/60 mb-1">Ad</label>
                            <input type="text" value={user?.firstName || ''} disabled className="w-full px-3 py-2 glass rounded-lg text-white/50" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-white/60 mb-1">Soyad</label>
                            <input type="text" value={user?.lastName || ''} disabled className="w-full px-3 py-2 glass rounded-lg text-white/50" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white/60 mb-1">E-posta</label>
                          <input type="email" value={user?.email || ''} disabled className="w-full px-3 py-2 glass rounded-lg text-white/50" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white/60 mb-1">Rol</label>
                          <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4 text-blue-500" />
                            <span className="px-3 py-1 bg-blue-900/30 text-blue-300 rounded-full text-sm">{user?.role}</span>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white/60 mb-1">Tenant ID</label>
                          <input type="text" value={user?.tenantId || ''} disabled className="w-full px-3 py-2 glass rounded-lg text-white/50" />
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
                      <p className="text-white/60 text-sm mb-4">Choose your preferred theme</p>
                      <div className="flex gap-3"><ThemeSelector /></div>
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
                      <p className="text-white/60 text-sm mb-4">Choose your preferred language</p>
                      <div className="flex gap-3"><LanguageSelector /></div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Bell className="w-5 h-5 text-[#00d4ff]" />
                        {t('common.notifications')}
                      </h3>
                      <div className="space-y-3">
                        {['Email notifications', 'Performance reports', 'Marketing emails'].map((label, i) => (
                          <label key={label} className="flex items-center gap-3 cursor-pointer glass rounded-2xl p-4 hover:glass-strong transition-smooth">
                            <input type="checkbox" className="w-5 h-5 rounded accent-[#00d4ff] cursor-pointer" defaultChecked={i < 2} />
                            <span className="text-white/80">{label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Segment Tab */}
                {activeTab === 'segment' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-[#00d4ff]" />
                        Müşteri Tipi Seçimi
                      </h3>
                      <p className="text-white/60 text-sm mb-6">
                        İşletmenize en uygun müşteri segmentini seçin. Bu seçim, menüleri, panelleri ve bazı ekranları yeniden düzenler.
                      </p>
                      {!canEditSegment && (
                        <div className="mb-4 glass-strong border-l-4 border-yellow-500 rounded-2xl p-4">
                          <p className="text-sm text-yellow-400 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4" />
                            Yalnızca Admin veya Süper Admin müşteri tipini değiştirebilir.
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      {CUSTOMER_SEGMENTS.map((seg) => {
                        const isSelected = selectedSegment === seg.id;
                        const isCurrent = currentSegment === seg.id;
                        return (
                          <button
                            key={seg.id}
                            onClick={() => canEditSegment && setSelectedSegment(seg.id)}
                            disabled={!canEditSegment}
                            className={`w-full text-left p-4 rounded-2xl border transition-smooth ${
                              isSelected
                                ? 'glass-strong border-[#00d4ff]/60 ring-1 ring-[#00d4ff]/40'
                                : 'glass border-white/10 hover:border-white/20 hover:glass-strong'
                            } ${!canEditSegment ? 'opacity-60 cursor-not-allowed' : ''}`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-bold ${
                                    isSelected ? 'bg-[#00d4ff]/20 text-[#00d4ff]' : 'bg-white/10 text-white/60'
                                  }`}>
                                    {seg.code}
                                  </span>
                                  <span className="text-white font-semibold">{seg.label}</span>
                                  {isCurrent && (
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400">Mevcut</span>
                                  )}
                                </div>
                                <p className="text-white/50 text-xs ml-10">{seg.subtitle}</p>
                                <p className="text-white/70 text-sm mt-1.5 ml-10">{seg.description}</p>
                              </div>
                              {isSelected && (
                                <div className="ml-3 mt-1"><Check className="w-5 h-5 text-[#00d4ff]" /></div>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {segmentError && (
                      <div className="glass-strong border-l-4 border-red-500 rounded-2xl p-4">
                        <p className="text-sm text-red-400">{segmentError}</p>
                      </div>
                    )}

                    {segmentSaved && (
                      <div className="glass-strong border-l-4 border-green-500 rounded-2xl p-4">
                        <p className="text-sm text-green-400 flex items-center gap-2">
                          <Check className="w-4 h-4" />
                          Arayüzünüz yeni müşteri tipine göre düzenlendi.
                        </p>
                      </div>
                    )}

                    {canEditSegment && (
                      <div className="flex items-center justify-end gap-3 pt-2">
                        <button
                          onClick={handleSaveSegment}
                          disabled={!selectedSegment || selectedSegment === currentSegment || segmentLoading}
                          className={`px-6 py-3 rounded-xl font-medium text-sm transition-smooth flex items-center gap-2 ${
                            !selectedSegment || selectedSegment === currentSegment || segmentLoading
                              ? 'bg-white/5 text-white/30 cursor-not-allowed'
                              : 'bg-[#00d4ff] text-black hover:bg-[#00d4ff]/90'
                          }`}
                        >
                          {segmentLoading ? (
                            <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Check className="w-4 h-4" />
                          )}
                          Kaydet
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Session Tab */}
                {activeTab === 'session' && (
                  <div className="space-y-6">
                    <div className="glass rounded-2xl p-6 border border-[#00d4ff]/20">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl glass-strong border border-[#00d4ff]/30">
                          <Download className="w-6 h-6 text-[#00d4ff]" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white mb-2">Export Session</h3>
                          <p className="text-sm text-white/60 mb-4">Save your current session data in JSON format</p>
                          <div className="space-y-3">
                            <input
                              type="text"
                              placeholder="Session name (optional)"
                              value={sessionName}
                              onChange={(e) => setSessionName(e.target.value)}
                              className="w-full px-4 py-3 glass rounded-xl text-white placeholder-white/40 focus-glass transition-smooth"
                            />
                            <button onClick={handleExportSession} className="btn-glass flex items-center gap-2">
                              <Download className="w-4 h-4" /> Export
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="glass rounded-2xl p-6 border border-[#00e5cc]/20">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl glass-strong border border-[#00e5cc]/30">
                          <Upload className="w-6 h-6 text-[#00e5cc]" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white mb-2">Import Session</h3>
                          <p className="text-sm text-white/60 mb-4">Load previously saved session data</p>
                          <label className="cursor-pointer">
                            <input type="file" accept=".json" onChange={handleImportSession} className="hidden" />
                            <button
                              className="btn-glass flex items-center gap-2"
                              onClick={(e: any) => {
                                e.preventDefault();
                                const input = e.currentTarget.previousSibling as HTMLInputElement;
                                input?.click();
                              }}
                            >
                              <Upload className="w-4 h-4" /> Select File
                            </button>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="glass-strong border-l-4 border-yellow-500 rounded-2xl p-4">
                      <div className="flex gap-3">
                        <Bell className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-white/80">
                          Importing session data may overwrite your current data. Make sure you have a backup before proceeding.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowConfirmModal(false)} />
          <div className="relative glass-strong rounded-3xl p-8 max-w-md w-full mx-4 border border-white/20">
            <button
              onClick={() => setShowConfirmModal(false)}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-full bg-yellow-500/20 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-7 h-7 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Müşteri Tipini Değiştir</h3>
            </div>
            <p className="text-white/70 text-sm text-center mb-6">
              Bu değişiklik menüleri, panelleri ve bazı ekranları yeniden düzenler.
              Verileriniz etkilenmez, yalnızca görünüm değişir.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-5 py-2.5 glass rounded-xl text-white/70 hover:text-white text-sm font-medium transition-smooth"
              >
                İptal
              </button>
              <button
                onClick={confirmSaveSegment}
                className="px-5 py-2.5 bg-[#00d4ff] text-black rounded-xl text-sm font-medium hover:bg-[#00d4ff]/90 transition-smooth"
              >
                Onayla ve Değiştir
              </button>
            </div>
          </div>
        </div>
      )}
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
