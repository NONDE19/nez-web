// EmailJS configuration 
const EMAILJS_CONFIG = {
    serviceID: "service_b0u9vg1",    
    templateID: "template_m5ql2zm",   
    publicKey: "UGJFJNwfkUOW18R_n"    
};

// Initialize EmailJS
if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_CONFIG.publicKey);
    console.log('✅ EmailJS initialized with correct public key');
} else {
    console.warn('EmailJS library not loaded yet');
}
// Contact form handler with field mapping
const consultForm = document.getElementById('consultForm');
if (consultForm) {
    consultForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        if (typeof emailjs === 'undefined') {
            const feedback = document.getElementById('formFeedback');
            if (feedback) {
                feedback.innerHTML = '<span style="color: red;">⚠️ Email service not available. Please email us directly.</span>';
            }
            return;
        }
        
        const submitBtn = consultForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        const formFeedback = document.getElementById('formFeedback');
        
        // Get form values
        const name = document.getElementById('name')?.value || '';
        const email = document.getElementById('email')?.value || '';
        const serviceType = document.getElementById('serviceType')?.value || '';
        const message = document.getElementById('message')?.value || '';
        
        // Template parameters 
        const templateParams = {
            client_name: name,           
            name: name,                 
            email_address: email,        
            email: email,                
            service_requested: serviceType, 
            serviceType: serviceType,   
            message: message,            
            client_message: message  
        };
        
        console.log('Sending with params:', templateParams);
        
    
        emailjs.send(
            EMAILJS_CONFIG.serviceID,
            EMAILJS_CONFIG.templateID,
            templateParams
        )
        .then(function(response) {
            console.log('SUCCESS!', response);
            if (formFeedback) {
                formFeedback.innerHTML = '<span style="color: #10b981;">✓ Message sent successfully! We will get back to you soon.</span>';
            }
            consultForm.reset();
            setTimeout(() => {
                if (formFeedback) formFeedback.innerHTML = '';
            }, 5000);
        })
        .catch(function(error) {
            console.error('Error:', error);
            if (formFeedback) {
                formFeedback.innerHTML = '<span style="color: #dc2626;">❌ Failed to send. Please email nondeezekiel4@gmail.com directly.</span>';
            }
        })
        .finally(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    });
}
// ======================== FIXED MOBILE MENU TOGGLE ========================
const menuToggle = document.getElementById('menuToggle');
const navLinksMenu = document.getElementById('navLinks');

