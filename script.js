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
  // hide all tabs
  document.querySelectorAll(".tab").forEach(tab => {
    tab.style.display = "none";
  });

  // show selected tab
  document.getElementById(id).style.display = "block";

  // reset nav buttons
  document.querySelectorAll(".nav button").forEach(btn => {
    btn.classList.remove("active");
  });

  // activate clicked tab
  const activeBtn = document.querySelector(`[onclick="showTab('${id}')"]`);
  if (activeBtn) activeBtn.classList.add("active");
}

/* =====================
   NIGHT MODE
===================== */
function toggleNight() {
  document.body.classList.toggle("night");
}

/* =====================
   TO-DO LIST (LocalStorage)
===================== */
let todos = JSON.parse(localStorage.getItem("todos")) || [];

function renderTodos() {
  const list = document.getElementById("todoList");
  list.innerHTML = "";

  todos.forEach((task, index) => {
    const div = document.createElement("div");
    div.className = "todo-item";

    div.innerHTML = `
      <input type="checkbox" ${task.done ? "checked" : ""}>
      <span>${task.text}</span>
      <button onclick="deleteTask(${index})">✕</button>
    `;

    div.querySelector("input").addEventListener("change", () => {
      todos[index].done = !todos[index].done;
      saveTodos();
    });

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

function deleteTask(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
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

/* =====================
   INIT
===================== */
document.addEventListener("DOMContentLoaded", () => {
  updateTimer();
  showMantra();
  renderTodos();
  showTab("home");
});


