# 🚀 Vercel Deployment Rehberi

Bu rehber, RentOrgin projesini Vercel'e deploy etmek için gereken adımları içerir.

## ⚠️ ÖNEMLİ NOTLAR

1. **Monorepo Yapısı**: Proje monorepo yapısında, `apps/web` Next.js uygulaması
2. **Backend Ayrı**: Backend API (`apps/api`) ayrı deploy edilmeli (Railway, Render, vb.)
3. **Environment Variables**: Vercel'de environment variables ayarlanmalı

---

## 📋 Adım 1: Vercel'de Proje Oluşturma

1. Vercel'e giriş yapın: https://vercel.com
2. **"Add New..."** → **"Project"** seçin
3. GitHub repository'yi seçin: `tugrabatin/rentorgin`
4. **Import Project** butonuna tıklayın

---

## 📋 Adım 2: Vercel Proje Ayarları

### Framework Preset
- **Framework Preset:** Next.js (otomatik algılanır)

### Root Directory
- **Root Directory:** `apps/web` ⚠️ **ÖNEMLİ**

### Build Settings
- **Build Command:** `npm run build` (root'tan çalışır, turbo otomatik yönetir)
- **Output Directory:** `.next` (Next.js default)
- **Install Command:** `npm install`

### Environment Variables
Aşağıdaki environment variables'ları ekleyin:

```
NEXT_PUBLIC_API_URL=https://your-api-url.com/api/v1
NEXT_PUBLIC_APP_VERSION=0.4.0
NODE_ENV=production
```

⚠️ **NOT:** `NEXT_PUBLIC_` prefix'i olan değişkenler client-side'da kullanılabilir.

---

## 📋 Adım 3: Vercel.json Yapılandırması

Proje root'unda `vercel.json` dosyası oluşturuldu:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "apps/web/.next",
  "installCommand": "npm install",
  "framework": "nextjs",
  "rootDirectory": "apps/web"
}
```

Bu dosya Vercel'in monorepo yapısını anlaması için gereklidir.

---

## 📋 Adım 4: Backend API URL'i

Frontend'in backend API'ye bağlanabilmesi için:

1. Backend API'yi deploy edin (Railway, Render, AWS, vb.)
2. Vercel'de `NEXT_PUBLIC_API_URL` environment variable'ını ayarlayın
3. Örnek: `https://rentorgin-api.railway.app/api/v1`

---

## 📋 Adım 5: Build ve Deploy

1. Vercel otomatik olarak GitHub'dan yeni commit'leri algılar
2. Her push'ta otomatik deploy yapılır
3. Preview deployment'lar PR'lar için otomatik oluşturulur

---

## 🔍 Sorun Giderme

### Serverless Function Hatası (500)

**Sorun:** `FUNCTION_INVOCATION_FAILED` hatası

**Çözümler:**

1. **Root Directory Kontrolü:**
   - Vercel Project Settings → General → Root Directory: `apps/web`

2. **Build Command Kontrolü:**
   - Root'tan `npm run build` çalışmalı
   - Turbo monorepo'yu yönetir

3. **Environment Variables:**
   - Tüm gerekli env variables'ların eklendiğinden emin olun
   - `NEXT_PUBLIC_` prefix'li değişkenler client-side için

4. **Middleware Hatası:**
   - Middleware edge runtime'da çalışır
   - Node.js API'leri kullanamaz
   - Try-catch eklenmiş durumda

5. **Import Hatası:**
   - `@rentorgin/core-domain` package'ının build edildiğinden emin olun
   - `next.config.js`'de `transpilePackages` ayarı var

### Build Hatası

**Sorun:** Build sırasında hata

**Çözümler:**

1. **Local Build Test:**
   ```bash
   cd apps/web
   npm run build
   ```

2. **Dependencies:**
   ```bash
   npm install
   ```

3. **TypeScript Hataları:**
   ```bash
   npm run lint
   ```

### API Bağlantı Hatası

**Sorun:** Frontend backend'e bağlanamıyor

**Çözümler:**

1. **CORS Ayarları:**
   - Backend'de CORS ayarlarını kontrol edin
   - Vercel domain'i allowed origins'e ekleyin

2. **API URL:**
   - `NEXT_PUBLIC_API_URL` doğru mu?
   - HTTPS kullanıldığından emin olun

3. **Network Errors:**
   - Browser console'da network hatalarını kontrol edin
   - Backend'in çalıştığından emin olun

---

## 📚 Ek Kaynaklar

- [Vercel Monorepo Guide](https://vercel.com/docs/monorepos)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

---

## ✅ Deployment Checklist

- [ ] Vercel'de proje oluşturuldu
- [ ] Root Directory: `apps/web` ayarlandı
- [ ] Environment variables eklendi
- [ ] Backend API deploy edildi
- [ ] `NEXT_PUBLIC_API_URL` ayarlandı
- [ ] Build başarılı
- [ ] Production deployment çalışıyor ✅

---

**Son Güncelleme:** 2025-01-XX  
**Versiyon:** 0.4.0

