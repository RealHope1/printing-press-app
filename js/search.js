// Search JavaScript for INKWATT Platform

class SearchManager {
    constructor() {
        this.searchIndex = [];
        this.searchHistory = [];
        this.popularSearches = ['t-shirt', 'business cards', 'flyers', 'posters', 'books', 'mugs'];
        this.init();
    }

    init() {
        this.buildSearchIndex();
        this.setupSearchUI();
        this.loadSearchHistory();
        this.setupKeyboardShortcuts();
    }

    // Build search index from products and services
    buildSearchIndex() {
        // Products data
        const products = [
            {
                id: 1,
                title: 'Basic T-Shirt Printing',
                category: 'tshirts',
                description: 'Custom printed t-shirts with your design',
                price: 30,
                tags: ['t-shirt', 'shirt', 'apparel', 'clothing', 'custom', 'printing'],
                url: 'shop.html'
            },
            {
                id: 2,
                title: 'Premium T-Shirt Printing',
                category: 'tshirts',
                description: 'High-quality t-shirts with advanced printing',
                price: 50,
                tags: ['t-shirt', 'shirt', 'premium', 'apparel', 'clothing', 'printing'],
                url: 'shop.html'
            },
            {
                id: 3,
                title: 'Basic Business Card',
                category: 'business',
                description: 'Standard business cards on quality paper',
                price: 2,
                tags: ['business', 'card', 'professional', 'networking', 'printing'],
                url: 'shop.html'
            },
            {
                id: 4,
                title: 'Premium Business Card',
                category: 'business',
                description: 'Luxury business cards with special finishes',
                price: 5,
                tags: ['business', 'card', 'premium', 'luxury', 'professional', 'printing'],
                url: 'shop.html'
            },
            {
                id: 5,
                title: 'Basic Flyer',
                category: 'flyers',
                description: 'Standard flyers for promotions and events',
                price: 0.50,
                tags: ['flyer', 'marketing', 'promotion', 'advertisement', 'printing'],
                url: 'shop.html'
            },
            {
                id: 6,
                title: 'Premium Flyer',
                category: 'flyers',
                description: 'High-quality flyers with premium paper',
                price: 1,
                tags: ['flyer', 'premium', 'marketing', 'promotion', 'printing'],
                url: 'shop.html'
            },
            {
                id: 7,
                title: 'Basic Poster',
                category: 'posters',
                description: 'Standard posters for events and advertising',
                price: 20,
                tags: ['poster', 'large format', 'advertisement', 'event', 'printing'],
                url: 'shop.html'
            },
            {
                id: 8,
                title: 'Large Poster',
                category: 'posters',
                description: 'Large format posters for maximum impact',
                price: 35,
                tags: ['poster', 'large', 'format', 'advertisement', 'printing'],
                url: 'shop.html'
            },
            {
                id: 9,
                title: 'Paperback Book Printing',
                category: 'books',
                description: 'Quality paperback book printing',
                price: 15,
                tags: ['book', 'paperback', 'publishing', 'printing', 'binding'],
                url: 'shop.html'
            },
            {
                id: 10,
                title: 'Basic Printed Mug',
                category: 'cups',
                description: 'Custom printed ceramic mugs',
                price: 25,
                tags: ['mug', 'cup', 'ceramic', 'custom', 'gift', 'printing'],
                url: 'shop.html'
            },
            {
                id: 11,
                title: 'Basic Rubber Stamp',
                category: 'stamps',
                description: 'Custom rubber stamps for business use',
                price: 40,
                tags: ['stamp', 'rubber', 'custom', 'business', 'office', 'printing'],
                url: 'shop.html'
            }
        ];

        // Services data
        const services = [
            {
                id: 'dtf',
                title: 'DTF Printing',
                category: 'services',
                description: 'Direct-to-Film printing technology for vibrant, durable prints on any fabric',
                tags: ['dtf', 'direct to film', 'fabric', 'textile', 'printing'],
                url: 'services.html'
            },
            {
                id: 'tshirt',
                title: 'T-Shirt Printing',
                category: 'services',
                description: 'Custom t-shirt printing with premium quality materials',
                tags: ['t-shirt', 'shirt', 'apparel', 'clothing', 'custom', 'printing'],
                url: 'services.html'
            },
            {
                id: 'flyers',
                title: 'Flyer Printing',
                category: 'services',
                description: 'Professional flyer printing for marketing and promotions',
                tags: ['flyer', 'marketing', 'promotion', 'advertisement', 'printing'],
                url: 'services.html'
            },
            {
                id: 'posters',
                title: 'Poster Printing',
                category: 'services',
                description: 'Large format poster printing for events, advertisements, and decorations',
                tags: ['poster', 'large format', 'advertisement', 'event', 'printing'],
                url: 'services.html'
            },
            {
                id: 'books',
                title: 'Book Printing',
                category: 'services',
                description: 'Professional book printing and binding services',
                tags: ['book', 'publishing', 'binding', 'printing'],
                url: 'services.html'
            },
            {
                id: 'cups',
                title: 'Cup Printing',
                category: 'services',
                description: 'Custom printed cups and mugs for businesses, events, and personal use',
                tags: ['cup', 'mug', 'ceramic', 'custom', 'gift', 'printing'],
                url: 'services.html'
            },
            {
                id: 'stamps',
                title: 'Rubber Stamp Printing',
                category: 'services',
                description: 'Custom rubber stamps for business and personal use',
                tags: ['stamp', 'rubber', 'custom', 'business', 'office', 'printing'],
                url: 'services.html'
            },
            {
                id: 'cards',
                title: 'Business Cards',
                category: 'services',
                description: 'Premium quality business cards with various finishing options',
                tags: ['business', 'card', 'professional', 'networking', 'printing'],
                url: 'services.html'
            }
        ];

        this.searchIndex = [...products, ...services];
    }

