# 🚀 BACKEND DEPLOY RAPORU

## 1. BACKEND DURUM RAPORU

### Backend Konumu ve Stack
- **Konum**: `apps/api/`
- **Stack**: NestJS 10.4.0 (Express tabanlı)
- **Database**: PostgreSQL + Prisma
- **Build Command**: `npm run build` (apps/api içinde)
- **Start Command**: `npm run start:prod` → `node dist/main`
- **Port**: `process.env.PORT || process.env.API_PORT || 3001`
- **Health Endpoint**: `/api/v1/health` (✅ mevcut)

### Vercel'de Neden Çalışmıyor? (Kanıtlar)

**KÖK NEDEN**: Backend NestJS uzun yaşayan server, Vercel serverless functions'a uygun değil.

**Kanıtlar**:
1. `apps/api/src/main.ts:106` → `app.listen(port)` - Express server başlatıyor
2. `apps/api/package.json:10` → `"start:prod": "node dist/main"` - Uzun yaşayan process
3. Vercel serverless functions request/response handler bekler, sürekli çalışan server değil
4. Frontend `NEXT_PUBLIC_API_URL` env variable kullanıyor (`apps/web/src/lib/api.ts:11`) ama production'da set edilmemiş

**Ek Sorunlar**:
- CORS sadece `FRONTEND_URL` env'den alıyor, Vercel domain'leri allowlist'te yok
- `0.0.0.0` bind yok (production deployment için gerekli)
- Railway.json build command monorepo için yanlış

---

## 2. SEÇİLEN DEPLOY HEDEFİ

### Platform: Railway.app

