# Component Documentation

This document provides detailed documentation for every React component in the English Vocabulary Learning App.

## Component Map

```
App.jsx
|-- AdminRoutes (internal)
|   |-- AdminLogin.jsx
|   +-- Admin.jsx
|-- Login.jsx
+-- UserApp (internal)
    |-- NavBar (internal)
    |-- Home.jsx
    |-- Lesson.jsx
    |-- Quiz.jsx
    |-- Result.jsx
    |-- Review.jsx
    +-- Profile.jsx
```

---

## App.jsx

**File:** `src/App.jsx`  
**Role:** Root component -- authentication gating and top-level routing.

### Exports
- `default` -- `App` component

### Internal Components

#### `NavBar`
- Fixed-position bottom navigation bar.
- Three tabs: Home, Review, Profile.
- Uses `useNavigate()` for programmatic navigation.
- Highlights the active tab by comparing `useLocation().pathname` to each route.

#### `AdminRoutes`
- Renders the admin section at `/admin` paths.
- Maintains local `adminAuth` state initialized from `isAdminLoggedIn()`.
- If not authenticated, renders `AdminLogin`.
- If authenticated, renders `Admin`.

#### `UserApp`
- Wraps authenticated user routes with the bottom `NavBar`.
- **Props:**
  - `user` (string) -- current username
  - `onLogout` (function) -- callback to clear auth state

### Behavior
1. On mount, reads `getCurrentUser()` from localStorage.
2. If the path starts with `/admin`, renders `AdminRoutes` (separate auth flow).
3. If no user is logged in, renders `Login`.
4. If a user is logged in, renders `UserApp` with all routes.

---

## Login.jsx

**File:** `src/pages/Login.jsx`  
**Role:** User login and registration form.

### Props
| Prop | Type | Description |
|------|------|-------------|
| `onLogin` | `(username: string) => void` | Called with the username after successful login/signup |

### Behavior
1. User enters username and password.
2. On submit:
   - If the username exists in `getUsers()`, validates the password.
   - If the username does not exist, creates a new user entry via `saveUsers()`.
3. On success, calls `onLogin(username)`.
4. On failure (wrong password), displays an error message.

### State
- `username` -- input value
- `password` -- input value
- `error` -- error message string (or null)
- `isSignup` -- toggle between login/signup mode

---

## Home.jsx

**File:** `src/pages/Home.jsx`  
**Role:** Main dashboard -- topic selection and streak display.

### Props
| Prop | Type | Description |
|------|------|-------------|
| `user` | `string` | Current username |

### Behavior
1. Loads user data via `getUserData(user)` on mount.
2. Displays stats: streak, points, last study date.
3. Lists all available topics from `getAvailableTopics()`.
4. On topic tap:
   - Calls `generateLesson(topicName)` to create a new lesson.
   - Saves the lesson to `userData.lessons[]`.
   - Navigates to `/lesson/{lessonId}`.

### Key Dependencies
- `lessonGenerator.js` -- `generateLesson()`, `getAvailableTopics()`
- `storage.js` -- `getUserData()`, `saveUserData()`

---

## Lesson.jsx

**File:** `src/pages/Lesson.jsx`  
**Role:** Vocabulary lesson viewer with word cards and text-to-speech.

### Props
| Prop | Type | Description |
|------|------|-------------|
| `user` | `string` | Current username |

### URL Params
- `:lessonId` -- ID of the lesson to display (from `useParams()`)

### Behavior
1. Finds the lesson in `userData.lessons[]` by `lessonId`.
2. Displays words one at a time as cards:
   - Word (English)
   - IPA pronunciation
   - Meaning (Vietnamese)
   - Example sentence
3. **TTS button**: uses `window.speechSynthesis.speak()` to pronounce the word.
4. Progress bar shows current word index / total words.
5. "Next" button advances to the next word.
6. After all words, offers navigation to the quiz (`/quiz/{lessonId}`).

### State
- `currentIndex` -- index of the word currently being shown
- `lesson` -- the lesson object loaded from user data

---

## Quiz.jsx

**File:** `src/pages/Quiz.jsx`  
**Role:** Interactive quiz with multiple-choice and fill-in-the-blank questions.

### Props
| Prop | Type | Description |
|------|------|-------------|
| `user` | `string` | Current username |

