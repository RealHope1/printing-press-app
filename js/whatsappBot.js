// Enhanced WhatsApp Bot Integration for INKWATT Platform

class WhatsAppBot {
    constructor() {
        this.phoneNumber = '233594188747';
        this.businessName = 'INKWATT Printing';
        this.popupShown = false;
        this.init();
    }

    init() {
        this.createFloatingButton();
        this.setupOrderSystem();
        this.setupQuickActions();
        this.trackUserBehavior();
        this.showAutoPopup();
    }

    // Create floating WhatsApp button
    createFloatingButton() {
        // Check if button already exists
        if (document.querySelector('.whatsapp-float')) return;

        const button = document.createElement('a');
        button.href = `https://wa.me/${this.phoneNumber}`;
        button.target = '_blank';
        button.className = 'whatsapp-float';
        button.innerHTML = `
            <span class="whatsapp-icon">💬</span>
            <span class="whatsapp-text">Chat With Us</span>
        `;
        
        // Add hover effects
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });

        document.body.appendChild(button);
    }

    // Setup order system
    setupOrderSystem() {
        // Add order buttons to product cards
        document.addEventListener('DOMContentLoaded', () => {
            this.addOrderButtons();
        });
    }

    addOrderButtons() {
        const productCards = document.querySelectorAll('.printer-card, .service-item, .product-card');
        
        productCards.forEach(card => {
            const productName = card.querySelector('h3')?.textContent || 'Product';
            const existingBtn = card.querySelector('.whatsapp-order-btn');
            
            if (!existingBtn) {
                const orderBtn = document.createElement('button');
                orderBtn.className = 'whatsapp-order-btn glass-btn';
                orderBtn.textContent = 'Order via WhatsApp';
                orderBtn.style.cssText = `
                    margin-top: 1rem;
                    background: #25D366;
                    color: white;
                    border: none;
                    padding: 0.5rem 1rem;
                    border-radius: 20px;
                    cursor: pointer;
                    font-size: 0.9rem;
                    transition: all 0.3s ease;
                `;
                
                orderBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.sendProductOrder(productName);
                });
                
                const cardBack = card.querySelector('.card-back') || card;
                cardBack.appendChild(orderBtn);
            }
        });
    }

    // Enhanced product order system
    sendProductOrder(productName, additionalInfo = {}) {
        const interactions = JSON.parse(localStorage.getItem('inkwatt_interactions') || '{}');
        const message = this.buildOrderMessage(productName, additionalInfo, interactions);
        
        // Enhanced WhatsApp API connection
        const whatsappUrl = `https://wa.me/${this.phoneNumber}?text=${encodeURIComponent(message)}`;
        
        // Track the order
        this.trackOrder(productName, additionalInfo);
        
        // Open WhatsApp with pre-filled message
        window.open(whatsappUrl, '_blank');
        
        // Show confirmation
        this.showOrderConfirmation(productName);
    }

    // Build comprehensive order message
    buildOrderMessage(productName, additionalInfo = {}, interactions = {}) {
        let message = `🎨 *INKWATT PRINTING - ORDER REQUEST* 🎨\n\n`;
        message += `📦 *Product:* ${productName}\n\n`;
        
        // Add customer information from interactions
        if (interactions.pageViews) {
            message += `👤 *Customer Interest:* High (Visited ${interactions.pageViews} pages)\n`;
        }
        
        // Add order details
        if (additionalInfo.quantity) {
            message += `📊 *Quantity:* ${additionalInfo.quantity}\n`;
        }
        
        if (additionalInfo.size) {
            message += `📏 *Size:* ${additionalInfo.size}\n`;
        }
        
        if (additionalInfo.paperType) {
            message += `📄 *Paper Type:* ${additionalInfo.paperType}\n`;
        }
        
        if (additionalInfo.color) {
            message += `🎨 *Color:* ${additionalInfo.color}\n`;
        }
        
        if (additionalInfo.deliveryDate) {
            message += `📅 *Delivery Date:* ${additionalInfo.deliveryDate}\n`;
        }
        
        if (additionalInfo.notes) {
            message += `📝 *Notes:* ${additionalInfo.notes}\n`;
        }
        
        // Add urgency indicator
        const currentTime = new Date().toLocaleTimeString();
        message += `\n⏰ *Order Time:* ${currentTime}\n`;
        message += `🌐 *Source:* INKWATT Website\n\n`;
        
        // Add call to action
        message += `🚀 *Ready to start my order! Please contact me to confirm details and pricing.*\n\n`;
        message += `---\n💬 *Reply to this message to get started immediately!*`;
        
        return message;
    }

    // Track order for analytics
    trackOrder(productName, additionalInfo) {
        const orders = JSON.parse(localStorage.getItem('inkwatt_orders') || '[]');
        const order = {
            id: Date.now(),
            product: productName,
            details: additionalInfo,
            timestamp: new Date().toISOString(),
            status: 'pending'
        };
        
        orders.push(order);
        localStorage.setItem('inkwatt_orders', JSON.stringify(orders));
        
        // Update product popularity
        this.updateProductPopularity(productName);
    }

    // Update product popularity tracking
    updateProductPopularity(productName) {
        const popularity = JSON.parse(localStorage.getItem('inkwatt_popularity') || '{}');
        popularity[productName] = (popularity[productName] || 0) + 1;
        localStorage.setItem('inkwatt_popularity', JSON.stringify(popularity));
    }

    // Show order confirmation
    showOrderConfirmation(productName) {
        const confirmation = document.createElement('div');
        confirmation.className = 'order-confirmation';
        confirmation.innerHTML = `
            <div class="confirmation-content">
                <div class="success-icon">✓</div>
                <h3>Order Sent!</h3>
                <p>Your request for <strong>${productName}</strong> has been sent to INKWATT via WhatsApp.</p>
                <p>We'll contact you shortly to confirm your order.</p>
                <button onclick="this.closest('.order-confirmation').remove()" class="glass-btn">Got it!</button>
            </div>
        `;
        
        confirmation.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 20px;
            padding: 2rem;
            z-index: 10001;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            text-align: center;
            min-width: 300px;
            animation: bounceIn 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            .confirmation-content {
                color: #333;
            }
            
            .success-icon {
                width: 60px;
                height: 60px;
                background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 1rem;
                font-size: 2rem;
                color: white;
                animation: pulse 2s infinite;
            }
            
            .confirmation-content h3 {
                margin: 0 0 1rem 0;
                color: #25D366;
                font-size: 1.5rem;
            }
            
            .confirmation-content p {
                margin: 0 0 1.5rem 0;
                color: #666;
                line-height: 1.5;
            }
            
            .confirmation-content button {
                background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 25px;
                cursor: pointer;
                font-weight: 600;
                transition: all 0.3s ease;
            }
            
            .confirmation-content button:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(37, 211, 102, 0.4);
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(confirmation);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            if (document.body.contains(confirmation)) {
                confirmation.style.animation = 'fadeOut 0.6s ease';
                setTimeout(() => {
                    if (document.body.contains(confirmation)) {
                        confirmation.remove();
                    }
                }, 600);
            }
        }, 5000);
    }

    // Build order message
    buildOrderMessage(productName, additionalInfo = {}, interactions = {}) {
        let message = `Hello ${this.businessName}! 🎨\n\n`;
        message += `I'm interested in: ${productName}\n\n`;
        
        // Add additional information
        if (additionalInfo.quantity) {
            message += `Quantity: ${additionalInfo.quantity}\n`;
        }
        
        if (additionalInfo.size) {
            message += `Size: ${additionalInfo.size}\n`;
        }
        
        if (additionalInfo.deadline) {
            message += `Deadline: ${additionalInfo.deadline}\n`;
        }
        
        if (additionalInfo.notes) {
            message += `Notes: ${additionalInfo.notes}\n`;
        }
        
        // Add user behavior context
        if (interactions.servicesViewed && interactions.servicesViewed.length > 0) {
            message += `\nI also viewed: ${interactions.servicesViewed.slice(0, 3).join(', ')}\n`;
        }
        
        message += `\nPlease provide a quote and availability.\n`;
        message += `Thank you! 🙏`;
        
        return message;
    }

    // Setup quick actions
    setupQuickActions() {
        // Add quick quote buttons
        this.addQuickQuoteButtons();
        
        // Add emergency contact buttons
        this.addEmergencyButtons();
    }

    addQuickQuoteButtons() {
        const quickQuoteSections = document.querySelectorAll('.services-preview, .contact-section');
        
        quickQuoteSections.forEach(section => {
            const quickQuoteDiv = document.createElement('div');
            quickQuoteDiv.className = 'quick-quote-section';
            quickQuoteDiv.style.cssText = `
                margin-top: 2rem;
                text-align: center;
            `;
            
            quickQuoteDiv.innerHTML = `
                <h4 style="margin-bottom: 1rem; color: white;">Quick Quote</h4>
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    <button class="quick-quote-btn" data-service="T-Shirt Printing" style="background: rgba(255, 255, 255, 0.2); color: white; border: 1px solid rgba(255, 255, 255, 0.3); padding: 0.5rem 1rem; border-radius: 20px; cursor: pointer;">
                        👕 T-Shirt Quote
                    </button>
                    <button class="quick-quote-btn" data-service="Business Cards" style="background: rgba(255, 255, 255, 0.2); color: white; border: 1px solid rgba(255, 255, 255, 0.3); padding: 0.5rem 1rem; border-radius: 20px; cursor: pointer;">
                        💼 Cards Quote
                    </button>
                    <button class="quick-quote-btn" data-service="Flyer Printing" style="background: rgba(255, 255, 255, 0.2); color: white; border: 1px solid rgba(255, 255, 255, 0.3); padding: 0.5rem 1rem; border-radius: 20px; cursor: pointer;">
                        📄 Flyer Quote
                    </button>
                </div>
            `;
            
            section.appendChild(quickQuoteDiv);
        });

        // Add event listeners to quick quote buttons
        document.querySelectorAll('.quick-quote-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const service = btn.getAttribute('data-service');
                this.showQuickQuoteModal(service);
            });
        });
    }

    showQuickQuoteModal(service) {
        const modal = document.createElement('div');
        modal.className = 'glass-modal active';
        modal.innerHTML = `
            <div class="glass-modal-content">
                <h3 style="margin-bottom: 1.5rem;">Quick Quote - ${service}</h3>
                <form id="quickQuoteForm">
                    <div class="glass-form-group">
                        <label class="glass-label">Your Name</label>
                        <input type="text" class="glass-input" name="name" required>
                    </div>
                    <div class="glass-form-group">
                        <label class="glass-label">Quantity</label>
                        <input type="number" class="glass-input" name="quantity" min="1" required>
                    </div>
                    <div class="glass-form-group">
                        <label class="glass-label">Size/Specifications</label>
                        <select class="glass-select" name="size" required>
                            <option value="">Select size</option>
                            <option value="A4">A4</option>
                            <option value="A3">A3</option>
                            <option value="A2">A2</option>
                            <option value="A1">A1</option>
                            <option value="A0">A0</option>
                            <option value="Custom">Custom</option>
                        </select>
                    </div>
                    <div class="glass-form-group">
                        <label class="glass-label">Additional Notes</label>
                        <textarea class="glass-textarea" name="notes" placeholder="Any special requirements..."></textarea>
                    </div>
                    <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                        <button type="button" onclick="this.closest('.glass-modal').remove()" class="glass-btn" style="background: rgba(255, 255, 255, 0.2);">
                            Cancel
                        </button>
                        <button type="submit" class="glass-btn" style="background: #25D366; color: white;">
                            Send Quote Request
                        </button>
                    </div>
                </form>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Handle form submission
        modal.querySelector('#quickQuoteForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);
            
        });
    }

    addEmergencyButtons() {
        const emergencyBtn = document.createElement('button');
        emergencyBtn.className = 'emergency-whatsapp-btn';
        emergencyBtn.innerHTML = '🚨 Urgent Order';
        emergencyBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 30px;
            background: #ff6b6b;
            color: white;
            padding: 0.8rem 1.2rem;
            border-radius: 25px;
            border: none;
            cursor: pointer;
            font-weight: 600;
            z-index: 998;
            animation: pulse 2s infinite;
            box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
        `;
        
        emergencyBtn.addEventListener('click', () => {
            const message = `🚨 URGENT ORDER REQUEST - ${this.businessName} 🚨
            
I need urgent printing services. This is time-sensitive and requires immediate attention.
            
Please contact me as soon as possible.
            
Thank you!`;
            
            const whatsappUrl = `https://wa.me/${this.phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        });
        
        document.body.appendChild(emergencyBtn);
    }

    // Track user behavior for better messaging
    trackUserBehavior() {
        // Track time spent on page
        let timeSpent = 0;
        setInterval(() => {
            timeSpent++;
            localStorage.setItem('inkwatt_time_spent', timeSpent);
        }, 1000);

        // Track scroll depth
        let maxScroll = 0;
        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                localStorage.setItem('inkwatt_scroll_depth', maxScroll);
            }
        });

        // Track mouse movements (for engagement detection)
        let mouseMovements = 0;
        let lastMouseTime = Date.now();
        
        document.addEventListener('mousemove', () => {
            const now = Date.now();
            if (now - lastMouseTime > 100) {
                mouseMovements++;
                lastMouseTime = now;
                localStorage.setItem('inkwatt_mouse_movements', mouseMovements);
            }
        });
    }

    // Smart messaging based on user behavior
    getSmartMessage(baseMessage) {
        const timeSpent = parseInt(localStorage.getItem('inkwatt_time_spent') || '0');
        const scrollDepth = parseInt(localStorage.getItem('inkwatt_scroll_depth') || '0');
        const mouseMovements = parseInt(localStorage.getItem('inkwatt_mouse_movements') || '0');
        
        let smartMessage = baseMessage;
        
        // Add context based on behavior
        if (timeSpent > 60) {
            smartMessage += '\n\n(I\'ve been browsing your website for a while - very impressed with your services!)';
        }
        
        if (scrollDepth > 75) {
            smartMessage += '\n\n(I\'ve looked through most of your services and have a good understanding of what you offer.)';
        }
        
        return smartMessage;
    }

    // Create custom order form
    createCustomOrderForm() {
        const form = document.createElement('div');
        form.className = 'custom-order-form glass-card';
        form.innerHTML = `
            <h3>Custom Order</h3>
            <form id="customOrderForm">
                <div class="glass-form-group">
                    <label class="glass-label">Service Type</label>
                    <select class="glass-select" name="service" required>
                        <option value="">Select service</option>
                        <option value="DTF Printing">DTF Printing</option>
                        <option value="T-Shirt Printing">T-Shirt Printing</option>
                        <option value="Flyer Printing">Flyer Printing</option>
                        <option value="Poster Printing">Poster Printing</option>
                        <option value="Book Printing">Book Printing</option>
                        <option value="Cup Printing">Cup Printing</option>
                        <option value="Rubber Stamp Printing">Rubber Stamp Printing</option>
                        <option value="Business Cards">Business Cards</option>
                    </select>
                </div>
                <div class="glass-form-group">
                    <label class="glass-label">Quantity</label>
                    <input type="number" class="glass-input" name="quantity" min="1" required>
                </div>
                <div class="glass-form-group">
                    <label class="glass-label">Delivery Date</label>
                    <input type="date" class="glass-input" name="delivery" required>
                </div>
                <div class="glass-form-group">
                    <label class="glass-label">Special Requirements</label>
                    <textarea class="glass-textarea" name="requirements" placeholder="Describe your specific needs..."></textarea>
                </div>
                <button type="submit" class="glass-btn" style="background: #25D366; color: white; width: 100%;">
                    Send Custom Order via WhatsApp
                </button>
            </form>
        `;
        
        return form;
    }

    // Show order confirmation
    showOrderConfirmation(orderDetails) {
        const confirmation = document.createElement('div');
        confirmation.className = 'glass-modal active';
        confirmation.innerHTML = `
            <div class="glass-modal-content" style="text-align: center;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">✅</div>
                <h3>Order Sent Successfully!</h3>
                <p>Your order has been sent to ${this.businessName} via WhatsApp.</p>
                <p style="margin-top: 1rem;"><strong>Order Details:</strong></p>
                <div style="background: rgba(0, 0, 0, 0.05); padding: 1rem; border-radius: 10px; margin: 1rem 0; text-align: left;">
                    ${Object.entries(orderDetails).map(([key, value]) => 
                        `<p><strong>${key}:</strong> ${value}</p>`
                    ).join('')}
                </div>
                <p style="color: #25D366; font-weight: 600;">We'll contact you shortly!</p>
                <button onclick="this.closest('.glass-modal').remove()" class="glass-btn" style="margin-top: 1rem;">
                    Close
                </button>
            </div>
        `;
        
        document.body.appendChild(confirmation);
        
        setTimeout(() => {
            if (document.body.contains(confirmation)) {
                confirmation.remove();
            }
        }, 5000);
    }

    // Schedule follow-up message
    scheduleFollowUp(orderDetails) {
        const followUpTime = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours later
        const followUpData = {
            orderDetails,
            followUpTime: followUpTime.toISOString(),
            sent: false
        };
        
        localStorage.setItem('inkwatt_follow_up', JSON.stringify(followUpData));
    }

    // Check for follow-up reminders
    checkFollowUpReminders() {
        const followUpData = JSON.parse(localStorage.getItem('inkwatt_follow_up') || '{}');
        
        if (followUpData.followUpTime && !followUpData.sent) {
            const followUpTime = new Date(followUpData.followUpTime);
            const now = new Date();
            
            if (now >= followUpTime) {
                this.showFollowUpReminder(followUpData.orderDetails);
                followUpData.sent = true;
                localStorage.setItem('inkwatt_follow_up', JSON.stringify(followUpData));
            }
        }
    }

    showFollowUpReminder(orderDetails) {
        const reminder = document.createElement('div');
        reminder.className = 'whatsapp-bot-popup glass-card';
        reminder.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 30px;
            z-index: 1001;
            max-width: 300px;
            padding: 1.5rem;
            animation: slideInRight 0.5s ease-out;
        `;
        
        reminder.innerHTML = `
            <h4 style="margin-bottom: 0.5rem; color: #25D366;">📞 Follow Up</h4>
            <p style="margin-bottom: 1rem; font-size: 0.9rem;">Just checking in about your order inquiry. Need any help?</p>
            <a href="https://wa.me/${this.phoneNumber}?text=Hi%20Inkwatt!%20Following%20up%20on%20my%20order%20inquiry." target="_blank" class="whatsapp-btn" style="display: inline-flex; align-items: center; gap: 0.5rem; text-decoration: none; padding: 0.5rem 1rem; background: #25D366; color: white; border-radius: 20px; font-size: 0.9rem;">
                <span>📱</span> Follow Up
            </a>
            <button onclick="this.parentElement.remove()" style="position: absolute; top: 10px; right: 10px; background: none; border: none; color: inherit; cursor: pointer; font-size: 1.2rem;">&times;</button>
        `;
        
        document.body.appendChild(reminder);
        
        setTimeout(() => {
            if (document.body.contains(reminder)) {
                reminder.remove();
            }
        }, 10000);
    }
}

// Initialize WhatsApp Bot
const whatsappBot = new WhatsAppBot();

// Check for follow-up reminders on page load
document.addEventListener('DOMContentLoaded', () => {
    whatsappBot.checkFollowUpReminders();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WhatsAppBot;
}
