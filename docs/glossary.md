# Code Glossary - Kod Sözlüğü

**Purpose / Amaç:**  
This glossary documents every module, function, and file in the RentOrgin codebase. Each entry explains what it does, how it works, and the design rationale.

Bu sözlük, RentOrgin kod tabanındaki her modül, fonksiyon ve dosyayı belgeler. Her giriş ne işe yaradığını, nasıl çalıştığını ve tasarım mantığını açıklar.

---

## Project Structure - Proje Yapısı

### `/apps/web/`
**EN:** Next.js 14 frontend application. Contains all user-facing UI components, pages, and client-side logic.  
**TR:** Next.js 14 frontend uygulaması. Tüm kullanıcı arayüzü bileşenlerini, sayfaları ve istemci tarafı mantığını içerir.

**Key Responsibilities:**
- User interface rendering
- Client-side state management
- API communication
- User authentication flow

---

### `/apps/api/`
**EN:** NestJS backend API. Handles all business logic, data validation, and database operations.  
**TR:** NestJS backend API. Tüm iş mantığını, veri doğrulamasını ve veritabanı işlemlerini yönetir.

**Key Responsibilities:**
- RESTful API endpoints
- Business rule enforcement
- Database queries via Prisma
- Authentication & authorization
- Multi-tenant context management

---

### `/packages/core-domain/`
**EN:** Core domain models and business logic. Framework-agnostic TypeScript interfaces and types.  
**TR:** Temel domain modelleri ve iş mantığı. Framework'den bağımsız TypeScript arayüzleri ve tipleri.

**Key Responsibilities:**
- Entity definitions (Store, Lease, Mall, etc.)
- Business rule interfaces
- Value objects
- Domain events
- Shared types across frontend/backend

**Design Rationale:**  
By separating domain logic from frameworks, we can:
- Reuse logic across different platforms
- Test business rules independently
- Easily migrate to different frameworks if needed

---

### `/packages/ui-components/`
**EN:** Reusable React components library. Shared across all frontend applications.  
**TR:** Yeniden kullanılabilir React bileşen kütüphanesi. Tüm frontend uygulamaları arasında paylaşılır.

**Key Responsibilities:**
- Buttons, forms, modals, cards
- Layout components
- Data visualization components
- Consistent design system

---

### `/packages/shared-utils/`
**EN:** Common utility functions used by both frontend and backend.  
**TR:** Hem frontend hem backend tarafından kullanılan ortak yardımcı fonksiyonlar.

**Key Responsibilities:**
- Date formatting
- Number/currency formatting
- Validation helpers
- String manipulation
- Constants

---

### `/packages/database/`
**EN:** Prisma ORM configuration, schema definitions, and migrations.  
**TR:** Prisma ORM yapılandırması, şema tanımları ve migration'lar.

**Key Responsibilities:**
- Database schema as code
- Migration versioning
- Seed data for development
- Database client generation

---

### `/docs/`
**EN:** Project documentation in Turkish and English.  
**TR:** Proje dokümantasyonu (Türkçe ve İngilizce).

**Files:**
- `principles.md` - Architectural principles
- `prompts.md` - AI prompt history
- `glossary.md` - This file
- `changelog.md` - Version history

---

### `/logs/`
**EN:** System logs and error tracking.  
**TR:** Sistem logları ve hata takibi.

**Files:**
- `error-log.md` - All errors with solutions
- `access-log.json` - API access logs (production)
- `performance-log.json` - Performance metrics

---

### `/storage/`
**EN:** User-uploaded files and session exports.  
**TR:** Kullanıcı yüklemeleri ve oturum dışa aktarmaları.

**Subdirectories:**
- `uploads/` - Contract PDFs, analysis files
- `sessions/` - User session JSON exports

---

## Core Modules - Temel Modüller

### 1. Lease Management Module - Kira Sözleşmesi Yönetimi Modülü

**Location:** `apps/api/src/modules/lease-management/`

#### Purpose / Amaç
**EN:** Manages all lease contracts for retail stores, including versioning, renewals, and document storage.  
**TR:** Perakende mağazaları için tüm kira sözleşmelerini yönetir; versiyonlama, yenileme ve doküman saklama dahil.

#### Key Components / Ana Bileşenler

##### `lease-contract.entity.ts`
**EN:** Core entity representing a lease contract.  
**TR:** Kira sözleşmesini temsil eden temel varlık.

