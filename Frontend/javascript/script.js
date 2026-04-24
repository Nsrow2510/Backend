// ==================== CART FUNCTIONALITY ====================
const USER_ID = localStorage.getItem("userId");
const CART_API = "http://localhost:3000/api";

// Add to cart
async function addToCart(productName, price, image) {
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
        price: parseInt(price.replace("₹","")),
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
  if (!USER_ID) return;

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

// Page load
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
});

// ==================== SEARCH FUNCTIONALITY ====================
document.getElementById("searchButtn").addEventListener("click", function() {
  const query = document.getElementById("searchInput").value.trim().toLowerCase();
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
    "face serums": "serum.html",
    "cleanser": "cleansers.html",
    "facewash": "cleansers.html",
    "cleansers": "cleansers.html",
    "facewashs": "cleansers.html",
    "face washs": "cleansers.html",
    "moisturizer": "facemositurizer.html",
    "toner": "toner.html",
    "mask": "mask.html",
    "sunscreen": "sunscreen.html",
    "foundation": "foundation.html",
    "foundations": "foundation.html",
    "concealer": "concealer.html",
    "concealers": "concealer.html",
    "primer": "primer.html",
    "highlighter": "highlighter.html",
    "mascara": "mascara.html",
    "eyeliner": "eyeliner.html",
    "eyeshadow": "eyeshadow.html",
    "lipstick": "lipstick.html",
    "lipsticks": "lipstick.html",
    "lipgloss": "lipgloss.html",
    "gloss": "lipgloss.html",
    "lipscrubs": "lipscrubs.html",
    "lipscrub": "lipscrubs.html",
    "lipmask": "lipmasks.html",
    "women perfume": "fragances_women.html",
    "men perfume": "fragances_men.html",
    "perfumes": "fragances_unisex.html",
    "tools": "tools.html",
    "facial tools": "tools.html"
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
document.getElementById("searchInput").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    document.getElementById("searchButtn").click();
  }
});
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
});

// //////////////////*CHATBOT*///////////////////
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

// Toggle chat box
chatBtn.addEventListener("click", () => {
  chatBox.style.display = (chatBox.style.display === "flex") ? "none" : "flex";
});

// When user selects area
areaSelect.addEventListener("change", () => {
  result.innerHTML = "";
  skinTypeSelect.value = "";
  issueSelect.innerHTML = '<option value="">--Choose--</option>';
  step2.style.display = "none";
  step3.style.display = "none";
  suggestBtn.style.display = "none";

  const area = areaSelect.value;

  if (area === "face") {
    // show skin type next
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

// When user selects skin type (for face)
skinTypeSelect.addEventListener("change", () => {
  const area = areaSelect.value;
  if (area === "face" && skinTypeSelect.value) {
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
  } else {
    step3.style.display = "none";
  }
});

// When user selects issue
issueSelect.addEventListener("change", () => {
  if (issueSelect.value) {
    suggestBtn.style.display = "block";
  } else {
    suggestBtn.style.display = "none";
  }
});

suggestBtn.addEventListener("click", suggestProduct);

// Suggest Product
function suggestProduct() {
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
  } else if (area === "eyes" || area === "lips") {
    product = areaData[issue]; // Get direct concern object for eyes/lips
  }

  if (product && product.description) {
    result.innerHTML = `<b>Suggested Product:</b><br>${product.description}`;
  } else {
    result.innerHTML = "✨ Sorry, no product found for this combination.";
  }
}
