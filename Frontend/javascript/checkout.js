const userId = localStorage.getItem("userId");

if (!userId) {
  alert("Login first!");
  window.location.href = "login.html";
}

// ✅ LOAD USER
fetch(`http://localhost:3000/api/users/${userId}`)
  .then(res => res.json())
  .then(user => {
    document.getElementById("name").innerText = user.name;
    document.getElementById("email").innerText = user.email;
  });

// ✅ LOAD CART
async function loadCart() {
  const res = await fetch(`http://localhost:3000/api/cart/${userId}`);
  const items = await res.json();

  const container = document.getElementById("cart-items");
  let total = 0;

  container.innerHTML = "";

  items.forEach(item => {
    total += item.price * item.quantity;

    container.innerHTML += `
      <div class="cart-item">
        ${item.productName} - ₹${item.price} x ${item.quantity}
      </div>
    `;
  });

  document.getElementById("total").innerText = "Total: ₹" + total;
}

loadCart();

// ✅ PLACE ORDER
document.getElementById("place-order-btn").addEventListener("click", async () => {
  const address = document.getElementById("address").value;

  if (!address) {
    alert("Enter address!");
    return;
  }

  // 👉 simple order success (no DB yet)
  alert("Order placed successfully!");

  // 🧹 clear cart
  await fetch(`http://localhost:3000/api/cart/user/${userId}`, {
    method: "DELETE"
  });

  window.location.href = "main.html";
});