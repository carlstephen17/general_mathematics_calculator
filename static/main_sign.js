let users = [];
let isLoggedIn = false;
let currentAction = "login"; 

window.onload = () => {
  const modal = document.getElementById("myModal");
  const modalTitle = document.getElementById("modalTitle");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const account = document.getElementById("account");
  const sign = document.getElementById("sign");

  sign.addEventListener("click", () => {
    if (currentAction === "login") {
      modalTitle.textContent = "Sign Up";
      account.textContent = "Already have an account?";
      sign.textContent = "Sign In";
      currentAction = "register";
    } else {
      modalTitle.textContent = "Sign In";
      account.textContent = "Don't have an account?";
      sign.textContent = "Sign Up";
      currentAction = "login";
    }
    usernameInput.value = "";
    passwordInput.value = "";
    modal.style.display = "block";
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
      modalTitle.textContent = "Sign In";
      account.textContent = "Don't have an account?";
      sign.textContent = "Sign Up";
      currentAction = "login";
    } else if (currentAction === "login") {
      const user = users.find(u => u.username === username && u.password === password);
      if (user) {
        isLoggedIn = true;
        alert("Log In Successfully!");
        modal.style.display = "none";
      } else {
        alert("Invalid username or password");
      }
    }
  });
};