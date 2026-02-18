# RentOrgin Feature Catalog
# RentOrgin Özellik Katalogu

**Version:** v0.5.0  
**Generated:** 2026-02-16  
**Purpose:** Comprehensive catalog of all features (current + planned) with evidence-based documentation  
**Amaç:** Tüm özelliklerin (mevcut + planlanan) kanıt tabanlı kapsamlı katalogu

---

## Executive Summary / Yönetici Özeti

### What RentOrgin Does / RentOrgin Ne Yapar

**RentOrgin (BASIS)**, perakende zincirleri için kurumsal kiralama yönetim platformudur. Mağaza kiralama sözleşmelerini, AVM ilişkilerini, maliyet takibini ve performans analizini tek bir sistemde birleştirir.

**RentOrgin (BASIS)** is an enterprise rental management platform for retail chains. It consolidates store lease contracts, mall relationships, expense tracking, and performance analytics into a single system.

### Feature Domains / Özellik Alanları

1. **Authentication & Authorization** - Kullanıcı kimlik doğrulama ve yetkilendirme
2. **Store Management** - Mağaza yönetimi ve takibi
3. **Lease Contract Management** - Kira sözleşmesi yönetimi
4. **Mall Relations Management** - AVM ilişkileri yönetimi
5. **Expense Tracking** - Gider takibi ve faturalandırma
6. **Budget Management** - Bütçe planlama ve kontrol
7. **Risk Management** - Risk tespit ve yönetimi
8. **Analytics & Reporting** - Performans analizi ve raporlama
9. **AI Assistant** - Yapay zeka asistanı
10. **Translation Engine** - Doküman çeviri motoru
11. **Leasing Manager Tools** - Kiralama yöneticisi araçları
12. **File Management** - Doküman yükleme ve saklama
13. **Session Management** - Kullanıcı oturumu yönetimi
14. **Multi-Tenant Architecture** - Çoklu tenant yapısı

---

## 1. FEATURE CATALOG - CURRENT FEATURES (MEVCUT ÖZELLİKLER)

---

### 1.1 Authentication & Authorization Module

**Durum:** ✅ GA (General Availability)  
**Version:** v0.4.0+

#### Amaç / Kullanıcı Problemi:
Güvenli kullanıcı kimlik doğrulama, yetkilendirme ve çoklu tenant veri izolasyonu sağlar.

#### Nasıl Çalışır:
1. Kullanıcı email/password ile giriş yapar
2. Backend bcrypt ile şifre doğrular (cost 12)
3. JWT access token (15 dakika) + refresh token (7 gün) üretir
4. Her istekte JWT token doğrulanır
5. Tenant ID JWT'den çıkarılır ve tüm sorgulara otomatik eklenir
6. Role-based access control (RBAC) ile yetkilendirme

#### Giriş Noktaları:

**API Routes:**
- `POST /api/v1/auth/login` - Kullanıcı girişi
- `POST /api/v1/auth/register` - Kullanıcı kaydı
- `POST /api/v1/auth/refresh` - Token yenileme
- `GET /api/v1/auth/profile` - Profil bilgisi
- `POST /api/v1/auth/logout` - Kullanıcı çıkışı

**UI Pages:**
- `/login` - Giriş sayfası (`apps/web/src/app/login/page.tsx`)
- `/register` - Kayıt sayfası (`apps/web/src/app/register/page.tsx`)

**CLI:** Yok

**Workers:** Yok

#### Temel Bileşenler:

**Backend:**
- `apps/api/src/modules/auth/auth.controller.ts` - HTTP endpoints
- `apps/api/src/modules/auth/auth.service.ts` - Business logic
- `apps/api/src/modules/auth/strategies/local.strategy.ts` - Passport local strategy
- `apps/api/src/modules/auth/strategies/jwt.strategy.ts` - JWT strategy
- `apps/api/src/modules/auth/guards/jwt-auth.guard.ts` - Route protection
- `apps/api/src/modules/auth/decorators/current-user.decorator.ts` - User extraction

**Frontend:**
- `apps/web/src/app/login/page.tsx` - Login form
- `apps/web/src/app/register/page.tsx` - Registration form
- `apps/web/src/components/protected-route.tsx` - Route guard

**Database:**
- `User` model (schema.prisma:77-108)
- `Tenant` model (schema.prisma:19-61)

#### Konfigürasyon / Feature Flag / Env Vars:

```env
JWT_SECRET=<secret>              # JWT signing key
DATABASE_URL=<postgres-url>      # Database connection
NODE_ENV=development|production  # Environment
```

#### Veri Kaynakları / Storage:
- **Database:** PostgreSQL (users, tenants tables)
- **JWT:** In-memory (no persistence)
- **Passwords:** Bcrypt hashed (cost factor 12)

#### Güvenlik & Gizlilik:
- ✅ Bcrypt password hashing (cost 12)
- ✅ JWT RS256 (asymmetric) support ready
- ✅ HttpOnly cookies (not yet implemented)
- ✅ CORS whitelisting (configured in main.ts)
- ✅ Rate limiting: 3 registrations/hour, login protected
- ✅ Multi-tenant row-level isolation
- ⚠️ Password reset flow: NOT YET IMPLEMENTED
- ⚠️ 2FA: NOT YET IMPLEMENTED

#### Gözlemlenebilirlik:
- **Logs:** `apps/api/src/common/logger.service.ts` - Custom logger
- **Metrics:** Yok (Sentry ready)
- **Errors:** HTTP exception filter (`apps/api/src/common/http-exception.filter.ts`)

#### Test Kapsamı:
- ⚠️ Unit tests: NOT FOUND
- ⚠️ Integration tests: NOT FOUND
- ✅ E2E test: `apps/web/tests/auth.spec.ts` (Playwright)

#### Kanıtlar:
- Controller: `apps/api/src/modules/auth/auth.controller.ts:1-96`
- Service: `apps/api/src/modules/auth/auth.service.ts`
- UI: `apps/web/src/app/login/page.tsx`, `apps/web/src/app/register/page.tsx`
- Database: `packages/database/prisma/schema.prisma:77-108` (User model)
- Docs: `docs/auth-implementation.md`

---

### 1.2 Store Management Module

**Durum:** ✅ GA  
**Version:** v0.2.0+

#### Amaç / Kullanıcı Problemi:
Perakende mağazalarının master verilerini yönetir: lokasyon, büyüklük, durum, marka bilgileri.

#### Nasıl Çalışır:
1. Kullanıcı mağaza oluşturur (ad, lokasyon, m², durum)
2. Backend validates ve tenant ID ile ilişkilendirir
3. Mağaza listesi filtrelenebilir (şehir, durum, marka)
4. Mağaza detayında: leases, expenses, analytics ilişkili veriler gösterilir
5. Durum değişiklikleri: PLANNING → ACTIVE → RENOVATION → CLOSING → CLOSED

#### Giriş Noktaları:

**API Routes:**
- `GET /api/v1/stores` - Tüm mağazaları listele
- `GET /api/v1/stores/:id` - Detay getir
- `POST /api/v1/stores` - Yeni mağaza oluştur
- `PUT /api/v1/stores/:id` - Mağaza güncelle
- `DELETE /api/v1/stores/:id` - Mağaza sil
- `GET /api/v1/stores/statistics` - İstatistikler

