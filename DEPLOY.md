# 🚀 Deploy Guide - RentOrgin

Bu doküman, RentOrgin projesini ücretsiz platformlara deploy etmek için adım adım talimatlar içerir.

## 📋 Proje Yapısı

- **Frontend**: Next.js 14 (apps/web) → **Vercel** (Hobby/Free tier)
- **Backend**: NestJS (apps/api) → **Railway** veya **Render** (Free tier)
- **Database**: PostgreSQL → Railway/Render ile birlikte sağlanır

## 🎯 Deploy Hedefleri

### Frontend (Next.js) → Vercel
- ✅ Next.js için optimize edilmiş
- ✅ Ücretsiz Hobby planı
- ✅ Otomatik CI/CD
- ✅ Global CDN

### Backend (NestJS) → Railway (Önerilen)
- ✅ Ücretsiz $5 kredi/ay
- ✅ PostgreSQL dahil
- ✅ Otomatik deploy
- ✅ Environment variables yönetimi

**Alternatif**: Render.com (ücretsiz tier, ancak uyku modu var)

## 📦 Ön Hazırlık

### 1. Gerekli Dosyalar Kontrolü

```bash
# .env.example dosyalarının varlığını kontrol et
ls apps/web/.env.example
ls apps/api/.env.example

# .nvmrc kontrolü
cat .nvmrc  # Node 20 olmalı
```

### 2. Git Repository Hazırlığı

```bash
# Git durumunu kontrol et
git status

# Eğer commit yapılmamışsa
git add .
git commit -m "chore: prepare for deployment"
```

## 🚀 DEPLOY ADIMLARI

### ADIM 1: Frontend Deploy (Vercel)

#### 1.1 Vercel CLI Kurulumu ve Login

```bash
# Vercel CLI'yi global olarak kur
npm install -g vercel

# Vercel'e login ol
vercel login
```

#### 1.2 Frontend Deploy

```bash
# Proje root'unda
cd /Users/tugra/Desktop/rentorgin

# Vercel'e projeyi bağla ve deploy et
vercel

# İlk deploy'ta sorular sorulacak:
# - Set up and deploy? Y
# - Which scope? (Hesabını seç)
# - Link to existing project? N
# - Project name? rentorgin-web (veya istediğin isim)
# - Directory? ./apps/web
# - Override settings? Y
#   - Build Command: npm run build --workspace=apps/web
#   - Output Directory: .next
#   - Install Command: npm install
#   - Development Command: npm run dev --workspace=apps/web

# Production deploy
vercel --prod
```

#### 1.3 Environment Variables (Vercel Dashboard)

Vercel dashboard'a git: https://vercel.com/dashboard

1. Projeni seç → Settings → Environment Variables
2. Şu değişkeni ekle:
   - `NEXT_PUBLIC_API_URL` = `https://your-backend-url.railway.app/api/v1` (Backend URL'ini ADIM 2'den sonra ekleyeceksin)

3. Deploy'u yeniden tetikle (Redeploy)

### ADIM 2: Backend Deploy (Railway)

#### 2.1 Railway CLI Kurulumu

```bash
# Railway CLI'yi kur
npm install -g @railway/cli

# Railway'e login ol
railway login
```

#### 2.2 Railway Projesi Oluştur

```bash
# Proje root'unda
cd /Users/tugra/Desktop/rentorgin

# Railway projesi oluştur
railway init

# Sorular:
# - Project name? rentorgin-api
# - Environment? production
```

#### 2.3 PostgreSQL Database Ekle

```bash
# PostgreSQL servisi ekle
railway add postgresql

# Database URL'ini al
railway variables
# DATABASE_URL değişkenini not et
```

#### 2.4 Backend Service Deploy

```bash
# API dizinine git
cd apps/api

# Railway service oluştur
railway link

# Build ve deploy
railway up

# Veya manuel:
railway run npm install
railway run npm run build
railway run npm run start:prod
```

#### 2.5 Environment Variables (Railway Dashboard)

Railway dashboard: https://railway.app/dashboard

