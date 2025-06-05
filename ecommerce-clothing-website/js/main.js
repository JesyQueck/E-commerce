// Main JavaScript for HOLLYP E-commerce Clothing Website

// --- CART FUNCTIONALITY ---

let cart = JSON.parse(localStorage.getItem('cart')) || [];

const cartBtn = document.getElementById('cartBtn');
const cartCount = document.getElementById('cartCount');
const cartSection = document.getElementById('cartSection');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const darkModeToggle = document.getElementById('darkModeToggle');

// Add to Cart
function addToCart(product) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    saveCart();
    updateCart();
}

// Remove from Cart
function removeFromCart(idx) {
    cart.splice(idx, 1);
    saveCart();
    updateCart();
}

// Update Cart Quantity
function updateCartQuantity(idx, qty) {
    if (qty < 1) return;
    cart[idx].qty = qty;
    saveCart();
    updateCart();
}

// Save Cart to LocalStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update Cart UI
function updateCart() {
    if (!cartItems || !cartTotal || !cartCount) return;
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach((item, idx) => {
        total += item.price * item.qty;
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.title}</span>
            <span>
                <button class="qty-btn" data-idx="${idx}" data-action="dec">-</button>
                <span class="qty">${item.qty}</span>
                <button class="qty-btn" data-idx="${idx}" data-action="inc">+</button>
            </span>
            <span>$${(item.price * item.qty).toFixed(2)}</span>
            <button class="remove-btn" data-idx="${idx}"><i class="fa fa-trash"></i></button>
        `;
        cartItems.appendChild(li);
    });
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    cartCount.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
    if (cartSection) cartSection.style.display = cart.length ? 'block' : 'none';
}

// Handle Quantity Buttons & Remove
if (cartItems) {
    cartItems.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-btn') || e.target.closest('.remove-btn')) {
            const idx = e.target.dataset.idx || e.target.closest('.remove-btn').dataset.idx;
            removeFromCart(Number(idx));
        }
        if (e.target.classList.contains('qty-btn')) {
            const idx = Number(e.target.dataset.idx);
            const action = e.target.dataset.action;
            if (action === 'inc') updateCartQuantity(idx, cart[idx].qty + 1);
            if (action === 'dec') updateCartQuantity(idx, cart[idx].qty - 1);
        }
    });
}

// Add-to-cart buttons on product cards
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function() {
            const card = btn.closest('.ab-product-card, .product');
            if (!card) return;
            const id = card.dataset.id || card.getAttribute('data-id') || card.querySelector('h3').textContent.trim();
            const title = card.dataset.title || card.querySelector('h3').textContent.trim();
            const price = parseFloat(card.dataset.price) || parseFloat(card.querySelector('p').textContent.replace(/[^0-9.]/g, ''));
            addToCart({ id, title, price });
        });
    });
    updateCart();
});

// Cart button toggles cart section
if (cartBtn && cartSection) {
    cartBtn.addEventListener('click', () => {
        cartSection.style.display = cartSection.style.display === 'block' ? 'none' : 'block';
    });
}

// Checkout button
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        alert('Thank you for your purchase!');
        cart = [];
        saveCart();
        updateCart();
    });
}

// --- DARK MODE TOGGLE ---
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        darkModeToggle.innerHTML = document.body.classList.contains('dark-mode') ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-regular fa-moon"></i>';
    });
}

// --- CHECKOUT FORM HANDLING ---
const checkoutForm = document.querySelector('#checkout-form');
if (checkoutForm) {
    checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // You can add validation and AJAX here
        alert('Order placed successfully!');
        localStorage.removeItem('cart');
        cart = [];
        updateCart();
        checkoutForm.reset();
    });
}

// --- NEWSLETTER FORM HANDLING ---
const newsletterForm = document.querySelector('.ab-footer-newsletter form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for subscribing!');
        newsletterForm.reset();
    });
}

// --- INITIALIZE CART ON PAGE LOAD ---
updateCart();