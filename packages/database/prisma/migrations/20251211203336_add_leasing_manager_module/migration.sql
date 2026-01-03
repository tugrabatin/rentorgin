-- CreateEnum
CREATE TYPE "SeniorityLevel" AS ENUM ('ENTRY', 'MID', 'SENIOR', 'LEAD', 'DIRECTOR');

-- CreateEnum
CREATE TYPE "LeasingTaskCategory" AS ENUM ('CONTRACT_NEGOTIATION', 'CONTRACT_RENEWAL', 'MAINTENANCE', 'BUDGET_TRACKING', 'FRANCHISE_DEVELOPMENT', 'MARKET_RESEARCH', 'COMPLIANCE', 'TENANT_RELATIONS', 'SPACE_MANAGEMENT', 'REPORTING', 'OTHER');

-- CreateEnum
CREATE TYPE "TaskPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'ON_HOLD', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "FranchiseProjectStatus" AS ENUM ('PIPELINE', 'EVALUATION', 'FEASIBILITY_STUDY', 'APPROVED', 'IN_CONSTRUCTION', 'OPENED', 'REJECTED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "LeasingRequestType" AS ENUM ('RENT_REDUCTION', 'LEASE_EXTENSION', 'CONTRACT_REVISION', 'ADDITIONAL_SPACE', 'SPACE_REDUCTION', 'COMPLAINT', 'FRANCHISE_INQUIRY', 'RENEWAL_REQUEST', 'EARLY_TERMINATION', 'MAINTENANCE_REQUEST', 'DOCUMENT_REQUEST', 'OTHER');

-- CreateEnum
CREATE TYPE "RequestSource" AS ENUM ('TENANT', 'LANDLORD', 'INTERNAL', 'FRANCHISE_CANDIDATE', 'LEGAL_DEPT', 'FINANCE_DEPT');

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'PENDING_APPROVAL', 'PENDING_INFO', 'RESOLVED', 'REJECTED', 'CANCELLED');

