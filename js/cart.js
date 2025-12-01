/**
 * BookVerse - Cart JavaScript
 * Handles shopping cart functionality
 */

// Book data structure (in a real app, this would come from a database)
const bookData = {
    1: { id: 1, title: 'The Great Adventure', author: 'John Smith', price: 24.99, image: 'https://via.placeholder.com/300x400/1a237e/ffffff?text=Book+1' },
    2: { id: 2, title: 'Mystery of the Night', author: 'Sarah Johnson', price: 19.99, image: 'https://via.placeholder.com/300x400/1a237e/ffffff?text=Book+2' },
    3: { id: 3, title: 'Science & Discovery', author: 'Dr. Michael Chen', price: 34.99, image: 'https://via.placeholder.com/300x400/1a237e/ffffff?text=Book+3' },
    4: { id: 4, title: 'Love & Romance', author: 'Emma Williams', price: 22.99, image: 'https://via.placeholder.com/300x400/1a237e/ffffff?text=Book+4' },
    5: { id: 5, title: 'Adventure Tales', author: 'Jane Doe', price: 19.99, image: 'https://via.placeholder.com/300x400/1a237e/ffffff?text=Related+1' },
    6: { id: 6, title: 'Journey to the Unknown', author: 'Robert Lee', price: 27.99, image: 'https://via.placeholder.com/300x400/1a237e/ffffff?text=Related+2' },
    7: { id: 7, title: 'Epic Quest', author: 'Maria Garcia', price: 22.99, image: 'https://via.placeholder.com/300x400/1a237e/ffffff?text=Related+3' },
    8: { id: 8, title: 'The Explorer\'s Guide', author: 'David Brown', price: 29.99, image: 'https://via.placeholder.com/300x400/1a237e/ffffff?text=Related+4' }
};

// Initialize cart functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add to cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const bookId = parseInt(this.getAttribute('data-book-id'));
            addToCart(bookId);
        });
    });

    // Load cart page if on cart page
    if (document.getElementById('cartItems')) {
        loadCartPage();
    }

    // Checkout button
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            const cart = getCart();
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            alert('Checkout functionality would be implemented with payment gateway integration.');
            // In a real application, this would redirect to checkout page
        });
    }
});

/**
 * Add Book to Cart
 */
function addToCart(bookId) {
    const book = bookData[bookId];
    if (!book) {
        console.error('Book not found:', bookId);
        return;
    }

    let cart = getCart();
    const existingItem = cart.find(item => item.id === bookId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: book.id,
            title: book.title,
            author: book.author,
            price: book.price,
            image: book.image,
            quantity: 1
        });
    }

    saveCart(cart);
    updateCartCount();
    
    // Show success message
    showNotification('Book added to cart!');
}

/**
 * Remove Item from Cart
 */
function removeFromCart(bookId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== bookId);
    saveCart(cart);
    loadCartPage();
    updateCartCount();
}

/**
 * Update Item Quantity
 */
function updateQuantity(bookId, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(bookId);
        return;
    }

    let cart = getCart();
    const item = cart.find(item => item.id === bookId);
    
    if (item) {
        item.quantity = parseInt(newQuantity);
        saveCart(cart);
        loadCartPage();
        updateCartCount();
    }
}

/**
 * Load Cart Page
 */
function loadCartPage() {
    const cartItemsContainer = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const cartSummary = document.getElementById('cartSummary');
    
    if (!cartItemsContainer) return;

    const cart = getCart();

    if (cart.length === 0) {
        if (emptyCart) emptyCart.style.display = 'block';
        if (cartSummary) cartSummary.style.display = 'none';
        return;
    }

    if (emptyCart) emptyCart.style.display = 'none';
    if (cartSummary) cartSummary.style.display = 'block';

    // Clear existing items (except empty cart message)
    const existingItems = cartItemsContainer.querySelectorAll('.cart-item');
    existingItems.forEach(item => item.remove());

    // Render cart items
    cart.forEach(item => {
        const cartItem = createCartItemHTML(item);
        cartItemsContainer.insertAdjacentHTML('beforeend', cartItem);
    });

    // Attach event listeners to new items
    attachCartItemListeners();

    // Update summary
    updateCartSummary();
}

/**
 * Create Cart Item HTML
 */
function createCartItemHTML(item) {
    const total = (item.price * item.quantity).toFixed(2);
    return `
        <div class="cart-item" data-book-id="${item.id}">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="cart-item-info">
                <h3 class="cart-item-title">${item.title}</h3>
                <p class="cart-item-author">By ${item.author}</p>
                <div class="cart-item-actions">
                    <div class="quantity-control">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
                               onchange="updateQuantity(${item.id}, this.value)">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <span class="remove-item" onclick="removeFromCart(${item.id})">Remove</span>
                </div>
            </div>
            <div class="cart-item-price">
                $${total}
            </div>
        </div>
    `;
}

/**
 * Attach Event Listeners to Cart Items
 */
function attachCartItemListeners() {
    // Quantity inputs
    const quantityInputs = document.querySelectorAll('.quantity-input');
    quantityInputs.forEach(input => {
        input.addEventListener('change', function() {
            const bookId = parseInt(this.closest('.cart-item').getAttribute('data-book-id'));
            updateQuantity(bookId, parseInt(this.value));
        });
    });
}

/**
 * Update Cart Summary
 */
function updateCartSummary() {
    const cart = getCart();
    const subtotalElement = document.getElementById('subtotal');
    const taxElement = document.getElementById('tax');
    const totalElement = document.getElementById('total');
    const shippingElement = document.getElementById('shipping');

    if (!subtotalElement || !totalElement) return;

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = cart.length > 0 ? 5.99 : 0;
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shipping + tax;

    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    if (taxElement) taxElement.textContent = `$${tax.toFixed(2)}`;
    if (shippingElement) shippingElement.textContent = cart.length > 0 ? `$${shipping.toFixed(2)}` : '$0.00';
    totalElement.textContent = `$${total.toFixed(2)}`;
}

/**
 * Get Cart from LocalStorage
 */
function getCart() {
    const cart = localStorage.getItem('bookverse_cart');
    return cart ? JSON.parse(cart) : [];
}

/**
 * Save Cart to LocalStorage
 */
function saveCart(cart) {
    localStorage.setItem('bookverse_cart', JSON.stringify(cart));
    // Update cart count if function exists
    if (typeof updateCartCount === 'function') {
        updateCartCount();
    } else {
        // Fallback: update cart count directly
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    }
}

// Make functions globally accessible
window.getCart = getCart;
window.saveCart = saveCart;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;

/**
 * Show Notification
 */
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

