# RentOrgin - Architectural Principles & Immutable Rules
# RentOrgin - Mimari İlkeler & Değişmez Kurallar

**Version:** v0.1.0  
**Last Updated:** 2025-12-04

---

## 🇬🇧 ENGLISH

### Core Architectural Principles

#### 1. MODULARITY FIRST ⚙️
**Rule:** NEVER create monolithic structures. Every feature must be a separate, independent module.

**Why:** 
- Easy to test, maintain, and scale
- New features don't break existing ones
- SaaS-ready architecture from day one

**Implementation:**
- Each business domain = separate module
- Loose coupling between modules
- High cohesion within modules
- Clear interface contracts

#### 2. SAAS-READY FROM START 🌐
**Rule:** Design for multi-tenancy from the beginning.

**Why:**
- Future-proof architecture
- Easy to scale to multiple customers
- Data isolation is critical

**Implementation:**
- Tenant-based data separation in database
- Tenant context in every API call
- Isolated storage per tenant
- Row-level security (RLS) in database

#### 3. FILE SYSTEM PERFECTION 📁
**Rule:** NO duplicate filenames across the project, even in different folders. Consistent naming convention.

**Why:**
- Prevents confusion and import errors
- Easy to search and refactor
- Professional codebase standards

**Implementation:**
- Use kebab-case for files: `lease-contract.service.ts`
- Unique, descriptive names: `lease-renewal-workflow.ts` NOT `workflow.ts`
- No uppercase/lowercase confusion

#### 4. DOCUMENTATION IS MANDATORY 📚
**Rule:** Every function, class, and module MUST have docstrings in both Turkish and English.

**Why:**
- Knowledge transfer
- Onboarding new developers
- Future maintenance

**Implementation:**
```typescript
/**
 * Calculates rent escalation based on contract terms
 * Sözleşme şartlarına göre kira artışını hesaplar
 * 
 * @param contract - Lease contract object / Kira sözleşmesi nesnesi
 * @param year - Year to calculate for / Hesaplama yılı
 * @returns Escalated rent amount / Artırılmış kira tutarı
 */
function calculateRentEscalation(contract: LeaseContract, year: number): number {
  // Implementation
}
```

#### 5. SEMANTIC VERSIONING 🔢
**Rule:** Use semantic versioning (MAJOR.MINOR.PATCH) and document every change.

**Why:**
- Clear release history
- Easy rollback if needed
- Professional deployment process

**Implementation:**
- **MAJOR:** Breaking changes (v1.0.0 → v2.0.0)
- **MINOR:** New features, backward compatible (v1.0.0 → v1.1.0)
- **PATCH:** Bug fixes (v1.0.0 → v1.0.1)
- Update `docs/changelog.md` for every version

#### 6. DATABASE FLEXIBILITY 🗄️
**Rule:** Database structure must be easily modifiable through migrations.

**Why:**
- Business requirements change
- Continuous improvement
- No downtime deployments

**Implementation:**
- All schema changes via Prisma migrations
- Never manual SQL on production
- Migration files are versioned and documented
- Rollback strategy for every migration

#### 7. ERROR HANDLING & LOGGING 🚨
**Rule:** Every error must be logged with context. Repeated errors must generate new solutions.

**Why:**
- Debugging efficiency
- Learn from mistakes
- Prevent recurring issues

**Implementation:**
- Centralized error logging in `logs/error-log.md`
- Error metadata: timestamp, module, user context, stack trace
- If same error repeats, mark previous solution as ineffective
- Generate alternative solutions

#### 8. AI LEARNING FROM USER BEHAVIOR 🤖
**Rule:** System must learn from user interactions to improve prompts and suggestions.

**Why:**
- Personalized experience
- Continuous improvement
- Higher user satisfaction

**Implementation:**
- Log user actions: accepted/rejected suggestions
- Track most-used features and prompts
- Generate improvement reports
- Update `docs/prompts.md` regularly

#### 9. CLEAN CODE STANDARDS 🧹
**Rule:** Code must follow industry best practices and be self-documenting.

**Why:**
- Maintainability
- Team collaboration
- Professional quality

**Implementation:**
- TypeScript strict mode
- ESLint + Prettier
- Max file length: 700 lines (per user rules)
- Remove unused imports and dead code
- Single Responsibility Principle (SRP)

#### 10. TEST-DRIVEN DEVELOPMENT (TDD) ✅
**Rule:** Critical business logic must have unit tests.

**Why:**
- Prevent regressions
- Confidence in refactoring
- Documentation through tests

**Implementation:**
- Jest for backend
- React Testing Library for frontend
- E2E tests with Playwright
- Minimum 70% code coverage for core modules

---

## 🇹🇷 TÜRKÇE

### Temel Mimari İlkeler

#### 1. MODÜLERLİK ÖNCELİKLİDİR ⚙️
**Kural:** ASLA monolitik yapılar oluşturma. Her özellik ayrı, bağımsız bir modül olmalı.

**Neden:**
- Test, bakım ve ölçeklendirme kolaylığı
- Yeni özellikler mevcut olanları bozmaz
- İlk günden SaaS'a hazır mimari

**Uygulama:**
- Her iş alanı = ayrı modül
- Modüller arası gevşek bağlılık
- Modül içinde yüksek uyum
- Net arayüz sözleşmeleri

#### 2. BAŞTAN SAAS'A HAZIR 🌐
**Kural:** Multi-tenant yapı için baştan tasarla.

**Neden:**
- Geleceğe hazır mimari
- Birden fazla müşteriye kolayca ölçeklenir
- Veri izolasyonu kritik

