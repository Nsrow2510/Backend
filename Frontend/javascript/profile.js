const userId = localStorage.getItem("userId");

if (!userId) {
  alert("Please login first");
  window.location.href = "login.html";
}

fetch(`http://localhost:3000/api/users/${userId}`)
  .then(res => res.json())
  .then(data => {
    console.log(data); // 👈 IMPORTANT (check karo)

    document.getElementById("name").innerText = data.name || "N/A";
    document.getElementById("email").innerText = data.email || "N/A";
    document.getElementById("mobile").innerText = data.mobile || "N/A";
  })
  .catch(err => {
    console.log("Error:", err);
  });