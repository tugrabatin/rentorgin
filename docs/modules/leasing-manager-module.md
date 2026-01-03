# Leasing Manager Module Documentation
# Kiralama Yöneticisi Modülü Dokümantasyonu

**Version:** 1.0.0  
**Last Updated:** 2025-12-12  
**Module Path:** `/apps/api/src/modules/leasing-manager/`

---

## Overview / Genel Bakış

**EN:** The Leasing Manager Module is a comprehensive system designed to manage all aspects of leasing operations, franchise development, and job description generation for leasing manager positions. This module transforms RentOrgin into a domain-aware platform that understands the responsibilities, skills, and workflows inherent to the Leasing Manager role.

**TR:** Kiralama Yöneticisi Modülü, kiralama operasyonlarının, franchise geliştirmenin ve kiralama yöneticisi pozisyonları için iş tanımı oluşturmanın tüm yönlerini yönetmek üzere tasarlanmış kapsamlı bir sistemdir. Bu modül, RentOrgin'i Kiralama Yöneticisi rolüne özgü sorumlulukları, becerileri ve iş akışlarını anlayan domain bilincine sahip bir platforma dönüştürür.

---

## Core Entities / Temel Varlıklar

### 1. LeasingManagerRoleTemplate

**Purpose:** Defines standard templates for Leasing Manager role descriptions.  
**Amaç:** Kiralama Yöneticisi rolü tanımları için standart şablonlar tanımlar.

**Fields:**
- `nameTR`, `nameEN` - Role names in Turkish and English
- `descriptionTR`, `descriptionEN` - Role descriptions
- `coreResponsibilities` - List of key responsibilities
- `coreSkills` - Required competencies
- `sectors` - Applicable industry sectors
- `seniorityLevel` - Entry, Mid, Senior, Lead, Director
- `isDefault` - Whether this is the default template
- `isActive` - Template status

**Use Cases:**
- Create standardized job descriptions
- Maintain consistency across hiring processes
- Generate role-specific templates

---

### 2. LeasingTask

**Purpose:** Represents a task in the leasing workflow.  
**Amaç:** Kiralama iş akışındaki bir görevi temsil eder.

**Fields:**
- `category` - Task type (CONTRACT_NEGOTIATION, FRANCHISE_DEVELOPMENT, etc.)
- `priority` - LOW, MEDIUM, HIGH, URGENT
- `status` - PENDING, IN_PROGRESS, COMPLETED
- `riskLevel` - Associated risk level
- `defaultSLA` - Service level agreement in days
- Relations to stores, malls, leases, or franchise projects

**Categories:**
- CONTRACT_NEGOTIATION - Sözleşme görüşmeleri
- CONTRACT_RENEWAL - Sözleşme yenileme
- MAINTENANCE - Bakım işlemleri
- BUDGET_TRACKING - Bütçe takibi
- FRANCHISE_DEVELOPMENT - Franchise geliştirme
- MARKET_RESEARCH - Pazar araştırması
- COMPLIANCE - Uyumluluk kontrolü
- TENANT_RELATIONS - Kiracı ilişkileri
- SPACE_MANAGEMENT - Alan yönetimi
- REPORTING - Raporlama

**Key Methods:**
- `isOverdue()` - Check if task is past due date
- `assignTo(userId)` - Assign task to a user
- `complete()` - Mark as completed

---

### 3. FranchiseProject

**Purpose:** Represents a franchise development project from pipeline to opening.  
**Amaç:** Pipeline'dan açılışa kadar bir franchise geliştirme projesini temsil eder.

**Fields:**
- `status` - PIPELINE, EVALUATION, APPROVED, OPENED, etc.
- `targetCity`, `targetRegion` - Location planning
- `estimatedCapex`, `estimatedOpex` - Financial projections
- `expectedRevenue`, `expectedRentCost` - Revenue forecasts
- `feasibilityScore` - Project viability score (0-100)

**Statuses:**
- PIPELINE - Planlama aşamasında
- EVALUATION - Değerlendirme
- FEASIBILITY_STUDY - Fizibilite çalışması
- APPROVED - Onaylandı
- IN_CONSTRUCTION - İnşaat aşamasında
- OPENED - Açıldı
- REJECTED - Reddedildi
- CANCELLED - İptal edildi

**Key Methods:**
- `calculateEstimatedROI()` - Returns expected return on investment
- `calculateBreakEvenMonths()` - Time to break even
- `linkToStore(storeId)` - Connect to opened store

---

### 4. LeasingRequest

**Purpose:** Tracks requests and inquiries from tenants, landlords, or internal departments.  
**Amaç:** Kiracılar, mal sahipleri veya iç departmanlardan gelen talepleri ve başvuruları takip eder.

