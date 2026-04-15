import { getUserData } from '../utils/storage.js'

export default function Profile({ user, onLogout }) {
  const userData = getUserData(user);
  const totalWords = userData.lessons.reduce((sum, l) => sum + l.words.length, 0);
  const totalQuizzes = (userData.quizResults || []).length;
  const avgScore = totalQuizzes > 0
    ? Math.round(userData.quizResults.reduce((sum, q) => sum + q.score, 0) / totalQuizzes)
    : 0;

  return (
    <div className="page fade-in">
      <h1 className="page-title">Profile 👤</h1>

      <div className="card" style={{ textAlign: 'center', padding: '24px' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: '700', margin: '0 auto 12px' }}>
          {user.charAt(0).toUpperCase()}
        </div>
        <h2 style={{ fontSize: '20px', fontWeight: '700' }}>{user}</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>English Learner</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">🔥 {userData.streak || 0}</div>
          <div className="stat-label">Day Streak</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{userData.points || 0}</div>
          <div className="stat-label">Total Points</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{totalWords}</div>
          <div className="stat-label">Words Learned</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{avgScore}%</div>
          <div className="stat-label">Avg Quiz Score</div>
        </div>
      </div>

      <div className="card">
        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>Quiz History</h3>
        {totalQuizzes === 0 ? (
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>No quizzes taken yet.</p>
        ) : (
          [...(userData.quizResults || [])].reverse().slice(0, 10).map((q, idx) => (
            <div key={idx} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '10px 0', borderBottom: idx < 9 ? '1px solid var(--border)' : 'none'
            }}>
              <div>
                <span style={{ fontWeight: '600', fontSize: '14px' }}>{q.topic}</span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '12px', marginLeft: '8px' }}>
                  {new Date(q.date).toLocaleDateString()}
                </span>
              </div>
              <span className={q.score >= 50 ? 'badge badge-success' : 'badge badge-primary'}>
                {q.score}%
              </span>
            </div>
          ))
        )}
      </div>

      <button className="btn btn-danger" onClick={onLogout} style={{ marginTop: '12px' }}>
        Sign Out
      </button>
    </div>
  );
}
