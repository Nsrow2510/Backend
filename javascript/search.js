// ------------------ PAGE NAVIGATION MAP ------------------
const pages = {
  // Skincare
  "cleanser": "cleansers.html",
  "cleansers": "cleansers.html",
  "facewash": "cleansers.html",
  "face wash": "cleansers.html",
  "serum": "serum.html",
  "serums": "serum.html",
  "toner": "toner.html",
  "toners": "toner.html",
  "moisturizer": "facemositurizer.html",
  "face moisturizer": "facemositurizer.html",
  "sunscreen": "sunscreen.html",
  "sunscreens": "sunscreen.html",
  "mask": "mask.html",
  "masks": "mask.html",
  
  // Lip Care
  "lipbalm": "lipbalm.html",
  "lip balm": "lipbalm.html",
  "lip scrub": "lipscrubs.html",
  "lipscrubs": "lipscrubs.html",
  "lip mask": "lipmasks.html",
  "lipmasks": "lipmasks.html",
  
  // Fragrances - Women
  "fragrance women": "fragrances_women.html",
  "fragrances women": "fragrances_women.html",
  "women perfume": "fragrances_women.html",
  "women fragrance": "fragrances_women.html",
  "for women": "fragrances_women.html",
  
  // Fragrances - Men
  "fragrance men": "fragrances_men.html",
  "fragrances men": "fragrances_men.html",
  "men perfume": "fragrances_men.html",
  "men fragrance": "fragrances_men.html",
  "for men": "fragrances_men.html",
  
  // Fragrances - Unisex
  "fragrance unisex": "fragrances_unisex.html",
  "fragrances unisex": "fragrances_unisex.html",
  "unisex perfume": "fragrances_unisex.html",
  "unisex fragrance": "fragrances_unisex.html",
  
  // General Fragrances
  "fragrance": "fragrances_women.html",
  "fragrances": "fragrances_women.html",
  "perfume": "fragrances_women.html",
  "perfumes": "fragrances_women.html",
  "body mist": "fragrances_women.html",
  "deodorant": "fragrances_women.html",
  "roll on": "fragrances_women.html",
  "rollon": "fragrances_women.html",
  
  // Makeup
  "kajal": "kajal.html",
  "foundation": "foundation.html",
  "concealer": "concealer.html",
  "lipstick": "lipstick.html",
  
  // Tools
  "tools": "tools.html",
  
  // Home
  "home": "index.html",
};

// ------------------ SEARCH FUNCTIONALITY ------------------
function initializeSearch() {
  const searchInput = document.getElementById("page-search-input");
  const searchBtn = document.getElementById("page-search-btn");
  const searchResults = document.getElementById("page-search-results");

  if (!searchInput || !searchBtn || !searchResults) {
    console.error("Search elements not found");
    return;
  }

  // Search button click
  searchBtn.addEventListener("click", function(e) {
    e.preventDefault();
    handleSearch();
  });

  // Enter key press
  searchInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  });

  // Real-time search as user types
  searchInput.addEventListener("input", function() {
    if (searchInput.value.trim()) {
      handleSearch();
    } else {
      searchResults.innerHTML = "";
      searchResults.style.display = "none";
    }
  });

  // Close search results when clicking outside
  document.addEventListener("click", function(e) {
    if (!searchInput.contains(e.target) && 
        !searchResults.contains(e.target) && 
        !searchBtn.contains(e.target)) {
      searchResults.style.display = "none";
    }
  });

  function handleSearch() {
    const query = searchInput.value.trim().toLowerCase();
    
    if (!query) {
      searchResults.innerHTML = "";
      searchResults.style.display = "none";
      return;
    }

    // 1️⃣ Check if query matches a page/category
    for (let key in pages) {
      if (query.includes(key)) {
        window.location.href = pages[key];
        return;
      }
    }

    // 2️⃣ Search within current page by product title
    const productCards = document.querySelectorAll(".product-card");
    const matched = [];

    productCards.forEach(card => {
      const titleElement = card.querySelector(".title");
      const priceElement = card.querySelector(".price");
      const imgElement = card.querySelector("img");

      if (titleElement) {
        const title = titleElement.innerText.toLowerCase();
        
        if (title.includes(query)) {
          matched.push({
            title: titleElement.innerText,
            price: priceElement ? priceElement.innerText.split(' ')[0] : "",
            image: imgElement ? imgElement.src : "",
            card: card
          });
        }
      }
    });

    if (matched.length > 0) {
      displaySearchResults(matched);
    } else {
      searchResults.innerHTML = `<div style="padding: 12px; color: var(--color-text); font-size: 14px;">No results found for "${query}"</div>`;
      searchResults.style.display = "block";
    }
  }

  function displaySearchResults(results) {
    searchResults.innerHTML = "";
    searchResults.style.display = "block";

    results.forEach(product => {
      const resultItem = document.createElement("div");
      resultItem.className = "search-result-item";
      resultItem.innerHTML = `
        <img src="${product.image}" alt="${product.title}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 6px;">
        <div style="flex: 1; min-width: 0;">
          <div style="font-size: 13px; color: var(--color-text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${product.title}</div>
          <div style="font-size: 14px; color: var(--color-primary); font-weight: 600; margin-top: 4px;">${product.price}</div>
        </div>
      `;
      
      resultItem.addEventListener("click", function() {
        scrollToProduct(product.card);
        searchResults.style.display = "none";
        searchInput.value = "";
      });
      
      searchResults.appendChild(resultItem);
    });
  }

  function scrollToProduct(card) {
    card.scrollIntoView({ behavior: "smooth", block: "center" });
    card.style.border = "2px solid var(--color-primary)";
    card.style.transition = "border 0.3s ease";
    
    setTimeout(() => {
      card.style.border = "";
    }, 2500);
  }
}

// Initialize search when DOM is loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeSearch);
} else {
  initializeSearch();
}
