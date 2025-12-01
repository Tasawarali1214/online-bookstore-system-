/**
 * BookVerse - Shop Page JavaScript
 * Handles book filtering, sorting, search, and pagination
 */

// Sample book data (in a real app, this would come from an API)
const allBooks = [
    { id: 1, title: 'The Great Adventure', author: 'John Smith', price: 24.99, genre: 'fiction', rating: 4.8, image: 'https://via.placeholder.com/300x400/1a237e/ffffff?text=Book+1' },
    { id: 2, title: 'Mystery of the Night', author: 'Sarah Johnson', price: 19.99, genre: 'fiction', rating: 4.5, image: 'https://via.placeholder.com/300x400/1a237e/ffffff?text=Book+2' },
    { id: 3, title: 'Science & Discovery', author: 'Dr. Michael Chen', price: 34.99, genre: 'science', rating: 4.9, image: 'https://via.placeholder.com/300x400/1a237e/ffffff?text=Book+3' },
    { id: 4, title: 'Love & Romance', author: 'Emma Williams', price: 22.99, genre: 'romance', rating: 4.6, image: 'https://via.placeholder.com/300x400/1a237e/ffffff?text=Book+4' },
    { id: 5, title: 'Adventure Tales', author: 'Jane Doe', price: 19.99, genre: 'fiction', rating: 4.5, image: 'https://via.placeholder.com/300x400/1a237e/ffffff?text=Book+5' },
    { id: 6, title: 'Journey to the Unknown', author: 'Robert Lee', price: 27.99, genre: 'fiction', rating: 4.7, image: 'https://via.placeholder.com/300x400/1a237e/ffffff?text=Book+6' },
    { id: 7, title: 'Epic Quest', author: 'Maria Garcia', price: 22.99, genre: 'fiction', rating: 4.6, image: 'https://via.placeholder.com/300x400/1a237e/ffffff?text=Book+7' },
    { id: 8, title: 'The Explorer\'s Guide', author: 'David Brown', price: 29.99, genre: 'history', rating: 4.9, image: 'https://via.placeholder.com/300x400/1a237e/ffffff?text=Book+8' },
    { id: 9, title: 'Business Success', author: 'James Wilson', price: 32.99, genre: 'business', rating: 4.7, image: 'https://via.placeholder.com/300x400/1a237e/ffffff?text=Book+9' },
    { id: 10, title: 'Art & Creativity', author: 'Lisa Anderson', price: 26.99, genre: 'arts', rating: 4.8, image: 'https://via.placeholder.com/300x400/1a237e/ffffff?text=Book+10' },
    { id: 11, title: 'Romantic Escapades', author: 'Chris Taylor', price: 21.99, genre: 'romance', rating: 4.4, image: 'https://via.placeholder.com/300x400/1a237e/ffffff?text=Book+11' },
    { id: 12, title: 'Scientific Breakthroughs', author: 'Dr. Sarah Kim', price: 35.99, genre: 'science', rating: 4.9, image: 'https://via.placeholder.com/300x400/1a237e/ffffff?text=Book+12' }
];

let currentPage = 1;
const booksPerPage = 9;
let filteredBooks = [...allBooks];

// Initialize shop page
document.addEventListener('DOMContentLoaded', function() {
    // Check for URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    const searchParam = urlParams.get('search');

    // Apply category filter if present
    if (categoryParam) {
        const checkbox = document.querySelector(`.genre-filter[value="${categoryParam}"]`);
        if (checkbox) {
            checkbox.checked = true;
        }
    }

    // Apply search if present
    if (searchParam) {
        const searchInput = document.getElementById('filterSearch');
        if (searchInput) {
            searchInput.value = searchParam;
        }
    }

    // Initial render
    applyFilters();

    // Filter event listeners
    const genreFilters = document.querySelectorAll('.genre-filter');
    genreFilters.forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });

    const priceFilters = document.querySelectorAll('.price-filter');
    priceFilters.forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });

    const ratingFilters = document.querySelectorAll('.rating-filter');
    ratingFilters.forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });

    const searchInput = document.getElementById('filterSearch');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(applyFilters, 300));
    }

    // Sort event listener
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            applyFilters();
        });
    }

    // Clear filters button
    const clearFiltersBtn = document.getElementById('clearFilters');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', clearFilters);
    }
});

/**
 * Apply Filters
 */
