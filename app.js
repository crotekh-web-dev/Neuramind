// app.js — neuramind v1 quiz logic (patched, full file)
// Include in your HTML with: <script type="module" src="app.js"></script>

import { QUESTIONS } from './questions.js';
import { calculateResults, renderResults, wireResultsActions } from './results.js';

const els = {
  // Screens
  welcomeScreen: document.getElementById('welcome-screen'),
  quizScreen: document.getElementById('quiz-screen'),
  resultsScreen: document.getElementById('results-screen'),

  // Welcome / Setup form
  setupForm: document.getElementById('setup-form'),
  playerNameInput: document.getElementById('player-name'),
  difficultySelect: document.getElementById('difficulty-select'),
  questionCountSelect: document.getElementById('question-count-select'),
  startBtn: document.getElementById('start-quiz-btn'),

  // Quiz UI
  quizHeading: document.getElementById('quiz-heading'),
  scoreValue: document.getElementById('score-value'),
  currentQuestionEl: document.getElementById('current-question'),
  totalQuestionsEl: document.getElementById('total-questions'),
  quizProgress: document.getElementById('quiz-progress'),
  questionCard: document.getElementById('question-card'),
  questionText: document.getElementById('question-text'),
  answersList: document.getElementById('answers-list'),
  answerButtons: [
    document.getElementById('answer-1'),
    document.getElementById('answer-2'),
    document.getElementById('answer-3'),
    document.getElementById('answer-4')
  ],
  prevBtn: document.getElementById('prev-btn'),
  nextBtn: document.getElementById('next-btn'),

  // Results UI (elements remain in DOM; rendering delegated to results.js)
  resultPlayerName: document.getElementById('result-player-name'),
  finalScoreEl: document.getElementById('final-score'),
  percentageEl: document.getElementById('percentage'),
  gradeEl: document.getElementById('grade'),
  correctAnswersEl: document.getElementById('correct-answers'),
  wrongAnswersEl: document.getElementById('wrong-answers'),
  playAgainBtn: document.getElementById('play-again-btn'),
  backHomeBtn: document.getElementById('back-home-btn'),
};

// Quiz runtime state
const state = {
  playerName: '',
  difficulty: '',
  questionCount: 0,
  pool: [],          // filtered questions chosen for this quiz
  currentIndex: 0,   // 0-based
  answers: [],       // user's selected answers by index: { questionId, selectedIndex (0-3) | null }
};