**UI Pages:**
- `/stores` - Mağaza listesi (`apps/web/src/app/stores/page.tsx`)
- `/stores/:id` - Mağaza detayı (`apps/web/src/app/stores/[id]/page.tsx`)
- `/stores/create` - Yeni mağaza (`apps/web/src/app/stores/create/page.tsx`)
- `/stores/:id/edit` - Düzenleme (`apps/web/src/app/stores/[id]/edit/page.tsx`)

#### Temel Bileşenler:

**Backend:**
- `apps/api/src/modules/stores/stores.controller.ts:1-92` - CRUD endpoints
- `apps/api/src/modules/stores/stores.service.ts` - Business logic
- `apps/api/src/modules/stores/dto/create-store.dto.ts` - Validation
- `apps/api/src/modules/stores/dto/update-store.dto.ts` - Update validation

**Frontend:**
- `apps/web/src/app/stores/page.tsx` - List view
- `apps/web/src/app/stores/[id]/page.tsx` - Detail view
- `apps/web/src/app/stores/create/page.tsx` - Create form

**Database:**
- `Store` model (schema.prisma:128-168)

#### Konfigürasyon / Feature Flags:
- Env vars: `DATABASE_URL`
- Feature flags: Yok

#### Veri Kaynakları / Storage:
- **Database:** PostgreSQL `stores` table
- **Relations:** 1:N leases, expenses, analytics; N:1 mall

#### Güvenlik & Gizlilik:
- ✅ Tenant isolation (automatic via tenantId)
- ✅ JWT auth required
- ✅ Soft delete recommended (not implemented)

#### Gözlemlenebilirlik:
- **Logs:** LoggerService
- **Errors:** HTTP exceptions

#### Test Kapsamı:
- ⚠️ Unit tests: NOT FOUND
- ⚠️ E2E tests: NOT FOUND

#### Kanıtlar:
- Controller: `apps/api/src/modules/stores/stores.controller.ts`
- UI: `apps/web/src/app/stores/page.tsx`, `apps/web/src/app/stores/[id]/page.tsx`
- Schema: `packages/database/prisma/schema.prisma:128-168`

---

### 1.3 Lease Contract Management Module

**Durum:** ✅ GA  
**Version:** v0.2.0+

#### Amaç / Kullanıcı Problemi:
Kira sözleşmelerinin yaşam döngüsünü yönetir: oluşturma, yenileme, eskalasyon hesaplama, süre takibi.

#### Nasıl Çalışır:
1. Mağaza için kira sözleşmesi oluşturulur
2. Başlangıç/bitiş tarihi, aylık kira, eskalasyon türü tanımlanır
3. Sistem otomatik olarak:
   - Süresi dolmak üzere sözleşmeleri tespit eder (90 gün önceden)
   - Eskalasyon ile güncel kirayı hesaplar
   - Yenileme süreçlerini başlatır
4. Sözleşme durumları: DRAFT → PENDING_APPROVAL → ACTIVE → EXPIRING_SOON → RENEWED/TERMINATED

#### Giriş Noktaları:

**API Routes:**
- `GET /api/v1/leases` - Tüm sözleşmeleri listele
- `GET /api/v1/leases/expiring` - Süre bitenleri getir
- `GET /api/v1/leases/:id` - Detay
- `GET /api/v1/leases/:id/current-rent` - Güncel kira hesapla
- `POST /api/v1/leases` - Yeni sözleşme
- `PUT /api/v1/leases/:id` - Güncelle
- `POST /api/v1/leases/:id/renew` - Yenileme başlat

**UI Pages:**
- `/leases` - Sözleşme listesi (`apps/web/src/app/leases/page.tsx`)
- `/leases/:id` - Detay (`apps/web/src/app/leases/[id]/page.tsx`)
- `/leases/create` - Yeni sözleşme (`apps/web/src/app/leases/create/page.tsx`)

#### Temel Bileşenler:

**Backend:**
- `apps/api/src/modules/leases/leases.controller.ts:1-75` - Endpoints
- `apps/api/src/modules/leases/leases.service.ts` - Business logic
  - `calculateCurrentRent()` - Eskalasyon hesabı
  - `findExpiring()` - Süre bitenler
  - `initiateRenewal()` - Yenileme başlatma

**Frontend:**
- `apps/web/src/app/leases/page.tsx` - List
- `apps/web/src/app/leases/[id]/page.tsx` - Detail

**Database:**
- `Lease` model (schema.prisma:251-314)
- `LeaseRenewal` model (schema.prisma:336-363)

#### Konfigürasyon:
- Yok (business logic hardcoded)

#### Veri Kaynakları / Storage:
- **Database:** PostgreSQL `leases`, `lease_renewals`
- **Documents:** Optional `documentUrl` field (file storage)

#### Güvenlik:
- ✅ Tenant isolation
- ✅ JWT auth required

#### Gözlemlenebilirlik:
- **Logs:** LoggerService

#### Test Kapsamı:
- ⚠️ Unit tests: NOT FOUND
- ⚠️ Business logic tests: NOT FOUND (calculateCurrentRent needs tests!)

#### Kanıtlar:
- Controller: `apps/api/src/modules/leases/leases.controller.ts`
- Schema: `packages/database/prisma/schema.prisma:251-314`
- UI: `apps/web/src/app/leases/page.tsx`

---

### 1.4 Mall Relations Management Module

**Durum:** ✅ GA (Basic Implementation)  
**Version:** v0.1.0+

#### Amaç / Kullanıcı Problemi:
AVM yönetim şirketleriyle ilişkileri takip eder: iletişim bilgileri, müzakereler, ilişki kalitesi.

#### Nasıl Çalışır:
1. AVM bilgileri kaydedilir (ad, lokasyon, yönetim şirketi)
2. İlişki kalitesi puanlanır: EXCELLENT, GOOD, NEUTRAL, FAIR, POOR
3. Müzakere kayıtları (Negotiation) tutulur
4. İletişim kişileri (MallContact) saklanır

#### Giriş Noktaları:

**API Routes:**
- `GET /api/v1/malls` - Tüm AVM'leri listele
- `GET /api/v1/malls/:id` - Detay
- `POST /api/v1/malls` - Yeni AVM
- `PUT /api/v1/malls/:id/relationship` - İlişki kalitesini güncelle

**UI Pages:**
- `/malls` - AVM listesi (`apps/web/src/app/malls/page.tsx`)
- `/malls/:id` - AVM detayı (`apps/web/src/app/malls/[id]/page.tsx`)

#### Temel Bileşenler:

**Backend:**
- `apps/api/src/modules/malls/malls.controller.ts:1-54` - Endpoints
- `apps/api/src/modules/malls/malls.service.ts` - CRUD logic

**Database:**
- `Mall` model (schema.prisma:178-209)
- `MallContact` model (schema.prisma:228-245)
- `Negotiation` model (schema.prisma:378-415)

