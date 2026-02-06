// ==================== 
// INVENTORY MANAGEMENT
// ====================
let inventory = [];

// Load inventory from localStorage
function loadInventory() {
    const saved = localStorage.getItem('gameZoneInventory');
    if (saved) {
        inventory = JSON.parse(saved);
        updateInventoryCount();
    }
}

// Save inventory to localStorage
function saveInventory() {
    localStorage.setItem('gameZoneInventory', JSON.stringify(inventory));
}

// Add item to inventory
function addToInventory(name, price) {
    const item = {
        id: Date.now(),
        name: name,
        price: price
    };
    
    inventory.push(item);
    saveInventory();
    updateInventoryCount();
    
    // Show success feedback
    showNotification(`${name} added to inventory! 🎮`);
}

// Remove item from inventory
function removeFromInventory(id) {
    inventory = inventory.filter(item => item.id !== id);
    saveInventory();
    updateInventoryCount();
    renderInventory();
}

// Update inventory count badge
function updateInventoryCount() {
    const countElement = document.querySelector('.inventory-count');
    if (countElement) {
        countElement.textContent = inventory.length;
    }
}

// Render inventory items in modal
function renderInventory() {
    const inventoryContainer = document.getElementById('inventoryItems');
    const totalElement = document.getElementById('inventoryTotal');
    
    if (inventory.length === 0) {
        inventoryContainer.innerHTML = '<p class="empty-inventory">Your inventory is empty. Start adding items!</p>';
        totalElement.textContent = '$0';
        return;
    }
    
    let total = 0;
    let html = '';
    
    inventory.forEach(item => {
        total += item.price;
        html += `
            <div class="inventory-item">
                <div class="item-info">
                    <div class="item-name">${item.name}</div>
                    <div class="item-price">$${item.price}</div>
                </div>
                <button class="item-remove" onclick="removeFromInventory(${item.id})">REMOVE</button>
            </div>
        `;
    });
    
    inventoryContainer.innerHTML = html;
    totalElement.textContent = `$${total.toLocaleString()}`;
}

// Open inventory modal
function openInventory() {
    const modal = document.getElementById('inventoryModal');
    modal.classList.add('active');
    renderInventory();
    document.body.style.overflow = 'hidden';
}

// Close inventory modal
function closeInventory() {
    const modal = document.getElementById('inventoryModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// ==================== 
// NOTIFICATION SYSTEM
// ====================
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        background: 'linear-gradient(135deg, #00f0ff, #ff00ff)',
        color: '#fff',
        padding: '1rem 2rem',
        borderRadius: '8px',
        fontFamily: 'Orbitron, sans-serif',
        fontWeight: '700',
        boxShadow: '0 0 30px rgba(0, 240, 255, 0.8)',
        zIndex: '3000',
        animation: 'slideIn 0.3s ease-out',
        maxWidth: '300px'
    });
    
    // Add to document
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add notification animations to document
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

// ==================== 
// CHECKOUT
// ====================
function checkout() {
    if (inventory.length === 0) {
        showNotification('Your inventory is empty! ❌');
        return;
    }
    
    const total = inventory.reduce((sum, item) => sum + item.price, 0);
    showNotification(`Checkout initiated! Total: $${total.toLocaleString()} 💳`);
    
    // Simulate checkout process
    setTimeout(() => {
        showNotification('Order placed successfully! 🎉');
        inventory = [];
        saveInventory();
        updateInventoryCount();
        closeInventory();
    }, 1500);
}

// ==================== 
// SMOOTH SCROLLING
// ====================
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// ==================== 
// SCROLL ANIMATIONS
// ====================
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.product-card, .accessory-card, .gallery-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
}

// ==================== 
// NAVBAR SCROLL EFFECT
// ====================
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add shadow when scrolled
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 240, 255, 0.3)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
}

// ==================== 
// PARTICLE EFFECT (Optional Enhancement)
// ====================
function createParticles() {
    const hero = document.querySelector('.hero');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        Object.assign(particle.style, {
            position: 'absolute',
            width: '2px',
            height: '2px',
            background: i % 2 === 0 ? '#00f0ff' : '#ff00ff',
            borderRadius: '50%',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.3,
            animation: `float ${Math.random() * 10 + 5}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`,
            boxShadow: `0 0 10px ${i % 2 === 0 ? '#00f0ff' : '#ff00ff'}`
        });
        
        hero.appendChild(particle);
    }
    
    // Add float animation
    const floatStyle = document.createElement('style');
    floatStyle.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translate(0, 0);
            }
            25% {
                transform: translate(10px, -20px);
            }
            50% {
                transform: translate(-10px, 10px);
            }
            75% {
                transform: translate(15px, 5px);
            }
        }
    `;
    document.head.appendChild(floatStyle);
}

// ==================== 
// GALLERY LIGHTBOX
// ====================
function setupGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const setup = item.dataset.setup;
            showNotification(`Opening Battle Station #${setup} 🖥️`);
        });
    });
}

// ==================== 
// KEYBOARD SHORTCUTS
// ====================
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // ESC to close modal
        if (e.key === 'Escape') {
            closeInventory();
        }
        
        // Ctrl/Cmd + I to open inventory
        if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
            e.preventDefault();
            openInventory();
        }
    });
}

// ==================== 
// MODAL CLICK OUTSIDE TO CLOSE
// ====================
function setupModalClickOutside() {
    const modal = document.getElementById('inventoryModal');
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeInventory();
        }
    });
}

// ==================== 
// PERFORMANCE OPTIMIZATION
// ====================
function optimizePerformance() {
    // Lazy load images (if real images are added later)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// ==================== 
// INITIALIZATION
// ====================
document.addEventListener('DOMContentLoaded', () => {
    // Load saved inventory
    loadInventory();
    
    // Setup event listeners
    document.getElementById('inventoryBtn').addEventListener('click', openInventory);
    
    // Initialize features
    handleScrollAnimations();
    handleNavbarScroll();
    createParticles();
    setupGalleryLightbox();
    setupKeyboardShortcuts();
    setupModalClickOutside();
    optimizePerformance();
    
    // Welcome message
    setTimeout(() => {
        showNotification('Welcome to GameZone! 🎮');
    }, 1000);
});

// ==================== 
// ACCESSIBILITY ENHANCEMENTS
// ====================
// Focus trap in modal
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        }
    });
}

// Apply focus trap to modal when it opens
const originalOpenInventory = openInventory;
openInventory = function() {
    originalOpenInventory();
    const modal = document.getElementById('inventoryModal');
    trapFocus(modal);
};
