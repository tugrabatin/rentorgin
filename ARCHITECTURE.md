# RentOrgin - Architecture Overview
# RentOrgin - Mimari Genel Bakış

**Version:** 0.1.0  
**Last Updated:** 2025-12-04

---

## 🏗️ High-Level Architecture / Üst Düzey Mimari

```
┌─────────────────────────────────────────────────────────┐
│                     FRONTEND LAYER                       │
│              Next.js 14 + React + TypeScript             │
│                                                           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐ │
│  │  Pages   │  │Components│  │  Hooks   │  │  State  │ │
│  │ (Routes) │  │   (UI)   │  │(Business)│  │(Zustand)│ │
│  └──────────┘  └──────────┘  └──────────┘  └─────────┘ │
└─────────────────────────────────────────────────────────┘
                           │
                           │ REST API (Axios + React Query)
                           ▼
┌─────────────────────────────────────────────────────────┐
│                     BACKEND LAYER                        │
│                 NestJS + TypeScript                      │
│                                                           │
│  ┌─────────────────────────────────────────────────┐    │
│  │              Module Architecture                 │    │
│  │                                                  │    │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────────┐   │    │
│  │  │  Leases  │ │  Stores  │ │  Analytics   │   │    │
│  │  │  Module  │ │  Module  │ │    Module    │   │    │
│  │  └──────────┘ └──────────┘ └──────────────┘   │    │
│  │                                                  │    │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────────┐   │    │
│  │  │   Malls  │ │    AI    │ │ Translation  │   │    │
│  │  │  Module  │ │ Assistant│ │    Module    │   │    │
│  │  └──────────┘ └──────────┘ └──────────────┘   │    │
│  └─────────────────────────────────────────────────┘    │
│                           │                              │
│                  ┌────────┴─────────┐                    │
│                  │  Prisma ORM      │                    │
│                  └──────────────────┘                    │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                   DATABASE LAYER                         │
│                    PostgreSQL                            │
│                                                           │
│  Multi-Tenant Data Isolation (Row-Level Security)       │
└─────────────────────────────────────────────────────────┘
```

---

## 📦 Monorepo Structure / Monorepo Yapısı

### Turbo Workspace Organization

```
rentorgin/
├── apps/                    # Applications
│   ├── web/                 # Next.js Frontend
│   │   ├── src/
│   │   │   ├── app/         # App Router pages
│   │   │   ├── components/  # React components
│   │   │   └── lib/         # Utilities
│   │   └── package.json
│   │
│   └── api/                 # NestJS Backend
│       ├── src/
│       │   ├── modules/     # Feature modules
│       │   ├── database/    # Prisma service
│       │   └── main.ts      # Entry point
│       └── package.json
│
├── packages/                # Shared packages
│   ├── core-domain/         # Domain models (framework-agnostic)
│   │   ├── src/
│   │   │   ├── entities/    # Domain entities
│   │   │   ├── value-objects/ # Value objects
│   │   │   ├── interfaces/  # Service interfaces
│   │   │   ├── dtos/        # Data transfer objects
│   │   │   ├── enums/       # Enumerations
│   │   │   └── constants/   # Business constants
│   │   └── package.json
│   │
│   ├── database/            # Prisma ORM configuration
│   │   ├── prisma/
│   │   │   └── schema.prisma # Database schema
│   │   ├── src/
│   │   │   ├── seed.ts      # Seed script
│   │   │   └── index.ts     # Prisma client export
│   │   └── package.json
│   │
│   ├── ui-components/       # Shared UI components
│   ├── shared-utils/        # Common utilities
│   └── ...
│
├── docs/                    # Documentation
│   ├── principles.md        # Architecture principles
│   ├── glossary.md          # Code glossary
│   ├── prompts.md           # AI prompt history
│   └── changelog.md         # Version history
│
├── logs/                    # System logs
│   └── error-log.md         # Error tracking
│
├── storage/                 # File storage
│   ├── uploads/             # User uploads
│   └── sessions/            # Session exports
│
└── config/                  # Configuration files
```

---

## 🔄 Data Flow / Veri Akışı

### Request Flow (Typical CRUD Operation)