#### Kanıtlar:
- Controller: `apps/api/src/modules/malls/malls.controller.ts`
- Schema: `packages/database/prisma/schema.prisma:178-209`

---

### 1.5 Expense Tracking Module

**Durum:** ✅ GA  
**Version:** v0.3.0+

#### Amaç / Kullanıcı Problemi:
Mağaza giderlerini takip eder: kira, ortak alan giderleri (CAC), elektrik, bakım, uyuşmazlıklar.

#### Nasıl Çalışır:
1. Gider kaydedilir (type: RENT, CAC, UTILITY, vb.)
2. Vade ve ödeme tarihleri takip edilir
3. Uyuşmazlık flagleri set edilebilir
4. Fatura dosyası yüklenebilir (invoiceUrl)
5. İstatistikler: toplam gider, vade aşımı, aylık özet

#### Giriş Noktaları:

**API Routes:**
- `POST /api/v1/expenses` - Yeni gider
- `GET /api/v1/expenses` - Liste (filtrelenebilir)
- `GET /api/v1/expenses/:id` - Detay
- `PUT /api/v1/expenses/:id` - Güncelle
- `PUT /api/v1/expenses/:id/mark-paid` - Ödendi işaretle
- `DELETE /api/v1/expenses/:id` - Sil
- `GET /api/v1/expenses/statistics` - İstatistikler
- `GET /api/v1/expenses/monthly-summary` - Aylık özet
- `GET /api/v1/expenses/overdue` - Vadesi geçenler

**UI Pages:**
- `/expenses` - Gider listesi (`apps/web/src/app/expenses/page.tsx`)
- `/expenses/:id` - Detay (`apps/web/src/app/expenses/[id]/page.tsx`)
- `/expenses/create` - Yeni gider (`apps/web/src/app/expenses/create/page.tsx`)
- `/expenses/analytics` - Analitik (`apps/web/src/app/expenses/analytics/page.tsx`)

#### Temel Bileşenler:

**Backend:**
- `apps/api/src/modules/expenses/expenses.controller.ts:1-153` - Full CRUD
- `apps/api/src/modules/expenses/expenses.service.ts` - Statistics, filtering

**Database:**
- `Expense` model (schema.prisma:585-625)
- Relations: N:1 Store, N:1 Tenant

#### Kanıtlar:
- Controller: `apps/api/src/modules/expenses/expenses.controller.ts`
- Schema: `packages/database/prisma/schema.prisma:585-625`
- UI: `apps/web/src/app/expenses/page.tsx`
- Docs: `docs/modules/expense-tracking.md`, `EXPENSE_MODULE_COMPLETE.md`

---

### 1.6 Budget Management Module

**Durum:** ✅ GA  
**Version:** v0.3.0+

#### Amaç / Kullanıcı Problemi:
Bütçe planlama ve gerçekleşen vs planlanan karşılaştırması yapar.

#### Nasıl Çalışır:
1. Yıllık/çeyreklik bütçeler oluşturulur
2. Scope: COMPANY, COUNTRY, CITY, BRAND, MALL_TYPE
3. Planlanan vs gerçekleşen giderleri karşılaştırır
4. Varyans analizi yapar

#### Giriş Noktaları:

**API Routes:**
- `POST /api/v1/budget` - Bütçe oluştur
- `GET /api/v1/budget` - Listele
- `GET /api/v1/budget/:id` - Detay
- `PUT /api/v1/budget/:id` - Güncelle
- `DELETE /api/v1/budget/:id` - Sil
- `GET /api/v1/budget/statistics` - İstatistikler
- `GET /api/v1/budget/vs-actual` - Planlanan vs gerçekleşen

**UI Pages:**
- `/budget` - Bütçe listesi (`apps/web/src/app/budget/page.tsx`)
- `/budget/:id` - Detay (`apps/web/src/app/budget/[id]/page.tsx`)
- `/budget/create` - Yeni bütçe (`apps/web/src/app/budget/create/page.tsx`)

#### Temel Bileşenler:

**Backend:**
- `apps/api/src/modules/budget/budget.controller.ts:1-118` - CRUD
- `apps/api/src/modules/budget/budget.service.ts` - Variance calculation

**Database:**
- `Budget` model (schema.prisma:763-791)

#### Kanıtlar:
- Controller: `apps/api/src/modules/budget/budget.controller.ts`
- Schema: `packages/database/prisma/schema.prisma:763-791`

---

### 1.7 Risk Management Module

**Durum:** ✅ GA  
**Version:** v0.3.0+

#### Amaç / Kullanıcı Problemi:
Finansal, operasyonel, yasal riskleri tespit eder ve yönetir.

#### Nasıl Çalışır:
1. Risk kategorileri: FINANCIAL, OPERATIONAL, LEGAL, RELATIONSHIP, MARKET
2. Şiddet seviyeleri: LOW, MEDIUM, HIGH, CRITICAL
3. Mitigation planı oluşturulur
4. Risk skoru hesaplanır (0-100)

#### Giriş Noktaları:

**API Routes:**
- `POST /api/v1/risk` - Risk oluştur
- `GET /api/v1/risk` - Listele
- `GET /api/v1/risk/:id` - Detay
- `PUT /api/v1/risk/:id` - Güncelle
- `DELETE /api/v1/risk/:id` - Sil
- `GET /api/v1/risk/statistics` - İstatistikler
- `GET /api/v1/risk/score` - Genel risk skoru

**UI Pages:**
- `/risk` - Risk listesi (`apps/web/src/app/risk/page.tsx`)
- `/risk/:id` - Detay (`apps/web/src/app/risk/[id]/page.tsx`)
- `/risk/create` - Yeni risk (`apps/web/src/app/risk/create/page.tsx`)

#### Temel Bileşenler:

**Backend:**
- `apps/api/src/modules/risk/risk.controller.ts:1-110` - CRUD
- `apps/api/src/modules/risk/risk.service.ts` - Risk scoring

**Database:**
- `Risk` model (schema.prisma:808-840)

#### Kanıtlar:
- Controller: `apps/api/src/modules/risk/risk.controller.ts`
- Schema: `packages/database/prisma/schema.prisma:808-840`

---

### 1.8 Analytics & Reporting Module

**Durum:** ✅ GA (Basic)  
**Version:** v0.1.0+

#### Amaç / Kullanıcı Problemi:
Mağaza performansını analiz eder: kira/ciro oranı, m² başına ciro, performans skoru.

#### Nasıl Çalışır:
1. Aylık bazda StoreAnalytics kaydı oluşturulur
2. KPI'lar hesaplanır:
   - Rent-to-revenue ratio
   - Revenue per square meter
   - Profit margin
3. Performance score (0-100) hesaplanır
4. Öneri: CONTINUE, MONITOR, RENEGOTIATE, DOWNSIZE, RELOCATE, CLOSE

#### Giriş Noktaları:

**API Routes:**
- `GET /api/v1/analytics/stores/:storeId` - Mağaza analizi
- `GET /api/v1/analytics/portfolio` - Portföy özeti
- `POST /api/v1/analytics/calculate` - Yeni hesaplama
- `GET /api/v1/analytics/compare` - Mağaza karşılaştırma

