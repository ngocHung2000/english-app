import { useParams, useNavigate } from 'react-router-dom'
import { getUserData } from '../utils/storage.js'

export default function Result({ user }) {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const userData = getUserData(user);

  const quizResults = userData.quizResults || [];
  const result = [...quizResults].reverse().find(r => r.lessonId === lessonId);

  if (!result) {
    return (
      <div className="page fade-in">
        <h1 className="page-title">No results found</h1>
        <button className="btn btn-primary" onClick={() => navigate('/')}>Go Home</button>
      </div>
    );
  }

  const emoji = result.score >= 80 ? '🎉' : result.score >= 50 ? '💪' : '📚';
  const message = result.score >= 80 ? 'Excellent!' : result.score >= 50 ? 'Good effort!' : 'Keep practicing!';

  return (
    <div className="page fade-in">
      <div style={{ textAlign: 'center', padding: '32px 0' }}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>{emoji}</div>
        <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>{message}</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
          Topic: {result.topic}
        </p>

        <div style={{ fontSize: '48px', fontWeight: '700', color: result.score >= 50 ? 'var(--success)' : 'var(--danger)' }}>
          {result.score}%
        </div>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
          {result.correct} / {result.total} correct
        </p>
        <p style={{ color: 'var(--primary)', fontWeight: '600', marginTop: '4px' }}>
          +{result.correct * 10} points
        </p>
      </div>

      <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>Review Answers</h2>
      {result.answers.map((a, idx) => (
        <div key={idx} className="card" style={{
          borderLeft: '4px solid ' + (a.isCorrect ? 'var(--success)' : 'var(--danger)'),
          padding: '12px 16px'
        }}>
          <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>
            {a.isCorrect ? '✅' : '❌'} {a.forWord}
          </p>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Your answer: {a.answer}
          </p>
          {!a.isCorrect && (
            <p style={{ fontSize: '13px', color: 'var(--success)' }}>
              Correct: {a.correct}
            </p>
          )}
        </div>
      ))}

      <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
        <button className="btn btn-secondary" onClick={() => navigate('/quiz/' + lessonId)}>
          Retry Quiz
        </button>
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          Home
        </button>
      </div>
    </div>
  );
}
