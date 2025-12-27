import { devices, type PlaywrightTestConfig } from '@playwright/test';
import type { Env } from './env';

export function getProjects(env: Env): PlaywrightTestConfig['projects'] {
  // PR: fastest
  if (env.RUN_PROFILE === 'pr') {
    return [
      {
        name: 'chromium-desktop',
        use: { ...devices['Desktop Chrome'] }
      }
    ];
  }

  // Nightly: broader
  if (env.RUN_PROFILE === 'nightly') {
    return [
      {
        name: 'chromium-desktop',
        use: { ...devices['Desktop Chrome'] }
      },
      {
        name: 'firefox-desktop',
        use: { ...devices['Desktop Firefox'] }
      },
      {
        name: 'chromium-mobile',
        use: { ...devices['Pixel 5'] }
      }
    ];
  }

  // Release: full matrix
  return [
    {
      name: 'chromium-desktop',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox-desktop',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit-desktop',
      use: { ...devices['Desktop Safari'] }
    },
    {
      name: 'chromium-mobile',
      use: { ...devices['Pixel 5'] }
    }
  ];
}