function normalizeDifficulty(value) {
  if (!value) return value;
  const v = value.trim().toLowerCase();
  if (v === 'easy') return 'Easy';
  if (v === 'medium') return 'Medium';
  if (v === 'hard') return 'Hard';
  return value;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function showScreen(screenToShow) {
  const screens = [els.welcomeScreen, els.quizScreen, els.resultsScreen];
  screens.forEach(s => {
    if (!s) return;
    const showing = s === screenToShow;
    s.hidden = !showing;
    s.setAttribute('aria-hidden', (!showing).toString());
    if (showing) s.classList.add('screen--active'); else s.classList.remove('screen--active');
  });
}

function init() {
  // Attach handlers
  if (els.setupForm) els.setupForm.addEventListener('submit', handleStart);
  els.answerButtons.forEach((btn, idx) => {
    if (!btn) return;
    btn.addEventListener('click', () => handleAnswerSelect(idx));
  });
  if (els.prevBtn) els.prevBtn.addEventListener('click', handlePrev);
  if (els.nextBtn) els.nextBtn.addEventListener('click', handleNext);

  // Wire results actions using the results module helpers
  wireResultsActions(handlePlayAgain, handleBackHome);

  // Start with welcome visible
  showScreen(els.welcomeScreen);
  updateProgressUI();
}

function handleStart(event) {
  event.preventDefault();
  const playerName = (els.playerNameInput?.value || '').trim() || 'Player';
  const difficultyRaw = els.difficultySelect?.value || 'medium';
  const difficulty = normalizeDifficulty(difficultyRaw);
  const questionCount = parseInt(els.questionCountSelect?.value, 10) || 10;

  // Prepare pool: filter by difficulty
  let pool = QUESTIONS.filter(q => (q.difficulty || '').toLowerCase() === difficulty.toLowerCase());
  if (pool.length < questionCount) {
    console.warn(`Not enough questions in difficulty ${difficulty}, using mixed pool.`);
    pool = [...QUESTIONS];
  }

  // Shuffle and pick
  shuffle(pool);
  pool = pool.slice(0, questionCount);

  // Initialize state
  state.playerName = playerName;
  state.difficulty = difficulty;
  state.questionCount = pool.length;
  state.pool = pool;
  state.currentIndex = 0;
  state.answers = pool.map(q => ({ questionId: q.id, selectedIndex: null }));

  // Prepare UI
  els.totalQuestionsEl.textContent = String(state.questionCount);
  els.currentQuestionEl.textContent = '1';
  els.scoreValue.textContent = '0';
  updateProgressUI();
  renderQuestion();

  // Show quiz screen
  showScreen(els.quizScreen);
  els.answerButtons[0]?.focus();
}

function renderQuestion() {
  const q = state.pool[state.currentIndex];
  if (!q) return;
  els.questionText.textContent = q.question || '—';

  const options = Array.isArray(q.options) ? q.options : [];
  for (let i = 0; i < 4; i++) {
    const btn = els.answerButtons[i];
    const optionText = options[i] ?? '';
    if (!btn) continue;
    btn.textContent = optionText;
    btn.dataset.optionIndex = String(i);
    btn.dataset.optionValue = optionText;
    btn.setAttribute('aria-pressed', 'false');
    btn.classList.remove('selected');
  }

  // Restore previous selection if any
  const previous = state.answers[state.currentIndex];
  if (previous && previous.selectedIndex !== null) {
    const idx = previous.selectedIndex;
    const btn = els.answerButtons[idx];
    if (btn) {
      btn.setAttribute('aria-pressed', 'true');
      btn.classList.add('selected');
    }
  }

  // Update nav buttons state
  els.prevBtn.disabled = state.currentIndex === 0;
  els.prevBtn.setAttribute('aria-disabled', String(state.currentIndex === 0));
  const isLast = state.currentIndex === state.questionCount - 1;
  els.nextBtn.textContent = isLast ? 'Finish' : 'Next';

  // Update question number and progress
  els.currentQuestionEl.textContent = String(state.currentIndex + 1);
  updateProgressUI();
}

function handleAnswerSelect(optionIndex) {
  const current = state.answers[state.currentIndex];
  if (!current) return;
  current.selectedIndex = optionIndex;

  // Update button aria-pressed states (only one pressed)
  els.answerButtons.forEach((btn, idx) => {
    if (!btn) return;
    const pressed = idx === optionIndex;
    btn.setAttribute('aria-pressed', String(pressed));
    if (pressed) btn.classList.add('selected'); else btn.classList.remove('selected');
  });

  // Update answered count display (still hiding correctness)
  const answeredCount = state.answers.reduce((acc, a) => acc + (a.selectedIndex !== null ? 1 : 0), 0);
  els.scoreValue.textContent = String(answeredCount);
}

function handlePrev() {
  if (state.currentIndex <= 0) return;
  state.currentIndex -= 1;
  renderQuestion();
}

function handleNext() {
  if (state.currentIndex >= state.questionCount - 1) {
    finishQuiz();
    return;
  }
  state.currentIndex += 1;
  renderQuestion();
}

function updateProgressUI() {
  const current = state.currentIndex + 1;
  const total = state.questionCount || 0;
  const pct = total === 0 ? 0 : Math.round((current - 1) / total * 100);
  if (els.quizProgress) {
    els.quizProgress.value = pct;
    els.quizProgress.setAttribute('aria-valuenow', String(pct));
  }
  if (els.totalQuestionsEl) els.totalQuestionsEl.textContent = String(total);
  if (els.currentQuestionEl) els.currentQuestionEl.textContent = String(Math.min(current, total || 0));
}

function finishQuiz() {
  // Use results module to compute and render results
  const results = calculateResults(state.pool, state.answers);
  renderResults(results, state.playerName);

  // Show results screen
  showScreen(els.resultsScreen);
  els.playAgainBtn?.focus();
}

// Play Again: regenerate a fresh pool using same difficulty and count, reset answers, and start quiz
function handlePlayAgain() {
  const difficulty = state.difficulty;
  const desiredCount = state.questionCount || parseInt(els.questionCountSelect?.value, 10) || 10;

  let pool = QUESTIONS.filter(q => (q.difficulty || '').toLowerCase() === (difficulty || '').toLowerCase());
  if (pool.length < desiredCount) pool = [...QUESTIONS];
  shuffle(pool);
  pool = pool.slice(0, desiredCount);

  state.pool = pool;
  state.questionCount = pool.length; // ensure questionCount is updated
  state.currentIndex = 0;
  state.answers = pool.map(q => ({ questionId: q.id, selectedIndex: null }));

  els.totalQuestionsEl.textContent = String(state.questionCount);
  els.currentQuestionEl.textContent = '1';
  els.scoreValue.textContent = '0';
  updateProgressUI();
  renderQuestion();
  showScreen(els.quizScreen);
}

// Back Home: reset quiz state and return to welcome screen
function handleBackHome() {
  state.playerName = '';
  state.difficulty = '';
  state.questionCount = 0;
  state.pool = [];
  state.currentIndex = 0;
  state.answers = [];

  if (els.setupForm) els.setupForm.reset();

  els.scoreValue.textContent = '0';
  els.currentQuestionEl.textContent = '0';
  els.totalQuestionsEl.textContent = '0';
  if (els.quizProgress) { els.quizProgress.value = 0; els.quizProgress.setAttribute('aria-valuenow', '0'); }

  showScreen(els.welcomeScreen);
  els.playerNameInput?.focus();
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
