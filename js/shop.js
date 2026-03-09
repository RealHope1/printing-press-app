// Shop JavaScript for INKWATT Platform

class ShopManager {
    constructor() {
        this.products = [];
        this.filteredProducts = [];
        this.cart = [];
        this.init();
    }

    init() {
        this.loadProducts();
        this.setupEventListeners();
        this.initAnimations();
    }

    // Load products data
    loadProducts() {
        // Product data - in real app, this would come from an API
        this.products = [
            {
                id: 1,
                name: 'Basic T-Shirt Printing',
                category: 'tshirts',
                price: 30,
                size: 'Custom',
                image: 'images/photo_15_2026-03-07_18-17-47.jpg',
                description: 'Custom printed t-shirts with your design',
                features: ['100% Cotton', 'Vibrant Colors', 'Durable Print', 'Various Sizes']
            },
            {
                id: 2,
                name: 'Premium T-Shirt Printing',
                category: 'tshirts',
                price: 50,
                size: 'Custom',
                image: 'images/photo_16_2026-03-07_18-17-47.jpg',
                description: 'High-quality t-shirts with advanced printing',
                features: ['Premium Cotton', 'HD Print', 'Long-lasting', 'Custom Fit']
            },
            {
                id: 3,
                name: 'Basic Business Card',
                category: 'business',
                price: 2,
                size: 'A6',
                image: 'images/bussiness card.jpg',
                description: 'Standard business cards on quality paper',
                features: ['Quality Paper', 'Full Color', 'Standard Size', 'Fast Delivery']
            },
            {
                id: 4,
                name: 'Premium Business Card',
                category: 'business',
                price: 5,
                size: 'A6',
                image: 'images/photo_17_2026-03-07_18-17-47.jpg',
                description: 'Luxury business cards with special finishes',
                features: ['Premium Stock', 'Spot UV', 'Rounded Corners', 'Embossing']
            },
            {
                id: 5,
                name: 'Basic Flyer',
                category: 'flyers',
                price: 0.50,
                size: 'A5',
                image: 'images/photo_18_2026-03-07_18-17-48.jpg',
                description: 'Standard flyers for promotions and events',
                features: ['Standard Paper', 'Full Color', 'Quick Turnaround', 'Bulk Discounts']
            },
            {
                id: 6,
                name: 'Premium Flyer',
                category: 'flyers',
                price: 1,
                size: 'A5',
                image: 'images/photo_19_2026-03-07_18-17-49.jpg',
                description: 'High-quality flyers with premium paper',
                features: ['Premium Paper', 'Glossy Finish', 'High Resolution', 'Professional Look']
            },
            {
                id: 7,
                name: 'Basic Poster',
                category: 'posters',
                price: 20,
                size: 'A3',
                image: 'images/photo_20_2026-03-07_18-17-49.jpg',
                description: 'Standard posters for events and advertising',
                features: ['Standard Paper', 'Vibrant Colors', 'Multiple Sizes', 'Indoor/Outdoor']
            },
            {
                id: 8,
                name: 'Large Poster',
                category: 'posters',
                price: 35,
                size: 'A2',
                image: 'images/photo_21_2026-03-07_18-17-49.jpg',
                description: 'Large format posters for maximum impact',
                features: ['Large Format', 'High Resolution', 'Weather Resistant', 'Eye-catching']
            },
            {
                id: 9,
                name: 'Paperback Book Printing',
                category: 'books',
                price: 15,
                size: 'A5',
                image: 'images/photo_22_2026-03-07_18-17-50.jpg',
                description: 'Quality paperback book printing',
                features: ['Perfect Binding', 'Custom Cover', 'Various Sizes', 'ISBN Support']
            },
            {
                id: 10,
                name: 'Basic Printed Mug',
                category: 'cups',
                price: 25,
                size: 'Custom',
                image: 'images/photo_23_2026-03-07_18-17-50.jpg',
                description: 'Custom printed ceramic mugs',
                features: ['Ceramic Material', 'Dishwasher Safe', 'Full Wrap Print', 'Gift Box']
            },
            {
                id: 11,
                name: 'Basic Rubber Stamp',
                category: 'stamps',
                price: 40,
                size: 'Custom',
                image: 'images/photo_24_2026-03-07_18-17-51.jpg',
                description: 'Custom rubber stamps for business use',
                features: ['Custom Design', 'Self-inking Available', 'Durable', 'Professional']
            }
        ];

        this.filteredProducts = [...this.products];
    }

