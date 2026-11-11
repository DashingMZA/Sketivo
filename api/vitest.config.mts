import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/**/*.test.ts"],
    env: {
      BRAND_NAME: "Sketivo",
      BRAND_URL: "https://sketivo.com",
      BRAND_SLUG: "sketivo",
      BRAND_SUPPORT_URL: "https://sketivo.com/contact",
      GIT_APP_NAME: "sketivo-test",
    },
    typecheck: {
      tsconfig: "./tsconfig.test.json",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
});
