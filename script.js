// ======================== EMAILJS CONFIGURATION ========================
const EMAILJS_CONFIG = {
    serviceID: "service_b0u9",
    templateID: "template_m5ql2z",    
    publicKey: "Tv2O3c2hwTzhhg7f"
};

// Initialize EmailJS
if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_CONFIG.publicKey);
}

// ======================== DARK/LIGHT MODE TOGGLE ========================
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    // Check for saved user preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
    } else if (savedTheme === 'dark') {
        document.body.classList.remove('light-mode');
    } else if (prefersDarkScheme.matches) {
        document.body.classList.remove('light-mode');
    } else {
        document.body.classList.add('light-mode');
    }
    
    // Toggle theme function
    function toggleTheme() {
        if (document.body.classList.contains('light-mode')) {
            document.body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        }
    }
    
    themeToggle.addEventListener('click', toggleTheme);
}

// ======================== MOBILE MENU TOGGLE ========================
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinksMenu = document.getElementById('navLinks');
    
    if (!menuToggle || !navLinksMenu) return;
    
    function toggleMobileMenu() {
        navLinksMenu.classList.toggle('active');
        
        // Change icon between bars and times
        const icon = menuToggle.querySelector('i');
        if (icon) {
            if (navLinksMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                document.body.style.overflow = 'hidden';
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        }
    }
    
    menuToggle.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking a nav link
    document.querySelectorAll('.nav-item').forEach(link => {
        link.addEventListener('click', () => {
            navLinksMenu.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            document.body.style.overflow = '';
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinksMenu.classList.contains('active')) {
            const isClickInsideMenu = navLinksMenu.contains(e.target);
            const isClickOnToggle = menuToggle.contains(e.target);
            
            if (!isClickInsideMenu && !isClickOnToggle) {
                navLinksMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                document.body.style.overflow = '';
            }
        }
    });
}

// ======================== ACTIVE NAVIGATION ON SCROLL ========================
function initActiveNav() {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');
    
    if (sections.length === 0 || navItems.length === 0) return;
    
    function updateActiveNav() {
        let current = '';
        const scrollPos = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            const href = item.getAttribute('href');
            if (href && href.substring(1) === current) {
                item.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    window.addEventListener('load', updateActiveNav);
}

// ======================== SMOOTH SCROLLING ========================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '#home') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ======================== GRAPHIC GALLERY ========================
function initGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;
    
    const graphicItems = [
        { category: 'logo', title: 'NezTech Logo Suite', description: 'Modern tech logo with geometric mark',
            svg: `<svg viewBox="0 0 600 500" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="500" fill="#1a1a2e"/><circle cx="300" cy="200" r="80" fill="none" stroke="#a855f7" stroke-width="4"/><polygon points="300,140 340,200 310,200 340,260 260,260 290,200 260,200" fill="#c084fc"/><text x="300" y="340" text-anchor="middle" fill="#eef2ff" font-size="36" font-weight="bold" font-family="Arial">NEZTECH</text><text x="300" y="380" text-anchor="middle" fill="#9ca3af" font-size="16" font-family="Arial">Digital Solutions</text><rect x="230" y="410" width="140" height="3" fill="#a855f7" rx="2"/></svg>`
        },
        { category: 'logo', title: 'Minimalist Brand Mark', description: 'Clean abstract mark for modern brands',
            svg: `<svg viewBox="0 0 600 500" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="500" fill="#0f0f17"/><circle cx="300" cy="200" r="60" fill="#a855f7" opacity="0.9"/><circle cx="300" cy="200" r="35" fill="#0f0f17"/><line x1="220" y1="280" x2="380" y2="280" stroke="#a855f7" stroke-width="3"/><line x1="250" y1="310" x2="350" y2="310" stroke="#a855f7" stroke-width="2" opacity="0.6"/><text x="300" y="370" text-anchor="middle" fill="#eef2ff" font-size="32" font-weight="bold" font-family="Arial">MINIMAL</text><text x="300" y="405" text-anchor="middle" fill="#9ca3af" font-size="14" font-family="Arial">BRAND STUDIO</text></svg>`
        },
        { category: 'branding', title: 'Premium Business Card Set', description: 'Double-sided business cards with foil accents',
            svg: `<svg viewBox="0 0 600 500" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="500" fill="#1e1e2e"/><rect x="80" y="80" width="200" height="130" rx="10" fill="#2a2a3a" stroke="#a855f7" stroke-width="2"/><text x="180" y="120" text-anchor="middle" fill="#c084fc" font-size="14" font-weight="bold">SARAH CHEN</text><text x="180" y="140" text-anchor="middle" fill="#eef2ff" font-size="10">Creative Director</text><text x="180" y="170" text-anchor="middle" fill="#9ca3af" font-size="8">sarah@neztech.com</text><rect x="320" y="80" width="200" height="130" rx="10" fill="#2a2a3a" stroke="#c084fc" stroke-width="1"/><circle cx="420" cy="145" r="25" fill="none" stroke="#c084fc" stroke-width="2"/><text x="420" y="140" text-anchor="middle" fill="#c084fc" font-size="20" font-weight="bold">N</text><text x="300" y="260" text-anchor="middle" fill="#c084fc" font-size="12" font-weight="bold">Premium Business Card Set</text></svg>`
        },
        { category: 'typography', title: 'Custom Typography Poster', description: 'Bold typographic design for print',
            svg: `<svg viewBox="0 0 600 500" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="500" fill="#0d0d14"/><text x="300" y="120" text-anchor="middle" fill="#c084fc" font-size="64" font-weight="800">CREATE</text><text x="300" y="200" text-anchor="middle" fill="#eef2ff" font-size="48" font-weight="700">Bold</text><text x="300" y="270" text-anchor="middle" fill="#9ca3af" font-size="36">Typography</text><text x="300" y="340" text-anchor="middle" fill="#a855f7" font-size="28" font-weight="600">Matters</text><line x1="150" y1="370" x2="450" y2="370" stroke="#a855f7" stroke-width="2"/></svg>`
        },
        { category: 'social', title: 'Instagram Post Template', description: 'Modern social media post design',
            svg: `<svg viewBox="0 0 600 500" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="500" fill="#f5f5f5"/><rect x="150" y="50" width="300" height="300" rx="20" fill="#1a1a2e"/><rect x="170" y="70" width="260" height="150" rx="10" fill="#a855f7" opacity="0.2"/><text x="300" y="130" text-anchor="middle" fill="#c084fc" font-size="28" font-weight="bold">NEW</text><text x="300" y="170" text-anchor="middle" fill="#eef2ff" font-size="18" font-weight="bold">ARRIVALS</text><rect x="200" y="240" width="200" height="40" rx="20" fill="#a855f7"/><text x="300" y="265" text-anchor="middle" fill="white" font-size="12" font-weight="bold">SWIPE UP TO SHOP</text><text x="300" y="390" text-anchor="middle" fill="#1a1a2e" font-size="12" font-weight="bold">@neztech.design</text></svg>`
        }
    ];
    
    graphicItems.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = `gallery-item ${item.category}`;
        galleryItem.setAttribute('data-title', item.title);
        galleryItem.setAttribute('data-desc', item.description);
        galleryItem.innerHTML = `<div class="svg-container">${item.svg}</div><div class="overlay"><i class="fas fa-search-plus"></i><div class="overlay-text"><strong>${item.title}</strong><small>${item.description}</small></div></div>`;
        galleryGrid.appendChild(galleryItem);
    });
}