**Uygulama:**
- Veritabanında tenant bazlı veri ayrımı
- Her API çağrısında tenant context
- Tenant başına izole storage
- Veritabanında satır düzeyi güvenlik (RLS)

#### 3. KUSURSUZ DOSYA SİSTEMİ 📁
**Kural:** Farklı klasörlerde bile aynı isimde dosya OLMAYACAK. Tutarlı isimlendirme.

**Neden:**
- Karışıklık ve import hatalarını önler
- Arama ve refactor kolaylığı
- Profesyonel kod tabanı standartları

**Uygulama:**
- Dosyalar için kebab-case: `lease-contract.service.ts`
- Benzersiz, açıklayıcı isimler: `lease-renewal-workflow.ts`, `workflow.ts` DEĞİL
- Büyük/küçük harf karmaşası yok

#### 4. DOKÜMANTASYON ZORUNLUDUR 📚
**Kural:** Her fonksiyon, class ve modül için Türkçe VE İngilizce docstring olmalı.

**Neden:**
- Bilgi transferi
- Yeni geliştiricilerin adaptasyonu
- Gelecekteki bakım

#### 5. SEMANTİK VERSİYONLAMA 🔢
**Kural:** Semantic versioning kullan ve her değişikliği belgele.

**Neden:**
- Net sürüm geçmişi
- Gerekirse kolay geri alma
- Profesyonel deployment süreci

#### 6. VERİTABANI ESNEKLİĞİ 🗄️
**Kural:** Veritabanı yapısı migration'lar ile kolayca değiştirilebilir olmalı.

**Neden:**
- İş gereksinimleri değişir
- Sürekli iyileştirme
- Kesintisiz deployment

#### 7. HATA YÖNETİMİ & LOGLAMA 🚨
**Kural:** Her hata context ile loglanmalı. Tekrarlanan hatalar yeni çözümler üretmeli.

**Neden:**
- Hata ayıklama verimliliği
- Hatalardan öğrenme
- Tekrarlayan sorunları önleme

#### 8. KULLANICI DAVRANIŞINDAN ÖĞRENME 🤖
**Kural:** Sistem, kullanıcı etkileşimlerinden öğrenerek prompt'ları iyileştirmeli.

**Neden:**
- Kişiselleştirilmiş deneyim
- Sürekli iyileştirme
- Daha yüksek kullanıcı memnuniyeti

#### 9. TEMİZ KOD STANDARTLARI 🧹
**Kural:** Kod, endüstri best practice'lerine uymalı ve kendi kendini belgeleyen olmalı.

**Neden:**
- Sürdürülebilirlik
- Takım çalışması
- Profesyonel kalite

**Uygulama:**
- TypeScript strict mode
- ESLint + Prettier
- Max dosya uzunluğu: 700 satır
- Kullanılmayan import'ları ve ölü kodu sil
- Tek Sorumluluk İlkesi (SRP)

#### 10. TEST ODAKLI GELİŞTİRME (TDD) ✅
**Kural:** Kritik iş mantığı için unit test olmalı.

**Neden:**
- Regresyonları önler
- Refactor'da güven
- Test'ler ile dokümantasyon

---

## 📐 Technical Standards

### Code Quality Metrics
- **Max File Length:** 700 lines
- **Max Function Length:** 50 lines
- **Max Function Parameters:** 5 parameters
- **Code Coverage:** Minimum 70% for core modules
- **Cyclomatic Complexity:** Maximum 10 per function

### Naming Conventions
- **Files:** kebab-case (`lease-contract.ts`)
- **Classes:** PascalCase (`LeaseContract`)
- **Functions:** camelCase (`calculateRent()`)
- **Constants:** UPPER_SNAKE_CASE (`MAX_LEASE_YEARS`)
- **Interfaces:** PascalCase with 'I' prefix optional (`ILeaseContract` or `LeaseContract`)

### Git Workflow
- **Branches:** `feature/`, `bugfix/`, `hotfix/`, `release/`
- **Commits:** Conventional Commits (feat:, fix:, docs:, refactor:, test:)
- **PRs:** Require code review + tests passing
- **Main Branch:** Protected, no direct commits

---

#### 11. DOMAIN-DRIVEN DESIGN 🎯
**Rule:** The system must understand and encode the business domain expertise into its data model and workflows.

**Why:**
- The application becomes intelligent about the business it serves
- Reduces need for manual configuration
- Provides expert-level insights and automation

**Implementation:**
- Encode role responsibilities, skills, and workflows as first-class domain entities
- Use domain knowledge to generate intelligent suggestions and templates
- Link operational data with role definitions
- Example: Leasing Manager module knows the full scope of leasing manager responsibilities and can generate job descriptions, task templates, and performance metrics

**Kural:** Sistem, iş alanı uzmanlığını veri modeline ve iş akışlarına kodlamalıdır.

**Neden:**
- Uygulama hizmet ettiği işletme hakkında zeki hale gelir
- Manuel yapılandırma ihtiyacını azaltır
- Uzman düzeyinde içgörüler ve otomasyon sağlar

**Uygulama:**
- Rol sorumluluklarını, yeteneklerini ve iş akışlarını birinci sınıf domain varlıkları olarak kodla
- Akıllı öneriler ve şablonlar oluşturmak için domain bilgisini kullan
- Operasyonel verileri rol tanımlarıyla ilişkilendir
- Örnek: Kiralama Yöneticisi modülü, kiralama yöneticisi sorumluluklarının tam kapsamını bilir ve iş tanımları, görev şablonları ve performans metrikleri üretebilir

---

**These principles are immutable and must be enforced in every code change.**
**Bu ilkeler değişmezdir ve her kod değişikliğinde uygulanmalıdır.**

**Last Updated:** 2025-12-11

