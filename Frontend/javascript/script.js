// ==================== CART FUNCTIONALITY ====================
const CART_API = "http://localhost:3000/api";

// Add to cart
async function addToCart(productName, price, image) {
  const USER_ID = localStorage.getItem("userId"); 

  if (!USER_ID) {
    alert("Login first!");
    window.location.href = "login.html";
    return;
  }

  try {
    await fetch(`${CART_API}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: USER_ID,
        productName,
        price: parseInt(price.replace("₹", "")),
        image,
        quantity: 1
      })
    });

    alert(`"${productName}" added to cart!`);
    updateCartCount();

  } catch (err) {
    console.log(err);
    alert("Server error");
  }
}

// Update cart count
async function updateCartCount() {
  const USER_ID = localStorage.getItem("userId"); 

  if (!USER_ID) {
    document.getElementById("cart-count").innerText = 0;
    return;
  }

  try {
    const res = await fetch(`${CART_API}/cart/${USER_ID}`);
    const items = await res.json();

    let count = 0;
    items.forEach(item => {
      count += item.quantity || 1;
    });

    document.getElementById("cart-count").innerText = count;
  } catch {
    document.getElementById("cart-count").innerText = 0;
  }
}

// ==================== SEARCH FUNCTIONALITY ====================
document.getElementById("page-search-btn").addEventListener("click", function () {
  const query = document.getElementById("page-search-input").value.trim().toLowerCase();

  if (!query) {
    alert("Please enter a product name!");
    return;
  }

  const pages = {
    "lip balm": "lipbalm.html",
    "lipbalm": "lipbalm.html",
    "lipbalms": "lipbalm.html",
    "serum": "serum.html",
    "serums": "serum.html",
    "cleanser": "cleansers.html",
    "facewash": "cleansers.html",
    "moisturizer": "facemositurizer.html",
    "toner": "toner.html",
    "mask": "mask.html",
    "sunscreen": "sunscreen.html",
    "foundation": "foundation.html",
    "concealer": "concealer.html",
    "primer": "primer.html",
    "highlighter": "highlighter.html",
    "mascara": "mascara.html",
    "eyeliner": "eyeliner.html",
    "eyeshadow": "eyeshadow.html",
    "lipstick": "lipstick.html",
    "lipgloss": "lipgloss.html",
    "tools": "tools.html"
  };

  let found = false;

  for (let key in pages) {
    if (query.includes(key)) {
      window.location.href = pages[key];
      found = true;
      break;
    }
  }

  if (!found) {
    alert("No products found!");
  }
});

// Enter key support
document.getElementById("page-search-input").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    document.getElementById("page-search-btn").click();
  }
});


// ==================== LOGOUT ====================
async function logout() {
  const userId = localStorage.getItem("userId");

  try {
    if (userId) {
      // 🗑 clear cart from DB
      await fetch(`http://localhost:3000/api/cart/user/${userId}`, {
        method: "DELETE"
      });
    }
  } catch (err) {
    console.log("Cart clear error:", err);
  }

  // ❌ remove user
  localStorage.removeItem("userId");

  // redirect
  window.location.href = "main.html";
}

// ==================== PAGE LOAD ====================
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
});

function handleAuthUI() {
  const userId = localStorage.getItem("userId");

  const loginIcon = document.getElementById("login-icon");
  const profileBtn = document.getElementById("profile-btn");
  const logoutBtn = document.getElementById("logout-btn");

  if (userId) {
    // logged in
    if (loginIcon) loginIcon.style.display = "none";
    if (profileBtn) profileBtn.style.display = "inline-block";
    if (logoutBtn) logoutBtn.style.display = "inline-block";
  } else {
    // logged out
    if (loginIcon) loginIcon.style.display = "inline-block";
    if (profileBtn) profileBtn.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  handleAuthUI();
});