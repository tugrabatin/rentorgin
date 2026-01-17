# 🔧 Vercel Build Hatası Çözümü

## ❌ HATA
```
Error: Command "turbo run build" exited with 2
```

## ✅ ÇÖZÜM

Vercel Dashboard'da build command'ı override edilmiş olabilir. Şu adımları izle:

### Adım 1: Vercel Dashboard'da Build Ayarlarını Kontrol Et

1. https://vercel.com/dashboard adresine git
2. Projeni seç: **basisdeploy**
3. **Settings** → **General** sekmesi
4. **Build & Development Settings** bölümünde:

**Şu ayarları yap:**

- **Root Directory**: `apps/web` (veya boş bırak)
- **Build Command**: `npm install && npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Development Command**: `npm run dev`

**ÖNEMLİ**: Eğer "Root Directory" `apps/web` ise, build command sadece `npm run build` olmalı (çünkü zaten apps/web içindesin).

### Adım 2: Root Directory Ayarları

**Seçenek A**: Root Directory = `apps/web`
- Build Command: `npm run build`
- Output Directory: `.next`

**Seçenek B**: Root Directory = `.` (root)
- Build Command: `cd apps/web && npm install && npm run build`
- Output Directory: `apps/web/.next`

### Adım 3: Değişiklikleri Kaydet ve Redeploy

1. **Save** butonuna tıkla
2. **Deployments** sekmesine git
3. En son deployment'ı seç → **⋮** (üç nokta) → **Redeploy**

VEYA terminal'den:

```bash
npx vercel --prod
```

---

## 📝 YAPILAN DEĞİŞİKLİKLER

1. ✅ **`packages/core-domain/src/enums/index.ts`**: `RelationshipQuality` enum'u eklendi
2. ✅ **`apps/web/vercel.json`**: Netlify URL güncellendi (`https://rentorgin-api.netlify.app`)

---

## 🔍 KONTROL

Deploy sonrası:
1. Build başarılı olmalı
2. Frontend: https://basisdeploy.vercel.app
3. API çağrıları: Network tab'de `https://rentorgin-api.netlify.app/api/v1/...` adresine gitmeli
