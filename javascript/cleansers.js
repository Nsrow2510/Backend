const products = [
  { id: 1, name: "CeraVe Hydrating Cleanser Non Foaming Face wash", category: "dry", oldPrice: "₹330", newPrice: "₹297", off: "10% Off", rating: "★★★★☆ (13451)", image: "../images/ceravehydratingfacewash.jpg", detailPage: "ceravehydratingcleanser.html" },
  { id: 2, name: "Cetaphil Oily Skin Cleanser", category: "oily", oldPrice: "₹1099", newPrice: "₹978", off: "11% Off", rating: "★★★★★ (40615)", image: "../images/cetaphilfacewash.webp", detailPage: "cetaphiloilyfacewash.html" },
  { id: 3, name: "Neutrogena deep clean gentle foaming cleanser", category: "combination", oldPrice: "₹185", newPrice: "₹175", off: "5% Off", rating: "★★★★☆ (9485)", image: "../images/neutrogenadeepfacewash.avif", detailPage: "neutrogena-deep-clean.html" },
  { id: 4, name: "The Face shop tea tree gel cleanser", category: "sensitive", oldPrice: "", newPrice: "₹999", off: "", rating: "★★★★☆ (145)", image: "../images/faceteafacewash.jpg", detailPage: "faceshop-teatree.html" },
  { id: 5, name: "Mamaearth Ubtan Face wash with turmeric", category: "normal", oldPrice: "₹399", newPrice: "₹351", off: "12% Off", rating: "★★★★☆(37775)", image: "../images/mamaearthubtanfacewash.webp", detailPage: "mamaearth-ubtan.html" },
  { id: 6, name: "Dot & Key Cica Salicylic & Green tea facewash", category: "acne", oldPrice: "₹375", newPrice: "₹308", off: "18% Off", rating: "★★★★☆(30154)", image: "../images/dotnkeycicafacewash.webp", detailPage: "dotkey-cica-salicylic.html" },
  { id: 7, name: "Plum saffron & papaya glow bright gel face wash", category: "dull", oldPrice: "₹275", newPrice: "₹242", off: "12% Off", rating: "★★★★☆(4564)", image: "../images/plumpapayafacewash.jpeg", detailPage: "plum-papaya-facewash.html" },
  { id: 8, name: "Simple Kind to skin Moisturizing facewash", category: "dry", oldPrice: "₹420", newPrice: "₹378", off: "10% Off", rating: "★★★★☆(8541)", image: "../images/simplekindskinfacewash.webp", detailPage: "simple-moisturizing.html" },
  { id: 9, name: "CeraVe Foaming Cleanser face wash for oily skin", category: "oily", oldPrice: "₹520", newPrice: "₹468", off: "10% Off", rating: "★★★★☆(9452)", image: "../images/ceravefoamingfacewash.webp", detailPage: "cerave-foaming.html" },
  { id: 10, name: "DHC Beauty deep cleansing oil", category: "normal", oldPrice: "₹1690", newPrice: "₹1352", off: "20% Off", rating: "★★★★☆(2448)", image: "dhcfaceoil.jpg", detailPage: "../images/dhc-cleansing-oil.html" },
  { id: 11, name: "Minimalist 2% salicylic acid + LHA face cleanser", category: "combination", oldPrice: "₹299", newPrice: "₹284", off: "5% Off", rating: "★★★★☆(58965)", image: "../images/minimalistfacewashsaliyicacid.jpg", detailPage: "minimalist-salicylic.html" },
  { id: 12, name: "SkinInspired Creme Cleanser Facewash", category: "sensitive", oldPrice: "₹449", newPrice: "₹429", off: "4% Off", rating: "★★★★☆(84)", image: "../images/skininspriedfacewash.webp", detailPage: "skininspired-creme.html" },
  { id: 13, name: "Minimalist 5% Aquaporin booster face wash", category: "normal", oldPrice: "₹299", newPrice: "₹284", off: "5% Off", rating: "★★★★☆(7739)", image: "../images/minimalistfaceewash.jpg", detailPage: "minimalist-aquaporin.html" },
  { id: 14, name: "Neutrogena Oil Free acne cleansing face wash", category: "acne", oldPrice: "₹850", newPrice: "₹759", off: "11% Off", rating: "★★★★☆(12789)", image: "../images/neutrogenafacewash.webp", detailPage: "neutrogena-oilfree-acne.html" },
  { id: 15, name: "Minimalist 7% ALA & AHA Brightening face wash", category: "dull", oldPrice: "₹399", newPrice: "₹379", off: "5% Off", rating: "★★★★☆(14755)", image: "../images/minimalistalafacewash.avif", detailPage: "minimalist-ala-aha.html" },
  { id: 16, name: "Hyphen Moisturizing cleanser for dry skin", category: "dry", oldPrice: "₹299", newPrice: "₹269", off: "10% Off", rating: "★★★★★(456)", image: "../images/hyphencleanser.jpeg", detailPage: "hyphen-moisturizing.html" },
  { id: 17, name: "Foxtale True clarity oil control face wash", category: "oily", oldPrice: "₹329", newPrice: "₹290", off: "12% Off", rating: "★★★★☆(150)", image: "../images/foxtaleclarityfacewash.webp", detailPage: "foxtale-clarity.html" },
  { id: 18, name: "The body shop tea tree skin clearing face wash", category: "combination", oldPrice: "₹895", newPrice: "₹698", off: "22% Off", rating: "★★★★☆(24582)", image: "../images/bodyshopfacewash.webp", detailPage: "bodyshop-teatree.html" },
  { id: 19, name: "Moody DermaSoothe claming Gentle cleanser", category: "sensitive", oldPrice: "₹299", newPrice: "₹278", off: "7% Off", rating: "★★★★☆(78)", image: "../images/moodyfacewash.webp", detailPage: "moody-dermasoothe.html" },
  { id: 20, name: "Lakme blush & glow strawberry blast face wash", category: "normal", oldPrice: "₹490", newPrice: "₹368", off: "25% Off", rating: "★★★★★(5656)", image: "../images/lakmefacewash.webp", detailPage: "lakme-strawberry.html" },
  { id: 21, name: "The derma co sali-cinamide anti-acne face wash", category: "acne", oldPrice: "₹449", newPrice: "₹404", off: "10% Off", rating: "★★★★☆(4856)", image: "../images/dermacosalicinamidefacewash.jpg", detailPage: "dermaco-salicinamide.html" },
  { id: 22, name: "Mamaearth rice face wash with rice water for even tone skin", category: "dull", oldPrice: "₹419", newPrice: "₹369", off: "12% Off", rating: "★★★★☆(15442)", image: "../images/mamaearthricefacewash.jpg", detailPage: "mamaearth-rice.html" },
  { id: 23, name: "Aroma Magic Lavender face wash for dry skin", category: "dry", oldPrice: "₹200", newPrice: "₹186", off: "7% Off", rating: "★★★★☆(7786)", image: "../images/aromafacewash.avif", detailPage: "aroma-lavender.html" },
  { id: 24, name: "Plum Green Tea pore cleansing gel face wash", category: "oily", oldPrice: "₹360", newPrice: "₹313", off: "13% Off", rating: "★★★★☆(53369)", image: "../images/plumgreenteafacewash.avif", detailPage: "plum-greentea.html" },
  { id: 25, name: "PLIX 5% Pineapple foaming facewash", category: "combination", oldPrice: "₹375", newPrice: "₹329", off: "12% Off", rating: "★★★★☆(4526)", image: "../images/plixfacewash.avif", detailPage: "plix-pineapple.html" },
  { id: 26, name: "Earth Rhythm Face wash", category: "sensitive", oldPrice: "₹349", newPrice: "₹241", off: "31% Off", rating: "★★★★☆(109)", image: "../images/earthrythmfacewash.jpg", detailPage: "earth-rhythm.html" },
  { id: 27, name: "Aqualogical detan + smoothie face wash", category: "normal", oldPrice: "₹249", newPrice: "₹237", off: "5% Off", rating: "★★★★☆(4875)", image: "../images/aqualogicaldetanfacewash.webp", detailPage: "aqualogica-detan.html" },
  { id: 28, name: "Bioderma Sebium gel moussant actif cleanser", category: "acne", oldPrice: "₹1799", newPrice: "₹1439", off: "20% Off", rating: "★★★★☆(245)", image: "../images/biodermagelfacewash.jpg", detailPage: "bioderma-sebium.html" },
  { id: 29, name: "Dot & Key vitamin C+E super bright gel face wash", category: "dull", oldPrice: "₹375", newPrice: "₹308", off: "18% Off", rating: "★★★★☆(12440)", image: "../images/dotnkeysuperbrightfacewash.webp", detailPage: "dotkey-vitamin-c.html" },
  { id: 30, name: "Dot & Key Barrier repair+hydrating gentle face wash", category: "dry", oldPrice: "₹375", newPrice: "₹308", off: "18% Off", rating: "★★★★★(25864)", image: "../images/dotnkeyhydratingfacewash.webp", detailPage: "dotkey-barrier-repair.html" }
];

