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

// ==================== CHATBOT ====================
let productData = {};

fetch("products.json")
  .then(res => res.json())
  .then(data => productData = data);

const chatBtn = document.getElementById("chat-btn");
const chatBox = document.getElementById("chat-box");
const areaSelect = document.getElementById("area");
const skinTypeSelect = document.getElementById("skinType");
const issueSelect = document.getElementById("issue");
const issueLabel = document.getElementById("issueLabel");
const step2 = document.getElementById("step2");
const step3 = document.getElementById("step3");
const suggestBtn = document.getElementById("suggestBtn");
const result = document.getElementById("result");

// Toggle chat
chatBtn.addEventListener("click", () => {
  chatBox.style.display = (chatBox.style.display === "flex") ? "none" : "flex";
});

// Area select
areaSelect.addEventListener("change", () => {
  result.innerHTML = "";
  skinTypeSelect.value = "";
  issueSelect.innerHTML = '<option value="">--Choose--</option>';
  step2.style.display = "none";
  step3.style.display = "none";
  suggestBtn.style.display = "none";

  const area = areaSelect.value;

  if (area === "face") {
    step2.style.display = "block";
  } else if (area === "eyes") {
    step3.style.display = "block";
    issueLabel.innerText = "Select Eye Concern:";
    issueSelect.innerHTML = `
      <option value="">--Choose--</option>
      <option value="darkCircles">Dark Circles</option>
      <option value="puffiness">Puffiness</option>
      <option value="wrinkles">Wrinkles</option>
    `;
  } else if (area === "lips") {
    step3.style.display = "block";
    issueLabel.innerText = "Select Lip Concern:";
    issueSelect.innerHTML = `
      <option value="">--Choose--</option>
      <option value="dullLips">Dull Lips</option>
      <option value="pigmentedLips">Pigmented Lips</option>
      <option value="chappedLips">Chapped Lips</option>
    `;
  }
});

// Skin type
skinTypeSelect.addEventListener("change", () => {
  if (areaSelect.value === "face" && skinTypeSelect.value) {
    step3.style.display = "block";
    issueLabel.innerText = "Select Face Issue:";
    issueSelect.innerHTML = `
      <option value="">--Choose--</option>
      <option value="acne">Acne</option>
      <option value="pigmentation">Pigmentation</option>
      <option value="tanning">Tanning</option>
      <option value="dullUneven">Dull/Uneven Skin Tone</option>
      <option value="darkSpots">Dark Spots</option>
    `;
  }
});

// Show button
issueSelect.addEventListener("change", () => {
  suggestBtn.style.display = issueSelect.value ? "block" : "none";
});

// Suggest product
suggestBtn.addEventListener("click", () => {
  const area = areaSelect.value;
  const skinType = skinTypeSelect.value;
  const issue = issueSelect.value;

  if (!area || !issue) {
    result.innerHTML = "⚠️ Please complete all selections!";
    return;
  }

  const areaData = productData[area];
  let product;

  if (area === "face") {
    product = areaData[issue][skinType] || areaData[issue]["default"];
  } else {
    product = areaData[issue];
  }

  result.innerHTML = product?.description
    ? `<b>Suggested Product:</b><br>${product.description}`
    : "✨ Sorry, no product found.";
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