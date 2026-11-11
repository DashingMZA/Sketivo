import { afterEach, describe, expect, it, vi } from "vitest";

// brand.ts reads process.env at module load, so each case re-imports it after
// stubbing env. Defaults come from src/test/setup-env.ts.

async function loadBrand() {
  vi.resetModules();
  return import("./brand");
}

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("brand", () => {
  it("reads the Sketivo identity from env", async () => {
    // Pin the identity explicitly: setup-env.ts only fills UNSET vars
    // (??=), so ambient brand env (e.g. CI's sketivo.com URLs) would
    // otherwise leak into this test and fail it.
    vi.stubEnv("NEXT_PUBLIC_BRAND_NAME", "Sketivo");
    vi.stubEnv("NEXT_PUBLIC_BRAND_SLUG", "sketivo");
    vi.stubEnv("NEXT_PUBLIC_BRAND_URL", "https://sketivo.com");
    vi.stubEnv("NEXT_PUBLIC_TERMS_URL", "https://sketivo.com/terms");
    vi.stubEnv("NEXT_PUBLIC_STATUS_URL", "https://status.sketivo.com");
    vi.stubEnv("NEXT_PUBLIC_BRAND_FAVICON", "/images/favicon.png");
    const b = await loadBrand();
    expect(b.BRAND_NAME).toBe("Sketivo");
    expect(b.BRAND_SLUG).toBe("sketivo");
    expect(b.TERMS_URL).toBe("https://sketivo.com/terms");
    expect(b.STATUS_API_URL).toBe("https://status.sketivo.com/api/status.json");
    expect(b.GIT_COMMIT_EMAIL_DOMAIN).toBe("sketivo.com");
    expect(b.BRAND_ICONS).toHaveLength(4);
  });

  it("derives identifiers and the commit email domain from a rebrand", async () => {
    vi.stubEnv("NEXT_PUBLIC_BRAND_NAME", "Acme CMS");
    vi.stubEnv("NEXT_PUBLIC_BRAND_SLUG", "Acme CMS");
    vi.stubEnv("NEXT_PUBLIC_BRAND_URL", "https://cms.acme.io/");
    const b = await loadBrand();
    expect(b.BRAND_URL).toBe("https://cms.acme.io");
    expect(b.GIT_COMMIT_EMAIL_DOMAIN).toBe("cms.acme.io");
    expect(b.CONFIG_DIR).toBe(".acme-cms");
    expect(b.COMMIT_TRAILER_PREFIX).toBe("Acme-cms");
  });

  it("hides a link set to none", async () => {
    vi.stubEnv("NEXT_PUBLIC_STATUS_URL", "none");
    vi.stubEnv("NEXT_PUBLIC_DOCS_URL", "off");
    vi.stubEnv("NEXT_PUBLIC_SOURCE_URL", "none");
    const b = await loadBrand();
    expect(b.STATUS_URL).toBe("");
    expect(b.STATUS_API_URL).toBe("");
    expect(b.DOCS_URL).toBe("");
    expect(b.SOURCE_URL).toBe("");
  });

  it("uses a custom favicon for every icon slot", async () => {
    vi.stubEnv("NEXT_PUBLIC_BRAND_FAVICON", "/brand/icon.png");
    const b = await loadBrand();
    expect(b.BRAND_APPLE_ICON).toBe("/brand/icon.png");
    expect(b.BRAND_ICONS).toEqual([
      { src: "/brand/icon.png", sizes: "192x192", purpose: "any" },
      { src: "/brand/icon.png", sizes: "512x512", purpose: "any" },
      { src: "/brand/icon.png", sizes: "512x512", purpose: "maskable" },
    ]);
  });
});