**Fields:**
- `id` - Unique identifier
- `storeId` - Related store
- `landlordId` - Landlord/mall reference
- `startDate` - Contract start
- `endDate` - Contract end
- `monthlyRent` - Base rent amount
- `escalationClause` - Rent increase terms
- `renewalOptions` - Renewal terms
- `status` - active, expired, pending, cancelled

**Methods:**
- `calculateCurrentRent()` - Calculates rent with escalation
- `isNearingExpiration()` - Checks if renewal needed
- `getRemainingDays()` - Days until expiration

---

##### `lease-renewal.service.ts`
**EN:** Handles lease renewal workflows.  
**TR:** Kira yenileme iş akışlarını yönetir.

**Methods:**
- `scheduleRenewalReminder()` - Creates renewal tasks
- `createRenewalProposal()` - Generates renewal offer
- `trackNegotiation()` - Logs negotiation steps
- `finalizeRenewal()` - Completes renewal process

**Logic:**
1. Detect contracts expiring in 90 days
2. Send notification to responsible user
3. Create task in task management system
4. Track negotiation progress
5. Update contract upon completion

---

### 2. Mall Relations Module - AVM İlişkileri Modülü

**Location:** `apps/api/src/modules/mall-relations/`

#### Purpose / Amaç
**EN:** Manages relationships with mall management companies, including contacts, negotiations, and dispute resolution.  
**TR:** AVM yönetim şirketleriyle ilişkileri yönetir; kontaklar, müzakereler ve uyuşmazlık çözümü dahil.

#### Key Components / Ana Bileşenler

##### `mall.entity.ts`
**EN:** Represents a mall or property.  
**TR:** Bir AVM veya mülkü temsil eder.

**Fields:**
- `id`, `name`, `location`
- `managementCompany` - Property management company
- `contactPersons` - Array of contacts
- `relationship` - excellent, good, fair, poor
- `negotiationHistory` - Past discussions

---

##### `negotiation-tracker.service.ts`
**EN:** Tracks ongoing negotiations with landlords.  
**TR:** Mal sahipleriyle devam eden müzakereleri takip eder.

**Methods:**
- `createNegotiation()` - Start new negotiation
- `logInteraction()` - Record meeting/email
- `updateStatus()` - Progress tracking
- `generateSummary()` - AI-powered summary

---

### 3. Location Analytics Module - Lokasyon Analizi Modülü

**Location:** `apps/api/src/modules/location-analytics/`

#### Purpose / Amaç
**EN:** Analyzes store performance by location, providing metrics and recommendations.  
**TR:** Mağaza performansını lokasyona göre analiz eder; metrikler ve öneriler sunar.

#### Key Components / Ana Bileşenler

##### `performance-calculator.service.ts`
**EN:** Calculates key performance indicators (KPIs) for each store.  
**TR:** Her mağaza için ana performans göstergelerini (KPI) hesaplar.

**Metrics Calculated:**
- Rent-to-revenue ratio (%)
- Revenue per sqm (₺/m²)
- Foot traffic conversion rate
- Profitability index
- Benchmark comparison

**Methods:**
- `calculateRentToRevenueRatio()`
- `getIndustryBenchmark()`
- `generatePerformanceScore()`
- `recommendAction()` - continue, renegotiate, relocate, close

---

### 4. Feasibility Analysis Module - Fizibilite Analizi Modülü

**Location:** `apps/api/src/modules/feasibility/`

#### Purpose / Amaç
**EN:** Performs cost-benefit analysis for store decisions (open, close, relocate, resize).  
**TR:** Mağaza kararları için maliyet-fayda analizi yapar (açma, kapama, taşıma, boyutlandırma).

#### Key Components / Ana Bileşenler

##### `feasibility-calculator.service.ts`
**EN:** Calculates financial projections for different scenarios.  
**TR:** Farklı senaryolar için finansal projeksiyonlar hesaplar.

**Methods:**
- `projectRevenue()` - Forecast future revenue
- `calculateBreakEven()` - Break-even analysis
- `compareScenarios()` - Compare multiple options
- `generateReport()` - Detailed PDF report

---

### 5. Expense Tracking Module - Gider Takibi Modülü

**Location:** `apps/api/src/modules/expense-tracking/`

#### Purpose / Amaç
**EN:** Tracks rent, common area charges, and other expenses with dispute management.  
**TR:** Kira, ortak alan giderleri ve diğer masrafları uyuşmazlık yönetimiyle takip eder.

#### Key Components / Ana Bileşenler

