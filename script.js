// Enhanced Food Delivery App Animations and Interactions

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations and interactions
    initializeAnimations();
    initializeInteractions();
    initializeFoodCarousel();
    initializeParticleSystem();
});

// Initialize entrance animations
function initializeAnimations() {
    // Stagger animation for hero elements
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });

    // Phone screen content animation
    setTimeout(() => {
        animatePhoneContent();
    }, 1000);
}

// Animate phone screen content
function animatePhoneContent() {
    const phoneElements = [
        '.status-bar',
        '.app-header',
        '.search-section',
        '.categories-section',
        '.featured-section',
        '.quick-picks-section'
    ];

    phoneElements.forEach((selector, index) => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.6s ease-out';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 150);
        }
    });
}

// Initialize interactive elements
function initializeInteractions() {
    // Category selection
    const categories = document.querySelectorAll('.category-item');
    categories.forEach(category => {
        category.addEventListener('click', function() {
            // Remove active class from all categories
            categories.forEach(cat => cat.classList.remove('active'));
            // Add active class to clicked category
            this.classList.add('active');
            
            // Add ripple effect
            createRippleEffect(this);
            
            // Simulate content change
            updateFoodContent(this.querySelector('span').textContent);
        });
    });

    // Food card interactions
    const foodCards = document.querySelectorAll('.food-card');
    foodCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.2)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        });

        card.addEventListener('click', function() {
            showFoodDetails(this);
        });
    });

    // Favorite heart interactions
    const favoriteHearts = document.querySelectorAll('.favorite-heart');
    favoriteHearts.forEach(heart => {
        heart.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleFavorite(this);
        });
    });

    // Button hover effects
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });

        button.addEventListener('click', function() {
            createButtonRipple(this);
        });
    });
}

// Initialize food carousel auto-scroll
function initializeFoodCarousel() {
    const carousel = document.querySelector('.food-cards');
    if (!carousel) return;

    let isScrolling = false;
    let scrollDirection = 1;
    let scrollPosition = 0;

    function autoScroll() {
        if (isScrolling) return;

        const maxScroll = carousel.scrollWidth - carousel.clientWidth;
        
        if (scrollPosition >= maxScroll) {
            scrollDirection = -1;
        } else if (scrollPosition <= 0) {
            scrollDirection = 1;
        }

        scrollPosition += scrollDirection * 2;
        carousel.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    }

    // Auto-scroll every 3 seconds
    setInterval(autoScroll, 3000);

    // Pause auto-scroll on hover
    carousel.addEventListener('mouseenter', () => isScrolling = true);
    carousel.addEventListener('mouseleave', () => isScrolling = false);
}

// Initialize floating particle system
function initializeParticleSystem() {
    const particlesContainer = document.querySelector('.food-particles');
    if (!particlesContainer) return;

    // Add more dynamic particles using FontAwesome icons
    const foodIcons = ['fa-pizza-slice', 'fa-hamburger', 'fa-ice-cream', 'fa-cookie-bite', 'fa-hotdog'];
    
    setInterval(() => {
        createFloatingParticle(particlesContainer, foodIcons);
    }, 2000);
}

// Create floating particle
function createFloatingParticle(container, icons) {
    const particle = document.createElement('div');
    particle.className = 'dynamic-particle';
    
    const icon = document.createElement('i');
    icon.className = `fas ${icons[Math.floor(Math.random() * icons.length)]}`;
    particle.appendChild(icon);
    
    // Random position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.fontSize = (Math.random() * 20 + 15) + 'px';
    particle.style.opacity = Math.random() * 0.7 + 0.3;
    particle.style.color = `hsl(${Math.random() * 60 + 15}, 70%, 60%)`;
    
    // Animation styles
    particle.style.position = 'absolute';
    particle.style.bottom = '-50px';
    particle.style.pointerEvents = 'none';
    particle.style.transition = 'all 4s ease-out';
    particle.style.zIndex = '1';
    
    container.appendChild(particle);
    
    // Animate upward
    setTimeout(() => {
        particle.style.bottom = '120%';
        particle.style.transform = `translateX(${(Math.random() - 0.5) * 100}px) rotate(${Math.random() * 360}deg)`;
        particle.style.opacity = '0';
    }, 100);
    
    // Remove after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 4000);
}

// Create ripple effect
function createRippleEffect(element) {
    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 107, 53, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.width = '100px';
    ripple.style.height = '100px';
    ripple.style.marginLeft = '-50px';
    ripple.style.marginTop = '-50px';
    ripple.style.pointerEvents = 'none';
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

// Create button ripple effect
function createButtonRipple(button) {
    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.4)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'buttonRipple 0.4s linear';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.marginLeft = '-10px';
    ripple.style.marginTop = '-10px';
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 400);
}

