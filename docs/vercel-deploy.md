# Sketivo on Vercel — 2 separate projects (api + app)

> Status (updated 2026-11-10): the Sketivo Vercel projects do **not**
> exist yet — this guide walks through creating `sketivoapi` and
> `sketivoapp` from this repo (no hyphen in the slugs; the hyphenated
> domains do not exist). The Sitepins deployment
> (`sitepinsapi`/`sitepinsapp`, csofts.tech) is a separate deployment
> and is untouched by this repo. Companion doc for the Cloudflare
> setup: `docs/cloudflare-deploy.md`.

## 1. Architecture

Two separate Vercel projects from the same repo — the way the user
already runs other apps (e.g. admin + web as separate projects).
**Not** the single-project `services` setup: the root `vercel.json`
in this repo declares a 1-project / 2-service layout, which is a
different option and is ignored by the 2-project imports below
(Vercel only reads `vercel.json` from the project's Root Directory,
and neither `api/` nor `app/` has one).

| Piece | Vercel project | Root Directory | Framework | Domain |
| --- | --- | --- | --- | --- |
| API (Express 5 + Mongoose 9) | `sketivoapi` | `api` | Express | https://sketivoapi.vercel.app |
| App (Next.js 16) | `sketivoapp` | `app` | Next.js | https://sketivoapp.vercel.app |

(Project names are the intended slugs to create — no hyphen.
Hyphenated variants (`sketivo-api` / `sketivo-app`) do not exist and
return DEPLOYMENT_NOT_FOUND.)

```
browser ──► sketivoapp.vercel.app ──► app project (Next.js)
                │  NEXT_PUBLIC_BACKEND_URL
                ▼
            sketivoapi.vercel.app ──► api project (Express, real Node server)
                                           ├─► MongoDB Atlas
                                           └─► Cloudflare R2 (S3-compatible uploads)
```

## 2. How Vercel differs from the Cloudflare deployment

- **Realtime is expected to work here.** The API is a real long-running
  Node `http.Server`, and Vercel documents Express + `ws` WebSocket
  servers as a supported pattern — so Socket.io presence and Hocuspocus
  co-editing should function. This still needs a live two-browser
  check after the first deploy; on Cloudflare both are explicit 503
  stubs (`docs/cloudflare-deploy.md` §5).
- **No Durable Object, no single-threaded bottleneck.** The API holds
  its own Mongoose connection pool directly; there is no ~70–140 s
  eviction / cold Mongo reconnect like the Worker DO.
- **Native `bcrypt` and SMTP both work** (real Node). The Cloudflare
  swaps (`bcryptjs`, Resend HTTP mail) still work fine on Vercel too —
  no code change needed — but SMTP becomes an option again.
- **Live preview is currently STUBBED — known gap.** The Cloudflare
  build replaced `app/src/app/api/sandbox/*` (create / heartbeat /
  stop) with 503 `sandbox-unavailable` stubs, because the originals
  import `@vercel/sandbox` and sandbox helper modules that cannot run
  on Workers. On Vercel those originals would work natively. Until the
  routes are made runtime-gated (Vercel = original, Worker = stub),
  a Vercel deploy has no live preview — the editor degrades gracefully
  instead of hanging. To restore the originals for a Vercel-only
  deploy (this breaks the Cloudflare Worker build — do not do it if
  you still deploy to Cloudflare):
  `git checkout 12655c6 -- app/src/app/api/sandbox/`
- **Cookies:** the app and API live on different `*.vercel.app`
  subdomains. Leave `COOKIE_DOMAIN` **unset** — the session cookie
  then defaults to the API domain and is sent with the app's
  credentialed fetches to that domain. Do **not** set it to
  `.vercel.app` (public suffix — browsers reject cookies there).

## 3. Prerequisites (same as Cloudflare, except the domain)

- [ ] **MongoDB Atlas cluster** + DB user + Network Access `0.0.0.0/0`
  (same cluster as Cloudflare can be reused — a second deployment
  talking to the same Atlas database is fine; they share data).
- [ ] **R2 bucket `sketivo-media`** + API token + public URL
  `https://media.sketivo.com` (already done).
- [ ] **GitHub App** (slug, App ID, Client ID, Client Secret, `.pem`)
  + optional GitLab OAuth app (same as Cloudflare).