##### `expense.entity.ts`
**Fields:**
- `type` - rent, cac (common area charge), utility, maintenance
- `amount`, `dueDate`, `paidDate`
- `status` - pending, paid, disputed, overdue
- `disputeReason` - If status is disputed

##### `dispute-manager.service.ts`
**EN:** Manages expense disputes with landlords.  
**TR:** Mal sahipleriyle gider uyuşmazlıklarını yönetir.

---

### 6. Contract Optimization Module - Sözleşme Optimizasyonu Modülü

**Location:** `apps/api/src/modules/contract-optimization/`

#### Purpose / Amaç
**EN:** AI-powered analysis of contract terms with recommendations for tenant-favorable changes.  
**TR:** Sözleşme şartlarının yapay zeka ile analizi ve kiracı lehine değişiklik önerileri.

#### Key Components / Ana Bileşenler

##### `optimization-engine.service.ts`
**EN:** Analyzes contracts and suggests improvements.  
**TR:** Sözleşmeleri analiz eder ve iyileştirmeler önerir.

**Methods:**
- `analyzeContract()` - Review terms
- `identifyWeaknesses()` - Find unfavorable clauses
- `suggestAlternatives()` - Propose better terms
- `generateNegotiationPlaybook()` - Strategy document

---

### 7. Space Management Module - Alan Yönetimi Modülü

**Location:** `apps/api/src/modules/space-management/`

#### Purpose / Amaç
**EN:** Manages store space changes: expansion, downsizing, relocation, renovation.  
**TR:** Mağaza alan değişikliklerini yönetir: genişleme, küçültme, taşınma, yenileme.

#### Key Components / Ana Bileşenler

##### `space-change-request.entity.ts`
**EN:** Tracks space modification requests.  
**TR:** Alan değişikliği taleplerini takip eder.

**Workflow:**
1. Request submission
2. Feasibility analysis
3. Approval process
4. Negotiation with landlord
5. Implementation
6. Completion

---

### 8. Budget & Risk Management Module - Bütçe & Risk Yönetimi Modülü

**Location:** `apps/api/src/modules/budget-risk/`

#### Purpose / Amaç
**EN:** Tracks rental budget across portfolio and identifies financial risks.  
**TR:** Portföy genelinde kiralama bütçesini takip eder ve finansal riskleri belirler.

#### Key Components / Ana Bileşenler

##### `budget-tracker.service.ts`
**EN:** Monitors budget vs. actual spending.  
**TR:** Bütçe vs. gerçekleşen harcamaları izler.

**Views:**
- By location (city, district)
- By brand/concept
- By mall type
- By time period

##### `risk-analyzer.service.ts`
**EN:** Identifies financial and operational risks.  
**TR:** Finansal ve operasyonel riskleri belirler.

**Risk Categories:**
- High rent-to-revenue ratio
- Expiring contracts without renewal plan
- Underperforming locations
- Landlord relationship issues
- Market condition changes

---

## AI Assistant System - Yapay Zeka Asistan Sistemi

**Location:** `apps/api/src/modules/ai-assistant/`

### Purpose / Amaç
**EN:** Context-aware AI assistant available on every screen.  
**TR:** Her ekranda kullanılabilir, bağlam-farkındalıklı yapay zeka asistanı.

### Key Components / Ana Bileşenler

#### `ai-prompt-manager.service.ts`
**EN:** Manages prompt templates and user context.  
**TR:** Prompt şablonlarını ve kullanıcı bağlamını yönetir.

**Methods:**
- `loadPromptTemplate()` - Get template by ID
- `injectContext()` - Add user/store context
- `callLLM()` - Send to OpenAI/custom LLM
- `parseResponse()` - Structure AI output
- `logInteraction()` - Track for learning

---

#### `prompt-learning.service.ts`
**EN:** Learns from user behavior to improve prompts over time.  
**TR:** Kullanıcı davranışlarından öğrenerek zaman içinde prompt'ları iyileştirir.

**Data Collected:**
- Prompt acceptance rate
- User edits to AI output
- Most/least used features
- User satisfaction ratings

**Improvement Process:**
1. Collect interaction data
2. Identify patterns (e.g., users always change tone)
3. Generate improvement suggestions
4. Test refined prompts
5. Deploy better versions

---

## Translation Engine - Çeviri Motoru

**Location:** `apps/api/src/modules/translation/`

