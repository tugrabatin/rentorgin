# Dil ve Tema Sistemi / Language & Theme System

## 🌍 Dil Desteği / Language Support

### Desteklenen Diller / Supported Languages
- **🇹🇷 Türkçe** (Turkish) - Varsayılan / Default
- **🇬🇧 İngilizce** (English)

### Kullanım / Usage

```tsx
import { useLanguage } from '@/contexts/language-context';

function MyComponent() {
  const { language, setLanguage, t } = useLanguage();
  
  return (
    <div>
      <h1>{t('nav.dashboard')}</h1>
      <button onClick={() => setLanguage('en')}>English</button>
      <button onClick={() => setLanguage('tr')}>Türkçe</button>
    </div>
  );
}
```

### Çeviri Anahtarları / Translation Keys

Çeviri anahtarları `/apps/web/src/contexts/language-context.tsx` dosyasında tanımlıdır.

**Örnek Anahtarlar / Example Keys:**
- `nav.dashboard` → "Dashboard"
- `nav.stores` → "Mağazalar" (TR) / "Stores" (EN)
- `common.save` → "Kaydet" (TR) / "Save" (EN)
- `theme.dark` → "Koyu" (TR) / "Dark" (EN)

### Yeni Çeviri Ekleme / Adding New Translations

```tsx
// language-context.tsx içinde
const translations: Record<Language, Record<string, string>> = {
  tr: {
    'your.key': 'Türkçe değer',
  },
  en: {
    'your.key': 'English value',
  },
};
```

---

## 🎨 Tema Sistemi / Theme System

### Mevcut Temalar / Available Themes

1. **Dark (Koyu)** - Varsayılan / Default
   - Gradient: #0a0e27 → #1a0b2e
   - Primary: #00d4ff (Cyan)
   - Secondary: #00e5cc (Teal)

2. **Light (Açık)**
   - Gradient: #f0f4f8 → #e8eef5
   - Primary: #0284c7 (Sky Blue)
   - Secondary: #0891b2 (Cyan)

3. **Ocean (Okyanus)**
   - Gradient: #0a1929 → #0c2d48
   - Primary: #00b4d8 (Ocean Blue)
   - Secondary: #48cae4 (Light Blue)

4. **Forest (Orman)**
   - Gradient: #0d1f1b → #1a3d2e
   - Primary: #34d399 (Emerald)
   - Secondary: #10b981 (Green)

### Kullanım / Usage

```tsx
import { useTheme } from '@/contexts/theme-context';

function MyComponent() {
  const { theme, themeConfig, setTheme, availableThemes } = useTheme();
  
  return (
    <div>
      <p>Current theme: {themeConfig.label}</p>
      <button onClick={() => setTheme('ocean')}>Ocean Theme</button>
      
      {availableThemes.map((t) => (
        <button key={t.name} onClick={() => setTheme(t.name)}>
          {t.label}
        </button>
      ))}
    </div>
  );
}
```

### CSS Değişkenleri / CSS Variables

Tema değişiklikleri otomatik olarak CSS custom properties'e uygulanır:

```css
:root {
  --color-bg-gradient-start: /* dinamik */
  --color-bg-gradient-via: /* dinamik */
  --color-bg-gradient-end: /* dinamik */
  --color-primary: /* dinamik */
  --color-primary-glow: /* dinamik */
  --color-secondary: /* dinamik */
  --color-accent: /* dinamik */
}

/* Light tema için özel ayarlamalar */
.theme-light {
  --glass-bg: rgba(255, 255, 255, 0.7);
  --text-primary: rgba(0, 0, 0, 0.9);
  /* ... */
}
```

---

## 🧩 Bileşenler / Components

### LanguageSelector

Dil değiştirme dropdown bileşeni.

```tsx
import { LanguageSelector } from '@/components/ui/language-selector';

<LanguageSelector />
```

**Özellikler / Features:**
- 🇹🇷 🇬🇧 Bayrak ikonları
- Aktif dil göstergesi
- Dropdown menü
- LocalStorage'da kalıcılık

### ThemeSelector

Tema değiştirme dropdown bileşeni.

```tsx
import { ThemeSelector } from '@/components/ui/theme-selector';

<ThemeSelector />
```

**Özellikler / Features:**
- 🎨 Tema renk önizleme
- Aktif tema göstergesi
- Dropdown menü
- LocalStorage'da kalıcılık

