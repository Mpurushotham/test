// Tutorial-specific JavaScript functionality

// Mobile Navigation Toggle (inherited from main script.js)
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Smooth scrolling for navigation links
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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Tutorial Progress Tracking
class TutorialProgress {
    constructor() {
        this.storageKey = 'tutorial-progress';
        this.init();
    }

    init() {
        this.loadProgress();
        this.setupProgressTracking();
    }

    loadProgress() {
        const progress = localStorage.getItem(this.storageKey);
        if (progress) {
            this.progress = JSON.parse(progress);
        } else {
            this.progress = {};
        }
    }

    saveProgress() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.progress));
    }

    setupProgressTracking() {
        // Track tutorial card clicks
        document.querySelectorAll('.tutorial-card a').forEach(link => {
            link.addEventListener('click', (e) => {
                const tutorialName = this.extractTutorialName(link.href);
                this.markTutorialStarted(tutorialName);
            });
        });
    }

    extractTutorialName(url) {
        const urlParts = url.split('/');
        const filename = urlParts[urlParts.length - 1];
        return filename.replace('.html', '');
    }

    markTutorialStarted(tutorialName) {
        if (!this.progress[tutorialName]) {
            this.progress[tutorialName] = {
                started: true,
                startedAt: new Date().toISOString(),
                completed: false,
                completedAt: null,
                progress: 0
            };
        } else {
            this.progress[tutorialName].started = true;
            this.progress[tutorialName].startedAt = new Date().toISOString();
        }
        this.saveProgress();
    }

    markTutorialCompleted(tutorialName) {
        if (!this.progress[tutorialName]) {
            this.progress[tutorialName] = {};
        }
        this.progress[tutorialName].completed = true;
        this.progress[tutorialName].completedAt = new Date().toISOString();
        this.progress[tutorialName].progress = 100;
        this.saveProgress();
    }

    updateProgress(tutorialName, progress) {
        if (!this.progress[tutorialName]) {
            this.progress[tutorialName] = {};
        }
        this.progress[tutorialName].progress = Math.min(100, Math.max(0, progress));
        this.saveProgress();
    }

    getProgress(tutorialName) {
        return this.progress[tutorialName] || { progress: 0, completed: false };
    }
}

// Tutorial Navigation
class TutorialNavigation {
    constructor() {
        this.currentSection = 0;
        this.sections = [];
        this.init();
    }

    init() {
        this.sections = Array.from(document.querySelectorAll('.tutorial-section'));
        this.setupNavigation();
        this.highlightCurrentSection();
    }

    setupNavigation() {
        // Create navigation if it doesn't exist
        const sidebar = document.querySelector('.tutorial-sidebar ul');
        if (sidebar && this.sections.length > 0) {
            this.sections.forEach((section, index) => {
                const heading = section.querySelector('h2');
                if (heading) {
                    const li = document.createElement('li');
                    const a = document.createElement('a');
                    a.href = `#section-${index}`;
                    a.textContent = heading.textContent;
                    a.addEventListener('click', (e) => {
                        e.preventDefault();
                        this.scrollToSection(index);
                    });
                    li.appendChild(a);
                    sidebar.appendChild(li);
                }
            });
        }

        // Setup scroll spy
        this.setupScrollSpy();
    }

