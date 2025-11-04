// Products
const products = [
  { id: 1, name: 'Laptop', price: 999 },
  { id: 2, name: 'Headphones', price: 199 },
  { id: 3, name: 'Keyboard', price: 49 },
];

// State (mimicking Redux store)
const state = {
  cart: [],
};

// Elements
const productList = document.getElementById('productList');
const cartList = document.getElementById('cartList');
const totalPriceEl = document.getElementById('totalPrice');

// Render products
function renderProducts() {
  productList.innerHTML = products.map(p => `
    <div class="product-card">
      <span>${p.name} - $${p.price}</span>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    </div>
  `).join('');
}

// Add item to cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const cartItem = state.cart.find(i => i.id === productId);

  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    state.cart.push({ ...product, quantity: 1 });
  }

  renderCart();
}

// Remove item from cart
function removeFromCart(productId) {
  state.cart = state.cart.filter(i => i.id !== productId);
  renderCart();
}

// Increment quantity
function incrementQty(productId) {
  const item = state.cart.find(i => i.id === productId);
  if (item) item.quantity += 1;
  renderCart();
}

// Decrement quantity
function decrementQty(productId) {
  const item = state.cart.find(i => i.id === productId);
  if (!item) return;

  if (item.quantity > 1) {
    item.quantity -= 1;
  } else {
    state.cart = state.cart.filter(i => i.id !== productId);
  }
  renderCart();
}

// Render cart
function renderCart() {
  if (state.cart.length === 0) {
    cartList.innerHTML = 'Cart is empty';
    totalPriceEl.innerHTML = '';
    return;
  }

  cartList.innerHTML = state.cart.map(i => `
    <div class="cart-item">
      <span>${i.name} - $${i.price} x ${i.quantity}</span>
      <div>
        <button onclick="decrementQty(${i.id})">-</button>
        <button onclick="incrementQty(${i.id})">+</button>
        <button onclick="removeFromCart(${i.id})">Remove</button>
      </div>
    </div>
  `).join('');

  const total = state.cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  totalPriceEl.innerHTML = `Total: $${total}`;
}

// Initial render
renderProducts();
renderCart();
