let history = JSON.parse(localStorage.getItem("moods")) || [];
let streak = localStorage.getItem("streak") || 0;
let theme = localStorage.getItem("theme") || "light";

if (theme === "dark") {
  document.body.classList.add("dark");
}

document.getElementById("streak").innerText = "🔥 Streak: " + streak + " days";
renderHistory();

function logMood() {
  const mood = document.getElementById("mood").value;
  if (!mood) {
    alert("Select a mood!");
    return;
  }

  const date = new Date().toLocaleDateString();
  history.push({ mood, date });
  localStorage.setItem("moods", JSON.stringify(history));

  updateStreak();
  generateExperience(mood);
  renderHistory();
}

function generateExperience(mood) {
  const msg = document.getElementById("message");
  const music = document.getElementById("music");
  const challenge = document.getElementById("challenge");

  const data = {
    happy: ["You're glowing with positivity 🌞", "Upbeat playlist", "Compliment 3 people"],
    sad: ["You're stronger than you know 💙", "Lo-fi or piano", "Write 3 gratitudes"],
    focus: ["Deep work activated 🔥", "Coding beats", "25 min no-distraction session"],
    stress: ["Breathe. Reset. Continue 🌿", "Nature sounds", "5 deep breaths"],
    excited: ["Channel your energy 🚀", "Motivation mix", "Start a mini project"]
  };

  msg.innerText = data[mood][0];
  music.innerText = "🎵 Music: " + data[mood][1];
  challenge.innerText = "🎯 Challenge: " + data[mood][2];
}

function renderHistory() {
  const list = document.getElementById("history");
  list.innerHTML = "";
  history.slice().reverse().forEach(item => {
    const li = document.createElement("li");
    li.innerText = `${item.date} — ${item.mood}`;
    list.appendChild(li);
  });
}

function updateStreak() {
  streak++;
  localStorage.setItem("streak", streak);
  document.getElementById("streak").innerText = "🔥 Streak: " + streak + " days";
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  theme = document.body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("theme", theme);
}

function exportPDF() {
  window.print();
}
