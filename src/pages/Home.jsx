import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { generateLesson, getAvailableTopics, getTodayDateString } from '../utils/lessonGenerator.js'
import { getUserData, saveUserData } from '../utils/storage.js'

export default function Home({ user }) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(getUserData(user));
  const topics = getAvailableTopics();
  const today = getTodayDateString();

  const todayLesson = userData.lessons.find(l => l.date === today);

  const updateStreak = (data) => {
    const todayStr = today;
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (data.lastStudyDate === yesterday) {
      data.streak = (data.streak || 0) + 1;
    } else if (data.lastStudyDate !== todayStr) {
      data.streak = 1;
    }
    data.lastStudyDate = todayStr;
    return data;
  };

  const startLesson = (topic) => {
    const lesson = generateLesson(topic);
    if (!lesson) return;
    let data = { ...userData };
    const existingIdx = data.lessons.findIndex(l => l.date === today);
    if (existingIdx >= 0) {
      data.lessons[existingIdx] = lesson;
    } else {
      data.lessons.push(lesson);
    }
    data = updateStreak(data);
    saveUserData(user, data);
    setUserData(data);
    navigate('/lesson/' + lesson.id);
  };

  const continueLesson = () => {
    if (todayLesson) navigate('/lesson/' + todayLesson.id);
  };

  const totalWords = userData.lessons.reduce((sum, l) => sum + l.words.length, 0);
  const totalQuizzes = userData.quizResults ? userData.quizResults.length : 0;

  return (
    <div className="page fade-in">
      <div style={{ marginBottom: '24px' }}>
        <h1 className="page-title">Hello, {user} 👋</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Ready to learn today?</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">🔥 {userData.streak || 0}</div>
          <div className="stat-label">Day Streak</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{totalWords}</div>
          <div className="stat-label">Words Learned</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{totalQuizzes}</div>
          <div className="stat-label">Quizzes Done</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{userData.points || 0}</div>
          <div className="stat-label">Points</div>
        </div>
      </div>

      {todayLesson ? (
        <div className="card" style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3>Today's Lesson</h3>
            <span className="badge badge-primary">{todayLesson.topic}</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '12px' }}>
            {todayLesson.words.length} words to learn
          </p>
          <button className="btn btn-primary" onClick={continueLesson}>
            Continue Lesson
          </button>
        </div>
      ) : null}

      <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>
        {todayLesson ? 'Start a new topic' : 'Choose a topic'}
      </h2>
      {topics.map(topic => (
        <div key={topic} className="topic-card" onClick={() => startLesson(topic)}>
          <h3>{topic}</h3>
          <p>15 vocabulary words with quizzes</p>
        </div>
      ))}
    </div>
  );
}