**Gerekçe**:
1. ✅ NestJS uzun yaşayan server'ları destekler
2. ✅ PostgreSQL dahil (tek platform)
3. ✅ Ücretsiz $5/ay kredi (düşük trafik için yeterli)
4. ✅ Otomatik deploy (GitHub entegrasyonu)
5. ✅ Environment variables yönetimi kolay
6. ✅ Monorepo desteği (root'tan build)

**Alternatifler neden seçilmedi**:
- **Render**: Uyku modu var (free tier), ilk request yavaş
- **Fly.io**: Daha kompleks setup, Railway daha basit
- **Vercel Serverless**: NestJS için uygun değil (yeniden yazma gerekir)

---

## 3. YAPILAN DEĞİŞİKLİKLER

### `apps/api/src/main.ts`
- ✅ `0.0.0.0` bind eklendi (production deployment için)
- ✅ CORS güncellendi: `*.vercel.app` domain'leri allowlist'e eklendi
- ✅ Production logging iyileştirildi (host bilgisi eklendi)
- ✅ Health endpoint URL log'a eklendi

### `railway.json`
- ✅ Build command düzeltildi: `npm run build --workspace=apps/api` (monorepo için root'tan)
- ✅ Start command korundu: `cd apps/api && npm run start:prod`

### `apps/api/.env.example`
- ✅ Tüm env variable'lar dokümante edildi
- ✅ Hangi modülde kullanıldığı belirtildi
- ✅ Railway otomatik sağladığı değişkenler not edildi

### `apps/web/.env.example`
- ✅ Production backend URL formatı açıklandı
- ✅ `/api/v1` suffix zorunluluğu belirtildi

---

## 4. RUN THESE COMMANDS (MAC/zsh)

```bash
# ============================================
# ADIM 0: Proje hazırlığı
# ============================================
cd /Users/tugra/Desktop/rentorgin

# Değişiklikleri commit et
git add .
git commit -m "feat: prepare backend for Railway deployment"

# ============================================
# ADIM 1: Railway CLI Kurulumu ve Login
# ============================================
# Railway CLI'yi kur (npx kullanarak, permission hatası yok)
npx @railway/cli login
# Browser açılacak, GitHub ile login ol

# ============================================
# ADIM 2: Railway Projesi ve PostgreSQL Oluştur
# ============================================
# Railway projesi oluştur
npx @railway/cli init
# Sorular:
# ✓ Project name? → rentorgin-api
# ✓ Environment? → production

# PostgreSQL database ekle
npx @railway/cli add postgresql

# Database URL'ini al (otomatik olarak DATABASE_URL env var olarak eklenir)
npx @railway/cli variables | grep DATABASE_URL

# ============================================
# ADIM 3: Backend Service Deploy
# ============================================
# API dizinine git
cd apps/api

# Railway service'i link et
npx @railway/cli link

# Deploy et
npx @railway/cli up

# Railway URL'ini al (Settings → Generate Domain veya mevcut domain)
# Örnek: https://rentorgin-api-production.up.railway.app
# Bu URL'i not et: BACKEND_URL="https://YOUR-RAILWAY-URL.up.railway.app"

# ============================================
# ADIM 4: Environment Variables Ayarlama (Railway Dashboard)
# ============================================
# Railway Dashboard: https://railway.app/dashboard
# Projeni seç → Variables sekmesi → Add Variable

# Şu değişkenleri ekle (DATABASE_URL otomatik eklenir):

# Frontend URL (Vercel deployment URL'in)
FRONTEND_URL=https://basisdeploy.vercel.app
# (Vercel URL'ini yukarıda not ettiğin URL ile değiştir)

# Authentication secrets (terminal'de generate et)
JWT_SECRET=$(openssl rand -base64 32)
SESSION_SECRET=$(openssl rand -base64 32)

# Diğer gerekli değişkenler
NODE_ENV=production
APP_ENV=production
APP_VERSION=0.4.0
APP_NAME=RentOrgin
RATE_LIMIT_TTL=60
RATE_LIMIT_MAX=100
STORAGE_PATH=./storage/uploads
MAX_UPLOAD_SIZE=52428800

# (OpenAI API key varsa ekle, yoksa boş bırak)
OPENAI_API_KEY=

# ============================================
# ADIM 5: Database Migration
# ============================================
# Railway'de migration çalıştır
cd /Users/tugra/Desktop/rentorgin/apps/api
npx @railway/cli run npx prisma migrate deploy

# ============================================
# ADIM 6: Backend Health Check
# ============================================
# Backend URL'ini test et (BACKEND_URL değişkenini kullan)
curl https://YOUR-RAILWAY-URL.up.railway.app/api/v1/health
# Beklenen: {"status":"healthy","uptime":...,"timestamp":...,"environment":"production"}

# ============================================
# ADIM 7: Frontend Environment Variable (Vercel)
# ============================================
# Vercel Dashboard: https://vercel.com/dashboard
# Projeni seç (basisdeploy) → Settings → Environment Variables

# Şu değişkeni ekle:
# Name: NEXT_PUBLIC_API_URL
# Value: https://YOUR-RAILWAY-URL.up.railway.app/api/v1
# (Railway URL'ini yukarıda not ettiğin URL ile değiştir, /api/v1 suffix'i unutma!)

# Environment: Production, Preview, Development (hepsini seç)

# ============================================
# ADIM 8: Frontend Redeploy
# ============================================
cd /Users/tugra/Desktop/rentorgin

# Vercel'de redeploy
npx vercel --prod

# VEYA Vercel Dashboard → Deployments → En son deployment → ⋮ → Redeploy

# ============================================
# ✅ DEPLOY TAMAMLANDI!
# ============================================
# Kontrol et:
# 1. Backend Health: https://YOUR-RAILWAY-URL.up.railway.app/api/v1/health
# 2. Backend Docs: https://YOUR-RAILWAY-URL.up.railway.app/api/docs
# 3. Frontend: https://basisdeploy.vercel.app
# 4. Frontend'den API çağrısı yap (Network tab'de kontrol et)
```

---

## 5. POST-DEPLOY CHECKLIST

### ✅ Backend Kontrolleri

1. **Health Endpoint**
   ```bash
   curl https://YOUR-RAILWAY-URL.up.railway.app/api/v1/health
   ```
   Beklenen: `{"status":"healthy",...}`

2. **CORS Ayarları**
   - Vercel frontend'den API çağrısı yap
   - Browser console'da CORS hatası olmamalı
   - Network tab'de request başarılı olmalı (200 OK)

3. **Environment Variables**
   - Railway Dashboard → Variables → Tüm gerekli değişkenler set edilmeli
   - `DATABASE_URL`, `FRONTEND_URL`, `JWT_SECRET`, `SESSION_SECRET` özellikle kontrol et

4. **Database Connection**
   - Railway logs'da "✅ Database connected" mesajı görünmeli
   - Migration'lar çalıştırılmış olmalı

5. **Logs**
   - Railway Dashboard → Deployments → Logs
   - "🚀 BASIS API is running!" mesajı görünmeli
   - Hata mesajı olmamalı

### ✅ Frontend Kontrolleri

1. **Environment Variable**
   - Vercel Dashboard → Settings → Environment Variables
   - `NEXT_PUBLIC_API_URL` set edilmeli ve doğru backend URL'ini içermeli

2. **API Çağrıları**
   - Frontend'i aç (Vercel URL)
   - Browser DevTools → Network tab
   - Login sayfasında backend health check çağrısı başarılı olmalı
   - API çağrıları `https://YOUR-RAILWAY-URL.up.railway.app/api/v1/...` adresine gitmeli

3. **Authentication**
   - Login yapmayı dene
   - Token localStorage'a kaydedilmeli
   - Sonraki API çağrıları Authorization header ile yapılmalı

---

## 🔧 TROUBLESHOOTING

### Problem: Backend health endpoint 404 döndürüyor
**Çözüm**: URL'de `/api/v1/health` olduğundan emin ol (global prefix var)

### Problem: CORS hatası
**Çözüm**: 
1. Railway'de `FRONTEND_URL` doğru mu kontrol et
2. Vercel URL'i `https://` ile başlamalı
3. Backend logs'da "Blocked CORS request" mesajı varsa origin'i kontrol et

### Problem: Database connection hatası
**Çözüm**:
1. Railway'de PostgreSQL servisi çalışıyor mu kontrol et
2. `DATABASE_URL` env variable set edilmiş mi kontrol et
3. Migration'lar çalıştırıldı mı: `npx @railway/cli run npx prisma migrate deploy`

### Problem: Frontend API'ye bağlanamıyor
**Çözüm**:
1. Vercel'de `NEXT_PUBLIC_API_URL` doğru mu kontrol et (Railway URL + `/api/v1`)
2. Browser console'da network error var mı kontrol et
3. Backend health endpoint'i direkt browser'da açılabilir mi kontrol et

---

## 📝 NOTLAR

- **Railway Free Tier**: Aylık $5 kredi, düşük trafik için yeterli
- **Database**: Railway PostgreSQL free tier'da 1GB storage
- **Environment Variables**: Asla production secret'ları commit etme
- **CORS**: `*.vercel.app` domain'leri otomatik allowlist'te (production'da)
- **Health Endpoint**: `/api/v1/health` (global prefix nedeniyle)