```
1. User Action (Frontend)
   ↓
2. React Component calls API hook (useQuery/useMutation)
   ↓
3. Axios sends HTTP request to Backend
   ↓
4. NestJS Controller receives request
   ↓
5. Controller validates input (class-validator)
   ↓
6. Controller calls Service method
   ↓
7. Service implements business logic
   ↓
8. Service calls Prisma (ORM)
   ↓
9. Prisma queries PostgreSQL
   ↓
10. Database returns data
   ↓
11. Prisma maps to TypeScript objects
   ↓
12. Service transforms to DTO
   ↓
13. Controller returns HTTP response
   ↓
14. React Query caches & updates UI
```

---

## 🧩 Module Architecture / Modül Mimarisi

### Each Feature Module Structure

```
module-name/
├── module-name.module.ts      # NestJS module definition
├── module-name.controller.ts  # HTTP endpoints
├── module-name.service.ts     # Business logic
├── module-name.repository.ts  # (Optional) Data access layer
├── dto/                        # Data transfer objects
│   ├── create-*.dto.ts
│   ├── update-*.dto.ts
│   └── response-*.dto.ts
└── tests/                      # Unit & integration tests
```

### Module Independence Principles

1. **Low Coupling:** Modules communicate via interfaces
2. **High Cohesion:** Related functionality grouped together
3. **Single Responsibility:** Each module handles one domain
4. **No Circular Dependencies:** Enforced by TypeScript

---

## 🗄️ Database Design / Veritabanı Tasarımı

### Multi-Tenant Strategy

**Row-Level Security (RLS) Approach:**

- Every table has a `tenantId` column
- All queries automatically filtered by tenant
- Enforced at Prisma middleware level
- Prevents cross-tenant data leaks

### Key Tables

```
tenants          → Customer organizations
users            → User accounts (linked to tenant)
stores           → Retail locations
leases           → Lease contracts
malls            → Shopping malls
expenses         → Expense records
store_analytics  → Performance metrics
ai_interactions  → AI assistant logs
translation_jobs → Document translations
user_sessions    → Saved sessions
```

### Relationships

```
Tenant 1:N Users
Tenant 1:N Stores
Tenant 1:N Leases

Store N:1 Mall
Store 1:N Leases
Store 1:N Expenses
Store 1:N Analytics

Lease N:1 Store
Lease N:1 Mall
Lease 1:N Renewals
```

---

## 🔐 Security Architecture / Güvenlik Mimarisi

### Authentication & Authorization

1. **JWT-based Authentication**
   - Access Token (short-lived, 15 min)
   - Refresh Token (long-lived, 7 days)

2. **Role-Based Access Control (RBAC)**
   - SUPER_ADMIN: Full system access
   - ADMIN: Tenant-wide access
   - MANAGER: Module-level access
   - USER: Limited access
   - VIEWER: Read-only

3. **Multi-Tenant Isolation**
   - TenantId extracted from JWT
   - Automatic query filtering
   - Resource access validation

### Data Protection

- **Passwords:** Bcrypt hashing (cost factor 12)
- **API Keys:** Environment variables only
- **Sensitive Data:** Encrypted at rest
- **CORS:** Whitelisted origins only

---

## 🤖 AI Assistant Architecture / AI Asistanı Mimarisi

### Prompt Management System

```
1. User triggers AI action
   ↓
2. Frontend sends: { promptId, context, userInput }
   ↓
3. Backend loads prompt template from database
   ↓
4. Backend injects context (store data, lease info, etc.)
   ↓
5. Backend calls OpenAI API
   ↓
6. Response returned to user
   ↓
7. Interaction logged for learning
```

### Prompt Learning Loop

```
User Interaction
   ↓
Log: { promptId, response, userAccepted, userEdits }
   ↓
Analyze: Which prompts get rejected/edited most?
   ↓
Generate: Improvement suggestions
   ↓
Update: Refined prompts in docs/prompts.md
```

---

## 🌐 Translation Engine Architecture / Çeviri Motoru Mimarisi

### Document Translation Pipeline

