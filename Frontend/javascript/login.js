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

    // ✅ DEBUG (optional)
    console.log("Full response:", data);

    // ✅ SUCCESS LOGIN
    if (res.status === 200) {

      // 🔐 TOKEN CHECK + STORE
      if (data.token) {
        console.log("Token generated ✅");
        console.log("Token:", data.token);

        localStorage.setItem("token", data.token);
      } else {
        console.log("Token NOT generated ❌");
      }

      // 👤 USER ID HANDLE
      const userId = data.userId || data._id || data.user?._id;

      if (userId) {
        localStorage.setItem("userId", userId);
      } else {
        console.log("User ID not received");
      }

      // ✅ MESSAGE
      globalMsg.style.color = "green";
      globalMsg.innerText = data.message || "Login successful!";

      // 🔁 REDIRECT
      setTimeout(() => {
        window.location.href = "main.html";
      }, 1500);
    }

    // ❌ USER NOT FOUND
    else if (res.status === 404) {
      globalMsg.style.color = "red";
      globalMsg.innerText = data.message || "User not found";
    }

    // ❌ WRONG PASSWORD
    else if (res.status === 401) {
      globalMsg.style.color = "red";
      globalMsg.innerText = data.message || "Invalid password";
    }

    // ❌ OTHER ERROR
    else {
      globalMsg.style.color = "red";
      globalMsg.innerText = data.message || "Something went wrong!";
    }

  } catch (err) {
    globalMsg.style.color = "red";
    globalMsg.innerText = "Server error. Try again.";
    console.log("Error:", err);
  }
});