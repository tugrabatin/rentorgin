/**
 * Language Context
 * Multi-language support (Turkish/English)
 * 
 * Dil Bağlamı
 * Çoklu dil desteği (Türkçe/İngilizce)
 */

'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'tr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation keys
const translations: Record<Language, Record<string, string>> = {
  tr: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.stores': 'Mağazalar',
    'nav.leases': 'Sözleşmeler',
    'nav.expenses': 'Giderler',
    'nav.budget': 'Bütçe',
    'nav.risk': 'Risk',
    'nav.analytics': 'Analitik',
    'nav.malls': "AVM'ler",
    'nav.aiAssistant': 'AI Asistan',
    'nav.translation': 'Çeviri',
    'nav.leasingManager': 'Kiralama Yön.',
    'nav.settings': 'Ayarlar',
    'nav.logout': 'Çıkış',
    
    // Common
    'common.search': 'Ara...',
    'common.notifications': 'Bildirimler',
    'common.save': 'Kaydet',
    'common.cancel': 'İptal',
    'common.delete': 'Sil',
    'common.edit': 'Düzenle',
    'common.create': 'Oluştur',
    'common.loading': 'Yükleniyor...',
    'common.error': 'Hata',
    'common.success': 'Başarılı',
    
    // Auth
    'auth.login': 'Giriş Yap',
    'auth.register': 'Kayıt Ol',
    'auth.email': 'E-posta',
    'auth.password': 'Şifre',
    'auth.firstName': 'Ad',
    'auth.lastName': 'Soyad',
    'auth.forgotPassword': 'Şifremi Unuttum',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.welcome': 'Hoş Geldiniz',
    'dashboard.overview': 'Genel Bakış',
    'dashboard.recentActivity': 'Son Aktiviteler',
    
    // Theme
    'theme.title': 'Tema',
    'theme.dark': 'Koyu',
    'theme.light': 'Açık',
    'theme.ocean': 'Okyanus',
    'theme.forest': 'Orman',
  },
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.stores': 'Stores',
    'nav.leases': 'Leases',
    'nav.expenses': 'Expenses',
    'nav.budget': 'Budget',
    'nav.risk': 'Risk',
    'nav.analytics': 'Analytics',
    'nav.malls': 'Malls',
    'nav.aiAssistant': 'AI Assistant',
    'nav.translation': 'Translation',
    'nav.leasingManager': 'Leasing Manager',
    'nav.settings': 'Settings',
    'nav.logout': 'Logout',
    
    // Common
    'common.search': 'Search...',
    'common.notifications': 'Notifications',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.create': 'Create',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    
    // Auth
    'auth.login': 'Login',
    'auth.register': 'Register',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.firstName': 'First Name',
    'auth.lastName': 'Last Name',
    'auth.forgotPassword': 'Forgot Password',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.welcome': 'Welcome',
    'dashboard.overview': 'Overview',
    'dashboard.recentActivity': 'Recent Activity',
    
    // Theme
    'theme.title': 'Theme',
    'theme.dark': 'Dark',
    'theme.light': 'Light',
    'theme.ocean': 'Ocean',
    'theme.forest': 'Forest',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('tr');

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'tr' || savedLanguage === 'en')) {
      setLanguageState(savedLanguage);
    }
  }, []);

  // Save language to localStorage when changed
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    // Update HTML lang attribute
    document.documentElement.lang = lang;
  };

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Hook to use language context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}









