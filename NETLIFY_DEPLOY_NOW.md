# 🚀 Netlify Deploy - Site Not Found Çözümü

## ❌ HATA
```
Site not found
Looks like you followed a broken link or entered a URL that doesn't exist on Netlify.
```

## ✅ ÇÖZÜM

Site oluşturuldu ama henüz deploy edilmedi. Şimdi deploy et:

### Adım 1: Deploy Et

```bash
cd /Users/tugra/Desktop/rentorgin

# Production deploy
npx netlify-cli deploy --prod
```

Bu komut:
1. Build yapacak (`npm install && npm run build --workspace=apps/api`)
2. Functions'ı hazırlayacak
3. Netlify'ye upload edecek

### Adım 2: Build Başarılı mı Kontrol Et

Eğer build hatası alırsan:

```bash
# Önce local'de build test et
npm install
npm run build --workspace=apps/api

# Eğer hata varsa, serverless-http yüklü mü kontrol et
cd apps/api
npm list serverless-http
```

### Adım 3: Environment Variables Ekle (ÖNEMLİ!)

Deploy sonrası Netlify Dashboard'dan environment variables ekle:

1. https://app.netlify.com/sites/rentorgin-api/settings/env
2. Şu değişkenleri ekle:

```
DATABASE_URL=postgresql://user:password@host:5432/dbname?schema=public
FRONTEND_URL=https://basisdeploy.vercel.app
JWT_SECRET=<openssl rand -base64 32 ile oluştur>
SESSION_SECRET=<openssl rand -base64 32 ile oluştur>
NODE_ENV=production
APP_ENV=production
APP_VERSION=0.4.0
APP_NAME=RentOrgin
RATE_LIMIT_TTL=60
RATE_LIMIT_MAX=100
STORAGE_PATH=/tmp
MAX_UPLOAD_SIZE=52428800
```

### Adım 4: Health Check

Deploy sonrası:

```bash
curl https://rentorgin-api.netlify.app/api/v1/health
```

Beklenen: `{"status":"healthy",...}`

---

## 🔧 TROUBLESHOOTING

### Problem: Build hatası
**Çözüm**: 
```bash
# Local'de test et
npm install
npm run build --workspace=apps/api
```

### Problem: Function not found
**Çözüm**: 
- `netlify/functions/api.ts` dosyası var mı kontrol et
- `netlify.toml` içinde `functions = "netlify/functions"` olduğundan emin ol

### Problem: Module not found
**Çözüm**: 
- `serverless-http` yüklü mü: `npm list serverless-http`
- Eğer yoksa: `cd apps/api && npm install serverless-http`

---

## 📝 HIZLI DEPLOY KOMUTLARI

```bash
# 1. Deploy
npx netlify-cli deploy --prod

# 2. Logs kontrol
npx netlify-cli logs:function api

# 3. Health check
curl https://rentorgin-api.netlify.app/api/v1/health
```
