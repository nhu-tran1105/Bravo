export function saveScore(score) {
  localStorage.setItem("highScore", Math.max(score, getHighScore()));
}

export function getHighScore() {
  return parseInt(localStorage.getItem("highScore")) || 0;
}

export function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; ${expires}; path=/`;
}

export function getCookie(name) {
  const cookies = document.cookie.split(";");
  for (let c of cookies) {
    c = c.trim();
    if (c.startsWith(name + "=")) {
      return decodeURIComponent(c.substring(name.length + 1));
    }
  }
  return "";
}

export function savePlayerStats(playerName, score) {
  const stats = `Name: ${playerName}, Score: ${score}`;
  setCookie("playerStats", stats, 7);
  console.log("✅ Stats saved to cookie:", stats);
}

export function showSavedStats() {
  const savedStats = getCookie("playerStats");
  if (savedStats) {
    console.log("📋 Last saved stats:", savedStats);
  } else {
    console.log("ℹ️ No saved player stats yet.");
  }
}