/**
 * SegmentGate
 * Blocks access to the main app until the tenant has a customer segment.
 * Legacy tenants (segment === null) see a full-screen segment picker.
 * Only users with ADMIN/SUPER_ADMIN role can set the segment.
 * Passes through for unauthenticated users and public pages (login, register, landing).
 */

'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '../contexts/auth-context';
import { useSegment } from '../contexts/segment-context';
import { Building2, Check, AlertTriangle, Lock } from 'lucide-react';

const SEGMENTS = [
  { id: 'A1_SOLO_MARKA', code: 'A1', labelTR: 'SoloMarka (Tek Şube Marka)', descriptionTR: 'Tek mağazası var, henüz şubeleşmedi.', focusTR: 'Evrak, gider, tedarik, yapılacaklar — erken düzen.' },
  { id: 'A2_KENDI_ZINCIRI', code: 'A2', labelTR: 'KendiZinciri (Kendi Sermayesiyle Şubeleşen)', descriptionTR: 'Franchise vermeden, kendi mağazalarıyla büyüyen marka.', focusTR: 'Kira sözleşmeleri, kritik tarihler, AVM süreçleri.' },
  { id: 'A3_FRANCHISE_ALAN', code: 'A3', labelTR: 'FranchiseAlan (Bağımsız İşletmeci)', descriptionTR: 'Bir markanın franchise\'ını alıp mağaza işletiyor.', focusTR: 'Açılış süreci, evrak düzeni, destek talepleri.' },
  { id: 'A4_FRANCHISE_ALAN_TEDARIK_ZORUNLU', code: 'A4', labelTR: 'FranchiseAlan-TedarikZorunlu', descriptionTR: 'Franchise alan ama malzemeyi markadan almak zorunda.', focusTR: 'Zorunlu ürün listeleri, sipariş/teslimat, uygunluk.' },
  { id: 'A5_FRANCHISE_VEREN', code: 'A5', labelTR: 'FranchiseVeren (Ağ Kurucu Marka)', descriptionTR: 'Franchise vererek büyüyen marka.', focusTR: 'Aday pipeline, sözleşme, açılış, denetim, destek.' },
  { id: 'A6_FRANCHISE_VEREN_TEDARIK_ZORUNLU', code: 'A6', labelTR: 'FranchiseVeren-TedarikZorunlu', descriptionTR: 'Franchise veriyor ve franchisee\'yi kendi tedarikine bağlıyor.', focusTR: 'Uyum takibi + tedarik kuralları + gelir optimizasyonu.' },
] as const;
const ALLOWED_ROLES = ['ADMIN', 'SUPER_ADMIN'];

interface SegmentGateProps {
  children: React.ReactNode;
}

const PUBLIC_PATHS = ['/login', '/register', '/'];

export function SegmentGate({ children }: SegmentGateProps) {
  const { user, isAuthenticated } = useAuth();
  const { segment, segmentMissing, isLoading, updateSegmentOnServer } = useSegment();
  const pathname = usePathname();
  const [selected, setSelected] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const isPublicPage = PUBLIC_PATHS.includes(pathname);

  if (isPublicPage || !isAuthenticated) {
    return <>{children}</>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00d4ff] mx-auto" />
          <p className="mt-4 text-white/60">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!segmentMissing) {
    return <>{children}</>;
  }

  const canSetSegment = user?.role && ALLOWED_ROLES.includes(user.role);

  const handleSave = async () => {
    if (!selected) return;
    setSaving(true);
    setError('');
    const ok = await updateSegmentOnServer(selected);
    if (!ok) {
      setError('Segment kaydedilemedi. Lütfen tekrar deneyin.');
    }
    setSaving(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1a] via-[#0d1117] to-[#0a0a1a]" />

      <div className="relative z-10 w-full max-w-3xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#00e5cc] text-white mb-4">
            <Building2 className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-white">Müşteri Tipi Seçimi Gerekli</h1>
          <p className="text-white/60 mt-2">
            Devam etmek için işletmenizin müşteri tipini belirlemeniz gerekiyor.
          </p>
        </div>

        {!canSetSegment ? (
          <div className="glass-strong rounded-3xl p-8 text-center">
            <Lock className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Yetki Gerekli</h2>
            <p className="text-white/60">
              Müşteri tipi yalnızca Admin veya Süper Admin tarafından ayarlanabilir.
              Lütfen yöneticinize başvurun.
            </p>
          </div>
        ) : (
          <div className="glass-strong rounded-3xl p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {SEGMENTS.map((seg) => {
                const isSelected = selected === seg.id;
                return (
                  <button
                    key={seg.id}
                    type="button"
                    onClick={() => setSelected(seg.id)}
                    className={`text-left p-4 rounded-2xl border transition-all ${
                      isSelected
                        ? 'glass-strong border-[#00d4ff]/60 ring-1 ring-[#00d4ff]/40'
                        : 'glass border-white/10 hover:border-white/20 hover:glass-strong'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-bold ${
                              isSelected
                                ? 'bg-[#00d4ff]/20 text-[#00d4ff]'
                                : 'bg-white/10 text-white/60'
                            }`}
                          >
                            {seg.code}
                          </span>
                          <span className="text-white font-semibold text-sm">{seg.labelTR}</span>
                        </div>
                        <p className="text-white/50 text-xs ml-10">{seg.descriptionTR}</p>
                        <p className="text-[#00d4ff]/70 text-xs mt-1 ml-10">{seg.focusTR}</p>
                      </div>
                      {isSelected && <Check className="w-5 h-5 text-[#00d4ff] flex-shrink-0 mt-1" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {error && (
              <div className="mb-4 p-3 glass-strong border-l-4 border-red-500 rounded-xl flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span className="text-sm text-red-400">{error}</span>
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSave}
                disabled={!selected || saving}
                className={`px-8 py-3 rounded-xl font-medium text-sm transition-all flex items-center gap-2 ${
                  !selected || saving
                    ? 'bg-white/5 text-white/30 cursor-not-allowed'
                    : 'bg-[#00d4ff] text-black hover:bg-[#00d4ff]/90'
                }`}
              >
                {saving ? (
                  <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Check className="w-4 h-4" />
                )}
                Kaydet ve Devam Et
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
