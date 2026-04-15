import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUserData } from '../utils/storage.js'

function speak(text) {
  if ('speechSynthesis' in window) {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = 0.8;
    speechSynthesis.speak(u);
  }
}

export default function Review({ user }) {
  const navigate = useNavigate();
  const userData = getUserData(user);
  const lessons = [...(userData.lessons || [])].reverse();
  const [expandedLesson, setExpandedLesson] = useState(null);

  if (lessons.length === 0) {
    return (
      <div className="page fade-in">
        <h1 className="page-title">Review 📖</h1>
        <div className="card" style={{ textAlign: 'center', padding: '32px' }}>
          <p style={{ fontSize: '48px', marginBottom: '12px' }}>📭</p>
          <p style={{ color: 'var(--text-secondary)' }}>No lessons yet. Start learning!</p>
          <button className="btn btn-primary" style={{ marginTop: '16px' }} onClick={() => navigate('/')}>
            Start a Lesson
          </button>
        </div>
      </div>
    );
  }

  const quizResults = userData.quizResults || [];

  return (
    <div className="page fade-in">
      <h1 className="page-title">Review 📖</h1>
      {lessons.map(lesson => {
        const latestQuiz = [...quizResults].reverse().find(q => q.lessonId === lesson.id);
        const isExpanded = expandedLesson === lesson.id;
        return (
          <div key={lesson.id} className="card">
            <div
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
              onClick={() => setExpandedLesson(isExpanded ? null : lesson.id)}
            >
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '600' }}>{lesson.topic}</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  {lesson.date} • {lesson.words.length} words
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {latestQuiz && (
                  <span className={latestQuiz.score >= 50 ? 'badge badge-success' : 'badge badge-primary'}>
                    {latestQuiz.score}%
                  </span>
                )}
                <span style={{ fontSize: '18px' }}>{isExpanded ? '▲' : '▼'}</span>
              </div>
            </div>
            {isExpanded && (
              <div style={{ marginTop: '12px' }}>
                {lesson.words.map((w, idx) => (
                  <div key={idx} className="word-card" style={{ marginBottom: '8px', padding: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontWeight: '700', color: 'var(--primary-dark)' }}>{w.word}</span>
                      <button className="tts-btn" onClick={(e) => { e.stopPropagation(); speak(w.word); }} style={{ fontSize: '16px' }}>🔊</button>
                    </div>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{w.ipa}</span>
                    <div style={{ fontSize: '14px', fontWeight: '600', marginTop: '4px' }}>{w.meaning}</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)', fontStyle: 'italic', marginTop: '2px' }}>"{w.example}"</div>
                  </div>
                ))}
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                  <button className="btn btn-secondary" style={{ fontSize: '14px', padding: '8px 16px' }} onClick={() => navigate('/lesson/' + lesson.id)}>
                    Study Again
                  </button>
                  <button className="btn btn-primary" style={{ fontSize: '14px', padding: '8px 16px' }} onClick={() => navigate('/quiz/' + lesson.id)}>
                    Take Quiz
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
