-- CreateEnum
CREATE TYPE "TenantPlan" AS ENUM ('FREE', 'STARTER', 'PROFESSIONAL', 'ENTERPRISE');

-- CreateEnum
CREATE TYPE "TenantStatus" AS ENUM ('ACTIVE', 'SUSPENDED', 'TRIAL', 'CANCELLED');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'MANAGER', 'USER', 'VIEWER');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "StoreStatus" AS ENUM ('PLANNING', 'ACTIVE', 'RENOVATION', 'CLOSING', 'CLOSED');

-- CreateEnum
CREATE TYPE "MallType" AS ENUM ('SHOPPING_MALL', 'OUTLET', 'STREET_RETAIL', 'AIRPORT', 'STATION', 'MIXED_USE');

-- CreateEnum
CREATE TYPE "RelationshipQuality" AS ENUM ('EXCELLENT', 'GOOD', 'NEUTRAL', 'FAIR', 'POOR');

-- CreateEnum
CREATE TYPE "LeaseStatus" AS ENUM ('DRAFT', 'PENDING_APPROVAL', 'APPROVED', 'ACTIVE', 'EXPIRING_SOON', 'EXPIRED', 'RENEWED', 'TERMINATED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "EscalationType" AS ENUM ('NONE', 'FIXED_PERCENTAGE', 'INDEX_BASED', 'REVENUE_BASED', 'CUSTOM');

-- CreateEnum
CREATE TYPE "RenewalStatus" AS ENUM ('PENDING', 'IN_NEGOTIATION', 'ACCEPTED', 'REJECTED', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "NegotiationType" AS ENUM ('RENT_REDUCTION', 'LEASE_EXTENSION', 'EARLY_TERMINATION', 'SPACE_EXPANSION', 'SPACE_REDUCTION', 'CAC_DISPUTE', 'RENOVATION_APPROVAL', 'OTHER');

-- CreateEnum
CREATE TYPE "NegotiationStatus" AS ENUM ('INITIATED', 'IN_PROGRESS', 'PENDING_RESPONSE', 'ON_HOLD', 'AGREED', 'REJECTED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "InteractionType" AS ENUM ('MEETING', 'EMAIL', 'PHONE_CALL', 'DOCUMENT_SENT', 'DOCUMENT_RECEIVED', 'SITE_VISIT', 'OTHER');

-- CreateEnum
CREATE TYPE "PerformanceRecommendation" AS ENUM ('CONTINUE', 'MONITOR', 'RENEGOTIATE', 'DOWNSIZE', 'RELOCATE', 'CLOSE');

-- CreateEnum
CREATE TYPE "FeasibilityType" AS ENUM ('NEW_STORE', 'RELOCATION', 'EXPANSION', 'DOWNSIZING', 'CLOSURE');

-- CreateEnum
CREATE TYPE "AnalysisStatus" AS ENUM ('DRAFT', 'IN_PROGRESS', 'COMPLETED', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "RiskLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateEnum
CREATE TYPE "ExpenseType" AS ENUM ('RENT', 'COMMON_AREA_CHARGE', 'UTILITY', 'MAINTENANCE', 'INSURANCE', 'TAX', 'MARKETING_FEE', 'OTHER');

-- CreateEnum
CREATE TYPE "ExpenseStatus" AS ENUM ('PENDING', 'PAID', 'OVERDUE', 'DISPUTED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "OptimizationStatus" AS ENUM ('DRAFT', 'ANALYZED', 'APPROVED', 'IN_NEGOTIATION', 'IMPLEMENTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "SpaceChangeType" AS ENUM ('EXPANSION', 'DOWNSIZING', 'RELOCATION', 'RENOVATION', 'CLOSURE');

-- CreateEnum
CREATE TYPE "SpaceChangeStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'IN_REVIEW', 'APPROVED', 'IN_PROGRESS', 'COMPLETED', 'REJECTED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ApprovalStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "BudgetScope" AS ENUM ('COMPANY', 'COUNTRY', 'CITY', 'BRAND', 'MALL_TYPE');

-- CreateEnum
CREATE TYPE "BudgetStatus" AS ENUM ('DRAFT', 'APPROVED', 'ACTIVE', 'CLOSED');

-- CreateEnum
CREATE TYPE "RiskCategory" AS ENUM ('FINANCIAL', 'OPERATIONAL', 'LEGAL', 'RELATIONSHIP', 'MARKET', 'OTHER');

-- CreateEnum
CREATE TYPE "RiskStatus" AS ENUM ('IDENTIFIED', 'ASSESSING', 'MITIGATING', 'MONITORING', 'RESOLVED', 'ACCEPTED');

-- CreateEnum
CREATE TYPE "TranslationStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'FAILED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "SegmentStatus" AS ENUM ('PENDING', 'TRANSLATING', 'COMPLETED', 'FAILED', 'REQUIRES_REVIEW');

-- CreateEnum
CREATE TYPE "ConfigType" AS ENUM ('STRING', 'NUMBER', 'BOOLEAN', 'JSON');

-- CreateTable
CREATE TABLE "tenants" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "plan" "TenantPlan" NOT NULL DEFAULT 'FREE',
    "status" "TenantStatus" NOT NULL DEFAULT 'ACTIVE',
    "currency" TEXT NOT NULL DEFAULT 'TRY',
    "language" TEXT NOT NULL DEFAULT 'tr',
    "timezone" TEXT NOT NULL DEFAULT 'Europe/Istanbul',
    "subscriptionStartDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subscriptionEndDate" TIMESTAMP(3),
    "maxUsers" INTEGER NOT NULL DEFAULT 5,
    "maxStores" INTEGER NOT NULL DEFAULT 10,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tenants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "language" TEXT NOT NULL DEFAULT 'tr',
    "timezone" TEXT NOT NULL DEFAULT 'Europe/Istanbul',
    "avatar" TEXT,
    "lastLoginAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stores" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "brand" TEXT,
    "concept" TEXT,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "district" TEXT,
    "address" TEXT NOT NULL,
    "squareMeters" DOUBLE PRECISION NOT NULL,
    "status" "StoreStatus" NOT NULL DEFAULT 'PLANNING',
    "openingDate" TIMESTAMP(3),
    "closingDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "mallId" TEXT,

    CONSTRAINT "stores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "malls" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "MallType" NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "district" TEXT,
    "address" TEXT NOT NULL,
    "managementCompany" TEXT,
    "relationshipQuality" "RelationshipQuality" NOT NULL DEFAULT 'NEUTRAL',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "malls_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mall_contacts" (
    "id" TEXT NOT NULL,
    "mallId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mall_contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leases" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "mallId" TEXT,
    "assignedToId" TEXT,
    "contractNumber" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "status" "LeaseStatus" NOT NULL DEFAULT 'DRAFT',
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "signedDate" TIMESTAMP(3),
    "monthlyRent" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'TRY',
    "escalationType" "EscalationType" NOT NULL DEFAULT 'FIXED_PERCENTAGE',
    "escalationRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "escalationIndex" TEXT,
    "renewalOptionMonths" INTEGER,
    "renewalNoticeMonths" INTEGER NOT NULL DEFAULT 3,
    "commonAreaCharges" DOUBLE PRECISION,
    "securityDeposit" DOUBLE PRECISION,
    "fitOutPeriodDays" INTEGER,
    "documentUrl" TEXT,
    "documentVersion" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "leases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lease_renewals" (
    "id" TEXT NOT NULL,
    "leaseId" TEXT NOT NULL,
    "status" "RenewalStatus" NOT NULL DEFAULT 'PENDING',
    "proposedMonthlyRent" DOUBLE PRECISION,
    "proposedDuration" INTEGER,
    "proposedStartDate" TIMESTAMP(3),
    "landlordResponse" TEXT,
    "notes" TEXT,
    "reminderSentAt" TIMESTAMP(3),
    "negotiationStartDate" TIMESTAMP(3),
    "completionDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lease_renewals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "negotiations" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "mallId" TEXT NOT NULL,
    "leaseId" TEXT,
    "userId" TEXT NOT NULL,
    "type" "NegotiationType" NOT NULL,
    "status" "NegotiationStatus" NOT NULL DEFAULT 'INITIATED',
    "subject" TEXT NOT NULL,
    "description" TEXT,
    "outcome" TEXT,
    "agreedTerms" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3),
    "nextFollowUp" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "negotiations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "negotiation_interactions" (
    "id" TEXT NOT NULL,
    "negotiationId" TEXT NOT NULL,
    "type" "InteractionType" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,
    "documentUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "negotiation_interactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "store_analytics" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "revenue" DOUBLE PRECISION NOT NULL,
    "rent" DOUBLE PRECISION NOT NULL,
    "commonAreaCharges" DOUBLE PRECISION,
    "otherExpenses" DOUBLE PRECISION,
    "rentToRevenueRatio" DOUBLE PRECISION NOT NULL,
    "revenuePerSquareMeter" DOUBLE PRECISION NOT NULL,
    "profitMargin" DOUBLE PRECISION,
    "footTraffic" INTEGER,
    "conversionRate" DOUBLE PRECISION,
    "performanceScore" DOUBLE PRECISION,
    "recommendation" "PerformanceRecommendation",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "store_analytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feasibility_analyses" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "storeId" TEXT,
    "location" TEXT NOT NULL,
    "type" "FeasibilityType" NOT NULL,
    "status" "AnalysisStatus" NOT NULL DEFAULT 'DRAFT',
    "estimatedMonthlyRent" DOUBLE PRECISION NOT NULL,
    "estimatedMonthlyRevenue" DOUBLE PRECISION NOT NULL,
    "estimatedSetupCost" DOUBLE PRECISION,
    "breakEvenMonths" INTEGER,
    "recommendation" TEXT,
    "riskLevel" "RiskLevel",
    "confidenceScore" DOUBLE PRECISION,
    "reportUrl" TEXT,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "feasibility_analyses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expenses" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "type" "ExpenseType" NOT NULL,
    "category" TEXT,
    "description" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'TRY',
    "dueDate" TIMESTAMP(3) NOT NULL,
    "paidDate" TIMESTAMP(3),
    "status" "ExpenseStatus" NOT NULL DEFAULT 'PENDING',
    "isDisputed" BOOLEAN NOT NULL DEFAULT false,
    "disputeReason" TEXT,
    "disputeResolvedAt" TIMESTAMP(3),
    "invoiceNumber" TEXT,
    "invoiceUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "expenses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contract_optimizations" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "leaseId" TEXT NOT NULL,
    "status" "OptimizationStatus" NOT NULL DEFAULT 'DRAFT',
    "analysisDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "weaknesses" TEXT[],
    "suggestions" TEXT[],
    "potentialSavings" DOUBLE PRECISION,
    "negotiationStrategy" TEXT,
    "counterArguments" TEXT,
    "implemented" BOOLEAN NOT NULL DEFAULT false,
    "actualSavings" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contract_optimizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "space_change_requests" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "requestedById" TEXT NOT NULL,
    "type" "SpaceChangeType" NOT NULL,
    "status" "SpaceChangeStatus" NOT NULL DEFAULT 'DRAFT',
    "currentSquareMeters" DOUBLE PRECISION NOT NULL,
    "proposedSquareMeters" DOUBLE PRECISION,
    "estimatedCost" DOUBLE PRECISION,
    "justification" TEXT,
    "approvalStatus" "ApprovalStatus" NOT NULL DEFAULT 'PENDING',
    "approvedById" TEXT,
    "approvedAt" TIMESTAMP(3),
    "plannedStartDate" TIMESTAMP(3),
    "plannedEndDate" TIMESTAMP(3),
    "actualCompletionDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "space_change_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "budgets" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "quarter" INTEGER,
    "scope" "BudgetScope" NOT NULL,
    "scopeValue" TEXT,
    "plannedAmount" DOUBLE PRECISION NOT NULL,
    "actualAmount" DOUBLE PRECISION,
    "variance" DOUBLE PRECISION,
    "status" "BudgetStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "budgets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "risks" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "category" "RiskCategory" NOT NULL,
    "severity" "RiskLevel" NOT NULL,
    "status" "RiskStatus" NOT NULL DEFAULT 'IDENTIFIED',
    "title" TEXT NOT NULL,
    "description" TEXT,
    "potentialImpact" DOUBLE PRECISION,
    "probability" DOUBLE PRECISION,
    "mitigationPlan" TEXT,
    "mitigationCost" DOUBLE PRECISION,
    "identifiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mitigatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "risks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_interactions" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "promptId" TEXT NOT NULL,
    "promptVersion" TEXT NOT NULL DEFAULT '1.0',
    "module" TEXT NOT NULL,
    "contextData" TEXT,
    "userInput" TEXT NOT NULL,
    "aiResponse" TEXT NOT NULL,
    "wasAccepted" BOOLEAN,
    "wasEdited" BOOLEAN NOT NULL DEFAULT false,
    "userEdits" TEXT,
    "satisfaction" INTEGER,
    "model" TEXT NOT NULL DEFAULT 'gpt-4',
    "tokensUsed" INTEGER,
    "responseTime" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ai_interactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "translation_jobs" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "sourceDocumentUrl" TEXT NOT NULL,
    "sourceLanguage" TEXT NOT NULL,
    "targetLanguage" TEXT NOT NULL,
    "totalSegments" INTEGER NOT NULL,
    "completedSegments" INTEGER NOT NULL DEFAULT 0,
    "status" "TranslationStatus" NOT NULL DEFAULT 'PENDING',
    "progress" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "translatedDocumentUrl" TEXT,
    "averageQualityScore" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "translation_jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "translation_segments" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "segmentNumber" INTEGER NOT NULL,
    "sourceText" TEXT NOT NULL,
    "translatedText" TEXT,
    "lengthDifference" DOUBLE PRECISION,
    "qualityScore" DOUBLE PRECISION,
    "status" "SegmentStatus" NOT NULL DEFAULT 'PENDING',
    "wordCount" INTEGER NOT NULL,
    "charCount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "translation_segments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_sessions" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "sessionData" TEXT NOT NULL,
    "appVersion" TEXT NOT NULL DEFAULT '0.1.0',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastLoadedAt" TIMESTAMP(3),

    CONSTRAINT "user_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_config" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "type" "ConfigType" NOT NULL DEFAULT 'STRING',
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "system_config_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tenants_domain_key" ON "tenants"("domain");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_tenantId_idx" ON "users"("tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "stores_code_key" ON "stores"("code");

-- CreateIndex
CREATE INDEX "stores_tenantId_idx" ON "stores"("tenantId");

-- CreateIndex
CREATE INDEX "stores_mallId_idx" ON "stores"("mallId");

-- CreateIndex
CREATE INDEX "malls_tenantId_idx" ON "malls"("tenantId");

-- CreateIndex
CREATE INDEX "mall_contacts_mallId_idx" ON "mall_contacts"("mallId");

-- CreateIndex
CREATE UNIQUE INDEX "leases_contractNumber_key" ON "leases"("contractNumber");

-- CreateIndex
CREATE INDEX "leases_tenantId_idx" ON "leases"("tenantId");

-- CreateIndex
CREATE INDEX "leases_storeId_idx" ON "leases"("storeId");

-- CreateIndex
CREATE INDEX "leases_mallId_idx" ON "leases"("mallId");

-- CreateIndex
CREATE INDEX "leases_status_idx" ON "leases"("status");

-- CreateIndex
CREATE INDEX "lease_renewals_leaseId_idx" ON "lease_renewals"("leaseId");

-- CreateIndex
CREATE INDEX "negotiations_mallId_idx" ON "negotiations"("mallId");

-- CreateIndex
CREATE INDEX "negotiations_leaseId_idx" ON "negotiations"("leaseId");

-- CreateIndex
CREATE INDEX "negotiation_interactions_negotiationId_idx" ON "negotiation_interactions"("negotiationId");

-- CreateIndex
CREATE INDEX "store_analytics_tenantId_idx" ON "store_analytics"("tenantId");

-- CreateIndex
CREATE INDEX "store_analytics_storeId_idx" ON "store_analytics"("storeId");

-- CreateIndex
CREATE UNIQUE INDEX "store_analytics_storeId_year_month_key" ON "store_analytics"("storeId", "year", "month");

-- CreateIndex
CREATE INDEX "feasibility_analyses_tenantId_idx" ON "feasibility_analyses"("tenantId");

-- CreateIndex
CREATE INDEX "expenses_tenantId_idx" ON "expenses"("tenantId");

-- CreateIndex
CREATE INDEX "expenses_storeId_idx" ON "expenses"("storeId");

-- CreateIndex
CREATE INDEX "expenses_status_idx" ON "expenses"("status");

-- CreateIndex
CREATE INDEX "contract_optimizations_leaseId_idx" ON "contract_optimizations"("leaseId");

-- CreateIndex
CREATE INDEX "space_change_requests_tenantId_idx" ON "space_change_requests"("tenantId");

-- CreateIndex
CREATE INDEX "space_change_requests_storeId_idx" ON "space_change_requests"("storeId");

-- CreateIndex
CREATE INDEX "budgets_tenantId_idx" ON "budgets"("tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "budgets_tenantId_year_quarter_scope_scopeValue_key" ON "budgets"("tenantId", "year", "quarter", "scope", "scopeValue");

-- CreateIndex
CREATE INDEX "risks_tenantId_idx" ON "risks"("tenantId");

-- CreateIndex
CREATE INDEX "risks_category_idx" ON "risks"("category");

-- CreateIndex
CREATE INDEX "ai_interactions_tenantId_idx" ON "ai_interactions"("tenantId");

-- CreateIndex
CREATE INDEX "ai_interactions_userId_idx" ON "ai_interactions"("userId");

-- CreateIndex
CREATE INDEX "ai_interactions_module_idx" ON "ai_interactions"("module");

-- CreateIndex
CREATE INDEX "translation_jobs_tenantId_idx" ON "translation_jobs"("tenantId");

-- CreateIndex
CREATE INDEX "translation_segments_jobId_idx" ON "translation_segments"("jobId");

-- CreateIndex
CREATE UNIQUE INDEX "translation_segments_jobId_segmentNumber_key" ON "translation_segments"("jobId", "segmentNumber");

-- CreateIndex
CREATE INDEX "user_sessions_tenantId_idx" ON "user_sessions"("tenantId");

-- CreateIndex
CREATE INDEX "user_sessions_userId_idx" ON "user_sessions"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "system_config_key_key" ON "system_config"("key");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stores" ADD CONSTRAINT "stores_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stores" ADD CONSTRAINT "stores_mallId_fkey" FOREIGN KEY ("mallId") REFERENCES "malls"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "malls" ADD CONSTRAINT "malls_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mall_contacts" ADD CONSTRAINT "mall_contacts_mallId_fkey" FOREIGN KEY ("mallId") REFERENCES "malls"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leases" ADD CONSTRAINT "leases_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leases" ADD CONSTRAINT "leases_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leases" ADD CONSTRAINT "leases_mallId_fkey" FOREIGN KEY ("mallId") REFERENCES "malls"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leases" ADD CONSTRAINT "leases_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lease_renewals" ADD CONSTRAINT "lease_renewals_leaseId_fkey" FOREIGN KEY ("leaseId") REFERENCES "leases"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "negotiations" ADD CONSTRAINT "negotiations_mallId_fkey" FOREIGN KEY ("mallId") REFERENCES "malls"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "negotiations" ADD CONSTRAINT "negotiations_leaseId_fkey" FOREIGN KEY ("leaseId") REFERENCES "leases"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "negotiations" ADD CONSTRAINT "negotiations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "negotiation_interactions" ADD CONSTRAINT "negotiation_interactions_negotiationId_fkey" FOREIGN KEY ("negotiationId") REFERENCES "negotiations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "store_analytics" ADD CONSTRAINT "store_analytics_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contract_optimizations" ADD CONSTRAINT "contract_optimizations_leaseId_fkey" FOREIGN KEY ("leaseId") REFERENCES "leases"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "space_change_requests" ADD CONSTRAINT "space_change_requests_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "space_change_requests" ADD CONSTRAINT "space_change_requests_requestedById_fkey" FOREIGN KEY ("requestedById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budgets" ADD CONSTRAINT "budgets_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "risks" ADD CONSTRAINT "risks_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_interactions" ADD CONSTRAINT "ai_interactions_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_interactions" ADD CONSTRAINT "ai_interactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "translation_segments" ADD CONSTRAINT "translation_segments_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "translation_jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_sessions" ADD CONSTRAINT "user_sessions_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_sessions" ADD CONSTRAINT "user_sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
