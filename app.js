const projects = [
  { id: 'trust', title: 'Trust Protocol', category: 'narrative', label: 'Serious game · TypeScript / Lit', image: 'trust-protocol.webp', summary: 'A desktop simulation about deciding who to trust.', description: 'A solo student project about recognising bank-impersonation fraud. A fictional desktop brings together mail, a bank website and a phone call, placing the player in the middle of a decision.', role: 'Solo developer · design and development', points: ['A window system with focus, movement, resizing, minimising and restoration.', 'Mail sessions and a phone-call state machine, with narrative content stored as data.', 'A playable first-day sequence with save, resume, ending and replay.', 'English, Simplified Chinese and Dutch localisation.'], note: 'The current build covers Day 1. The wider campaign is designed but is still in development. The cover image is portfolio artwork.', url: 'https://shashu12138.github.io/Trust-Protocol/', source: 'https://github.com/ShaShu12138/Trust-Protocol' },
  { id: 'cleared', title: 'Cleared for Release', category: 'narrative', label: 'Narrative · 1-BIT JAM 15', image: 'cleared-for-release.png', summary: 'A story told through the documents you censor.', description: 'A short black-and-white narrative game about a censorship clerk in wartime Berlin. Redact reports and private letters, and discover the human cost of following orders.', role: 'Game project · made for 1-BIT JAM 15', points: ['Document redaction as the central player interaction.', 'A restrained black-and-white visual style.', 'A narrative about the consequences of following orders.'], url: 'https://shashu12138.itch.io/cleared-for-release' },
  { id: 'check', title: 'Check Man', category: 'puzzle', label: 'Puzzle · C# / Browser', image: 'checkman.webp', summary: 'Cover the targets. Keep the piece cost down.', description: 'A browser adaptation of my C# chess puzzle. Cover every target with chess attacks while spending as little as possible on pieces.', role: 'Original C# puzzle · browser adaptation', points: ['An 8 × 8 board with target, blocker and piece-cost rules.', 'Blocking rays and distinct attack geometry for each piece.', 'Generated puzzles with reachable targets and a timed challenge.', 'Mouse, touch and keyboard interaction.'], url: 'games/check-man/' },
  { id: 'ball', title: 'Adventure of the Ball', category: 'action', label: 'Action · Game project', image: 'adventure-ball.webp', summary: 'Take on a giant stone opponent.', description: 'An action game in which a ball takes on a giant stone opponent. Open the published project to explore the game.', url: 'https://shashu12138.itch.io/adventure-of-the-ball' },
  { id: 'danmaku', title: 'Danmaku Rhapsody', category: 'action', label: 'Bullet hell · Fan game', image: 'danmaku.webp', summary: 'A fan-made bullet hell inspired by Touhou.', description: 'A fan-made bullet hell game inspired by the Touhou Project, published on the dragonnight250 itch.io account used for my earlier game projects.', url: 'https://dragonnight250.itch.io/danmaku-rhapsody' },
  { id: 'dungeon', title: 'Dungeon Exploration', category: 'puzzle', label: 'Match-3 · Browser game', image: 'dungeon.webp', summary: 'Match gems, fight monsters, find your way out.', description: 'A dungeon game built around match-3 combat. Match the gems in your hand to fight the monsters blocking your way, then spend gold on upgrades.', points: ['Match-3 combat with cascades.', 'A shop with persistent upgrades.', 'Mouse and touch controls in the browser.'], url: 'games/dungeon-exploration/' },
  { id: 'chef', title: "Chef's Quest", category: 'action', label: 'Game project', image: 'chefs-quest.webp', summary: 'The last customer is the hardest to please.', description: "Chef's Quest: The Last Customer. Step into the kitchen and face an impossible-to-please customer. An earlier game project published on itch.io.", url: 'https://dragonnight250.itch.io/chefs-quest-the-last-customer-20' },
  { id: 'space', title: 'Space Invaders', category: 'action', label: 'Arcade · p5.js', image: 'space-invaders.webp', summary: 'Shields, enemy fire, and one more wave.', description: 'A browser Space Invaders game. Defend your shields, dodge enemy fire and survive escalating waves.', points: ['Keyboard and touch controls.', 'Restart and device-local high scores.', 'A restored web release of an earlier school project.'], url: 'games/space-invaders/' },
  { id: '2048', title: '2048', category: 'puzzle', label: 'Number puzzle · Browser', image: '2048.webp', summary: 'Small moves. Bigger numbers.', description: 'A browser implementation of the number puzzle. Slide and combine matching tiles, plan your moves and work towards 2048.', url: 'https://shashu12138.github.io/2048-game/' },
  { id: 'yahtzee', title: 'Yahtzee', category: 'puzzle', label: 'Dice game · Browser', image: 'yathzee.webp', summary: 'Five dice and a little calculated risk.', description: 'A browser dice game based on Yahtzee. Roll five dice and choose combinations to build your score.', url: 'https://shashu12138.github.io/Yahtezz/' }
];
const editor = { id: 'editor', title: 'Promotional-image Editor', label: 'Client work · WebspaceZ', description: 'During my September 2025–February 2026 internship at WebspaceZ, I independently developed and delivered an online promotional-image editor for shop owners without Photoshop experience.', role: 'Web Developer Intern · independent development and delivery', points: ['An in-browser tool for creating promotional designs.', 'An integrated AI image-generation API.', 'A workflow connecting image creation and promotional design.'], note: 'This summary comes from my CV and existing portfolio. A public demo and client screenshots are not currently included.' };
const grid = document.querySelector('#project-grid');
const status = document.querySelector('#result-status');
const dialog = document.querySelector('#project-dialog');
let filter = 'all';
let previousFocus;
function renderProjects() {
  const visible = projects.filter(project => filter === 'all' || project.category === filter);
  grid.replaceChildren(...visible.map(project => {
    const card = document.createElement('button');
    card.className = 'library-card';
    card.dataset.project = project.id;
    card.setAttribute('aria-label', `View ${project.title}`);
    card.innerHTML = `<span class="library-image"><img src="assets/images/${project.image}" alt="" loading="lazy"><span aria-hidden="true">↗</span></span><small>${project.label.toUpperCase()}</small><strong>${project.title}</strong><p>${project.summary}</p>`;
    return card;
  }));
  status.textContent = visible.length ? visible.length + ' projects' : 'No projects found.';
}
function openProject(id) {
  const project = id === 'editor' ? editor : projects.find(item => item.id === id);
  if (!project) return;
  previousFocus = document.activeElement;
  document.querySelector('#dialog-content').innerHTML = `${project.image ? `<img class="dialog-image" src="assets/images/${project.image}" alt="${project.title} project cover">` : ''}<div class="dialog-body"><span class="eyebrow">${project.label}</span><h2 id="dialog-title">${project.title}</h2><p>${project.description}</p>${project.role ? `<h3>Role & context</h3><p>${project.role}</p>` : ''}${project.points ? `<h3>Inside the project</h3><ul>${project.points.map(point => `<li>${point}</li>`).join('')}</ul>` : ''}${project.note ? `<p class="dialog-note">${project.note}</p>` : ''}<div class="actions">${project.url ? `<a class="button dark" href="${project.url}" target="_blank" rel="noopener">Play / view project ↗</a>` : '<a class="button dark" href="mailto:zejing2001@hotmail.com">Ask me about this project ↗</a>'}${project.source ? `<a class="text-button" href="${project.source}" target="_blank" rel="noopener">Source on GitHub ↗</a>` : ''}</div></div>`;
  dialog.showModal();
  document.body.classList.add('modal-open');
  dialog.scrollTop = 0;
  document.querySelector('.dialog-close').focus();
}
document.addEventListener('click', event => {
  const projectButton = event.target.closest('[data-project]');
  if (projectButton) openProject(projectButton.dataset.project);
  const filterButton = event.target.closest('[data-filter]');
  if (filterButton) {
    filter = filterButton.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(button => {
      const active = button === filterButton;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    renderProjects();
  }
});
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  previousFocus?.focus();
});


