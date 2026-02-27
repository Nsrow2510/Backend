const products = [
  { id: 1, name: "Neutrogena HydroBoost Hyaluronic acid water gel moisturizer", category: "dry", oldPrice: "₹1190", newPrice: "₹1071", off: "10% Off", rating: "★★★★★ (64059)", image: "neutrogenawatermoisturizer.avif", detailPage: "neutrogenamoisturizer.html" },
  { id: 2, name: "Plum 2% Niacinamide and rice water moisturizer", category: "combination", oldPrice: "₹525", newPrice: "₹462", off: "12% Off", rating: "★★★★☆(40152)", image: "plumricemoisturizer.avif", detailPage: "plumricewatermoisturizer.html" },
  { id: 3, name: "Aqualogical Glow + Hydra Gel Moisturizer", category: "combination", oldPrice: "", newPrice: "₹299", off: "", rating: "★★★★☆ (124)", image: "aqualogicalglowmoisturizer.webp", detailPage: "aquamoisturizer.html" },
  { id: 4, name: "Plum Green Tea face moisturizer", category: "sensitive", oldPrice: "₹470", newPrice: "₹423", off: "10% Off", rating: "★★★★☆ (14545)", image: "plumgreenmoisturizer.avif", detailPage: "plumgreenmoisturizer.html" },
  { id: 5, name: "Vaseline Cloud Soft light moisturizer", category: "normal", oldPrice: "₹520", newPrice: "₹322", off: "38% Off", rating: "★★★★☆(377)", image: "vaselinemoisturizer.jpg", detailPage: "moisturizer-detail.html" },
  { id: 6, name: "Minimalist vitamin B5 10% moisturizer", category: "oily", oldPrice: "₹349", newPrice: "₹333", off: "6% Off", rating: "★★★★☆(37054)", image: "minimalistvitaminmoisturizer.jpeg", detailPage: "moisturizer-detail.html" },
  { id: 7, name: "Lacto Calamine super light face moisturizer", category: "sensitive", oldPrice: "₹299", newPrice: "₹209", off: "30% Off", rating: "★★★★☆(3652)", image: "lactofacemositurizer.webp", detailPage: "moisturizer-detail.html" },
  { id: 8, name: "Simple Kind to skin protecting light moisturizer", category: "dry", oldPrice: "₹499", newPrice: "₹449", off: "10% Off", rating: "★★★★☆(4561)", image: "simplefacemoisturizer.jpg", detailPage: "moisturizer-detail.html" },
  { id: 9, name: "CeraVe Oil control gel cream lightweight", category: "oily", oldPrice: "₹1200", newPrice: "₹1140", off: "5% Off", rating: "★★★★☆(9452)", image: "ceraveoilmoisturizer.jpeg", detailPage: "moisturizer-detail.html" },
  { id: 10, name: "NIVEA Soft Vit E Light Non sticky face moisturizer", category: "normal", oldPrice: "₹400", newPrice: "₹280", off: "30% Off", rating: "★★★★★ (56342)", image: "niveasoftmoisturizer.avif", detailPage: "moisturizer-detail.html" },
  { id: 11, name: "Ponds super light gel oil free moisturizer", category: "dry", oldPrice: "₹830", newPrice: "₹623", off: "25% Off", rating: "★★★★★ (196875)", image: "pondssuperlightmoisturizer.avif", detailPage: "moisturizer-detail.html" },
  { id: 12, name: "Dot & Key Cica Niacinamide & ceramides oil free face moisturizer", category: "oily", oldPrice: "₹495", newPrice: "₹426", off: "14% Off", rating: "★★★★☆(84302)", image: "dotnkeycicamoisturizeer.avif", detailPage: "moisturizer-detail.html" },
  { id: 13, name: "Hyphen 2% Ceramide-Peptide complex barrier repair face moisturizer", category: "combination", oldPrice: "₹449", newPrice: "₹404", off: "10% Off", rating: "★★★★☆(1459)", image: "hyphenmoisturizer.avif", detailPage: "moisturizer-detail.html" },
  { id: 14, name: "Deconstruct oil-free Moisturizer", category: "sensitive", oldPrice: "₹349", newPrice: "₹332", off: "5% Off", rating: "★★★★☆(1289)", image: "deconstructmoisturizer.jpg", detailPage: "moisturizer-detail.html" },
  { id: 15, name: "Foxtale Nourishing ceramide moisturizer", category: "normal", oldPrice: "₹395", newPrice: "₹316", off: "20% Off", rating: "★★★★☆(5206)", image: "foxtaleceramidemoisturizer.webp", detailPage: "moisturizer-detail.html" },
  { id: 16, name: "Re'equil ceramide & hyaluronic acid moisturizer", category: "dry", oldPrice: "₹295", newPrice: "₹280", off: "5% Off", rating: "★★★★★(45645)", image: "reequilmoisturizer.jpeg", detailPage: "moisturizer-detail.html" },
  { id: 17, name: "Foxtale Oil Balancing Moisturizer", category: "oily", oldPrice: "₹445", newPrice: "₹392", off: "12% Off", rating: "★★★★☆(468)", image: "foxtaleoilmoisturizer.avif", detailPage: "moisturizer-detail.html" },
  { id: 18, name: "Foxtale super glow face moisturizer", category: "combination", oldPrice: "₹480", newPrice: "₹445", off: "10% Off", rating: "★★★★☆(2452)", image: "foxtaleglowmoisturizer.webp", detailPage: "moisturizer-detail.html" },
  { id: 19, name: "Dot & Key 72Hr Hydrating Lightweight gel face moisturizer", category: "sensitive", oldPrice: "₹495", newPrice: "₹426", off: "14% Off", rating: "★★★★☆(78562)", image: "dotnkeyhydratingmoisturizer.jpg", detailPage: "moisturizer-detail.html" },
  { id: 20, name: "Beauty of joseon dynasty cream moisturizer", category: "normal", oldPrice: "₹2090", newPrice: "₹1986", off: "5% Off", rating: "★★★★★(565)", image: "dynastycream.jpg", detailPage: "moisturizer-detail.html" }
];

