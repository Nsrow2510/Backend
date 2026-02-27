function getPageCategory() {
  const filename = window.location.pathname.split('/').pop();
  return filename.replace('.html', '').toLowerCase();
}

let products = []; // globally accessible

function loadProducts() {
  fetch("../json/products.json")
    .then((response) => {
      if (!response.ok) throw new Error("Failed to load products.json");
      return response.json();
    })
    .then((data) => {
      const arr = Array.isArray(data)
        ? data
        : Array.isArray(data.products)
          ? data.products
          : Array.isArray(data.items)
            ? data.items
            : [];

      if (!Array.isArray(arr) || arr.length === 0) {
        throw new Error("products.json format invalid: expected array or {products: []}");
      }

      products = arr;
      console.log("✅ Products loaded:", products.length);
      init();
    })
    .catch((err) => {
      console.error("Error loading JSON:", err);
      const productList = document.getElementById("product-list");
      if (productList)
        productList.innerHTML =
          `<p style="padding:20px; color:#c00;">Could not load products.json.<br>${err.message}</p>`;
    });
}

/* -----------------------
   ELEMENTS & STATE
   ----------------------- */
const productList = document.getElementById("product-list");
const cartCount = document.getElementById("cart-count");
const filterSelect = document.getElementById("filter");
const sortSelect = document.getElementById("sort");
const searchInput = document.getElementById("search-input");
const searchForm = document.getElementById("search-form");

let currentCategory = "all";
let currentSort = "default";

/* -----------------------
   HELPERS
   ----------------------- */
function getPrice(priceStr) {
  return parseFloat(String(priceStr).replace(/[₹,]/g, "")) || 0;
}
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (m) => (
    {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])
  );
}
function normalizeText(s) {
  return String(s || "").toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ").trim();
}

/* -----------------------
   BRAND ALIASES + CATEGORY INFERENCE
   ----------------------- */
const brandAliases = {
  "maybelline": "maybelline",
  "maybelline new york": "maybelline",
  "maybelline newyork": "maybelline",
  "nykaa": "nykaa",
  "lakme": "lakme",
  "loreal": "loreal",
  "l'oreal": "loreal",
  "loreal paris": "loreal",
  "mac": "mac",
  "m.a.c": "mac",
  "mars": "mars",
  "kaybeauty": "kaybeauty",
  "kay beauty": "kaybeauty",
  "faces canada": "facescanada",
  "facescanada": "facescanada",
  "swiss beauty": "swiss",
  "swiss": "swiss",
  "forever52": "forever52",
  "forever 52": "forever52",
};

function inferMissingCategories() {
  const aliasKeys = Object.keys(brandAliases);
  products.forEach(p => {
    if ((!p.category || String(p.category).trim() === "") && p.name) {
      const n = normalizeText(p.name);
      for (const a of aliasKeys) {
        if (n.includes(a)) {
          p.category = brandAliases[a];
          break;
        }
      }
    }
  });
}

let availableCategories = new Set();

/* -----------------------
   RENDER PRODUCTS
   ----------------------- */
function renderProducts(category = currentCategory, productArray = null) {
  if (!productList) return;
  productList.innerHTML = "";
  currentCategory = category;

  let base = productArray
    ? [...productArray]
    : category === "all"
      ? [...products]
      : products.filter((p) => p.category === category);

  if (currentSort === "lowToHigh") base.sort((a,b) => getPrice(a.newPrice) - getPrice(b.newPrice));
  else if (currentSort === "highToLow") base.sort((a,b) => getPrice(b.newPrice) - getPrice(a.newPrice));

  if (!base.length) {
    productList.innerHTML = `<p style="padding:20px; color:#666;">No products found.</p>`;
    return;
  }

  base.forEach((p) => {
    const card = document.createElement("div");
    card.className = "product-card";

    const cart = getCart();
    const inCart = cart.find(item => item.id === p.id);
    const quantity = inCart ? inCart.quantity : 0;

    const quantityControlsHTML = quantity === 0 
      ? `<button class="add-btn" onclick="addToCart(${p.id})">Add to Cart</button>`
      : `<div class="quantity-controls">
          <button class="qty-btn" onclick="decreaseQty(${p.id})">−</button>
          <span class="qty">${quantity}</span>
          <button class="qty-btn" onclick="increaseQty(${p.id})">+</button>
        </div>`;

    card.innerHTML = `
      <a href="${p.page || '#'}" style="color: black; text-decoration: none; cursor: pointer;">
        <img src="${p.image}" alt="${escapeHtml(p.name)}">
        <h4 style="margin: 0;">${escapeHtml(p.name)}</h4>
      </a>
      <div class="product-info">
        <div class="price">
          <span class="old">${p.oldPrice || ""}</span>
          <span class="new">${p.newPrice || ""}</span>
          <span class="off">${p.off || ""}</span>
        </div>
        ${quantityControlsHTML}
        <div class="rating">${p.rating || ""}</div>
      </div>
    `;
    productList.appendChild(card);
  });
}