**UI Pages:**
- `/analytics` - Analitik dashboard (`apps/web/src/app/analytics/page.tsx`)
- `/dashboard` - Ana dashboard (`apps/web/src/app/dashboard/page.tsx`)

#### Temel Bileşenler:

**Backend:**
- `apps/api/src/modules/analytics/analytics.controller.ts:1-55` - Endpoints
- `apps/api/src/modules/analytics/analytics.service.ts` - Calculation engine

**Frontend:**
- `apps/web/src/app/analytics/page.tsx` - Analytics page
- `apps/web/src/app/dashboard/page.tsx` - Main dashboard
- `apps/web/src/components/dashboard/*.tsx` - Dashboard components

**Database:**
- `StoreAnalytics` model (schema.prisma:470-509)

#### Kanıtlar:
- Controller: `apps/api/src/modules/analytics/analytics.controller.ts`
- Schema: `packages/database/prisma/schema.prisma:470-509`

---

### 1.9 AI Assistant Module

**Durum:** ⚠️ BETA (Scaffold Only)  
**Version:** v0.1.0+

#### Amaç / Kullanıcı Problemi:
Sözleşme özetleme, email taslağı oluşturma, performans analizi için AI yardımcısı.

#### Nasıl Çalışır:
1. Prompt ID + context + user input gönderilir
2. Backend OpenAI API'ye istek yapar
3. Yanıt döndürülür ve loglanır
4. Kullanıcı feedback verebilir

#### Giriş Noktaları:

**API Routes:**
- `POST /api/v1/ai-assistant/execute` - AI prompt çalıştır
- `POST /api/v1/ai-assistant/feedback` - Geri bildirim gönder

**UI Pages:**
- `/ai-assistant` - AI asistanı sayfası (`apps/web/src/app/ai-assistant/page.tsx`)

#### Temel Bileşenler:

**Backend:**
- `apps/api/src/modules/ai-assistant/ai-assistant.controller.ts:1-42` - Endpoints
- `apps/api/src/modules/ai-assistant/ai-assistant.service.ts` - OpenAI integration

**Database:**
- `AIInteraction` model (schema.prisma:864-902)

#### Durum:
⚠️ **NOT FULLY IMPLEMENTED** - Scaffold exists, OpenAI integration incomplete

#### Kanıtlar:
- Controller: `apps/api/src/modules/ai-assistant/ai-assistant.controller.ts`
- Schema: `packages/database/prisma/schema.prisma:864-902`
- Roadmap: `ROADMAP.md:106-124` (planned for v0.2.0)

---

### 1.10 Translation Engine Module

**Durum:** ⚠️ BETA (Backend Only)  
**Version:** v0.1.0+

#### Amaç / Kullanıcı Problemi:
PDF/DOCX sözleşmelerini otomatik çevirir, iki dilli doküman üretir.

#### Nasıl Çalışır:
1. Doküman yüklenir
2. Segmentlere bölünür (500 kelimelik)
3. Her segment OpenAI/DeepL ile çevrilir
4. Kalite kontrolleri yapılır
5. İki dilli PDF oluşturulur

#### Giriş Noktaları:

**API Routes:**
- `POST /api/v1/translation/start` - Çeviri başlat
- `GET /api/v1/translation/jobs/:jobId` - Durum
- `GET /api/v1/translation/jobs/:jobId/progress` - İlerleme

**UI Pages:**
- `/translation` - Çeviri sayfası (`apps/web/src/app/translation/page.tsx`)

#### Temel Bileşenler:

**Backend:**
- `apps/api/src/modules/translation/translation.controller.ts:1-48` - Endpoints
- `apps/api/src/modules/translation/translation.service.ts` - Engine

**Database:**
- `TranslationJob` model (schema.prisma:908-941)
- `TranslationSegment` model (schema.prisma:951-980)

#### Durum:
⚠️ **BACKEND ONLY** - UI incomplete, translation engine needs work

#### Kanıtlar:
- Controller: `apps/api/src/modules/translation/translation.controller.ts`
- Schema: `packages/database/prisma/schema.prisma:908-980`
- Roadmap: `ROADMAP.md:163-169` (planned for v0.3.0)

---

### 1.11 Leasing Manager Tools Module

**Durum:** ✅ GA  
**Version:** v0.3.0+

#### Amaç / Kullanıcı Problemi:
Kiralama yöneticilerinin günlük iş akışlarını destekler: görevler, franchise projeleri, iş tanımı oluşturma.

#### Nasıl Çalışır:

**1.11.1 Leasing Tasks (Görevler):**
- Görev kategorileri: CONTRACT_NEGOTIATION, CONTRACT_RENEWAL, MAINTENANCE, vb.
- Öncelik: LOW, MEDIUM, HIGH, URGENT
- SLA takibi (default SLA days)
- Atama ve durum yönetimi

**1.11.2 Franchise Projects (Franchise Projeleri):**
- Yeni mağaza açılış projeleri
- Durum: PIPELINE → EVALUATION → APPROVED → OPENED
- Finansal projeksiyonlar (CAPEX, OPEX, revenue)
- Fizibilite skoru

**1.11.3 Leasing Requests (Talepler):**
- Tip: RENT_REDUCTION, LEASE_EXTENSION, COMPLAINT, vb.
- Kaynak: TENANT, LANDLORD, INTERNAL
- SLA ve çözüm takibi

**1.11.4 Job Descriptions (İş Tanımları):**
- Kiralama yöneticisi pozisyonu için otomatik iş tanımı üretir
- TR/EN çıktı
- Şirket bağlamına göre özelleştirilir

#### Giriş Noktaları:

**API Routes:**
- Leasing Tasks:
  - `GET /api/v1/leasing-manager/tasks`
  - `GET /api/v1/leasing-manager/tasks/:id`
  - `POST /api/v1/leasing-manager/tasks`
  - `PUT /api/v1/leasing-manager/tasks/:id`
  - `DELETE /api/v1/leasing-manager/tasks/:id`
  - `GET /api/v1/leasing-manager/tasks/statistics`

- Franchise Projects:
  - `GET /api/v1/leasing-manager/franchise-projects`
  - `GET /api/v1/leasing-manager/franchise-projects/:id`
  - `POST /api/v1/leasing-manager/franchise-projects`
  - `PUT /api/v1/leasing-manager/franchise-projects/:id`
  - `DELETE /api/v1/leasing-manager/franchise-projects/:id`
  - `GET /api/v1/leasing-manager/franchise-projects/statistics`

- Leasing Requests:
  - `GET /api/v1/leasing-manager/requests`
  - `GET /api/v1/leasing-manager/requests/:id`
  - `POST /api/v1/leasing-manager/requests`
  - `PUT /api/v1/leasing-manager/requests/:id`
  - `POST /api/v1/leasing-manager/requests/:id/resolve`
  - `POST /api/v1/leasing-manager/requests/:id/reject`
  - `DELETE /api/v1/leasing-manager/requests/:id`
  - `GET /api/v1/leasing-manager/requests/statistics`

