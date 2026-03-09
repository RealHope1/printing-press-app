// whatsappBot.js - Advanced WhatsApp Chatbot Integration

let chatbotMinimized = false;

// Function to minimize/maximize chatbot
function toggleChatbot() {
    const bot = document.getElementById('whatsapp-chatbot');
    if (chatbotMinimized) {
        bot.style.height = '500px';
        bot.querySelector('.chat-messages').style.display = 'flex';
        bot.querySelector('.chat-input-area').style.display = 'block';
        chatbotMinimized = false;
    } else {
        bot.style.height = '60px';
        bot.querySelector('.chat-messages').style.display = 'none';
        bot.querySelector('.chat-input-area').style.display = 'none';
        chatbotMinimized = true;
    }
}

// Automatic popup chatbot after 4 seconds
setTimeout(function() {
    if (!chatbotOpen) {
        openChatbot();
    }
}, 4000);

// Function to open the chatbot
function openChatbot() {
    if (chatbotOpen) return;

    chatbotOpen = true;
    const bot = document.createElement('div');
    bot.id = 'whatsapp-chatbot';
    bot.className = 'whatsapp-chatbot glass';
    bot.innerHTML = `
        <div class="chat-header">
            <div class="chat-title">
                <h4>Inkwatt Printing</h4>
                <span>Online</span>
            </div>
            <button class="chat-minimize" onclick="toggleChatbot()">−</button>
            <button class="chat-close" onclick="closeChatbot()">×</button>
        </div>
        <div class="chat-messages" id="chat-messages">
            <div class="message bot-message">
                <p>Hello! Welcome to Inkwatt Printing. How can we help you today?</p>
            </div>
        </div>
        <div class="chat-input-area">
            <div class="quick-buttons">
                <button onclick="sendQuickMessage('I want to order T-Shirts')">Order T-Shirts</button>
                <button onclick="sendQuickMessage('Custom printing services')">Custom Services</button>
                <button onclick="sendQuickMessage('Get a quote')">Get Quote</button>
                <button onclick="sendQuickMessage('Contact support')">Support</button>
            </div>
            <div class="chat-actions">
                <button onclick="connectToWhatsApp()" class="connect-whatsapp btn-glow">Connect to WhatsApp</button>
            </div>
            <div class="chat-input">
                <input type="text" id="chat-input-field" placeholder="Type your message..." onkeypress="handleKeyPress(event)">
                <button onclick="sendMessage()" class="send-btn">Send</button>
            </div>
        </div>
    `;
    document.body.appendChild(bot);

    // Add initial messages
    chatMessages.push({ type: 'bot', text: 'Hello! Welcome to Inkwatt Printing. How can we help you today?' });
}

// Function to close the chatbot
function closeChatbot() {
    const bot = document.getElementById('whatsapp-chatbot');
    if (bot) {
        bot.remove();
        chatbotOpen = false;
    }
}

// Function to send a message
function sendMessage() {
    const input = document.getElementById('chat-input-field');
    const message = input.value.trim();
    if (message) {
        addMessage('user', message);
        input.value = '';
        // Simulate bot response
        setTimeout(() => {
            const response = generateResponse(message);
            addMessage('bot', response);
        }, 1000);
    }
}

// Function to send quick message
function sendQuickMessage(message) {
    addMessage('user', message);
    setTimeout(() => {
        const response = generateResponse(message);
        addMessage('bot', response);
    }, 1000);
}

// Function to add message to chat
function addMessage(type, text) {
    const messagesDiv = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    messageDiv.innerHTML = `<p>${text}</p>`;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    chatMessages.push({ type, text });
}

// Function to generate bot response
function generateResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    if (lowerMessage.includes('order') || lowerMessage.includes('t-shirt')) {
        return 'Great! We offer high-quality T-shirt printing. What quantity and design do you have in mind? Click below to start your order.';
    } else if (lowerMessage.includes('quote')) {
        return 'Sure! Please provide details about your printing needs, and we\'ll send you a quote.';
    } else if (lowerMessage.includes('custom') || lowerMessage.includes('services')) {
        return 'We provide DTF, large format, cup, stamp, and more custom printing services. What are you looking for?';
    } else if (lowerMessage.includes('support') || lowerMessage.includes('contact')) {
        return 'You can reach our support team anytime. Would you like to send a WhatsApp message now?';
    } else {
        return 'Thanks for your message! Our team will get back to you soon. For immediate assistance, send us a WhatsApp.';
    }
}

// Function to handle key press
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Send Order Function (enhanced)
function sendOrder() {
    const product = document.getElementById('productName') ? document.getElementById('productName').value : 'Product';
    const quantity = document.getElementById('quantity').value;
    const size = document.getElementById('paperSize').value;
    const message = `Hello Inkwatt Printing,%0A%0AI want to order:%0A%0AProduct: ${product}%0AQuantity: ${quantity}%0ASize: ${size}%0A%0APlease assist me.`;
    const phone = '233594188747';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Send Contact (enhanced)
function sendContact() {
    const name = document.querySelector('input[placeholder="Name"]').value;
    const email = document.querySelector('input[placeholder="Email"]').value;
    const msg = document.querySelector('textarea').value;
    const message = `Hello Inkwatt,%0A%0AName: ${name}%0AEmail: ${email}%0AMessage: ${msg}`;
    const phone = '233594188747';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Function to connect to WhatsApp from chat
function connectToWhatsApp() {
    const lastMessage = chatMessages[chatMessages.length - 1];
    const message = lastMessage ? lastMessage.text : 'Hello from Inkwatt website';
    const phone = '233594188747';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    closeChatbot();
}