### Purpose / Amaç
**EN:** Translates large contract documents with high fidelity using segmentation.  
**TR:** Büyük sözleşme dokümanlarını segmentasyon kullanarak yüksek doğrulukla çevirir.

### Key Components / Ana Bileşenler

#### `document-segmenter.service.ts`
**EN:** Splits large documents into manageable segments.  
**TR:** Büyük dokümanları yönetilebilir parçalara böler.

**Logic:**
- Target: 500 words per segment
- Preserve paragraph boundaries
- Maintain context overlap (50 words)
- Track segment metadata (position, page number)

---

#### `translation-engine.service.ts`
**EN:** Translates each segment with quality rules.  
**TR:** Her segmenti kalite kurallarıyla çevirir.

**Quality Rules:**
- Sentence length ±10% character count
- Vowel ending preservation (if possible)
- Legal term precision
- Formatting preservation

**Methods:**
- `translateSegment()` - Translate one segment
- `validateTranslation()` - Check quality
- `trackProgress()` - Update progress bar
- `reassembleDocument()` - Combine segments
- `generateBilingualPDF()` - Side-by-side output

---

## Session Management - Oturum Yönetimi

**Location:** `apps/api/src/modules/session/`

### Purpose / Amaç
**EN:** Allows users to save and restore their work session as JSON.  
**TR:** Kullanıcıların çalışma oturumlarını JSON olarak kaydetmelerine ve geri yüklemelerine izin verir.

### Key Components / Ana Bileşenler

#### `session-exporter.service.ts`
**EN:** Exports current user context to JSON.  
**TR:** Mevcut kullanıcı bağlamını JSON'a aktarır.

**Exported Data:**
- Active filters and selections
- Open dashboards
- Generated reports (cached)
- AI conversation history
- User preferences

---

#### `session-importer.service.ts`
**EN:** Restores session from JSON file.  
**TR:** Oturumu JSON dosyasından geri yükler.

**Methods:**
- `validateVersion()` - Check compatibility
- `migrateIfNeeded()` - Update old session format
- `restoreContext()` - Recreate user state
- `verifyIntegrity()` - Ensure data consistency

---

## Utility Functions - Yardımcı Fonksiyonlar

### `formatCurrency(amount: number, currency: string): string`
**EN:** Formats numbers as currency with locale support.  
**TR:** Sayıları yerel ayarlarla para birimi olarak biçimlendirir.

**Example:**
```typescript
formatCurrency(12500, 'TRY') // "₹12.500,00"
formatCurrency(12500, 'USD') // "$12,500.00"
```

---

### `calculateEscalation(baseRent: number, escalationRate: number, years: number): number`
**EN:** Calculates escalated rent based on annual increase rate.  
**TR:** Yıllık artış oranına göre artan kirayı hesaplar.

**Formula:** `baseRent * (1 + escalationRate) ^ years`

---

### `isNearingExpiration(endDate: Date, daysThreshold: number = 90): boolean`
**EN:** Checks if a contract is expiring soon.  
**TR:** Bir sözleşmenin yakında sona erip ermediğini kontrol eder.

---

## Database Schema - Veritabanı Şeması

### Multi-Tenant Design / Çoklu Müşteri Tasarımı

**EN:** Every table includes `tenantId` for data isolation.  
**TR:** Her tablo, veri izolasyonu için `tenantId` içerir.

**Key Tables:**
- `tenants` - Customer organizations
- `users` - User accounts (linked to tenant)
- `stores` - Retail locations
- `leases` - Lease contracts
- `malls` - Shopping malls
- `expenses` - Expense records
- `analytics` - Performance metrics
- `ai_interactions` - AI assistant logs
- `sessions` - Saved sessions

---

## Error Handling - Hata Yönetimi

### Error Categories / Hata Kategorileri

1. **ValidationError** - Invalid input data
2. **AuthenticationError** - Login/permission issues
3. **DatabaseError** - DB connection/query failures
4. **ExternalAPIError** - Third-party API failures
5. **BusinessRuleError** - Domain rule violations

**All errors logged to:** `logs/error-log.md`

---

## Leasing Manager Module - Kiralama Yöneticisi Modülü

### Overview / Genel Bakış
**EN:** Comprehensive module for managing leasing operations, franchise development, and generating job descriptions for leasing manager positions. This module transforms the system into a domain-aware platform that understands the responsibilities, skills, and workflows of a Leasing Manager role.

