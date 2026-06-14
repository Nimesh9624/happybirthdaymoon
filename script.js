/* ============================================================
   HAPPY BIRTHDAY MOON ❤️  —  MAIN JAVASCRIPT
   ============================================================ */

'use strict';

/* ── STATE ── */
let currentDay   = 1;
const TOTAL_DAYS = 15;
const BIRTHDAY   = 15;
let audioPlaying = false;
let currentPage  = 'page-welcome';

/* ── CALENDAR DATA ── */
const dayMessages = [
  "",  // index 0 unused
  "A special day is getting closer... something magical is waiting.",
  "Someone amazing is counting down the days with a smile.",
  "Every moment brings us closer to your beautiful day.",
  "The universe is preparing something wonderful just for you.",
  "Stars are aligning, hearts are singing — just for you, Moon.",
  "More than halfway there... the excitement is growing!",
  "Six more days and the world will celebrate you, dear Moon.",
  "Can you feel it? The magic is already in the air.",
  "Every sunrise brings us one step closer to your special moment.",
  "Five days to go... your smile is already lighting up my heart.",
  "The countdown is almost over — my heart is full of love for you.",
  "Three more days, and I'll shout it from the rooftops — Happy Birthday!",
  "Two days away... I've been waiting to make this day perfect for you.",
  "Tomorrow is YOUR day, Moon. Get ready for something truly special.",
  "🎉 TODAY IS THE DAY! Happy Birthday, Moon! You are my everything ❤️",
];

const dayEmojis = ["","💕","🌙","⭐","🌸","💫","🌹","🎀","✨","🌺","💖","🎊","🎈","🎁","🎂","🎉"];

/* ══════════════════════════════════════════
   INIT
══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initStars();
  initFloatingHearts();
  initBalloons();
  initWelcomeCanvas();
  updateCalendarCard(1, false);
});

/* ══════════════════════════════════════════
   PAGE TRANSITIONS
══════════════════════════════════════════ */
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const pg = document.getElementById(id);
  if (pg) {
    pg.classList.add('active');
    currentPage = id;
  }
}

/* ══════════════════════════════════════════
   PAGE 1 → PAGE 2
══════════════════════════════════════════ */
function startJourney() {
  const btn = document.getElementById('btn-start');
  btn.textContent = '✨ Let\'s Go! ✨';
  btn.disabled = true;
  shootHearts();
  setTimeout(() => {
    showPage('page-calendar');
    initCalendarCanvas();
    currentDay = 1;
    updateCalendarCard(1, false);
  }, 700);
}

/* ══════════════════════════════════════════
   PAGE 2  — CALENDAR
══════════════════════════════════════════ */
function updateCalendarCard(day, animate) {
  const numEl  = document.getElementById('cal-day-number');
  const msgEl  = document.getElementById('cal-message');
  const hrtEl  = document.getElementById('cal-hearts');
  const lftEl  = document.getElementById('cal-days-left');
  const prg    = document.getElementById('progress-bar');
  const prevBtn= document.getElementById('btn-prev-day');

  if (!numEl) return;
  numEl.textContent  = day;
  msgEl.textContent  = dayMessages[day] || '';
  hrtEl.textContent  = dayEmojis[day]   || '💕';

  if (day === BIRTHDAY) {
    lftEl.textContent = "🎉 TODAY IS YOUR BIRTHDAY! 🎉";
    lftEl.style.color = '#ffd700';
  } else {
    lftEl.textContent = `${BIRTHDAY - day} day${BIRTHDAY - day !== 1 ? 's' : ''} to go...`;
    lftEl.style.color = '';
  }

  prg.style.width = `${((day) / TOTAL_DAYS) * 100}%`;
  prevBtn.style.display = day > 1 ? 'block' : 'none';

  if (animate) {
    const card = document.getElementById('calendar-card');
    card.classList.remove('flip-in');
    void card.offsetWidth;
    card.classList.add('flip-in');
    spawnCalHeart();
  }
}

