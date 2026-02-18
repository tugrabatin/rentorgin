/**
 * Register Page — Two-step registration
 * Step 1: Select customer segment (required)
 * Step 2: Fill personal info (email, password, name)
 */

'use client';

import { useState } from 'react';
import { useAuth } from '../../contexts/auth-context';
import Link from 'next/link';
import {
  UserPlus,
  Mail,
  Lock,
  User,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
} from 'lucide-react';
const SEGMENTS = [
  { id: 'A1_SOLO_MARKA', code: 'A1', labelTR: 'SoloMarka (Tek Şube Marka)', descriptionTR: 'Tek mağazası var, henüz şubeleşmedi. Erken düzen müşterisi.', focusTR: 'Evrak, gider, tedarik, yapılacaklar — erken düzen.' },
  { id: 'A2_KENDI_ZINCIRI', code: 'A2', labelTR: 'KendiZinciri (Kendi Sermayesiyle Şubeleşen)', descriptionTR: 'Franchise vermeden, kendi mağazalarıyla büyüyen marka.', focusTR: 'Kira sözleşmeleri, kritik tarihler, AVM süreçleri, açılış projeleri.' },
  { id: 'A3_FRANCHISE_ALAN', code: 'A3', labelTR: 'FranchiseAlan (Bağımsız İşletmeci)', descriptionTR: 'Bir markanın franchise\'ını alıp mağaza işletiyor.', focusTR: 'Açılış süreci, evrak düzeni, destek talepleri, performans takibi.' },
  { id: 'A4_FRANCHISE_ALAN_TEDARIK_ZORUNLU', code: 'A4', labelTR: 'FranchiseAlan-TedarikZorunlu', descriptionTR: 'Franchise alan ama malzemeyi markadan almak zorunda.', focusTR: 'Zorunlu ürün listeleri, sipariş/teslimat, uygunluk, maliyet etkisi.' },
  { id: 'A5_FRANCHISE_VEREN', code: 'A5', labelTR: 'FranchiseVeren (Ağ Kurucu Marka)', descriptionTR: 'Franchise vererek büyüyen marka.', focusTR: 'Aday pipeline, sözleşme süreçleri, açılış onayları, denetim, destek.' },
  { id: 'A6_FRANCHISE_VEREN_TEDARIK_ZORUNLU', code: 'A6', labelTR: 'FranchiseVeren-TedarikZorunlu', descriptionTR: 'Franchise veriyor ve franchisee\'yi kendi tedarikine bağlıyor.', focusTR: 'Uyum takibi + tedarik kuralları + gelir/kârlılık optimizasyonu.' },
] as const;

