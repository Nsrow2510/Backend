document.getElementById("signin-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const globalMsg = document.getElementById("global-msg");

  globalMsg.innerText = "";

  fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
  .then(async res => {
    const data = await res.json();

    if (res.status === 200) {

      globalMsg.style.color = "green";
      globalMsg.innerText = data.message;

      setTimeout(() => {
        window.location.href = "fragrances_women.html";
      }, 3500);

    }

    else if (res.status === 404) {

      globalMsg.style.color = "red";
      globalMsg.innerText = data.message;

      // setTimeout(() => {
      //   window.location.href = "../html/signup.html";
      // }, 4000);

    }

    else if (res.status === 401) {

      globalMsg.style.color = "red";
      globalMsg.innerText = data.message;

    }

  })
  .catch(err => {
    globalMsg.style.color = "red";
    globalMsg.innerText = "Server error. Try again.";
  });

});