**Fields:**
- `type` - RENT_REDUCTION, LEASE_EXTENSION, FRANCHISE_INQUIRY, etc.
- `source` - TENANT, LANDLORD, INTERNAL, FRANCHISE_CANDIDATE
- `status` - OPEN, IN_PROGRESS, RESOLVED, REJECTED
- `priority` - Task priority level
- `resolution` - Final outcome description

**Request Types:**
- RENT_REDUCTION - Kira indirimi
- LEASE_EXTENSION - Kira uzatma
- CONTRACT_REVISION - Sözleşme revizyonu
- ADDITIONAL_SPACE - Ek alan talebi
- SPACE_REDUCTION - Alan küçültme
- COMPLAINT - Şikayet
- FRANCHISE_INQUIRY - Franchise başvurusu
- RENEWAL_REQUEST - Yenileme talebi
- EARLY_TERMINATION - Erken fesih
- MAINTENANCE_REQUEST - Bakım talebi
- DOCUMENT_REQUEST - Doküman talebi

**Key Methods:**
- `resolve(resolution, userId)` - Mark as resolved
- `reject(reason, userId)` - Mark as rejected
- `isOverdue()` - Check if past due date

---

### 5. JobDescriptionTemplate

**Purpose:** Generated job descriptions for Leasing Manager positions.  
**Amaç:** Kiralama Yöneticisi pozisyonları için oluşturulan iş tanımları.

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

### 6. MarketResearchRecord

**Purpose:** Stores competitive analysis data for market research.  
**Amaç:** Pazar araştırması için rekabet analizi verilerini saklar.

**Fields:**
- `region`, `city`, `district` - Location data
- `competitorName`, `competitorType` - Competitor info
- `rentLevel`, `marketShare`, `footTraffic` - Market metrics
- `dataSource` - Research source reference

---

## API Endpoints / API Uç Noktaları

**Base URL:** `/leasing-manager`

### Tasks Endpoints

```
GET    /tasks                  - List all tasks (with filters)
GET    /tasks/statistics       - Task analytics
GET    /tasks/:id              - Get task details
POST   /tasks                  - Create new task
PUT    /tasks/:id              - Update task
DELETE /tasks/:id              - Delete task
```

**Query Parameters:**
- `category` - Filter by category
- `status` - Filter by status
- `priority` - Filter by priority
- `storeId` - Filter by store
- `mallId` - Filter by mall
- `franchiseProjectId` - Filter by franchise project
- `search` - Text search in title/description

---

### Franchise Projects Endpoints

```
GET    /franchise-projects              - List all projects
GET    /franchise-projects/statistics   - Project analytics
GET    /franchise-projects/:id          - Get project details
POST   /franchise-projects              - Create new project
PUT    /franchise-projects/:id          - Update project
DELETE /franchise-projects/:id          - Delete project
```

---

### Leasing Requests Endpoints

```
GET    /requests                - List all requests
GET    /requests/statistics     - Request analytics
GET    /requests/:id            - Get request details
POST   /requests                - Create new request
PUT    /requests/:id            - Update request
POST   /requests/:id/resolve    - Resolve request
POST   /requests/:id/reject     - Reject request
DELETE /requests/:id            - Delete request
```

---

### Job Descriptions Endpoints

```
GET    /job-descriptions                       - List all templates
GET    /job-descriptions/default-template      - Get default template
GET    /job-descriptions/:id                   - Get template details
GET    /job-descriptions/:id/export?language=TR - Export as posting
POST   /job-descriptions                       - Create new template
POST   /job-descriptions/generate-from-template - Auto-generate from template
PUT    /job-descriptions/:id                   - Update template
POST   /job-descriptions/:id/publish           - Publish template
POST   /job-descriptions/:id/unpublish         - Unpublish template
DELETE /job-descriptions/:id                   - Delete template
```

---

### Dashboard Endpoint

```
GET    /dashboard    - Aggregated statistics for all sub-modules
```

**Response Structure:**
```json
{
  "tasks": {
    "total": 45,
    "pending": 12,
    "inProgress": 8,
    "completed": 25,
    "byCategory": [...],
    "byPriority": [...]
  },
  "projects": {
    "total": 15,
    "byStatus": [...]
  },
  "requests": {
    "total": 28,
    "open": 7,
    "inProgress": 5,
    "resolved": 16
  }
}
```

---

## Frontend Integration / Frontend Entegrasyonu

### Pages / Sayfalar

1. **Main Dashboard** - `/app/leasing-manager/page.tsx`
   - Overview statistics
   - Recent tasks, projects, and requests
   - Quick actions

