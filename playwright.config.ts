import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  workers: 1,
  timeout: 60000,
  use: {
    baseURL: process.env.REVIEW_URL || "http://127.0.0.1:3042",
    browserName: "chromium",
    viewport: { width: 1440, height: 900 },
    trace: "retain-on-failure",
  },
  webServer: process.env.REVIEW_URL
    ? undefined
    : {
        command: "npm run build && npm run preview",
        url: "http://127.0.0.1:3042",
        reuseExistingServer: !process.env.CI,
        timeout: 120000,
      },
});