renderProjects();

const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
const roleWord = document.querySelector('#role-word');
const roles = [
  { title: 'game developer', color: 'game' },
  { title: 'software developer', color: 'software' },
  { title: 'web developer', color: 'web' }
];
const mascot = document.querySelector('.mascot');
let motionPaused = motionPreference.matches;
let typingTimer;
let roleIndex = 0;
let letterCount = 4;
let deleting = false;

function typeRole() {
  const { title: role, color } = roles[roleIndex];
  roleWord.dataset.role = color;
  roleWord.textContent = role.slice(0, letterCount);
  let delay = deleting ? 34 : 61;
  if (!deleting && letterCount === role.length) {
    deleting = true;
    delay = 2500;
  } else if (deleting && letterCount === 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 220;
  }
  letterCount += deleting ? -1 : 1;
  typingTimer = setTimeout(typeRole, delay);
}

function setMotion(paused) {
  motionPaused = paused;
  document.documentElement.dataset.motion = paused ? 'paused' : 'playing';
  clearTimeout(typingTimer);
  mascot.classList.remove('hopping');
  if (paused) {
    roleWord.textContent = roles[0].title;
    roleWord.dataset.role = roles[0].color;
    mascot.style.removeProperty('--look-x');
    mascot.style.removeProperty('--look-y');
  } else {
    roleIndex = 0;
    letterCount = 4;
    deleting = false;
    typeRole();
  }
}
motionPreference.addEventListener('change', event => setMotion(event.matches));
setMotion(motionPaused);

