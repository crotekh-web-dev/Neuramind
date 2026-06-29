// results.js
// Functions to calculate and render quiz results and wire results-screen actions.

/**
 * Calculate quiz results.
 * @param {Array} pool - Array of question objects used in the quiz. Each must include `options` and `correctAnswer`.
 * @param {Array} answers - Array of answer records in the same order as pool:
 *                          [{ questionId, selectedIndex (0-3) | null }, ...]
 * @returns {Object} - { total, correct, wrong, percentage, grade }
 */
export function calculateResults(pool = [], answers = []) {
  const total = pool.length;
  let correct = 0;
  let wrong = 0;

  for (let i = 0; i < total; i++) {
    const q = pool[i];
    const ans = answers[i];
    if (ans && typeof ans.selectedIndex === 'number' && ans.selectedIndex !== null) {
      const selected = (q.options && q.options[ans.selectedIndex]) ?? null;
      if (selected !== null && selected === q.correctAnswer) {
        correct += 1;
      } else {
        wrong += 1;
      }
    } else {
      // unanswered counts as wrong
      wrong += 1;
    }
  }

  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
  const grade = gradeFromPercentage(percentage);

  return { total, correct, wrong, percentage, grade };
}

/**
 * Convert percentage to letter grade (A - F).
 * Thresholds:
 *   A: >= 90
 *   B: >= 75
 *   C: >= 50
 *   D: >= 25
 *   F: < 25
 * @param {number} pct
 * @returns {string} letter grade
 */
export function gradeFromPercentage(pct) {
  if (pct >= 90) return 'A';
  if (pct >= 75) return 'B';
  if (pct >= 50) return 'C';
  if (pct >= 25) return 'D';
  return 'F';
}

/**
 * Render results into the Results Screen DOM elements.
 * Assumes the following element IDs exist in the page:
 *  - result-player-name
 *  - final-score
 *  - percentage
 *  - grade
 *  - correct-answers
 *  - wrong-answers
 *
 * @param {Object} results - output of calculateResults
 * @param {string} playerName - player's display name
 */
export function renderResults(results = {}, playerName = 'Player') {
  const {
    total = 0,
    correct = 0,
    wrong = 0,
    percentage = 0,
    grade = 'N/A'
  } = results;

  const elPlayer = document.getElementById('result-player-name');
  const elFinal = document.getElementById('final-score');
  const elPct = document.getElementById('percentage');
  const elGrade = document.getElementById('grade');
  const elCorrect = document.getElementById('correct-answers');
  const elWrong = document.getElementById('wrong-answers');

  if (elPlayer) elPlayer.textContent = String(playerName || 'Player');
  if (elFinal) elFinal.textContent = `${correct} / ${total}`;
  if (elPct) elPct.textContent = `${percentage}%`;
  if (elGrade) elGrade.textContent = String(grade);
  if (elCorrect) elCorrect.textContent = String(correct);
  if (elWrong) elWrong.textContent = String(wrong);

  // Move keyboard focus to the primary control on results screen if available
  const playAgainBtn = document.getElementById('play-again-btn');
  if (playAgainBtn) playAgainBtn.focus();
}

/**
 * Wire the Play Again and Back Home buttons to provided callbacks.
 * The callbacks receive no arguments and should handle resetting state / navigation.
 *
 * @param {Function} onPlayAgain - invoked when Play Again is clicked
 * @param {Function} onBackHome - invoked when Back Home is clicked
 */
export function wireResultsActions(onPlayAgain, onBackHome) {
  const playAgainBtn = document.getElementById('play-again-btn');
  const backHomeBtn = document.getElementById('back-home-btn');

  if (playAgainBtn) {
    // Clean previous handler if present
    if (playAgainBtn.__playAgainHandler) {
      playAgainBtn.removeEventListener('click', playAgainBtn.__playAgainHandler);
      playAgainBtn.__playAgainHandler = null;
    }
    const handler = (e) => { e.preventDefault(); if (typeof onPlayAgain === 'function') onPlayAgain(); };
    playAgainBtn.__playAgainHandler = handler;
    playAgainBtn.addEventListener('click', handler);
  }

  if (backHomeBtn) {
    if (backHomeBtn.__backHomeHandler) {
      backHomeBtn.removeEventListener('click', backHomeBtn.__backHomeHandler);
      backHomeBtn.__backHomeHandler = null;
    }
    const handler = (e) => { e.preventDefault(); if (typeof onBackHome === 'function') onBackHome(); };
    backHomeBtn.__backHomeHandler = handler;
    backHomeBtn.addEventListener('click', handler);
  }
    }
