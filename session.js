const curriculum = [
  {
    id: 1,
    topic: 'Support/Resistance',
    description: 'Identify major horizontal levels from recent swings.',
    prompt: 'Mark 2 support zones and 1 resistance zone on the visible chart window.',
    reveal: 'Price retested support twice, then broke resistance with momentum.',
    minScoreToUnlock: 50
  },
  {
    id: 2,
    topic: 'Trendlines & Channels',
    description: 'Connect swing highs/lows and define trend channels.',
    prompt: 'Draw the dominant trendline plus channel boundaries and label likely break points.',
    reveal: 'Price respected lower channel before breaking upward into trend continuation.',
    minScoreToUnlock: 55
  },
  {
    id: 3,
    topic: 'Moving Averages (SMA/EMA)',
    description: 'Use MA slope and cross structure for trend context.',
    prompt: 'Identify trend regime from 20/50 EMA alignment and classify pullback quality.',
    reveal: '20 EMA reclaimed above 50 EMA before continuation impulse.',
    minScoreToUnlock: 58
  },
  {
    id: 4,
    topic: 'ATR (Volatility Context)',
    description: 'Use ATR to judge realistic stop distance and target potential.',
    prompt: 'Choose a stop distance using ATR and justify if market is expanding/contracting.',
    reveal: 'Low ATR regime expanded; tight stops were swept before trend continuation.',
    minScoreToUnlock: 60
  },
  {
    id: 5,
    topic: 'RSI',
    description: 'Measure momentum extremes and midline trend support.',
    prompt: 'Classify RSI context (range, trend, divergence) and expected pullback behavior.',
    reveal: 'RSI held above 40 in uptrend and rotated higher after shallow pullback.',
    minScoreToUnlock: 62
  },
  {
    id: 6,
    topic: 'MACD',
    description: 'Interpret momentum shifts and divergence context.',
    prompt: 'Classify momentum state (bullish, bearish, neutral) and note divergence if present.',
    reveal: 'Bearish divergence appeared before a multi-candle pullback.',
    minScoreToUnlock: 65
  },
  {
    id: 7,
    topic: 'Volume & Volume Profile / VWAP',
    description: 'Use participation and fair-value anchors for trade location.',
    prompt: 'Mark high-volume nodes and evaluate price location relative to VWAP/anchored VWAP.',
    reveal: 'Rejection from high-volume node and VWAP loss led to session trend reversal.',
    minScoreToUnlock: 68
  },
  {
    id: 8,
    topic: 'Bollinger Bands',
    description: 'Frame volatility expansion, compression, and mean reversion.',
    prompt: 'Label squeeze vs expansion and identify whether setup favors breakout or reversion.',
    reveal: 'Band squeeze resolved with expansion move and sustained close outside upper band.',
    minScoreToUnlock: 70
  },
  {
    id: 9,
    topic: 'Fibonacci Retracements & Extensions',
    description: 'Map pullback zones and projected expansion targets.',
    prompt: 'Anchor swing low/high and identify 38.2%, 50%, 61.8%, plus 1.272 extension target.',
    reveal: 'Price wicked into 61.8% then rallied into 1.272 extension before stalling.',
    minScoreToUnlock: 72
  },
  {
    id: 10,
    topic: 'Pivot Points (PP, R1/R2, S1/S2)',
    description: 'Use daily/weekly pivots for intraday reaction areas.',
    prompt: 'Define PP, R1, S1 context and propose long/short bias with invalidation levels.',
    reveal: 'Initial rejection at R1 reversed into PP before continuation lower to S1.',
    minScoreToUnlock: 75
  },
  {
    id: 11,
    topic: 'Ichimoku Cloud',
    description: 'Evaluate structure, momentum, and support/resistance in one system.',
    prompt: 'Assess cloud bias, TK cross quality, and lagging-span confirmation.',
    reveal: 'Bullish TK cross above cloud signaled continuation after shallow retest.',
    minScoreToUnlock: 78
  },
  {
    id: 12,
    topic: 'Stochastic Oscillator + ADX',
    description: 'Separate range oscillation from trend-strength conditions.',
    prompt: 'Use stochastic state and ADX level to decide mean-reversion vs trend-following plan.',
    reveal: 'High ADX invalidated repeated stochastic oversold countertrend entries.',
    minScoreToUnlock: 80
  }
];

const state = JSON.parse(localStorage.getItem('trainerState') || 'null') || {
  current: 0,
  xp: 0,
  streak: 0,
  lastScore: null
};

const progress = document.getElementById('progress');
const sessionSummary = document.getElementById('sessionSummary');
const lessonCard = document.getElementById('lessonCard');
const lessonTitle = document.getElementById('lessonTitle');
const lessonDesc = document.getElementById('lessonDesc');
const lessonPrompt = document.getElementById('lessonPrompt');
const feedbackCard = document.getElementById('feedbackCard');
const feedbackText = document.getElementById('feedbackText');
const scoreText = document.getElementById('scoreText');
const revealText = document.getElementById('revealText');

function save() { localStorage.setItem('trainerState', JSON.stringify(state)); }

function renderProgress() {
  progress.innerHTML = curriculum.map((c, idx) => {
    const unlocked = idx <= state.current;
    return `<span class="pill" style="opacity:${unlocked ? 1 : 0.5}">${idx + 1}. ${c.topic}</span>`;
  }).join('');
  sessionSummary.textContent = `XP: ${state.xp} | Streak: ${state.streak} | Last score: ${state.lastScore ?? 'N/A'}`;
}

function loadLesson() {
  const lesson = curriculum[state.current];
  if (!lesson) {
    lessonCard.style.display = 'none';
    feedbackCard.style.display = 'block';
    feedbackText.textContent = 'Curriculum complete. Great work — you finished the incremental indicator path!';
    scoreText.textContent = `Final XP: ${state.xp}`;
    revealText.textContent = 'Next step: plug in live chart/scenario engine and grading overlay.';
    return;
  }
  lessonCard.style.display = 'block';
  feedbackCard.style.display = 'none';
  lessonTitle.textContent = `Lesson ${lesson.id}: ${lesson.topic}`;
  lessonDesc.textContent = lesson.description;
  lessonPrompt.textContent = lesson.prompt;
}

function gradeAttempt() {
  const lesson = curriculum[state.current];
  const confidence = Number(document.getElementById('confidence').value);
  const base = 45 + confidence * 10;
  const variation = Math.floor(Math.random() * 11) - 5;
  const score = Math.max(0, Math.min(100, base + variation));

  state.lastScore = score;
  if (score >= lesson.minScoreToUnlock) {
    state.current += 1;
    state.streak += 1;
    state.xp += 100 + (score - lesson.minScoreToUnlock) * 2 + state.streak * 5;
    feedbackText.textContent = `Pass: You unlocked the next topic (${score} / 100).`;
  } else {
    state.streak = 0;
    state.xp += 30;
    feedbackText.textContent = `Retry: Score ${score} / 100. Need ${lesson.minScoreToUnlock}+ to unlock next lesson.`;
  }

  scoreText.textContent = `Score: ${score}`;
  revealText.textContent = `What happened next: ${lesson.reveal}`;
  feedbackCard.style.display = 'block';
  save();
  renderProgress();
}

document.getElementById('startBtn').addEventListener('click', loadLesson);
document.getElementById('submitBtn').addEventListener('click', gradeAttempt);
document.getElementById('resetBtn').addEventListener('click', () => {
  localStorage.removeItem('trainerState');
  location.reload();
});

renderProgress();