document.querySelector('.mascot-scene').addEventListener('pointermove', event => {
  if (motionPaused || event.pointerType !== 'mouse') return;
  const rect = mascot.getBoundingClientRect();
  mascot.style.setProperty('--look-x', Math.max(-9, Math.min(9, (event.clientX - rect.x - rect.width / 2) / 17)) + 'px');
  mascot.style.setProperty('--look-y', Math.max(-7, Math.min(7, (event.clientY - rect.y - rect.height * .43) / 17)) + 'px');
});
document.querySelector('.mascot-scene').addEventListener('pointerleave', () => {
  mascot.style.removeProperty('--look-x');
  mascot.style.removeProperty('--look-y');
});
let expression = 0;
mascot.addEventListener('click', () => {
  expression = (expression + 1) % 3;
  mascot.dataset.expression = ['smile', 'heart', 'code'][expression];
  if (!motionPaused) mascot.classList.add('hopping');
});
mascot.addEventListener('animationend', event => {
  if (event.animationName === 'hop') mascot.classList.remove('hopping');
});

const header = document.querySelector('.header');
const sections = [...document.querySelectorAll('main > section')];
let scrollFrame = 0;
function updateScroll() {
  scrollFrame = 0;
  const threshold = header.offsetHeight + 45;
  const active = sections.findLast(section => section.getBoundingClientRect().top <= threshold)?.id ?? 'home';
  if (header.dataset.chapter !== active) {
    header.dataset.chapter = active;
    header.querySelectorAll('nav a').forEach(link => {
      if (link.hash === '#' + active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
  const range = document.documentElement.scrollHeight - innerHeight;
  header.style.setProperty('--progress', range > 0 ? scrollY / range : 0);
}
function requestScrollUpdate() {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll);
}
window.addEventListener('scroll', requestScrollUpdate, { passive: true });
window.addEventListener('resize', requestScrollUpdate);
requestScrollUpdate();

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('entered');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: .16 });
document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));



roleWord.addEventListener('click', () => {
  clearTimeout(typingTimer);
  roleIndex = (roleIndex + 1) % roles.length;
  roleWord.textContent = roles[roleIndex].title;
  roleWord.dataset.role = roles[roleIndex].color;
  if (!motionPaused) {
    deleting = true;
    letterCount = roles[roleIndex].title.length;
    typingTimer = setTimeout(typeRole, 3000);
  }
});

// Captured pointer movement stays inside each object's own surface.
let dragLayer = 0;
function bringForward(element) {
  element.style.zIndex = ++dragLayer;
}

