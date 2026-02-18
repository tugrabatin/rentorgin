-- AlterTable: Add segment audit fields to tenants
ALTER TABLE "tenants" ADD COLUMN "segmentUpdatedAt" TIMESTAMP(3);
ALTER TABLE "tenants" ADD COLUMN "segmentUpdatedBy" TEXT;
