// Theme toggle — safe on all pages, persists across pages via localStorage
const toggle = document.getElementById("theme-toggle");

// Apply saved dark mode preference on every page load
(function () {
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
    if (toggle) toggle.textContent = "☀️";
  }
})();

if (toggle) {
  toggle.onclick = function () {
    const isDark = document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
    toggle.textContent = isDark ? "☀️" : "🌙";
  };
}

// Popup JS Demo
function showPopup(){
  const input = document.getElementById("popup-input");
  if(!input) return;
  if(input.value.trim() === ""){
    alert("Please enter something!");
  } else {
    alert("You submitted: " + input.value);
  }
}

// Smooth scroll for on-page anchor links only
document.querySelectorAll('#navbar ul li a').forEach(link=>{
  link.addEventListener('click', e=>{
    const href = link.getAttribute('href');
    if(href && href.startsWith('#')){
      e.preventDefault();
      const target = document.querySelector(href);
      if(target) target.scrollIntoView({behavior:'smooth'});
    }
  });
});

// Snowflake effect
let snowflakes = [];
let snowfallActive = localStorage.getItem("snowfall") !== "disabled";

const canvas = document.createElement("canvas");
canvas.id = "snowfall-canvas";
canvas.style.cssText = "position:fixed;top:0;left:0;pointer-events:none;z-index:0;";
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function createSnowflakes(count=100) {
  snowflakes = [];
  for(let i=0;i<count;i++){
    snowflakes.push({
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height,
      radius: Math.random()*3 + 1,
      speed: Math.random()*1 + 0.5
    });
  }
}
createSnowflakes();

function drawSnow() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  if(snowfallActive){
    snowflakes.forEach(f=>{
      ctx.beginPath();
      ctx.arc(f.x,f.y,f.radius,0,Math.PI*2);
      ctx.fillStyle="rgba(255,255,255,0.8)";
      ctx.fill();
      f.y += f.speed;
      if(f.y>canvas.height){ f.y=0; f.x=Math.random()*canvas.width; }
    });
  }
  requestAnimationFrame(drawSnow);
}
drawSnow();

const snowBtn = document.createElement("button");
snowBtn.id = "snow-toggle";
snowBtn.textContent = "❄ Toggle Snowfall";
snowBtn.style.cssText = "position:fixed;bottom:60px;right:20px;z-index:9999;padding:8px 14px;font-size:0.85rem;";
document.body.appendChild(snowBtn);

// Apply saved snowfall state to button on load
snowBtn.style.background = snowfallActive ? "#0d6efd" : "#6c757d";

snowBtn.onclick = function(){
  snowfallActive = !snowfallActive;
  localStorage.setItem("snowfall", snowfallActive ? "enabled" : "disabled");
  snowBtn.style.background = snowfallActive ? "#0d6efd" : "#6c757d";
};

// Fetch GitHub repos — only runs on pages that have the container
const container = document.getElementById("github-projects");
if(container){
  fetch("https://api.github.com/users/pyatrick666/repos")
  .then(response => response.json())
  .then(data => {
    container.innerHTML = "";
    data.slice(0,6).forEach(repo => {
      let languageBadge = repo.language ? `<span class="language-badge">${repo.language}</span>` : "";
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
        <a href="${repo.html_url}" target="_blank"><button>View Repository</button></a>
      `;
      container.appendChild(card);
    });
  })
  .catch(err => console.error("GitHub fetch failed:", err));
}

// Typing effect — only runs if #typing-text exists (index.html only)
const typingEl = document.getElementById("typing-text");
if(typingEl){
  const words = [
    "Full Stack Development ",
    "Software Engineering ",
    "Networking ",
    "and more "
  ];

  let i = 0, j = 0, currentWord = "", isDeleting = false;

  function typeEffect(){
    if(!isDeleting && j <= words[i].length){
      currentWord = words[i].substring(0, j++);
    }
    if(isDeleting && j >= 0){
      currentWord = words[i].substring(0, j--);
    }

    typingEl.textContent = currentWord;

    if(j === words[i].length){
      isDeleting = true;
      setTimeout(typeEffect, 1000);
      return;
    }

    if(isDeleting && j === 0){
      isDeleting = false;
      i = (i + 1) % words.length;
    }

    setTimeout(typeEffect, 100);
  }

  typeEffect();
}

// Scroll reveal for sections
const sections = document.querySelectorAll("section");
window.addEventListener("scroll", ()=>{
  sections.forEach(section=>{
    if(section.getBoundingClientRect().top < window.innerHeight - 100){
      section.classList.add("show");
    }
  });
});

// Trigger loaded class
window.onload = function(){
  document.body.classList.add("loaded");
};
