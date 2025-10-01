// DOM Elements
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const titleEl = document.querySelector(".title");
const endDateEl = document.getElementById("end-date");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
const setBtn = document.getElementById("set-btn");
const errorMsg = document.getElementById("error-msg");

const datePicker = document.getElementById("date-picker");
const timePicker = document.getElementById("time-picker");

// Timer state
let targetTime = null;
let originalTargetTime = null;
let timerRunning = true;
let timerInterval = null;

// Format numbers to 2 digits
function formatNumber(num) {
  return String(num).padStart(2, "0");
}

// Update countdown display
function updateCountdown() {
  if (!targetTime || !timerRunning) return;

  const now = Date.now();
  const remaining = targetTime - now;

  if (remaining <= 0) {
    daysEl.textContent = hoursEl.textContent = minutesEl.textContent = secondsEl.textContent = "00";
    titleEl.textContent = "🎉 Time's Up!";
    clearInterval(timerInterval);
    return;
  }

  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((remaining / (1000 * 60)) % 60);
  const seconds = Math.floor((remaining / 1000) % 60);

  daysEl.textContent = formatNumber(days);
  hoursEl.textContent = formatNumber(hours);
  minutesEl.textContent = formatNumber(minutes);
  secondsEl.textContent = formatNumber(seconds);
}

// Start timer
function startTimer() {
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(updateCountdown, 1000);
  updateCountdown();
}

// Pause/Resume
pauseBtn.addEventListener("click", () => {
  if (!targetTime) return;
  timerRunning = !timerRunning;
  pauseBtn.textContent = timerRunning ? "Pause" : "Resume";
});

// Reset
resetBtn.addEventListener("click", () => {
  if (!originalTargetTime) return;
  targetTime = originalTargetTime;
  timerRunning = true;
  titleEl.textContent = "Countdown Timer ⏳";
  pauseBtn.textContent = "Pause";
  startTimer();
});

// Set countdown
function setCountdown() {
  errorMsg.textContent = "";

  const dateValue = datePicker.value;
  const timeValue = timePicker.value;

  if (!dateValue || !timeValue) {
    errorMsg.textContent = "Please enter both date and time.";
    return;
  }

  const parsedDate = new Date(`${dateValue}T${timeValue}`);

  if (isNaN(parsedDate.getTime())) {
    errorMsg.textContent = "Invalid date or time.";
    return;
  }

  if (parsedDate.getTime() <= Date.now()) {
    errorMsg.textContent = "Date/time must be in the future.";
    return;
  }

  targetTime = parsedDate.getTime();
  originalTargetTime = targetTime;

  // Professional date/time format
  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  };
  endDateEl.textContent = `Countdown to: ${parsedDate.toLocaleString('en-US', options)}`;

  titleEl.textContent = "Countdown Started ⏱️";
  pauseBtn.disabled = false;
  resetBtn.disabled = false;

  startTimer();
}

setBtn.addEventListener("click", setCountdown);