/* -----------------------
   FILTER / SORT
   ----------------------- */
function filterProducts() {
  currentCategory = filterSelect ? filterSelect.value : "all";
  renderProducts(currentCategory);
}
function sortProducts() {
  currentSort = sortSelect ? sortSelect.value : "default";
  renderProducts(currentCategory);
}

/* -----------------------
   CART
   ----------------------- */
function getCart() {
  try { return (window.CartBridge && window.CartBridge.getCart()) || []; } catch { return []; }
}
function saveCart(cart) {
  try { window.CartBridge && window.CartBridge.setCart(cart); } catch(e){ console.warn("saveCart failed", e); }
}
function updateCartCount() {
  if (!cartCount) return;
  const count = window.CartBridge ? window.CartBridge.getCartCount() : (getCart().reduce((s,i)=>s+(i.quantity||1),0));
  cartCount.textContent = count;
  if (window.NavHelper && typeof window.NavHelper.updateCartBadge === 'function') {
    window.NavHelper.updateCartBadge();
  }
}
function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;
  if (window.CartBridge) {
    window.CartBridge.addToCart(product);
  } else {
    const cart = getCart();
    const existing = cart.find(p => p.id === id);
    if (existing) existing.quantity = (existing.quantity || 1) + 1;
    else cart.push({...product, quantity: 1});
    saveCart(cart);
  }
  updateCartCount();
  renderProducts(currentCategory);
}
function increaseQty(id) {
  const cart = getCart();
  const item = cart.find(p => p.id === id);
  if (!item) return;
  const qty = (item.quantity || 1) + 1;
  if (window.CartBridge) window.CartBridge.updateQuantity(id, qty); else { item.quantity = qty; saveCart(cart); }
  updateCartCount();
  renderProducts(currentCategory);
}
function decreaseQty(id) {
  const cart = getCart();
  const item = cart.find(p => p.id === id);
  if (!item) return;
  const qty = (item.quantity || 1) - 1;
  if (qty <= 0) {
    if (window.CartBridge) window.CartBridge.removeFromCart(id); else { const i = cart.findIndex(p=>p.id===id); if (i!==-1) { cart.splice(i,1); saveCart(cart);} }
  } else {
    if (window.CartBridge) window.CartBridge.updateQuantity(id, qty); else { item.quantity = qty; saveCart(cart); }
  }
  updateCartCount();
  renderProducts(currentCategory);
}

/* -----------------------
   SEARCH + PAGE MAP
   ----------------------- */