**TR:** Kiralama operasyonlarını yönetmek, franchise geliştirmek ve kiralama yöneticisi pozisyonları için iş tanımları oluşturmak için kapsamlı modül. Bu modül, sistemi Kiralama Yöneticisi rolünün sorumluluklarını, yeteneklerini ve iş akışlarını anlayan domain bilincine sahip bir platforma dönüştürür.

---

### Core Entities / Temel Varlıklar

#### `LeasingManagerRoleTemplate`
**EN:** Template defining core responsibilities, skills, and sectors for Leasing Manager positions.  
**TR:** Kiralama Yöneticisi pozisyonları için temel sorumluluklar, yetenekler ve sektörleri tanımlayan şablon.

**Fields:**
- `nameTR`, `nameEN` - Role names (TR/EN)
- `coreResponsibilities` - List of key responsibilities
- `coreSkills` - Required competencies
- `sectors` - Applicable industry sectors
- `seniorityLevel` - Entry, Mid, Senior, Lead, Director

---

#### `LeasingTask`
**EN:** Represents a task in the leasing workflow (contract negotiation, renewal, franchise development, etc.).  
**TR:** Kiralama iş akışındaki bir görevi temsil eder (sözleşme görüşmesi, yenileme, franchise geliştirme, vb.).

**Fields:**
- `category` - Task type (CONTRACT_NEGOTIATION, FRANCHISE_DEVELOPMENT, etc.)
- `priority` - LOW, MEDIUM, HIGH, URGENT
- `status` - PENDING, IN_PROGRESS, COMPLETED
- `riskLevel` - Associated risk level
- `defaultSLA` - Service level agreement in days
- Relations to stores, malls, leases, or franchise projects

**Key Methods:**
- `isOverdue()` - Check if task is past due date
- `assignTo(userId)` - Assign task to a user
- `complete()` - Mark as completed

---

#### `FranchiseProject`
**EN:** Represents a franchise development project from pipeline to opening.  
**TR:** Pipeline'dan açılışa kadar bir franchise geliştirme projesini temsil eder.

**Fields:**
- `status` - PIPELINE, EVALUATION, APPROVED, OPENED, etc.
- `targetCity`, `targetRegion` - Location planning
- `estimatedCapex`, `estimatedOpex` - Financial projections
- `expectedRevenue`, `expectedRentCost` - Revenue forecasts
- `feasibilityScore` - Project viability score (0-100)

**Key Methods:**
- `calculateEstimatedROI()` - Returns expected return on investment
- `calculateBreakEvenMonths()` - Time to break even
- `linkToStore(storeId)` - Connect to opened store

---

#### `LeasingRequest`
**EN:** Tracks requests and inquiries from tenants, landlords, or internal departments.  
**TR:** Kiracılar, mal sahipleri veya iç departmanlardan gelen talepleri ve başvuruları takip eder.

**Fields:**
- `type` - RENT_REDUCTION, LEASE_EXTENSION, FRANCHISE_INQUIRY, etc.
- `source` - TENANT, LANDLORD, INTERNAL, FRANCHISE_CANDIDATE
- `status` - OPEN, IN_PROGRESS, RESOLVED, REJECTED
- `priority` - Task priority level
- `resolution` - Final outcome description

**Key Methods:**
- `resolve(resolution, userId)` - Mark as resolved
- `reject(reason, userId)` - Mark as rejected
- `isOverdue()` - Check if past due date

---

#### `JobDescriptionTemplate`
**EN:** Generated job descriptions for Leasing Manager positions, customizable by company context.  
**TR:** Şirket bağlamına göre özelleştirilebilir Kiralama Yöneticisi pozisyonları için oluşturulan iş tanımları.

**Fields:**
- `roleNameTR`, `roleNameEN` - Position titles
- `responsibilitiesTR[]`, `responsibilitiesEN[]` - Duty lists
- `skillsTR[]`, `skillsEN[]` - Required skills
- `sectors[]` - Target industries
- `companyContext` - JSON with company-specific details
- `isTemplate`, `isPublished` - Publishing status

**Key Methods:**
- `publish()` - Make available for posting
- `exportToJobPostingTR()` - Generate Turkish job ad
- `exportToJobPostingEN()` - Generate English job ad

---

#### `MarketResearchRecord`
**EN:** Stores competitive analysis data for market research.  
**TR:** Pazar araştırması için rekabet analizi verilerini saklar.

**Fields:**
- `region`, `city`, `district` - Location data
- `competitorName`, `competitorType` - Competitor info
- `rentLevel`, `marketShare`, `footTraffic` - Market metrics
- `dataSource` - Research source reference