// ==================== CART FUNCTIONALITY ====================
let cart = [];
const cartBadge = document.querySelector(".cart-count");

function updateCartCount() {
  if (cartBadge) {
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalQty;
  }
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
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
  const allCards = document.querySelectorAll('.product-card');
  
  allCards.forEach(card => {
    const cardId = parseInt(card.getAttribute('data-id'));
    if (cardId === productId) {
      const inCart = cart.find(item => item.id === productId);
      const buttonContainer = card.querySelector('.cart-btn-container');
      
      if (inCart) {
        buttonContainer.innerHTML = `
          <div class="quantity-controls">
            <button class="qty-btn" onclick="decreaseQty(${productId})">−</button>
            <span class="qty">${inCart.quantity}</span>
            <button class="qty-btn" onclick="increaseQty(${productId})">+</button>
          </div>
        `;
      } else {
        buttonContainer.innerHTML = `
          <button class="add-btn" onclick="addToCart(${productId})">Add to Cart</button>
        `;
      }
    }
  });
}

// ==================== RENDER PRODUCTS ====================
const productList = document.getElementById("product-list");
const filterSelect = document.getElementById("filter");
const sortSelect = document.getElementById("sort");

let currentCategory = "all";
let currentSort = "default";

function getPrice(priceStr) {
  return parseFloat(priceStr.replace(/[₹,]/g, "")) || 0;
}

