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

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = '123456789!';

export function adminLogin(username, password) {
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    try { sessionStorage.setItem('english_app_admin', 'true'); } catch {}
    return true;
  }
  return false;
}

export function isAdminLoggedIn() {
  try { return sessionStorage.getItem('english_app_admin') === 'true'; } catch { return false; }
}

export function adminLogout() {
  try { sessionStorage.removeItem('english_app_admin'); } catch {}
}

export function getAllUserStats() {
  const users = getUsers();
  return Object.keys(users).map(username => {
    const userData = getUserData(username);
    const totalWords = userData.lessons.reduce((sum, l) => sum + l.words.length, 0);
    const totalQuizzes = (userData.quizResults || []).length;
    const avgScore = totalQuizzes > 0
      ? Math.round(userData.quizResults.reduce((sum, q) => sum + q.score, 0) / totalQuizzes)
      : 0;
    return {
      username,
      createdAt: users[username].createdAt,
      streak: userData.streak || 0,
      points: userData.points || 0,
      totalWords,
      totalQuizzes,
      avgScore,
      lastStudyDate: userData.lastStudyDate,
    };
  });
}

export function deleteUser(username) {
  const users = getUsers();
  delete users[username];
  saveUsers(users);
  storage.remove('user_' + username);
}

export function resetUserData(username) {
  storage.set('user_' + username, { lessons: [], quizResults: [], streak: 0, lastStudyDate: null, points: 0 });
}
