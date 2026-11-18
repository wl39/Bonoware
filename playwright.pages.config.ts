import { defineConfig } from "@playwright/test";

const baseURL = "http://127.0.0.1:4191/Bonoware/";
export default defineConfig({
  testDir: "./tests/pages",
  use: { baseURL, serviceWorkers: "block" },
  webServer: {
    command:
      "vite preview --mode pages --base=/Bonoware/ --outDir=dist-pages --host=127.0.0.1 --port=4191",
    url: baseURL,
  },
});
