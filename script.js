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