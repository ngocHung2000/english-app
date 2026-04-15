import VOCABULARY_DATABASE from '../data/vocabulary.js';

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateQuestions(word, allWords) {
  const questions = [];
  const otherWords = allWords.filter(w => w.word !== word.word);
  const distractors = shuffleArray(otherWords).slice(0, 3).map(w => w.meaning);
  const mcOptions = shuffleArray([word.meaning, ...distractors]);

  questions.push({
    type: 'multiple_choice',
    question: `What does '${word.word}' mean?`,
    options: mcOptions,
    answer: word.meaning
  });

  const sentence = word.example.replace(new RegExp(word.word, 'gi'), '______');
  questions.push({
    type: 'fill_in_blank',
    question: `Fill in the blank: ${sentence}`,
    answer: word.word.toLowerCase()
  });

  return questions;
}

export function generateLesson(topicName, wordCount = 15) {
  const topicData = VOCABULARY_DATABASE.find(
    t => t.topic.toLowerCase() === topicName.toLowerCase()
  );
  if (!topicData) return null;

  const words = shuffleArray(topicData.words).slice(0, Math.min(wordCount, topicData.words.length));
  const wordsWithQuestions = words.map(w => ({
    ...w,
    questions: generateQuestions(w, topicData.words)
  }));

  return {
    id: `lesson_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    topic: topicData.topic,
    date: new Date().toISOString().split('T')[0],
    words: wordsWithQuestions,
    createdAt: new Date().toISOString()
  };
}

export function getAvailableTopics() {
  return VOCABULARY_DATABASE.map(t => t.topic);
}

export function getTodayDateString() {
  return new Date().toISOString().split('T')[0];
}
