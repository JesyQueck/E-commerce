// This file contains JavaScript functionality for the e-commerce clothing website.

const cart = [];
const cartBtn = document.getElementById('cartBtn');
const cartSection = document.getElementById('cartSection');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.getElementById('cartCount');
const checkoutBtn = document.getElementById('checkoutBtn');
const darkModeToggle = document.getElementById('darkModeToggle');

// Function to add an item to the cart
function addToCart(productId) {
    // Logic to add the product to the cart
    console.log(`Product ${productId} added to cart.`);
}

// Function to remove an item from the cart
function removeFromCart(productId) {
    // Logic to remove the product from the cart
    console.log(`Product ${productId} removed from cart.`);
}

// Function to update the quantity of an item in the cart
function updateCartQuantity(productId, quantity) {
    // Logic to update the quantity of the product in the cart
    console.log(`Product ${productId} quantity updated to ${quantity}.`);
}

// Function to handle form submission for checkout
function handleCheckoutForm(event) {
    event.preventDefault();
    // Logic to handle checkout form submission
    console.log("Checkout form submitted.");
}

function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach((item, idx) => {
        total += item.price * item.qty;
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.title} x${item.qty} - $${(item.price * item.qty).toFixed(2)}
            <button onclick="removeFromCart(${idx})">Remove</button>
        `;
        cartItems.appendChild(li);
    });
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    cartCount.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
    cartSection.style.display = cart.length ? 'block' : 'none';
}

window.removeFromCart = function(idx) {
    cart.splice(idx, 1);
    updateCart();
};

document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', function() {
        const product = this.closest('.product');
        const id = product.dataset.id;
        const title = product.dataset.title;
        const price = parseFloat(product.dataset.price);
        const existing = cart.find(item => item.id === id);
        if (existing) {
            existing.qty += 1;
        } else {
            cart.push({ id, title, price, qty: 1 });
        }
        updateCart();
    });
});

cartBtn.addEventListener('click', () => {
    cartSection.style.display = cartSection.style.display === 'block' ? 'none' : 'block';
});

checkoutBtn.addEventListener('click', () => {
    alert('Thank you for your purchase!');
    cart.length = 0;
    updateCart();
});

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    darkModeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Add event listeners for buttons and forms
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            addToCart(productId);
        });
    });

    const checkoutForm = document.querySelector('#checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckoutForm);
    }
    // Initialize
    updateCart();
});