// =============================================
// script.js — Shared across all pages
// =============================================


// ── 1. Theme Toggle (dark / light mode) ──────
const toggle = document.getElementById("theme-toggle");
if (toggle) {
  // Restore saved preference on page load
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    toggle.textContent = "☀️";
  }

  toggle.onclick = function () {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    toggle.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };
}


// ── 2. Snowfall Canvas Effect ─────────────────
let snowflakes = [];
let snowfallActive = true;

const canvas = document.createElement("canvas");
canvas.id = "snowfall-canvas";
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function createSnowflakes(count = 100) {
  snowflakes = [];
  for (let i = 0; i < count; i++) {
    snowflakes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 3 + 1,
      speed: Math.random() * 1 + 0.5
    });
  }
}
createSnowflakes();

function drawSnow() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (snowfallActive) {
    snowflakes.forEach(f => {
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();
      f.y += f.speed;
      if (f.y > canvas.height) {
        f.y = 0;
        f.x = Math.random() * canvas.width;
      }
    });
  }
  requestAnimationFrame(drawSnow);
}
drawSnow();

// Snowfall toggle button
const snowBtn = document.createElement("button");
snowBtn.id = "snow-toggle";
snowBtn.textContent = "❄ Toggle Snowfall";
document.body.appendChild(snowBtn);

snowBtn.onclick = function () {
  snowfallActive = !snowfallActive;
  snowBtn.style.background = snowfallActive ? "#0d6efd" : "#6c757d";
};


// ── 3. Typing Effect (index.html only) ───────
const typingEl = document.getElementById("typing-text");
if (typingEl) {
  const words = [
    "Full Stack Development ",
    "Software Engineering ",
    "Networking ",
    "and more "
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let currentWord = "";

  function typeEffect() {
    if (!isDeleting && charIndex <= words[wordIndex].length) {
      currentWord = words[wordIndex].substring(0, charIndex++);
    }
    if (isDeleting && charIndex >= 0) {
      currentWord = words[wordIndex].substring(0, charIndex--);
    }

    typingEl.textContent = currentWord;

    if (charIndex === words[wordIndex].length) {
      isDeleting = true;
      setTimeout(typeEffect, 1000);
      return;
    }
    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }

    setTimeout(typeEffect, 100);
  }

  typeEffect();
}


// ── 4. Scroll Reveal for <section> elements ──
const sections = document.querySelectorAll("section");
window.addEventListener("scroll", () => {
  sections.forEach(section => {
    if (section.getBoundingClientRect().top < window.innerHeight - 100) {
      section.classList.add("show");
    }
  });
});


// ── 5. Skill progress bar animation on load ──
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});


// ── 6. GitHub Repositories (index.html only) ─
const projectsContainer = document.getElementById("github-projects");
if (projectsContainer) {
  fetch("https://api.github.com/users/pyatrick666/repos")
    .then(res => res.json())
    .then(data => {
      projectsContainer.innerHTML = "";

      data.slice(0, 6).forEach(repo => {
        const languageBadge = repo.language
          ? `<span class="language-badge">${repo.language}</span>`
          : "";

        const card = document.createElement("div");
        card.className = "project-card";
        card.innerHTML = `
          <h3>${repo.name}</h3>
          <p>${repo.description || "No description provided."}</p>
          <div class="repo-meta">
            ${languageBadge}
            ⭐ ${repo.stargazers_count}
            🍴 ${repo.forks_count}
          </div>
          <a href="${repo.html_url}" target="_blank">
            <button>View Repository</button>
          </a>
        `;
        projectsContainer.appendChild(card);
      });
    })
    .catch(() => {
      projectsContainer.innerHTML = "<p>Could not load GitHub projects.</p>";
    });
}


// ── 7. JavaScript popup demo (javascript.html only) ──
function showPopup() {
  const input = document.getElementById("popup-input");
  if (!input) return;
  if (input.value.trim() === "") {
    alert("Please enter something!");
  } else {
    alert("You submitted: " + input.value);
  }
}
