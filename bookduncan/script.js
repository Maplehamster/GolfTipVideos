const calendar = document.getElementById('calendar');
const today = new Date();
const gecko = document.getElementById('gecko');
const flickSound = document.getElementById('flickSound');
const canvas = document.getElementById('tongueCanvas');
const ctx = canvas.getContext('2d');

// Set canvas to fill screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Generate 30-day calendar
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

  // Gecko slides in from right
  gecko.classList.add('strike');

  // Wait for gecko to slide in
  setTimeout(() => {
    playFlickSound();

    // Approximate gecko mouth position
    const geckoMouthX = window.innerWidth - 60;
    const geckoMouthY = window.innerHeight - 100;

    drawTongue(geckoMouthX, geckoMouthY, cursorX, cursorY);
    eatCursor();
  }, 500);
}

function playFlickSound() {
  flickSound.currentTime = 0;
  flickSound.play();
}

function eatCursor() {
  document.body.style.cursor = 'none';

  setTimeout(() => {
    document.body.style.cursor = 'default';
    gecko.classList.remove('strike');
    clearCanvas();
  }, 5000);
}

function drawTongue(x1, y1, x2, y2) {
  ctx.strokeStyle = 'red';
  ctx.lineWidth = 6;
  ctx.lineCap = 'round';

  let progress = 0;
  const duration = 250;
  const startTime = performance.now();

  function animate(time) {
    progress = (time - startTime) / duration;
    if (progress > 1) progress = 1;

    clearCanvas();

    const currentX = x1 + (x2 - x1) * progress;
    const currentY = y1 + (y2 - y1) * progress;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(currentX, currentY);
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
