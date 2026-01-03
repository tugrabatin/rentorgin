# 🚀 GitHub Deployment Rehberi

Bu rehber, RentOrgin projesini GitHub'a deploy etmek için gereken adımları içerir.

## ⚠️ ÖNEMLİ GÜVENLİK UYARILARI

1. **ASLA** `.env` dosyalarını commit etmeyin
2. **ASLA** secret'ları (JWT_SECRET, API keys) kod içine yazmayın
3. GitHub Secrets kullanarak hassas bilgileri saklayın
4. Production database bilgilerini asla public repository'de tutmayın

---

## 📋 Adım 1: GitHub Repository Oluşturma

### Yeni Repository Oluşturma

1. GitHub'a giriş yapın: https://github.com
2. Sağ üst köşeden **"+"** → **"New repository"** seçin
3. Repository bilgilerini doldurun:
   - **Name:** `rentorgin` (veya istediğiniz isim)
   - **Description:** "Enterprise Rental Management Platform"
   - **Visibility:** Private (önerilir) veya Public
   - **Initialize:** ❌ README, .gitignore, license eklemeyin (zaten var)

4. **"Create repository"** butonuna tıklayın

---

## 📋 Adım 2: Local Repository'yi GitHub'a Bağlama

### Mevcut Remote'u Kontrol Et

```bash
cd /Users/tugra/Desktop/rentorgin
git remote -v
```

### Remote URL'yi Güncelle veya Ekle

Eğer remote yoksa veya değiştirmek istiyorsanız:

```bash
# Mevcut remote'u kaldır (opsiyonel)
git remote remove origin

# Yeni remote ekle (YOUR_USERNAME ve REPO_NAME'i değiştirin)
git remote add origin https://github.com/YOUR_USERNAME/rentorgin.git

# Veya SSH kullanıyorsanız:
git remote add origin git@github.com:YOUR_USERNAME/rentorgin.git
```

---

## 📋 Adım 3: Son Kontroller

### .gitignore Kontrolü

`.gitignore` dosyasının güncel olduğundan emin olun:

```bash
# Hassas dosyaların ignore edildiğini kontrol et
git status
```

Aşağıdaki dosyalar **GÖRÜNMEMELİ**:
- `.env`
- `.env.local`
- `node_modules/`
- `dist/`
- `coverage/`
- `test-results/`

### Son Commit Kontrolü

```bash
# Değişiklikleri kontrol et
git status

# Eğer uncommitted değişiklikler varsa
git add .
git commit -m "chore: prepare for GitHub deployment"
```

---

## 📋 Adım 4: GitHub'a Push Etme

### İlk Push

```bash
# Main branch'e push et
git push -u origin main
```

### Sonraki Push'lar

```bash
git add .
git commit -m "feat: your commit message"
git push
```

---

## 📋 Adım 5: GitHub Secrets Ayarlama

Production deployment için GitHub Secrets kullanın:

1. Repository'ye gidin: `https://github.com/YOUR_USERNAME/rentorgin`
2. **Settings** → **Secrets and variables** → **Actions**
3. **"New repository secret"** butonuna tıklayın
4. Aşağıdaki secret'ları ekleyin:

### Gerekli Secrets

```
DATABASE_URL=postgresql://user:password@host:5432/dbname
JWT_SECRET=your-production-jwt-secret-min-32-chars
SESSION_SECRET=your-production-session-secret-32-chars
OPENAI_API_KEY=sk-your-openai-key
SMTP_HOST=smtp.sendgrid.net
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
SENTRY_DSN=your-sentry-dsn
```

⚠️ **UYARI:** Bu secret'ları sadece production deployment için kullanın. Development için local `.env` dosyası kullanın.

---

## 📋 Adım 6: GitHub Actions Workflow'ları

Projede iki workflow dosyası hazır:

### 1. CI Workflow (`.github/workflows/ci.yml`)

Her push ve pull request'te otomatik çalışır:
- ✅ Linting kontrolü
- ✅ Test çalıştırma
- ✅ Build kontrolü

### 2. Deploy Workflow (`.github/workflows/deploy.yml`)

Main branch'e push edildiğinde çalışır:
- ✅ Production build oluşturur
- ✅ Deployment package hazırlar

**Not:** Deployment adımlarını (Vercel, AWS, Railway vb.) workflow dosyasına eklemeniz gerekiyor.

---

## 📋 Adım 7: Deployment Platform Seçimi

### Seçenek 1: Vercel (Frontend için önerilir)

1. Vercel'e giriş yapın: https://vercel.com
2. GitHub repository'yi bağlayın
3. Build settings:
   - **Framework Preset:** Next.js
   - **Root Directory:** `apps/web`
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`

### Seçenek 2: Railway (Full-stack için)

1. Railway'e giriş yapın: https://railway.app
2. GitHub repository'yi bağlayın
3. İki servis oluşturun:
   - **API Service:** `apps/api`
   - **Web Service:** `apps/web`

### Seçenek 3: AWS / DigitalOcean / Heroku

Her platform için deployment script'leri workflow dosyasına eklenmelidir.

---

## 📋 Adım 8: Database Migration

Production database için migration çalıştırın:

```bash
# Production database'e bağlan
cd packages/database
DATABASE_URL="your-production-db-url" npx prisma migrate deploy
```

⚠️ **UYARI:** Production'da `migrate dev` kullanmayın, `migrate deploy` kullanın.

---

## 🔍 Sorun Giderme

### Push Hatası: "Permission denied"

```bash
# SSH key kontrolü
ssh -T git@github.com

# Veya HTTPS kullanın
git remote set-url origin https://github.com/YOUR_USERNAME/rentorgin.git
```

### GitHub Actions Çalışmıyor

1. Repository **Settings** → **Actions** → **General**
2. "Workflow permissions" → **"Read and write permissions"** seçin
3. "Allow GitHub Actions to create and approve pull requests" işaretleyin

### Build Hatası

```bash
# Local'de test et
npm run build

# Hataları düzelt ve tekrar push et
```

---

## 📚 Ek Kaynaklar

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [Railway Deployment Guide](https://docs.railway.app)

---

## ✅ Deployment Checklist

- [ ] GitHub repository oluşturuldu
- [ ] Local repository GitHub'a bağlandı
- [ ] `.gitignore` kontrol edildi
- [ ] İlk push yapıldı
- [ ] GitHub Secrets ayarlandı
- [ ] GitHub Actions workflow'ları çalışıyor
- [ ] Deployment platform seçildi ve yapılandırıldı
- [ ] Production database migration çalıştırıldı
- [ ] Production environment variables ayarlandı
- [ ] Test edildi ve çalışıyor ✅

---

**Son Güncelleme:** 2025-01-XX  
**Versiyon:** 0.4.0