function nextDay() {
  if (currentDay >= TOTAL_DAYS) { triggerBirthdayReveal(); return; }

  const card = document.getElementById('calendar-card');
  card.classList.remove('flip-out', 'flip-in');
  void card.offsetWidth;
  card.classList.add('flip-out');

  // small confetti on every flip
  confetti({ particleCount: 30, spread: 60, origin: { y: 0.5 }, colors: ['#ff6b9d','#ffd700','#ce93d8'] });

  setTimeout(() => {
    card.classList.remove('flip-out');
    currentDay++;
    updateCalendarCard(currentDay, true);

    if (currentDay === TOTAL_DAYS) {
      document.getElementById('btn-next-day').textContent = "🎉 Reveal Birthday! 🎉";
      document.getElementById('btn-next-day').classList.add('pulse-btn');
    }
  }, 700);
}

function prevDay() {
  if (currentDay <= 1) return;
  const card = document.getElementById('calendar-card');
  card.classList.remove('flip-out', 'flip-in');
  void card.offsetWidth;
  card.classList.add('flip-out');
  setTimeout(() => {
    card.classList.remove('flip-out');
    currentDay--;
    document.getElementById('btn-next-day').textContent = "Next Day →";
    document.getElementById('btn-next-day').classList.remove('pulse-btn');
    updateCalendarCard(currentDay, true);
  }, 700);
}

function spawnCalHeart() {
  const h = document.createElement('div');
  h.className = 'fheart';
  h.textContent = ['💕','❤️','💖','💗','💓'][Math.floor(Math.random()*5)];
  h.style.cssText = `
    left:${Math.random()*90+5}%;
    --size:${1+Math.random()*1.5}rem;
    --dur:${2+Math.random()*2}s;
    --delay:0s;
  `;
  const container = document.getElementById('floating-hearts') || document.body;
  container.appendChild(h);
  setTimeout(() => h.remove(), 4000);
}

/* ══════════════════════════════════════════
   PAGE 3 — BIRTHDAY REVEAL
══════════════════════════════════════════ */
function triggerBirthdayReveal() {
  const popup = document.getElementById('birthday-popup');
  popup.style.display = 'flex';

  // Big confetti
  launchFireworks();
  bigConfetti();
  initPopupSparkles();

  setTimeout(() => {
    const content = document.getElementById('popup-content');
    content.classList.add('animate__animated','animate__zoomIn');
  }, 100);
}

function openCakePage() {
  document.getElementById('birthday-popup').style.display = 'none';
  showPage('page-cake');
  initCakeSparkles();
  setTimeout(() => tryAutoPlay(), 400);
}

/* ══════════════════════════════════════════
   PAGE 4 — BIRTHDAY CAKE
══════════════════════════════════════════ */
function tryAutoPlay() {
  const audio = document.getElementById('birthday-audio');
  if (!audio) return;
  audio.volume = parseFloat(document.getElementById('volume-slider').value) || 0.7;
  audio.play().then(() => {
    audioPlaying = true;
    document.getElementById('btn-play').textContent = '⏸';
  }).catch(() => {
    // autoplay blocked — user must click
  });
}

function toggleMusic() {
  const audio = document.getElementById('birthday-audio');
  const btn   = document.getElementById('btn-play');
  if (!audio) return;
  if (audioPlaying) {
    audio.pause();
    audioPlaying = false;
    btn.textContent = '▶';
  } else {
    audio.play();
    audioPlaying = true;
    btn.textContent = '⏸';
  }
}

function setVolume(v) {
  const audio = document.getElementById('birthday-audio');
  if (audio) audio.volume = parseFloat(v);
}

function goToCakeCutting() {
  showPage('page-cutting');
  initCuttingCanvas();
}

