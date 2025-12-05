window.onload = () => {
    const modal = document.getElementById("myModal");
    const modalTitle = document.getElementById("modalTitle");
    const usernameInput = document.getElementById("usernameInput");
    const passwordInput = document.getElementById("passwordInput");
    const accountText = document.getElementById("accountText");
    const toggleSignBtn = document.getElementById("toggleSignBtn");
    const submitBtn = document.getElementById("submitBtn");
    const modalForm = document.getElementById("modalForm");
    const logoutLink = document.getElementById("logoutLink");

    let currentAction = "login";

    if (loggedOut === "true") {
        alert("Logged out successfully!");
        modal.classList.add("show");
    }

    if (!loggedInUser || loggedInUser === "") {
        modal.classList.add("show");

        window.addEventListener("click", (e) => {
            if (e.target === modal) e.stopPropagation();
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") e.preventDefault();
        });

        const navLinks = document.querySelectorAll("nav a");
        navLinks.forEach(link => {
            link.addEventListener("click", (e) => {
                if (modal.classList.contains("show")) e.preventDefault();
            });
        });

        toggleSignBtn.addEventListener("click", () => {
            if (currentAction === "login") {
                modalTitle.textContent = "Sign Up";
                accountText.textContent = "Already have an account?";
                toggleSignBtn.textContent = "Sign In";
                submitBtn.textContent = "Register";
                currentAction = "register";
            } else {
                modalTitle.textContent = "Sign In";
                accountText.textContent = "Don't have an account?";
                toggleSignBtn.textContent = "Sign Up";
                submitBtn.textContent = "Login";
                currentAction = "login";
            }
            usernameInput.value = "";
            passwordInput.value = "";
        });

        modalForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();

            if (!username || !password) {
                alert("Enter username and password");
                return;
            }
            if (!username.endsWith("@gmail.com")) {
                alert("Enter a valid Gmail address");
                return;
            }
            if (password.length < 8) {
                alert("Password must be at least 8 characters");
                return;
            }

            const url = currentAction === "login" ? "/auth" : "/register";

            try {
                const response = await fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, password })
                });

                const data = await response.json();
                alert(data.message);

                if (response.ok) {
                    window.location.reload(); 
                }
            } catch (err) {
                console.error(err);
                alert("Server error");
            }
        });
    }

    logoutLink?.addEventListener("click", (e) => {
    });
};