// Toggle favorite status
function toggleFavorite(heartElement) {
    const icon = heartElement.querySelector('i');
    const isFavorited = icon.classList.contains('fas');
    
    if (isFavorited) {
        icon.classList.remove('fas');
        icon.classList.add('far');
        icon.style.color = '#999';
    } else {
        icon.classList.remove('far');
        icon.classList.add('fas');
        icon.style.color = '#e74c3c';
        
        // Add heart animation
        heartElement.style.animation = 'heartBeat 0.6s ease-in-out';
        setTimeout(() => {
            heartElement.style.animation = '';
        }, 600);
    }
    
    // Create floating heart
    createFloatingHeart(heartElement);
}

// Create floating heart animation
function createFloatingHeart(element) {
    const heart = document.createElement('div');
    heart.innerHTML = '<i class="fas fa-heart" style="color: #e74c3c;"></i>';
    heart.style.position = 'absolute';
    heart.style.left = '50%';
    heart.style.top = '50%';
    heart.style.transform = 'translate(-50%, -50%)';
    heart.style.fontSize = '20px';
    heart.style.pointerEvents = 'none';
    heart.style.animation = 'floatingHeart 1s ease-out forwards';
    heart.style.zIndex = '1000';
    
    element.appendChild(heart);
    
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 1000);
}

// Update food content based on category
function updateFoodContent(category) {
    const foodCards = document.querySelectorAll('.food-card');
    
    // Add loading animation
    foodCards.forEach(card => {
        card.style.opacity = '0.5';
        card.style.transform = 'scale(0.95)';
    });
    
    setTimeout(() => {
        // Simulate content update
        foodCards.forEach(card => {
            card.style.transition = 'all 0.4s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
        });
        
        // Update category-specific content
        updateCategoryContent(category);
    }, 300);
}

// Update content based on selected category
function updateCategoryContent(category) {
    const foodNames = document.querySelectorAll('.food-name');
    const restaurantNames = document.querySelectorAll('.restaurant-name');
    
    const contentMap = {
        'Pizza': {
            foods: ['Margherita Deluxe', 'Pepperoni Supreme'],
            restaurants: ['Tony\'s Italian Kitchen', 'Pizza Paradise']
        },
        'Burger': {
            foods: ['Gourmet Beef Burger', 'Chicken Deluxe'],
            restaurants: ['Burger Paradise', 'Grill Masters']
        },
        'Asian': {
            foods: ['Dragon Roll Sushi', 'Pad Thai Special'],
            restaurants: ['Sushi Express', 'Thai Garden']
        },
        'Healthy': {
            foods: ['Garden Fresh Salad', 'Quinoa Bowl'],
            restaurants: ['Green Kitchen', 'Healthy Bites']
        }
    };
    
    const content = contentMap[category];
    if (content) {
        foodNames.forEach((name, index) => {
            if (content.foods[index]) {
                name.textContent = content.foods[index];
            }
        });
        
        restaurantNames.forEach((name, index) => {
            if (content.restaurants[index]) {
                name.textContent = content.restaurants[index];
            }
        });
    }
}

// Show food details (placeholder for future implementation)
function showFoodDetails(card) {
    const foodName = card.querySelector('.food-name').textContent;
    
    // Add selection animation
    card.style.transform = 'scale(0.98)';
    setTimeout(() => {
        card.style.transform = 'scale(1)';
    }, 150);
    
    // Simulate adding to cart
    showAddToCartNotification(foodName);
}

// Show add to cart notification
function showAddToCartNotification(foodName) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <div class="cart-notification-content">
            <i class="fas fa-check-circle"></i>
            <span>${foodName} added to cart!</span>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #00b894, #00a085);
        color: white;
        padding: 15px 20px;
        border-radius: 12px;
        box-shadow: 0 8px 30px rgba(0, 184, 148, 0.3);
        z-index: 1000;
        transform: translateX(100%);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    `;
    
    document.body.appendChild(notification);
    
    // Slide in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Slide out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 400);
    }, 3000);
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes buttonRipple {
        to {
            transform: scale(10);
            opacity: 0;
        }
    }
    
    @keyframes heartBeat {
        0%, 100% { transform: scale(1); }
        25% { transform: scale(1.2); }
        50% { transform: scale(1.1); }
        75% { transform: scale(1.15); }
    }
    
    @keyframes floatingHeart {
        0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -150%) scale(1.5);
            opacity: 0;
        }
    }
    
    .cart-notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 600;
    }
    
    .dynamic-particle {
        user-select: none;
        pointer-events: none;
    }
`;

document.head.appendChild(style);

// Add smooth scrolling for better UX
document.documentElement.style.scrollBehavior = 'smooth';

// Performance optimization: Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.food-card, .quick-item, .notification').forEach(el => {
    observer.observe(el);
});