// ======================== LIGHTBOX FOR GRAPHICS ========================
function initLightbox() {
    const lightboxModal = document.getElementById('lightboxModal');
    if (!lightboxModal) return;
    
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeLightbox = document.querySelector('.close-lightbox');
    
    function closeLightboxModal() {
        lightboxModal.style.display = 'none';
        document.body.style.overflow = '';
        const svgContainer = document.querySelector('#lightboxSvgContainer');
        if (svgContainer) svgContainer.remove();
        if (lightboxImg) lightboxImg.style.display = 'block';
    }
    
    function openLightbox(title, description, svgContent) {
        lightboxModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        if (lightboxImg) lightboxImg.style.display = 'none';
        
        const existingSvgContainer = document.querySelector('#lightboxSvgContainer');
        if (existingSvgContainer) existingSvgContainer.remove();
        
        const svgContainerDiv = document.createElement('div');
        svgContainerDiv.id = 'lightboxSvgContainer';
        svgContainerDiv.style.width = '100%';
        svgContainerDiv.style.maxHeight = '80vh';
        svgContainerDiv.style.display = 'flex';
        svgContainerDiv.style.justifyContent = 'center';
        svgContainerDiv.style.alignItems = 'center';
        svgContainerDiv.innerHTML = svgContent;
        
        const svgElem = svgContainerDiv.querySelector('svg');
        if (svgElem) {
            svgElem.style.maxWidth = '90%';
            svgElem.style.maxHeight = '80vh';
            svgElem.style.width = 'auto';
        }
        
        const lightboxContent = lightboxModal.querySelector('.lightbox-content');
        if (lightboxContent) lightboxContent.appendChild(svgContainerDiv);
        if (lightboxCaption) lightboxCaption.innerHTML = `<strong>${title}</strong><br><span style="font-size: 0.85rem; color: #c084fc;">${description}</span>`;
    }
    
    if (closeLightbox) closeLightbox.addEventListener('click', closeLightboxModal);
    window.addEventListener('click', (e) => { if (e.target === lightboxModal) closeLightboxModal(); });
    
    // Attach click listeners to gallery items
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const title = item.getAttribute('data-title') || 'Design Sample';
            const desc = item.getAttribute('data-desc') || '';
            const svgContainer = item.querySelector('.svg-container');
            const svgContent = svgContainer ? svgContainer.innerHTML : '';
            openLightbox(title, desc, svgContent);
        });
    });
}

