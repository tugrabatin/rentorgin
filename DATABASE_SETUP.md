# 🗄️ Veritabanı Kurulum Rehberi
# 🗄️ Database Setup Guide

**Version:** v0.3.1  
**Date:** 2025-12-05

---

## ⚡ Hızlı Başlangıç (Tek Komut)

```bash
cd /Users/tugra/Desktop/rentorgin && \
cat .env > packages/database/.env && \
createdb rentorgin_dev 2>/dev/null || echo "Database zaten var" && \
cd packages/database && \
npx prisma generate && \
npx prisma migrate dev --name init && \
cd ../.. && \
npm run db:seed && \
echo "✅ Veritabanı hazır!"
```

---

## 📋 Adım Adım Kurulum

### 1️⃣ PostgreSQL Kontrolü

```bash
# PostgreSQL çalışıyor mu?
psql --version

# PostgreSQL servisini başlat (Mac)
brew services start postgresql@14

# VEYA (Linux)
sudo service postgresql start
```

---

### 2️⃣ .env Dosyasını Hazırla

**Root dizinde `.env` dosyası oluştur:**

```bash
cd /Users/tugra/Desktop/rentorgin

cat > .env << 'EOF'
# Database
DATABASE_URL="postgresql://tugra@localhost:5432/rentorgin_dev?schema=public"

# API
API_PORT=3002
NEXT_PUBLIC_API_URL=http://localhost:3002/api/v1

# Authentication
JWT_SECRET=your-super-secret-jwt-key-12345
JWT_EXPIRATION=7d

# OpenAI (optional - for AI features)
OPENAI_API_KEY=sk-your-key-here

# Application
NODE_ENV=development
APP_VERSION=0.3.1
EOF
```

**Not:** `tugra` yerine kendi PostgreSQL kullanıcı adını yaz.

---

### 3️⃣ .env'yi Database Paketine Kopyala

```bash
cat .env > packages/database/.env
```

---

### 4️⃣ Database Oluştur

```bash
# Database oluştur (eğer yoksa)
createdb rentorgin_dev

# VEYA PostgreSQL içinden:
psql postgres
CREATE DATABASE rentorgin_dev;
\q
```

**Hata alırsan (database zaten var):**
```bash
# Sorun değil, devam et
echo "Database zaten var, devam ediyoruz..."
```

---

### 5️⃣ Prisma Client Generate Et

```bash
cd packages/database
npx prisma generate
```

**Beklenen çıktı:**
```
✔ Generated Prisma Client (5.22.0) to ./node_modules/.prisma/client
```

---

### 6️⃣ Migration Çalıştır

```bash
npx prisma migrate dev --name init
```

**Beklenen çıktı:**
```
✔ Your database is now in sync with your schema.
```

**İlk kez çalıştırıyorsan:**
```
✔ Created migration: 20251205_init
✔ Applied migration: 20251205_init
```

---

### 7️⃣ Demo Data Ekle (Seed)

```bash
cd ../..
npm run db:seed
```

**Beklenen çıktı:**
```
✅ Seeded database successfully!
✅ Demo users created
✅ Demo stores created
✅ Demo leases created
```

---

### 8️⃣ Veritabanını Kontrol Et

```bash
# Prisma Studio'yu aç (GUI)
cd packages/database
npx prisma studio
```

**Browser'da açılacak:** http://localhost:5555

**VEYA terminal'den:**

```bash
psql rentorgin_dev
\dt                    # Tabloları listele
SELECT * FROM "User";  # Kullanıcıları gör
\q                     # Çıkış
```

---

## ✅ Başarı Kontrolü

### Database Bağlantısını Test Et

```bash
cd packages/database
npx prisma db execute --stdin <<< "SELECT 1 as test;"
```

**Beklenen:** `test: 1`

---

### Demo Kullanıcıları Kontrol Et

```bash
psql rentorgin_dev -c "SELECT email, role FROM \"User\" LIMIT 5;"
```

**Beklenen çıktı:**
```
         email          |    role    
------------------------+------------
 admin@demo.com         | ADMIN
 manager@demo.com       | MANAGER
 analyst@demo.com       | ANALYST
```