function makeDraggable(element, surface) {
  let drag;
  let suppressClick = false;
  element.addEventListener('pointerdown', event => {
    if (!event.isPrimary || event.button !== 0) return;
    const rect = element.getBoundingClientRect();
    drag = { pointerId: event.pointerId, x: event.clientX, y: event.clientY,
      startX: Number(element.dataset.dragX || 0), startY: Number(element.dataset.dragY || 0),
      rect, bounds: surface.getBoundingClientRect(), moved: false };
    suppressClick = false;
    bringForward(element);
    element.getAnimations().forEach(animation => animation.cancel());
    element.setPointerCapture(event.pointerId);
    element.classList.add('dragging');
  });
  element.addEventListener('pointermove', event => {
    if (!drag || drag.pointerId !== event.pointerId) return;
    const dx = event.clientX - drag.x;
    const dy = element === mascot ? 0 : event.clientY - drag.y;
    drag.moved ||= Math.hypot(dx, dy) > 5;
    const x = Math.max(drag.bounds.left - drag.rect.left,
      Math.min(drag.bounds.right - drag.rect.right, dx)) + drag.startX;
    const y = Math.max(drag.bounds.top - drag.rect.top,
      Math.min(drag.bounds.bottom - drag.rect.bottom, dy)) + drag.startY;
    element.dataset.dragX = x;
    element.dataset.dragY = y;
    element.style.translate = x + 'px ' + y + 'px';
    if (element === mascot) element.style.setProperty('--roll', x * 1.7 + 'deg');
  });
  function finish(event) {
    if (!drag || drag.pointerId !== event.pointerId) return;
    const moved = drag.moved;
    drag = undefined;
    element.classList.remove('dragging');
    if (event.type === 'pointerup' && !motionPaused) {
      element.animate([
        { transform: 'scale(1.035) rotate(-2deg)' },
        { transform: 'scale(.985) rotate(1deg)', offset: .55 },
        { transform: 'scale(1) rotate(0)' }
      ], { duration: 320, easing: 'cubic-bezier(.2,.75,.35,1)' });
    }
    if (element.hasPointerCapture(event.pointerId)) element.releasePointerCapture(event.pointerId);
    suppressClick = moved;
  }
  element.addEventListener('pointerup', finish);
  element.addEventListener('pointercancel', finish);
  element.addEventListener('lostpointercapture', finish);
  element.addEventListener('click', event => {
    if (suppressClick) {
      event.stopImmediatePropagation();
      suppressClick = false;
    }
  }, true);
}
mascot.addEventListener('pointerdown', () => {
  mascot.parentElement.classList.add('manual-drive');
});
makeDraggable(mascot, document.querySelector('.mascot-scene'));
// Keyboard users can roll it too.
mascot.addEventListener('keydown', event => {
  if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
  event.preventDefault();
  mascot.parentElement.classList.add('manual-drive');
  const surface = document.querySelector('.mascot-scene').getBoundingClientRect();
  const rect = mascot.getBoundingClientRect();
  const delta = event.key === 'ArrowLeft' ? -16 : 16;
  const bounded = Math.max(surface.left - rect.left, Math.min(surface.right - rect.right, delta));
  const x = Number(mascot.dataset.dragX || 0) + bounded;
  mascot.dataset.dragX = x;
  mascot.style.translate = x + 'px 0px';
  mascot.style.setProperty('--roll', x * 1.7 + 'deg');
});

const toolNotes = {
  csharp: 'C# — the language behind my original Check Man puzzle.',
  unity: 'Unity — one of the game engines in my development toolbox.',
  godot: 'Godot — another engine I use for game development.',
  javascript: 'JavaScript — browser games, client websites, and this portfolio.',
  python: 'Python — part of my programming toolbox alongside C# and JavaScript.',
  git: 'Git — version control for my software and game projects.'
};
const board = document.querySelector('.sticker-board');
const stickers = [...board.querySelectorAll('.tool-sticker')];
stickers.forEach(sticker => {
  makeDraggable(sticker, board);
  sticker.addEventListener('click', () => {
    document.querySelector('#tool-note').textContent = toolNotes[sticker.dataset.tool];
    stickers.forEach(item => item.setAttribute('aria-pressed', String(item === sticker)));
  });
  sticker.setAttribute('aria-pressed', 'false');
  sticker.setAttribute('aria-label', sticker.textContent.trim());
  sticker.addEventListener('keydown', event => {
    const directions = { ArrowLeft: [-12, 0], ArrowRight: [12, 0], ArrowUp: [0, -12], ArrowDown: [0, 12] };
    const direction = directions[event.key];
    if (!direction) return;
    event.preventDefault();
    bringForward(sticker);
    const bounds = board.getBoundingClientRect();
    const rect = sticker.getBoundingClientRect();
    const x = Number(sticker.dataset.dragX || 0) + Math.max(bounds.left - rect.left,
      Math.min(bounds.right - rect.right, direction[0]));
    const y = Number(sticker.dataset.dragY || 0) + Math.max(bounds.top - rect.top,
      Math.min(bounds.bottom - rect.bottom, direction[1]));
    sticker.dataset.dragX = x;
    sticker.dataset.dragY = y;
    sticker.style.translate = x + 'px ' + y + 'px';
  });
});
document.querySelector('#reset-stickers').addEventListener('click', () => {
  stickers.forEach(sticker => {
    sticker.style.removeProperty('translate');
    sticker.style.removeProperty('z-index');
    delete sticker.dataset.dragX;
    delete sticker.dataset.dragY;
    sticker.setAttribute('aria-pressed', 'false');
  });
  document.querySelector('#tool-note').textContent = toolNotes.csharp;
});


