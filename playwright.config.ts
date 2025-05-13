import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Test Configuration.
 * For details, see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests-e2e',

  // Run tests in parallel
  fullyParallel: true,

  // Fail the build on CI if test.only is left in the code
  forbidOnly: !!process.env['CI'],

  // Retry failing tests on CI
  retries: process.env['CI'] ? 2 : 0,

  // Run tests sequentially on CI
  workers: process.env['CI'] ? 1 : undefined,

  // Use HTML reporter
  reporter: 'html',

  use: {
    // Base URL for relative navigation like page.goto('/')
    baseURL: 'http://localhost:4200',

    // Collect trace on first retry
    trace: 'on-first-retry',

    // Support for test IDs like: <div data-test-id="something" />
    testIdAttribute: 'data-test-id',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  // Run local dev server before tests
  webServer: {
    command: 'npm start',
    url: 'http://localhost:4200',
    timeout: 120 * 1000,
    reuseExistingServer: !process.env['CI'],
  },
});
