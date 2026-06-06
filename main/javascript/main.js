// 🔹 Load reusable components
async function loadComponent(id, path, callback) {
  try {
    const res = await fetch(path);

    if (!res.ok) throw new Error(`Failed to load ${path}`);

    const data = await res.text();
    document.getElementById(id).innerHTML = data;

    if (callback) callback();

  } catch (error) {
    console.error("Component Load Error:", error);
  }
}

// 🔥 LOAD NAVBAR
loadComponent("navbar", "../components/navbar.html", () => {
  if (typeof initNavbar === "function") initNavbar();
});

loadComponent("login-navbar", "../components/login-nav.html", () => {
  if (typeof initNavbar === "function") initNavbar();
});

// 🔻 FOOTER
loadComponent("footer", "../components/footer.html");


// 🎯 COURSES
function initCourses() {
  const cards = document.querySelectorAll(".course-card");

  cards.forEach(card => {
    card.addEventListener("click", () => {
      window.location.href = "courses.html";
    });
  });
}


// 🎬 PROJECTS
function initProjects() {
  const cards = document.querySelectorAll(".project-card");

  // Hover play
  cards.forEach(card => {
    const video = card.querySelector("video");

    card.addEventListener("mouseenter", () => video.play());
    card.addEventListener("mouseleave", () => {
      video.pause();
      video.currentTime = 0;
    });
  });

  // Scroll reveal
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  }, { threshold: 0.2 });

  cards.forEach(card => observer.observe(card));

  console.log("Projects loaded 🎬");
}


// 💎 MODELS
function initModels() {
  const cards = document.querySelectorAll(".model-card");
  const searchInput = document.getElementById("searchInput");
  const buttons = document.querySelectorAll(".model-filters button");

  // 🔍 SEARCH
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const value = searchInput.value.toLowerCase().split(" ");

      cards.forEach(card => {
        const name = card.dataset.name.toLowerCase();
        const match = value.every(word => name.includes(word));
        card.style.display = match ? "block" : "none";
      });
    });
  }

  // 🎯 FILTER
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelector(".active")?.classList.remove("active");
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      cards.forEach(card => {
        card.style.display =
          (filter === "all" || card.classList.contains(filter)) ? "block" : "none";
      });
    });
  });

  console.log("Marketplace loaded 💎");
}


// 🚀 INIT EVERYTHING SAFELY
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    initCourses();
    initProjects();
    initModels();
  }, 300);
});


function openVideo(url) {
  window.open(url, "_blank");
}
