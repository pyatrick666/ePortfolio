// Theme toggle
const toggle = document.getElementById("theme-toggle");
toggle.onclick = function() {
  document.body.classList.toggle("dark-mode");
  toggle.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
}

// Popup JS Demo
function showPopup(){
  const input = document.getElementById("popup-input").value;
  if(input.trim() === ""){
    alert("Please enter something!");
  } else {
    alert("You submitted: " + input);
  }
}

// Smooth scroll for navbar links
document.querySelectorAll('#navbar ul li a').forEach(link=>{
  link.addEventListener('click', e=>{
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target.scrollIntoView({behavior:'smooth'});
  });
});
// Snowflake effect
let snowflakes = [];
let snowfallActive = true;

// Canvas setup
const canvas = document.createElement("canvas");
canvas.id = "snowfall-canvas";
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Create snowflakes
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

// Animate snowflakes
function drawSnow() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  if(snowfallActive){
    snowflakes.forEach(f=>{
      ctx.beginPath();
      ctx.arc(f.x,f.y,f.radius,0,Math.PI*2);
      ctx.fillStyle="white";
      ctx.fill();
      f.y += f.speed;
      if(f.y>canvas.height){ f.y=0; f.x=Math.random()*canvas.width; }
    });
  }
  requestAnimationFrame(drawSnow);
}
drawSnow();

// Toggle snowfall button
const snowBtn = document.createElement("button");
snowBtn.id = "snow-toggle";
snowBtn.textContent = "❄ Toggle Snowfall";
document.body.appendChild(snowBtn);
snowBtn.onclick = function(){
  snowfallActive = !snowfallActive;
  snowBtn.style.background = snowfallActive ? "#0d6efd" : "#6c757d";
};
/// Fetch GitHub repositories
fetch("https://api.github.com/users/pyatrick666/repos")
.then(response => response.json())
.then(data => {

const container = document.getElementById("github-projects");
container.innerHTML = "";

data.slice(0,6).forEach(repo => {

let languageBadge = "";

if(repo.language){
languageBadge = `<span class="language-badge">${repo.language}</span>`;
}

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

container.appendChild(card);

});

});
const words = [
"Full Stack Developement ",
"Software Engineering ",
"Networking ",
"and more "
];

let i = 0;
let j = 0;
let currentWord = "";
let isDeleting = false;

function typeEffect(){

const element = document.getElementById("typing-text");

if(i < words.length){

if(!isDeleting && j <= words[i].length){
currentWord = words[i].substring(0,j++);
}

if(isDeleting && j >= 0){
currentWord = words[i].substring(0,j--);
}

element.textContent = currentWord;

if(j == words[i].length){
isDeleting = true;
setTimeout(typeEffect,1000);
return;
}

if(isDeleting && j === 0){
isDeleting = false;
i++;
if(i === words.length){
i = 0;
}
}

}

setTimeout(typeEffect,100);

}

typeEffect();
const sections = document.querySelectorAll("section");

window.addEventListener("scroll",()=>{

sections.forEach(section=>{

const sectionTop = section.getBoundingClientRect().top;

if(sectionTop < window.innerHeight - 100){
section.classList.add("show");
}

});

});
// trigger skill animation on load
window.onload = function(){
  document.body.classList.add("loaded");
};