// ------------------ ELEMENTS ------------------
const productList = document.getElementById("product-list");
const cartCount = document.querySelector(".cart-count");
const filterSelect = document.getElementById("filter");
const sortSelect = document.getElementById("sort");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchButtn");

let currentCategory = "all";
let currentSort = "default";
let cart = [];

// ------------------ HELPERS ------------------
function getPrice(priceStr) {
  return parseFloat(priceStr.replace(/[₹,]/g, "")) || 0;
}

// ------------------ NAVIGATE TO DETAIL PAGE ------------------
function goToProductDetail(detailPage) {
  if (detailPage) {
    window.location.href = detailPage;
  }
}

// ------------------ CART FUNCTIONS ------------------
function updateCartCount() {
  if (cartCount) {
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalQty;
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
  renderProducts(currentCategory);
}

function increaseQty(id) {
  const item = cart.find(p => p.id === id);
  if (item) {
    item.quantity += 1;
    updateCartCount();
    renderProducts(currentCategory);
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
    renderProducts(currentCategory);
  }
}

// ------------------ RENDER PRODUCTS ------------------
function renderProducts(category = currentCategory, list = null) {
  productList.innerHTML = "";
  currentCategory = category;

  let filtered = list ? [...list] : category === "all" ? [...products] : products.filter(p => p.category === category);

  if (currentSort === "lowToHigh") filtered.sort((a, b) => getPrice(a.newPrice) - getPrice(b.newPrice));
  else if (currentSort === "highToLow") filtered.sort((a, b) => getPrice(b.newPrice) - getPrice(a.newPrice));

  if (filtered.length === 0) {
    productList.innerHTML = `<p class="no-products">No products found.</p>`;
    return;
  }

  filtered.forEach(p => {
    const inCart = cart.find(item => item.id === p.id);
    const quantity = inCart ? inCart.quantity : 0;

    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${p.image}" 
           alt="${p.name}" 
           onclick="goToProductDetail('${p.detailPage}')"
           style="cursor: pointer;"
           onerror="this.src='https://via.placeholder.com/250x250?text=Product+Image'">
      <div class="product-info">
        <h4 onclick="goToProductDetail('${p.detailPage}')" style="cursor: pointer;">${p.name}</h4>
        <div class="price">
          ${p.oldPrice ? `<span class="old">${p.oldPrice}</span>` : ''}
          <span class="new">${p.newPrice}</span>
          ${p.off ? `<span class="off">${p.off}</span>` : ''}
        </div>
        ${quantity === 0
          ? `<button class="add-btn" onclick="addToCart(${p.id})">Add to Cart</button>`
          : `<div class="quantity-controls">
               <button class="qty-btn" onclick="decreaseQty(${p.id})">−</button>
               <span class="qty">${quantity}</span>
               <button class="qty-btn" onclick="increaseQty(${p.id})">+</button>
             </div>`}
        <div class="rating">${p.rating}</div>
      </div>
    `;
    productList.appendChild(card);
  });
}

// ------------------ FILTER & SORT ------------------
function filterProducts() {
  currentCategory = filterSelect.value;
  renderProducts(currentCategory);
}

function sortProducts() {
  currentSort = sortSelect.value;
  renderProducts(currentCategory);
}

// ------------------ SEARCH ------------------
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
  if (matched.length > 0) renderProducts("all", matched);
  else productList.innerHTML = `<p class="no-products">No results found.</p>`;
}

searchBtn.addEventListener("click", handleSearch);
searchInput.addEventListener("keydown", e => { if (e.key === "Enter") handleSearch(); });

// ------------------ INIT ------------------
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  updateCartCount();
});
