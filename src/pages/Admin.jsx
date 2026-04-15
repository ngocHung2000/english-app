import { useState } from 'react'
import { getAllUserStats, deleteUser, resetUserData, adminLogout } from '../utils/storage.js'

export default function Admin({ onAdminLogout }) {
  const [stats, setStats] = useState(getAllUserStats());
  const [confirmAction, setConfirmAction] = useState(null);
  const [search, setSearch] = useState('');

  const refresh = () => setStats(getAllUserStats());

  const handleReset = (username) => {
    resetUserData(username);
    refresh();
    setConfirmAction(null);
  };

  const handleDelete = (username) => {
    deleteUser(username);
    refresh();
    setConfirmAction(null);
  };

  const handleLogout = () => {
    adminLogout();
    onAdminLogout();
  };

  const filteredStats = stats.filter(s =>
    s.username.toLowerCase().includes(search.toLowerCase())
  );

  const totalUsers = stats.length;
  const totalWordsAll = stats.reduce((sum, s) => sum + s.totalWords, 0);
  const totalQuizzesAll = stats.reduce((sum, s) => sum + s.totalQuizzes, 0);
  const activeToday = stats.filter(s => {
    if (!s.lastStudyDate) return false;
    const today = new Date().toISOString().split('T')[0];
    return s.lastStudyDate === today;
  }).length;

  return (
    <div className="admin-layout">
      <div className="admin-header">
        <h1 style={{ fontSize: '20px', fontWeight: '700' }}>⚙️ Admin Dashboard</h1>
        <button className="btn-sm btn-sm-danger" onClick={handleLogout}>Sign Out</button>
      </div>

      <div className="admin-content">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{totalUsers}</div>
            <div className="stat-label">Total Users</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{activeToday}</div>
            <div className="stat-label">Active Today</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{totalWordsAll}</div>
            <div className="stat-label">Words Learned</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{totalQuizzesAll}</div>
            <div className="stat-label">Total Quizzes</div>
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600' }}>User Management</h3>
            <span className="badge badge-primary">{filteredStats.length} users</span>
          </div>
          <input
            className="input-field"
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ marginBottom: '16px' }}
          />
          {filteredStats.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', textAlign: 'center', padding: '20px 0' }}>
              No users found.
            </p>
          ) : (
            filteredStats.map((userStat) => (
              <div key={userStat.username} className="admin-user-row">
                <div className="admin-user-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div className="admin-avatar">
                      {userStat.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '15px' }}>
                        {userStat.username}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                        Joined {userStat.createdAt ? new Date(userStat.createdAt).toLocaleDateString() : 'Unknown'}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="admin-user-stats">
                  <div className="admin-mini-stat">
                    <span className="admin-mini-value">🔥 {userStat.streak}</span>
                    <span className="admin-mini-label">Streak</span>
                  </div>
                  <div className="admin-mini-stat">
                    <span className="admin-mini-value">{userStat.points}</span>
                    <span className="admin-mini-label">Points</span>
                  </div>
                  <div className="admin-mini-stat">
                    <span className="admin-mini-value">{userStat.totalWords}</span>
                    <span className="admin-mini-label">Words</span>
                  </div>
                  <div className="admin-mini-stat">
                    <span className="admin-mini-value">{userStat.avgScore}%</span>
                    <span className="admin-mini-label">Avg Score</span>
                  </div>
                </div>

                {confirmAction?.username === userStat.username ? (
                  <div className="admin-confirm">
                    <p style={{ fontSize: '13px', fontWeight: '600', marginBottom: '8px' }}>
                      {confirmAction.type === 'delete'
                        ? 'Delete ' + userStat.username + '? This cannot be undone.'
                        : 'Reset all data for ' + userStat.username + '?'}
                    </p>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        className="btn-sm btn-sm-danger"
                        onClick={() => {
                          if (confirmAction.type === 'delete') handleDelete(userStat.username);
                          if (confirmAction.type === 'reset') handleReset(userStat.username);
                        }}
                      >
                        Confirm
                      </button>
                      <button className="btn-sm btn-sm-secondary" onClick={() => setConfirmAction(null)}>
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="admin-actions">
                    <button
                      className="btn-sm btn-sm-secondary"
                      onClick={() => setConfirmAction({ username: userStat.username, type: 'reset' })}
                    >
                      Reset Data
                    </button>
                    <button
                      className="btn-sm btn-sm-danger"
                      onClick={() => setConfirmAction({ username: userStat.username, type: 'delete' })}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
