import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:4181",
    trace: "retain-on-failure",
    serviceWorkers: "block",
  },
  webServer: {
    command: "node server-build/index.mjs",
    env: { PORT: "4181", PROBE_DATA_FILE: `.probe/e2e-${process.pid}.json` },
    url: "http://127.0.0.1:4181",
    reuseExistingServer: false,
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    {
      name: "mobile",
      use: { ...devices["iPhone 13"], defaultBrowserType: "chromium" },
    },
    { name: "safari", use: { ...devices["Desktop Safari"] } },
    { name: "iphone-safari", use: { ...devices["iPhone 13"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
  ],
});