```
1. User uploads document (PDF/DOCX)
   ↓
2. Extract text (PDF.js / Mammoth)
   ↓
3. Segmentation (500 words per segment)
   ↓
4. For each segment:
   ├── Add context (previous + next segment)
   ├── Call translation API (OpenAI/DeepL)
   ├── Validate quality (length, sentence endings)
   └── Store translated segment
   ↓
5. Reassemble document
   ↓
6. Generate bilingual PDF (side-by-side)
```

### Quality Checks

- ✅ Length difference ≤ 10%
- ✅ Sentence endings match (vowel/consonant)
- ✅ Legal term precision
- ✅ Formatting preserved

---

## 📊 Analytics & Reporting / Analitik & Raporlama

### Performance Calculation Flow

```
Store Analytics Record
   ↓
Calculate KPIs:
├── Rent-to-Revenue Ratio = (Rent / Revenue) * 100
├── Revenue per SQM = Revenue / SquareMeters
└── Profit Margin = ((Revenue - Expenses) / Revenue) * 100
   ↓
Calculate Performance Score (0-100):
├── Rent-to-Revenue weight: 35%
├── Revenue per SQM weight: 25%
├── Profit Margin weight: 20%
├── Foot Traffic Conversion weight: 15%
└── Growth Trend weight: 5%
   ↓
Generate Recommendation:
├── 80-100: CONTINUE
├── 60-79: MONITOR
├── 40-59: RENEGOTIATE
├── 20-39: DOWNSIZE
└── 0-19: CLOSE
```

---

## 🔄 Session Management / Oturum Yönetimi

### Session Export/Import

**Export:**

```
User requests export
   ↓
Collect current context:
├── Active filters
├── Open dashboards
├── Selected stores/leases
├── User preferences
└── AI conversation history
   ↓
Serialize to JSON
   ↓
Save to storage/sessions/
   ↓
Return download link
```

**Import:**

```
User uploads session JSON
   ↓
Validate structure & version
   ↓
Apply migrations if needed (version compatibility)
   ↓
Restore context:
├── Reapply filters
├── Load dashboards
├── Select resources
└── Restore preferences
   ↓
User continues where they left off
```

---

## 🚀 Deployment Architecture / Deployment Mimarisi

### Production Setup (Recommended)

```
┌─────────────────────────────────────────┐
│         Load Balancer (Nginx)           │
└─────────────────────────────────────────┘
           │                 │
           ▼                 ▼
    ┌────────────┐    ┌────────────┐
    │  Frontend  │    │  Backend   │
    │  (Next.js) │    │  (NestJS)  │
    │  Port 3000 │    │  Port 3001 │
    └────────────┘    └────────────┘
           │                 │
           └────────┬────────┘
                    ▼
            ┌────────────────┐
            │   PostgreSQL   │
            │   (Primary)    │
            └────────────────┘
                    │
            ┌───────┴───────┐
            │  Read Replica │
            │   (Optional)  │
            └───────────────┘
```

### Environment Variables per Environment

**Development:**
- DATABASE_URL → localhost:5432
- OPENAI_API_KEY → test key

**Staging:**
- DATABASE_URL → staging DB
- OPENAI_API_KEY → staging key

**Production:**
- DATABASE_URL → production DB (encrypted)
- OPENAI_API_KEY → production key (encrypted)

---

## 📈 Scalability Considerations / Ölçeklenebilirlik

### Horizontal Scaling

1. **Frontend:** Static files → CDN (Cloudflare/Vercel)
2. **Backend API:** Multiple instances behind load balancer
3. **Database:** Read replicas for analytics queries

### Caching Strategy

- **Frontend:** React Query (client-side cache)
- **Backend:** Redis (planned for session & API cache)
- **Database:** PostgreSQL built-in caching

---

## 🔧 Technology Stack Summary

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | Next.js 14 | React framework |
| UI | TailwindCSS | Styling |
| State | Zustand + React Query | State management |
| Backend | NestJS | API framework |
| ORM | Prisma | Database access |
| Database | PostgreSQL | Data persistence |
| AI | OpenAI API | AI assistant |
| Monorepo | Turbo | Build orchestration |
| Language | TypeScript | Type safety |

---

**For detailed implementation, see:**
- `docs/glossary.md` - Code explanations
- `docs/principles.md` - Architectural rules
- Individual module README files

---

**Last Updated:** 2025-12-04  
**Version:** 0.1.0




















