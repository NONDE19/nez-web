// ======================== EMAILJS CONFIGURATION ========================
const EMAILJS_CONFIG = {
    serviceID: "service_b0u9",
    templateID: "template_m5ql2z",    
    publicKey: "Tv2O3c2hwTzhhg7f"
};

// Initialize EmailJS (using version 3 syntax)
if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_CONFIG.publicKey);
    console.log("EmailJS initialized");
}

// ======================== DARK/LIGHT MODE TOGGLE ========================
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
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

// ======================== GRAPHIC GALLERY WITH FILTERS ========================
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
    
    // Initialize gallery filters
    initGalleryFilters();
}

// Gallery Filter Function
function initGalleryFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                } else if (item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
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

// ======================== LIVE DEMO MODAL SYSTEM ========================
function initLiveDemos() {
    const demoModal = document.getElementById('demoModal');
    const modalDynamicContent = document.getElementById('modalDynamicContent');
    const closeModalBtn = document.querySelector('#demoModal .close-modal');
    
    if (!demoModal || !modalDynamicContent) {
        console.log("Demo modal elements not found");
        return;
    }
    
    const demos = {
        taskManager: {
            title: '📋 TaskFlow Manager - Live Demo',
            html: `
                <div style="padding: 20px;">
                    <h3 style="color: #c084fc; margin-bottom: 20px;">TaskFlow Manager</h3>
                    <div style="background: #1a1a24; border-radius: 16px; padding: 20px;">
                        <div style="display: flex; gap: 12px; margin-bottom: 24px; flex-wrap: wrap;">
                            <input type="text" id="taskInput" placeholder="Add a new task..." style="flex: 1; padding: 12px; border-radius: 40px; border: 1px solid #a855f7; background: #0a0a0f; color: white; min-width: 200px;">
                            <button onclick="window.addDemoTask()" style="background: #a855f7; border: none; padding: 12px 24px; border-radius: 40px; color: white; cursor: pointer;">➕ Add Task</button>
                        </div>
                        <ul id="taskList" style="list-style: none; padding: 0;">
                            <li style="display: flex; justify-content: space-between; align-items: center; padding: 12px; border-bottom: 1px solid #2d2d3a;">
                                <span>📌 Complete project documentation</span>
                                <button onclick="this.parentElement.remove()" style="background: #ef4444; border: none; padding: 4px 12px; border-radius: 20px; color: white; cursor: pointer;">Delete</button>
                            </li>
                            <li style="display: flex; justify-content: space-between; align-items: center; padding: 12px; border-bottom: 1px solid #2d2d3a;">
                                <span>🎨 Design homepage wireframe</span>
                                <button onclick="this.parentElement.remove()" style="background: #ef4444; border: none; padding: 4px 12px; border-radius: 20px; color: white; cursor: pointer;">Delete</button>
                            </li>
                        </ul>
                        <p style="margin-top: 16px; font-size: 0.85rem; color: #9ca3af;"><i class="fas fa-info-circle"></i> Interactive demo: Add/delete tasks</p>
                    </div>
                </div>
            `
        },
        colorLab: {
            title: '🎨 ColorLab Studio - Gradient Tool',
            html: `
                <div style="padding: 20px;">
                    <h3 style="color: #c084fc; margin-bottom: 20px;">Live CSS Gradient Generator</h3>
                    <div id="gradientPreview" style="height: 150px; border-radius: 24px; background: linear-gradient(135deg, #a855f7, #ec4899); margin-bottom: 20px;"></div>
                    <div style="display: flex; gap: 16px; flex-wrap: wrap;">
                        <div style="flex: 1;">
                            <label style="color: #eef2ff; margin-bottom: 8px; display: block;">Color 1</label>
                            <input type="color" id="color1" value="#a855f7" style="width: 100%; height: 50px; border-radius: 12px; cursor: pointer;">
                        </div>
                        <div style="flex: 1;">
                            <label style="color: #eef2ff; margin-bottom: 8px; display: block;">Color 2</label>
                            <input type="color" id="color2" value="#ec4899" style="width: 100%; height: 50px; border-radius: 12px; cursor: pointer;">
                        </div>
                    </div>
                    <p id="gradientCode" style="margin-top: 16px; background: #0a0a0f; padding: 12px; border-radius: 12px; font-family: monospace; font-size: 0.85rem;">background: linear-gradient(135deg, #a855f7, #ec4899);</p>
                </div>
            `
        },
        supportHub: {
            title: '🎫 SupportHub Lite - IT Consultation & Troubleshooting Demo',
            html: `
                <div style="padding: 20px;">
                    <div style="text-align: center; margin-bottom: 25px;">
                        <div style="background: linear-gradient(135deg, #a855f7, #7c3aed); width: 60px; height: 60px; border-radius: 60px; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px;">
                            <i class="fas fa-headset" style="font-size: 30px; color: white;"></i>
                        </div>
                        <h3 style="color: #c084fc; margin-bottom: 10px;">IT Support Ticket System</h3>
                        <p style="color: #9ca3af; font-size: 14px;">Professional IT consultation, troubleshooting, and support ticketing demo</p>
                    </div>
                    
                    <div style="background: #1a1a24; border-radius: 16px; padding: 20px;">
                        <div style="margin-bottom: 20px;">
                            <label style="display: block; margin-bottom: 8px; color: #eef2ff; font-weight: 500;">
                                <i class="fas fa-pen-alt" style="color: #a855f7; margin-right: 8px;"></i> Create New Support Ticket
                            </label>
                            <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                                <input type="text" id="ticketIssue" placeholder="Describe your technical issue..." style="flex: 1; padding: 12px; border-radius: 40px; border: 1px solid #a855f7; background: #0a0a0f; color: white;">
                                <button onclick="window.createSupportTicket()" style="background: #a855f7; border: none; padding: 12px 28px; border-radius: 40px; color: white; cursor: pointer; font-weight: 600;">
                                    <i class="fas fa-ticket-alt"></i> Submit Ticket
                                </button>
                            </div>
                        </div>
                        
                        <div>
                            <h4 style="margin-bottom: 15px; color: #c084fc;">
                                <i class="fas fa-list-check"></i> Active Support Tickets
                            </h4>
                            <div style="max-height: 250px; overflow-y: auto;">
                                <ul id="ticketList" style="list-style: none; padding: 0;">
                                    <li style="background: #0f0f17; padding: 12px; border-radius: 12px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
                                        <span><span style="color: #fbbf24;">⚠️</span> Server response timeout - Priority: High</span>
                                        <button onclick="this.parentElement.remove()" style="background: #10b981; border: none; padding: 4px 12px; border-radius: 20px; color: white; cursor: pointer; font-size: 12px;">Resolve</button>
                                    </li>
                                    <li style="background: #0f0f17; padding: 12px; border-radius: 12px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
                                        <span><span style="color: #fbbf24;">🖥️</span> Software installation - Windows 11 Update</span>
                                        <button onclick="this.parentElement.remove()" style="background: #10b981; border: none; padding: 4px 12px; border-radius: 20px; color: white; cursor: pointer; font-size: 12px;">Resolve</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div style="margin-top: 20px; padding: 12px; background: rgba(168, 85, 247, 0.1); border-radius: 12px; text-align: center;">
                        <p style="font-size: 0.8rem; color: #c084fc;">
                            <i class="fas fa-clock"></i> Average response time: &lt; 2 hours | 24/7 IT Support Available
                        </p>
                    </div>
                </div>
            `
        }
    };
    
    // Store scroll position to prevent page jump
    let savedScrollPosition = 0;
    
    // Global functions for demo interactions
    window.addDemoTask = function() {
        const input = document.getElementById('taskInput');
        const taskList = document.getElementById('taskList');
        if (input && taskList && input.value.trim()) {
            const li = document.createElement('li');
            li.style.cssText = 'display: flex; justify-content: space-between; align-items: center; padding: 12px; border-bottom: 1px solid #2d2d3a;';
            li.innerHTML = '<span>📌 ' + input.value.trim() + '</span><button onclick="this.parentElement.remove()" style="background: #ef4444; border: none; padding: 4px 12px; border-radius: 20px; color: white; cursor: pointer;">Delete</button>';
            taskList.appendChild(li);
            input.value = '';
        }
    };
    
    window.createSupportTicket = function() {
        const input = document.getElementById('ticketIssue');
        const ticketList = document.getElementById('ticketList');
        if (input && ticketList && input.value.trim()) {
            const li = document.createElement('li');
            li.style.cssText = 'background: #0f0f17; padding: 12px; border-radius: 12px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;';
            li.innerHTML = '<span><span style="color: #fbbf24;">🎫</span> ' + input.value.trim() + ' - Awaiting response</span><button onclick="this.parentElement.remove()" style="background: #10b981; border: none; padding: 4px 12px; border-radius: 20px; color: white; cursor: pointer; font-size: 12px;">Resolve</button>';
            ticketList.appendChild(li);
            input.value = '';
        }
    };
    
    window.setupColorLab = function() {
        const color1 = document.getElementById('color1');
        const color2 = document.getElementById('color2');
        const preview = document.getElementById('gradientPreview');
        const code = document.getElementById('gradientCode');
        if (color1 && color2 && preview && code) {
            const updateGradient = () => {
                const grad = `linear-gradient(135deg, ${color1.value}, ${color2.value})`;
                preview.style.background = grad;
                code.textContent = `background: ${grad};`;
            };
            color1.addEventListener('input', updateGradient);
            color2.addEventListener('input', updateGradient);
        }
    };
    
    // Function to open modal without page jump
    function openDemoModal() {
        savedScrollPosition = window.scrollY;
        demoModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${savedScrollPosition}px`;
        document.body.style.width = '100%';
    }
    
    // Function to close modal and restore scroll position
    function closeDemoModal() {
        demoModal.style.display = 'none';
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, savedScrollPosition);
    }
    
    // Handle demo button click
    function handleDemoClick(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const demoType = this.getAttribute('data-demo');
        console.log("Demo clicked:", demoType);
        
        if (demos[demoType]) {
            modalDynamicContent.innerHTML = demos[demoType].html;
            openDemoModal();
            
            if (demoType === 'colorLab') {
                setTimeout(window.setupColorLab, 100);
            }
        } else {
            alert('Demo not available');
        }
    }
    
    // Attach listeners to all demo buttons
    function attachDemoListeners() {
        const demoButtons = document.querySelectorAll('.live-demo-btn');
        console.log("Found demo buttons:", demoButtons.length);
        demoButtons.forEach(btn => {
            // Remove existing listener to avoid duplicates
            btn.removeEventListener('click', handleDemoClick);
            btn.addEventListener('click', handleDemoClick);
            // DO NOT modify the href attribute - let the click handler do its job
        });
    }
    
    // Close button listener
    if (closeModalBtn) {
        closeModalBtn.removeEventListener('click', closeDemoModal);
        closeModalBtn.addEventListener('click', closeDemoModal);
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === demoModal) {
            closeDemoModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && demoModal.style.display === 'block') {
            closeDemoModal();
        }
    });
    
    // Initial attachment
    attachDemoListeners();
    
    // Re-attach for dynamically loaded content
    const observer = new MutationObserver(function() {
        attachDemoListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    
    console.log("Live demos initialized successfully");
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
            console.error("EmailJS error:", error);
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
    console.log("DOM loaded, initializing all features...");
    initThemeToggle();
    initMobileMenu();
    initActiveNav();
    initSmoothScroll();
    initGallery();
    initLightbox();
    initLiveDemos();      // ADDED - this was missing!
    initContactForm();
    console.log('✅ All features initialized successfully!');
});