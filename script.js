// DARK MODE
const toggle = document.getElementById("theme-toggle");
if (toggle) {
  toggle.onclick = () => {
    document.body.classList.toggle("dark-mode");
  };
}

// TYPING EFFECT
const words = ["Full Stack Development ", "Software Engineering ", "Networking "];
let i=0,j=0,isDeleting=false;

function typeEffect(){
  const el = document.getElementById("typing-text");
  if(!el) return;

  let word = words[i];
  el.textContent = word.substring(0,j);

  if(!isDeleting) j++;
  else j--;

  if(j === word.length){
    isDeleting = true;
    setTimeout(typeEffect,1000);
    return;
  }

  if(j === 0){
    isDeleting = false;
    i = (i+1)%words.length;
  }

  setTimeout(typeEffect,100);
}
typeEffect();

// GITHUB PROJECTS
fetch("https://api.github.com/users/pyatrick666/repos")
.then(res=>res.json())
.then(data=>{
  const container = document.getElementById("github-projects");
  if(!container) return;

  container.innerHTML = "";

  data.slice(0,6).forEach(repo=>{
    const div = document.createElement("div");
    div.className="card";

    div.innerHTML = `
  <h3>${repo.name}</h3>
  <p>${repo.description || "No description"}</p>

  <div class="repo-stats">
    ⭐ ${repo.stargazers_count}
  </div>

  <a href="${repo.html_url}" target="_blank">
    <button class="repo-btn">Go to Repository</button>
  </a>
`;

    container.appendChild(div);
  });
});

// CONTACT FORM
const form = document.getElementById("contact-form");
if(form){
  form.addEventListener("submit", function(e){
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const mailtoLink = `mailto:pyatrick666@gmail.com?subject=Portfolio Contact from ${name}&body=${message} (${email})`;

    window.location.href = mailtoLink;
  });
}

// SKILL ANIMATION
const skillsSection = document.getElementById("skills");

if (skillsSection) {
  window.addEventListener("scroll", () => {
    const sectionTop = skillsSection.getBoundingClientRect().top;

    if (sectionTop < window.innerHeight - 100) {
      document.body.classList.add("loaded");
    }
  });
}

// fallback
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});
