// Global JavaScript for Grener Bio Website

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initLeadPopup();
    initLoaders();
    initSmoothScroll();
    initActiveNav();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');

            // Prevent body scroll when menu is open
            if (mobileMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
    }
}

// Lead Popup
function initLeadPopup() {
    const leadPopup = document.getElementById('lead-popup');
    const closeBtn = document.getElementById('close-popup');

    if (leadPopup && closeBtn) {
        // Show popup after 5 seconds
        setTimeout(() => {
            // Check if user has seen popup before
            if (!localStorage.getItem('popupSeen')) {
                leadPopup.classList.remove('popup-hidden');
                localStorage.setItem('popupSeen', 'true');
            }
        }, 5000);

        closeBtn.addEventListener('click', function() {
            leadPopup.classList.add('popup-hidden');
        });

        // Close on click outside
        document.addEventListener('click', function(e) {
            if (!leadPopup.contains(e.target) && !leadPopup.classList.contains('popup-hidden')) {
                leadPopup.classList.add('popup-hidden');
            }
        });
    }
}

// Page Loader
function initLoaders() {
    const loader = document.getElementById('page-loader');

    if (loader) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                loader.classList.add('loader-hidden');
            }, 500);
        });
    }
}

// Smooth Scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);

                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Active Navigation based on current page
function initActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a, .mobile-nav-menu a');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');

        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Savings Calculator
function initSavingsCalculator() {
    const cylinderInput = document.getElementById('cylinders');
    const savingSpan = document.getElementById('saving-amount');

    if (cylinderInput && savingSpan) {
        function updateSavings() {
            let cyl = parseInt(cylinderInput.value) || 1;
            let saving = cyl * 750; // ₹750 per cylinder approx
            savingSpan.innerText = '₹' + saving.toLocaleString();
        }

        cylinderInput.addEventListener('input', updateSavings);
        updateSavings();
    }
}

// Contact Form Validation
function initContactForm() {
    const form = document.getElementById('contact-form');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Basic validation
            let isValid = true;
            const inputs = form.querySelectorAll('[required]');

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });

            if (isValid) {
                // Show success message
                showNotification('Thank you! We\'ll get back to you soon.', 'success');
                form.reset();
            } else {
                showNotification('Please fill all required fields.', 'error');
            }
        });
    }
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 2rem;
    background: ${type === 'success' ? '#2F855A' : '#e53e3e'};
    color: white;
    border-radius: 9999px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    z-index: 9999;
    animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Image Gallery Lightbox
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const title = this.querySelector('.gallery-overlay h3')?.textContent || 'Gallery Image';

            if (img) {
                createLightbox(img.src, title);
            }
        });
    });
}

function createLightbox(src, title) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    cursor: pointer;
    `;

    lightbox.innerHTML = `
    <img src="${src}" alt="${title}" style="max-width: 90%; max-height: 90%; border-radius: 1rem;">
    <button class="close-lightbox" style="position: absolute; top: 20px; right: 20px; background: none; border: none; color: white; font-size: 2rem; cursor: pointer;">&times;</button>
    `;

    document.body.appendChild(lightbox);

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox || e.target.classList.contains('close-lightbox')) {
            lightbox.remove();
        }
    });
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initLeadPopup();
    initLoaders();
    initSmoothScroll();
    initActiveNav();
    initSavingsCalculator();
    initContactForm();
    initGalleryLightbox();
});
