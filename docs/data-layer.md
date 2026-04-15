# Data Layer Documentation

This document covers the data model, storage layer, and lesson generation logic of the English Vocabulary Learning App.

## Overview

The app has three data modules:

| Module | File | Purpose |
|--------|------|---------|
| Vocabulary Database | `src/data/vocabulary.js` | Static word data (7 topics x 15 words) |
| Storage Layer | `src/utils/storage.js` | localStorage CRUD for users and user data |
| Lesson Generator | `src/utils/lessonGenerator.js` | Lesson creation and quiz question generation |

---

## 1. Vocabulary Database

**File:** `src/data/vocabulary.js`

### Schema

The file exports a default array of topic objects:

```js
const VOCABULARY_DATABASE = [
  {
    topic: "Topic Name",       // string - display name of the topic
    words: [
      {
        word: "english_word",       // string - the English vocabulary word
        meaning: "Vietnamese text", // string - Vietnamese translation
        ipa: "/IPA notation/",      // string - IPA pronunciation guide
        example: "Example sentence" // string - usage example in English
      }
    ]
  }
];

export default VOCABULARY_DATABASE;
```

### Available Topics

| # | Topic | Word Count | Example Word |
|---|-------|------------|-------------|
| 1 | Travel | 15 | itinerary, destination, passport |
| 2 | Business | 15 | revenue, negotiation, stakeholder |
| 3 | Daily Life | 15 | commute, errand, household |
| 4 | Technology | 15 | algorithm, bandwidth, encryption |
| 5 | Health | 15 | diagnosis, prescription, therapy |
| 6 | Education | 15 | curriculum, scholarship, thesis |
| 7 | Food & Cooking | 15 | ingredient, cuisine, marinate |

**Total: 105 vocabulary words**

### How to Add a New Topic

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
    // ... add up to 15 words
  ]
}
```

3. The app will automatically detect the new topic and display it on the Home page.
4. Aim for 15 words per topic for consistency, though fewer will work.

---

## 2. Storage Layer

**File:** `src/utils/storage.js`

### Storage Wrapper

All localStorage operations go through a `storage` utility object that:
- Prefixes all keys with `english_app_` to avoid collisions
- JSON-serializes values on write and deserializes on read
- Catches errors silently (e.g., when localStorage is full or disabled)

```js
const STORAGE_PREFIX = 'english_app_';