---

## 🔄 Veritabanını Sıfırla (Reset)

**⚠️ DİKKAT: Tüm veriler silinir!**

```bash
cd packages/database
npx prisma migrate reset
```

**Sonra seed çalıştır:**
```bash
cd ../..
npm run db:seed
```

---

## 🛠️ Sorun Giderme

### ❌ "Database does not exist"

```bash
# Database oluştur
createdb rentorgin_dev

# VEYA PostgreSQL kullanıcı adını kontrol et
psql postgres -c "\du"
```

---

### ❌ "Connection refused"

```bash
# PostgreSQL çalışıyor mu?
brew services list | grep postgresql

# Başlat
brew services start postgresql@14
```

---

### ❌ "User does not exist"

```bash
# Mevcut kullanıcıları gör
psql postgres -c "\du"

# .env'de doğru kullanıcı adını kullan
# Mac'te genelde kendi kullanıcı adın (tugra)
```

---

### ❌ "Migration failed"

```bash
# Migration durumunu kontrol et
cd packages/database
npx prisma migrate status

# Eğer sorun varsa, migration'ı sıfırla
npx prisma migrate reset
npx prisma migrate dev --name init
```

---

### ❌ "Prisma Client not generated"

```bash
cd packages/database
rm -rf node_modules/.prisma
npx prisma generate
```

---

## 📊 Veritabanı Bilgileri

### Tablolar

```
✅ User              - Kullanıcılar
✅ Tenant            - Organizasyonlar
✅ Store             - Mağazalar
✅ Lease             - Kira sözleşmeleri
✅ Mall              - AVM'ler
✅ Contact           - İletişim bilgileri
✅ Expense           - Giderler
✅ Budget            - Bütçeler
✅ Risk              - Riskler
✅ Session           - Çalışma oturumları
✅ FileUpload        - Yüklenen dosyalar
✅ Analytics         - Analiz verileri
✅ TranslationJob    - Çeviri işleri
✅ AiInteraction     - AI etkileşimleri
```

### İlişkiler

- `User` → `Tenant` (Many-to-One)
- `Store` → `Tenant` (Many-to-One)
- `Store` → `Mall` (Many-to-One)
- `Lease` → `Store` (Many-to-One)
- `Expense` → `Store` (Many-to-One)
- `Budget` → `Tenant` (Many-to-One)

---

## 🎯 Hızlı Komutlar

### Tüm Adımları Tek Seferde

```bash
# 1. .env hazırla ve kopyala
cat .env > packages/database/.env

# 2. Database oluştur
createdb rentorgin_dev 2>/dev/null || true

# 3. Prisma generate
cd packages/database && npx prisma generate

# 4. Migration
npx prisma migrate dev --name init

# 5. Seed
cd ../.. && npm run db:seed

# 6. Kontrol
cd packages/database && npx prisma studio
```

---

### Sadece Migration (Schema değiştiyse)

```bash
cd packages/database
npx prisma migrate dev
```

---

### Sadece Seed (Data ekle)

```bash
npm run db:seed
```

---

### Database Studio Aç

```bash
npm run db:studio
```

**VEYA**

```bash
cd packages/database
npx prisma studio
```

---

## 📝 Demo Kullanıcı Bilgileri

Seed çalıştırdıktan sonra:

```
Email: admin@demo.com
Password: demo123

Email: manager@demo.com
Password: demo123

Email: analyst@demo.com
Password: demo123
```

---

## 🔐 Güvenlik Notları

1. **Production'da:**
   - `.env` dosyasını `.gitignore`'a ekle
   - `JWT_SECRET`'ı güçlü bir değer yap
   - `DATABASE_URL`'de şifre kullan

2. **Development'da:**
   - Şifresiz local auth kullanabilirsin (Mac)
   - Demo verileri sadece test için

---

## 📞 Yardım

**Sorun mu var?**

1. `logs/error-log.md` dosyasını kontrol et
2. `QUICK_START.md` dosyasına bak
3. Terminal çıktısını kontrol et

---

**Created:** 2025-12-05  
**Last Updated:** 2025-12-05

