- [ ] **Resend API key** (optional for first launch — see mail note
  in §5) + a verified sending domain.
- [ ] Vercel account with access to team `zaheer-ahmads-projects`.

Secrets: generate with `openssl rand -base64 32` for
`BETTER_AUTH_SECRET`, `JWT_SECRET`, `INTERNAL_API_SECRET`;
`openssl rand -hex 32` for `SANDBOX_ENCRYPTION_KEY`.
`INTERNAL_API_SECRET` must be **identical** in both projects (and,
if you keep both deployments, identical to the Cloudflare one too).

## 4. Create the projects

### Why the agent cannot create them right now (blocker)

Creating/listing projects through the connected Vercel account
returns **403: Not authorized for scope `zaheer-ahmads-projects`** —
the MCP connection lacks that team's grant, and there is no
`authorize_team_access` tool to fix it from here. What unblocks it:
grant this Muse connection access to team `zaheer-ahmads-projects`
through Vercel consent / app installation (Vercel dashboard →
team settings → connected apps), then the agent can retry the
`create_git_project` calls (api: repo `DashingMZA/sketivo`,
rootDirectory `api`, project `sketivoapi`; app: rootDirectory
`app`, project `sketivoapp`).

### Manual path (dashboard — done 2026-11-09/10, kept as record)

Both projects were created this way. The steps below are how
they were created (keep for reference / if recreating):

Import the **same repo twice**, once per project:

