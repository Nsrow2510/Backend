document.getElementById("signin-form").addEventListener("submit", function(event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const globalMsg = document.getElementById("global-msg");

  globalMsg.innerText = "";

  if (!email || !password) {
    globalMsg.innerText = "Please enter both email and password.";
    return;
  }

  // Fetch user by email only
  fetch(`http://localhost:3000/users?email=${encodeURIComponent(email)}`)
    .then(res => res.json())
    .then(users => {
      if (users.length === 0) {
        alert("Account does not exist. Please register first.");
        globalMsg.style.color = "#d9534f";
        globalMsg.innerText = "Account does not exist.";
      } else {
        const user = users[0];
        if (user.password === password) {
          // Store full user object in localStorage for checkout usage
          localStorage.setItem("velouraUser", JSON.stringify(user));
          globalMsg.style.color = "#3c763d";
          globalMsg.innerText = "Sign in successful! Redirecting...";
          setTimeout(() => {
            window.location.href = "fragrances_women.html";
          }, 1500);
        } else {
          alert("Incorrect password. Please try again.");
          globalMsg.style.color = "#d9534f";
          globalMsg.innerText = "Incorrect password.";
        }
      }
    })
    .catch(error => {
      globalMsg.style.color = "#d9534f";
      globalMsg.innerText = "Login failed. Please try again later.";
    });
});
