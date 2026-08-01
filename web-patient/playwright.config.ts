import { defineConfig, devices } from "@playwright/test";

/**
 * web-patient E2E konfigürasyonu.
 * Testler `tests/e2e` altında; uygulama otomatik olarak `npm run dev`
 * (port 3002) ile ayağa kaldırılır. Zaten çalışan bir sunucu varsa
 * (geliştirme sırasında) yeniden kullanılır.
 */
export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 30_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3002",
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3002",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
