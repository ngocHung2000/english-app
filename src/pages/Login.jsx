import { useState } from 'react'
import { getUsers, saveUsers } from '../utils/storage.js'

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!username.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }
    const users = getUsers();
    if (isSignup) {
      if (users[username]) {
        setError('Username already exists');
        return;
      }
      users[username] = { password, createdAt: new Date().toISOString() };
      saveUsers(users);
      onLogin(username);
    } else {
      if (!users[username] || users[username].password !== password) {
        setError('Invalid username or password');
        return;
      }
      onLogin(username);
    }
  };

  return (
    <div className="page fade-in" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '100vh', padding: '32px 16px' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ fontSize: '64px', marginBottom: '12px' }}>📚</div>
        <h1 style={{ fontSize: '28px', fontWeight: '700' }}>English Vocab</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Learn 10-20 words daily</p>
      </div>
      <div className="card">
        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>
          {isSignup ? 'Create Account' : 'Sign In'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '12px' }}>
            <input
              className="input-field"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <input
              className="input-field"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={isSignup ? 'new-password' : 'current-password'}
            />
          </div>
          {error && <p style={{ color: 'var(--danger)', fontSize: '14px', marginBottom: '12px' }}>{error}</p>}
          <button type="submit" className="btn btn-primary">
            {isSignup ? 'Sign Up' : 'Sign In'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '14px', color: 'var(--text-secondary)' }}>
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => { setIsSignup(!isSignup); setError(''); }}
            style={{ color: 'var(--primary)', fontWeight: '600', background: 'none', border: 'none', padding: 0 }}
          >
            {isSignup ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
}