const cat = document.querySelector('.shelf-cat');
document.querySelector('#library').addEventListener('pointermove', event => {
  if (motionPaused || event.pointerType !== 'mouse') return;
  const rect = cat.getBoundingClientRect();
  cat.style.setProperty('--cat-x', Math.max(-4, Math.min(4, (event.clientX - rect.x - rect.width / 2) / 35)) + 'px');
  cat.style.setProperty('--cat-y', Math.max(-3, Math.min(3, (event.clientY - rect.y - rect.height / 2) / 45)) + 'px');
});
document.querySelector('#library').addEventListener('pointerleave', () => {
  cat.style.removeProperty('--cat-x');
  cat.style.removeProperty('--cat-y');
});
cat.addEventListener('click', () => {
  if (!motionPaused) cat.classList.add('stretching');
});
cat.addEventListener('animationend', event => {
  if (event.animationName === 'cat-stretch') cat.classList.remove('stretching');
});
const plant = document.querySelector('.little-plant');
plant.addEventListener('click', () => {
  const open = plant.getAttribute('aria-pressed') !== 'true';
  plant.setAttribute('aria-pressed', String(open));
  if (open && !motionPaused) {
    const bounds = plant.getBoundingClientRect();
    bloom(bounds.x + bounds.width / 2, bounds.y + bounds.height * .3);
  }
});
const plane = document.querySelector('.paper-plane');
plane.addEventListener('click', () => {
  if (!motionPaused) plane.classList.add('flying');
});
plane.addEventListener('animationend', event => {
  if (event.animationName === 'plane-flight') plane.classList.remove('flying');
});


// Short-lived pollen is animated with the browser's Web Animations API.
function bloom(x, y) {
  for (let index = 0; index < 6; index++) {
    const angle = index * Math.PI / 3;
    const pollen = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    pollen.setAttribute('viewBox', '0 0 20 20');
    pollen.setAttribute('aria-hidden', 'true');
    pollen.classList.add('pollen');
    pollen.style.left = x - 9 + 'px';
    pollen.style.top = y - 9 + 'px';
    const shape = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    shape.setAttribute('d', 'M10 1 12 7 19 10 12 12 10 19 7 12 1 10 7 7Z');
    pollen.append(shape);
    document.body.append(pollen);
    const dx = Math.cos(angle) * 45;
    const dy = Math.sin(angle) * 30 - 25;
    const animation = pollen.animate([
      { transform: 'translate(0,0) scale(.2)', opacity: 0 },
      { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(1)', opacity: 1, offset: .35 },
      { transform: 'translate(' + dx * 1.5 + 'px,' + (dy + 22) + 'px) scale(.2) rotate(80deg)', opacity: 0 }
    ], { duration: 850, delay: index * 20, easing: 'ease-out' });
    animation.finished.finally(() => pollen.remove());
  }
}

grid.addEventListener('pointermove', event => {
  if (motionPaused || event.pointerType !== 'mouse') return;
  const card = event.target.closest('.library-card');
  if (!card) return;
  const rect = card.getBoundingClientRect();
  card.style.setProperty('--tilt-x', (-(event.clientY - rect.top - rect.height / 2) / rect.height * 5) + 'deg');
  card.style.setProperty('--tilt-y', ((event.clientX - rect.left - rect.width / 2) / rect.width * 5) + 'deg');
});
grid.addEventListener('pointerout', event => {
  const card = event.target.closest('.library-card');
  if (card && !card.contains(event.relatedTarget)) {
    card.style.removeProperty('--tilt-x');
    card.style.removeProperty('--tilt-y');
  }
});
