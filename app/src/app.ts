const clock = document.getElementById("clock") as HTMLSpanElement;

function updateClock() {
  const now = new Date();
  clock.textContent = now.toLocaleTimeString();

  /* ms remaining until next second */
  const delay = 1000 - now.getMilliseconds();

  setTimeout(updateClock, delay);
}

updateClock();