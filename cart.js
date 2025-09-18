// Cart functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeCart();
});

function initializeCart() {
    loadCartItems();
    setupEventListeners();
}

function setupEventListeners() {
    const clearCartBtn = document.getElementById('clearCartBtn');
    const orderAllBtn = document.getElementById('orderAllBtn');
    
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCart);
    }
    
    if (orderAllBtn) {
        orderAllBtn.addEventListener('click', orderAll);
    }
}

function loadCartItems() {
    const cartItems = getCartItems();
    const cartContent = document.getElementById('cartContent');
    const cartSummary = document.getElementById('cartSummary');
    
    if (cartItems.length === 0) {
        cartContent.innerHTML = `
            <div class="cart-empty">
                <h2 data-translate="cart_empty">Your cart is empty</h2>
                <p>Add some amazing trips to your cart to get started!</p>
                <a href="catalog.html" class="browse-btn">Browse Trips</a>
            </div>
        `;
        cartSummary.style.display = 'none';
        return;
    }
    
    // Display cart items
    cartContent.innerHTML = `
        <div class="cart-items">
            ${cartItems.map(item => createCartItemHTML(item)).join('')}
        </div>
    `;
    
    // Show summary
    cartSummary.style.display = 'block';
    updateTotal();
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-from-cart').forEach(btn => {
        btn.addEventListener('click', function() {
            const tripId = this.dataset.tripId;
            removeFromCart(tripId);
        });
    });
}

function createCartItemHTML(item) {
    return `
        <div class="cart-item" data-trip-id="${item.id}">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.place}" onerror="this.src='img/slider1.jpg'">
            </div>
            <div class="cart-item-info">
                <h3>${item.place} (${item.place_ru})</h3>
                <p class="cart-item-location">${item.city} (${item.city_ru})</p>
                <p class="cart-item-description">${item.description}</p>
                <p class="cart-item-duration">${item.duration} (${item.duration_ru})</p>
                <p class="cart-item-rating">⭐ ${item.rating}/5</p>
            </div>
            <div class="cart-item-price">
                <span class="price">$${item.price}</span>
                <button class="remove-from-cart" data-trip-id="${item.id}" data-translate="remove_from_cart">Remove from Cart</button>
            </div>
        </div>
    `;
}

function getCartItems() {
    try {
        const cartData = localStorage.getItem('cart');
        return cartData ? JSON.parse(cartData) : [];
    } catch (error) {
        console.error('Error loading cart items:', error);
        return [];
    }
}

function saveCartItems(items) {
    try {
        localStorage.setItem('cart', JSON.stringify(items));
    } catch (error) {
        console.error('Error saving cart items:', error);
    }
}

function addToCart(trip) {
    const cartItems = getCartItems();
    
    // Check if item already exists in cart
    const existingItem = cartItems.find(item => item.id === trip.id);
    if (existingItem) {
        alert('This trip is already in your cart!');
        return;
    }
    
    cartItems.push(trip);
    saveCartItems(cartItems);
    
    // Update cart display if we're on the cart page
    if (window.location.pathname.includes('cart.html')) {
        loadCartItems();
    }
    
    // Update cart count in header (if exists)
    updateCartCount();
}

function removeFromCart(tripId) {
    const cartItems = getCartItems();
    const updatedItems = cartItems.filter(item => item.id !== parseInt(tripId));
    saveCartItems(updatedItems);
    loadCartItems();
    updateCartCount();
}

function clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
        localStorage.removeItem('cart');
        loadCartItems();
        updateCartCount();
    }
}

function updateTotal() {
    const cartItems = getCartItems();
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    const totalElement = document.getElementById('totalAmount');
    if (totalElement) {
        totalElement.textContent = total.toFixed(2);
    }
}

function updateCartCount() {
    const cartItems = getCartItems();
    const cartLink = document.getElementById('cartLink');
    if (cartLink) {
        if (cartItems.length > 0) {
            cartLink.innerHTML = `Cart (${cartItems.length})`;
        } else {
            cartLink.innerHTML = 'Cart';
        }
    }
}

function orderAll() {
    const cartItems = getCartItems();
    
    if (cartItems.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    if (confirm(`Are you sure you want to order all ${cartItems.length} trips for $${getTotalAmount().toFixed(2)}?`)) {
        // Clear the cart
        localStorage.removeItem('cart');
        
        // Show success modal
        showSuccessModal();
        
        // Reload cart display
        loadCartItems();
        updateCartCount();
    }
}

function getTotalAmount() {
    const cartItems = getCartItems();
    return cartItems.reduce((sum, item) => sum + item.price, 0);
}

function showSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('successModal');
    if (event.target === modal) {
        closeSuccessModal();
    }
});

// Make functions globally available for HTML onclick handlers
window.closeSuccessModal = closeSuccessModal;