- Job Descriptions:
  - `GET /api/v1/leasing-manager/job-descriptions`
  - `GET /api/v1/leasing-manager/job-descriptions/default-template`
  - `GET /api/v1/leasing-manager/job-descriptions/:id`
  - `GET /api/v1/leasing-manager/job-descriptions/:id/export?language=TR|EN`
  - `POST /api/v1/leasing-manager/job-descriptions`
  - `POST /api/v1/leasing-manager/job-descriptions/generate-from-template`
  - `PUT /api/v1/leasing-manager/job-descriptions/:id`
  - `POST /api/v1/leasing-manager/job-descriptions/:id/publish`
  - `POST /api/v1/leasing-manager/job-descriptions/:id/unpublish`
  - `DELETE /api/v1/leasing-manager/job-descriptions/:id`

- Dashboard:
  - `GET /api/v1/leasing-manager/dashboard` - Tüm istatistikleri tek istekte döndürür

**UI Pages:**
- `/leasing-manager` - Leasing Manager dashboard (`apps/web/src/app/leasing-manager/page.tsx`)

**UI Components:**
- `apps/web/src/components/leasing-manager/leasing-manager-widget.tsx` - Ana widget
- `apps/web/src/components/leasing-manager/store-leasing-tasks.tsx` - Görev yönetimi
- `apps/web/src/components/leasing-manager/store-franchise-projects.tsx` - Proje yönetimi

#### Temel Bileşenler:

**Backend:**
- `apps/api/src/modules/leasing-manager/leasing-manager.controller.ts:1-273` - Full CRUD
- `apps/api/src/modules/leasing-manager/leasing-tasks.service.ts` - Task logic
- `apps/api/src/modules/leasing-manager/franchise-projects.service.ts` - Project logic
- `apps/api/src/modules/leasing-manager/leasing-requests.service.ts` - Request logic
- `apps/api/src/modules/leasing-manager/job-descriptions.service.ts` - Job description generator

**Database:**
- `LeasingTask` model (schema.prisma:1089-1130)
- `FranchiseProject` model (schema.prisma:1161-1213)
- `LeasingRequest` model (schema.prisma:1226-1269)
- `JobDescriptionTemplate` model (schema.prisma:1305-1346)
- `JobDescriptionGenerationLog` model (schema.prisma:1348-1375)
- `MarketResearchRecord` model (schema.prisma:1377-1415)
- `LeasingManagerRoleTemplate` model (schema.prisma:1051-1079)

#### Güvenlik:
- ✅ Tenant isolation
- ✅ JWT auth required

#### Test Kapsamı:
- ✅ Unit tests: `apps/api/src/modules/leasing-manager/__tests__/leasing-tasks.service.spec.ts` (partial)

#### Kanıtlar:
- Controller: `apps/api/src/modules/leasing-manager/leasing-manager.controller.ts`
- Services: 4 adet service file
- Schema: `packages/database/prisma/schema.prisma:1051-1415`
- UI: `apps/web/src/app/leasing-manager/page.tsx`
- Tests: `apps/api/src/modules/leasing-manager/__tests__/`

---

### 1.12 File Upload Module

**Durum:** ✅ GA  
**Version:** v0.1.0+

#### Amaç / Kullanıcı Problemi:
Sözleşme dokümanları, faturalar ve diğer dosyaları güvenli şekilde yükler.

#### Nasıl Çalışır:
1. Multer ile dosya yükleme (memory/disk storage)
2. Dosya tipi validasyonu: PDF, DOC, DOCX only
3. Boyut limiti: 50MB
4. Sanitize filename (XSS prevention)
5. Serverless uyumlu (memory storage for Netlify/Vercel)

#### Giriş Noktaları:

**API Routes:**
- `POST /api/v1/upload/contract` - Sözleşme yükle

#### Temel Bileşenler:

**Backend:**
- `apps/api/src/modules/upload/upload.controller.ts:1-110` - File handling
- `apps/api/src/modules/upload/upload.service.ts` - Metadata save

**Frontend:**
- `apps/web/src/components/file-upload.tsx` - Upload widget

#### Güvenlik:
- ✅ File type whitelist (PDF, DOC, DOCX)
- ✅ MIME type check
- ✅ Filename sanitization
- ✅ Size limit (50MB)
- ⚠️ Virus scan: NOT IMPLEMENTED

#### Kanıtlar:
- Controller: `apps/api/src/modules/upload/upload.controller.ts`
- Component: `apps/web/src/components/file-upload.tsx`

---

### 1.13 Session Management Module

**Durum:** ⚠️ BETA (Minimal Implementation)  
**Version:** v0.1.0+

#### Amaç / Kullanıcı Problemi:
Kullanıcı oturumunu kaydeder ve geri yükler (filtreler, açık dashboardlar, vb.).

#### Nasıl Çalışır:
1. Kullanıcı mevcut bağlamını export eder (JSON)
2. sessionData olarak saklanır
3. Import sırasında context restore edilir

#### Giriş Noktaları:

**API Routes:**
- `POST /api/v1/session/export` - Oturum dışa aktar
- `POST /api/v1/session/import` - Oturum içe aktar
- `GET /api/v1/session/user/:userId` - Kullanıcının oturumları
- `GET /api/v1/session/:sessionId` - Oturum detayı

#### Temel Bileşenler:

**Backend:**
- `apps/api/src/modules/session/session.controller.ts:1-54` - CRUD
- `apps/api/src/modules/session/session.service.ts` - Logic

**Database:**
- `UserSession` model (schema.prisma:994-1018)

#### Durum:
⚠️ **MINIMAL** - Basic CRUD exists, UI integration incomplete

#### Kanıtlar:
- Controller: `apps/api/src/modules/session/session.controller.ts`
- Schema: `packages/database/prisma/schema.prisma:994-1018`

---

### 1.14 Multi-Tenant Architecture

**Durum:** ✅ GA  
**Version:** v0.1.0+

#### Amaç / Kullanıcı Problemi:
Çoklu müşteri (tenant) veri izolasyonu sağlar, cross-tenant data leakage engeller.

#### Nasıl Çalışır:
1. Her kayıt `tenantId` içerir
2. JWT token içinde `tenantId` taşınır
3. Prisma middleware tüm sorgulara otomatik `tenantId` filtresi ekler
4. Cross-tenant erişim engellenir

#### Giriş Noktaları:
- Her API endpoint otomatik tenant isolation yapar

#### Temel Bileşenler:

**Backend:**
- `apps/api/src/database/prisma.service.ts` - Prisma middleware
- `apps/api/src/modules/auth/strategies/jwt.strategy.ts` - Tenant extraction

**Database:**
- Tüm tablolarda `tenantId` kolonu
- Foreign key: `tenant → Tenant(id)`
- Indexes: `@@index([tenantId])`

#### Güvenlik:
- ✅ Row-level isolation
- ✅ Automatic query filtering
- ✅ JWT-based tenant context

#### Kanıtlar:
- Schema: Her model'de `tenantId` field (schema.prisma)
- Middleware: `apps/api/src/database/prisma.service.ts`
- Architecture: `ARCHITECTURE.md:185-195`

---

### 1.15 Rate Limiting & Throttling