/* ══════════════════════════════════════════
   PAGE 5 — CAKE CUTTING
══════════════════════════════════════════ */
function cutTheCake() {
  const knife   = document.getElementById('knife');
  const leftH   = document.getElementById('left-half');
  const rightH  = document.getElementById('right-half');
  const msg     = document.getElementById('cutting-message');
  const cutBtn  = document.getElementById('btn-cut-cake');
  const galBtn  = document.getElementById('btn-go-gallery');
  const canvas  = document.getElementById('cutting-canvas');

  cutBtn.disabled = true;
  cutBtn.style.opacity = '0.5';

  // Knife slices down
  knife.style.top = '60px';
  knife.style.opacity = '1';

  setTimeout(() => {
    // Split cake
    leftH.classList.add('split-left');
    rightH.classList.add('split-right');

    // Massive confetti
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        confetti({
          particleCount: 120,
          spread: 180,
          startVelocity: 55,
          origin: { x: Math.random(), y: 0.5 },
          colors: ['#ff6b9d','#ffd700','#ce93d8','#fff','#ff4081','#00e5ff'],
        });
      }, i * 300);
    }

    // Spawn balloons
    spawnCuttingBalloons();

    // Show message
    setTimeout(() => {
      msg.style.opacity = '1';
      cutBtn.style.display = 'none';
      galBtn.style.display = 'block';
      galBtn.style.opacity = '1';
      launchFireworks();
    }, 600);

  }, 800);
}

function spawnCuttingBalloons() {
  const container = document.getElementById('balloons-cutting');
  const emojis = ['🎈','🎉','🎊','🎀','🎁','💕','⭐','🌸'];
  for (let i = 0; i < 12; i++) {
    const b = document.createElement('div');
    b.style.cssText = `
      position:absolute;
      font-size:${2+Math.random()*2}rem;
      left:${Math.random()*100}%;
      bottom:0;
      animation: balloonFloat ${5+Math.random()*5}s ease-in-out ${Math.random()*2}s both;
      pointer-events:none;
    `;
    b.textContent = emojis[Math.floor(Math.random()*emojis.length)];
    container.appendChild(b);
  }
}

function goToGallery() {
  showPage('page-gallery');
  initGalleryCanvas();
  // Keep music going if it was playing
  const audio = document.getElementById('birthday-audio');
  if (audio && !audioPlaying) {
    audio.play().then(() => { audioPlaying = true; document.getElementById('btn-play').textContent = '⏸'; }).catch(()=>{});
  }
}

/* ══════════════════════════════════════════
   PAGE 6 — GALLERY LIGHTBOX
══════════════════════════════════════════ */
function openLightbox(src, caption) {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  const cap = document.getElementById('lightbox-caption');
  img.src = src;
  cap.textContent = caption;
  lb.classList.add('open');
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
}

function goToMessage() {
  showPage('page-message');
  initMessagePage();
}

/* ══════════════════════════════════════════
   PAGE 7 — TYPING MESSAGE
══════════════════════════════════════════ */
const fullMessage = `Dear Moon,

Today is your special day.

Thank you for being such an
absolutely amazing person in my life.

You carry such warmth, beauty,
and kindness in everything you do.

May every dream of yours come true,
and may happiness follow you forever.

May this birthday bring you joy
beyond measure, love without limits,
and memories that last a lifetime.

Happy Birthday ❤️`;

function initMessagePage() {
  initMessageCanvas();
  initFallingFlowers();
  initFloatingHeartsMsg();

  const textEl = document.getElementById('message-text');
  const sigEl  = document.getElementById('message-signature');
  const btnEl  = document.getElementById('btn-restart');
  textEl.textContent = '';
  sigEl.style.opacity = '0';
  btnEl.style.display = 'none';

  let i = 0;
  const speed = 28; // ms per char

  function typeChar() {
    if (i < fullMessage.length) {
      textEl.textContent += fullMessage[i];
      i++;
      setTimeout(typeChar, speed);
    } else {
      // Reveal signature
      setTimeout(() => {
        sigEl.style.transition = 'opacity 1.5s';
        sigEl.style.opacity = '1';
        setTimeout(() => { btnEl.style.display = 'block'; }, 1200);
      }, 600);
    }
  }
  setTimeout(typeChar, 500);
}

