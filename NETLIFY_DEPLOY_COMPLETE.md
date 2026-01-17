# 🚀 NETLIFY FUNCTIONS DEPLOY RAPORU

## 1. BACKEND DURUM RAPORU

### Backend Konumu ve Stack
- **Konum**: `apps/api/`
- **Stack**: NestJS 10.4.0 (Express tabanlı uzun yaşayan server)
- **Database**: PostgreSQL + Prisma
- **Build**: `npm run build` → `dist/`
- **Start**: `npm run start:prod` → `node dist/main`
- **Port**: `process.env.PORT || process.env.API_PORT || 3001`
- **Health Endpoint**: `/api/v1/health` (mevcut, `apps/api/src/app.controller.ts:28`)

### Production'da Neden Çalışmıyor? (Kanıtlar)

**KÖK NEDEN**: Backend NestJS uzun yaşayan server, Railway trial bitti, ücretsiz alternatif gerekiyor.

**Kanıtlar**:
1. `apps/api/src/main.ts:128` → `app.listen(port, '0.0.0.0')` - Express server başlatıyor
2. `apps/api/package.json:10` → `"start:prod": "node dist/main"` - Uzun yaşayan process
3. Websocket yok, sadece HTTP REST API (grep sonucu: websocket bulunamadı)
4. Background job'lar var ama async HTTP pattern (translation service)
5. Prisma kullanıyor (database ORM)

**Ek Sorunlar**:
- Frontend `NEXT_PUBLIC_API_URL` production'da set edilmemiş (`apps/web/src/lib/api.ts:11`)
- CORS sadece `FRONTEND_URL` env'den alıyor, Netlify domain'leri allowlist'te yok

---

## 2. SEÇİLEN ÜCRETSİZ DEPLOY HEDEFİ

### Platform: Netlify Functions

**Gerekçe**:
1. ✅ **Tamamen ücretsiz** - Kredi kartı zorunlu değil, free tier yeterli
2. ✅ **NestJS uyumlu** - `serverless-http` ile wrap edilebilir (minimal değişiklik)
3. ✅ **Prisma destekler** - AWS Lambda runtime'da çalışır
4. ✅ **Ücretsiz plan**: 125K requests/ay, 100GB bandwidth/ay
5. ✅ **AWS Lambda uyumlu** - NestJS Express app'i serverless handler'a dönüştürülebilir
6. ✅ **Database**: Netlify Postgres (ücretsiz) veya external (Supabase, Neon) kullanılabilir

**Alternatifler neden seçilmedi**:
- **Vercel Functions**: NestJS için özel adapter gerekir, daha kompleks
- **Cloudflare Workers**: Prisma uyumlu değil (native binary gerektirir)
- **Render/Railway**: Trial/ücretli plan gerektirir

---

## 3. YAPILAN DEĞİŞİKLİKLER

### `apps/api/src/serverless.ts` (YENİ)
- ✅ Serverless bootstrap fonksiyonu oluşturuldu
- ✅ NestJS app'i Express adapter ile oluşturuyor (server başlatmadan)
- ✅ CORS güncellendi: `*.netlify.app` domain'leri allowlist'e eklendi
- ✅ Tüm middleware'ler (helmet, validation, exception filter) korundu

### `netlify/functions/api.ts` (YENİ)
- ✅ Netlify serverless function handler oluşturuldu
- ✅ `serverless-http` ile Express app wrap edildi
- ✅ App instance cache'lendi (performance için)
- ✅ Binary content types tanımlandı (image, PDF)

### `netlify.toml` (YENİ)
- ✅ Build command: monorepo için root'tan build
- ✅ Functions directory: `netlify/functions`
- ✅ Redirect rule: `/api/*` → `/.netlify/functions/api`
- ✅ Node version: 20
- ✅ Included files: `apps/api/dist/**` ve `packages/**`

### `apps/api/package.json`
- ✅ `serverless-http` dependency eklendi

### `apps/web/vercel.json`
- ✅ Rewrite rule eklendi: `/api/*` → Netlify backend (opsiyonel, env variable tercih edilir)

### `.gitignore`
- ✅ `.netlify/` eklendi

### `apps/api/.env.example`
- ✅ Netlify Functions için güncellendi
- ✅ Storage path: `/tmp` (Lambda temp directory)
- ✅ Tüm env variable'lar dokümante edildi

