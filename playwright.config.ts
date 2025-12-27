import { defineConfig } from '@playwright/test';
import { getEnv } from './core/config/env';
import { getProjects } from './core/config/projects';

const env = getEnv();
const isCI = !!process.env.CI || env.CI;

const workers = env.PW_WORKERS ?? (isCI ? 4 : 2);
const retries = env.PW_RETRIES ?? (isCI ? 2 : 0);

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: isCI,

  timeout: 30_000,
  expect: { timeout: 10_000 },

  retries,
  workers,

  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['junit', { outputFile: 'test-results/junit.xml' }]
  ],

  outputDir: 'test-results',

  use: {
    baseURL: env.BASE_URL,
    headless: env.HEADLESS,

    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    actionTimeout: 10_000,
    navigationTimeout: 30_000
  },

  projects: getProjects(env)
});
