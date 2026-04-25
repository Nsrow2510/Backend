document.getElementById("signin-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const globalMsg = document.getElementById("global-msg");

  globalMsg.innerText = "";

  try {
    const res = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    // ✅ SUCCESS LOGIN
    if (res.status === 200) {

      const userId = data.userId || data._id || data.user?._id;

      if (!userId) {
        globalMsg.style.color = "red";
        globalMsg.innerText = "User ID not received from server!";
        return;
      }

      // SAVE USER
      localStorage.setItem("userId", userId);

      globalMsg.style.color = "green";
      globalMsg.innerText = data.message || "Login successful!";

      // REDIRECT
      setTimeout(() => {
        window.location.href = "main.html";
      }, 1500); // shorter time

    }

    // ❌ USER NOT FOUND
    else if (res.status === 404) {
      globalMsg.style.color = "red";
      globalMsg.innerText = data.message || "User not found";
    }

    
    else if (res.status === 401) {
      globalMsg.style.color = "red";
      globalMsg.innerText = data.message || "Invalid password";
    }

  
    else {
      globalMsg.style.color = "red";
      globalMsg.innerText = "Something went wrong!";
    }

  } catch (err) {
    globalMsg.style.color = "red";
    globalMsg.innerText = "Server error. Try again.";
    console.log(err);
  }
});