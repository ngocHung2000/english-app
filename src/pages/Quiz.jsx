import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getUserData, saveUserData } from '../utils/storage.js'

export default function Quiz({ user }) {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const userData = getUserData(user);
  const lesson = userData.lessons.find(l => l.id === lessonId);

  const allQuestions = lesson ? lesson.words.flatMap(w =>
    w.questions.map(q => ({ ...q, forWord: w.word }))
  ) : [];

  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [fillAnswer, setFillAnswer] = useState('');

  if (!lesson) {
    return (
      <div className="page fade-in">
        <h1 className="page-title">Quiz not found</h1>
        <button className="btn btn-primary" onClick={() => navigate('/')}>Go Home</button>
      </div>
    );
  }

  const question = allQuestions[currentQ];
  const progress = ((currentQ + 1) / allQuestions.length) * 100;

  const submitAnswer = (answer) => {
    const isCorrect = answer.toLowerCase().trim() === question.answer.toLowerCase().trim();
    setSelectedAnswer(answer);
    setShowResult(true);
    setAnswers([...answers, { question: question.question, answer, correct: question.answer, isCorrect, forWord: question.forWord }]);
  };

  const nextQuestion = () => {
    if (currentQ < allQuestions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setFillAnswer('');
    } else {
      const newAnswers = [...answers];
      const correctCount = newAnswers.filter(a => a.isCorrect).length;
      const score = Math.round((correctCount / allQuestions.length) * 100);
      const quizResult = {
        lessonId,
        topic: lesson.topic,
        date: new Date().toISOString(),
        score,
        total: allQuestions.length,
        correct: correctCount,
        answers: newAnswers
      };
      const data = getUserData(user);
      if (!data.quizResults) data.quizResults = [];
      data.quizResults.push(quizResult);
      data.points = (data.points || 0) + correctCount * 10;
      saveUserData(user, data);
      navigate('/result/' + lessonId);
    }
  };

  return (
    <div className="page fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: '700' }}>Quiz: {lesson.topic}</h1>
        <span className="badge badge-primary">{currentQ + 1}/{allQuestions.length}</span>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <div className="progress-bar">
          <div className="progress-bar-fill" style={{ width: progress + '%' }} />
        </div>
      </div>

      <div className="card fade-in" key={currentQ}>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
          {question.type === 'multiple_choice' ? 'Multiple Choice' : 'Fill in the Blank'}
        </p>
        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', lineHeight: '1.5' }}>
          {question.question}
        </h3>

        {question.type === 'multiple_choice' ? (
          <div>
            {question.options.map((opt, idx) => {
              let cls = 'quiz-option';
              if (showResult) {
                if (opt === question.answer) cls += ' correct';
                else if (opt === selectedAnswer) cls += ' wrong';
              } else if (opt === selectedAnswer) {
                cls += ' selected';
              }
              return (
                <button
                  key={idx}
                  className={cls}
                  onClick={() => !showResult && submitAnswer(opt)}
                  disabled={showResult}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        ) : (
          <div>
            <input
              className="input-field"
              type="text"
              placeholder="Type your answer..."
              value={fillAnswer}
              onChange={(e) => setFillAnswer(e.target.value)}
              disabled={showResult}
              onKeyDown={(e) => e.key === 'Enter' && !showResult && fillAnswer.trim() && submitAnswer(fillAnswer)}
              style={{ marginBottom: '12px' }}
            />
            {!showResult && (
              <button
                className="btn btn-primary"
                onClick={() => fillAnswer.trim() && submitAnswer(fillAnswer)}
                disabled={!fillAnswer.trim()}
              >
                Check
              </button>
            )}
            {showResult && (
              <p style={{ fontSize: '14px', marginTop: '8px' }}>
                {selectedAnswer.toLowerCase().trim() === question.answer.toLowerCase().trim()
                  ? '✅ Correct!'
                  : '❌ Wrong! Answer: ' + question.answer}
              </p>
            )}
          </div>
        )}
      </div>

      {showResult && (
        <button className="btn btn-primary" onClick={nextQuestion} style={{ marginTop: '12px' }}>
          {currentQ < allQuestions.length - 1 ? 'Next Question' : 'See Results'}
        </button>
      )}
    </div>
  );
}
