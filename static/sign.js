let users = [];
let isLoggedIn = false;
let currentAction = "";

window.onload = () => {
  const modal = document.getElementById("myModal");
  const modalTitle = document.getElementById("modalTitle");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");

  document.getElementById("signIn").addEventListener("click", () => {
    modalTitle.textContent = "Sign In";
    currentAction = "login";
    usernameInput.value = "";
    passwordInput.value = "";
    modal.style.display = "flex";
  });

  document.getElementById("signUp").addEventListener("click", () => {
    modalTitle.textContent = "Sign Up";
    currentAction = "register";
    usernameInput.value = "";
    passwordInput.value = "";
    modal.style.display = "flex";
  });

  document.getElementById("modalForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

     if (!username.includes('@gmail.com') && password.length < 8) {
        alert("Please enter a valid email address and Password must contain 8 or more!");
        return;
    }

    if (!username.includes('@gmail.com')) {
        alert("Please enter a valid email address!");
        return;
    }

    if (password.length < 8) {
        alert("Password must contain 8 or more")
        return;
    }

    if (currentAction === "register") {
      if (users.find(u => u.username === username)) {
        alert("Username already exists");
        return;
      }

      users.push({ username, password });
      alert("Registration successful!");
    } else if (currentAction === "login") {
      const user = users.find(u => u.username === username && u.password === password);
      if (user) {
        isLoggedIn = true;
        alert("Log In Successfully!");
      } else {
        alert("Invalid username or password");
      }
    }

    modal.style.display = "none";
  });

  document.querySelector(".close").addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

};