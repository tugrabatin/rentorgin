/**
 * Stores E2E Tests
 * Store management flow tests
 * 
 * Mağazalar E2E Testleri
 * Mağaza yönetimi akış testleri
 */

import { test, expect } from '@playwright/test';

test.describe('Store Management', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/login');
    await page.fill('input[type="email"]', 'admin@demo.com');
    await page.fill('input[type="password"]', 'demo123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/dashboard');
  });

  test('should display stores list', async ({ page }) => {
    await page.goto('/stores');
    
    await expect(page.locator('h1')).toContainText('Mağazalar');
    await expect(page.locator('table')).toBeVisible();
  });

  test('should create new store', async ({ page }) => {
    await page.goto('/stores/create');
    
    const timestamp = Date.now();
    await page.fill('input[name="name"]', `Test Store ${timestamp}`);
    await page.fill('input[name="code"]', `TST-${timestamp}`);
    await page.fill('input[name="city"]', 'İstanbul');
    await page.fill('input[name="address"]', 'Test Address');
    await page.fill('input[name="squareMeters"]', '100');
    
    await page.click('button[type="submit"]');
    
    // Should redirect to stores list
    await expect(page).toHaveURL('/stores');
    await expect(page.locator(`text=Test Store ${timestamp}`)).toBeVisible();
  });

  test('should view store details', async ({ page }) => {
    await page.goto('/stores');
    
    // Click first store's view button
    await page.click('a:has-text("Görüntüle")');
    
    // Should show store details
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('text=/Mağaza Bilgileri|Store Information/')).toBeVisible();
  });

  test('should navigate using global navigation', async ({ page }) => {
    await page.goto('/stores');
    
    // Click analytics in navigation
    await page.click('a:has-text("Analitik")');
    await expect(page).toHaveURL('/analytics');
    
    // Click stores again
    await page.click('a:has-text("Mağazalar")');
    await expect(page).toHaveURL('/stores');
  });
});

