    // Setup event listeners
    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('productSearch');
        if (searchInput) {
            searchInput.addEventListener('input', this.debounce((e) => {
                this.searchProducts(e.target.value);
            }, 300));
        }

        // Filter functionality
        const categoryFilter = document.getElementById('categoryFilter');
        const sizeFilter = document.getElementById('sizeFilter');
        const priceFilter = document.getElementById('priceFilter');

        if (categoryFilter) categoryFilter.addEventListener('change', () => this.applyFilters());
        if (sizeFilter) sizeFilter.addEventListener('change', () => this.applyFilters());
        if (priceFilter) priceFilter.addEventListener('change', () => this.applyFilters());

        // Sort functionality
        const sortFilter = document.getElementById('sortFilter');
        if (sortFilter) sortFilter.addEventListener('change', (e) => this.sortProducts(e.target.value));
    }

    // Search products
    searchProducts(searchTerm) {
        const term = searchTerm.toLowerCase();
        
        if (!term) {
            this.filteredProducts = [...this.products];
        } else {
            this.filteredProducts = this.products.filter(product => 
                product.name.toLowerCase().includes(term) ||
                product.description.toLowerCase().includes(term) ||
                product.category.toLowerCase().includes(term)
            );
        }

        this.applyFilters();
        this.renderProducts();
    }

    // Apply filters
    applyFilters() {
        const category = document.getElementById('categoryFilter')?.value || '';
        const size = document.getElementById('sizeFilter')?.value || '';
        const priceRange = document.getElementById('priceFilter')?.value || '';

        let filtered = [...this.filteredProducts];

        // Category filter
        if (category) {
            filtered = filtered.filter(product => product.category === category);
        }

        // Size filter
        if (size) {
            filtered = filtered.filter(product => product.size === size);
        }

        // Price filter
        if (priceRange) {
            filtered = filtered.filter(product => {
                const price = product.price;
                switch (priceRange) {
                    case '0-10': return price < 10;
                    case '10-50': return price >= 10 && price < 50;
                    case '50-100': return price >= 50 && price < 100;
                    case '100+': return price >= 100;
                    default: return true;
                }
            });
        }

        this.renderProducts(filtered);
    }

    // Sort products
    sortProducts(sortBy) {
        let sorted = [...this.filteredProducts];

        switch (sortBy) {
            case 'price-low':
                sorted.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                sorted.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                sorted.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                sorted.sort((a, b) => b.name.localeCompare(a.name));
                break;
            default:
                // Default sorting (by ID)
                sorted.sort((a, b) => a.id - b.id);
        }

        this.renderProducts(sorted);
    }

    // Render products
    renderProducts(productsToRender = this.filteredProducts) {
        const productsGrid = document.getElementById('productsGrid');
        const noResults = document.getElementById('noResults');

        if (!productsGrid) return;

        if (productsToRender.length === 0) {
            productsGrid.innerHTML = '';
            if (noResults) noResults.style.display = 'block';
            return;
        }

        if (noResults) noResults.style.display = 'none';

        productsGrid.innerHTML = productsToRender.map((product, index) => `
            <div class="product-card animate-scale-up" data-product-id="${product.id}" style="animation-delay: ${index * 0.1}s">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0xNTAgNzBDMTMwLjY3IDcwIDExNSA4NS42NyAxMTUgMTA1QzExNSAxMjQuMzMgMTMwLjY3IDE0MCAxNTAgMTQwQzE2OS4zMyAxNDAgMTg1IDEyNC4zMyAxODUgMTA1QzE4NSA4NS42NyAxNjkuMzMgNzAgMTUwIDcwWiIgZmlsbD0iI0NDQyIvPgo8cGF0aCBkPSJNMTAwIDE2MEgxOTBWMTcwSDEwMFYxNjBaIiBmaWxsPSIjQ0NDIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTMwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTk5IiBmb250LXNpemU9IjE0Ij5JbWFnZSBOb3QgRm91bmQ8L3RleHQ+Cjwvc3ZnPgo='">
                    <div class="product-overlay">
                        <button onclick="shopManager.quickView(${product.id})" class="quick-view-btn">Quick View</button>
                    </div>
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="product-features">
                        ${product.features.slice(0, 2).map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
                    </div>
                    <div class="product-price">
                        <span class="price">GHS ${product.price}</span>
                        <span class="price-unit">per piece</span>
                    </div>
                    <div class="product-actions">
                        <button onclick="shopManager.orderProduct(${product.id})" class="order-btn">Order Now</button>
                        <button onclick="shopManager.viewProduct(${product.id})" class="view-btn">View Details</button>
                    </div>
                </div>
            </div>
        `).join('');

        // Add hover effects
        this.addProductHoverEffects();
    }

    // Quick view product
    quickView(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const modal = document.getElementById('quickViewModal');
        if (!modal) return;

        document.getElementById('quickViewTitle').textContent = product.name;
        document.getElementById('quickViewPrice').textContent = `GHS ${product.price}`;
        document.getElementById('quickViewDescription').textContent = product.description;
        document.getElementById('quickViewImage').src = product.image;

        // Add features to quick view
        const featuresHtml = product.features.map(feature => `<li>${feature}</li>`).join('');
        const featuresContainer = modal.querySelector('.quick-view-features');
        if (featuresContainer) {
            featuresContainer.innerHTML = `<ul>${featuresHtml}</ul>`;
        }

        modal.classList.add('active');
        
        // Store current product for order/view actions
        modal.dataset.productId = productId;
    }

    // Order product
    orderProduct(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        this.showOrderModal(product);
    }

    // View product details
    viewProduct(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        // Store product data for product page
        localStorage.setItem('selectedProduct', JSON.stringify(product));
        
        // Redirect to product page
        window.location.href = 'product.html';
    }

    // Show order modal
    showOrderModal(product) {
        const modal = document.createElement('div');
        modal.className = 'glass-modal active';
        modal.innerHTML = `
            <div class="glass-modal-content">
                <h3>Order ${product.name}</h3>
                <div class="order-summary">
                    <div class="order-product">
                        <img src="${product.image}" alt="${product.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">
                        <div class="order-details">
                            <h4>${product.name}</h4>
                            <p class="order-price">GHS ${product.price} per piece</p>
                        </div>
                    </div>
                </div>
                <form id="productOrderForm">
                    <div class="glass-form-group">
                        <label class="glass-label">Your Name *</label>
                        <input type="text" class="glass-input" name="name" required>
                    </div>
                    <div class="glass-form-group">
                        <label class="glass-label">Phone Number *</label>
                        <input type="tel" class="glass-input" name="phone" required>
                    </div>
                    <div class="glass-form-group">
                        <label class="glass-label">Email Address</label>
                        <input type="email" class="glass-input" name="email">
                    </div>
                    <div class="glass-form-group">
                        <label class="glass-label">Quantity *</label>
                        <input type="number" class="glass-input" name="quantity" min="1" value="1" required>
                        <small style="color: #666; font-size: 0.875rem;">Total: GHS <span id="orderTotal">${product.price}</span></small>
                    </div>
                    <div class="glass-form-group">
                        <label class="glass-label">Size/Specifications *</label>
                        <select class="glass-select" name="size" required>
                            <option value="">Select size</option>
                            <option value="Small">Small</option>
                            <option value="Medium">Medium</option>
                            <option value="Large">Large</option>
                            <option value="A4">A4</option>
                            <option value="A3">A3</option>
                            <option value="A2">A2</option>
                            <option value="Custom">Custom</option>
                        </select>
                    </div>
                    <div class="glass-form-group">
                        <label class="glass-label">Delivery Date *</label>
                        <input type="date" class="glass-input" name="delivery" required>
                    </div>
                    <div class="glass-form-group">
                        <label class="glass-label">Design Requirements</label>
                        <textarea class="glass-textarea" name="notes" placeholder="Describe your design requirements, colors, text, etc..."></textarea>
                    </div>
                    <div class="glass-form-group">
                        <label class="glass-label">Upload Design (Optional)</label>
                        <input type="file" class="glass-input" name="design" accept="image/*,.pdf,.ai,.eps">
                        <small style="color: #666; font-size: 0.875rem;">Supported formats: JPG, PNG, PDF, AI, EPS (Max 10MB)</small>
                    </div>
                    <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                        <button type="button" onclick="this.closest('.glass-modal').remove()" class="glass-btn" style="background: rgba(255, 255, 255, 0.2);">
                            Cancel
                        </button>
                        <button type="submit" class="glass-btn" style="background: #25D366; color: white;">
                            <span class="loading" style="display: none;"></span>
                            Send Order via WhatsApp
                        </button>
                    </div>
                </form>
            </div>
        `;

        document.body.appendChild(modal);

        // Update total when quantity changes
        const quantityInput = modal.querySelector('input[name="quantity"]');
        const totalSpan = modal.querySelector('#orderTotal');
        
        quantityInput.addEventListener('input', () => {
            const quantity = parseInt(quantityInput.value) || 1;
            const total = (product.price * quantity).toFixed(2);
            totalSpan.textContent = total;
        });

        // Handle form submission
        modal.querySelector('#productOrderForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitOrder(e.target, product, modal);
        });
    }

    // Enhanced submit order with WhatsApp bot integration
    submitOrder(form, product, modal) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const loading = submitBtn.querySelector('.loading');
        const originalText = submitBtn.innerHTML;

        // Show loading state
        loading.style.display = 'inline-block';
        submitBtn.disabled = true;

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Calculate total
        const quantity = parseInt(data.quantity) || 1;
        const total = (product.price * quantity).toFixed(2);

        // Enhanced WhatsApp message with all details
        const message = `🎨 *INKWATT PRINTING - ORDER REQUEST* 🎨

� *Product Information:*
• Product: ${product.name}
• Category: ${product.category}
• Unit Price: GHS ${product.price}
• Quantity: ${quantity}
• Total Amount: GHS ${total}
• Size: ${data.size}
• Delivery Date: ${data.delivery}
• Design Notes: ${data.notes || 'None provided'}

👤 *Customer Information:*
• Name: ${data.name}
• Phone: ${data.phone}
• Email: ${data.email || 'Not provided'}

⏰ *Order Details:*
• Order Time: ${new Date().toLocaleString()}
• Source: INKWATT Website Shop
• Status: NEW ORDER - PRIORITY

🚀 *Action Required:*
Please contact customer immediately to confirm order details and provide payment information.

---
💬 *Reply to this message to get started immediately!*
📞 Call: +233 594 188 747`;

        // Use WhatsApp bot if available, otherwise fallback
        if (window.whatsappBot) {
            window.whatsappBot.sendProductOrder(product.name, {
                ...data,
                totalPrice: total,
                customerName: data.name,
                customerPhone: data.phone,
                customerEmail: data.email
            });
        } else {
            // Fallback WhatsApp API connection
            const whatsappUrl = `https://wa.me/233594188747?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        }

        // Track order
        this.trackOrder(product, data);

        // Show success modal
        this.showSuccessModal(product, data, total);

        // Close order modal
        modal.remove();
    }
• Name: ${data.name}
• Phone: ${data.phone}
• Email: ${data.email || 'Not provided'}

📝 *Design Requirements:*
${data.notes || 'No specific requirements mentioned'}

📎 *Design File:* ${data.design?.name || 'No file uploaded'}

---
Please confirm availability and provide payment details.
Thank you! 🙏`;

        // Send to WhatsApp
        setTimeout(() => {
            const whatsappUrl = `https://wa.me/233594188747?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
            
            // Show success message
            this.showOrderSuccess(product.name, total);
            
            // Remove modal
            modal.remove();
            
            // Track order
            this.trackOrder(product, data);
        }, 1500);
    }

    // Show order success message
    showOrderSuccess(productName, total) {
        const successModal = document.createElement('div');
        successModal.className = 'glass-modal active';
        successModal.innerHTML = `
            <div class="glass-modal-content" style="text-align: center;">
                <div style="font-size: 4rem; margin-bottom: 1rem;">✅</div>
                <h2>Order Sent Successfully!</h2>
                <p>Your order for <strong>${productName}</strong> has been sent to INKWATT via WhatsApp.</p>
                <p style="margin-top: 1rem;"><strong>Total Amount:</strong> GHS ${total}</p>
                <p style="margin-top: 1rem; color: #25D366;">We'll contact you shortly to confirm your order!</p>
                <button onclick="this.closest('.glass-modal').remove()" class="glass-btn" style="margin-top: 1.5rem; background: #25D366; color: white;">
                    Continue Shopping
                </button>
            </div>
        `;
        
        document.body.appendChild(successModal);
        
        setTimeout(() => {
            if (document.body.contains(successModal)) {
                successModal.remove();
            }
        }, 5000);
    }

    // Track order for analytics
    trackOrder(product, orderData) {
        const order = {
            productId: product.id,
            productName: product.name,
            price: product.price,
            quantity: orderData.quantity,
            total: product.price * (parseInt(orderData.quantity) || 1),
            timestamp: new Date().toISOString(),
            customerName: orderData.name,
            customerPhone: orderData.phone
        };

        // Store in localStorage for analytics
        const orders = JSON.parse(localStorage.getItem('inkwatt_orders') || '[]');
        orders.push(order);
        localStorage.setItem('inkwatt_orders', JSON.stringify(orders));

        // Update user interactions
        const interactions = JSON.parse(localStorage.getItem('inkwatt_interactions') || '{}');
        interactions.ordersPlaced = (interactions.ordersPlaced || 0) + 1;
        localStorage.setItem('inkwatt_interactions', JSON.stringify(interactions));
    }

    // Add product hover effects
    addProductHoverEffects() {
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.classList.add('hover-lift');
            });

            card.addEventListener('mouseleave', () => {
                card.classList.remove('hover-lift');
            });
        });
    }

    // Initialize animations
    initAnimations() {
        // Add stagger animation to product cards
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, {
            threshold: 0.1
        });

        document.querySelectorAll('.product-card').forEach(card => {
            card.style.animationPlayState = 'paused';
            observer.observe(card);
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

    // Get product recommendations
    getRecommendations(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return [];

        return this.products
            .filter(p => p.id !== productId && p.category === product.category)
            .slice(0, 3);
    }

    // Get popular products
    getPopularProducts() {
        // In real app, this would be based on actual sales data
        return this.products.filter(p => 
            p.name.includes('T-Shirt') || 
            p.name.includes('Business Card') || 
            p.name.includes('Flyer')
        ).slice(0, 6);
    }

    // Get new arrivals
    getNewArrivals() {
        // In real app, this would be based on actual product addition dates
        return this.products.slice(-4);
    }
}

// Initialize shop manager
const shopManager = new ShopManager();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ShopManager;
}