    // Setup search UI components
    setupSearchUI() {
        this.createGlobalSearch();
        this.createSearchSuggestions();
        this.setupSearchListeners();
    }

    // Create global search bar
    createGlobalSearch() {
        const searchHTML = `
            <div class="global-search-container" id="globalSearch">
                <div class="search-input-wrapper">
                    <input type="text" 
                           id="globalSearchInput" 
                           placeholder="Search products, services..." 
                           autocomplete="off">
                    <button id="searchToggleBtn" class="search-toggle-btn">🔍</button>
                </div>
                <div id="searchSuggestions" class="search-suggestions"></div>
            </div>
        `;

        // Add to navigation
        const navContainer = document.querySelector('.nav-container');
        if (navContainer) {
            const searchDiv = document.createElement('div');
            searchDiv.innerHTML = searchHTML;
            navContainer.appendChild(searchDiv.firstElementChild);
        }
    }

    // Create search suggestions dropdown
    createSearchSuggestions() {
        const suggestionsHTML = `
            <div class="search-suggestions-content">
                <div class="suggestion-section">
                    <h4>Popular Searches</h4>
                    <div class="popular-searches">
                        ${this.popularSearches.map(term => 
                            `<button class="popular-search-btn" onclick="searchManager.searchTerm('${term}')">${term}</button>`
                        ).join('')}
                    </div>
                </div>
                <div class="suggestion-section">
                    <h4>Recent Searches</h4>
                    <div class="recent-searches" id="recentSearches"></div>
                </div>
                <div class="suggestion-section">
                    <h4>Categories</h4>
                    <div class="category-suggestions">
                        <button onclick="searchManager.filterByCategory('tshirts')">👕 T-Shirts</button>
                        <button onclick="searchManager.filterByCategory('business')">💼 Business Cards</button>
                        <button onclick="searchManager.filterByCategory('flyers')">📄 Flyers</button>
                        <button onclick="searchManager.filterByCategory('posters')">📊 Posters</button>
                        <button onclick="searchManager.filterByCategory('books')">📚 Books</button>
                        <button onclick="searchManager.filterByCategory('cups')">☕ Cups</button>
                        <button onclick="searchManager.filterByCategory('stamps')">🔖 Stamps</button>
                    </div>
                </div>
            </div>
        `;

        const suggestionsContainer = document.getElementById('searchSuggestions');
        if (suggestionsContainer) {
            suggestionsContainer.innerHTML = suggestionsHTML;
        }
    }

