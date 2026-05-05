// ======================== EMAILJS CONFIGURATION ========================
const EMAILJS_CONFIG = {
    serviceID: "service_b0u9",
    templateID: "template_m5ql2z",    
    publicKey: "Tv2O3c2hwTzhhg7f"
};

// Initialize EmailJS
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
        const href = anchor.getAttribute('href');
        if (!href || href === '#' || href === '#home' || href === 'javascript:void(0)' || 
            href.startsWith('javascript:') || anchor.classList.contains('live-demo-btn')) {
            return;
        }
        
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;
            
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
    
    galleryGrid.innerHTML = '';
    graphicItems.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = `gallery-item ${item.category}`;
        galleryItem.setAttribute('data-title', item.title);
        galleryItem.setAttribute('data-desc', item.description);
        galleryItem.innerHTML = `<div class="svg-container">${item.svg}</div><div class="overlay"><i class="fas fa-search-plus"></i><div class="overlay-text"><strong>${item.title}</strong><small>${item.description}</small></div></div>`;
        galleryGrid.appendChild(galleryItem);
    });
    
    initGalleryFilters();
}

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
    
    window.closeLightboxModal = closeLightboxModal;
    
    if (closeLightbox) {
        closeLightbox.addEventListener('click', closeLightboxModal);
    }
    
    window.addEventListener('click', (e) => {
        if (e.target === lightboxModal) closeLightboxModal();
    });
    
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const title = item.getAttribute('data-title') || 'Design Sample';
            const desc = item.getAttribute('data-desc') || '';
            const svgContainer = item.querySelector('.svg-container');
            const svgContent = svgContainer ? svgContainer.innerHTML : '';
            
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
            if (lightboxCaption) lightboxCaption.innerHTML = `<strong>${title}</strong><br><span style="font-size: 0.85rem; color: #c084fc;">${desc}</span>`;
        });
    });
}

// ======================== LIVE DEMO MODAL SYSTEM ========================                        <div style="margin-bottom: 20px;">
                      const demoModal = document.getElementById('demoModal');
const modalDynamicContent = document.getElementById('modalDynamicContent');
const closeModal = document.querySelector('.close-modal');

// Task Manager Demo
function showTaskManager() {
    modalDynamicContent.innerHTML = `
        <div style="padding: 20px;">
            <h2 style="color: #1a1a2e; margin-bottom: 20px;">TaskFlow Manager</h2>
            <div style="margin-bottom: 20px;">
                <input type="text" id="taskInput" placeholder="Enter a new task..." style="width: 70%; padding: 10px; border: 2px solid #a855f7; border-radius: 8px;">
                <button onclick="addTask()" style="background: #a855f7; color: white; border: none; padding: 10px 20px; border-radius: 8px; margin-left: 10px; cursor: pointer;">Add Task</button>
            </div>
            <ul id="taskList" style="list-style: none; padding: 0;"></ul>
        </div>
    `;
    demoModal.style.display = 'flex';
    
    // Load existing tasks
    window.tasks = window.tasks || [];
    window.addTask = function() {
        const input = document.getElementById('taskInput');
        const taskText = input.value.trim();
        if (taskText) {
            window.tasks.push({ text: taskText, completed: false });
            input.value = '';
            renderTaskList();
        }
    };
    
    window.toggleTask = function(index) {
        window.tasks[index].completed = !window.tasks[index].completed;
        renderTaskList();
    };
    
    window.deleteTask = function(index) {
        window.tasks.splice(index, 1);
        renderTaskList();
    };
    
    function renderTaskList() {
        const taskList = document.getElementById('taskList');
        if (!taskList) return;
        taskList.innerHTML = '';
        window.tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.style.cssText = `
                background: #f8f9fa;
                margin: 10px 0;
                padding: 12px;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: space-between;
            `;
            li.innerHTML = `
                <div style="display: flex; align-items: center; gap: 10px;">
                    <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${index})" style="width: 20px; height: 20px; cursor: pointer;">
                    <span style="${task.completed ? 'text-decoration: line-through; color: #999;' : 'color: #333;'}">${task.text}</span>
                </div>
                <button onclick="deleteTask(${index})" style="background: #dc2626; color: white; border: none; padding: 5px 12px; border-radius: 5px; cursor: pointer;">Delete</button>
            `;
            taskList.appendChild(li);
        });
    }
    renderTaskList();
}