/* ══════════════════════════════════════════
   RESTART
══════════════════════════════════════════ */
function restartExperience() {
  currentDay = 1;
  audioPlaying = false;
  const audio = document.getElementById('birthday-audio');
  if (audio) { audio.pause(); audio.currentTime = 0; }
  document.getElementById('btn-play').textContent = '▶';
  document.getElementById('btn-next-day').textContent = 'Next Day →';
  document.getElementById('btn-next-day').classList.remove('pulse-btn');
  document.getElementById('btn-cut-cake').style.display = 'block';
  document.getElementById('btn-cut-cake').disabled = false;
  document.getElementById('btn-cut-cake').style.opacity = '1';
  document.getElementById('btn-go-gallery').style.display = 'none';
  document.getElementById('cutting-message').style.opacity = '0';
  document.getElementById('knife').style.top = '-60px';
  document.getElementById('left-half').classList.remove('split-left');
  document.getElementById('right-half').classList.remove('split-right');
  updateCalendarCard(1, false);
  showPage('page-welcome');
}

/* ══════════════════════════════════════════
   CANVAS — WELCOME (Stars + Particles)
══════════════════════════════════════════ */
function initWelcomeCanvas() {
  const canvas = document.getElementById('welcome-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = [];
    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2.5 + 0.5,
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4,
        alpha: Math.random(),
        dAlpha: (Math.random() - 0.5) * 0.02,
        color: ['#ff6b9d','#ffd700','#ce93d8','#ffffff','#ff80ab'][Math.floor(Math.random()*5)],
      });
    }
  }
  window.addEventListener('resize', resize);
  resize();

  function drawHeart(ctx, x, y, size, color, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(x, y-size*0.3, x-size*0.6, y-size*0.8, x-size, y-size*0.3);
    ctx.bezierCurveTo(x-size*1.6, y+size*0.1, x, y+size*0.9, x, y+size);
    ctx.bezierCurveTo(x, y+size*0.9, x+size*1.6, y+size*0.1, x+size, y-size*0.3);
    ctx.bezierCurveTo(x+size*0.6, y-size*0.8, x, y-size*0.3, x, y);
    ctx.fill();
    ctx.restore();
  }

  let hearts = Array.from({length: 20}, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: Math.random() * 12 + 4,
    alpha: Math.random() * 0.4 + 0.05,
    dy: -(Math.random() * 0.8 + 0.2),
    color: ['#ff6b9d','#ff4081','#ffd700','#ce93d8'][Math.floor(Math.random()*4)],
  }));

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.x += p.dx; p.y += p.dy;
      p.alpha += p.dAlpha;
      if (p.alpha <= 0 || p.alpha >= 1) p.dAlpha *= -1;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 6; ctx.shadowColor = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fill();
      ctx.restore();
    });

    hearts.forEach(h => {
      h.y += h.dy;
      h.x += Math.sin(Date.now() * 0.001 + h.size) * 0.3;
      if (h.y < -20) {
        h.y = canvas.height + 20;
        h.x = Math.random() * canvas.width;
      }
      drawHeart(ctx, h.x, h.y, h.size, h.color, h.alpha);
    });

    requestAnimationFrame(loop);
  }
  loop();
}

/* ══════════════════════════════════════════
   CANVAS — CALENDAR (floating petals)
══════════════════════════════════════════ */
function initCalendarCanvas() {
  const canvas = document.getElementById('calendar-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const petals = Array.from({length: 30}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 10 + 4,
    dy: Math.random() * 0.5 + 0.2,
    dx: (Math.random() - 0.5) * 0.5,
    rot: Math.random() * Math.PI * 2,
    drot: (Math.random() - 0.5) * 0.02,
    alpha: Math.random() * 0.5 + 0.2,
    color: ['#ff6b9d','#ffd700','#ce93d8','#ff80ab','#ffb3c6'][Math.floor(Math.random()*5)],
  }));

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    petals.forEach(p => {
      p.y += p.dy; p.x += p.dx; p.rot += p.drot;
      if (p.y > canvas.height + 20) { p.y = -20; p.x = Math.random()*canvas.width; }
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 8; ctx.shadowColor = p.color;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size, p.size/2, 0, 0, Math.PI*2);
      ctx.fill();
      ctx.restore();
    });
    if (currentPage === 'page-calendar') requestAnimationFrame(loop);
  }
  loop();
}

