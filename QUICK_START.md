# 🚀 Quick Start Guide - RentOrgin
# 🚀 Hızlı Başlangıç Rehberi - RentOrgin

**Version:** v0.2.0  
**Date:** 2025-12-04

---

## ⚡ Hızlı Kurulum (3 Adım)

### 1️⃣ Database Hazırla

```bash
cd /Users/tugra/Desktop/rentorgin

# .env dosyası oluştur (eğer yoksa)
cat > .env << 'EOF'
DATABASE_URL="postgresql://tugra@localhost:5432/rentorgin_dev?schema=public"
API_PORT=3002
NEXT_PUBLIC_API_URL=http://localhost:3002/api/v1
JWT_SECRET=your-super-secret-jwt-key-12345
JWT_EXPIRATION=7d
NODE_ENV=development
APP_VERSION=0.3.1
EOF

# .env'yi database paketine kopyala
cat .env > packages/database/.env

# Database oluştur
createdb rentorgin_dev

# Prisma generate + migrate
cd packages/database
npx prisma generate
npx prisma migrate dev --name init

# Demo data ekle
cd ../..
npm run db:seed
```

**Demo Kullanıcı Bilgileri:**
- Email: `admin@demo.com`
- Password: `demo123`

---

### 2️⃣ Backend API Başlat

**Terminal 1:**

```bash
cd /Users/tugra/Desktop/rentorgin/apps/api
npm run start:dev
```

**Başarılı olursa göreceksin:**
```
🚀 RentOrgin API is running!
📡 Port: 3002
📚 API Docs: http://localhost:3002/api/docs
```

---

### 3️⃣ Frontend Başlat

**Terminal 2:**

```bash
cd /Users/tugra/Desktop/rentorgin/apps/web
npm run dev
```

**Başarılı olursa göreceksin:**
```
▲ Next.js 14.2.33
- Local: http://localhost:3000
```

---

## 🎯 Test Et

### Login Test

1. Aç: http://localhost:3000/login
2. Giriş yap:
   - Email: `admin@demo.com`
   - Password: `demo123`
3. Dashboard'a yönlendirilmelisin

### Register Test

1. Aç: http://localhost:3000/register
2. Yeni kullanıcı oluştur:
   - Ad: Test
   - Soyad: User
   - Email: test@example.com
   - Password: test123
3. Otomatik giriş yapmalı

---

## 🔧 Sorun Giderme

### ❌ "Login failed" Hatası

**Sebep 1: Backend çalışmıyor**

```bash
# Backend'i başlat
cd /Users/tugra/Desktop/rentorgin/apps/api
npm run start:dev
```

**Sebep 2: Database migration yapılmamış**

```bash
cd /Users/tugra/Desktop/rentorgin/packages/database
npx prisma migrate dev --name init
npm run db:seed
```

**Sebep 3: Demo kullanıcı yok**

```bash
cd /Users/tugra/Desktop/rentorgin
npm run db:seed
```

---

### ❌ "Registration failed" Hatası

**Sebep: Backend çalışmıyor veya CORS sorunu**

1. Backend'in çalıştığından emin ol:
   ```bash
   curl http://localhost:3001/health
   ```

2. Response almalısın:
   ```json
   {"status":"healthy","uptime":123}
   ```

3. Alamazsan backend'i başlat:
   ```bash
   cd apps/api && npm run start:dev
   ```

---

### ❌ Database Connection Error

```bash
# PostgreSQL çalışıyor mu?
psql --version

# Database var mı?
psql -l | grep rentorgin_dev

# Yoksa oluştur
createdb rentorgin_dev
```

---

### ❌ Module Not Found Errors

```bash
# Tüm node_modules'leri temizle ve yeniden yükle
cd /Users/tugra/Desktop/rentorgin
rm -rf node_modules apps/*/node_modules packages/*/node_modules
npm install
```

---

## ✅ Başarı Kontrolü

### Backend Çalışıyor mu?

```bash
curl http://localhost:3002/api/v1/health
```

**Beklenen:**
```json
{
  "status": "healthy",
  "uptime": 123.45,
  "timestamp": "2025-12-04T...",
  "environment": "development"
}
```

### Frontend Çalışıyor mu?

Browser'da aç: http://localhost:3000

Ana sayfa görünmeli.

### Database Çalışıyor mu?

```bash
cd /Users/tugra/Desktop/rentorgin/packages/database
npx prisma studio
```

Prisma Studio açılmalı: http://localhost:5555

---

## 📞 Hala Sorun Mu Var?

### Debug Checklist:

- [ ] PostgreSQL çalışıyor
- [ ] Database `rentorgin_dev` oluşturuldu
- [ ] `npm install` yapıldı
- [ ] `.env` dosyası oluşturuldu
- [ ] `packages/database/.env` oluşturuldu
- [ ] `npx prisma generate` çalıştırıldı
- [ ] `npx prisma migrate dev` çalıştırıldı
- [ ] `npm run db:seed` çalıştırıldı
- [ ] Backend API çalışıyor (port 3002)
- [ ] Frontend çalışıyor (port 3000)

### Backend Log Kontrol:

Terminal 1'de (backend) hata mesajlarını kontrol et.

### Frontend Console Kontrol:

Browser Developer Console (F12) → Console tab'inde hataları kontrol et.

---

## 🎉 Başarılı Setup Sonrası

**Görebileceğin Sayfalar:**
1. ✅ Ana Sayfa - http://localhost:3000
2. ✅ Login - http://localhost:3000/login
3. ✅ Register - http://localhost:3000/register
4. ✅ Dashboard - http://localhost:3000/dashboard (login sonrası)
5. ✅ Stores - http://localhost:3000/stores
6. ✅ Leases - http://localhost:3000/leases
7. ✅ Analytics - http://localhost:3000/analytics
8. ✅ AI Assistant - http://localhost:3000/ai-assistant
9. ✅ Malls - http://localhost:3000/malls
10. ✅ API Docs - http://localhost:3002/api/docs

---

**Created:** 2025-12-04  
**Last Updated:** 2025-12-04



