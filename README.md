# English Vocabulary Learning App 📚

A local-first web app for learning English vocabulary by topic, with daily lessons, quizzes, and progress tracking.

## Features

- 📖 **Daily Lessons**: 15 vocabulary words per topic with meanings (EN→VI), IPA, and example sentences
- 🧠 **Quizzes**: Multiple choice and fill-in-the-blank questions
- 🔥 **Streak Tracking**: Daily study streak and points gamification
- 🔊 **Text-to-Speech**: Listen to word pronunciation
- 📱 **Mobile-First**: Responsive design optimized for mobile
- 💾 **Local Storage**: All data persists in browser (no backend needed)
- 👤 **Local Auth**: Simple username/password stored locally

## Topics Available

- Travel
- Business
- Daily Life
- Technology
- Health
- Education
- Food & Cooking

## Getting Started

```bash
npm install
npm run dev
```

## Build for Production

```bash
npm run build
```

The build output is in `dist/` and can be deployed to any static hosting (GitHub Pages, Netlify, etc.).

## Deployment

This app auto-deploys to GitHub Pages on push to `main` via GitHub Actions.

## Tech Stack

- React 19 + Vite
- React Router (HashRouter for GitHub Pages compatibility)
- localStorage for data persistence
- Web Speech API for text-to-speech
