function initNavbar() {
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".nav-links a");

  if (!navbar) return;

  console.log("Navbar initialized ✅");

  // 🔥 SCROLL EFFECT (blur + darker background)
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // 🎯 ACTIVE TAB HIGHLIGHT
  const currentPage = window.location.pathname.split("/").pop();

  navLinks.forEach(link => {
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });

  // 🖱️ CLICK FEEDBACK (optional)
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      console.log("Navigating to:", link.innerText);
    });
  });
}