2. **Store Detail Tabs** - `/app/stores/[id]/page.tsx`
   - "Kiralama Görevleri" tab
   - "Franchise Projeleri" tab

### Components / Bileşenler

1. **LeasingManagerWidget** - `components/leasing-manager/leasing-manager-widget.tsx`
   - Dashboard widget showing summary stats
   - Quick links to tasks and job descriptions

2. **StoreLeasingTasks** - `components/leasing-manager/store-leasing-tasks.tsx`
   - Display tasks related to a specific store
   - Task creation and management

3. **StoreFranchiseProjects** - `components/leasing-manager/store-franchise-projects.tsx`
   - Display franchise projects related to a store
   - Project financial overview

---

## Domain Knowledge / Domain Bilgisi

### Core Responsibilities of Leasing Manager

1. **Tenant Prospecting** - Potansiyel kiracı araştırması
2. **Contract Management** - Sözleşme yönetimi
3. **Renewal Coordination** - Yenileme koordinasyonu
4. **Payment Tracking** - Ödeme takibi
5. **Negotiation Management** - Müzakere yönetimi
6. **Performance Analysis** - Performans analizi
7. **Budget Monitoring** - Bütçe izleme
8. **Franchise Development** - Franchise geliştirme

### Core Skills

- Budget Planning and Reporting
- Team Management
- Project Management
- Sales and Negotiation
- Financial Analysis
- Strategic Planning
- Relationship Management

---

## Integration Points / Entegrasyon Noktaları

### With Other Modules

1. **Stores Module**
   - Store detail pages show related tasks and projects
   - Create tasks directly from store context

2. **Leases Module**
   - Lease detail pages show related tasks and requests
   - Link tasks to specific lease contracts

3. **Malls Module**
   - Mall detail pages show related requests and projects
   - Market research data linked to malls

4. **Analytics Module**
   - Franchise growth maps
   - Leasing manager workload distribution
   - Request resolution time SLA tracking

5. **AI Assistant Module**
   - "Role & Job Definition Assistant" mode
   - Interactive job description generation
   - Context-aware suggestions based on real data

---

## Usage Examples / Kullanım Örnekleri

### Create a Leasing Task

```typescript
POST /leasing-manager/tasks

{
  "category": "CONTRACT_NEGOTIATION",
  "title": "Negotiate rent reduction for Store A",
  "description": "Tenant requested 10% reduction due to low sales",
  "priority": "HIGH",
  "riskLevel": "MEDIUM",
  "storeId": "store-id-123",
  "dueDate": "2025-12-20T00:00:00Z"
}
```

### Generate Job Description from Template

```typescript
POST /leasing-manager/job-descriptions/generate-from-template

{
  "companyContext": {
    "sector": "Retail",
    "organizationSize": "50-200",
    "region": "Turkey - Nationwide",
    "franchiseCount": 25
  }
}
```

### Get Dashboard Statistics

```typescript
GET /leasing-manager/dashboard

Response:
{
  "tasks": {
    "total": 45,
    "pending": 12,
    "inProgress": 8,
    "completed": 25
  },
  "projects": {
    "total": 15,
    "pipeline": 5,
    "approved": 3,
    "opened": 7
  },
  "requests": {
    "total": 28,
    "open": 7,
    "resolved": 16
  }
}
```

---

## Testing / Test

### Unit Tests

Located in: `/apps/api/src/modules/leasing-manager/__tests__/`

Run tests:
```bash
npm run test:leasing-manager
```

### E2E Test Scenarios

1. **Task Lifecycle**
   - Create task → Assign → Complete → Verify

2. **Franchise Project Pipeline**
   - Create project → Evaluate → Approve → Link to store

3. **Job Description Generation**
   - Generate from template → Edit → Publish → Export

---

## Future Enhancements / Gelecek Geliştirmeler

1. **AI-Powered Task Suggestions**
   - Automatic task creation based on lease events

2. **Franchise ROI Calculator**
   - Advanced financial modeling tools

3. **Market Research Automation**
   - Automated competitor data collection

4. **Performance Dashboards**
   - Leasing manager KPI tracking

---

## Support & Maintenance / Destek & Bakım

**Module Owner:** Development Team  
**Documentation:** This file + `docs/glossary.md`  
**Last Updated:** 2025-12-12

For questions or issues, refer to:
- `docs/glossary.md` - Code explanations
- `docs/principles.md` - Architectural rules
- `logs/error-log.md` - Error tracking

---

**Version History:**
- v1.0.0 (2025-12-12) - Initial release with full CRUD operations, job description engine, and dashboard integration
