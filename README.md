# Technical Trading Trainer

This repository contains a **playable static prototype** for an incremental technical-analysis learning session.

## What is implemented

- Incremental lesson path that increases in difficulty.
- Lessons now include commonly used overlays/indicators:
  1. Support/Resistance
  2. Trendlines & Channels
  3. Moving Averages (SMA/EMA)
  4. ATR
  5. RSI
  6. MACD
  7. Volume + VWAP / Volume Profile
  8. Bollinger Bands
  9. Fibonacci Retracements & Extensions
  10. Pivot Points
  11. Ichimoku Cloud
  12. Stochastic Oscillator + ADX
- Session state persistence (XP, streak, last score) in LocalStorage.
- Simple grading + unlock system with increasing score thresholds.
- "What happened next" reveal text after each submission.

## Files

- `index.html` — UI shell for the training session.
- `session.js` — curriculum, progression, grading, and persistence logic.

## Run locally

Open `index.html` in a browser, or host it with any static file server.

## GitHub Pages deployment

This app is static and can be deployed directly to GitHub Pages.

Suggested next step:
- Replace placeholder reveal/grading with real chart scenarios (visible candles + hidden future candles).
- Add chart library overlays so user markups are drawn and graded directly on real price data.
