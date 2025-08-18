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

let cursorX = 0;
let cursorY = 0;

// Track real-time cursor position
document.addEventListener('mousemove', (e) => {
  cursorX = e.clientX;
  cursorY = e.clientY;
});

document.addEventListener('click', () => {
  startGeckoAttack();
});

function startGeckoAttack() {
  // Place gecko off-screen
  gecko.style.transition = 'none';
  gecko.style.right = '-150px';
  gecko.style.display = 'block';

  // Trigger dart-in
  setTimeout(() => {
    gecko.style.transition = 'right 0.2s ease-in';
    gecko.style.right = '30px';

    setTimeout(() => {
      playFlickSound();

      const mouthX = window.innerWidth - 60;
      const mouthY = window.innerHeight - 100;

      drawTongue(mouthX, mouthY, cursorX, cursorY, () => {
        eatCursor();
        retractGecko();
      });
    }, 200);
  }, 10);
}

function playFlickSound() {
  flickSound.currentTime = 0;
  flickSound.play();
}

function eatCursor() {
  document.body.style.cursor = 'none';
  setTimeout(() => {
    document.body.style.cursor = 'default';
  }, 5000);
}

function retractGecko() {
  gecko.style.transition = 'right 0.2s ease-out';
  gecko.style.right = '-150px';
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
