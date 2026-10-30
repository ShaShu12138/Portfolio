const heldKeys = new Set();
function controlDown(code) { return heldKeys.has(code) || keyIsDown(code); }
document.querySelectorAll('[data-key]').forEach(button => {
  const code = Number(button.dataset.key);
  button.addEventListener('pointerdown', event => { event.preventDefault(); button.setPointerCapture(event.pointerId); heldKeys.add(code); });
  for (const type of ['pointerup','pointercancel','lostpointercapture']) button.addEventListener(type, () => heldKeys.delete(code));
});
window.addEventListener('blur', () => heldKeys.clear());
window.addEventListener('keydown', event => {
  if (event.target instanceof HTMLInputElement) return;
  if (['ArrowLeft','ArrowRight',' '].includes(event.key)) event.preventDefault();
});
document.getElementById('start').addEventListener('click', startGame);
document.getElementById('restart').addEventListener('click', () => location.reload());
document.getElementById('sound').addEventListener('click', event => {
  const muted = event.currentTarget.getAttribute('aria-pressed') !== 'true';
  event.currentTarget.setAttribute('aria-pressed', String(muted));
  event.currentTarget.textContent = muted ? 'Sound: off' : 'Sound: on';
  masterVolume(muted ? 0 : 1);
});
document.getElementById('score-form').addEventListener('submit', event => {
  event.preventDefault();
  new HighScore().submit(document.getElementById('player-name').value, score);
  event.currentTarget.hidden = true;
});
