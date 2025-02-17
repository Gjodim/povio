import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({

  // Timeout for assertions (e.g., expect(page).toHaveText())
  expect: { timeout: 15_000 },
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 2,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { outputFolder: `playwright-report/${process.env.BROWSER}` }],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  
  use: {
      
    // Timeout for navigation (e.g., page.goto())
    navigationTimeout: 30_000,
    
    // Timeout for actions and locators (e.g., clicks, typing, .locator())
    actionTimeout: 10_000,
    
    /* Base URL to use in actions like `await page.goto('/')`. */
     baseURL: 'https://povio-at.herokuapp.com/',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'newUserSignUpAndLogin',
      testMatch: 'newUserSignUpAndLogin.setup.ts',
    },

    {
      name: 'Logged_In',
      testMatch: 'tests/signed-in/**/*.spec.ts',
      dependencies: ['newUserSignUpAndLogin'],
      teardown: 'cancelAccount',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'cancelAccount',
      testMatch: 'cancelAccount.setup.ts',
    },

    {
      name: 'Chrome_Desktop',
      testIgnore: 'tests/signed-in/**/*.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'Firefox_Desktop',
      testIgnore: 'tests/signed-in/**/*.spec.ts',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'Safari_Desktop',
      testIgnore: 'tests/signed-in/**/*.spec.ts',
      use: { ...devices['Desktop Safari'] },
    },
    
    
    // Excluding these because mobile logged in menu has bugs and not visible
    // {
    //   name: 'Chrome mobile',
    //   use: { ...devices['Pixel 5'] },
    // },

    // {
    //   name: 'Safari mobile',
    //   use: { ...devices['iPhone 14'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

  ],
});