    // Setup search event listeners
    setupSearchListeners() {
        const searchInput = document.getElementById('globalSearchInput');
        const searchToggle = document.getElementById('searchToggleBtn');
        const searchContainer = document.getElementById('globalSearch');
        const suggestions = document.getElementById('searchSuggestions');

        if (!searchInput) return;

        // Search input events
        searchInput.addEventListener('input', this.debounce((e) => {
            const query = e.target.value.trim();
            if (query.length > 0) {
                this.showSearchSuggestions(query);
                this.performLiveSearch(query);
            } else {
                this.hideSearchSuggestions();
            }
        }, 300));

        searchInput.addEventListener('focus', () => {
            if (searchInput.value.trim().length === 0) {
                this.showDefaultSuggestions();
            }
        });

        // Search toggle button
        if (searchToggle) {
            searchToggle.addEventListener('click', () => {
                searchInput.focus();
            });
        }

        // Click outside to close suggestions
        document.addEventListener('click', (e) => {
            if (!searchContainer.contains(e.target)) {
                this.hideSearchSuggestions();
            }
        });

        // Keyboard navigation
        searchInput.addEventListener('keydown', (e) => {
            this.handleKeyboardNavigation(e);
        });
    }

    // Perform search
    performSearch(query) {
        const results = this.search(query);
        this.displaySearchResults(results, query);
        this.addToSearchHistory(query);
        this.hideSearchSuggestions();
        
        // Track search analytics
        this.trackSearch(query, results.length);
    }

    // Live search (real-time results)
    performLiveSearch(query) {
        const results = this.search(query);
        this.displayLiveResults(results);
    }

    // Core search function
    search(query) {
        const normalizedQuery = query.toLowerCase().trim();
        
        if (!normalizedQuery) return [];

        return this.searchIndex.filter(item => {
            // Search in title
            if (item.title.toLowerCase().includes(normalizedQuery)) return true;
            
            // Search in description
            if (item.description.toLowerCase().includes(normalizedQuery)) return true;
            
            // Search in tags
            if (item.tags.some(tag => tag.toLowerCase().includes(normalizedQuery))) return true;
            
            // Search in category
            if (item.category.toLowerCase().includes(normalizedQuery)) return true;
            
            return false;
        }).sort((a, b) => {
            // Sort by relevance (title matches first)
            const aTitleMatch = a.title.toLowerCase().includes(normalizedQuery);
            const bTitleMatch = b.title.toLowerCase().includes(normalizedQuery);
            
            if (aTitleMatch && !bTitleMatch) return -1;
            if (!aTitleMatch && bTitleMatch) return 1;
            
            return 0;
        });
    }

    // Display search results
    displaySearchResults(results, query) {
        // If on shop page, filter existing products
        if (window.location.pathname.includes('shop.html')) {
            this.filterShopPage(results);
            return;
        }

        // Otherwise, redirect to shop with search query
        window.location.href = `shop.html?search=${encodeURIComponent(query)}`;
    }

