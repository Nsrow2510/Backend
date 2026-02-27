const CART_API_URL = "http://localhost:3000/cart";
const cartlist = document.getElementById("cartlist");

// Update cart count badge in navbar
async function updateCartCount() {
  try {
    const items = await fetch(CART_API_URL).then(r => r.json());
    let count = 0;
    items.forEach(item => { count += (item.qty || 1); });
    const countSpan = document.getElementById("cart-count");
    if (countSpan) countSpan.innerText = count;
  } catch {
    const countSpan = document.getElementById("cart-count");
    if (countSpan) countSpan.innerText = 0;
  }
}

// Render all cart items
async function getCartItems() {
  let items = [];
  try {
    items = await fetch(CART_API_URL).then(r => r.json());
  } catch {
    cartlist.innerHTML = "<p>Could not load cart. Make sure JSON Server is running on port 3000.</p>";
    return;
  }

  cartlist.innerHTML = "";
  let totalAmount = 0;
  let totalQty = 0;

  if (!items.length) {
    cartlist.innerHTML = "<p>Your cart is empty.</p>";
    document.getElementById("cart-total-amount").innerText = "";
    updateCartCount();
    return;
  }

  items.forEach(item => {
    const price = item.price || 0;
    const qty = item.qty || 1;
    totalAmount += price * qty;
    totalQty += qty;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${item.image.startsWith('http') ? item.image : item.image}" width="70" alt="${item.title}">
      <div>
        <p>${item.title}</p>
        <p>₹${price} x ${qty} = <strong>₹${price * qty}</strong></p>
        <button class="qty-btn" data-id="${item.id}" data-action="decrease">-</button>
        <span style="margin: 0 8px;">${qty}</span>
        <button class="qty-btn" data-id="${item.id}" data-action="increase">+</button>
        <button class="remove-btn" data-id="${item.id}">Remove</button>
      </div>
    `;
    cartlist.appendChild(div);
  });

  const totalElement = document.getElementById("cart-total-amount");
  if (totalElement) {
    totalElement.innerText = `Total (${totalQty} item${totalQty !== 1 ? 's' : ''}): ₹${totalAmount}`;
  }
  updateCartCount();
}

// Increase or decrease quantity; remove if qty reaches 0
async function changeQty(id, newQty) {
  if (newQty <= 0) {
    await removeFromCart(id);
  } else {
    try {
      await fetch(`${CART_API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ qty: newQty })
      });
      getCartItems();
    } catch {
      alert('Error updating quantity. Make sure JSON Server is running.');
    }
  }
}

// Remove item from cart
async function removeFromCart(id) {
  try {
    await fetch(`${CART_API_URL}/${id}`, { method: 'DELETE' });
    getCartItems();
  } catch {
    alert('Error removing item. Make sure JSON Server is running.');
  }
}

// Handle +, -, and Remove button clicks
cartlist.addEventListener("click", async (event) => {
  const target = event.target;

  if (target.classList.contains("qty-btn")) {
    const id = target.getAttribute("data-id");
    const action = target.getAttribute("data-action");
    const items = await fetch(CART_API_URL).then(r => r.json()).catch(() => []);
    const item = items.find(i => String(i.id) === String(id));
    const currentQty = item ? (item.qty || 1) : 1;
    if (action === "increase") changeQty(id, currentQty + 1);
    else if (action === "decrease") changeQty(id, currentQty - 1);

  } else if (target.classList.contains("remove-btn")) {
    const id = target.getAttribute("data-id");
    removeFromCart(id);
  }
});

// Load cart on page load
document.addEventListener("DOMContentLoaded", () => {
  getCartItems();

  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("order") === "success") {
    alert("Thank you for your order!");
    history.replaceState(null, '', window.location.pathname);
  }
});

// Checkout button
document.getElementById('checkout-btn')?.addEventListener('click', () => {
  window.location.href = 'checkout.html';
});