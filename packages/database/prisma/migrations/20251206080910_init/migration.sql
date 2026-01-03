-- CreateIndex
CREATE INDEX "leases_endDate_idx" ON "leases"("endDate");

-- CreateIndex
CREATE INDEX "leases_contractNumber_idx" ON "leases"("contractNumber");

-- CreateIndex
CREATE INDEX "store_analytics_year_month_idx" ON "store_analytics"("year", "month");
