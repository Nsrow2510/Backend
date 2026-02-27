document.addEventListener("DOMContentLoaded", function() {
  // Check for a logged-in user in localStorage
  const user = JSON.parse(localStorage.getItem("velouraUser"));
  const loginLink = document.querySelector('.icons a[href*="signin"], .icons a[href*="login"]');

  if(user && user.name) {
    // Replace Login/SignUp with user's name and a logout link
    if (loginLink) {
      // Create user menu (shows name and logout link)
      // If user exists
      const userSpan = document.createElement('span');
      userSpan.className = "icon user";
      userSpan.style = "margin-right:12px; cursor:pointer;"; // make it look clickable
      userSpan.textContent = `👤 ${user.name}`;

      // Append click event
      userSpan.addEventListener("click", () => {
        window.location.href = "UserDetails.html"; // navigate to details page
      });

      loginLink.replaceWith(userSpan);


      // Add logout option
      const logoutBtn = document.createElement('a');
      logoutBtn.href = "#";
      logoutBtn.className = "icon logout";
      logoutBtn.style = "margin-left:10px; color:#be138e; text-decoration:underline; font-size:14px;";
      logoutBtn.textContent = "Logout";
      logoutBtn.addEventListener("click", function(e) {
        e.preventDefault();
        localStorage.removeItem("velouraUser");
        window.location.reload(); // Reload to reset UI
      });

      userSpan.parentNode.appendChild(logoutBtn);
    }
  }
});
