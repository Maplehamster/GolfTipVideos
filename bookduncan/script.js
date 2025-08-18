// Setup
const calendar = document.getElementById('calendar');
const today = new Date();
const gecko = document.getElementById('gecko');
const flickSound = document.getElementById('flickSound');
const canvas = document.getElementById('tongueCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Calendar generation
for (let i = 0; i < 30; i++) {
  const date = new Date(today);
  date.setDate(today.getDate() + i);

  const day = document.createElement('div');
  day.className = 'day';
  day.textContent = date.toDateString();
  day.addEventListener('click', handleDateClick);
  calendar.appendChild(day);
}

function handleDateClick(e) {
  const cursorX = e.clientX;
  const cursorY = e.clientY;

  // Slide in gecko
  gecko.style.left = '100px';
  gecko.classList.add('strike');

  // After gecko slides in, flick tongue
  setTimeout(() => {
    playFlickSound();
    drawTongue(150, window.innerHeight / 2, cursorX, cursorY); // 150 = gecko tip X
    eatCursor();
  }, 500);
}

function eatCursor() {
  document.body.style.cursor = 'none';

  setTimeout(() => {
    document.body.style.cursor = 'default';
    gecko.style.left = '-200px';
    gecko.classList.remove('strike');
    clearCanvas();
  }, 5000);
}

function playFlickSound() {
  flickSound.currentTime = 0;
  flickSound.play();
}

function drawTongue(x1, y1, x2, y2) {
  ctx.strokeStyle = 'red';
  ctx.lineWidth = 4;

  // Animate tongue
  let progress = 0;
  const duration = 300;
  const startTime = performance.now();

  function animate(time) {
    progress = (time - startTime) / duration;
    if (progress > 1) progress = 1;

    clearCanvas();
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x1 + (x2 - x1) * progress, y1 + (y2 - y1) * progress);
    ctx.stroke();

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
