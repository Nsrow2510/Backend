const signupForm = document.getElementById("signupForm");
const successDiv = document.getElementById("success");

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
}

function validateMobile(mobile) {
  return /^[6-9]\d{9}$/.test(mobile); // Indian 10-digit mobile
}

signupForm.addEventListener("submit", async function(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  let valid = true;

  // Email validation
  if (!validateEmail(email)) {
    document.getElementById("email-hint").innerText = "Enter a valid email address.";
    valid = false;
  } else {
    document.getElementById("email-hint").innerText = "";
  }

  // Mobile validation
  if (!validateMobile(mobile)) {
    document.getElementById("mobile-hint").innerText = "Enter a valid 10 digit mobile number.";
    valid = false;
  } else {
    document.getElementById("mobile-hint").innerText = "";
  }

  // Password validation
  if (!validatePassword(password)) {
    document.getElementById("pw-hint").innerText =
      "Password must be 8+ characters with uppercase, lowercase, number and special character.";
    valid = false;
  } else {
    document.getElementById("pw-hint").innerText = "";
  }

  // Confirm password
  if (password !== confirmPassword) {
    document.getElementById("cpw-hint").innerText = "Passwords do not match.";
    valid = false;
  } else {
    document.getElementById("cpw-hint").innerText = "";
  }

  if (!valid) return;

  try {

    const res = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        mobile,
        password
      })
    });

    const data = await res.json();

    if (res.ok) {

  successDiv.innerText = "Account created successfully! You can login now.";
  successDiv.style.color = "green";

  signupForm.reset();

  setTimeout(() => {
    window.location.href = "login.html";
  }, 2000);

}  else {

      successDiv.innerText = data.message;
      successDiv.style.color = "red";

    }

  } catch (error) {

    successDiv.innerText = "Cannot connect to server.";
    successDiv.style.color = "red";

  }

});