/* ══════════════════════════════════════════
   CANVAS — CAKE SPARKLES
══════════════════════════════════════════ */
function initCakeSparkles() {
  const canvas = document.getElementById('cake-sparkles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const sparks = Array.from({length: 60}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 3 + 1,
    alpha: Math.random(),
    dAlpha: (Math.random() - 0.5) * 0.04,
    color: ['#ffd700','#ffcc00','#fffde7','#ffa500'][Math.floor(Math.random()*4)],
  }));

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    sparks.forEach(s => {
      s.alpha += s.dAlpha;
      if (s.alpha < 0 || s.alpha > 1) s.dAlpha *= -1;
      // Draw 4-pointed star
      ctx.save();
      ctx.globalAlpha = s.alpha;
      ctx.fillStyle = s.color;
      ctx.shadowBlur = 12; ctx.shadowColor = s.color;
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const a = (i * Math.PI) / 4;
        const r = i % 2 === 0 ? s.r * 3 : s.r;
        if (i === 0) ctx.moveTo(s.x + r*Math.cos(a), s.y + r*Math.sin(a));
        else ctx.lineTo(s.x + r*Math.cos(a), s.y + r*Math.sin(a));
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    });
    if (currentPage === 'page-cake') requestAnimationFrame(loop);
  }
  loop();
}

/* ══════════════════════════════════════════
   CANVAS — CUTTING PAGE (floating balloons + sparks)
══════════════════════════════════════════ */
function initCuttingCanvas() {
  const canvas = document.getElementById('cutting-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const sparks = Array.from({length: 40}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 3 + 1,
    alpha: Math.random() * 0.6,
    dAlpha: (Math.random()-0.5)*0.03,
    color: ['#ffd700','#ff6b9d','#ce93d8','#ff4081'][Math.floor(Math.random()*4)],
  }));

  function loop() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    sparks.forEach(s => {
      s.alpha += s.dAlpha;
      if (s.alpha < 0 || s.alpha > 0.8) s.dAlpha *= -1;
      ctx.save();
      ctx.globalAlpha = Math.max(0, s.alpha);
      ctx.fillStyle = s.color;
      ctx.shadowBlur = 14; ctx.shadowColor = s.color;
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI*2); ctx.fill();
      ctx.restore();
    });
    if (currentPage === 'page-cutting') requestAnimationFrame(loop);
  }
  loop();
}

/* ══════════════════════════════════════════
   CANVAS — GALLERY (floating circles)
══════════════════════════════════════════ */
function initGalleryCanvas() {
  const canvas = document.getElementById('gallery-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const circles = Array.from({length: 20}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 60 + 20,
    alpha: Math.random() * 0.08 + 0.02,
    dx: (Math.random()-0.5)*0.3,
    dy: (Math.random()-0.5)*0.3,
    color: ['#ff6b9d','#8e24aa','#ce93d8'][Math.floor(Math.random()*3)],
  }));

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    circles.forEach(c => {
      c.x += c.dx; c.y += c.dy;
      if (c.x < -c.r) c.x = canvas.width + c.r;
      if (c.x > canvas.width + c.r) c.x = -c.r;
      if (c.y < -c.r) c.y = canvas.height + c.r;
      if (c.y > canvas.height + c.r) c.y = -c.r;
      ctx.save();
      ctx.globalAlpha = c.alpha;
      ctx.fillStyle = c.color;
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.r, 0, Math.PI*2);
      ctx.fill();
      ctx.restore();
    });
    if (currentPage === 'page-gallery') requestAnimationFrame(loop);
  }
  loop();
}