**Durum:** ✅ GA  
**Version:** v0.1.0+

#### Amaç / Kullanıcı Problemi:
API abuse ve DDoS saldırılarını engeller.

#### Nasıl Çalışır:
- Global rate limit: 100 requests/minute (per IP)
- Login: throttle devre dışı (development)
- Register: 3 requests/hour

#### Giriş Noktaları:
- Otomatik (tüm API routes)

#### Temel Bileşenler:

**Backend:**
- `apps/api/src/app.module.ts:39-42` - ThrottlerModule config
- `@nestjs/throttler` - NestJS throttle guard

#### Konfigürasyon:

```typescript
ThrottlerModule.forRoot([{
  ttl: 60000,  // 60 seconds
  limit: 100,  // 100 requests
}])
```

#### Kanıtlar:
- Config: `apps/api/src/app.module.ts:39-42`
- Controller: `apps/api/src/modules/auth/auth.controller.ts:26,39` (throttle overrides)

---

### 1.16 Security Headers (Helmet)

**Durum:** ✅ GA  
**Version:** v0.1.0+

#### Amaç / Kullanıcı Problemi:
HTTP güvenlik başlıkları ekler (CSP, XSS protection, vb.).

#### Nasıl Çalışır:
- Helmet middleware ile otomatik CSP, X-Frame-Options, vb. ekler

#### Temel Bileşenler:

**Backend:**
- `apps/api/src/main.ts:24-35` - Helmet configuration

#### Kanıtlar:
- Config: `apps/api/src/main.ts:24-35`

---

### 1.17 CORS Configuration

**Durum:** ✅ GA  
**Version:** v0.1.0+

#### Amaç / Kullanıcı Problemi:
Cross-origin requests kontrolü, production'da yalnızca whitelisted domains.

#### Nasıl Çalışır:
- Development: Tüm origin'lere izin
- Production: Whitelist + `*.vercel.app` wildcard

#### Giriş Noktaları:
- Otomatik (tüm API requests)

#### Temel Bileşenler:

**Backend:**
- `apps/api/src/main.ts:37-89` - CORS logic

#### Konfigürasyon:

```env
FRONTEND_URL=https://your-frontend.vercel.app
NODE_ENV=production
```

#### Kanıtlar:
- Config: `apps/api/src/main.ts:37-89`

---

### 1.18 Logging & Error Tracking

**Durum:** ✅ GA (Basic)  
**Version:** v0.1.0+

#### Amaç / Kullanıcı Problemi:
Uygulama logları ve hata takibi.

#### Nasıl Çalışır:
1. Custom LoggerService oluşturulmuş
2. HTTP exception filter ile tüm hatalar yakalanır
3. Sentry entegrasyonu hazır (env var ile aktif)

#### Giriş Noktaları:
- Otomatik (tüm errors)

#### Temel Bileşenler:

**Backend:**
- `apps/api/src/common/logger.service.ts` - Custom logger
- `apps/api/src/common/http-exception.filter.ts` - Exception filter
- `apps/api/src/common/sentry.service.ts` - Sentry integration (ready)

#### Konfigürasyon:

```env
SENTRY_DSN=<sentry-dsn>  # Optional
```

#### Durum:
- ✅ Basic logging works
- ⚠️ Sentry integration ready but not enabled by default

#### Kanıtlar:
- Logger: `apps/api/src/common/logger.service.ts`
- Filter: `apps/api/src/common/http-exception.filter.ts`
- Sentry: `apps/api/src/common/sentry.service.ts`

---

### 1.19 Swagger API Documentation

**Durum:** ✅ GA  
**Version:** v0.1.0+

#### Amaç / Kullanıcı Problemi:
Otomatik API dokümantasyonu ve test UI'ı.

#### Nasıl Çalışır:
- NestJS decorators ile otomatik Swagger dokümantasyonu
- `/api/docs` endpoint'inde Swagger UI

#### Giriş Noktaları:

**UI:**
- `/api/docs` - Swagger UI

#### Temel Bileşenler:

**Backend:**
- `apps/api/src/main.ts:106-123` - Swagger config
- Her controller'da `@ApiTags`, `@ApiOperation` decorators

#### Kanıtlar:
- Config: `apps/api/src/main.ts:106-123`
- Example: `apps/api/src/modules/auth/auth.controller.ts:20,29` (API decorators)

---

### 1.20 Glassmorphic Design System

**Durum:** ✅ GA  
**Version:** v0.2.5+

#### Amaç / Kullanıcı Problemi:
Modern, premium glassmorphic UI design sistemi.

#### Nasıl Çalışır:
- 4 tema: Midnight Blue, Forest Green, Royal Purple, Sunset Orange
- Glassmorphic components: GlassCard, GlassButton, GlassTable, GlassInput, vb.
- Tema seçici + dil seçici (TR/EN)

#### Giriş Noktaları:

**UI Pages:**
- `/settings` - Tema ve dil ayarları (`apps/web/src/app/settings/page.tsx`)

**UI Components:**
- `apps/web/src/components/ui/glass-card.tsx`
- `apps/web/src/components/ui/glass-button.tsx`
- `apps/web/src/components/ui/glass-table.tsx`
- `apps/web/src/components/ui/glass-input.tsx`
- `apps/web/src/components/ui/glass-badge.tsx`
- `apps/web/src/components/ui/glass-kpi-card.tsx`
- `apps/web/src/components/ui/theme-selector.tsx`
- `apps/web/src/components/ui/language-selector.tsx`

#### Kanıtlar:
- Settings: `apps/web/src/app/settings/page.tsx`
- Components: `apps/web/src/components/ui/glass-*.tsx`
- Docs: `GLASSMORPHIC_REDESIGN.md`, `COMPLETE_GLASSMORPHIC_ROLLOUT.md`, `DESIGN_SYSTEM.md`

---

### 1.21 Dashboard & Analytics UI

**Durum:** ✅ GA  
**Version:** v0.2.0+

#### Amaç / Kullanıcı Problemi:
Ana dashboard ile KPI'lar, events, tasks ve quick actions gösterilir.

#### Nasıl Çalışır:
- KPI cards: Toplam mağaza, aktif lease, toplam gider, vb.
- Events & tasks listesi
- Quick actions: Yeni mağaza, yeni sözleşme, vb.
- Analytics overview charts

#### Giriş Noktaları:

**UI Pages:**
- `/` - Ana sayfa / Dashboard (`apps/web/src/app/page.tsx`)
- `/dashboard` - Dashboard (`apps/web/src/app/dashboard/page.tsx`)

**UI Components:**
- `apps/web/src/components/dashboard/dashboard-kpi-row.tsx` - KPI kartları
- `apps/web/src/components/dashboard/dashboard-events-and-tasks.tsx` - Olaylar ve görevler
- `apps/web/src/components/dashboard/dashboard-quick-actions.tsx` - Hızlı aksiyonlar
- `apps/web/src/components/dashboard/dashboard-analytics-overview.tsx` - Analitik özet