---

## 📦 Kurulum / Setup

### 1. Context'ler Providers'a Eklendi

```tsx
// apps/web/src/app/providers.tsx
<ThemeProvider>
  <LanguageProvider>
    <AuthProvider>
      {children}
    </AuthProvider>
  </LanguageProvider>
</ThemeProvider>
```

### 2. Navigation Güncellendi

- Dil değiştirme butonu eklendi
- Tema değiştirme butonu eklendi
- Tüm metinler çeviri sistemi kullanıyor

### 3. Settings Sayfası Güncellendi

- Yeni "Preferences" tab'ı
- Tema ve dil seçiciler örnek kullanım
- Glassmorphic tasarım uygulandı

---

## ⚠️ Dikkat Edilmesi Gerekenler / Important Notes

### Gerçekçi Değerlendirme:

1. **Eksik Çeviriler**
   - Şu anda sadece temel anahtar kelimeler çevrildi
   - Tüm sayfalardaki metinler henüz çevrilmedi
   - Yeni sayfalar eklerken çeviri anahtarları eklemeyi unutmayın

2. **Light Tema**
   - Light tema temel yapıdadır
   - Bazı bileşenlerde görsel iyileştirmeler gerekebilir
   - Text renkleri bazı yerlerde optimize edilmeli

3. **Performans**
   - LocalStorage kullanıldı (güvenli)
   - Her tema değişikliğinde CSS variables güncelleniyor
   - Re-render optimizasyonları yapıldı (useState)

4. **Next.js i18n**
   - `next.config.js`'te i18n config eklendi
   - Şu an client-side çeviri kullanılıyor
   - Server-side çeviri için Next.js i18n routing entegre edilebilir

---

## 🚀 Gelecek Geliştirmeler / Future Improvements

1. **Çeviri Sistemi**
   - [ ] Tüm sayfalara çeviri desteği
   - [ ] Backend'den çeviri yükleme
   - [ ] Dinamik dil dosyaları (JSON)
   - [ ] Çeviri yönetim paneli

2. **Tema Sistemi**
   - [ ] Kullanıcı özel tema oluşturma
   - [ ] Tema önizleme modu
   - [ ] Otomatik koyu/açık tema geçişi
   - [ ] Daha fazla hazır tema

3. **Erişilebilirlik**
   - [ ] ARIA etiketleri çevirileri
   - [ ] RTL dil desteği (Arapça, vb.)
   - [ ] Yüksek kontrast modu

---

## 📝 Dosya Yapısı / File Structure

```
apps/web/
├── src/
│   ├── contexts/
│   │   ├── language-context.tsx    # Dil yönetimi
│   │   └── theme-context.tsx       # Tema yönetimi
│   ├── components/
│   │   └── ui/
│   │       ├── language-selector.tsx
│   │       └── theme-selector.tsx
│   ├── app/
│   │   ├── providers.tsx           # Context providers
│   │   ├── layout.tsx              # Root layout
│   │   ├── globals.css             # Tema CSS
│   │   └── settings/
│   │       └── page.tsx            # Örnek kullanım
│   └── components/
│       └── navigation.tsx          # Updated navigation
├── next.config.js                  # i18n config
└── LANGUAGE_AND_THEME_SYSTEM.md    # Bu dosya
```

---

## ✅ Tamamlanan Özellikler / Completed Features

- [x] İngilizce dil desteği eklendi
- [x] Türkçe/İngilizce geçiş sistemi
- [x] 4 farklı tema (Dark, Light, Ocean, Forest)
- [x] Tema değiştirme UI bileşeni
- [x] Dil değiştirme UI bileşeni
- [x] LocalStorage ile kalıcılık
- [x] Navigation entegrasyonu
- [x] Settings sayfası güncellendi
- [x] CSS variable sistemi
- [x] Glassmorphic tasarım korundu
- [x] TypeScript tip güvenliği
- [x] Linter hatasız

---

**Not:** Bu sistem tamamen fonksiyonel ve production-ready değildir. Tüm sayfalara çeviri uygulanması ve daha fazla test edilmesi gerekiyor. Gerçekçi olarak, bir UI framework'ünde tam i18n desteği büyük bir iştir ve zamanla geliştirilmelidir.