export const storage = {
  get(key)    // Returns parsed JSON or null
  set(key, value)  // Stores JSON-stringified value
  remove(key)      // Removes the key
};
```

### localStorage Keys

| Key | Type | Description |
|-----|------|-------------|
| `english_app_current_user` | `string \| null` | Username of the currently logged-in user |
| `english_app_users` | `object` | User registry: `{ username: { createdAt, password } }` |
| `english_app_user_{username}` | `object` | Per-user data (lessons, quizzes, streak, points) |

Admin auth uses **sessionStorage** (not localStorage):

| Key | Type | Description |
|-----|------|-------------|
| `english_app_admin` | `"true" \| absent` | Admin login flag (cleared on tab close) |

### User Registry Schema

Stored at `english_app_users`:

```js
{
  "username1": {
    "createdAt": "2024-01-15T10:30:00.000Z",
    "password": "user_password"
  },
  "username2": { ... }
}
```

### Per-User Data Schema

Stored at `english_app_user_{username}`:

```js
{
  "lessons": [
    {
      "id": "lesson_1705312200000_a1b2c3",  // unique ID
      "topic": "Travel",                      // topic name
      "date": "2024-01-15",                   // creation date (YYYY-MM-DD)
      "words": [
        {
          "word": "itinerary",
          "meaning": "lich trinh",
          "ipa": "/aItInereri/",
          "example": "I planned my itinerary carefully.",
          "questions": [
            {
              "type": "multiple_choice",
              "question": "What does 'itinerary' mean?",
              "options": ["lich trinh", "diem den", "hanh ly", "ho chieu"],
              "answer": "lich trinh"
            },
            {
              "type": "fill_in_blank",
              "question": "Fill in the blank: I planned my ______ carefully.",
              "answer": "itinerary"
            }
          ]
        }
      ],
      "createdAt": "2024-01-15T10:30:00.000Z"  // ISO timestamp
    }
  ],
  "quizResults": [
    {
      "lessonId": "lesson_1705312200000_a1b2c3",
      "score": 12,       // correct answers
      "total": 15,       // total questions
      "date": "2024-01-15",
      "topic": "Travel"
    }
  ],
  "streak": 5,                    // consecutive study days
  "lastStudyDate": "2024-01-15",  // YYYY-MM-DD or null
  "points": 120                   // total gamification points
}
```

### Exported Functions

#### User Session
| Function | Returns | Description |
|----------|---------|-------------|
| `getCurrentUser()` | `string \| null` | Gets the logged-in username |
| `setCurrentUser(user)` | `void` | Sets or clears the current user |

#### User Registry
| Function | Returns | Description |
|----------|---------|-------------|
| `getUsers()` | `object` | Gets all registered users |
| `saveUsers(users)` | `void` | Saves the user registry |

#### User Data
| Function | Returns | Description |
|----------|---------|-------------|
| `getUserData(username)` | `object` | Gets per-user data (with defaults if missing) |
| `saveUserData(username, data)` | `void` | Saves per-user data |

#### Admin Auth
| Function | Returns | Description |
|----------|---------|-------------|
| `adminLogin(username, password)` | `boolean` | Validates admin credentials (hardcoded) |
| `isAdminLoggedIn()` | `boolean` | Checks sessionStorage for admin flag |
| `adminLogout()` | `void` | Removes admin flag from sessionStorage |

#### Admin Operations
| Function | Returns | Description |
|----------|---------|-------------|
| `getAllUserStats()` | `array` | Aggregated stats for all users |
| `deleteUser(username)` | `void` | Removes user from registry and their data |
| `resetUserData(username)` | `void` | Resets user data to empty defaults |

### Admin Credentials

The admin credentials are hardcoded in `storage.js`:
- Username: `admin`
- Password: `123456789!`

Admin auth uses `sessionStorage` (not `localStorage`), so the admin session is cleared when the browser tab is closed.

---

## 3. Lesson Generator

**File:** `src/utils/lessonGenerator.js`

### Exported Functions

#### `generateLesson(topicName, wordCount = 15)`

Creates a new lesson from a vocabulary topic.

**Parameters:**
- `topicName` (string) -- topic name to match (case-insensitive)
- `wordCount` (number, default 15) -- max words to include

**Returns:** A lesson object or `null` if topic not found.

**Algorithm:**
1. Finds the topic in `VOCABULARY_DATABASE` (case-insensitive match).
2. Shuffles the topic's words using Fisher-Yates shuffle.
3. Takes up to `wordCount` words.
4. For each word, generates 2 quiz questions via `generateQuestions()`.
5. Creates a lesson object with a unique ID (`lesson_{timestamp}_{random}`).

#### `generateQuestions(word, allWords)`

Generates quiz questions for a single word.

**Returns:** An array of 2 question objects:

1. **Multiple Choice:**
   - Question: "What does '{word}' mean?"
   - 4 options: correct meaning + 3 random meanings from other words
   - Options are shuffled

2. **Fill-in-the-Blank:**
   - Question: "Fill in the blank: {example with word replaced by ______}"
   - Answer: the word (compared case-insensitively during quiz)

#### `getAvailableTopics()`

Returns an array of topic name strings from the vocabulary database.

#### `getTodayDateString()`

Returns today's date as a `YYYY-MM-DD` string.

### Quiz Question Schema

```js
// Multiple Choice
{
  type: "multiple_choice",
  question: "What does 'passport' mean?",
  options: ["ho chieu", "hanh ly", "diem den", "lich trinh"],  // shuffled
  answer: "ho chieu"
}

// Fill-in-the-Blank
{
  type: "fill_in_blank",
  question: "Fill in the blank: Don't forget to bring your ______.",
  answer: "passport"
}
```