**Project 1 — `sketivoapi`:**
1. [vercel.com/new](https://vercel.com/new) → Import Git Repository
   → `DashingMZA/sketivo`.
2. **Root Directory → `api`**. Framework Preset → **Express**
   (if it is not auto-detected, set it manually).
3. Add the API env vars from §5, then **Deploy**.

**Project 2 — `sketivoapp`:**
1. Same import flow again → `DashingMZA/sketivo`.
2. **Root Directory → `app`**. Framework Preset → **Next.js**.
3. Add the app env vars from §5, then **Deploy**.
   (Deploy the API first — the app build inlines the API URL, and
   the app is useless without a live API behind it.)

4. Note the assigned domains. If the names differ from
   `sketivoapi` / `sketivoapp`, replace the domains in §5
   accordingly. `NEXT_PUBLIC_*` are inlined at build time, so a
   wrong value means fixing the vars and **redeploying**.
5. Optional: add custom domains in each project's settings
   (e.g. `sketivo.sketivo.com` for the app — needs a DNS record;
   the apex `sketivo.com` is on Cloudflare, so use a subdomain,
   not the apex).

Auto-deploy note: importing enables automatic deploys on every push
to `main` by default, for both projects. If you want deploys to stay
manual, turn off Git auto-deploy in each project's settings
(Settings → Git) after import.

## 5. Environment variables

`<api>` = `https://sketivoapi.vercel.app`,
`<app>` = `https://sketivoapp.vercel.app`
(adjust if the project names/domains differ).
All `NEXT_PUBLIC_*` must be set **before** the app build (they are
inlined at build time).

### App project (`sketivoapp`)

| Var | Value |
| --- | --- |
| `NEXT_PUBLIC_BACKEND_URL` | `https://sketivoapi.vercel.app/api/v1` |
| `NEXT_PUBLIC_HP_WS_URL` | `wss://sketivoapi.vercel.app/api/v1/editor/collab` |
| `NEXT_PUBLIC_BRAND_URL` | `https://sketivoapp.vercel.app` |
| `NEXT_PUBLIC_BRAND_NAME` / `NEXT_PUBLIC_BRAND_SLUG` | `Sketivo` / `sketivo` |
| `NEXT_PUBLIC_BUCKET_URL` | `https://media.sketivo.com` |
| `NEXT_PUBLIC_GIT_APP_NAME` | GitHub App slug (**required, non-empty** — the build throws without it) |
| `NEXT_PUBLIC_GITLAB_CLIENT_ID` | optional |
| other `NEXT_PUBLIC_*` brand/link vars | see `app/.env.example` / `app/wrangler.jsonc` (same values as Cloudflare, except the three URLs above) |

App secrets (same values as Cloudflare where applicable):
`INTERNAL_API_SECRET`, `GITHUB_APP_ID`, `GITHUB_APP_CLIENT_ID`,
`GITHUB_APP_CLIENT_SECRET`, `GITHUB_APP_PRIVATE_KEY` (full `.pem`),
`GITLAB_CLIENT_SECRET` (optional), `AI_PROVIDER` / `AI_MODEL` /
`AI_API_KEY` (optional).

### API project (`sketivoapi`)

| Secret / var | Value |
| --- | --- |
| `MONGO_URI` | Atlas `mongodb+srv://…` string |
| `BETTER_AUTH_SECRET` | `openssl rand -base64 32` |
| `JWT_SECRET` | `openssl rand -base64 32` |
| `INTERNAL_API_SECRET` | same value as the app project |
| `SANDBOX_ENCRYPTION_KEY` | `openssl rand -hex 32` |
| `S3_ACCESS_KEY` / `S3_SECRET_KEY` | R2 API token |
| `S3_BUCKET_NAME` | `sketivo-media` |
| `S3_ENDPOINT` | `https://<account-id>.r2.cloudflarestorage.com` |
| `S3_REGION` | `auto` |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | GitHub OAuth app |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google OAuth app |
| `RESEND_API_KEY` | Resend API key |
| `REOON_API_KEY` | optional |
| `BASE_URL` | `https://sketivoapi.vercel.app` |
| `CORS_ORIGINS` | `https://sketivoapp.vercel.app` |
| `APP_URL` | `https://sketivoapp.vercel.app` |
| `COOKIE_DOMAIN` | *(leave unset — see §2)* |
| `TRUST_PROXY` | `1` |
| `MAIL_PROVIDER` | `resend` (or `console` + `REQUIRE_EMAIL_VERIFICATION=false` for a first launch with no mail — OTP is then logged, not emailed) |
| `REQUIRE_EMAIL_VERIFICATION` | `true` (or `false` with the console-mail first launch) |

## 6. Local verification (Sketivo rebrand, 2026-11-10)

| Check | Result |
| --- | --- |
| App `next build` with Vercel-style env (`NEXT_PUBLIC_BACKEND_URL=https://sketivoapi.vercel.app/api/v1`, full CI brand env) | PASS — exit 0, all routes emitted |
| App typecheck (`next typegen && tsc --noEmit`, CI env) | PASS |
| App `pnpm test` | PASS — 60 files, 1665 tests |
| API `pnpm build` (`tsc` + `tsc-alias`) | PASS — exit 0, `dist/` emitted |
| API typecheck (`tsc -p tsconfig.json --noEmit`) | PASS |
| API `pnpm test` | PASS — 44 files, 418 tests |
| `pnpm format:check` (api + app) | PASS — Prettier clean |
| `pnpm brand:check` | PASS — no hard-coded Sketivo identity |
| Root `vercel.json` services layout | Present — **not used** by the 2-project imports; kept for the single-project option |
| Vercel projects / live deploy | **Not yet done** — create the `sketivoapi` + `sketivoapp` projects from this repo (see §2–§3). The Sitepins deployment is separate and untouched. |

## 7. Smoke-test checklist (after first deploy)

- [ ] `GET https://sketivoapi.vercel.app/healthz` →
      `{"status":"ok","uptime":...}` (the Node server's probe — the
      `worker: "sketivo-api"` body only exists on the Cloudflare
      Worker entry).
- [ ] `GET https://sketivoapp.vercel.app/login` renders, login
      with a test user works, `/dashboard` loads.
- [ ] Create a project, connect a GitHub repo, edit a file, save → a
      real commit lands in the repo.
- [ ] Upload an image → object appears in the R2 bucket and renders
      at `https://media.sketivo.com/<key>`.
- [ ] Open the same file in two browsers → live cursors / presence
      appear and edits sync (realtime check — the main thing Vercel
      should do better than Cloudflare).
- [ ] Live preview button → currently shows "sandbox unavailable"
      (expected until §2's restore/gating work is done).
- [ ] Check the built app calls
      `https://sketivoapi.vercel.app/api/v1` (browser devtools
      Network tab). A wrong value means the build env was wrong —
      fix the vars and redeploy.

## 8. Rollback

- The Cloudflare deployment (if live) is unaffected — different
  platform, same Atlas + R2 + GitHub. Both can run side by side;
  they share one database, so a user/project created on one shows
  up on the other.
- To take Vercel down: delete the two projects in the Vercel
  dashboard. Data stays in Atlas + R2 + GitHub.