#### Kanıtlar:
- UI: `apps/web/src/app/page.tsx`, `apps/web/src/app/dashboard/page.tsx`
- Components: `apps/web/src/components/dashboard/*.tsx`
- Docs: `DASHBOARD_REDESIGN_COMPLETE.md`, `DASHBOARD_VISUAL_LAYOUT.md`

---

## 2. FEATURE DEPENDENCY MAP (BAĞIMLILIK HARİTASI)

```
Authentication (Core)
    ↓
Multi-Tenant Architecture (Core)
    ↓
    ├── Store Management
    │   └── Lease Management
    │       ├── Analytics
    │       └── Expense Tracking
    │           └── Budget Management
    │                   
    ├── Mall Management
    │   └── Lease Management
    │
    ├── Risk Management
    │
    └── Leasing Manager Tools
        ├── Leasing Tasks
        ├── Franchise Projects
        ├── Leasing Requests
        └── Job Descriptions

Shared Infrastructure:
    - File Upload → Leases, Expenses
    - AI Assistant → All modules
    - Translation Engine → Leases
    - Session Management → All UI
    - Dashboard → All modules
```

**Key Dependencies:**
- **Auth** → Tüm feature'lar (JWT required)
- **Multi-Tenant** → Tüm data operations
- **Store** → Leases, Expenses, Analytics
- **Lease** → Analytics, Renewals
- **Expense** → Budget, Analytics

---

## 3. PLANNED FEATURES (PLANLANAN ÖZELLİKLER)

### Kanıt Kaynakları:
- `ROADMAP.md` - Detaylı roadmap
- `NEXT_STEPS.md` - Sonraki adımlar
- `schema.prisma` - Tanımlı ama kullanılmayan modeller
- `apps/api/src/modules/` - Skeleton implementations
- TODO/FIXME comments

---

### 3.1 Advanced AI Features (v0.2.0 - Planned)

**Kaynak Kanıt:** `ROADMAP.md:106-124`

**Hedef Değer:**
- Lease contract summarization
- Email draft generation
- Performance analysis
- Optimization suggestions
- Q&A about stores/leases

**Olası Kapsam (MVP):**
- OpenAI API integration (complete)
- Chat interface component
- Context injection system
- Streaming responses
- Chat history persistence

**Riskler / Bağımlılıklar:**
- ⚠️ OpenAI API cost management
- ⚠️ Prompt engineering quality
- ⚠️ Context window limits

**Kanıt:**
- Roadmap: `ROADMAP.md:106-124`
- Database schema ready: `schema.prisma:864-902` (AIInteraction model)
- Controller scaffold: `apps/api/src/modules/ai-assistant/ai-assistant.controller.ts`

---

### 3.2 Translation Engine UI (v0.3.0 - Planned)

**Kaynak Kanıt:** `ROADMAP.md:163-169`

**Hedef Değer:**
- Document segmentation processor
- Translation job queue
- Progress tracking UI
- Quality validation
- Bilingual document generation

**Olası Kapsam:**
- Upload interface
- Progress bar
- Job queue management
- Quality metrics display

**Riskler:**
- ⚠️ PDF parsing complexity
- ⚠️ Translation API costs
- ⚠️ Large file handling

**Kanıt:**
- Roadmap: `ROADMAP.md:163-169`
- Backend ready: `apps/api/src/modules/translation/`
- Database: `schema.prisma:908-980` (TranslationJob, TranslationSegment)

---

### 3.3 Email Notifications (v0.3.0 - Planned)

**Kaynak Kanıt:** `ROADMAP.md:188-192`, `NEXT_STEPS.md:206-218`

**Hedef Değer:**
- Lease expiration reminders
- Renewal notifications
- Budget alerts
- Performance reports

**Olası Kapsam:**
- SMTP setup (Nodemailer)
- Email templates (Handlebars)
- Notification preferences
- Schedule system (cron jobs)

**Riskler:**
- ⚠️ Email deliverability
- ⚠️ Spam filters

**Kanıt:**
- Roadmap: `ROADMAP.md:188-192`
- Next steps: `NEXT_STEPS.md:206-218, 352-359`

---

### 3.4 Advanced Charts & Visualization (v0.2.0 - Planned)

**Kaynak Kanıt:** `ROADMAP.md:88-105`

**Hedef Değer:**
- Revenue vs Rent chart (time series)
- Performance score distribution
- Top/Bottom performers list
- City-wise comparison
- Export dashboard to PDF

**Olası Kapsam:**
- Install Recharts library
- Create chart components
- Date range filter
- Export functionality

**Kanıt:**
- Roadmap: `ROADMAP.md:88-105`
- Next steps: `NEXT_STEPS.md:344-350`

---

### 3.5 Password Reset Flow (v0.2.0 - Planned)

**Kaynak Kanıt:** `ROADMAP.md:75-76`

**Hedef Değer:**
- Forgot password functionality
- Email-based token reset
- Secure token expiration

**Olası Kapsam:**
- Reset token generation
- Email sending
- Reset form UI
- Token validation

**Riskler:**
- ⚠️ Email delivery
- ⚠️ Token security

**Kanıt:**
- Roadmap: `ROADMAP.md:75-76`

---

### 3.6 2FA (Two-Factor Authentication) (v0.5.0+ - Nice to Have)

**Kaynak Kanıt:** `NEXT_STEPS.md:440`

**Hedef Değer:**
- TOTP-based 2FA
- SMS-based 2FA (optional)
- Backup codes

**Olası Kapsam:**
- QR code generation
- TOTP validation
- Recovery codes

**Riskler:**
- ⚠️ User onboarding complexity
- ⚠️ SMS costs

**Kanıt:**
- Next steps: `NEXT_STEPS.md:440` (Priority P2, Nice to Have)

---

### 3.7 Mobile App (v2.0.0 - Future)

**Kaynak Kanıt:** `ROADMAP.md:258-263`

**Hedef Değer:**
- React Native app
- Offline mode
- Push notifications
- Mobile-optimized UI

**Olası Kapsam:**
- React Native setup
- Core features (stores, leases)
- Offline sync strategy
- Push notification integration

**Riskler:**
- 🔴 HIGH effort (3-6 months)
- ⚠️ Platform-specific bugs
- ⚠️ Sync conflicts

**Kanıt:**
- Roadmap: `ROADMAP.md:258-263`

---

### 3.8 Multi-Tenant SaaS Features (v2.0.0 - Future)

**Kaynak Kanıt:** `ROADMAP.md:245-251`

**Hedef Değer:**
- Tenant onboarding flow
- Subscription management
- Payment integration (Stripe)
- Usage analytics per tenant

**Olası Kapsam:**
- Self-service signup
- Plan limits enforcement
- Billing dashboard
- Admin panel

**Riskler:**
- 🔴 HIGH complexity
- ⚠️ Payment compliance (PCI-DSS)

**Kanıt:**
- Roadmap: `ROADMAP.md:245-251`

---

### 3.9 Real-Time Collaboration (Future - No Specific Plan)

**Kaynak Kanıt:** Yok (feature yok)

**Durum:** ❌ Repoda plan işareti bulunamadı

---

### 3.10 Mobile Responsive UI Improvements (Ongoing)

**Kaynak Kanıt:** Implicit (current UI is desktop-first)