function renderProducts(category = currentCategory) {
  productList.innerHTML = "";
  currentCategory = category;

  let filtered = category === "all" ? [...products] : products.filter(p => p.category === category);

  if (currentSort === "lowToHigh") {
    filtered.sort((a, b) => getPrice(a.newPrice) - getPrice(b.newPrice));
  } else if (currentSort === "highToLow") {
    filtered.sort((a, b) => getPrice(b.newPrice) - getPrice(a.newPrice));
  }

  if (filtered.length === 0) {
    productList.innerHTML = `<p class="no-products">No products found.</p>`;
    return;
  }

  filtered.forEach(p => {
    const inCart = cart.find(item => item.id === p.id);

    const card = document.createElement("div");
    card.className = "product-card";
    card.setAttribute('data-id', p.id);

    card.innerHTML = `
      <a href="${p.detailPage || '#'}" class="product-link">
        <img src="${p.image}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/250x250?text=Product+Image'">
      </a>
      <div class="product-info">
        <h4>${p.name}</h4>
        <div class="price">
          ${p.oldPrice ? `<span class="old">${p.oldPrice}</span>` : ''}
          <span class="new">${p.newPrice}</span>
          ${p.off ? `<span class="off">${p.off}</span>` : ''}
        </div>
        <div class="cart-btn-container">
          ${inCart
            ? `<div class="quantity-controls">
                 <button class="qty-btn" onclick="decreaseQty(${p.id})">−</button>
                 <span class="qty">${inCart.quantity}</span>
                 <button class="qty-btn" onclick="increaseQty(${p.id})">+</button>
               </div>`
            : `<button class="add-btn" onclick="addToCart(${p.id})">Add to Cart</button>`}
        </div>
        <div class="rating">${p.rating}</div>
      </div>
    `;
    productList.appendChild(card);
  });
}

function filterProducts() {
  currentCategory = filterSelect.value;
  renderProducts(currentCategory);
}

function sortProducts() {
  currentSort = sortSelect.value;
  renderProducts(currentCategory);
}

// ==================== SEARCH FUNCTIONALITY ====================
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchButtn");

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
    // "kajal": "kajal.html",
    "toner": "toner.html",
    "mask": "mask.html",
    "sunscreen": "sunscreen.html",
    "foundation":"foundation.html",
   "foundations":"foundation.html",
    "concealer":"concealer.html",
    "concealers":"concealer.html",
     "primer": "primer.html",
      "highlighter": "highlighter.html",
       "mascara": "mascara.html",
       "eyeliner":"eyeliner.html",
       "eyeshadow":"eyeshadow.html",
       "lipstick":"lipstick.html",
       "lipsticks":"lipstick.html",
       "lipgloss":"lipgloss.html",
       "gloss":"lipgloss.html",
       "lipscrubs":"lipscrubs.html",
       "lipscrub":"lipscrubs.html",
       "lipmask":"lipmasks.html",
       "women perfume":"fragances_women.html",
       "men perfume":"fragances_men.html",
       "perfume":"fragances_unisex.html",
       "tools":"tools.html",
       "facial tools":"tools.html",
};

function handleSearch() {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) return;

  for (let key in pages) {
    if (query.includes(key)) {
      window.location.href = pages[key];
      return;
    }
  }

  const matched = products.filter(p => p.name.toLowerCase().includes(query));
  if (matched.length > 0) {
    productList.innerHTML = "";
    matched.forEach(p => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.setAttribute('data-id', p.id);
      const inCart = cart.find(item => item.id === p.id);

      card.innerHTML = `
        <a href="${p.detailPage || '#'}">
          <img src="${p.image}" alt="${p.name}">
        </a>
        <div class="product-info">
          <h4>${p.name}</h4>
          <div class="price">
            ${p.oldPrice ? `<span class="old">${p.oldPrice}</span>` : ''}
            <span class="new">${p.newPrice}</span>
            ${p.off ? `<span class="off">${p.off}</span>` : ''}
          </div>
          <div class="cart-btn-container">
            ${inCart
              ? `<div class="quantity-controls">
                   <button class="qty-btn" onclick="decreaseQty(${p.id})">−</button>
                   <span class="qty">${inCart.quantity}</span>
                   <button class="qty-btn" onclick="increaseQty(${p.id})">+</button>
                 </div>`
              : `<button class="add-btn" onclick="addToCart(${p.id})">Add to Cart</button>`}
          </div>
          <div class="rating">${p.rating}</div>
        </div>
      `;
      productList.appendChild(card);
    });
  } else {
    productList.innerHTML = `<p class="no-products">No results found.</p>`;
  }
}

searchBtn.addEventListener("click", handleSearch);
searchInput.addEventListener("keydown", e => { if (e.key === "Enter") handleSearch(); });

// ==================== INIT ====================
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  updateCartCount();
});