---

## 4. RUN THESE COMMANDS (MAC/zsh)

```bash
# ============================================
# ADIM 0: Proje hazırlığı
# ============================================
cd /Users/tugra/Desktop/rentorgin

# Dependencies yükle (serverless-http eklendi)
npm install

# Değişiklikleri commit et
git add .
git commit -m "feat: migrate backend to Netlify Functions"

# ============================================
# ADIM 1: Netlify CLI Kurulumu ve Login
# ============================================
# Netlify CLI'yi kur (npx kullanarak)
npx netlify-cli login
# Browser açılacak, GitHub ile login ol

# ============================================
# ADIM 2: Netlify Site Oluştur
# ============================================
# Netlify site oluştur (backend için)
npx netlify-cli init
# Sorular:
# ✓ Create & configure a new site? → Yes
# ✓ Team: (Hesabını seç)
# ✓ Site name? → rentorgin-api (veya istediğin isim)
# ✓ Build command: npm install && npm run build --workspace=apps/api
# ✓ Directory to deploy: .netlify (veya boş bırak)
# ✓ Netlify functions folder: netlify/functions

# Site URL'ini not et (örn: https://rentorgin-api.netlify.app)
# BACKEND_URL="https://YOUR-SITE-NAME.netlify.app"

# ============================================
# ADIM 3: Database Setup (Netlify Postgres veya External)
# ============================================
# Seçenek 1: Netlify Postgres (ücretsiz, Netlify dashboard'dan ekle)
# Netlify Dashboard → Add-ons → Postgres → Add

# Seçenek 2: External PostgreSQL (Supabase, Neon, vb.)
# DATABASE_URL'i aşağıdaki adımda environment variable olarak ekle

# ============================================
# ADIM 4: Environment Variables (Netlify Dashboard)
# ============================================
# Netlify Dashboard: https://app.netlify.com
# Projeni seç → Site settings → Environment variables → Add variable

# Şu değişkenleri ekle:

# Database (REQUIRED)
DATABASE_URL=postgresql://user:password@host:5432/dbname?schema=public
# (Netlify Postgres kullanıyorsan otomatik eklenir)

# Frontend URL (REQUIRED for CORS)
FRONTEND_URL=https://basisdeploy.vercel.app
# (Vercel frontend URL'ini buraya yaz)

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
STORAGE_PATH=/tmp
MAX_UPLOAD_SIZE=52428800

# (OpenAI API key varsa ekle, yoksa boş bırak)
OPENAI_API_KEY=

# ============================================
# ADIM 5: Backend Deploy
# ============================================
# Netlify'ye deploy et
npx netlify-cli deploy --prod

# VEYA otomatik deploy için GitHub'a push et:
git push origin main
# Netlify otomatik olarak deploy edecek (eğer GitHub entegrasyonu yaptıysan)

# ============================================
# ADIM 6: Backend Health Check
# ============================================
# Backend URL'ini test et
curl https://YOUR-SITE-NAME.netlify.app/api/v1/health
# Beklenen: {"status":"healthy","uptime":...,"timestamp":...,"environment":"production"}

# API docs kontrolü
curl https://YOUR-SITE-NAME.netlify.app/api/docs
# Swagger UI görünmeli

# ============================================
# ADIM 7: Frontend Environment Variable (Vercel)
# ============================================
# Vercel Dashboard: https://vercel.com/dashboard
# Projeni seç (basisdeploy) → Settings → Environment Variables

# Şu değişkeni ekle:
# Name: NEXT_PUBLIC_API_URL
# Value: https://YOUR-SITE-NAME.netlify.app/api/v1
# (Netlify URL'ini yukarıda not ettiğin URL ile değiştir, /api/v1 suffix'i unutma!)
# Environment: Production, Preview, Development (hepsini seç)

# ============================================
# ADIM 8: Frontend Redeploy
# ============================================
cd /Users/tugra/Desktop/rentorgin
npx vercel --prod

# VEYA Vercel Dashboard → Deployments → En son deployment → ⋮ → Redeploy

# ============================================
# ✅ DEPLOY TAMAMLANDI!
# ============================================
# Kontrol et:
# 1. Backend Health: https://YOUR-SITE-NAME.netlify.app/api/v1/health
# 2. Backend Docs: https://YOUR-SITE-NAME.netlify.app/api/docs
# 3. Frontend: https://basisdeploy.vercel.app
# 4. Frontend'den API çağrısı yap (Network tab'de kontrol et)
```

