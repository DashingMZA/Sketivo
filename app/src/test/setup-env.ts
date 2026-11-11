// Module-level code in the api slices builds a better-auth client, which
// throws on an undefined base URL. Tests never reach the network, so these
// mirror the documented dev defaults rather than any real deployment.
process.env.NEXT_PUBLIC_BACKEND_URL ??= "http://localhost:4000/api/v1";
process.env.NEXT_PUBLIC_HP_WS_URL ??=
  "ws://localhost:4000/api/v1/editor/collab";
process.env.NEXT_PUBLIC_BUCKET_URL ??= "http://localhost:9000/sketivo-test";
process.env.NEXT_PUBLIC_GIT_APP_NAME ??= "sketivo-test";

const brandEnv: Record<string, string> = {
  NEXT_PUBLIC_BRAND_NAME: "Sketivo",
  NEXT_PUBLIC_BRAND_URL: "https://sketivo.com",
  NEXT_PUBLIC_BRAND_SLUG: "sketivo",
  NEXT_PUBLIC_BRAND_LOGO: "/images/logo.svg",
  NEXT_PUBLIC_BRAND_LOGO_DARK: "/images/logo-white.svg",
  NEXT_PUBLIC_BRAND_LOGO_ICON: "/images/logo-icon.svg",
  NEXT_PUBLIC_BRAND_LOGO_WIDTH: "136",
  NEXT_PUBLIC_BRAND_LOGO_HEIGHT: "40",
  NEXT_PUBLIC_BRAND_FAVICON: "/images/favicon.png",
  NEXT_PUBLIC_TERMS_URL: "https://sketivo.com/terms",
  NEXT_PUBLIC_PRIVACY_URL: "https://sketivo.com/privacy-policy",
  NEXT_PUBLIC_SUPPORT_URL: "https://sketivo.com/contact",
  NEXT_PUBLIC_UPDATES_URL: "https://updates.sketivo.com",
  NEXT_PUBLIC_STATUS_URL: "https://status.sketivo.com",
  NEXT_PUBLIC_COMMUNITY_URL: "https://discord.gg/KrpvHfqcNA",
  NEXT_PUBLIC_DOCS_URL: "https://docs.sketivo.com",
  NEXT_PUBLIC_SOURCE_URL: "https://github.com/DashingMZA/Sketivo",
};
for (const [key, value] of Object.entries(brandEnv)) process.env[key] ??= value;
