// Generate 30-day calendar
const calendar = document.getElementById('calendar');
const today = new Date();

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
  // Gecko animation
  const gecko = document.getElementById('gecko');
  gecko.style.left = '100px'; // Slides in
  setTimeout(() => {
    eatCursor();
  }, 500);
}

function eatCursor() {
  // Hide cursor
  document.body.style.cursor = 'none';

  // Optional: Add a “slurp” sound here if you want

  // Wait 5 seconds, bring cursor back
  setTimeout(() => {
    document.body.style.cursor = 'default';
    // Hide gecko again
    document.getElementById('gecko').style.left = '-200px';
  }, 5000);
}