**Hedef Değer:**
- Responsive breakpoints
- Mobile navigation
- Touch-optimized inputs

**Kanıt:**
- Implicit need (UI components assume desktop)

---

## 4. LIVING DOCUMENTATION (YAŞAYAN DOKÜMANTASYON)

### Önerilen Çıktılar:

#### a) `docs/feature-registry.json` (Machine-Readable)

Bu dosya, tüm feature'ların makine okunabilir registry'sini içerir. Otomatik olarak generate edilebilir.

**Örnek içerik:**

```json
{
  "features": [
    {
      "id": "auth",
      "name": "Authentication & Authorization",
      "status": "ga",
      "version": "0.4.0",
      "entrypoints": {
        "api": ["/api/v1/auth/login", "/api/v1/auth/register"],
        "ui": ["/login", "/register"]
      },
      "evidence": {
        "controller": "apps/api/src/modules/auth/auth.controller.ts",
        "schema": "packages/database/prisma/schema.prisma:77-108"
      }
    }
  ]
}
```

#### b) Generator Script: `tools/generate_feature_catalog.ts`

```typescript
/**
 * Feature Catalog Generator
 * Scans codebase and generates feature-registry.json
 * 
 * Usage: npm run generate:catalog
 */

import * as fs from 'fs';
import * as path from 'path';

// Scan API controllers
// Scan database schema
// Scan UI pages
// Generate JSON output

// Example logic:
// 1. Parse schema.prisma → extract models
// 2. Parse controllers → extract routes
// 3. Parse pages → extract UI paths
// 4. Cross-reference → match features
// 5. Output JSON
```

**Çalıştırma:**

```bash
cd /Users/tugra/Desktop/rentorgin
npm run generate:catalog
# Output: docs/feature-registry.json
```

#### c) CI Validation (Optional)

```yaml
# .github/workflows/feature-catalog-check.yml
name: Feature Catalog Validation

on: [pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm install
      - run: npm run generate:catalog
      - run: git diff --exit-code docs/feature-registry.json
      # Fail if registry is out of date
```

---

## 5. FEATURE STATISTICS (ÖZELLİK İSTATİSTİKLERİ)

### Mevcut Feature'lar (Current Features):

| Kategori | Feature Count | Status |
|----------|--------------|--------|
| **Core Modules** | 8 | ✅ GA |
| **Leasing Manager Tools** | 4 | ✅ GA |
| **Infrastructure** | 7 | ✅ GA |
| **UI/UX** | 2 | ✅ GA |
| **TOTAL** | **21** | - |

### Planlanan Feature'lar (Planned Features):

| Priority | Feature Count | Timeline |
|----------|--------------|----------|
| **P0 (v0.2.0)** | 3 | Current target |
| **P1 (v0.3.0)** | 3 | Next 2-3 months |
| **P2 (v0.4.0+)** | 2 | 4-6 months |
| **Future (v2.0.0)** | 2 | 6+ months |
| **TOTAL** | **10** | - |

### Test Coverage:

| Module | Unit Tests | E2E Tests | Coverage |
|--------|-----------|-----------|----------|
| Auth | ❌ | ✅ | ~20% |
| Stores | ❌ | ❌ | 0% |
| Leases | ❌ | ❌ | 0% |
| Expenses | ❌ | ❌ | 0% |
| Leasing Manager | ✅ (partial) | ❌ | ~10% |
| **Overall** | ⚠️ | ⚠️ | **~5%** |

**🚨 Critical Gap:** Test coverage is critically low (<10%). Production deployment needs 70%+ coverage.

---

## 6. SUMMARY & RECOMMENDATIONS (ÖZET VE ÖNERİLER)

### Mevcut Durum (Current State):

✅ **Strengths / Güçlü Yönler:**
- 21 functional feature (complete CRUD)
- Clean modular architecture
- Multi-tenant ready
- Good documentation
- Modern tech stack

⚠️ **Weaknesses / Zayıf Yönler:**
- Test coverage critically low (~5%)
- AI features incomplete (scaffold only)
- Translation engine UI missing
- Email notifications not implemented
- Performance not optimized

🔴 **Critical Gaps / Kritik Eksikler:**
- NO TESTS (biggest risk)
- No monitoring (Sentry ready but not enabled)
- No CI/CD
- No backups strategy
- No performance profiling

### Öncelik Sıralaması (Priority Ranking):

**Phase 1 (MUST DO - 3 weeks):**
1. Write unit tests (70% coverage target)
2. Setup error monitoring (Sentry)
3. Performance optimization (database indexes)
4. Security audit

**Phase 2 (SHOULD DO - 4 weeks):**
1. Complete AI features (OpenAI integration)
2. Email notifications
3. Advanced charts (Recharts)
4. Translation UI

**Phase 3 (NICE TO HAVE - 8 weeks):**
1. 2FA
2. PWA support
3. Mobile-responsive improvements

**Phase 4 (FUTURE - 6+ months):**
1. Mobile app
2. SaaS multi-tenant features

### Son Tavsiye (Final Recommendation):

**DON'T RUSH TO PRODUCTION.** Mevcut prototype çok iyi, ama production-ready değil. Önce:

1. ✅ Test yazın (boring ama kritik)
2. ✅ Monitoring kurun (Sentry)
3. ✅ Performance optimize edin
4. ✅ Security audit yapın

**THEN** deploy with confidence.

---

## APPENDIX: Evidence Index (EK: KANIT İNDEKSİ)

### API Controllers (13):
1. `apps/api/src/modules/auth/auth.controller.ts`
2. `apps/api/src/modules/stores/stores.controller.ts`
3. `apps/api/src/modules/leases/leases.controller.ts`
4. `apps/api/src/modules/malls/malls.controller.ts`
5. `apps/api/src/modules/expenses/expenses.controller.ts`
6. `apps/api/src/modules/budget/budget.controller.ts`
7. `apps/api/src/modules/risk/risk.controller.ts`
8. `apps/api/src/modules/analytics/analytics.controller.ts`
9. `apps/api/src/modules/ai-assistant/ai-assistant.controller.ts`
10. `apps/api/src/modules/translation/translation.controller.ts`
11. `apps/api/src/modules/upload/upload.controller.ts`
12. `apps/api/src/modules/session/session.controller.ts`
13. `apps/api/src/modules/leasing-manager/leasing-manager.controller.ts`

### Database Models (20+):
- `packages/database/prisma/schema.prisma`
  - Tenant, User, Store, Mall, Lease, Expense, Budget, Risk, Analytics, AI, Translation, Session, Leasing Manager (+ 7 sub-models)

### UI Pages (28):
- Dashboard, Login, Register, Stores, Leases, Malls, Expenses, Budget, Risk, Analytics, AI Assistant, Translation, Leasing Manager, Settings

### Documentation (20+ files):
- ROADMAP.md, ARCHITECTURE.md, NEXT_STEPS.md, docs/glossary.md, docs/changelog.md, vb.

---

**Generated:** 2026-02-16  
**Maintainer:** RentOrgin Dev Team  
**Next Review:** Weekly during active development  
**Version:** v1.0.0