// ======================== CONSULTATION FORM ========================
function initContactForm() {
    const consultForm = document.getElementById('consultForm');
    const formFeedback = document.getElementById('formFeedback');
    
    if (!consultForm) return;
    
    consultForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name')?.value.trim();
        const email = document.getElementById('email')?.value.trim();
        const serviceType = document.getElementById('serviceType')?.value;
        const message = document.getElementById('message')?.value.trim();
        
        if (!name || !email || !serviceType || !message) {
            if (formFeedback) {
                formFeedback.style.color = '#f87171';
                formFeedback.innerHTML = '❌ Please fill in all fields.';
            }
            return;
        }
        
        if (!email.includes('@')) {
            if (formFeedback) {
                formFeedback.style.color = '#f87171';
                formFeedback.innerHTML = '❌ Please enter a valid email.';
            }
            return;
        }
        
        const submitBtn = consultForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        try {
            const response = await emailjs.send(
                EMAILJS_CONFIG.serviceID,
                EMAILJS_CONFIG.templateID,
                { from_name: name, from_email: email, service_type: serviceType, message: message },
                EMAILJS_CONFIG.publicKey
            );
            if (formFeedback) {
                formFeedback.style.color = '#4ade80';
                formFeedback.innerHTML = '✅ Message sent! I\'ll respond within 2 hours.';
            }
            consultForm.reset();
        } catch (error) {
            if (formFeedback) {
                formFeedback.style.color = '#f87171';
                formFeedback.innerHTML = '⚠️ Failed to send. Please email directly.';
            }
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            setTimeout(() => { if (formFeedback) formFeedback.innerHTML = ''; }, 5000);
        }
    });
}

// ======================== INITIALIZE EVERYTHING ========================
document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
    initMobileMenu();
    initActiveNav();
    initSmoothScroll();
    initGallery();
    initLightbox();
    initContactForm();
    console.log('✅ All features initialized successfully!');
});