/* ══════════════════════════════════════════
   CANVAS — MESSAGE (sparkle rain)
══════════════════════════════════════════ */
function initMessageCanvas() {
  const canvas = document.getElementById('message-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const sparks = Array.from({length: 50}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 4 + 2,
    dy: -(Math.random() * 0.5 + 0.2),
    dx: (Math.random()-0.5)*0.4,
    alpha: Math.random(),
    dAlpha: (Math.random()-0.5)*0.03,
    color: ['#ffd700','#ff6b9d','#ce93d8','#ffffff'][Math.floor(Math.random()*4)],
  }));

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    sparks.forEach(s => {
      s.x += s.dx; s.y += s.dy;
      s.alpha += s.dAlpha;
      if (s.alpha < 0 || s.alpha > 0.8) s.dAlpha *= -1;
      if (s.y < -10) { s.y = canvas.height + 10; s.x = Math.random()*canvas.width; }
      ctx.save();
      ctx.globalAlpha = Math.max(0, s.alpha);
      ctx.fillStyle = s.color;
      ctx.shadowBlur = 10; ctx.shadowColor = s.color;
      ctx.beginPath();
      // Draw 6-point sparkle
      for (let i = 0; i < 12; i++) {
        const a = (i * Math.PI) / 6;
        const r = i % 2 === 0 ? s.size : s.size * 0.4;
        if (i === 0) ctx.moveTo(s.x + r*Math.cos(a), s.y + r*Math.sin(a));
        else         ctx.lineTo(s.x + r*Math.cos(a), s.y + r*Math.sin(a));
      }
      ctx.closePath(); ctx.fill();
      ctx.restore();
    });
    if (currentPage === 'page-message') requestAnimationFrame(loop);
  }
  loop();
}

/* ══════════════════════════════════════════
   FIREWORKS (canvas-confetti)
══════════════════════════════════════════ */
let fireworksInterval = null;

function launchFireworks() {
  if (fireworksInterval) clearInterval(fireworksInterval);
  let count = 0;
  fireworksInterval = setInterval(() => {
    count++;
    if (count > 30) { clearInterval(fireworksInterval); fireworksInterval = null; return; }
    confetti({
      particleCount: Math.floor(Math.random() * 80) + 40,
      angle: Math.random() * 360,
      spread: Math.random() * 120 + 60,
      startVelocity: Math.random() * 35 + 25,
      decay: 0.92,
      gravity: 0.8,
      origin: { x: Math.random(), y: Math.random() * 0.5 },
      colors: ['#ff6b9d','#ffd700','#ce93d8','#ff4081','#00e5ff','#ffffff'],
      shapes: ['circle','square'],
    });
  }, 250);
}

