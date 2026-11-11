import rootPkg from "@/../../package.json";
import manifestJson from "@/config/manifest.json";
import {
  APP_VERSION,
  getSketivoManifest,
  sketivoManifest,
} from "@/lib/version";
import appPkg from "../../package.json";
import { describe, expect, it } from "vitest";

describe("Version consistency & helper tests", () => {
  it("exports a valid APP_VERSION matching package.json", () => {
    expect(APP_VERSION).toBeDefined();
    expect(APP_VERSION).toBe(appPkg.version);
    expect(APP_VERSION).toBe(rootPkg.version);
  });

  it("returns the correct sketivo manifest from helper", () => {
    const manifest = getSketivoManifest();
    expect(manifest).toEqual({
      cms: "Sketivo",
      generator: "Sketivo CMS",
      version: APP_VERSION,
    });
  });

  it("exports sketivoManifest matching getSketivoManifest", () => {
    expect(sketivoManifest).toEqual(getSketivoManifest());
  });

  it("keeps config manifest.json version consistent with APP_VERSION", () => {
    expect(manifestJson.version).toBe(APP_VERSION);
    expect(manifestJson.cms).toBe("Sketivo");
    expect(manifestJson.generator).toBe("Sketivo CMS");
  });
});