---

## 5. POST-DEPLOY CHECKLIST

### ✅ Backend Kontrolleri

1. **Health Endpoint**
   ```bash
   curl https://YOUR-SITE-NAME.netlify.app/api/v1/health
   ```
   Beklenen: `{"status":"healthy",...}`

2. **CORS Ayarları**
   - Vercel frontend'den API çağrısı yap
   - Browser console'da CORS hatası olmamalı
   - Network tab'de request başarılı olmalı (200 OK)

3. **Environment Variables**
   - Netlify Dashboard → Site settings → Environment variables
   - `DATABASE_URL`, `FRONTEND_URL`, `JWT_SECRET`, `SESSION_SECRET` set edilmeli

4. **Database Connection**
   - Netlify Functions logs'da "✅ Database connected" mesajı görünmeli
   - Migration'lar çalıştırılmış olmalı (local'de veya Netlify CLI ile)

5. **Logs**
   - Netlify Dashboard → Functions → Logs
   - Hata mesajı olmamalı
   - Function invocation başarılı olmalı

### ✅ Frontend Kontrolleri

1. **Environment Variable**
   - Vercel Dashboard → Settings → Environment Variables
   - `NEXT_PUBLIC_API_URL` set edilmeli ve Netlify backend URL'ini içermeli

2. **API Çağrıları**
   - Frontend'i aç (Vercel URL)
   - Browser DevTools → Network tab
   - Login sayfasında backend health check çağrısı başarılı olmalı
   - API çağrıları `https://YOUR-SITE-NAME.netlify.app/api/v1/...` adresine gitmeli

3. **Authentication**
   - Login yapmayı dene
   - Token localStorage'a kaydedilmeli
   - Sonraki API çağrıları Authorization header ile yapılmalı

---

## 🔧 TROUBLESHOOTING

### Problem: Netlify Function timeout
**Çözüm**: Netlify free tier'da 10s timeout var. Cold start için ilk request yavaş olabilir. Function'ı warm tutmak için health endpoint'i periyodik çağır.

### Problem: Prisma connection error
**Çözüm**: 
1. `DATABASE_URL` doğru mu kontrol et
2. Database migration'ları çalıştır: `npx prisma migrate deploy`
3. Netlify Functions'da connection pooling kullan (Prisma otomatik yapar)

### Problem: CORS hatası
**Çözüm**:
1. Netlify'de `FRONTEND_URL` doğru mu kontrol et (Vercel URL)
2. Vercel URL'i `https://` ile başlamalı
3. Backend logs'da "Blocked CORS request" mesajı varsa origin'i kontrol et

### Problem: Function build hatası
**Çözüm**:
1. `netlify.toml` build command doğru mu kontrol et
2. `apps/api/dist` klasörü oluşuyor mu: `npm run build --workspace=apps/api`
3. Netlify logs'da build hatası var mı kontrol et

---

## 📝 NOTLAR

- **Netlify Free Tier**: 125K requests/ay, 100GB bandwidth/ay, 10s function timeout
- **Database**: Netlify Postgres (ücretsiz) veya external (Supabase, Neon) kullanılabilir
- **Cold Start**: İlk request ~2-5s sürebilir (Lambda cold start)
- **Storage**: `/tmp` directory kullan (Lambda temp, 512MB limit)
- **Environment Variables**: Asla production secret'ları commit etme

---

## 🎯 NETLIFY vs RAILWAY KARŞILAŞTIRMA

| Özellik | Netlify Functions | Railway |
|---------|-------------------|---------|
| **Ücret** | ✅ Tamamen ücretsiz | ❌ Trial bitti, ücretli |
| **Kredi kartı** | ❌ Gerekmez | ✅ Gerekir |
| **NestJS uyumluluk** | ✅ serverless-http ile | ✅ Native |
| **Prisma desteği** | ✅ Var | ✅ Var |
| **Cold start** | ⚠️ ~2-5s | ✅ Yok |
| **Timeout** | ⚠️ 10s (free) | ✅ Yok |
| **Database** | ⚠️ External gerekir | ✅ Dahil |

**Sonuç**: Netlify Functions ücretsiz ve çalışır, ancak cold start ve timeout limitleri var. Production için yeterli.
