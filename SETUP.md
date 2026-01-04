# RentOrgin - Kurulum Rehberi
# RentOrgin - Setup Guide

**Version:** 0.1.0  
**Date:** 2025-12-04

---

## 🇹🇷 TÜRKÇE

### Gereksinimler

- **Node.js:** >= 20.0.0
- **npm:** >= 10.0.0
- **PostgreSQL:** >= 14.0
- **Git:** >= 2.30

### Kurulum Adımları

#### 1. Repository'yi Klonlayın

```bash
git clone <repository-url>
cd rentorgin
```

#### 2. Bağımlılıkları Yükleyin

```bash
npm install
```

Bu komut tüm workspace paketlerini (apps ve packages) otomatik olarak yükleyecektir.

#### 3. Çevre Değişkenlerini Ayarlayın

`.env.example` dosyasını `.env` olarak kopyalayın:

```bash
cp .env.example .env
```

`.env` dosyasını düzenleyin ve aşağıdaki değerleri ayarlayın:

```env
# Database
DATABASE_URL="postgresql://kullanici:sifre@localhost:5432/rentorgin_dev?schema=public"

# API
API_PORT=3001

# OpenAI (AI Asistan için)
OPENAI_API_KEY=sk-your-key-here

# JWT
JWT_SECRET=your-super-secret-key-here
```

#### 4. Veritabanını Oluşturun

```bash
# PostgreSQL'de database oluşturun
createdb rentorgin_dev

# Prisma migration çalıştırın
npm run db:migrate

# Seed data ekleyin (demo veriler)
npm run db:seed
```

#### 5. Uygulamayı Başlatın

**Development Mode (Tüm Servisler):**

```bash
npm run dev
```

Bu komut hem API hem de Web frontend'ini aynı anda başlatır.

**Veya Ayrı Ayrı:**

```bash
# Terminal 1 - Backend API
npm run api:dev

# Terminal 2 - Frontend
npm run web:dev
```

#### 6. Erişim

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:3001
- **API Docs (Swagger):** http://localhost:3001/api/docs
- **Database Studio:** `npm run db:studio` → http://localhost:5555

---

### Demo Kullanıcı Bilgileri

Seed data çalıştırdıysanız, aşağıdaki kullanıcıyla giriş yapabilirsiniz:

- **Email:** admin@demo.com
- **Password:** hashed_password_123

---

### Proje Yapısı

```
rentorgin/
├── apps/
│   ├── web/              # Next.js 14 Frontend
│   └── api/              # NestJS Backend
├── packages/
│   ├── core-domain/      # Domain Models
│   ├── ui-components/    # UI Bileşenleri
│   ├── shared-utils/     # Yardımcı Fonksiyonlar
│   └── database/         # Prisma ORM
├── docs/                 # Dokümantasyon
├── logs/                 # Hata Logları
└── storage/              # Dosya Yüklemeleri
```

---

### Development Scripts

```bash
# Tüm paketleri build et
npm run build

# Linting
npm run lint

# Database migration oluştur
npm run db:migrate

# Database studio (GUI)
npm run db:studio

# Clean
npm run clean
```

---

### Modüller

1. **Kira Sözleşmesi Yönetimi** - `/leases`
2. **AVM İlişkileri** - `/malls`
3. **Lokasyon Analizi** - `/analytics`
4. **Fizibilite Analizi** - `/feasibility`
5. **Gider Takibi** - `/expenses`
6. **Sözleşme Optimizasyonu** - `/optimization`
7. **Alan Yönetimi** - `/space-management`
8. **Bütçe & Risk** - `/budget-risk`

Her modül backend ve frontend tarafında ayrı ayrı implementedir.

---

### Troubleshooting

#### Database Connection Error

```bash
# PostgreSQL servisinin çalıştığından emin olun
sudo service postgresql status

# Connection string'i kontrol edin
cat .env | grep DATABASE_URL
```

#### Port Zaten Kullanımda

```bash
# Port'u kullanan process'i bulun
lsof -i :3000
lsof -i :3001

# Process'i durdurun
kill -9 <PID>
```

#### Module Not Found

```bash
# Node_modules'u temizleyin ve yeniden yükleyin
rm -rf node_modules
rm -rf apps/*/node_modules
rm -rf packages/*/node_modules
npm install
```

---

## 🇬🇧 ENGLISH

### Requirements

- **Node.js:** >= 20.0.0
- **npm:** >= 10.0.0
- **PostgreSQL:** >= 14.0
- **Git:** >= 2.30

### Setup Steps

#### 1. Clone Repository

```bash
git clone <repository-url>
cd rentorgin
```

#### 2. Install Dependencies

```bash
npm install
```

This will automatically install all workspace packages (apps and packages).

#### 3. Configure Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` and set the following values:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/rentorgin_dev?schema=public"

# API
API_PORT=3001

# OpenAI (for AI Assistant)
OPENAI_API_KEY=sk-your-key-here

# JWT
JWT_SECRET=your-super-secret-key-here
```

#### 4. Setup Database

```bash
# Create database in PostgreSQL
createdb rentorgin_dev

# Run Prisma migrations
npm run db:migrate

# Seed demo data
npm run db:seed
```

#### 5. Start Application

**Development Mode (All Services):**

```bash
npm run dev
```

This starts both API and Web frontend simultaneously.

**Or Separately:**

```bash
# Terminal 1 - Backend API
npm run api:dev

# Terminal 2 - Frontend
npm run web:dev
```

#### 6. Access

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:3001
- **API Docs (Swagger):** http://localhost:3001/api/docs
- **Database Studio:** `npm run db:studio` → http://localhost:5555

---

### Demo User Credentials

If you ran seed data, you can login with:

- **Email:** admin@demo.com
- **Password:** hashed_password_123

---

### Development Scripts

```bash
# Build all packages
npm run build

# Linting
npm run lint

# Create database migration
npm run db:migrate

# Open database studio (GUI)
npm run db:studio

# Clean build artifacts
npm run clean
```

---

### Modules

1. **Lease Management** - `/leases`
2. **Mall Relations** - `/malls`
3. **Location Analytics** - `/analytics`
4. **Feasibility Analysis** - `/feasibility`
5. **Expense Tracking** - `/expenses`
6. **Contract Optimization** - `/optimization`
7. **Space Management** - `/space-management`
8. **Budget & Risk** - `/budget-risk`

Each module is implemented separately on backend and frontend.

---

## 📞 Support

For issues and questions, refer to:
- `docs/principles.md` - Architecture principles
- `docs/glossary.md` - Code glossary
- `logs/error-log.md` - Known issues

---

**Last Updated:** 2025-12-04



















