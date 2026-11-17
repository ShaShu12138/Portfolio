class HighScore {
  read() {
    try {
      const data = JSON.parse(localStorage.getItem('space-invaders.scores.v1') || '[]');
      return Array.isArray(data) ? data.filter(x => typeof x.name === 'string' && Number.isFinite(x.score)).slice(0, 10) : [];
    } catch { return []; }
  }
  submit(name, score) {
    const scores = [...this.read(), { name: name.trim().slice(0, 20) || 'Player', score }].sort((a,b) => b.score-a.score).slice(0,10);
    try {
      localStorage.setItem('space-invaders.scores.v1', JSON.stringify(scores));
      document.getElementById('message').textContent = 'Score saved on this device.';
    } catch { document.getElementById('message').textContent = 'Storage is unavailable. Your score: ' + score; }
    this.draw();
  }
  draw() {
    document.getElementById('highScore').textContent = this.read().map(x => `${x.name}: ${x.score}`).join('\n') || 'No scores yet.';
  }
}