-- CreateTable
CREATE TABLE "leasing_manager_role_templates" (
    "id" TEXT NOT NULL,
    "nameTR" TEXT NOT NULL,
    "nameEN" TEXT NOT NULL,
    "descriptionTR" TEXT,
    "descriptionEN" TEXT,
    "coreResponsibilities" TEXT[],
    "coreSkills" TEXT[],
    "sectors" TEXT[],
    "seniorityLevel" "SeniorityLevel" NOT NULL DEFAULT 'MID',
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "leasing_manager_role_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leasing_tasks" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "category" "LeasingTaskCategory" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "priority" "TaskPriority" NOT NULL DEFAULT 'MEDIUM',
    "storeId" TEXT,
    "mallId" TEXT,
    "franchiseProjectId" TEXT,
    "leaseId" TEXT,
    "assignedToId" TEXT,
    "defaultSLA" INTEGER,
    "riskLevel" "RiskLevel" NOT NULL DEFAULT 'LOW',
    "status" "TaskStatus" NOT NULL DEFAULT 'PENDING',
    "dueDate" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "leasing_tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "franchise_projects" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT,
    "status" "FranchiseProjectStatus" NOT NULL DEFAULT 'PIPELINE',
    "targetRegion" TEXT,
    "targetCity" TEXT,
    "targetMallId" TEXT,
    "storeType" TEXT,
    "brand" TEXT,
    "concept" TEXT,
    "estimatedCapex" DOUBLE PRECISION,
    "estimatedOpex" DOUBLE PRECISION,
    "expectedRevenue" DOUBLE PRECISION,
    "expectedRentCost" DOUBLE PRECISION,
    "feasibilityScore" DOUBLE PRECISION,
    "riskAssessment" TEXT,
    "notes" TEXT,
    "projectManagerId" TEXT,
    "targetOpeningDate" TIMESTAMP(3),
    "actualOpeningDate" TIMESTAMP(3),
    "storeId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "franchise_projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leasing_requests" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "type" "LeasingRequestType" NOT NULL,
    "source" "RequestSource" NOT NULL DEFAULT 'INTERNAL',
    "title" TEXT NOT NULL,
    "description" TEXT,
    "storeId" TEXT,
    "mallId" TEXT,
    "leaseId" TEXT,
    "franchiseProjectId" TEXT,
    "createdById" TEXT NOT NULL,
    "assignedToId" TEXT,
    "status" "RequestStatus" NOT NULL DEFAULT 'OPEN',
    "priority" "TaskPriority" NOT NULL DEFAULT 'MEDIUM',
    "dueDate" TIMESTAMP(3),
    "resolution" TEXT,
    "resolvedAt" TIMESTAMP(3),
    "resolvedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "leasing_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_description_templates" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "roleNameTR" TEXT NOT NULL,
    "roleNameEN" TEXT NOT NULL,
    "summaryTR" TEXT,
    "summaryEN" TEXT,
    "responsibilitiesTR" TEXT[],
    "responsibilitiesEN" TEXT[],
    "skillsTR" TEXT[],
    "skillsEN" TEXT[],
    "sectors" TEXT[],
    "seniorityLevel" "SeniorityLevel" NOT NULL DEFAULT 'MID',
    "companyContext" TEXT,
    "isTemplate" BOOLEAN NOT NULL DEFAULT false,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "job_description_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_description_generation_logs" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "inputParams" TEXT NOT NULL,
    "templateId" TEXT,
    "model" TEXT NOT NULL DEFAULT 'gpt-4',
    "tokensUsed" INTEGER,
    "responseTime" INTEGER,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "job_description_generation_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "market_research_records" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "region" TEXT,
    "city" TEXT,
    "district" TEXT,
    "mallId" TEXT,
    "competitorName" TEXT,
    "competitorType" TEXT,
    "rentLevel" DOUBLE PRECISION,
    "marketShare" DOUBLE PRECISION,
    "footTraffic" INTEGER,
    "notes" TEXT,
    "dataSource" TEXT,
    "recordDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "market_research_records_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "leasing_tasks_tenantId_idx" ON "leasing_tasks"("tenantId");

-- CreateIndex
CREATE INDEX "leasing_tasks_storeId_idx" ON "leasing_tasks"("storeId");

-- CreateIndex
CREATE INDEX "leasing_tasks_mallId_idx" ON "leasing_tasks"("mallId");

-- CreateIndex
CREATE INDEX "leasing_tasks_status_idx" ON "leasing_tasks"("status");

-- CreateIndex
CREATE UNIQUE INDEX "franchise_projects_code_key" ON "franchise_projects"("code");

-- CreateIndex
CREATE INDEX "franchise_projects_tenantId_idx" ON "franchise_projects"("tenantId");

-- CreateIndex
CREATE INDEX "franchise_projects_status_idx" ON "franchise_projects"("status");

-- CreateIndex
CREATE INDEX "franchise_projects_targetCity_idx" ON "franchise_projects"("targetCity");

-- CreateIndex
CREATE INDEX "leasing_requests_tenantId_idx" ON "leasing_requests"("tenantId");

-- CreateIndex
CREATE INDEX "leasing_requests_storeId_idx" ON "leasing_requests"("storeId");

-- CreateIndex
CREATE INDEX "leasing_requests_mallId_idx" ON "leasing_requests"("mallId");

-- CreateIndex
CREATE INDEX "leasing_requests_status_idx" ON "leasing_requests"("status");

-- CreateIndex
CREATE INDEX "leasing_requests_type_idx" ON "leasing_requests"("type");

-- CreateIndex
CREATE INDEX "job_description_templates_tenantId_idx" ON "job_description_templates"("tenantId");

-- CreateIndex
CREATE INDEX "job_description_templates_createdById_idx" ON "job_description_templates"("createdById");

-- CreateIndex
CREATE INDEX "job_description_generation_logs_tenantId_idx" ON "job_description_generation_logs"("tenantId");

-- CreateIndex
CREATE INDEX "job_description_generation_logs_userId_idx" ON "job_description_generation_logs"("userId");

-- CreateIndex
CREATE INDEX "job_description_generation_logs_templateId_idx" ON "job_description_generation_logs"("templateId");

-- CreateIndex
CREATE INDEX "market_research_records_tenantId_idx" ON "market_research_records"("tenantId");

-- CreateIndex
CREATE INDEX "market_research_records_city_idx" ON "market_research_records"("city");

-- CreateIndex
CREATE INDEX "market_research_records_mallId_idx" ON "market_research_records"("mallId");

-- CreateIndex
CREATE INDEX "market_research_records_recordDate_idx" ON "market_research_records"("recordDate");

-- AddForeignKey
ALTER TABLE "leasing_tasks" ADD CONSTRAINT "leasing_tasks_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leasing_tasks" ADD CONSTRAINT "leasing_tasks_franchiseProjectId_fkey" FOREIGN KEY ("franchiseProjectId") REFERENCES "franchise_projects"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "franchise_projects" ADD CONSTRAINT "franchise_projects_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leasing_requests" ADD CONSTRAINT "leasing_requests_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_description_templates" ADD CONSTRAINT "job_description_templates_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_description_generation_logs" ADD CONSTRAINT "job_description_generation_logs_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_description_generation_logs" ADD CONSTRAINT "job_description_generation_logs_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "job_description_templates"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "market_research_records" ADD CONSTRAINT "market_research_records_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
