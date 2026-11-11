<div align="center">

# Sketivo

**Open-source Git-based headless CMS for sites built with Astro, Hugo, Next.js, and AI website builders.**

Connect your GitHub or GitLab repo and start editing. Sketivo reads your content structure and builds the editor for you. No schema to define. No config file to write. Every save is a real Git commit.

[**Live Demo**](https://sketivo.com) · [**Documentation**](https://docs.sketivo.com) · [**Try Cloud Version for Free**](https://sketivo.com/pricing?ref=github)

![License](https://img.shields.io/badge/license-AGPL%20v3-2b7489)
![Stars](https://img.shields.io/github/stars/DashingMZA/sketivo?style=social)

<img width="1920" height="929" alt="sketivo" src="https://github.com/user-attachments/assets/64da6a53-cf84-4baf-b731-d83cdaee493a" />

</div>

## Contents

- [Why Sketivo](#why-sketivo)
- [What makes it different](#what-makes-sketivo-different)
- [How it works](#how-sketivo-works)
- [Who it's for](#who-sketivo-is-for)
- [What it is not](#what-sketivo-is-not)
- [Built your site with an AI builder?](#built-your-site-with-an-ai-builder)
- [Features](#key-features-of-sketivo)
- [Supported static site generators](#supported-static-site-generators)
- [Get started](#get-started-with-sketivo)
  - [Sketivo Cloud](#sketivo-cloud-fastest)
  - [Self-host](#self-host-sketivo)
- [Project structure](#project-structure)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)

## Why Sketivo

Static sites are fast, secure, and cheap to host. But managing their content is a pain for non-technical people.

Nobody on your marketing team should need Git, Markdown, or a code editor to fix a heading or swap an image. Neither should the client you shipped a site to last year. So they message you instead. You become the bottleneck for every small change, on every site you touch.

Sketivo puts a visual editor on top of the repo you already have. They edit content. Sketivo commits it back to Git. You keep your workflow, your pipeline, and your full version history.

## What makes Sketivo different

**Your schema is detected, not configured.** Point Sketivo at a repo. It reads your Markdown files and frontmatter and builds the editing interface from what is already there. Most Git-based CMS options make you describe every collection and field first. You can still open the schema editor and adjust field types, labels, defaults, and dropdowns when you want tighter control.

**Every save is a commit.** Content stays in your repo as plain files. Nothing is copied into a Sketivo database. If you stop using Sketivo tomorrow, your content is already where it always was, in a format you own.

**Clients and teammates edit without a Git account.** Invite anyone by email. They log in, edit in a form, and hit save. The commit goes through your connected Git account. They never see GitHub, a pull request, or a merge conflict.

## How Sketivo works

<img width="1160" height="460" alt="how-sketivo-works-visual-diagram" src="https://github.com/user-attachments/assets/94abc0b6-e4be-429b-b196-bdd446bb13d6" />

1. **Connect your repo.** Authorize Sketivo on GitHub or GitLab and pick a repository.
2. **Edit visually.** Sketivo reads your content files and renders a visual editor. No schema or config to write first.
3. **Commit to Git.** Every edit becomes a normal commit in your repo. Your site rebuilds through your existing pipeline. Nothing leaves your Git history.

Your repo is always the single source of truth. Sketivo never locks your content into a proprietary database.

## Who Sketivo is for

- **Agencies and freelancers** handing sites to clients who will never open a code editor.
- **Dev teams** who want marketing and content people editing without a pull request for every typo.
- **Developers** who want a clean editing UI for their own Astro, Hugo, or Next.js site.
- **Semi-technical site owners.** You do not have to be a developer to use Sketivo. If you can build a site with one of these frameworks or an AI builder, you can connect it and edit it.

If your content lives in Markdown files in a Git repo, Sketivo works for you.

## What Sketivo is not

Worth knowing before you install anything.

- **Not a page builder.** Sketivo manages content inside your existing layouts. It does not change design, CSS, or page structure.
- **Not for database-driven apps.** If your content comes from an external API or a database instead of Git, this is the wrong tool.
- **Not for teams who do not use Git.** The repo is the storage layer. There is no alternative backend.

## Built your site with an AI builder?

Sites built with Claude, Lovable, Replit, or Bolt work with Sketivo, on two conditions. The project has to live on GitHub, and the content has to be in Markdown or MDX files.

Tell the AI tool to structure content that way before it writes the site. Retrofitting later is harder than asking upfront. After that, connect the repo and edit copy, headlines, and blog posts in Sketivo instead of spending tokens on a prompt every time a sentence changes.

## Key Features of Sketivo

**Editing**

- Visual editor for Markdown, MDX, and frontmatter. Direct file editing for HTML, JSON, YAML, TOML, TS, and JS.
- Live preview in a sandbox before you publish. No rebuild required.
- Save as draft locally without triggering a build.
- Rich content blocks: Mermaid diagrams, embedded iframes, charts, and external image URLs.
- Shortcodes and custom content blocks for consistent content.
- AI assistant with your own API key from OpenAI, Anthropic, Google, or xAI. Pick the exact model.
- Edit as code when you need to work at that level.

**Git control**

- Every change is a commit. Full history, full attribution.
- Undo and restore previous versions from inside the CMS. No repo digging.
- Create branches, open pull requests, and merge without leaving Sketivo.

**Teams and clients**

- Email invites. No GitHub or GitLab account needed for invited editors.
- Roles and permissions per organization.
- Live collaboration with cursors, avatars, and name labels.

**Structure**

- Visual schema editor for field types, input styles, defaults, and required fields.
- Nested collections for large sites.
- Folder management and global search with Cmd/Ctrl + K.
- Media library with drag, drop, rename, and reuse. Media lives in your repo.

**Publishing**

- One-click Vercel deploy. Every later change triggers a rebuild automatically.
- Built-in SEO tools: slug editing, SERP preview, link analysis, and content recommendations.
- 100+ pre-configured Astro, Hugo, and Next.js templates to start from.

**Everywhere**

- 12 native languages: English, Chinese, Japanese, German, French, Spanish, Portuguese, Russian, Korean, Indonesian, Vietnamese, and Bengali.
- Dark mode.
- Works on mobile and tablet. Publish a post from your phone.

## Supported static site generators

Astro · Next.js · Hugo · TanStack Start · Nuxt · Svelte · Eleventy · Jekyll

## Get started with Sketivo

### Sketivo Cloud (fastest)

Skip the setup. Connect a repo and start editing in minutes.

[**Start for free**](https://sketivo.com/pricing?ref=github)

### Self-host Sketivo

Run the whole thing yourself. The self-hosted build has no plans, billing, or usage limits. Every feature is unlocked.

**Requirements:** Node.js 22+, pnpm 11+, and a MongoDB instance.

```bash
pnpm install

# configure both apps
cp api/.env.example api/.env
cp app/.env.example app/.env
```

Fill in each `.env`. See [app/README.md](https://github.com/DashingMZA/sketivo/blob/main/app/README.md#environment-variables) and [api/README.md](https://github.com/DashingMZA/sketivo/blob/main/api/README.md#environment-variables) for what every variable does and how to obtain it. The one shared step is media storage, covered below.

```bash
# run backend and frontend together
pnpm dev

# or separately, in two terminals
pnpm dev:api
pnpm dev:app
```

#### Run with Docker

A `docker-compose.yml` brings up MongoDB, the API, and the web app together.

```bash
cp api/.env.example api/.env
cp app/.env.example app/.env
docker compose up --build
```

Web runs on `http://localhost:3000`. API runs on `http://localhost:4000` with a health check at `/healthz`. MongoDB runs in the `mongo` service as a single-node replica set (transactions require one), so you can leave `MONGO_URI` unset to use it. If you bring your own MongoDB, it must be a replica set too.

`NEXT_PUBLIC_*` values are inlined into the web image at build time. Compose reads them from your shell or a root-level `.env` file, not `app/.env`. At minimum set `NEXT_PUBLIC_GIT_APP_NAME` (and `NEXT_PUBLIC_GITLAB_CLIENT_ID` if you use GitLab), then rebuild with `docker compose up --build`.

## Project structure

```
app/   # Next.js app, the CMS UI
api/   # Express + MongoDB backend: auth, orgs, projects, git providers
```

## Documentation

- **Full docs:** [docs.sketivo.com](https://docs.sketivo.com)
- [app/README.md](https://github.com/DashingMZA/sketivo/blob/main/app/README.md): frontend stack, folder structure, env vars, scripts, GitHub and GitLab app setup.
- [api/README.md](https://github.com/DashingMZA/sketivo/blob/main/api/README.md): backend stack, module structure, env vars, scripts, secret generation, extension points.

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](https://github.com/DashingMZA/sketivo/blob/main/CONTRIBUTING.md). Please report security issues privately per [SECURITY.md](https://github.com/DashingMZA/sketivo/blob/main/SECURITY.md).

## License

[GNU AGPLv3](https://github.com/DashingMZA/sketivo/blob/main/LICENSE). Free to use, modify, and self-host. If you run a modified version as a network service, you must make your modified source available to its users under the same license.

---

<div align="center">

If Sketivo saves you a round of content edits, [**star the repo**](https://github.com/DashingMZA/sketivo) so more people find it.

[Website](https://sketivo.com) · [Docs](https://docs.sketivo.com) · [Demo](https://demo.sketivo.com) · [X (Twitter)](https://x.com/sketivocms) · [Join Discord Community](https://discord.gg/UDhCe68qy)

</div>