function handleSearchSubmit(e) {
  if (e && e.preventDefault) e.preventDefault();
  if (!searchInput) return;
  const raw = String(searchInput.value || "");
  const q = normalizeText(raw);
  console.log("[search] q:", q);

  if (!q) {
    renderProducts("all");
    return;
  }

  // try direct page navigation first (normalized keys)
  const normalizedPageMap = {};
  Object.keys(pageMap).forEach(k => normalizedPageMap[normalizeText(k)] = pageMap[k]);
  const candidates = new Set([q]);
  if (q.endsWith("s")) candidates.add(q.slice(0,-1));
  else candidates.add(q + "s");
  for (const cand of candidates) {
    if (normalizedPageMap[cand]) {
      window.location.href = normalizedPageMap[cand];
      return;
    }
  }
  const pagePartial = Object.keys(normalizedPageMap).find(k => k.includes(q) || q.includes(k));
  if (pagePartial) {
    window.location.href = normalizedPageMap[pagePartial];
    return;
  }
  const tokens = q.split(" ").filter(Boolean);
  const matchedBrand = tokens
    .map(t => brandAliases[t] || (availableCategories.has(t) ? t : null))
    .find(Boolean);
  if (matchedBrand) {
    const matchedProducts = products.filter(p => {
      const cat = normalizeText(p.category || "");
      const name = normalizeText(p.name || "");
      return cat === matchedBrand || name.includes(matchedBrand);
    });
    if (matchedProducts.length) {
      renderProducts("all", matchedProducts);
      return;
    }
  }
  const strictMatches = products.filter(p => {
    const name = normalizeText(p.name || "");
    const category = normalizeText(p.category || "");
    return tokens.every(t => name.includes(t) || category.includes(t));
  });
  if (strictMatches.length) {
    renderProducts("all", strictMatches);
    return;
  }
  const looseMatches = products.filter(p => {
    const name = normalizeText(p.name || "");
    const category = normalizeText(p.category || "");
    return tokens.some(t => name.includes(t) || category.includes(t));
  });
  if (looseMatches.length) {
    renderProducts("all", looseMatches);
    return;
  }
  const synonymMap = { "primer": "primer.html", "highlighter": "highlighter.html" };
  const synKey = Object.keys(synonymMap).find(k => q === k || q.includes(k) || k.includes(q));
  if (synKey) {
    window.location.href = synonymMap[synKey];
    return;
  }
  if (productList) productList.innerHTML = `<p style="padding:20px; color:#666;">No results for "<strong>${escapeHtml(q)}</strong>".</p>`;
  console.log("[search] no results for:", q);
}

/* -----------------------
   PAGE MAP (update as needed)
   ----------------------- */
const pageMap = {
  // --- Face Care ---
  "face moisturizer": "facemoisturizer.html",
  "cleansers": "cleansers.html",
  "serum": "serum.html",
  "toners": "toners.html",
  "sunscreens": "sunscreens.html",
  "masks": "masks.html",
  // --- Lip Care ---
  "lip balm": "lipbalm.html",
  "lip scrub": "lipscrub.html",
  "lip masks": "lipmasks.html",
  // --- Body Care ---
  "lotions & creams": "lotionscreams.html",
  "body scrubs": "bodyscrubs.html",
  "body sunscreens": "bodysunscreens.html",
  "soaps & body wash": "soapsbodywash.html",
  // --- Eye Care ---
  "undereye cream & serums": "undereyecreams.html",
  "eye masks": "eyemasks.html",
  // --- Makeup: Face ---
  "foundation": "foundation.html",
  "concealer": "concealer.html",
  "primer": "primer.html",
  "highlighter": "highlighter.html",
  // --- Makeup: Eyes ---
  "mascara": "mascara.html",
  "eyeliner": "eyeliner.html",
  "eyeshadow": "eyeshadow.html",
  "kajal": "kajal.html",
  // --- Makeup: Lips ---
  "lipstick": "lipstick.html",
  "lip gloss": "lipgloss.html",
  "lip liner": "lipliner.html",
  "lip tints": "liptints.html",
  // --- Fragrance ---
  "perfume": "perfume.html",
  "body mists": "bodymists.html",
  "roll-ons": "rollons.html",
  // --- Fragrance by Gender ---
  "for women": "forwomen.html",
  "for men": "formen.html",
  "unisex": "unisex.html"
};

/* -----------------------
   INIT & LISTENERS
   ----------------------- */
function init() {
  inferMissingCategories();
  availableCategories = new Set(products.map(p => normalizeText(p.category || "")).filter(Boolean));
  renderProducts("all");
  updateCartCount();

  if (filterSelect) filterSelect.addEventListener("change", filterProducts);
  if (sortSelect) sortSelect.addEventListener("change", sortProducts);
  if (searchForm) {
    searchForm.addEventListener("submit", handleSearchSubmit);
  } else if (searchInput) {
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSearchSubmit();
      }
    });
  }

  console.log("✅ Initialized. Products:", products.length, "availableCategories:", [...availableCategories]);
}

/* -----------------------
   START APP
   ----------------------- */
loadProducts(); // This kicks off everything!