1. Projeni seç → Variables sekmesi
2. Şu değişkenleri ekle:

```
API_PORT=3001
API_URL=https://your-service.railway.app
FRONTEND_URL=https://your-frontend.vercel.app
JWT_SECRET=<openssl rand -base64 32 ile oluştur>
JWT_EXPIRATION=15m
REFRESH_TOKEN_EXPIRATION=7d
SESSION_SECRET=<openssl rand -base64 32 ile oluştur>
NODE_ENV=production
APP_ENV=production
APP_VERSION=0.4.0
APP_NAME=RentOrgin
RATE_LIMIT_TTL=60
RATE_LIMIT_MAX=100
STORAGE_PATH=./storage/uploads
MAX_UPLOAD_SIZE=52428800
```

**ÖNEMLİ**: `DATABASE_URL` otomatik olarak Railway tarafından eklenir.

#### 2.6 Backend URL'ini Not Et

Railway dashboard'da:
1. Service'i seç → Settings → Domains
2. Generated domain'i kopyala (örn: `your-service.railway.app`)
3. Bu URL'i Vercel'deki `NEXT_PUBLIC_API_URL` olarak kullan

### ADIM 3: CORS Ayarları

Backend'in `main.ts` dosyasında CORS ayarları production URL'lerini içermeli:

```typescript
const allowedOrigins = [
  process.env.FRONTEND_URL, // Vercel URL'in
  // Diğer production URL'ler
].filter(Boolean);
```

Railway'de `FRONTEND_URL` değişkenini Vercel URL'in ile güncelle.

### ADIM 4: Database Migration

```bash
# Railway'de migration çalıştır
cd apps/api
railway run npx prisma migrate deploy

# Veya Railway dashboard → Service → Deployments → Run Command
# Command: npx prisma migrate deploy
```

## ✅ Deploy Sonrası Kontroller

### Frontend Kontrolü

1. Vercel URL'ini aç
2. Console'da hata var mı kontrol et
3. Network tab'de API çağrıları başarılı mı kontrol et

### Backend Kontrolü

1. `https://your-backend.railway.app/api/v1/health` endpoint'ini test et
2. `https://your-backend.railway.app/api/docs` Swagger docs'u kontrol et

## 🔧 Troubleshooting

### Problem: Frontend API'ye bağlanamıyor

**Çözüm**:
1. Vercel'de `NEXT_PUBLIC_API_URL` doğru mu kontrol et
2. Railway'de backend çalışıyor mu kontrol et
3. CORS ayarlarını kontrol et

### Problem: Database bağlantı hatası

**Çözüm**:
1. Railway'de PostgreSQL servisi çalışıyor mu kontrol et
2. `DATABASE_URL` değişkeni doğru mu kontrol et
3. Migration'lar çalıştırıldı mı kontrol et

### Problem: Build hatası

**Çözüm**:
1. Local'de build çalışıyor mu test et: `npm run build --workspace=apps/web`
2. Node versiyonu doğru mu: `node --version` (20.x olmalı)
3. Dependencies eksik mi: `npm install`

### Problem: Railway'de uygulama başlamıyor

**Çözüm**:
1. Railway logs'u kontrol et: `railway logs`
2. Port doğru mu: `API_PORT=3001` (Railway otomatik port atar, `PORT` env var'ını kullan)
3. Start command doğru mu: `npm run start:prod`

## 📝 Notlar

- **Railway Free Tier**: Aylık $5 kredi, uygun kullanım için yeterli
- **Vercel Free Tier**: Sınırsız bandwidth, production için uygun
- **Database**: Railway PostgreSQL free tier'da 1GB storage
- **Environment Variables**: Asla production secret'ları commit etme

## 🔄 Güncelleme (Update) İşlemi

```bash
# Frontend güncelleme
vercel --prod

# Backend güncelleme
cd apps/api
railway up
```

## 📚 Ek Kaynaklar

- [Vercel Documentation](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [NestJS Deployment](https://docs.nestjs.com/recipes/deployment)