export default function RegisterPage() {
  const { register, isLoading } = useAuth();

  // Step management: 1 = segment, 2 = personal info
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = () => {
    if (!selectedSegment) return;
    setStep(2);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Şifreler eşleşmiyor');
      return;
    }
    if (formData.password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır');
      return;
    }
    if (!selectedSegment) {
      setError('Müşteri tipi seçilmedi');
      setStep(1);
      return;
    }

    setIsSubmitting(true);
    try {
      await register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        customerSegment: selectedSegment,
      });
    } catch (err: any) {
      const msg = err.message || 'Kayıt başarısız oldu';
      if (msg.includes('already exists') || msg.includes('zaten var')) {
        setError('Bu e-posta adresi zaten kullanılıyor.');
      } else if (msg.includes('email')) {
        setError('Geçerli bir e-posta adresi girin.');
      } else if (msg.includes('password')) {
        setError('Şifre en az 6 karakter olmalıdır.');
      } else {
        setError(msg);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPasswordStrength = () => {
    const { password } = formData;
    if (!password) return { strength: 0, label: '', color: '' };
    let s = 0;
    if (password.length >= 6) s += 25;
    if (password.length >= 8) s += 25;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) s += 25;
    if (/[0-9]/.test(password)) s += 25;
    if (s <= 25) return { strength: s, label: 'Zayıf', color: 'bg-red-500' };
    if (s <= 50) return { strength: s, label: 'Orta', color: 'bg-yellow-500' };
    if (s <= 75) return { strength: s, label: 'İyi', color: 'bg-blue-500' };
    return { strength: s, label: 'Güçlü', color: 'bg-green-500' };
  };

  const passwordStrength = getPasswordStrength();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto" />
          <p className="mt-4 text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <div className={`w-full ${step === 1 ? 'max-w-3xl' : 'max-w-md'}`}>
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-500 text-white mb-4">
            {step === 1 ? <Building2 className="w-8 h-8" /> : <UserPlus className="w-8 h-8" />}
          </div>
          <h1 className="text-3xl font-bold text-gray-900">BASIS</h1>
          <p className="text-gray-600 mt-2">
            {step === 1 ? 'İşletme Tipinizi Seçin' : 'Hesap Bilgilerinizi Girin'}
          </p>
          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className={`h-2 w-16 rounded-full ${step >= 1 ? 'bg-primary-500' : 'bg-gray-300'}`} />
            <div className={`h-2 w-16 rounded-full ${step >= 2 ? 'bg-primary-500' : 'bg-gray-300'}`} />
          </div>
          <p className="text-xs text-gray-500 mt-1">Adım {step} / 2</p>
        </div>

        {/* STEP 1: Segment Selection */}
        {step === 1 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Müşteri Tipiniz Nedir?</h2>
            <p className="text-sm text-gray-500 mb-6">
              Bu seçim, arayüzünüzü ve varsayılan ayarları belirler. Daha sonra değiştirebilirsiniz.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SEGMENTS.map((seg) => {
                const isSelected = selectedSegment === seg.id;
                return (
                  <button
                    key={seg.id}
                    type="button"
                    onClick={() => setSelectedSegment(seg.id)}
                    className={`text-left p-4 rounded-xl border-2 transition-all ${
                      isSelected
                        ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-200'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-bold ${
                              isSelected
                                ? 'bg-primary-500 text-white'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {seg.code}
                          </span>
                          <span className="font-semibold text-gray-900">{seg.labelTR}</span>
                        </div>
                        <p className="text-xs text-gray-500 ml-10">{seg.descriptionTR}</p>
                        <p className="text-xs text-primary-600 mt-1 ml-10 font-medium">
                          {seg.focusTR}
                        </p>
                      </div>
                      {isSelected && (
                        <Check className="w-5 h-5 text-primary-500 flex-shrink-0 mt-1" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between mt-6">
              <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900">
                Zaten hesabınız var mı? Giriş Yapın
              </Link>
              <button
                type="button"
                onClick={handleNextStep}
                disabled={!selectedSegment}
                className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                Devam
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Personal Info */}
        {step === 2 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-2 mb-6">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="p-1 rounded hover:bg-gray-100 transition"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h2 className="text-2xl font-bold text-gray-900">Kayıt Ol</h2>
            </div>

            {/* Selected segment badge */}
            {selectedSegment && (
              <div className="mb-4 p-3 bg-primary-50 border border-primary-200 rounded-lg flex items-center gap-2">
                <Building2 className="w-4 h-4 text-primary-600" />
                <span className="text-sm text-primary-700 font-medium">
                  {SEGMENTS.find((s) => s.id === selectedSegment)?.labelTR}
                </span>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="ml-auto text-xs text-primary-500 hover:underline"
                >
                  Değiştir
                </button>
              </div>
            )}

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    Ad
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Ahmet"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Soyad
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Yılmaz"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  E-posta
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="ornek@sirket.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Şifre
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="••••••••"
                  />
                </div>
                {formData.password && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${passwordStrength.color}`}
                        style={{ width: `${passwordStrength.strength}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-600">{passwordStrength.label}</span>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Şifre Tekrar
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="••••••••"
                  />
                  {formData.confirmPassword && formData.password === formData.confirmPassword && (
                    <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                    <span>Kayıt oluşturuluyor...</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    <span>Kayıt Ol</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Zaten hesabınız var mı?{' '}
                <Link href="/login" className="text-primary-500 hover:text-primary-600 font-medium">
                  Giriş Yapın
                </Link>
              </p>
            </div>
          </div>
        )}

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
            ← Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  );
}