function toggleMobileMenu() {
    if (navLinksMenu) {
        navLinksMenu.classList.toggle('active');
        
        // Change icon between bars and times
        const icon = menuToggle?.querySelector('i');
        if (icon) {
            if (navLinksMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
        
        // Prevent body scroll when menu is open
        if (navLinksMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
}

// Add click event to toggle button
if (menuToggle) {
    menuToggle.addEventListener('click', toggleMobileMenu);
}

// Close mobile menu when clicking a nav link
document.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', (e) => {
        if (navLinksMenu && navLinksMenu.classList.contains('active')) {
            navLinksMenu.classList.remove('active');
            
            // Change icon back to bars
            const icon = menuToggle?.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            
            document.body.style.overflow = '';
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinksMenu && navLinksMenu.classList.contains('active')) {
        const isClickInsideMenu = navLinksMenu.contains(e.target);
        const isClickOnToggle = menuToggle?.contains(e.target);
        
        if (!isClickInsideMenu && !isClickOnToggle) {
            navLinksMenu.classList.remove('active');
            
            const icon = menuToggle?.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            
            document.body.style.overflow = '';
        }
    }
});

// ======================== ACTIVE NAVIGATION ON SCROLL ========================
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-item');

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
        const href = item.getAttribute('href').substring(1);
        if (href === current) {
            item.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);

// ======================== SMOOTH SCROLLING ========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
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

// ======================== LIVE PROJECTS DEMO MODAL ========================
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
                        <div id="faq0" class="faq-answer" style="display: none; padding: 12px; background: #f0f0f0; border-radius: 8px; margin-top: 5px;">Simply fill out the consultation form on our contact page or email us directly at nondeezekiel4@gmail.com</div>
                    </div>
                    <div class="faq-item" style="margin-bottom: 10px;">
                        <button onclick="toggleFaq(1)" style="width: 100%; text-align: left; padding: 12px; background: #f8f9fa; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">💻 What software installation services do you offer?</button>
                        <div id="faq1" class="faq-answer" style="display: none; padding: 12px; background: #f0f0f0; border-radius: 8px; margin-top: 5px;">We install IDEs, databases, servers, development tools, and business software on Windows/Linux/Mac.</div>
                    </div>
                    <div class="faq-item" style="margin-bottom: 10px;">
                        <button onclick="toggleFaq(2)" style="width: 100%; text-align: left; padding: 12px; background: #f8f9fa; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">🌐 Do you offer ongoing IT support?</button>
                        <div id="faq2" class="faq-answer" style="display: none; padding: 12px; background: #f0f0f0; border-radius: 8px; margin-top: 5px;">Yes! We provide monthly maintenance plans and on-call troubleshooting for businesses.</div>
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

// ======================== GRAPHIC GALLERY (CUSTOM SVG DESIGNS) ========================
const galleryGrid = document.getElementById('galleryGrid');
if (galleryGrid) {
    const graphicItems = [
        // Logos & Marks
        { 
            category: 'logo', 
            title: 'NezTech Logo Suite', 
            description: 'Modern tech logo with geometric mark',
            svg: `<svg viewBox="0 0 600 500" xmlns="http://www.w3.org/2000/svg">
                <rect width="600" height="500" fill="#1a1a2e"/>
                <circle cx="300" cy="200" r="80" fill="none" stroke="#a855f7" stroke-width="4"/>
                <polygon points="300,140 340,200 310,200 340,260 260,260 290,200 260,200" fill="#c084fc"/>
                <text x="300" y="340" text-anchor="middle" fill="#eef2ff" font-size="36" font-weight="bold" font-family="Arial">NEZTECH</text>
                <text x="300" y="380" text-anchor="middle" fill="#9ca3af" font-size="16" font-family="Arial">Digital Solutions</text>
                <rect x="230" y="410" width="140" height="3" fill="#a855f7" rx="2"/>
            </svg>`
        },
        { 
            category: 'logo', 
            title: 'Minimalist Brand Mark', 
            description: 'Clean abstract mark for modern brands',
            svg: `<svg viewBox="0 0 600 500" xmlns="http://www.w3.org/2000/svg">
                <rect width="600" height="500" fill="#0f0f17"/>
                <circle cx="300" cy="200" r="60" fill="#a855f7" opacity="0.9"/>
                <circle cx="300" cy="200" r="35" fill="#0f0f17"/>
                <line x1="220" y1="280" x2="380" y2="280" stroke="#a855f7" stroke-width="3"/>
                <line x1="250" y1="310" x2="350" y2="310" stroke="#a855f7" stroke-width="2" opacity="0.6"/>
                <text x="300" y="370" text-anchor="middle" fill="#eef2ff" font-size="32" font-weight="bold" font-family="Arial">MINIMAL</text>
                <text x="300" y="405" text-anchor="middle" fill="#9ca3af" font-size="14" font-family="Arial">BRAND STUDIO</text>
            </svg>`
        },
        { 
            category: 'logo', 
            title: 'Luxury Gold Logo', 
            description: 'Premium logo with elegant gold accents',
            svg: `<svg viewBox="0 0 600 500" xmlns="http://www.w3.org/2000/svg">
                <rect width="600" height="500" fill="#1a1a2e"/>
                <defs>
                    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#f3c26b"/>
                        <stop offset="50%" style="stop-color:#d4af37"/>
                        <stop offset="100%" style="stop-color:#f3c26b"/>
                    </linearGradient>
                </defs>
                <path d="M300,120 L350,200 L300,180 L250,200 Z" fill="url(#gold)"/>
                <ellipse cx="300" cy="230" rx="70" ry="40" fill="none" stroke="url(#gold)" stroke-width="2"/>
                <text x="300" y="310" text-anchor="middle" fill="url(#gold)" font-size="40" font-weight="bold" font-family="Georgia">LUXE</text>
                <text x="300" y="350" text-anchor="middle" fill="#d4af37" font-size="14" font-family="Georgia" letter-spacing="4">COLLECTION</text>
                <path d="M240,380 L360,380" stroke="url(#gold)" stroke-width="1"/>
                <path d="M260,395 L340,395" stroke="url(#gold)" stroke-width="1" opacity="0.5"/>
            </svg>`
        },
        
        // Business Cards
        { 
            category: 'branding', 
            title: 'Premium Business Card Set', 
            description: 'Double-sided business cards with foil accents',
            svg: `<svg viewBox="0 0 600 500" xmlns="http://www.w3.org/2000/svg">
                <rect width="600" height="500" fill="#1e1e2e"/>
                <rect x="80" y="80" width="200" height="130" rx="10" fill="#2a2a3a" stroke="#a855f7" stroke-width="2"/>
                <text x="180" y="120" text-anchor="middle" fill="#c084fc" font-size="14" font-weight="bold" font-family="Arial">SARAH CHEN</text>
                <text x="180" y="140" text-anchor="middle" fill="#eef2ff" font-size="10" font-family="Arial">Creative Director</text>
                <line x1="120" y1="155" x2="240" y2="155" stroke="#a855f7" stroke-width="0.5"/>
                <text x="180" y="170" text-anchor="middle" fill="#9ca3af" font-size="8" font-family="Arial">sarah@neztech.com</text>
                <text x="180" y="185" text-anchor="middle" fill="#9ca3af" font-size="8" font-family="Arial">+1 (555) 123-4567</text>
                <rect x="80" y="80" width="200" height="130" rx="10" fill="none" stroke="#a855f7" stroke-width="1" stroke-dasharray="4,4"/>
                <rect x="320" y="80" width="200" height="130" rx="10" fill="#2a2a3a" stroke="#c084fc" stroke-width="1"/>
                <circle cx="420" cy="145" r="25" fill="none" stroke="#c084fc" stroke-width="2"/>
                <text x="420" y="140" text-anchor="middle" fill="#c084fc" font-size="20" font-weight="bold">N</text>
                <text x="420" y="160" text-anchor="middle" fill="#9ca3af" font-size="8">neztech.design</text>
                <text x="300" y="260" text-anchor="middle" fill="#c084fc" font-size="12" font-weight="bold">Premium Business Card Set</text>
                <text x="300" y="280" text-anchor="middle" fill="#9ca3af" font-size="10">Matte finish • Foil accents • Custom box</text>
            </svg>`
        },
        { 
            category: 'branding', 
            title: 'Modern Business Card', 
            description: 'Minimalist typography business card',
            svg: `<svg viewBox="0 0 600 500" xmlns="http://www.w3.org/2000/svg">
                <rect width="600" height="500" fill="#0a0a0f"/>
                <rect x="100" y="100" width="400" height="160" rx="12" fill="#13131c" stroke="#2d2d3a" stroke-width="1"/>
                <rect x="100" y="100" width="8" height="160" fill="#a855f7" rx="4"/>
                <text x="140" y="145" fill="#eef2ff" font-size="28" font-weight="bold" font-family="Arial">JAMES WILSON</text>
                <text x="140" y="170" fill="#c084fc" font-size="12" font-family="Arial" letter-spacing="2">FULL STACK DEVELOPER</text>
                <text x="140" y="195" fill="#9ca3af" font-size="10" font-family="Arial">james.wilson@devstudio.com</text>
                <text x="140" y="213" fill="#9ca3af" font-size="10" font-family="Arial">+1 (555) 987-6543</text>
                <circle cx="440" cy="180" r="30" fill="none" stroke="#a855f7" stroke-width="1.5"/>
                <text x="440" y="177" text-anchor="middle" fill="#a855f7" font-size="24" font-weight="bold">&lt;/&gt;</text>
                <text x="440" y="195" text-anchor="middle" fill="#9ca3af" font-size="8">devstudio.com</text>
            </svg>`
        },
        { 
            category: 'branding', 
            title: 'Corporate Stationery Set', 
            description: 'Complete brand identity package',
            svg: `<svg viewBox="0 0 600 500" xmlns="http://www.w3.org/2000/svg">
                <rect width="600" height="500" fill="#1a2a3a"/>
                <rect x="60" y="60" width="220" height="160" rx="6" fill="#eef2ff"/>
                <rect x="60" y="60" width="220" height="40" rx="6" fill="#1a2a3a"/>
                <text x="170" y="85" text-anchor="middle" fill="#eef2ff" font-size="14" font-weight="bold">CORPORATE</text>
                <text x="170" y="110" text-anchor="middle" fill="#1a2a3a" font-size="10">123 Business Ave, Suite 100</text>
                <text x="170" y="125" text-anchor="middle" fill="#1a2a3a" font-size="10">New York, NY 10001</text>
                <rect x="320" y="60" width="220" height="140" rx="6" fill="#f0f4f8" stroke="#1a2a3a" stroke-width="1"/>
                <polygon points="320,60 430,130 540,60" fill="#1a2a3a" opacity="0.1"/>
                <text x="430" y="175" text-anchor="middle" fill="#1a2a3a" font-size="10" font-weight="bold">CORPORATE</text>
                <text x="300" y="270" text-anchor="middle" fill="#c084fc" font-size="12" font-weight="bold">Complete Stationery Set</text>
                <text x="300" y="290" text-anchor="middle" fill="#9ca3af" font-size="10">Letterhead • Envelope • Business Card • Folder</text>
            </svg>`
        },
        
        // Typography
        { 
            category: 'typography', 
            title: 'Custom Typography Poster', 
            description: 'Bold typographic design for print',
            svg: `<svg viewBox="0 0 600 500" xmlns="http://www.w3.org/2000/svg">
                <rect width="600" height="500" fill="#0d0d14"/>
                <text x="300" y="120" text-anchor="middle" fill="#c084fc" font-size="64" font-weight="800" font-family="Impact, Arial Black">CREATE</text>
                <text x="300" y="200" text-anchor="middle" fill="#eef2ff" font-size="48" font-weight="700" font-family="Georgia">Bold</text>
                <text x="300" y="270" text-anchor="middle" fill="#9ca3af" font-size="36" font-weight="400" font-family="Courier New">Typography</text>
                <text x="300" y="340" text-anchor="middle" fill="#a855f7" font-size="28" font-weight="600" font-family="Arial">Matters</text>
                <line x1="150" y1="370" x2="450" y2="370" stroke="#a855f7" stroke-width="2"/>
                <text x="300" y="400" text-anchor="middle" fill="#6b7280" font-size="12" font-family="Arial" letter-spacing="4">DESIGN WITH INTENTION</text>
            </svg>`
        },
        { 
            category: 'typography', 
            title: 'Hand Lettering Art', 
            description: 'Custom calligraphy and lettering',
            svg: `<svg viewBox="0 0 600 500" xmlns="http://www.w3.org/2000/svg">
                <rect width="600" height="500" fill="#1a1a2e"/>
                <path d="M180,160 Q250,120 300,160 Q350,200 420,160" fill="none" stroke="#c084fc" stroke-width="3" stroke-linecap="round"/>
                <path d="M200,220 Q250,190 300,220 Q350,250 400,220" fill="none" stroke="#eef2ff" stroke-width="2" stroke-linecap="round"/>
                <path d="M220,280 Q280,250 300,280 Q350,310 380,280" fill="none" stroke="#a855f7" stroke-width="2.5" stroke-linecap="round"/>
                <text x="300" y="350" text-anchor="middle" fill="#c084fc" font-size="42" font-style="italic" font-family="Georgia">Dream</text>
                <text x="300" y="400" text-anchor="middle" fill="#eef2ff" font-size="28" font-style="italic" font-family="Georgia">big</text>
                <text x="300" y="440" text-anchor="middle" fill="#9ca3af" font-size="12" font-family="Arial">✧ Custom Calligraphy ✧</text>
            </svg>`
        },
        { 
            category: 'typography', 
            title: 'Vintage Letterpress', 
            description: 'Retro-inspired typography design',
            svg: `<svg viewBox="0 0 600 500" xmlns="http://www.w3.org/2000/svg">
                <rect width="600" height="500" fill="#2a1a1a"/>
                <rect x="80" y="100" width="440" height="280" fill="none" stroke="#d4a373" stroke-width="2"/>
                <rect x="90" y="110" width="420" height="260" fill="none" stroke="#d4a373" stroke-width="0.5"/>
                <text x="300" y="180" text-anchor="middle" fill="#d4a373" font-size="52" font-weight="900" font-family="Georgia">LETTERPRESS</text>
                <text x="300" y="240" text-anchor="middle" fill="#eaddcf" font-size="18" font-family="Georgia" letter-spacing="6">PRINTING CO.</text>
                <line x1="180" y1="270" x2="420" y2="270" stroke="#d4a373" stroke-width="1"/>
                <text x="300" y="310" text-anchor="middle" fill="#d4a373" font-size="14" font-style="italic" font-family="Georgia">Est. 1923</text>
                <text x="300" y="350" text-anchor="middle" fill="#eaddcf" font-size="10" font-family="Georgia">QUALITY PRINTING SINCE 1923</text>
            </svg>`
        },
        
        // Social Media Templates
        { 
            category: 'social', 
            title: 'Instagram Post Template', 
            description: 'Modern social media post design',
            svg: `<svg viewBox="0 0 600 500" xmlns="http://www.w3.org/2000/svg">
                <rect width="600" height="500" fill="#f5f5f5"/>
                <rect x="150" y="50" width="300" height="300" rx="20" fill="#1a1a2e"/>
                <rect x="170" y="70" width="260" height="150" rx="10" fill="#a855f7" opacity="0.2"/>
                <text x="300" y="130" text-anchor="middle" fill="#c084fc" font-size="28" font-weight="bold">NEW</text>
                <text x="300" y="170" text-anchor="middle" fill="#eef2ff" font-size="18" font-weight="bold">ARRIVALS</text>
                <text x="300" y="200" text-anchor="middle" fill="#9ca3af" font-size="12">Shop the collection →</text>
                <rect x="200" y="240" width="200" height="40" rx="20" fill="#a855f7"/>
                <text x="300" y="265" text-anchor="middle" fill="white" font-size="12" font-weight="bold">SWIPE UP TO SHOP</text>
                <text x="300" y="390" text-anchor="middle" fill="#1a1a2e" font-size="12" font-weight="bold">@neztech.design</text>
                <text x="300" y="410" text-anchor="middle" fill="#666" font-size="10">1,234 likes • 56 comments</text>
            </svg>`
        },
        { 
            category: 'social', 
            title: 'YouTube Thumbnail', 
            description: 'Click-worthy YouTube thumbnail design',
            svg: `<svg viewBox="0 0 600 500" xmlns="http://www.w3.org/2000/svg">
                <rect width="600" height="500" fill="#1a1a2e"/>
                <rect x="50" y="60" width="500" height="280" rx="12" fill="#0a0a0f"/>
                <rect x="50" y="60" width="500" height="280" rx="12" fill="url(#grad)" opacity="0.3"/>
                <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#a855f7"/>
                        <stop offset="100%" style="stop-color:#ec4899"/>
                    </linearGradient>
                </defs>
                <text x="300" y="150" text-anchor="middle" fill="#eef2ff" font-size="32" font-weight="bold">WEB DESIGN</text>
                <text x="300" y="195" text-anchor="middle" fill="#c084fc" font-size="26" font-weight="bold">TUTORIAL</text>
                <text x="300" y="235" text-anchor="middle" fill="#9ca3af" font-size="14">Complete guide for beginners</text>
                <rect x="180" y="270" width="240" height="45" rx="8" fill="#ff0000"/>
                <text x="300" y="298" text-anchor="middle" fill="white" font-size="16" font-weight="bold">▶ WATCH NOW</text>
                <text x="300" y="380" text-anchor="middle" fill="#eef2ff" font-size="18" font-weight="bold">50K+ views</text>
                <text x="300" y="410" text-anchor="middle" fill="#9ca3af" font-size="12">🔥 Trending #1 in Tech</text>
            </svg>`
        },
        { 
            category: 'social', 
            title: 'LinkedIn Banner', 
            description: 'Professional LinkedIn background design',
            svg: `<svg viewBox="0 0 600 500" xmlns="http://www.w3.org/2000/svg">
                <rect width="600" height="500" fill="#0a66c2"/>
                <rect x="0" y="150" width="600" height="200" fill="#ffffff" opacity="0.95"/>
                <text x="300" y="220" text-anchor="middle" fill="#0a66c2" font-size="36" font-weight="bold" font-family="Arial">WEB DESIGNER</text>
                <text x="300" y="260" text-anchor="middle" fill="#0a66c2" font-size="16" font-family="Arial">Creative Developer & UI Specialist</text>
                <text x="300" y="300" text-anchor="middle" fill="#666" font-size="12">📧 hello@neztech.design  •  📱 +1 (555) 123-4567</text>
                <circle cx="300" cy="420" r="40" fill="#0a66c2" stroke="white" stroke-width="3"/>
                <text x="300" y="426" text-anchor="middle" fill="white" font-size="24" font-weight="bold">N</text>
            </svg>`
        }
    ];

    function renderGallery() {
        if (!galleryGrid) return;
        galleryGrid.innerHTML = '';
        
        graphicItems.forEach((item, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = `gallery-item ${item.category}`;
            galleryItem.setAttribute('data-category', item.category);
            galleryItem.setAttribute('data-index', index);
            
            galleryItem.innerHTML = `
                <div class="gallery-svg">
                    ${item.svg}
                </div>
                <div class="gallery-info">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <span class="gallery-category">${item.category}</span>
                </div>
            `;
            
            galleryItem.addEventListener('click', () => {
                openLiveDemo(item);
            });
            
            galleryGrid.appendChild(galleryItem);
        });
    }
    
    function openLiveDemo(item) {
        const modal = document.createElement('div');
        modal.className = 'live-demo-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.95);
            z-index: 10000;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            padding: 30px;
            border-radius: 20px;
            max-width: 85%;
            max-height: 85%;
            overflow: auto;
            position: relative;
            cursor: default;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        `;
        
        modalContent.innerHTML = `
            <button class="modal-close-btn" style="
                position: absolute;
                top: 15px;
                right: 15px;
                background: #a855f7;
                color: white;
                border: none;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                font-size: 24px;
                cursor: pointer;
                z-index: 10;
            ">×</button>
            <div style="text-align: center;">
                <div style="margin-bottom: 15px;">
                    <span style="background: ${item.category === 'logo' ? '#a855f7' : item.category === 'branding' ? '#3b82f6' : '#ec4899'}; 
                                 color: white; 
                                 padding: 6px 18px; 
                                 border-radius: 25px; 
                                 font-size: 12px;
                                 font-weight: 600;
                                 text-transform: uppercase;">
                        ${item.category}
                    </span>
                </div>
                <div style="width: 100%; max-width: 550px; margin: 0 auto; background: #f8f9fa; border-radius: 12px; padding: 20px;">
                    ${item.svg}
                </div>
                <h2 style="margin-top: 25px; margin-bottom: 10px; color: #1a1a2e;">${item.title}</h2>
                <p style="color: #666; margin-bottom: 25px;">${item.description}</p>
                <div style="display: flex; gap: 15px; justify-content: center;">
                    <button class="download-svg-btn" style="
                        background: #a855f7;
                        color: white;
                        border: none;
                        padding: 12px 35px;
                        border-radius: 30px;
                        font-size: 16px;
                        font-weight: 600;
                        cursor: pointer;
                    ">💾 Download SVG</button>
                    <button class="close-modal-btn" style="
                        background: #6b7280;
                        color: white;
                        border: none;
                        padding: 12px 35px;
                        border-radius: 30px;
                        font-size: 16px;
                        font-weight: 600;
                        cursor: pointer;
                    ">✕ Close</button>
                </div>
            </div>
        `;
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        const closeModalBtn = modalContent.querySelector('.modal-close-btn');
        const closeBtn = modalContent.querySelector('.close-modal-btn');
        const downloadBtn = modalContent.querySelector('.download-svg-btn');
        
        function closeModalFunc() {
            modal.remove();
        }
        
        closeModalBtn.addEventListener('click', closeModalFunc);
        closeBtn.addEventListener('click', closeModalFunc);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModalFunc();
        });
        
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => {
                const blob = new Blob([item.svg], { type: 'image/svg+xml' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${item.title.toLowerCase().replace(/ /g, '-')}.svg`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                
                downloadBtn.textContent = '✓ Downloaded!';
                setTimeout(() => {
                    downloadBtn.textContent = '💾 Download SVG';
                }, 2000);
            });
        }
    }
    
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const galleryItems = document.querySelectorAll('.gallery-item');
                galleryItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    renderGallery();
    console.log(`✅ Gallery loaded with ${graphicItems.length} items`);
}


// ======================== ADDITIONAL HELPER FUNCTIONS ========================
window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && navLinksMenu && navLinksMenu.classList.contains('active')) {
        navLinksMenu.classList.remove('active');
        const icon = menuToggle?.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
        document.body.style.overflow = '';
    }
});

// Scroll reveal for gallery items
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

setTimeout(() => {
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(item);
    });
}, 100);
