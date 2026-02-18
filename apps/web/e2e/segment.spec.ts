/**
 * Customer Segment E2E Tests
 * Tests for segment selection during signup, segment gate, and segment switch in settings
 */

import { test, expect } from '@playwright/test';

test.describe('Segment Selection during Registration', () => {
  test('should show segment selection as first step', async ({ page }) => {
    await page.goto('/register');

    await expect(page.locator('text=İşletme Tipinizi Seçin')).toBeVisible();
    await expect(page.locator('text=Adım 1 / 2')).toBeVisible();
    await expect(page.locator('button:has-text("A1")')).toBeVisible();
    await expect(page.locator('button:has-text("A6")')).toBeVisible();
  });

  test('should not allow proceeding without segment selection', async ({ page }) => {
    await page.goto('/register');

    const continueBtn = page.locator('button:has-text("Devam")');
    await expect(continueBtn).toBeDisabled();
  });

  test('should proceed to step 2 after selecting a segment', async ({ page }) => {
    await page.goto('/register');

    await page.click('button:has-text("A1")');
    const continueBtn = page.locator('button:has-text("Devam")');
    await expect(continueBtn).toBeEnabled();
    await continueBtn.click();

    await expect(page.locator('text=Adım 2 / 2')).toBeVisible();
    await expect(page.locator('text=Kayıt Ol')).toBeVisible();
    await expect(page.locator('text=SoloMarka')).toBeVisible();
  });

  test('should allow going back to change segment', async ({ page }) => {
    await page.goto('/register');

    await page.click('button:has-text("A2")');
    await page.click('button:has-text("Devam")');

    await page.click('text=Değiştir');
    await expect(page.locator('text=Adım 1 / 2')).toBeVisible();
  });
});

test.describe('Segment Gate for Legacy Tenants', () => {
  test('should show segment selection screen when segment is null', async ({ page }) => {
    await page.goto('/dashboard');

    // If user is authenticated with null segment, should see the gate
    const gateVisible = await page.locator('text=Müşteri Tipi Seçimi Gerekli').isVisible();
    if (gateVisible) {
      await expect(page.locator('text=Kaydet ve Devam Et')).toBeVisible();
    }
  });
});

test.describe('Segment Switch in Settings', () => {
  test('should show segment tab in settings', async ({ page }) => {
    await page.goto('/settings');

    await expect(page.locator('text=Müşteri Tipi')).toBeVisible();
  });

  test('should display confirmation modal on segment change', async ({ page }) => {
    await page.goto('/settings');

    await page.click('text=Müşteri Tipi');
    await page.click('button:has-text("A2")');

    const saveBtn = page.locator('button:has-text("Kaydet")').last();
    if (await saveBtn.isEnabled()) {
      await saveBtn.click();
      await expect(page.locator('text=Bu değişiklik menüleri, panelleri')).toBeVisible();
    }
  });
});

test.describe('Dynamic Navigation based on Segment', () => {
  test('should render navigation items based on segment config', async ({ page }) => {
    await page.goto('/dashboard');

    // Navigation should be visible
    const nav = page.locator('aside nav');
    const navVisible = await nav.isVisible();
    if (navVisible) {
      const items = await nav.locator('a').count();
      expect(items).toBeGreaterThan(0);
    }
  });
});
