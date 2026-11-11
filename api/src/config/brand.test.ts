import { afterEach, describe, expect, it, vi } from "vitest";

// brand.ts reads env at module load, so each case re-imports after stubbing.
// Defaults come from vitest.config.mts.

async function load() {
  vi.resetModules();
  return import("./brand.js");
}

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("api brand", () => {
  it("derives the Sketivo identifiers from env", async () => {
    const { brand } = await load();
    expect(brand).toMatchObject({
      name: "Sketivo",
      slug: "sketivo",
      bot_name: "sketivo-test",
      bot_email: "sketivotest@sketivo.com",
      config_dir: ".sketivo",
      auth_cookie_prefix: "sketivo-app",
      demo_cookie_prefix: "sketivo-demo",
      commit_trailer_prefix: "Sketivo",
      agent_branch_prefix: "sketivo/",
      upload_prefix: "sketivo",
      jwt_issuer: "sketivo-api",
    });
  });

  it("derives every identifier from BRAND_SLUG", async () => {
    vi.stubEnv("BRAND_NAME", "Acme CMS");
    vi.stubEnv("BRAND_SLUG", "Acme");
    vi.stubEnv("BRAND_URL", "https://cms.acme.io/");
    const { brand } = await load();
    expect(brand).toMatchObject({
      name: "Acme CMS",
      slug: "acme",
      url: "https://cms.acme.io",
      config_dir: ".acme",
      auth_cookie_prefix: "acme-app",
      commit_trailer_prefix: "Acme",
      agent_branch_prefix: "acme/",
      upload_prefix: "acme",
      jwt_issuer: "acme-api",
    });
  });

  it("authors GitLab agent commits as the git app, like the app does", async () => {
    vi.stubEnv("GIT_APP_NAME", "acme-cms-test");
    vi.stubEnv("BRAND_URL", "https://cms.acme.io");
    const { brand } = await load();
    expect(brand.bot_name).toBe("acme-cms-test");
    expect(brand.bot_email).toBe("acmecmstest@cms.acme.io");
  });

  it("refuses to load with a brand var unset", async () => {
    vi.stubEnv("BRAND_NAME", "");
    vi.stubEnv("BRAND_SLUG", "!!!");
    vi.stubEnv("GIT_APP_NAME", "");
    await expect(load()).rejects.toThrow(
      "Missing required env vars (see api/.env.example): BRAND_NAME, BRAND_SLUG, GIT_APP_NAME",
    );
  });
});
