const STORAGE_PREFIX = 'english_app_';

export const storage = {
  get(key) {
    try {
      const val = localStorage.getItem(STORAGE_PREFIX + key);
      return val ? JSON.parse(val) : null;
    } catch { return null; }
  },
  set(key, value) {
    try { localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value)); } catch {}
  },
  remove(key) {
    try { localStorage.removeItem(STORAGE_PREFIX + key); } catch {}
  }
};

export function getCurrentUser() {
  return storage.get('current_user');
}

export function setCurrentUser(user) {
  storage.set('current_user', user);
}

export function getUsers() {
  return storage.get('users') || {};
}

export function saveUsers(users) {
  storage.set('users', users);
}

export function getUserData(username) {
  const data = storage.get(`user_${username}`);
  return data || { lessons: [], quizResults: [], streak: 0, lastStudyDate: null, points: 0 };
}

export function saveUserData(username, data) {
  storage.set(`user_${username}`, data);
}
