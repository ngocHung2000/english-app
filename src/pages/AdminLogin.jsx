import { useState } from 'react'
import { adminLogin } from '../utils/storage.js'

export default function AdminLogin({ onAdminLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!username.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }
    if (adminLogin(username, password)) {
      onAdminLogin();
    } else {
      setError('Invalid admin credentials');
    }
  };

  return (
    <div className="page fade-in" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '100vh', padding: '32px 16px' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ fontSize: '64px', marginBottom: '12px' }}>⚙️</div>
        <h1 style={{ fontSize: '28px', fontWeight: '700' }}>Admin Panel</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Sign in to manage users</p>
      </div>
      <div className="card">
        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Admin Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '12px' }}>
            <input
              className="input-field"
              type="text"
              placeholder="Admin username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <input
              className="input-field"
              type="password"
              placeholder="Admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          {error && <p style={{ color: 'var(--danger)', fontSize: '14px', marginBottom: '12px' }}>{error}</p>}
          <button type="submit" className="btn btn-primary">Sign In</button>
        </form>
      </div>
    </div>
  );
}