function bigConfetti() {
  const end = Date.now() + 5000;
  (function frame() {
    confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#ff6b9d','#ffd700','#ce93d8'] });
    confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#ff4081','#ffffff','#00e5ff'] });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

/* ══════════════════════════════════════════
   POPUP SPARKLES
══════════════════════════════════════════ */
function initPopupSparkles() {
  const container = document.getElementById('popup-sparkles');
  if (!container) return;
  container.innerHTML = '';
  for (let i = 0; i < 20; i++) {
    const s = document.createElement('div');
    s.className = 'sparkle';
    s.style.cssText = `
      left:${Math.random()*100}%;
      top:${Math.random()*100}%;
      --tx:${(Math.random()-0.5)*100}px;
      --ty:${(Math.random()-0.5)*100}px;
      --dur:${1+Math.random()*2}s;
      --delay:${Math.random()*2}s;
      background:${['#ffd700','#ff6b9d','#ce93d8','#fff'][Math.floor(Math.random()*4)]};
      width:${4+Math.random()*8}px;
      height:${4+Math.random()*8}px;
    `;
    container.appendChild(s);
  }
}

/* ══════════════════════════════════════════
   DOM DECORATIONS — Stars, Hearts, Balloons
══════════════════════════════════════════ */
function initStars() {
  const container = document.getElementById('stars');
  if (!container) return;
  for (let i = 0; i < 80; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const size = Math.random() * 3 + 1;
    s.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random()*100}%;
      top:${Math.random()*100}%;
      --dur:${1.5+Math.random()*3}s;
      --delay:${Math.random()*4}s;
    `;
    container.appendChild(s);
  }
}

function initFloatingHearts() {
  const container = document.getElementById('floating-hearts');
  if (!container) return;
  const emojis = ['❤️','💕','💖','💗','💓','🌹','✨','💫'];
  for (let i = 0; i < 15; i++) {
    const h = document.createElement('div');
    h.className = 'fheart';
    h.textContent = emojis[Math.floor(Math.random()*emojis.length)];
    h.style.cssText = `
      left:${Math.random()*95}%;
      --size:${1+Math.random()*1.5}rem;
      --dur:${4+Math.random()*6}s;
      --delay:${Math.random()*6}s;
    `;
    container.appendChild(h);
  }
}

function initBalloons() {
  const container = document.getElementById('balloons');
  if (!container) return;
  const balloonEmojis = ['🎈','🎀','🎊','🎉'];
  const colors = ['#ff6b9d','#ffd700','#ce93d8','#00e5ff','#ff4081','#69f0ae'];
  for (let i = 0; i < 8; i++) {
    const b = document.createElement('div');
    b.className = 'balloon';
    b.textContent = balloonEmojis[Math.floor(Math.random()*balloonEmojis.length)];
    b.style.cssText = `
      left:${Math.random()*90+5}%;
      --size:${2.5+Math.random()*2}rem;
      --dur:${7+Math.random()*8}s;
      --delay:${Math.random()*8}s;
    `;
    container.appendChild(b);
  }
}

/* ══════════════════════════════════════════
   FALLING FLOWERS (Page 7)
══════════════════════════════════════════ */
function initFallingFlowers() {
  const container = document.getElementById('falling-flowers');
  if (!container) return;
  container.innerHTML = '';
  const flowers = ['🌸','🌺','🌹','🌼','🌻','💐','🍀','🌷'];
  for (let i = 0; i < 18; i++) {
    const f = document.createElement('div');
    f.className = 'flower';
    f.textContent = flowers[Math.floor(Math.random()*flowers.length)];
    f.style.cssText = `
      left:${Math.random()*100}%;
      --size:${1+Math.random()*1.5}rem;
      --dur:${4+Math.random()*6}s;
      --delay:${Math.random()*6}s;
    `;
    container.appendChild(f);
  }
}

/* ══════════════════════════════════════════
   FLOATING HEARTS (Page 7)
══════════════════════════════════════════ */
function initFloatingHeartsMsg() {
  const container = document.getElementById('floating-hearts-msg');
  if (!container) return;
  container.innerHTML = '';
  const emojis = ['❤️','💕','💖','💗','💓'];
  for (let i = 0; i < 10; i++) {
    const h = document.createElement('div');
    h.className = 'fheart';
    h.textContent = emojis[Math.floor(Math.random()*emojis.length)];
    h.style.cssText = `
      left:${Math.random()*95}%;
      --size:${1.2+Math.random()*1.3}rem;
      --dur:${4+Math.random()*5}s;
      --delay:${Math.random()*5}s;
    `;
    container.appendChild(h);
  }
}

/* ══════════════════════════════════════════
   SHOOT HEARTS (welcome button click)
══════════════════════════════════════════ */
function shootHearts() {
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      confetti({
        particleCount: 30,
        spread: 100,
        origin: { x: 0.5, y: 0.6 },
        colors: ['#ff6b9d','#ffd700','#ce93d8'],
        shapes: ['circle'],
      });
    }, i * 120);
  }
}

/* ══════════════════════════════════════════
   GSAP ENHANCEMENTS (if GSAP available)
══════════════════════════════════════════ */
window.addEventListener('load', () => {
  if (typeof gsap === 'undefined') return;

  // Animate welcome content on load
  gsap.from('.welcome-content', {
    duration: 1.4,
    scale: 0.7,
    opacity: 0,
    ease: 'back.out(1.7)',
    delay: 0.3,
  });

  // Subtle star drift
  gsap.to('.star', {
    x: '+=10',
    y: '+=10',
    duration: 8,
    ease: 'none',
    stagger: 0.05,
    repeat: -1,
    yoyo: true,
  });
});

/* ══════════════════════════════════════════
   KEYBOARD NAVIGATION
══════════════════════════════════════════ */
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' && currentPage === 'page-calendar') nextDay();
  if (e.key === 'ArrowLeft'  && currentPage === 'page-calendar') prevDay();
  if (e.key === 'Escape') closeLightbox();
});

/* ══════════════════════════════════════════
   TOUCH SWIPE SUPPORT
══════════════════════════════════════════ */
let touchStartX = 0;
document.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; });
document.addEventListener('touchend', (e) => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 60 && currentPage === 'page-calendar') {
    if (dx < 0) nextDay();
    else prevDay();
  }
});
