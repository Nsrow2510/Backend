// ==================== CART FUNCTIONALITY ====================
let cart = [];
const cartBadge = document.querySelector(".badge");

function updateCartCount() {
  if (cartBadge) {
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalQty;
  }
}

function addToCart(id, name, price, image) {
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id, name, price, image, quantity: 1 });
  }
  updateCartCount();
  updateButton(id);
}

function increaseQty(id) {
  const item = cart.find(p => p.id === id);
  if (item) {
    item.quantity += 1;
    updateCartCount();
    updateButton(id);
  }
}

function decreaseQty(id) {
  const index = cart.findIndex(p => p.id === id);
  if (index !== -1) {
    cart[index].quantity -= 1;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
    updateCartCount();
    updateButton(id);
  }
}

function updateButton(productId) {
  const buttons = document.querySelectorAll('.add-to-cart-btn');
  const controls = document.querySelectorAll('.quantity-controls');
  buttons.forEach(btn => {
    const btnOnclick = btn.getAttribute('onclick');
    if (btnOnclick && btnOnclick.includes(productId)) {
      const inCart = cart.find(item => item.id === productId);
      if (inCart) {
        btn.outerHTML = `
          <div class="quantity-controls">
            <button class="qty-btn" onclick="decreaseQty('${productId}')">−</button>
            <span class="qty">${inCart.quantity}</span>
            <button class="qty-btn" onclick="increaseQty('${productId}')">+</button>
          </div>
        `;
      }
    }
  });
  controls.forEach(control => {
    const qtySpan = control.querySelector('.qty');
    if (qtySpan) {
      const decreaseBtn = control.querySelector('.qty-btn');
      if (decreaseBtn) {
        const onclickAttr = decreaseBtn.getAttribute('onclick');
        if (onclickAttr) {
          const id = onclickAttr.match(/'([^']+)'/)[1];
          const inCart = cart.find(item => item.id === id);
          if (inCart) {
            qtySpan.textContent = inCart.quantity;
          } else {
            control.outerHTML = `<button class="add-to-cart-btn" onclick="addToCart('${id}', 'Product', '₹0', 'image.jpg')">Add to Cart</button>`;
          }
        }
      }
    }
  });
}

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
