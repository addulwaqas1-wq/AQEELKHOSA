document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (window.innerWidth <= 768) {
                navLinks.classList.toggle('active');
            }
        });
    }

    // Chat Bot Logic
    const botToggle = document.getElementById('botToggle');
    const closeBot = document.getElementById('closeBot');
    const chatWidget = document.getElementById('chatWidget');
    const chatInput = document.getElementById('chatInput');
    const sendMessage = document.getElementById('sendMessage');
    const chatBody = document.getElementById('chatBody');

    if (botToggle && closeBot && chatWidget) {
        botToggle.addEventListener('click', () => {
            chatWidget.style.display = 'flex';
        });

        closeBot.addEventListener('click', () => {
            chatWidget.style.display = 'none';
        });
    }

    const addMessage = (text, sender) => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
        messageDiv.textContent = text;
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    };

    const handleUserMessage = () => {
        const text = chatInput.value.trim();
        if (text === '') return;

        addMessage(text, 'user');
        chatInput.value = '';

        // Simulate Bot Response
        setTimeout(() => {
            let botResponse = "Thank you for contacting Fajr Al Dhaid. A representative will get back to you shortly.";
            
            const lowerText = text.toLowerCase();
            if (lowerText.includes('price') || lowerText.includes('cost') || lowerText.includes('quote')) {
                botResponse = "For a detailed quote, please call us at +971 55 642 8126 or click the WhatsApp button.";
            } else if (lowerText.includes('service') || lowerText.includes('core') || lowerText.includes('concrete')) {
                botResponse = "We offer Core Cutting, Concrete Cutting, Wall Sawing, and Demolition services. Which one are you interested in?";
            } else if (lowerText.includes('location') || lowerText.includes('where')) {
                botResponse = "We are located in Sharjah and serve the entire UAE.";
            }

            addMessage(botResponse, 'bot');
        }, 1000);
    };

    if (sendMessage && chatInput) {
        sendMessage.addEventListener('click', handleUserMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleUserMessage();
            }
        });
    }
});
