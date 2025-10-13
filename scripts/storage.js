export function saveScore(score) {
  localStorage.setItem('highScore', Math.max(score, getHighScore()));
}

export function getHighScore() {
  return parseInt(localStorage.getItem('highScore')) || 0;
}