// ColorLab Demo
function showColorLab() {
    modalDynamicContent.innerHTML = `
        <div style="padding: 20px; text-align: center;">
            <h2 style="color: #1a1a2e; margin-bottom: 20px;">ColorLab Studio</h2>
            <div style="margin-bottom: 20px;">
                <input type="color" id="color1" value="#a855f7" style="width: 80px; height: 80px; margin: 10px; cursor: pointer;">
                <input type="color" id="color2" value="#ec4899" style="width: 80px; height: 80px; margin: 10px; cursor: pointer;">
            </div>
            <div id="gradientPreview" style="width: 100%; height: 200px; background: linear-gradient(135deg, #a855f7, #ec4899); border-radius: 12px; margin-bottom: 20px;"></div>
            <div style="margin-bottom: 20px;">
                <p style="font-size: 14px; color: #666;">CSS Gradient Code:</p>
                <code id="gradientCode" style="background: #f0f0f0; padding: 10px; border-radius: 8px; display: inline-block;">linear-gradient(135deg, #a855f7, #ec4899)</code>
            </div>
            <button onclick="copyGradient()" style="background: #a855f7; color: white; border: none; padding: 10px 30px; border-radius: 25px; cursor: pointer;">Copy CSS</button>
        </div>
    `;
    demoModal.style.display = 'flex';
    
    const color1 = document.getElementById('color1');
    const color2 = document.getElementById('color2');
    const gradientPreview = document.getElementById('gradientPreview');
    const gradientCode = document.getElementById('gradientCode');
    
    function updateGradient() {
        const c1 = color1.value;
        const c2 = color2.value;
        const gradient = `linear-gradient(135deg, ${c1}, ${c2})`;
        gradientPreview.style.background = gradient;
        gradientCode.textContent = gradient;
    }
    
    color1.addEventListener('input', updateGradient);
    color2.addEventListener('input', updateGradient);
    
    window.copyGradient = function() {
        navigator.clipboard.writeText(gradientCode.textContent);
        alert('✓ Gradient code copied!');
    };
}

// SupportHub Demo
function showSupportHub() {
    modalDynamicContent.innerHTML = `
        <div style="padding: 20px;">
            <h2 style="color: #1a1a2e; margin-bottom: 20px;">SupportHub Lite</h2>
            <div style="margin-bottom: 20px;">
                <h3>Frequently Asked Questions</h3>
                <div style="margin-top: 15px;">
                    <div class="faq-item" style="margin-bottom: 10px;">
                        <button onclick="toggleFaq(0)" style="width: 100%; text-align: left; padding: 12px; background: #f8f9fa; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">🔧 How do I schedule a consultation?</button>
                        <div id="faq0" class="faq-answer" style="display: none; padding: 12px; background: #000; border-radius: 8px; margin-top: 5px;">Simply fill out the consultation form on our contact page or email us directly at nondeezekiel4@gmail.com</div>
                    </div>
                    <div class="faq-item" style="margin-bottom: 10px;">
                        <button onclick="toggleFaq(1)" style="width: 100%; text-align: left; padding: 12px; background: #f8f9fa; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">💻 What software installation services do you offer?</button>
                        <div id="faq1" class="faq-answer" style="display: none; padding: 12px; background: #000; border-radius: 8px; margin-top: 5px;">We install IDEs, databases, servers, development tools, and business software on Windows/Linux/Mac.</div>
                    </div>
                    <div class="faq-item" style="margin-bottom: 10px;">
                        <button onclick="toggleFaq(2)" style="width: 100%; text-align: left; padding: 12px; background: #f8f9fa; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">🌐 Do you offer ongoing IT support?</button>
                        <div id="faq2" class="faq-answer" style="display: none; padding: 12px; background: #000; border-radius: 8px; margin-top: 5px;">Yes! We provide monthly maintenance plans and on-call troubleshooting for businesses.</div>
                    </div>
                </div>
            </div>
            <div style="margin-top: 20px; padding: 20px; background: linear-gradient(135deg, #a855f7, #ec4899); border-radius: 12px; text-align: center;">
                <h4 style="color: white; margin-bottom: 10px;">Need immediate help?</h4>
                <button onclick="closeDemoModal(); document.getElementById('contact').scrollIntoView({behavior: 'smooth'});" style="background: white; color: #a855f7; border: none; padding: 10px 25px; border-radius: 25px; cursor: pointer;">Contact Support →</button>
            </div>
        </div>
    `;
    demoModal.style.display = 'flex';
    
    window.toggleFaq = function(index) {
        const answer = document.getElementById(`faq${index}`);
        if (answer.style.display === 'none') {
            answer.style.display = 'block';
        } else {
            answer.style.display = 'none';
        }
    };
}

// Close modal function
window.closeDemoModal = function() {
    if (demoModal) {
        demoModal.style.display = 'none';
    }
};

// Add event listeners to live demo buttons
document.querySelectorAll('.live-demo-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const demoType = btn.getAttribute('data-demo');
        
        switch(demoType) {
            case 'taskManager':
                showTaskManager();
                break;
            case 'colorLab':
                showColorLab();
                break;
            case 'supportHub':
                showSupportHub();
                break;
            default:
                console.log('Unknown demo type');
        }
    });
});

// Close modal when clicking X or outside
if (closeModal) {
    closeModal.addEventListener('click', closeDemoModal);
}
if (demoModal) {
    demoModal.addEventListener('click', (e) => {
        if (e.target === demoModal) {
            closeDemoModal();
        }
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
            await emailjs.send(
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
    initLiveDemos();
    initContactForm();
    console.log('✅ All features initialized successfully!');
});
