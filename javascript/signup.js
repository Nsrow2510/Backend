const signupForm = document.getElementById("signupForm");
const successDiv = document.getElementById("success");

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
}

function validateMobile(mobile) {
  // Simple Indian mobile validation: 10 digits, optional +91 country code
  return /^(\+91)?[6-9]\d{9}$/.test(mobile);
}

signupForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  let valid = true;

  if (!validateEmail(email)) {
    document.getElementById("email-hint").innerText = "Enter a valid email address.";
    valid = false;
  } else {
    document.getElementById("email-hint").innerText = "";
  }

  if (!validateMobile(mobile)) {
    document.getElementById("mobile-hint").innerText = "Enter a valid mobile number (10 digits, optionally +91).";
    valid = false;
  } else {
    document.getElementById("mobile-hint").innerText = "";
  }

  if (!validatePassword(password)) {
    document.getElementById("pw-hint").innerText =
      "Password must be at least 8 characters, include uppercase, lowercase, number, and special character.";
    valid = false;
  } else {
    document.getElementById("pw-hint").innerText = "";
  }

  if (password !== confirmPassword) {
    document.getElementById("cpw-hint").innerText = "Passwords do not match.";
    valid = false;
  } else {
    document.getElementById("cpw-hint").innerText = "";
  }

  if (!valid) {
    successDiv.innerText = "";
    return;
  }

  // Check for duplicate email
  fetch(`http://localhost:3000/users?email=${encodeURIComponent(email)}`)
    .then(res => res.json())
    .then(users => {
      if (users.length > 0) {
        alert("Email already registered. Please login or use another email.");
        successDiv.innerText = "";
      } else {
        // Create new user with mobile included
        fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, mobile, password })
        })
        .then(response => {
          if (!response.ok) throw new Error('Network response was not ok');
          return response.json();
        })
        .then(user => {
          successDiv.innerText = "Account created successfully!";
          successDiv.style.color = "#3c763d";
          signupForm.reset();
        })
        .catch(error => {
          successDiv.innerText = "Failed to create account.";
          successDiv.style.color = "#d9534f";
        });
      }
    })
    .catch(() => {
      successDiv.innerText = "";
    });
});