### URL Params
- `:lessonId` -- ID of the lesson whose quiz to take

### Behavior
1. Loads the lesson from user data and flattens all questions from all words.
2. Presents questions one at a time:
   - **Multiple choice**: 4 options (1 correct + 3 distractors). Correct/wrong feedback shown after selection.
   - **Fill-in-the-blank**: text input where the user types the missing word. Case-insensitive comparison.
3. Tracks score (correct count / total).
4. On completion, navigates to `/result/{lessonId}`.

### State
- `currentQuestion` -- index of current question
- `score` -- number of correct answers
- `selectedAnswer` -- currently selected option (for MC)
- `userInput` -- text input value (for fill-in-blank)
- `answered` -- whether the current question has been answered

---

## Result.jsx

**File:** `src/pages/Result.jsx`  
**Role:** Quiz results and score summary.

### Props
| Prop | Type | Description |
|------|------|-------------|
| `user` | `string` | Current username |

### URL Params
- `:lessonId` -- lesson whose results to display

### Behavior
1. Displays final score: correct answers / total questions.
2. Shows percentage and points earned.
3. Updates the user streak:
   - If `lastStudyDate` is not today, increments streak (or resets if gap > 1 day).
   - Updates `lastStudyDate` to today.
4. Awards points based on quiz performance.
5. Saves quiz result to `userData.quizResults[]`.
6. Offers buttons: "Home" and "Review Words".

### State
- `saved` -- whether results have been persisted (prevents double-save)

---

## Review.jsx

**File:** `src/pages/Review.jsx`  
**Role:** Browse and review all previously learned words.

### Props
| Prop | Type | Description |
|------|------|-------------|
| `user` | `string` | Current username |

### Behavior
1. Loads all lessons from `userData.lessons[]`.
2. Collects all words across all lessons.
3. Optionally filters by topic.
4. Displays word cards with:
   - Word, IPA, meaning, example
   - TTS button for pronunciation
5. Shows "no words" message if the user has not completed any lessons.

### State
- `words` -- aggregated word list
- `filter` -- topic filter string (or "all")

---

## Profile.jsx

**File:** `src/pages/Profile.jsx`  
**Role:** User profile with statistics and logout.

### Props
| Prop | Type | Description |
|------|------|-------------|
| `user` | `string` | Current username |
| `onLogout` | `() => void` | Callback to log out the user |

### Behavior
1. Loads user data and displays stats:
   - Total words learned (sum of all lesson word counts)
   - Total quizzes taken
   - Average quiz score
   - Current streak
   - Total points
2. Logout button calls `onLogout()`, which clears `currentUser` from localStorage and resets `App` state.

---

## AdminLogin.jsx

**File:** `src/pages/AdminLogin.jsx`  
**Role:** Admin authentication gate.

### Props
| Prop | Type | Description |
|------|------|-------------|
| `onAdminLogin` | `() => void` | Called after successful admin authentication |

### Behavior
1. Username and password form.
2. Calls `adminLogin(username, password)` from `storage.js`.
3. Validates against hardcoded credentials (`admin` / `123456789!`).
4. On success, sets `sessionStorage` flag and calls `onAdminLogin()`.
5. On failure, shows error message.

---

## Admin.jsx

**File:** `src/pages/Admin.jsx`  
**Role:** Admin dashboard for user management.

### Props
| Prop | Type | Description |
|------|------|-------------|
| `onAdminLogout` | `() => void` | Called when admin signs out |

### Behavior
1. Loads aggregate stats via `getAllUserStats()`.
2. Displays overview cards:
   - Total Users
   - Active Today
   - Words Learned (all users)
   - Total Quizzes (all users)
3. User management table with search:
   - Each row shows: username, join date, streak, points, words, avg score.
   - Actions per user:
     - **Reset Data** -- clears the user's lessons, quiz results, streak, and points via `resetUserData()`.
     - **Delete User** -- removes the user entirely via `deleteUser()`.
   - Both actions require confirmation.
4. "Sign Out" button calls `adminLogout()` then `onAdminLogout()`.

### State
- `stats` -- array of user stat objects from `getAllUserStats()`
- `confirmAction` -- tracks which user + action is pending confirmation
- `search` -- search filter string
