// =========================================================
// Pratik Poudel ePortfolio — Interactive Experience
// Shared across every page
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ── 1. Persistent theme ────────────────────────────────
  const toggle = document.getElementById("theme-toggle");

  function applyTheme(theme) {
    const dark = theme === "dark";
    body.classList.toggle("dark-mode", dark);
    if (toggle) {
      toggle.textContent = dark ? "☀️" : "🌙";
      toggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
      toggle.setAttribute("title", dark ? "Switch to light mode" : "Switch to dark mode");
    }
  }

  applyTheme(localStorage.getItem("theme") || "light");

  if (toggle) {
    toggle.addEventListener("click", () => {
      const next = body.classList.contains("dark-mode") ? "light" : "dark";
      localStorage.setItem("theme", next);
      applyTheme(next);
    });
  }

  // ── 2. Scroll progress + smart navbar ──────────────────
  const navbar = document.getElementById("navbar");

  const progressBar = document.createElement("div");
  progressBar.id = "scroll-progress";
  document.body.appendChild(progressBar);

  function updateScrollUI() {
    const scrollTop = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const percent = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;

    progressBar.style.width = percent + "%";

    if (navbar) {
      navbar.classList.toggle("scrolled", scrollTop > 35);
    }

    if (backTop) {
      backTop.classList.toggle("show", scrollTop > 500);
    }
  }

  window.addEventListener("scroll", updateScrollUI, { passive: true });

  // ── 3. Back-to-top button ──────────────────────────────
  const backTop = document.createElement("button");
  backTop.id = "back-to-top";
  backTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
  backTop.setAttribute("aria-label", "Back to top");
  backTop.title = "Back to top";
  document.body.appendChild(backTop);

  backTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  });

  updateScrollUI();

  // ── 4. Active navigation link ──────────────────────────
  const currentPage = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("#nav-links a").forEach(link => {
    const href = (link.getAttribute("href") || "").split("/").pop();
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });

  // ── 5. Scroll reveal for sections and visual elements ──
  const revealTargets = document.querySelectorAll(
    "section, .card, .project-card, .about-card, .skill-badge, .portfolio-header"
  );

  revealTargets.forEach((el, index) => {
    el.classList.add("reveal");
    if (index % 4 !== 0) el.classList.add("reveal-delay-" + (index % 4));
  });

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -45px 0px" });

    revealTargets.forEach(el => observer.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add("visible"));
  }

  // ── 6. Cursor glow + subtle trail ──────────────────────
  if (!prefersReducedMotion && window.matchMedia("(pointer:fine)").matches) {
    const glow = document.createElement("div");
    glow.id = "cursor-glow";
    document.body.appendChild(glow);

    let lastTrail = 0;

    window.addEventListener("pointermove", e => {
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
      glow.style.opacity = "1";

      const now = performance.now();
      if (now - lastTrail > 45) {
        const dot = document.createElement("span");
        dot.className = "cursor-dot";
        dot.style.left = e.clientX + "px";
        dot.style.top = e.clientY + "px";
        document.body.appendChild(dot);
        setTimeout(() => dot.remove(), 600);
        lastTrail = now;
      }
    });

    window.addEventListener("pointerleave", () => {
      glow.style.opacity = "0";
    });
  }

  // ── 7. Gentle 3D tilt for cards ────────────────────────
  if (!prefersReducedMotion && window.matchMedia("(pointer:fine)").matches) {
    document.querySelectorAll(".project-card, .skill-badge, .about-card, .card").forEach(card => {
      card.addEventListener("pointermove", e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform =
          "perspective(900px) rotateX(" + (-y * 5) + "deg) rotateY(" + (x * 5) + "deg) translateY(-5px)";
      });

      card.addEventListener("pointerleave", () => {
        card.style.transform = "";
      });
    });
  }

  // ── 8. Smooth internal anchor scrolling ─────────────────
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start"
      });
    });
  });

  // ── 9. Page transitions between portfolio pages ────────
  document.querySelectorAll('a[href$=".html"]').forEach(link => {
    link.addEventListener("click", e => {
      const href = link.getAttribute("href");
      if (!href || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;

      const targetUrl = new URL(href, window.location.href);
      if (targetUrl.origin !== window.location.origin || targetUrl.pathname === window.location.pathname) return;

      e.preventDefault();
      body.classList.add("page-leaving");
      setTimeout(() => { window.location.href = href; }, prefersReducedMotion ? 0 : 220);
    });
  });

  // ── 10. Typing effect ──────────────────────────────────
  const typingEl = document.getElementById("typing-text");

  if (typingEl) {
    const words = [
      "Full Stack Development",
      "Software Engineering",
      "Networking",
      "Creative Web Experiences"
    ];

    if (prefersReducedMotion) {
      typingEl.textContent = words[0];
    } else {
      let wordIndex = 0;
      let charIndex = 0;
      let deleting = false;

      function typeEffect() {
      const word = words[wordIndex];

      if (!deleting) {
        charIndex++;
        typingEl.textContent = word.substring(0, charIndex);

        if (charIndex === word.length) {
          deleting = true;
          setTimeout(typeEffect, 1300);
          return;
        }
      } else {
        charIndex--;
        typingEl.textContent = word.substring(0, charIndex);

        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
        }
      }

        setTimeout(typeEffect, deleting ? 55 : 85);
      }

      typeEffect();
    }
  }

  // ── 11. Skill progress animation ───────────────────────
  window.addEventListener("load", () => {
    body.classList.add("loaded");
  });

  // ── 12. GitHub repository cards + filters ─────────────
  const projectsContainer = document.getElementById("github-projects");

  if (projectsContainer) {
    projectsContainer.innerHTML = '<div class="github-loading"><span>Loading GitHub projects…</span></div>';

    fetch("https://api.github.com/users/pyatrick666/repos?sort=updated&per_page=30")
      .then(res => {
        if (!res.ok) throw new Error("GitHub API error");
        return res.json();
      })
      .then(data => {
        const repos = data.filter(repo => !repo.fork && !repo.archived);
        const languages = ["All", ...new Set(repos.map(repo => repo.language).filter(Boolean))];

        const toolbar = document.createElement("div");
        toolbar.className = "project-toolbar";
        toolbar.setAttribute("aria-label", "Filter GitHub projects");

        languages.forEach((language, index) => {
          const filter = document.createElement("button");
          filter.type = "button";
          filter.className = "project-filter" + (index === 0 ? " active" : "");
          filter.textContent = language;
          filter.dataset.language = language;
          toolbar.appendChild(filter);
        });

        const status = document.createElement("p");
        status.className = "project-status";
        status.setAttribute("aria-live", "polite");

        projectsContainer.innerHTML = "";
        projectsContainer.appendChild(toolbar);
        projectsContainer.appendChild(status);

        const grid = document.createElement("div");
        grid.className = "projects-grid";
        projectsContainer.appendChild(grid);

        const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({
          "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;"
        }[char]));

        function renderProjects(language) {
          const filtered = language === "All"
            ? repos.slice(0, 6)
            : repos.filter(repo => repo.language === language).slice(0, 6);

          grid.innerHTML = "";
          status.textContent = filtered.length
            ? filtered.length + " project" + (filtered.length === 1 ? "" : "s") + " shown"
            : "No projects found for this technology.";

          filtered.forEach((repo, index) => {
            const card = document.createElement("article");
            card.className = "project-card reveal visible";
            card.style.transitionDelay = (index * 60) + "ms";

            const languageBadge = repo.language
              ? '<span class="language-badge">' + escapeHTML(repo.language) + "</span>"
              : "";

            card.innerHTML = `
              <h3>${escapeHTML(repo.name)}</h3>
              <p>${escapeHTML(repo.description || "A project from my GitHub portfolio.")}</p>
              <div class="repo-meta">
                ${languageBadge}
                <span>⭐ ${repo.stargazers_count}</span>
                <span>🍴 ${repo.forks_count}</span>
              </div>
              <a class="repo-btn" href="#" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-github"></i> View Repository
              </a>
            `;
            const repoLink = card.querySelector(".repo-btn");
            if (repoLink && /^https:\/\/github\.com\//i.test(repo.html_url || "")) {
              repoLink.href = repo.html_url;
            } else if (repoLink) {
              repoLink.removeAttribute("href");
              repoLink.removeAttribute("target");
              repoLink.setAttribute("aria-disabled", "true");
            }

            grid.appendChild(card);
          });
        }

        toolbar.addEventListener("click", event => {
          const filter = event.target.closest(".project-filter");
          if (!filter) return;
          toolbar.querySelectorAll(".project-filter").forEach(button => button.classList.remove("active"));
          filter.classList.add("active");
          renderProjects(filter.dataset.language);
        });

        renderProjects("All");
      })
      .catch(() => {
        projectsContainer.innerHTML =
          '<p class="project-status">GitHub projects could not be loaded right now. <a href="https://github.com/pyatrick666" target="_blank" rel="noopener noreferrer">View my GitHub profile</a>.</p>';
      });
  }

  // ── 13. JavaScript popup demo ──────────────────────────
  window.showPopup = function () {
    const input = document.getElementById("popup-input");
    if (!input) return;

    const value = input.value.trim();
    if (!value) {
      alert("Please enter something!");
      return;
    }

    alert("You submitted: " + value);
  };

  // ── 14. Keyboard shortcut: Home ────────────────────────
  document.addEventListener("keydown", e => {
    if (e.key === "Home" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {

  // ── 15. Contact form mailto helper ─────────────────────
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", event => {
      event.preventDefault();
      const name = document.getElementById("contactName")?.value.trim();
      const email = document.getElementById("contactEmail")?.value.trim();
      const message = document.getElementById("contactMessage")?.value.trim();
      const status = document.getElementById("contactStatus");

      if (!name || !email || !message) {
        if (status) status.textContent = "Please complete all fields before opening your email draft.";
        return;
      }

      const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      window.location.href = `mailto:pyatrick666@gmail.com?subject=${subject}&body=${body}`;
      if (status) status.textContent = "Opening your email application…";
    });
  }

  // ── 16. Character counter used by the JavaScript demo ──
  window.updateCount = function () {
    const textarea = document.getElementById("bioInput");
    const counter = document.getElementById("charCount");
    if (!textarea || !counter) return;

    const length = textarea.value.length;
    counter.textContent = length;

    if (length < 100) {
      counter.style.color = "green";
    } else if (length <= 130) {
      counter.style.color = "orange";
    } else {
      counter.style.color = "red";
    }
  };
});

// Keep page-transition entrance lightweight.
window.addEventListener("pageshow", () => {
  document.body.classList.remove("page-leaving");
});
