# Adwityaa Jha — Portfolio

Personal portfolio of **Adwityaa Jha**, showcasing work in business strategy, product, and project management. A single-page experience with interactive WebGL visuals, animated transitions, and a light/dark theme.

🔗 **Live:** [adwityaajha.com](https://adwityaajha.com)

> Design adapted from [Hamish Williams](https://hamishw.com)' open-source portfolio template.

---

## Features

- **Interactive 3D / WebGL** — a displacement sphere and metaball rendered with Three.js and custom GLSL shaders, with Draco-compressed glTF models for fast loading.
- **Motion design** — page and element transitions powered by Framer Motion.
- **Light & dark themes** — toggled at runtime and persisted to `localStorage`.
- **Pages** — animated home (intro, project summaries, profile), a `/uses` gear page, and a custom 404.
- **Build-time tooling** — sitemap generation and Draco decoder copying run automatically during `next build`.
- **Component workshop** — components developed and documented in Storybook.

## Tech stack

| Area          | Technology                             |
| ------------- | -------------------------------------- |
| Framework     | Next.js 14 (Pages Router, `*.page.js`) |
| UI            | React 18                               |
| 3D / graphics | Three.js + three-stdlib + GLSL shaders |
| Animation     | Framer Motion                          |
| Styling       | CSS Modules, PostCSS, Stylelint        |
| Tooling       | Storybook 6, ESLint, Prettier          |

## Getting started

Requires **Node.js ≥ 18.0.0** and **npm ≥ 8.6.0**.

```bash
# Install dependencies (uses legacy-peer-deps, see .npmrc)
npm install

# Start the dev server at http://localhost:3000
npm run dev
```

### Production build

```bash
npm run build   # build the optimized production bundle
npm run start   # serve the production build
```

### Storybook

```bash
npm run storybook        # run Storybook at http://localhost:9009
npm run build:storybook  # build a static Storybook bundle
```

## Configuration

Environment variables live in `.env`:

| Variable                  | Description                          |
| ------------------------- | ------------------------------------ |
| `NEXT_PUBLIC_WEBSITE_URL` | Canonical site URL (used by sitemap) |

## Project structure

```
src/
  components/   Reusable UI (Button, Model, Navbar, ThemeProvider, …)
  layouts/      App shell, Home sections, Project layout
  pages/        Routes — index, uses, 404 (Pages Router, *.page.js)
  hooks/        Custom React hooks
  assets/       Fonts and static assets
  utils/        Helpers
scripts/        Build-time scripts (sitemap, Draco decoder copy)
functions/      AWS Lambda@Edge handler for cache & security headers
public/         Static files, Draco decoder, manifest, sitemap
```

A few Next.js specifics (see `next.config.js`):

- Pages use the `*.page.js` / `*.api.js` extensions.
- `.svg` imports become React components (via SVGR); `.glsl`, `.glb`, `.hdr`, `.mp4`, and font files are loaded as assets.
- `trailingSlash` is enabled.

## Deployment

The site is a Next.js app served behind a CDN. The `functions/` directory contains an AWS Lambda@Edge handler that applies long-lived cache headers to static assets and security headers (HSTS, CSP, `X-Frame-Options`, and more) at the edge.

## Credits

The visual design and original component library are by [Hamish Williams](https://hamishw.com)
([HamishMW/portfolio](https://github.com/HamishMW/portfolio)), used and adapted with permission
under the original project's open-source terms. All project content and case studies are the work
of Adwityaa Jha.
