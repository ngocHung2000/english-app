# English Vocabulary Learning App 📚

A local-first web application for learning English vocabulary by topic, featuring daily lessons, interactive quizzes, streak tracking, and gamification — all running entirely in the browser with no backend required.

## ✨ Features

- 📖 **Daily Lessons** — 15 vocabulary words per topic with meanings (EN→VI), IPA pronunciation, and example sentences
- 🧠 **Interactive Quizzes** — Multiple-choice and fill-in-the-blank questions auto-generated from lesson words
- 🔥 **Streak Tracking** — Daily study streak counter and points-based gamification
- 🔊 **Text-to-Speech** — Listen to word pronunciation via the Web Speech API
- 📱 **Mobile-First** — Responsive design optimized for phones (max-width 480px)
- 💾 **Local Storage** — All user data persists in the browser — no server, no sign-up friction
- 👤 **Local Auth** — Simple username/password accounts stored in localStorage
- ⚙️ **Admin Dashboard** — Manage users, view aggregate stats, reset or delete accounts

## 📂 Available Topics

| Topic | Words |
|-------|-------|
| ✈️ Travel | 15 |
| 💼 Business | 15 |
| 🏠 Daily Life | 15 |
| 💻 Technology | 15 |
| 🏥 Health | 15 |
| 🎓 Education | 15 |
| 🍳 Food & Cooking | 15 |

> **105 vocabulary words** across 7 topics, each with Vietnamese translations, IPA, and example sentences.

## 📸 Screenshots

_Coming soon — screenshots of Home, Lesson, Quiz, and Admin views._

## 🔧 Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- npm (included with Node.js)

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/<your-username>/english-app.git
cd english-app

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173/english-app/`.

## 🏗️ Build for Production

```bash
npm run build
```

The optimized output is written to `dist/` and can be deployed to any static hosting provider.

## 📁 Project Structure

```
english-app/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions → GitHub Pages
├── dist/                       # Production build output (git-ignored)
├── public/                     # Static assets
├── src/
│   ├── App.jsx                 # Root component — routing & auth
│   ├── main.jsx                # React entry point (HashRouter)
│   ├── index.css               # Global styles & CSS variables
│   ├── data/
│   │   └── vocabulary.js       # Vocabulary database (7 topics × 15 words)
│   ├── pages/
│   │   ├── Home.jsx            # Topic selection & streak display
│   │   ├── Lesson.jsx          # Word-card lesson viewer with TTS
│   │   ├── Quiz.jsx            # Quiz interface (MC + fill-in-blank)
│   │   ├── Result.jsx          # Quiz results & score summary
│   │   ├── Review.jsx          # Review all learned words
│   │   ├── Profile.jsx         # User stats & logout
│   │   ├── Login.jsx           # User login / sign-up
│   │   ├── Admin.jsx           # Admin dashboard
│   │   └── AdminLogin.jsx      # Admin auth gate
│   └── utils/
│       ├── storage.js          # localStorage wrapper & user management
│       └── lessonGenerator.js  # Lesson & quiz question generation
├── index.html                  # HTML shell
├── package.json                # Dependencies & scripts
├── vite.config.js              # Vite configuration
└── LICENSE                     # MIT License
```

## 🏛️ Architecture Overview

The app is a **single-page application (SPA)** with no backend. All data lives in the browser:

1. **React 19** renders the UI with functional components and hooks.
2. **React Router 7** provides client-side routing via `HashRouter` (hash-based URLs work on GitHub Pages without server-side rewrites).
3. **localStorage** stores user accounts, lesson history, quiz results, streaks, and points.
4. **Vite 6** handles development (HMR) and production builds.
5. **Web Speech API** provides native text-to-speech pronunciation.

There is no external API, no database, and no server — the entire app is a set of static files.

For detailed architecture documentation, see [`docs/architecture.md`](docs/architecture.md).

## 📖 Documentation

Detailed documentation is available in the [`docs/`](docs/) directory:

| Document | Description |
|----------|-------------|
| [Architecture](docs/architecture.md) | System overview, tech stack, data flow, state management |
| [Components](docs/components.md) | Detailed docs for every React component/page |
| [Data Layer](docs/data-layer.md) | Vocabulary schema, localStorage model, lesson generator |
| [Deployment](docs/deployment.md) | Build process, GitHub Actions, hosting alternatives |
| [Contributing](docs/contributing.md) | Dev setup, code style, how to add topics/pages, PR guide |

## 🚢 Deployment

The app auto-deploys to **GitHub Pages** on every push to the `master` branch via GitHub Actions.

- Workflow file: `.github/workflows/deploy.yml`
- Build: `npm ci` → `npm run build`
- Deploy: uploads `dist/` as a GitHub Pages artifact

See [`docs/deployment.md`](docs/deployment.md) for details on alternative hosting options.

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|--------|
| React | 19 | UI framework |
| React Router | 7 | Client-side routing (HashRouter) |
| Vite | 6 | Build tool & dev server |
| Web Speech API | — | Text-to-speech pronunciation |
| localStorage | — | Client-side data persistence |
| GitHub Actions | — | CI/CD pipeline |
| GitHub Pages | — | Static hosting |

## 🤝 Contributing

Contributions are welcome! See [`docs/contributing.md`](docs/contributing.md) for the full guide.

Quick start:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Make your changes and test locally
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