function applyFilters() {
    // Get selected genres
    const selectedGenres = Array.from(document.querySelectorAll('.genre-filter:checked'))
        .map(cb => cb.value);

    // Get selected price ranges
    const selectedPrices = Array.from(document.querySelectorAll('.price-filter:checked'))
        .map(cb => cb.value);

    // Get selected ratings
    const selectedRatings = Array.from(document.querySelectorAll('.rating-filter:checked'))
        .map(cb => parseInt(cb.value));

    // Get search query
    const searchQuery = document.getElementById('filterSearch')?.value.toLowerCase() || '';

    // Filter books
    filteredBooks = allBooks.filter(book => {
        // Genre filter
        if (selectedGenres.length > 0 && !selectedGenres.includes(book.genre)) {
            return false;
        }

        // Price filter
        if (selectedPrices.length > 0) {
            const priceMatch = selectedPrices.some(range => {
                if (range === '60+') {
                    return book.price >= 60;
                }
                const [min, max] = range.split('-').map(Number);
                return book.price >= min && book.price < max;
            });
            if (!priceMatch) return false;
        }

        // Rating filter
        if (selectedRatings.length > 0) {
            const ratingMatch = selectedRatings.some(rating => book.rating >= rating);
            if (!ratingMatch) return false;
        }

        // Search filter
        if (searchQuery) {
            const matchesTitle = book.title.toLowerCase().includes(searchQuery);
            const matchesAuthor = book.author.toLowerCase().includes(searchQuery);
            if (!matchesTitle && !matchesAuthor) return false;
        }

        return true;
    });

    // Apply sorting
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        const sortValue = sortSelect.value;
        switch (sortValue) {
            case 'price-low':
                filteredBooks.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filteredBooks.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filteredBooks.sort((a, b) => b.rating - a.rating);
                break;
            case 'name':
                filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
                break;
        }
    }

    // Reset to first page
    currentPage = 1;

    // Render books
    renderBooks();
    renderPagination();
    updateResultsCount();
}

/**
 * Clear All Filters
 */
function clearFilters() {
    document.querySelectorAll('.genre-filter, .price-filter, .rating-filter').forEach(cb => {
        cb.checked = false;
    });
    const searchInput = document.getElementById('filterSearch');
    if (searchInput) searchInput.value = '';
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) sortSelect.value = 'default';
    
    applyFilters();
}

/**
 * Render Books
 */
function renderBooks() {
    const booksGrid = document.getElementById('booksGrid');
    if (!booksGrid) return;

    // Calculate pagination
    const startIndex = (currentPage - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;
    const booksToShow = filteredBooks.slice(startIndex, endIndex);

    // Clear grid
    booksGrid.innerHTML = '';

    if (booksToShow.length === 0) {
        booksGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
                <h3 style="color: var(--text-light); margin-bottom: 10px;">No books found</h3>
                <p style="color: var(--text-light);">Try adjusting your filters</p>
            </div>
        `;
        return;
    }

    // Render books
    booksToShow.forEach(book => {
        const bookCard = createBookCardHTML(book);
        booksGrid.insertAdjacentHTML('beforeend', bookCard);
    });

    // Attach add to cart listeners
    attachAddToCartListeners();
}

/**
 * Create Book Card HTML
 */
function createBookCardHTML(book) {
    const stars = '★'.repeat(Math.floor(book.rating)) + '☆'.repeat(5 - Math.floor(book.rating));
    return `
        <div class="book-card fade-in">
            <div class="book-image">
                <img src="${book.image}" alt="${book.title}">
                <div class="book-overlay">
                    <a href="book-detail.html?id=${book.id}" class="btn btn-sm">View Details</a>
                </div>
            </div>
            <div class="book-info">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">${book.author}</p>
                <div class="book-rating">
                    <span class="stars">${stars}</span>
                    <span class="rating-text">(${book.rating})</span>
                </div>
                <div class="book-price">
                    <span class="price">$${book.price.toFixed(2)}</span>
                </div>
                <button class="btn btn-primary btn-sm add-to-cart" data-book-id="${book.id}">Add to Cart</button>
            </div>
        </div>
    `;
}

/**
 * Attach Add to Cart Listeners
 */
function attachAddToCartListeners() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const bookId = parseInt(this.getAttribute('data-book-id'));
            if (typeof addToCart === 'function') {
                addToCart(bookId);
            }
        });
    });
}

/**
 * Render Pagination
 */
function renderPagination() {
    const pagination = document.getElementById('pagination');
    if (!pagination) return;

    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
    
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }

    let paginationHTML = '';

    // Previous button
    paginationHTML += `
        <button ${currentPage === 1 ? 'disabled' : ''} onclick="goToPage(${currentPage - 1})">
            Previous
        </button>
    `;

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            paginationHTML += `
                <button class="${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">
                    ${i}
                </button>
            `;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            paginationHTML += `<span>...</span>`;
        }
    }

    // Next button
    paginationHTML += `
        <button ${currentPage === totalPages ? 'disabled' : ''} onclick="goToPage(${currentPage + 1})">
            Next
        </button>
    `;

    pagination.innerHTML = paginationHTML;
}

/**
 * Go to Page
 */
function goToPage(page) {
    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    renderBooks();
    renderPagination();
    
    // Scroll to top of books grid
    const booksGrid = document.getElementById('booksGrid');
    if (booksGrid) {
        booksGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Make function globally accessible
window.goToPage = goToPage;

/**
 * Update Results Count
 */
function updateResultsCount() {
    const resultsCount = document.getElementById('resultsCount');
    if (resultsCount) {
        const count = filteredBooks.length;
        resultsCount.textContent = `Showing ${count} book${count !== 1 ? 's' : ''}`;
    }
}

/**
 * Debounce Function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

