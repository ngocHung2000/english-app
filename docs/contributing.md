# Contributing Guide

Thank you for your interest in contributing to the English Vocabulary Learning App! This guide will help you get started.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- npm (included with Node.js)
- Git

### Setup

```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/<your-username>/english-app.git
cd english-app

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173/english-app/`.

---

## Project Structure

```
src/
  App.jsx               # Root component (routing & auth)
  main.jsx              # React entry point
  index.css             # Global styles & CSS variables
  data/vocabulary.js    # Vocabulary database
  pages/                # Page components (Home, Lesson, Quiz, etc.)
  utils/storage.js      # localStorage wrapper
  utils/lessonGenerator.js  # Lesson & quiz generation
```

For detailed documentation:
- [Architecture Overview](architecture.md)
- [Component Documentation](components.md)
- [Data Layer Documentation](data-layer.md)
- [Deployment Guide](deployment.md)

---

## Development Workflow

1. **Create a branch** from `master`:
   ```bash
   git checkout -b feature/my-feature
   ```

2. **Make your changes** in the appropriate files.

3. **Test locally** with the dev server:
   ```bash
   npm run dev
   ```

4. **Verify the production build** works:
   ```bash
   npm run build
   npm run preview
   ```

5. **Commit your changes** with a clear commit message:
   ```bash
   git add .
   git commit -m "Add feature: description of what you did"
   ```

6. **Push and open a Pull Request**:
   ```bash
   git push origin feature/my-feature
   ```
   Then open a PR on GitHub targeting `master`.

---

## Code Style Guidelines

### React Components
- Use **functional components** with hooks (no class components).
- File naming: **PascalCase** for components (e.g., `Home.jsx`, `QuizResult.jsx`).
- One component per file for page components.
- Keep components focused -- extract reusable UI into separate components if needed.

### JavaScript
- Use **ES modules** (`import`/`export`).
- File naming: **camelCase** for utility files (e.g., `storage.js`, `lessonGenerator.js`).
- Prefer `const` and `let` over `var`.
- Use template literals for string interpolation.

### CSS
- All styles go in the single global CSS file: `src/index.css`.
- Use **CSS custom properties** (variables) for colors, spacing, and other theme values.
- Follow the existing naming convention for CSS classes (lowercase with hyphens: `.word-card`, `.quiz-option`).
- No external CSS frameworks.
- No CSS-in-JS or CSS modules.

### State Management
- Use React `useState` and `useEffect` for component state.
- Use the `storage.js` wrapper for localStorage operations.
- No external state management libraries (no Redux, Zustand, etc.).

---

## Common Contribution Tasks

### Adding a New Vocabulary Topic

1. Open `src/data/vocabulary.js`.
2. Add a new object to the `VOCABULARY_DATABASE` array:

```js
{
  topic: "Your Topic Name",
  words: [
    {
      word: "example",
      meaning: "Vietnamese translation",
      ipa: "/IPA pronunciation/",
      example: "An example sentence using the word."
    },
    // Add up to 15 words following this pattern
  ]
}
```

3. The app automatically picks up new topics on the Home page.
4. Test that lessons and quizzes generate correctly for the new topic.

See [Data Layer Documentation](data-layer.md) for the full schema.

### Adding a New Page/Route

1. Create a new component in `src/pages/` (PascalCase, e.g., `NewPage.jsx`).
2. Import and add a `<Route>` in `src/App.jsx` inside the `UserApp` component:
   ```jsx
   <Route path="/new-page" element={<NewPage user={user} />} />
   ```
3. Optionally add a navigation item in the `NavBar` component.
4. Add CSS styles to `src/index.css`.

### Modifying Quiz Logic

Quiz question generation lives in `src/utils/lessonGenerator.js`. The `generateQuestions()` function creates two question types per word:
1. Multiple choice (meaning identification)
2. Fill-in-the-blank (word recall)

To add a new question type, modify `generateQuestions()` and update `Quiz.jsx` to handle the new type.

---

## Pull Request Guidelines

- **Clear description**: explain what you changed and why.
- **Focused scope**: keep PRs small and focused on a single feature or fix.
- **Test your changes**: verify the dev server and production build both work.
- **Follow existing patterns**: match the code style of the surrounding code.
- **No unrelated changes**: don't refactor unrelated code in the same PR.

---

## Reporting Issues

Use GitHub Issues to report bugs or request features. Include:

1. **Description** -- what happened or what you want
2. **Steps to reproduce** (for bugs)
3. **Expected behavior**
4. **Actual behavior**
5. **Browser and OS** (if relevant)

---

## Questions?

Open a GitHub Issue or Discussion if you have questions about the codebase or contribution process.
