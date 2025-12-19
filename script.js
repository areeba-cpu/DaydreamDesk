/* =====================
   TIMER (Pomodoro)
===================== */
let time = 1500;
let interval = null;

function updateTimer() {
  const min = Math.floor(time / 60);
  const sec = String(time % 60).padStart(2, "0");
  document.getElementById("timer").textContent = `${min}:${sec}`;
}

function startTimer() {
  if (interval) return;
  interval = setInterval(() => {
    if (time <= 0) {
      pauseTimer();
      return;
    }
    time--;
    updateTimer();
  }, 1000);
}

function pauseTimer() {
  clearInterval(interval);
  interval = null;
}

function resetTimer() {
  pauseTimer();
  time = 1500;
  updateTimer();
}

/* =====================
   MANTRAS
===================== */
const mantras = [
  "gentle focus brings growth 🌱",
  "progress over perfection",
  "you are exactly where you need to be",
  "soft effort still counts",
  "one step at a time 🌸"
];

function showMantra() {
  document.getElementById("mantra").textContent =
    mantras[Math.floor(Math.random() * mantras.length)];
}

/* =====================
   WEATHER (Open-Meteo)
===================== */
const LAT = 38.9;
const LON = -77.0;

const weatherDescriptions = {
  0: "Clear sky",
  1: "Mostly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Foggy",
  48: "Foggy",
  51: "Light drizzle",
  61: "Rainy",
  71: "Snowy",
  80: "Rain showers",
  95: "Thunderstorms"
};

fetch(
  `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current_weather=true&temperature_unit=fahrenheit&timezone=auto`
)
  .then(res => res.json())
  .then(data => {
    const temp = Math.round(data.current_weather.temperature);
    const code = data.current_weather.weathercode;
    const desc = weatherDescriptions[code] || "Calm weather";

    document.getElementById("weather").innerHTML = `
      🌤 ${temp}°F — ${desc}
    `;
  });

/* =====================
   TABS
===================== */
function showTab(id) {
  document.querySelectorAll(".tab").forEach(tab => {
    tab.style.display = "none";
  });
  document.getElementById(id).style.display = "block";
}

/* =====================
   NIGHT MODE
===================== */
function toggleNight() {
  document.body.classList.toggle("night");
}



l/* =====================
   TO-DO LIST (via Node.js API)
   ===================== */

let todos = [];

function renderTodos() {
  const list = document.getElementById("todoList");
  list.innerHTML = "";

  todos.forEach((task, index) => {
    const div = document.createElement("div");
    div.className = "todo-item";
    if (task.done) div.classList.add("completed");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;

    checkbox.addEventListener("change", () => {
      todos[index].done = checkbox.checked;
      saveTodos();
      renderTodos();
    });

    const text = document.createElement("span");
    text.textContent = task.text;

    const btn = document.createElement("button");
    btn.textContent = "✕";
    btn.onclick = () => {
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
    };

    div.appendChild(checkbox);
    div.appendChild(text);
    div.appendChild(btn);
    list.appendChild(div);
  });
}

function addTask() {
  const input = document.getElementById("newTask");
  if (!input.value.trim()) return;

  todos.push({ text: input.value, done: false });
  input.value = "";
  saveTodos();
  renderTodos();
}

function saveTodos() {
  fetch("/api", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: 1,
      items: todos
    })
  });
}

function loadTodos() {
  fetch("/api")
    .then(res => res.json())
    .then(data => {
      todos = data[0]?.items || [];
      renderTodos();
    });
}



/* =====================
   SOUNDBOARD (Local MP3s)
===================== */
const sounds = {
  rain: "sounds/rain.mp3",
  waves: "sounds/waves.mp3",
  wind: "sounds/wind.mp3"
};

let currentSound = null;

function playSound(name) {
  if (currentSound) {
    currentSound.pause();
    currentSound.currentTime = 0;
  }

  currentSound = new Audio(sounds[name]);
  currentSound.loop = true;
  currentSound.volume = 0.5;
  currentSound.play();
}

function stopSound() {
  if (currentSound) {
    currentSound.pause();
    currentSound.currentTime = 0;
    currentSound = null;
  }
}
function activateButton(button) {
  document.querySelectorAll(".action-btn").forEach(btn => {
    btn.classList.remove("active");
  });
  button.classList.add("active");
}

/* =====================
   INIT
===================== */
document.addEventListener("DOMContentLoaded", () => {
  updateTimer();
  showMantra();
  loadTodos();
  showTab("home");
});