    setupScrollSpy() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = this.sections.indexOf(entry.target);
                    if (index !== -1) {
                        this.currentSection = index;
                        this.highlightCurrentSection();
                    }
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-100px 0px -100px 0px'
        });

        this.sections.forEach(section => {
            observer.observe(section);
        });
    }

    highlightCurrentSection() {
        const links = document.querySelectorAll('.tutorial-sidebar a');
        links.forEach((link, index) => {
            if (index === this.currentSection) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    scrollToSection(index) {
        if (this.sections[index]) {
            this.sections[index].scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
}

// Code Copy Functionality
class CodeCopy {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('.code-block').forEach(block => {
            this.addCopyButton(block);
        });
    }

    addCopyButton(block) {
        const button = document.createElement('button');
        button.className = 'copy-button';
        button.innerHTML = '<i class="fas fa-copy"></i>';
        button.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: white;
            padding: 8px 12px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            transition: all 0.3s ease;
        `;

        button.addEventListener('click', () => {
            this.copyToClipboard(block, button);
        });

        block.style.position = 'relative';
        block.appendChild(button);
    }

    async copyToClipboard(block, button) {
        const text = block.querySelector('pre').textContent;
        
        try {
            await navigator.clipboard.writeText(text);
            button.innerHTML = '<i class="fas fa-check"></i>';
            button.style.background = 'rgba(34, 197, 94, 0.2)';
            button.style.borderColor = 'rgba(34, 197, 94, 0.5)';
            
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-copy"></i>';
                button.style.background = 'rgba(255, 255, 255, 0.1)';
                button.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }, 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
            button.innerHTML = '<i class="fas fa-times"></i>';
            button.style.background = 'rgba(239, 68, 68, 0.2)';
            button.style.borderColor = 'rgba(239, 68, 68, 0.5)';
            
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-copy"></i>';
                button.style.background = 'rgba(255, 255, 255, 0.1)';
                button.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }, 2000);
        }
    }
}

// Tutorial Search
class TutorialSearch {
    constructor() {
        this.searchInput = null;
        this.searchResults = null;
        this.init();
    }

    init() {
        this.createSearchInterface();
        this.setupSearch();
    }

    createSearchInterface() {
        const searchContainer = document.querySelector('.tutorial-categories .container');
        if (searchContainer) {
            const searchBox = document.createElement('div');
            searchBox.className = 'tutorial-search-box';
            searchBox.style.cssText = `
                max-width: 600px;
                margin: 0 auto 3rem;
                position: relative;
            `;
            
            searchBox.innerHTML = `
                <input type="text" id="tutorialSearch" placeholder="Search tutorials, topics, or technologies..." 
                       style="width: 100%; padding: 15px 50px 15px 20px; border: 2px solid #e2e8f0; border-radius: 25px; font-size: 1rem; outline: none; transition: all 0.3s ease;">
                <button id="tutorialSearchBtn" style="position: absolute; right: 5px; top: 50%; transform: translateY(-50%); background: #2563eb; color: white; border: none; border-radius: 50%; width: 40px; height: 40px; cursor: pointer; display: flex; align-items: center; justify-content: center;">
                    <i class="fas fa-search"></i>
                </button>
            `;
            
            searchContainer.insertBefore(searchBox, searchContainer.firstChild);
            
            this.searchInput = document.getElementById('tutorialSearch');
            this.searchBtn = document.getElementById('tutorialSearchBtn');
        }
    }

    setupSearch() {
        if (this.searchInput && this.searchBtn) {
            this.searchBtn.addEventListener('click', () => this.performSearch());
            this.searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch();
                }
            });
        }
    }

    performSearch() {
        const query = this.searchInput.value.toLowerCase().trim();
        if (!query) return;

        const tutorialCards = document.querySelectorAll('.tutorial-card');
        let visibleCount = 0;

        tutorialCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const meta = card.querySelector('.tutorial-meta').textContent.toLowerCase();
            
            const isMatch = title.includes(query) || 
                          description.includes(query) || 
                          meta.includes(query);
            
            if (isMatch) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Show search results message
        this.showSearchResults(visibleCount, query);
    }

    showSearchResults(count, query) {
        let messageContainer = document.getElementById('searchResultsMessage');
        if (!messageContainer) {
            messageContainer = document.createElement('div');
            messageContainer.id = 'searchResultsMessage';
            messageContainer.style.cssText = `
                text-align: center;
                padding: 1rem;
                margin-bottom: 2rem;
                background: #f8fafc;
                border-radius: 8px;
                border: 1px solid #e2e8f0;
            `;
            document.querySelector('.tutorial-grid').parentNode.insertBefore(messageContainer, document.querySelector('.tutorial-grid'));
        }

        if (count === 0) {
            messageContainer.innerHTML = `
                <p style="color: #64748b; margin: 0;">No tutorials found for "${query}". Try different keywords or browse all tutorials.</p>
            `;
        } else {
            messageContainer.innerHTML = `
                <p style="color: #1e293b; margin: 0;">Found ${count} tutorial${count > 1 ? 's' : ''} matching "${query}"</p>
            `;
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TutorialProgress();
    new TutorialNavigation();
    new CodeCopy();
    new TutorialSearch();
    
    // Add smooth reveal animation to tutorial cards
    const tutorialCards = document.querySelectorAll('.tutorial-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    tutorialCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .copy-button:hover {
        background: rgba(255, 255, 255, 0.2) !important;
        transform: scale(1.05);
    }
`;
document.head.appendChild(style);