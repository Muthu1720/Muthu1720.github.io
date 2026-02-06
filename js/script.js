// ===== Navigation ===== 
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ===== Particles Background ===== 
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 3 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = Math.random() > 0.5 ? '#00f5ff' : '#ff00ff';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.opacity = Math.random() * 0.5;
        particle.style.animation = `float ${Math.random() * 10 + 5}s infinite ease-in-out`;
        particlesContainer.appendChild(particle);
    }
}

const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0) translateX(0); }
        25% { transform: translateY(-20px) translateX(10px); }
        50% { transform: translateY(-40px) translateX(-10px); }
        75% { transform: translateY(-20px) translateX(5px); }
    }
`;
document.head.appendChild(style);

createParticles();

// ===== Counter Animation ===== 
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / speed;

        function updateCount() {
            const count = +counter.innerText;
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target + '+';
            }
        }

        updateCount();
    });
}

const statsSection = document.querySelector('.stats-grid');
if (statsSection) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(statsSection);
}

// ===== Load Projects from JSON ===== 
async function loadProjects() {
    try {
        const response = await fetch('data/projects.json');
        const projects = await response.json();
        const container = document.getElementById('projectsContainer');

        projects.forEach(project => {
            const card = createProjectCard(project);
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading projects:', error);
        document.getElementById('projectsContainer').innerHTML = 
            '<p style="color: var(--text-secondary); text-align: center; width: 100%;">Projects data not found. Please add projects.json file.</p>';
    }
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.onclick = () => openProjectModal(project);

    card.innerHTML = `
        <div class="project-header">
            <div>
                <h3>${project.title}</h3>
            </div>
            <div class="project-icon">
                <i class="${project.icon || 'fas fa-code'}"></i>
            </div>
        </div>
        <p class="project-description">${project.shortDescription}</p>
        <div class="project-tech">
            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
        <p class="expand-hint"><i class="fas fa-expand"></i> Click to expand</p>
    `;

    return card;
}

function openProjectModal(project) {
    const modal = document.getElementById('projectModal');
    const details = document.getElementById('projectDetails');

    let featuresHTML = '';
    if (project.features && project.features.length > 0) {
        featuresHTML = `
            <h3>Key Features</h3>
            <ul>
                ${project.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        `;
    }

    let achievementsHTML = '';
    if (project.achievements && project.achievements.length > 0) {
        achievementsHTML = `
            <h3>Achievements</h3>
            <ul>
                ${project.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
            </ul>
        `;
    }

    details.innerHTML = `
        <h2>${project.title}</h2>
        <div class="project-tech" style="margin-bottom: 2rem;">
            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
        <h3>Overview</h3>
        <p>${project.fullDescription}</p>
        ${featuresHTML}
        ${achievementsHTML}
        <h3>Impact</h3>
        <p>${project.impact || 'Demonstrated practical application of security principles and tools.'}</p>
    `;

    modal.style.display = 'block';
}

// ===== Load Certificates from JSON ===== 
async function loadCertificates() {
    try {
        const response = await fetch('data/certificates.json');
        const certificates = await response.json();
        const container = document.getElementById('certContainer');

        certificates.forEach(cert => {
            const card = createCertCard(cert);
            container.appendChild(card);
        });
        
        // Generate thumbnails after cards are created
        setTimeout(() => {
            generateCertThumbnails();
        }, 100);
        
    } catch (error) {
        console.error('Error loading certificates:', error);
        document.getElementById('certContainer').innerHTML = 
            '<p style="color: var(--text-secondary); text-align: center; width: 100%;">Certificates data not found. Please add certificates.json file.</p>';
    }
}

function createCertCard(cert) {
    const card = document.createElement('div');
    card.className = 'cert-card';
    card.onclick = () => openCertModal(cert.file);

    card.innerHTML = `
        <div class="cert-thumbnail">
            <canvas class="cert-preview-canvas" data-pdf="certificates/${cert.file}"></canvas>
            <div class="cert-overlay">
                <i class="fas fa-search-plus"></i>
                <span>Click to view</span>
            </div>
        </div>
        <h3>${cert.name}</h3>
        <p>${cert.issuer}</p>
        <p class="cert-date">${cert.date}</p>
    `;

    return card;
}

// Generate PDF Thumbnails
function generateCertThumbnails() {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    
    const canvases = document.querySelectorAll('.cert-preview-canvas');
    
    canvases.forEach(canvas => {
        const pdfPath = canvas.getAttribute('data-pdf');
        
        pdfjsLib.getDocument(pdfPath).promise.then(pdf => {
            pdf.getPage(1).then(page => {
                const viewport = page.getViewport({ scale: 0.5 });
                const context = canvas.getContext('2d');
                
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                
                page.render({
                    canvasContext: context,
                    viewport: viewport
                });
            });
        }).catch(error => {
            console.error('Error loading PDF thumbnail:', error);
            // Show icon if PDF fails to load
            canvas.parentElement.innerHTML = '<i class="fas fa-certificate"></i>';
        });
    });
}

// ===== PDF Certificate Modal ===== 
let pdfDoc = null;
let pageNum = 1;
let pageRendering = false;
let pageNumPending = null;
let scale = 1.5;
let canvas = null;
let ctx = null;

function openCertModal(pdfFile) {
    const modal = document.getElementById('certModal');
    canvas = document.getElementById('pdfCanvas');
    ctx = canvas.getContext('2d');
    
    modal.style.display = 'block';

    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    const loadingTask = pdfjsLib.getDocument(`certificates/${pdfFile}`);
    loadingTask.promise.then(pdf => {
        pdfDoc = pdf;
        document.getElementById('pageInfo').textContent = `Page ${pageNum} of ${pdfDoc.numPages}`;
        renderPage(pageNum);
    }).catch(error => {
        console.error('Error loading PDF:', error);
        ctx.font = '20px Arial';
        ctx.fillStyle = '#00f5ff';
        ctx.fillText('Error loading certificate. Please check the file path.', 50, 100);
    });
}

function renderPage(num) {
    pageRendering = true;
    pdfDoc.getPage(num).then(page => {
        const viewport = page.getViewport({ scale: scale });
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
            canvasContext: ctx,
            viewport: viewport
        };

        const renderTask = page.render(renderContext);
        renderTask.promise.then(() => {
            pageRendering = false;
            if (pageNumPending !== null) {
                renderPage(pageNumPending);
                pageNumPending = null;
            }
        });
    });

    document.getElementById('pageInfo').textContent = `Page ${num} of ${pdfDoc.numPages}`;
}

function queueRenderPage(num) {
    if (pageRendering) {
        pageNumPending = num;
    } else {
        renderPage(num);
    }
}

function onPrevPage() {
    if (pageNum <= 1) return;
    pageNum--;
    queueRenderPage(pageNum);
}

function onNextPage() {
    if (pageNum >= pdfDoc.numPages) return;
    pageNum++;
    queueRenderPage(pageNum);
}

document.getElementById('prevPage')?.addEventListener('click', onPrevPage);
document.getElementById('nextPage')?.addEventListener('click', onNextPage);

// ===== Modal Close Handlers ===== 
const modals = document.querySelectorAll('.modal');
const closeButtons = document.querySelectorAll('.modal-close');

closeButtons.forEach((btn, index) => {
    btn.onclick = () => {
        modals[index].style.display = 'none';
        if (index === 0) {
            pageNum = 1;
            pdfDoc = null;
        }
    };
});

window.onclick = (event) => {
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
            pageNum = 1;
            pdfDoc = null;
        }
    });
};

// ===== Resume Download ===== 
document.getElementById('downloadResume')?.addEventListener('click', (e) => {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = 'resume/Muthu_Kumar_S_Resume.pdf';
    link.download = 'Muthu_Kumar_S_Resume.pdf';
    link.click();
});

// ===== Smooth Scroll ===== 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Scroll Animations ===== 
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    scrollObserver.observe(section);
});

// ===== Navbar Scroll Effect ===== 
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.style.boxShadow = 'none';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 245, 255, 0.1)';
    }

    lastScroll = currentScroll;
});

// ===== Initialize ===== 
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    loadCertificates();
});

// ===== Profile Image Error Handler ===== 
const profileImage = document.getElementById('profileImage');
profileImage.onerror = function() {
    this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="350" height="350"%3E%3Crect fill="%231a1a2e" width="350" height="350"/%3E%3Ctext fill="%2300f5ff" font-family="Arial" font-size="24" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EAdd Your Photo%3C/text%3E%3C/svg%3E';
};
