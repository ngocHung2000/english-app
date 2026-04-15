import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getUserData } from '../utils/storage.js'

function speak(text) {
  if ('speechSynthesis' in window) {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = 0.8;
    speechSynthesis.speak(u);
  }
}

export default function Lesson({ user }) {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [currentIdx, setCurrentIdx] = useState(0);

  const userData = getUserData(user);
  const lesson = userData.lessons.find(l => l.id === lessonId);

  if (!lesson) {
    return (
      <div className="page fade-in">
        <h1 className="page-title">Lesson not found</h1>
        <button className="btn btn-primary" onClick={() => navigate('/')}>Go Home</button>
      </div>
    );
  }

  const word = lesson.words[currentIdx];
  const progress = ((currentIdx + 1) / lesson.words.length) * 100;

  return (
    <div className="page fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <button className="btn btn-secondary" style={{ width: 'auto', padding: '8px 16px' }} onClick={() => navigate('/')}>
          ← Back
        </button>
        <span className="badge badge-primary">{lesson.topic}</span>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
          <span>Word {currentIdx + 1} of {lesson.words.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-bar-fill" style={{ width: progress + '%' }} />
        </div>
      </div>

      <div className="word-card fade-in" key={currentIdx}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="word-title">{word.word}</span>
          <button className="tts-btn" onClick={() => speak(word.word)} title="Listen">🔊</button>
        </div>
        <div className="word-ipa">{word.ipa}</div>
        <div className="word-meaning">🇻🇳 {word.meaning}</div>
        <div className="word-example">💬 "{word.example}"</div>
        <button
          style={{ marginTop: '8px', background: 'none', border: 'none', color: 'var(--primary)', fontSize: '13px', padding: 0, cursor: 'pointer' }}
          onClick={() => speak(word.example)}
        >
          🔊 Listen to example
        </button>
      </div>

      <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
        <button
          className="btn btn-secondary"
          disabled={currentIdx === 0}
          onClick={() => setCurrentIdx(i => i - 1)}
        >
          Previous
        </button>
        {currentIdx < lesson.words.length - 1 ? (
          <button className="btn btn-primary" onClick={() => setCurrentIdx(i => i + 1)}>
            Next
          </button>
        ) : (
          <button className="btn btn-success" onClick={() => navigate('/quiz/' + lesson.id)}>
            Start Quiz →
          </button>
        )}
      </div>
    </div>
  );
}
