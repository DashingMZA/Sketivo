import packageJson from "@/../package.json";
import { BRAND_NAME } from "@/lib/brand";

export const APP_VERSION =
  process.env.NEXT_PUBLIC_APP_VERSION || packageJson.version || "1.0.0";

// "Sketivo" → "Sketivo CMS"; a brand that already says CMS is kept as is.
export const SKETIVO_GENERATOR = /\bcms\b/i.test(BRAND_NAME)
  ? BRAND_NAME
  : `${BRAND_NAME} CMS`;

export const sketivoManifest = {
  cms: BRAND_NAME,
  generator: SKETIVO_GENERATOR,
  version: APP_VERSION,
};

export function getSketivoManifest() {
  return {
    cms: BRAND_NAME,
    generator: SKETIVO_GENERATOR,
    version: APP_VERSION,
  };
}
