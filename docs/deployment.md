# Deployment Guide

This document covers how to build and deploy the English Vocabulary Learning App.

## Build Process

### Development Server

```bash
npm run dev
```

Starts the Vite development server at `http://localhost:5173/english-app/` with hot module replacement (HMR). Changes to source files are reflected instantly in the browser.

### Production Build

```bash
npm run build
```

Creates an optimized production build in the `dist/` directory. The build includes:
- Minified JavaScript bundles
- Optimized CSS
- Hashed filenames for cache busting
- All assets referenced from `index.html`

### Preview Production Build

```bash
npm run preview
```

Serves the `dist/` directory locally to verify the production build before deploying.

### Vite Configuration

The `vite.config.js` file sets:
- `base: '/english-app/'` -- all asset paths are prefixed with `/english-app/` for GitHub Pages subdirectory hosting
- `plugins: [react()]` -- enables React JSX transform

If deploying to a root domain (e.g., `https://yourdomain.com/`), change `base` to `'/'`.

---

## GitHub Actions (Automated Deployment)

### Workflow File

**File:** `.github/workflows/deploy.yml`

### Trigger

- **Automatic:** Push to the `master` branch
- **Manual:** `workflow_dispatch` (run from GitHub Actions UI)

### Jobs

#### 1. Build

```yaml
runs-on: ubuntu-latest
steps:
  - uses: actions/checkout@v4
  - uses: actions/setup-node@v4
    with:
      node-version: 20
      cache: npm
  - run: npm ci
  - run: npm run build
  - uses: actions/upload-pages-artifact@v3
    with:
      path: dist
```

- Checks out the repo
- Sets up Node.js 20 with npm caching
- Installs dependencies with `npm ci` (clean install)
- Runs the production build
- Uploads the `dist/` directory as a GitHub Pages artifact

#### 2. Deploy

```yaml
needs: build
runs-on: ubuntu-latest
environment:
  name: github-pages
  url: ${{ steps.deployment.outputs.page_url }}
steps:
  - id: deployment
    uses: actions/deploy-pages@v4
```

- Deploys the artifact to GitHub Pages
- Sets the environment URL for GitHub UI

### Permissions

```yaml
permissions:
  contents: read     # Read repo contents
  pages: write       # Deploy to Pages
  id-token: write    # OIDC token for Pages deployment
```

### Concurrency

```yaml
concurrency:
  group: pages
  cancel-in-progress: true
```

Only one deployment runs at a time. New pushes cancel in-progress deployments.

### GitHub Pages Setup

To enable GitHub Pages for this repo:
1. Go to **Settings** > **Pages**
2. Under **Source**, select **GitHub Actions**
3. Push to `master` to trigger the first deployment

---

## Alternative Hosting Options

Since the app is a static SPA with `HashRouter`, it works on any static file hosting without server-side configuration. No URL rewriting rules are needed because `HashRouter` uses hash fragments (`#/path`) for routing.

### Netlify

1. Connect the GitHub repository or drag-and-drop the `dist/` folder.
2. Build settings (if connecting repo):
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Update `base` in `vite.config.js` to `'/'` if deploying to a root domain.

### Vercel

1. Import the GitHub repository.
2. Vercel auto-detects Vite and configures the build.
3. Update `base` in `vite.config.js` to `'/'` if deploying to a root domain.

### Static File Server (nginx, Apache, S3)

1. Run `npm run build`.
2. Upload the contents of `dist/` to your server.
3. No special server configuration needed -- `HashRouter` handles routing client-side.

### Docker (Simple)

```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
```

---

## Environment Variables

The app requires **no environment variables**. There is no backend, no API keys, and no `.env` file. All configuration is in source code.

---

## Custom Domain

To use a custom domain with GitHub Pages:
1. Go to **Settings** > **Pages** > **Custom domain**
2. Enter your domain and configure DNS (CNAME or A record)
3. Update `base` in `vite.config.js` from `'/english-app/'` to `'/'`
4. Push the change to trigger a new deployment

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Blank page after deploy | Check that `base` in `vite.config.js` matches the URL path |
| 404 on refresh | Ensure you are using `HashRouter` (not `BrowserRouter`) |
| Assets not loading | Verify `base` configuration and check browser console |
| Build fails | Run `npm ci` to ensure clean dependencies |
