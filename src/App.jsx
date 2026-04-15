import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { getCurrentUser, setCurrentUser, isAdminLoggedIn } from './utils/storage.js'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import Lesson from './pages/Lesson.jsx'
import Quiz from './pages/Quiz.jsx'
import Result from './pages/Result.jsx'
import Review from './pages/Review.jsx'
import Profile from './pages/Profile.jsx'
import Admin from './pages/Admin.jsx'
import AdminLogin from './pages/AdminLogin.jsx'

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const p = location.pathname;

  return (
    <nav className="nav-bar">
      <button className={`nav-item ${p === '/' ? 'active' : ''}`} onClick={() => navigate('/')}>
        <span className="nav-icon">🏠</span>Home
      </button>
      <button className={`nav-item ${p === '/review' ? 'active' : ''}`} onClick={() => navigate('/review')}>
        <span className="nav-icon">📖</span>Review
      </button>
      <button className={`nav-item ${p === '/profile' ? 'active' : ''}`} onClick={() => navigate('/profile')}>
        <span className="nav-icon">👤</span>Profile
      </button>
    </nav>
  );
}

function AdminRoutes() {
  const [adminAuth, setAdminAuth] = useState(isAdminLoggedIn());
  const navigate = useNavigate();

  if (!adminAuth) {
    return <AdminLogin onAdminLogin={() => setAdminAuth(true)} />;
  }

  return (
    <Admin onAdminLogout={() => {
      setAdminAuth(false);
    }} />
  );
}

function UserApp({ user, onLogout }) {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/lesson/:lessonId" element={<Lesson user={user} />} />
        <Route path="/quiz/:lessonId" element={<Quiz user={user} />} />
        <Route path="/result/:lessonId" element={<Result user={user} />} />
        <Route path="/review" element={<Review user={user} />} />
        <Route path="/profile" element={<Profile user={user} onLogout={onLogout} />} />
      </Routes>
      <NavBar />
    </>
  );
}

export default function App() {
  const [user, setUser] = useState(getCurrentUser());
  const location = useLocation();

  const handleLogin = (username) => {
    setCurrentUser(username);
    setUser(username);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setUser(null);
  };

  if (location.pathname.startsWith('/admin')) {
    return <AdminRoutes />;
  }

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return <UserApp user={user} onLogout={handleLogout} />;
}
