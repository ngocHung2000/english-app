# Architecture Overview

This document describes the architecture of the English Vocabulary Learning App.

## System Overview

The application is a **single-page application (SPA)** built with React 19 and Vite 6. It runs entirely in the browser with no backend server — all data is persisted in the browser's `localStorage`. The production build is a set of static files deployed to GitHub Pages.

```
┌─────────────────────────────────────────────────────────┐
│                      Browser                            │
│                                                         │
│  ┌──────────────┐    ┌───────────────┐    ┌──────────┐  │
│  │  React SPA   │───▶│ React Router  │───▶│  Pages   │  │
│  │  (App.jsx)   │    │ (HashRouter)  │    │          │  │
│  └──────────────┘    └───────────────┘    └────┬─────┘  │
│                                                │        │
│                    ┌───────────────────────────┐│        │
│                    │                           ▼│        │
│  ┌─────────────┐   │  ┌────────────────┐  ┌─────────┐   │
│  │ vocabulary  │───┼─▶│lessonGenerator │─▶│ storage │   │
│  │   .js       │   │  │    .js         │  │   .js   │   │
│  │ (static DB) │   │  │ (shuffle/quiz) │  │ (CRUD)  │   │
│  └─────────────┘   │  └────────────────┘  └────┬────┘   │
│                    └───────────────────────────┐│        │
│                                                ▼        │
│                                         ┌────────────┐  │
│                                         │localStorage│  │
│                                         └────────────┘  │
│                                                         │
│  ┌──────────────┐                                       │
│  │Web Speech API│  (text-to-speech pronunciation)       │
│  └──────────────┘                                       │
└─────────────────────────────────────────────────────────┘
```

## Tech Stack

| Technology | Version | Role |
|------------|---------|------|
| React | 19 | UI framework — functional components with hooks |
| Vite | 6 | Build tool and dev server with hot module replacement (HMR) |
| React Router | 7 | Client-side routing using `HashRouter` |
| Web Speech API | — | Browser-native text-to-speech for pronunciation |
| localStorage | — | Client-side key-value data persistence |
| GitHub Actions | — | CI/CD pipeline for automated deployment |
| GitHub Pages | — | Static file hosting |

### Why HashRouter?

GitHub Pages (and many static hosts) do not support server-side URL rewriting. `HashRouter` uses the URL hash fragment (`#/path`) for routing, which avoids 404 errors on page refresh because the server always serves `index.html` regardless of the hash.

## Application Architecture

### Entry Point

```
index.html → src/main.jsx → src/App.jsx
```

1. **`index.html`** — minimal HTML shell with a `<div id="root">` mount point.
2. **`src/main.jsx`** — creates the React root, wraps the app in `<HashRouter>`.
3. **`src/App.jsx`** — top-level component that handles auth gating and routing.

### Auth Flow

```
App.jsx
  │
  ├─ path starts with /admin?
  │   ├─ Yes → AdminRoutes
  │   │         ├─ isAdminLoggedIn()? → Admin dashboard
  │   │         └─ No → AdminLogin
  │   │
  │   └─ No → getCurrentUser()
  │            ├─ null → Login page
  │            └─ username → UserApp (authenticated routes + NavBar)
```

- **User auth**: simple username/password stored in localStorage. No tokens, no sessions, no server.
- **Admin auth**: hardcoded credentials validated against constants in `storage.js`. Admin state is stored in `sessionStorage` (cleared on tab close).

### Routing Table

All routes are under `HashRouter`. URLs look like `/#/path`.

| Path | Component | Auth | Description |
|------|-----------|------|-------------|
| `/` | `Home` | User | Topic selection, streak & points display |
| `/lesson/:lessonId` | `Lesson` | User | Vocabulary word cards with TTS |
| `/quiz/:lessonId` | `Quiz` | User | Multiple-choice & fill-in-blank quiz |
| `/result/:lessonId` | `Result` | User | Score summary, streak update |
| `/review` | `Review` | User | Browse all learned words |
| `/profile` | `Profile` | User | Stats overview, logout |
| `/admin` | `Admin` / `AdminLogin` | Admin | User management dashboard |

### Navigation

The `NavBar` component is a fixed-bottom navigation bar with three tabs:
- 🏠 Home (`/`)
- 📖 Review (`/review`)
- 👤 Profile (`/profile`)

It highlights the active tab based on `useLocation().pathname`.

## Data Flow

### Learning Flow

```
1. User opens Home page
   └─ getAvailableTopics() → displays topic cards

2. User taps a topic
   └─ generateLesson(topicName) → creates lesson object
   └─ saves lesson to userData.lessons[]
   └─ navigates to /lesson/{lessonId}

3. User studies word cards
   └─ Lesson page renders word, IPA, meaning, example
   └─ TTS button → speechSynthesis.speak()
   └─ navigates to /quiz/{lessonId} when done

4. User takes quiz
   └─ 2 questions per word (MC + fill-in-blank)
   └─ tracks correct/wrong in component state
   └─ navigates to /result/{lessonId} on completion

5. Results page
   └─ displays score & percentage
   └─ updates streak (if first study today)
   └─ awards points
   └─ saves quizResult to userData.quizResults[]
```

### Data Sources

| Source | Type | Description |
|--------|------|-------------|
| `vocabulary.js` | Static | Immutable vocabulary database — 7 topics × 15 words |
| `lessonGenerator.js` | Runtime | Generates shuffled lessons and quiz questions |
| `storage.js` | Persistent | Reads/writes localStorage for all user data |

## State Management

The app uses **no global state library** (no Redux, no Zustand, no Context API for state).

- **Component state**: `useState` and `useEffect` hooks in each page component.
- **Persistent state**: `storage.js` wraps `localStorage` with JSON serialization. Components read from storage on mount and write back on user actions.
- **Auth state**: `App.jsx` holds `user` in component state, initialized from `getCurrentUser()`. Login/logout update both state and localStorage.
- **Admin state**: `sessionStorage` flag checked via `isAdminLoggedIn()`.

This approach is simple and works well because:
- There is no cross-component shared state that needs synchronization.
- Each page reads what it needs from localStorage on mount.
- Data writes happen at interaction boundaries (quiz complete, lesson start).

## Styling

- Single global CSS file: `src/index.css`
- CSS custom properties (variables) for consistent theming:
  - `--primary`, `--primary-dark`, `--primary-light` — brand colors
  - `--bg`, `--bg-card` — backgrounds
  - `--text`, `--text-secondary` — text colors
  - `--radius`, `--shadow` — spacing/depth
- Mobile-first design with `max-width: 480px` container
- No CSS framework, no CSS-in-JS, no CSS modules
- Animations: simple `fadeIn` keyframe for page transitions

## Build & Deploy Pipeline

```
npm run dev          → Vite dev server (localhost:5173) with HMR
npm run build        → Production build → dist/
npm run preview      → Preview production build locally

git push master      → GitHub Actions → npm ci → npm run build → GitHub Pages
```

The `base` option in `vite.config.js` is set to `/english-app/` so all asset paths are correct when served from a GitHub Pages subdirectory.

See [deployment.md](deployment.md) for the full deployment guide.