---

### Services / Servisler

#### `LeasingTasksService`
**EN:** CRUD operations and statistics for leasing tasks.  
**TR:** Kiralama görevleri için CRUD işlemleri ve istatistikler.

**Key Methods:**
- `findAll(tenantId, filters)` - Get tasks with filters
- `create(tenantId, dto)` - Create new task
- `getStatistics(tenantId)` - Task breakdown by category, priority

---

#### `FranchiseProjectsService`
**EN:** Manages franchise project lifecycle.  
**TR:** Franchise proje yaşam döngüsünü yönetir.

**Key Methods:**
- `findAll(tenantId, filters)` - Get all projects
- `create(tenantId, dto)` - Start new franchise project
- `getStatistics(tenantId)` - Project pipeline analytics

---

#### `LeasingRequestsService`
**EN:** Handles incoming requests from various sources.  
**TR:** Çeşitli kaynaklardan gelen talepleri işler.

**Key Methods:**
- `create(tenantId, userId, dto)` - Create new request
- `resolve(id, userId, resolution)` - Mark as resolved
- `getStatistics(tenantId)` - Request metrics and avg resolution time

---

#### `JobDescriptionsService`
**EN:** Job description generation and export engine.  
**TR:** İş tanımı oluşturma ve dışa aktarma motoru.

**Key Methods:**
- `generateFromLeasingManagerTemplate(tenantId, userId, context)` - Auto-generate from template
- `exportToPosting(id, tenantId, language)` - Export as job ad
- `getDefaultLeasingManagerTemplate()` - Get base template

---

### API Endpoints / API Uç Noktaları

**Base Route:** `/leasing-manager`

#### Tasks
- `GET /tasks` - List all tasks
- `POST /tasks` - Create task
- `GET /tasks/:id` - Get task details
- `PUT /tasks/:id` - Update task
- `GET /tasks/statistics` - Task analytics

#### Franchise Projects
- `GET /franchise-projects` - List projects
- `POST /franchise-projects` - Create project
- `GET /franchise-projects/statistics` - Project analytics

#### Leasing Requests
- `GET /requests` - List requests
- `POST /requests` - Create request
- `POST /requests/:id/resolve` - Resolve request
- `POST /requests/:id/reject` - Reject request
- `GET /requests/statistics` - Request analytics

#### Job Descriptions
- `GET /job-descriptions` - List templates
- `POST /job-descriptions` - Create job description
- `POST /job-descriptions/generate-from-template` - Auto-generate
- `GET /job-descriptions/:id/export?language=TR` - Export as posting

#### Dashboard
- `GET /dashboard` - Aggregated statistics

---

### Domain Knowledge / Domain Bilgisi

**EN:** This module encodes the domain knowledge of the Leasing Manager role, including:

**TR:** Bu modül, aşağıdakiler dahil Kiralama Yöneticisi rolünün domain bilgisini kodlar:

**Core Responsibilities / Temel Sorumluluklar:**
- Prospecting and evaluating potential tenants
- Contract preparation and management
- Renewal process coordination
- Rent payment tracking and collection
- Negotiation management
- Regional rent-performance analysis
- Leasing budget monitoring
- Franchise development opportunity evaluation

**Core Skills / Temel Yetenekler:**
- Budget Planning and Reporting
- Team Management
- Project Management
- Sales and Negotiation
- Financial Analysis
- Strategic Planning
- Relationship Management

---

### Integration Points / Entegrasyon Noktaları

**Stores Module:**
- Store detail pages show related LeasingTasks and FranchiseProjects

**Leases Module:**
- Lease detail pages show LeasingTasks and LeasingRequests

**Malls Module:**
- Mall detail pages show related requests and projects

**Analytics Module:**
- Franchise growth maps
- Leasing Manager workload distribution
- Request resolution time SLA tracking

**AI Assistant Module:**
- "Role & Job Definition Assistant" mode
- Interactive job description generation
- Context-aware suggestions based on real data

---

## Future Additions - Gelecek Eklemeler

**EN:** As new modules and functions are added, this glossary will be updated accordingly.  
**TR:** Yeni modüller ve fonksiyonlar eklendikçe, bu sözlük buna göre güncellenecektir.

---

**Last Updated:** 2025-12-11  
**Maintainer:** Development Team  
**Update Frequency:** After every significant code addition / Her önemli kod eklemesinden sonra










