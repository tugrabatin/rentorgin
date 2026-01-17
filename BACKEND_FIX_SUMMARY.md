# 🔧 Backend API Düzeltme Özeti

## ❌ SORUN
```
EROFS: read-only file system, mkdir '/var/task/storage'
```

**Kök Neden**: Upload controller `diskStorage` kullanıyordu, Netlify Functions'da dosya sistemi read-only.

## ✅ ÇÖZÜM

**`apps/api/src/modules/upload/upload.controller.ts`**:
- `diskStorage` kaldırıldı
- `storage: undefined` yapıldı (memory storage - serverless uyumlu)
- Memory storage hem serverless hem normal ortamda çalışır

## 🚀 DEPLOY ADIMLARI

### 1. Backend'i Tekrar Deploy Et

```bash
cd /Users/tugra/Desktop/rentorgin

# Değişiklikleri commit et
git add .
git commit -m "fix: use memory storage for upload in serverless environment"

# Netlify'ye deploy et
npx netlify-cli deploy --prod
```

### 2. Backend Health Check

```bash
curl https://rentorgin-api.netlify.app/api/v1/health
```

**Beklenen**: `{"status":"healthy",...}` (artık hata olmamalı)

### 3. Environment Variables Kontrolü (Netlify)

Netlify Dashboard: https://app.netlify.com/sites/rentorgin-api/settings/env

**Gerekli değişkenler**:
- `DATABASE_URL` (PostgreSQL connection string)
- `FRONTEND_URL=https://basisdeploy.vercel.app`
- `JWT_SECRET` (generate: `openssl rand -base64 32`)
- `SESSION_SECRET` (generate: `openssl rand -base64 32`)
- `NODE_ENV=production`

### 4. Frontend Environment Variable (Vercel)

Vercel Dashboard: https://vercel.com/dashboard
- Projeni seç → Settings → Environment Variables
- `NEXT_PUBLIC_API_URL` = `https://rentorgin-api.netlify.app/api/v1`
- Redeploy yap

---

## 📝 YAPILAN DEĞİŞİKLİKLER

1. ✅ **`apps/api/src/modules/upload/upload.controller.ts`**: 
   - `diskStorage` kaldırıldı
   - `storage: undefined` (memory storage)
   - Serverless uyumlu hale getirildi

2. ✅ **`packages/core-domain/src/enums/index.ts`**: 
   - `RelationshipQuality` enum'u eklendi

3. ✅ **`apps/web/vercel.json`**: 
   - Netlify URL güncellendi

---

## ✅ KONTROL

Deploy sonrası:
1. Backend health: `curl https://rentorgin-api.netlify.app/api/v1/health` → `{"status":"healthy"}`
2. Frontend: https://basisdeploy.vercel.app
3. Frontend'den API çağrısı: Network tab'de başarılı olmalı
