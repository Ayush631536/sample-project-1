document.addEventListener("click", function(e) {
  if (e.target.closest(".logout")) {
    console.log("Logout triggered ✅"); // debug
    logout();
  }
});


document.addEventListener("DOMContentLoaded", () => {

  console.log("AUTH LOADED ✅");

  const container = document.getElementById("container");

  // ================= PANEL TOGGLE =================
  document.getElementById("registerBtn")?.addEventListener("click", () => {
    container?.classList.add("right-active");
  });

  document.getElementById("loginBtn")?.addEventListener("click", () => {
    container?.classList.remove("right-active");
  });

  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");

  // ================= REGISTER =================
  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("registerName")?.value.trim();
      const email = document.getElementById("registerEmail")?.value.trim();
      const password = document.getElementById("registerPassword")?.value.trim();
      const confirmPassword = document.getElementById("confirmPassword")?.value.trim();

      if (!name || !email || !password || !confirmPassword) {
        alert("Please fill all fields!");
        return;
      }

      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      let users = JSON.parse(localStorage.getItem("users")) || [];

      const userExists = users.some(user => user.email === email);

      if (userExists) {
        showToast("User already exists!", "warning");
        return;
      }

      users.push({ name, email, password });
      localStorage.setItem("users", JSON.stringify(users));

      showToast("Registration successful!", "success");

      registerForm.reset();
      container?.classList.remove("right-active");
    });
  }

  // ================= LOGIN =================
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("loginEmail")?.value.trim();
      const password = document.getElementById("loginPassword")?.value.trim();

      if (!email || !password) {
        showToast("Please enter email and password!");
        return;
      }

      let users = JSON.parse(localStorage.getItem("users")) || [];

      const validUser = users.find(
        user => user.email === email && user.password === password
      );

      if (validUser) {
        localStorage.setItem("currentUser", JSON.stringify(validUser));

        setTimeout(() => {
          window.location.href = "../projects/index.html";
        }, 1200);

      } else {
        showToast("Invalid email or password!", "error");
      }
    });
  }

  // ================= LOGOUT BUTTON =================
  const logoutBtn = document.querySelector(".logout");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
  }

  // ================= PROTECT PAGES =================
  const protectedPages = ["index.html", "tutorials.html" , "3D-models.html"]; // add more if needed
  const currentPage = window.location.pathname.split("/").pop();

  if (protectedPages.includes(currentPage)) {
    if (!localStorage.getItem("currentUser")) {
      window.location.href = "../projects/homepage.html"; // redirect if not logged in
    }
  }

});


// ================= LOGOUT FUNCTION =================
function logout() {
  console.log("Inside logout function ");

  localStorage.removeItem("currentUser");

  window.location.href = "../projects/homepage.html";
}

// ================= TOAST FUNCTION =================
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");

  if (!toast) return;

  toast.textContent = message;
  toast.className = `show toast-${type}`;

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}