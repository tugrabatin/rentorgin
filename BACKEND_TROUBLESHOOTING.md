# 🔧 Backend API Çalışmıyor - Sorun Giderme

## ❌ HATA
```
Backend API çalışmıyor
Backend servisine bağlanılamıyor. Lütfen backend API'yi başlatın.
```

## 🔍 TEŞHİS ADIMLARI

### 1. Backend Health Check

Terminal'de test et:

```bash
curl https://rentorgin-api.netlify.app/api/v1/health
```

**Beklenen**: `{"status":"healthy",...}`

**Eğer hata alırsan**:
- 404: Function path yanlış veya deploy edilmemiş
- 500: Environment variables eksik (DATABASE_URL, JWT_SECRET, vb.)
- Timeout: Function cold start sorunu

### 2. Frontend Environment Variable Kontrolü

**Vercel Dashboard**: https://vercel.com/dashboard
- Projeni seç → Settings → Environment Variables
- `NEXT_PUBLIC_API_URL` var mı kontrol et
- Value: `https://rentorgin-api.netlify.app/api/v1` olmalı

**Browser Console'da kontrol et**:
```javascript
console.log(process.env.NEXT_PUBLIC_API_URL);
// Beklenen: https://rentorgin-api.netlify.app/api/v1
// Eğer undefined veya localhost ise → Environment variable set edilmemiş
```

### 3. Netlify Functions Logs Kontrolü

**Netlify Dashboard**: https://app.netlify.com/sites/rentorgin-api/logs/functions
- Function invocation'ları kontrol et
- Hata mesajları var mı bak

### 4. Netlify Environment Variables Kontrolü

**Netlify Dashboard**: https://app.netlify.com/sites/rentorgin-api/settings/env

**Gerekli değişkenler**:
- `DATABASE_URL` (REQUIRED)
- `FRONTEND_URL` (CORS için)
- `JWT_SECRET` (REQUIRED)
- `SESSION_SECRET` (REQUIRED)
- `NODE_ENV=production`

---

## ✅ ÇÖZÜMLER

### Çözüm 1: Environment Variables Ekle (Netlify)

1. Netlify Dashboard → Site settings → Environment variables
2. Şu değişkenleri ekle:

```
DATABASE_URL=postgresql://user:password@host:5432/dbname?schema=public
FRONTEND_URL=https://basisdeploy.vercel.app
JWT_SECRET=<openssl rand -base64 32>
SESSION_SECRET=<openssl rand -base64 32>
NODE_ENV=production
APP_ENV=production
APP_VERSION=0.4.0
APP_NAME=RentOrgin
RATE_LIMIT_TTL=60
RATE_LIMIT_MAX=100
STORAGE_PATH=/tmp
MAX_UPLOAD_SIZE=52428800
```

3. **Redeploy**: Deployments → En son deployment → Redeploy

### Çözüm 2: Frontend Environment Variable Ekle (Vercel)

1. Vercel Dashboard → Settings → Environment Variables
2. Add:
   - Key: `NEXT_PUBLIC_API_URL`
   - Value: `https://rentorgin-api.netlify.app/api/v1`
   - Environment: Production, Preview, Development
3. **Redeploy**: Deployments → Redeploy

### Çözüm 3: Database Connection

Eğer `DATABASE_URL` eksikse veya yanlışsa:

**Ücretsiz PostgreSQL seçenekleri**:
1. **Supabase** (önerilen): https://supabase.com
   - Free tier: 500MB database
   - Connection string: `postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres`
2. **Neon**: https://neon.tech
   - Free tier: 3GB database
3. **Netlify Postgres**: Netlify Dashboard → Add-ons → Postgres

**Database Migration**:
```bash
# Local'de migration çalıştır (database URL'i set et)
cd apps/api
DATABASE_URL="your-connection-string" npx prisma migrate deploy
```

---

## 🧪 TEST KOMUTLARI

### Backend Test

```bash
# Health check
curl https://rentorgin-api.netlify.app/api/v1/health

# API root
curl https://rentorgin-api.netlify.app/api/v1

# Swagger docs
curl https://rentorgin-api.netlify.app/api/docs
```

### Frontend Test

Browser'da:
1. DevTools → Console
2. Şunu çalıştır:
```javascript
fetch('https://rentorgin-api.netlify.app/api/v1/health')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error);
```

---

## 📝 HIZLI KONTROL LİSTESİ

- [ ] Netlify'de `DATABASE_URL` set edilmiş mi?
- [ ] Netlify'de `JWT_SECRET` set edilmiş mi?
- [ ] Netlify'de `FRONTEND_URL` set edilmiş mi?
- [ ] Vercel'de `NEXT_PUBLIC_API_URL` set edilmiş mi?
- [ ] Backend health endpoint çalışıyor mu? (`curl https://rentorgin-api.netlify.app/api/v1/health`)
- [ ] Frontend redeploy edildi mi? (Environment variable ekledikten sonra)
- [ ] Netlify Functions logs'da hata var mı?

---

## 🔗 FAYDALI LİNKLER

- Netlify Functions Logs: https://app.netlify.com/sites/rentorgin-api/logs/functions
- Netlify Environment Variables: https://app.netlify.com/sites/rentorgin-api/settings/env
- Vercel Environment Variables: https://vercel.com/dashboard → Projen → Settings → Environment Variables
