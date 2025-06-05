// Main JavaScript for HOLLYP E-commerce Clothing Website

// --- CART FUNCTIONALITY ---

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        cartCount.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
    }
}

// Render cart items and total on cart.html
function renderCartPage() {
    const cartTableBody = document.getElementById('cart-table-body');
    const cartTotalContainer = document.getElementById('cart-total');
    const cartSummary = document.getElementById('cart-summary');
    const cartEmptyMessage = document.getElementById('cart-empty-message');
    if (!cartTableBody || !cartTotalContainer) return;

    cartTableBody.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        if (cartSummary) cartSummary.style.display = 'none';
        if (cartEmptyMessage) cartEmptyMessage.style.display = 'block';
        return;
    } else {
        if (cartSummary) cartSummary.style.display = 'block';
        if (cartEmptyMessage) cartEmptyMessage.style.display = 'none';
    }

    cart.forEach((item, idx) => {
        // Ensure price is a valid number
        const price = typeof item.price === 'number' && !isNaN(item.price) ? item.price : 0;
        const totalPrice = price * item.qty;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.title}</td>
            <td>${item.qty}</td>
            <td>$${price.toFixed(2)}</td>
            <td>$${totalPrice.toFixed(2)}</td>
            <td>
                <button class="cart-action-btn" data-idx="${idx}" title="Remove">
                    <i class="fa fa-trash"></i>
                </button>
            </td>
        `;
        cartTableBody.appendChild(row);
        total += totalPrice;
    });

    cartTotalContainer.textContent = `Total: $${total.toFixed(2)}`;
}

function addToCart(product) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    saveCart();
    updateCartCount();
    renderCartPage(); // Update cart page if user is on it
}

document.addEventListener('DOMContentLoaded', () => {
    // Add-to-cart buttons
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function () {
            const card = btn.closest('.ab-product-card');
            if (!card) return;
            const id = card.dataset.id;
            const title = card.dataset.title;
            const price = parseFloat(card.dataset.price);
            addToCart({ id, title, price });
        });
    });

    // Update cart count on page load
    updateCartCount();

    // Render cart page if on cart.html
    renderCartPage();

    // Remove item event
    const cartTableBody = document.getElementById('cart-table-body');
    if (cartTableBody) {
        cartTableBody.addEventListener('click', function(e) {
            const btn = e.target.closest('.cart-action-btn');
            if (btn) {
                const idx = parseInt(btn.dataset.idx, 10);
                if (!isNaN(idx)) {
                    cart.splice(idx, 1);
                    saveCart();
                    updateCartCount();
                    renderCartPage();
                }
            }
        });
    }

    // Make cart icon go to cart page
    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
        cartBtn.addEventListener('click', function (e) {
            e.preventDefault();
            window.location.href = 'cart.html';
        });
    }
});

// --- DARK MODE TOGGLE ---
const darkModeToggle = document.getElementById('darkModeToggle');
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
        updateCartCount();
        renderCartPage();
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