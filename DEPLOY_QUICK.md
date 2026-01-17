# 🚀 HIZLI DEPLOY KOMUTLARI (Permission Hatası Çözümlü)

## ⚠️ ÖNEMLİ: Permission Hatası Çözümü

Mac'te `npm install -g` permission hatası veriyorsa, **npx** kullanın (global kurulum gerektirmez).

---

## 📋 TEK SEFERDE DEPLOY KOMUTLARI

### ADIM 1: Frontend (Vercel) - npx ile

```bash
cd /Users/tugra/Desktop/rentorgin

# Vercel'e login (npx kullanarak, permission hatası yok)
npx vercel login

# Frontend deploy
npx vercel

# İlk deploy'ta sorular:
# ✓ Set up and deploy? → Y
# ✓ Which scope? → (Hesabını seç)
# ✓ Link to existing project? → N
# ✓ Project name? → rentorgin-web
# ✓ Directory? → ./apps/web
# ✓ Override settings? → Y
#   - Build Command: npm run build --workspace=apps/web
#   - Output Directory: .next
#   - Install Command: npm install
#   - Development Command: npm run dev --workspace=apps/web

# Production deploy
npx vercel --prod

# Vercel URL'ini not et (örn: https://rentorgin-web.vercel.app)
```

### ADIM 2: Backend (Railway) - npx ile

```bash
# Railway'e login (npx kullanarak)
npx @railway/cli login

# Railway projesi oluştur
npx @railway/cli init
# Sorular:
# ✓ Project name? → rentorgin-api
# ✓ Environment? → production

# PostgreSQL database ekle
npx @railway/cli add postgresql

# Backend service deploy
cd apps/api
npx @railway/cli link
npx @railway/cli up

# Railway URL'ini not et (Settings → Generate Domain)
# Örnek: https://rentorgin-api-production.up.railway.app
```

### ADIM 3: Environment Variables

#### Railway Dashboard (https://railway.app/dashboard)

Variables sekmesine şunları ekle:

```bash
FRONTEND_URL=https://YOUR_VERCEL_URL.vercel.app
JWT_SECRET=$(openssl rand -base64 32)
SESSION_SECRET=$(openssl rand -base64 32)
NODE_ENV=production
APP_ENV=production
APP_VERSION=0.4.0
APP_NAME=RentOrgin
RATE_LIMIT_TTL=60
RATE_LIMIT_MAX=100
STORAGE_PATH=./storage/uploads
MAX_UPLOAD_SIZE=52428800
```

**Not**: `DATABASE_URL` otomatik olarak Railway tarafından eklenir.

#### Vercel Dashboard (https://vercel.com/dashboard)

Settings → Environment Variables → Add:

```
NEXT_PUBLIC_API_URL=https://YOUR_RAILWAY_URL.up.railway.app/api/v1
```

Sonra redeploy:
```bash
npx vercel --prod
```

### ADIM 4: Database Migration

```bash
cd /Users/tugra/Desktop/rentorgin/apps/api
npx @railway/cli run npx prisma migrate deploy
```

---

## ✅ KONTROL

1. **Frontend**: https://YOUR_VERCEL_URL.vercel.app
2. **Backend Health**: https://YOUR_RAILWAY_URL.up.railway.app/api/v1/health
3. **Backend Docs**: https://YOUR_RAILWAY_URL.up.railway.app/api/docs

---

## 🔧 ALTERNATIF: Sudo ile Global Kurulum (İsterseniz)

Eğer yine de global kurulum istiyorsanız:

```bash
# Sudo ile kur (şifre isteyecek)
sudo npm install -g vercel
sudo npm install -g @railway/cli

# Sonra normal komutları kullan
vercel login
railway login
```

**Ancak npx kullanmanızı öneririm** - daha güvenli ve permission sorunu yok.

---

## 📝 NOTLAR

- **npx**: Her seferinde en son versiyonu kullanır, global kurulum gerektirmez
- **Permission hatası**: npx ile çözülür
- **Railway free tier**: Aylık $5 kredi
- **Vercel free tier**: Sınırsız bandwidth
