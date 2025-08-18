// script.js — Fixed: Calendar visible, tongue from correct side, and working cursor hide

const gecko = document.getElementById('gecko');
const flickSound = document.getElementById('flickSound');
const canvas = document.getElementById('tongueCanvas');
const ctx = canvas.getContext('2d');
const calendar = document.getElementById('calendar');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
  cursorX = e.clientX;
  cursorY = e.clientY;
});

// Generate 30-day calendar
const today = new Date();
for (let i = 0; i < 30; i++) {
  const date = new Date(today);
  date.setDate(today.getDate() + i);
  const day = document.createElement('div');
  day.className = 'day';
  day.textContent = date.toDateString();
  day.addEventListener('click', () => startGeckoAttack());
  calendar.appendChild(day);
}

function startGeckoAttack() {
  gecko.style.transition = 'none';
  gecko.style.right = '-150px';
  gecko.style.display = 'block';

  setTimeout(() => {
    gecko.style.transition = 'right 0.2s ease-in';
    gecko.style.right = '30px';

    setTimeout(() => {
      playFlickSound();

      const geckoRect = gecko.getBoundingClientRect();
      const mouthX = geckoRect.left + 20; // correct side for flipped gecko
      const mouthY = geckoRect.top + geckoRect.height / 2;

      drawTongue(mouthX, mouthY, cursorX, cursorY, () => {
        hideCursor();
        retractGecko();
      });
    }, 200);
  }, 10);
}

function hideCursor() {
  document.body.classList.add('hide-cursor');
  setTimeout(() => {
    document.body.classList.remove('hide-cursor');
  }, 5000);
}

function retractGecko() {
  gecko.style.transition = 'right 0.2s ease-out';
  gecko.style.right = '-150px';
}

function playFlickSound() {
  flickSound.currentTime = 0;
  flickSound.play();
}

function drawTongue(x1, y1, x2, y2, onComplete) {
  ctx.strokeStyle = 'red';
  ctx.lineWidth = 6;
  ctx.lineCap = 'round';

  let progress = 0;
  const duration = 100;
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
    } else {
      setTimeout(() => {
        clearCanvas();
        onComplete();
      }, 50);
    }
  }

  requestAnimationFrame(animate);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
