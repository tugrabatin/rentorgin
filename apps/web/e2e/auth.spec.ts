/**
 * Authentication E2E Tests
 * User authentication flow tests
 * 
 * Kimlik Doğrulama E2E Testleri
 * Kullanıcı kimlik doğrulama akış testleri
 */

import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should display login page', async ({ page }) => {
    await page.goto('/login');
    
    await expect(page.locator('h2')).toContainText('Giriş Yap');
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });

  test('should login with valid credentials', async ({ page }) => {
    await page.goto('/login');
    
    await page.fill('input[type="email"]', 'admin@demo.com');
    await page.fill('input[type="password"]', 'demo123');
    await page.click('button[type="submit"]');
    
    // Should redirect to dashboard
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('text=Hoş geldiniz')).toBeVisible();
  });

  test('should show error with invalid credentials', async ({ page }) => {
    await page.goto('/login');
    
    await page.fill('input[type="email"]', 'admin@demo.com');
    await page.fill('input[type="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');
    
    // Should show error
    await expect(page.locator('text=/Login failed|Giriş başarısız/i')).toBeVisible();
  });

  test('should register new user', async ({ page }) => {
    await page.goto('/register');
    
    const timestamp = Date.now();
    await page.fill('input[name="firstName"]', 'Test');
    await page.fill('input[name="lastName"]', 'User');
    await page.fill('input[type="email"]', `test${timestamp}@example.com`);
    await page.fill('input[name="password"]', 'test123');
    await page.fill('input[name="confirmPassword"]', 'test123');
    await page.click('button[type="submit"]');
    
    // Should redirect to dashboard
    await expect(page).toHaveURL('/dashboard');
  });

  test('should show password strength indicator', async ({ page }) => {
    await page.goto('/register');
    
    await page.fill('input[name="password"]', 'weak');
    await expect(page.locator('text=Zayıf')).toBeVisible();
    
    await page.fill('input[name="password"]', 'StrongPass123');
    await expect(page.locator('text=/İyi|Güçlü/')).toBeVisible();
  });

  test('should logout user', async ({ page }) => {
    // Login first
    await page.goto('/login');
    await page.fill('input[type="email"]', 'admin@demo.com');
    await page.fill('input[type="password"]', 'demo123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/dashboard');
    
    // Logout
    await page.click('button:has-text("Çıkış")');
    
    // Should redirect to login
    await expect(page).toHaveURL('/login');
  });

  test('should protect routes', async ({ page }) => {
    // Try to access protected route without login
    await page.goto('/dashboard');
    
    // Should redirect to login
    await expect(page).toHaveURL('/login');
  });
});
