    // Display live search results
    displayLiveResults(results) {
        const suggestionsContainer = document.getElementById('searchSuggestions');
        if (!suggestionsContainer) return;

        if (results.length === 0) {
            suggestionsContainer.innerHTML = `
                <div class="search-suggestions-content">
                    <div class="no-results">
                        <p>No results found</p>
                    </div>
                </div>
            `;
            return;
        }

        const resultsHTML = `
            <div class="search-suggestions-content">
                <div class="live-results">
                    <h4>Search Results</h4>
                    ${results.slice(0, 5).map(result => `
                        <div class="search-result-item" onclick="searchManager.selectResult(${result.id})">
                            <div class="result-info">
                                <h5>${this.highlightMatch(result.title, suggestionsContainer.previousElementSibling.value)}</h5>
                                <p>${result.description}</p>
                                <span class="result-category">${result.category}</span>
                            </div>
                            ${result.price ? `<span class="result-price">GHS ${result.price}</span>` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        suggestionsContainer.innerHTML = resultsHTML;
        suggestionsContainer.style.display = 'block';
    }

    // Show search suggestions
    showSearchSuggestions(query) {
        const suggestions = this.getSuggestions(query);
        const suggestionsContainer = document.getElementById('searchSuggestions');
        
        if (!suggestionsContainer) return;

        const suggestionsHTML = `
            <div class="search-suggestions-content">
                <div class="suggestions-list">
                    ${suggestions.map(suggestion => `
                        <div class="suggestion-item" onclick="searchManager.selectSuggestion('${suggestion}')">
                            🔍 ${this.highlightMatch(suggestion, query)}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        suggestionsContainer.innerHTML = suggestionsHTML;
        suggestionsContainer.style.display = 'block';
    }

    // Show default suggestions
    showDefaultSuggestions() {
        const suggestionsContainer = document.getElementById('searchSuggestions');
        if (!suggestionsContainer) return;

        this.updateRecentSearches();
        suggestionsContainer.style.display = 'block';
    }

    // Hide search suggestions
    hideSearchSuggestions() {
        const suggestionsContainer = document.getElementById('searchSuggestions');
        if (suggestionsContainer) {
            suggestionsContainer.style.display = 'none';
        }
    }

    // Get search suggestions
    getSuggestions(query) {
        const normalizedQuery = query.toLowerCase();
        const suggestions = new Set();

        this.searchIndex.forEach(item => {
            // Add title suggestions
            if (item.title.toLowerCase().includes(normalizedQuery)) {
                suggestions.add(item.title);
            }

            // Add tag suggestions
            item.tags.forEach(tag => {
                if (tag.toLowerCase().includes(normalizedQuery)) {
                    suggestions.add(tag);
                }
            });
        });

        return Array.from(suggestions).slice(0, 5);
    }

    // Highlight matching text
    highlightMatch(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    // Select search result
    selectResult(itemId) {
        const item = this.searchIndex.find(i => i.id === itemId);
        if (item) {
            window.location.href = item.url;
        }
    }

    // Select suggestion
    selectSuggestion(suggestion) {
        const searchInput = document.getElementById('globalSearchInput');
        if (searchInput) {
            searchInput.value = suggestion;
            this.performSearch(suggestion);
        }
    }

    // Search specific term
    searchTerm(term) {
        const searchInput = document.getElementById('globalSearchInput');
        if (searchInput) {
            searchInput.value = term;
            this.performSearch(term);
        }
    }

    // Filter by category
    filterByCategory(category) {
        window.location.href = `shop.html?category=${category}`;
    }

    // Filter shop page
    filterShopPage(results) {
        const productCards = document.querySelectorAll('.product-card');
        let visibleCount = 0;

        productCards.forEach(card => {
            const productName = card.querySelector('h3')?.textContent || '';
            const productDesc = card.querySelector('p')?.textContent || '';
            
            const isVisible = results.some(result => 
                result.title === productName || 
                result.description.includes(productDesc.substring(0, 50))
            );
            
            card.style.display = isVisible ? '' : 'none';
            if (isVisible) visibleCount++;
        });

        // Show no results message
        const noResults = document.getElementById('noResults');
        if (noResults) {
            noResults.style.display = visibleCount === 0 ? 'block' : 'none';
        }
    }

    // Search history management
    addToSearchHistory(query) {
        if (!query || query.length < 2) return;

        // Remove existing entry
        this.searchHistory = this.searchHistory.filter(item => item !== query);
        
        // Add to beginning
        this.searchHistory.unshift(query);
        
        // Keep only last 10 searches
        this.searchHistory = this.searchHistory.slice(0, 10);
        
        // Save to localStorage
        localStorage.setItem('inkwatt_search_history', JSON.stringify(this.searchHistory));
        
        this.updateRecentSearches();
    }

    loadSearchHistory() {
        const saved = localStorage.getItem('inkwatt_search_history');
        if (saved) {
            this.searchHistory = JSON.parse(saved);
        }
        this.updateRecentSearches();
    }

    updateRecentSearches() {
        const recentSearchesContainer = document.getElementById('recentSearches');
        if (!recentSearchesContainer) return;

        if (this.searchHistory.length === 0) {
            recentSearchesContainer.innerHTML = '<p class="no-recent-searches">No recent searches</p>';
            return;
        }

        recentSearchesContainer.innerHTML = this.searchHistory.map(term => 
            `<button class="recent-search-btn" onclick="searchManager.searchTerm('${term}')">${term}</button>`
        ).join('');
    }

    // Search analytics
    trackSearch(query, resultCount) {
        const searchEvent = {
            query: query,
            resultCount: resultCount,
            timestamp: new Date().toISOString(),
            page: window.location.pathname
        };

        const searches = JSON.parse(localStorage.getItem('inkwatt_searches') || '[]');
        searches.push(searchEvent);
        
        // Keep only last 100 searches
        if (searches.length > 100) {
            searches.splice(0, searches.length - 100);
        }
        
        localStorage.setItem('inkwatt_searches', JSON.stringify(searches));
    }

    // Keyboard navigation
    handleKeyboardNavigation(e) {
        const suggestions = document.querySelectorAll('.search-result-item, .suggestion-item');
        if (suggestions.length === 0) return;

        let currentIndex = -1;
        suggestions.forEach((item, index) => {
            if (item.classList.contains('selected')) {
                currentIndex = index;
            }
        });

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                currentIndex = Math.min(currentIndex + 1, suggestions.length - 1);
                this.updateSelection(suggestions, currentIndex);
                break;
            case 'ArrowUp':
                e.preventDefault();
                currentIndex = Math.max(currentIndex - 1, -1);
                this.updateSelection(suggestions, currentIndex);
                break;
            case 'Enter':
                e.preventDefault();
                if (currentIndex >= 0) {
                    suggestions[currentIndex].click();
                } else {
                    this.performSearch(e.target.value);
                }
                break;
            case 'Escape':
                this.hideSearchSuggestions();
                e.target.blur();
                break;
        }
    }

    updateSelection(suggestions, selectedIndex) {
        suggestions.forEach((item, index) => {
            item.classList.toggle('selected', index === selectedIndex);
        });
    }

    // Keyboard shortcuts
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K for global search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                const searchInput = document.getElementById('globalSearchInput');
                if (searchInput) {
                    searchInput.focus();
                    searchInput.select();
                }
            }
        });
    }

    // Utility: Debounce function
    debounce(func, wait) {
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

    // Get popular searches
    getPopularSearches() {
        return this.popularSearches;
    }

    // Get search suggestions for autocomplete
    getAutocompleteSuggestions(query) {
        return this.getSuggestions(query);
    }

    // Clear search history
    clearSearchHistory() {
        this.searchHistory = [];
        localStorage.removeItem('inkwatt_search_history');
        this.updateRecentSearches();
    }
}

// Initialize search manager
const searchManager = new SearchManager();

// Global search function for backward compatibility
function searchProducts() {
    const searchInput = document.getElementById('productSearch') || document.getElementById('globalSearchInput');
    if (searchInput) {
        searchManager.performSearch(searchInput.value);
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SearchManager;
}
