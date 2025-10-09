// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

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

// AI Search Functionality
class AISearch {
    constructor() {
        this.searchInput = document.getElementById('searchInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.searchResults = document.getElementById('searchResults');
        this.isLoading = false;
        
        this.init();
    }

    init() {
        this.searchBtn.addEventListener('click', () => this.performSearch());
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performSearch();
            }
        });
    }

    async performSearch() {
        const query = this.searchInput.value.trim();
        if (!query || this.isLoading) return;

        this.isLoading = true;
        this.showLoading();

        try {
            // Simulate AI search with different responses based on query
            const results = await this.simulateAISearch(query);
            this.displayResults(results);
        } catch (error) {
            this.displayError('Sorry, there was an error processing your search. Please try again.');
        } finally {
            this.isLoading = false;
        }
    }

    showLoading() {
        this.searchResults.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <div class="loading"></div>
                <p style="margin-top: 1rem; color: #64748b;">Searching AI knowledge base...</p>
            </div>
        `;
        this.searchResults.classList.add('show');
    }

    async simulateAISearch(query) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        const lowerQuery = query.toLowerCase();
        
        // Generate contextual responses based on query keywords
        if (lowerQuery.includes('cybersecurity') || lowerQuery.includes('security')) {
            return this.getCybersecurityResults(query);
        } else if (lowerQuery.includes('ai') || lowerQuery.includes('artificial intelligence')) {
            return this.getAIResults(query);
        } else if (lowerQuery.includes('cloud') || lowerQuery.includes('aws') || lowerQuery.includes('azure')) {
            return this.getCloudResults(query);
        } else if (lowerQuery.includes('development') || lowerQuery.includes('programming') || lowerQuery.includes('code')) {
            return this.getDevelopmentResults(query);
        } else if (lowerQuery.includes('business') || lowerQuery.includes('strategy')) {
            return this.getBusinessResults(query);
        } else {
            return this.getGeneralResults(query);
        }
    }

    getCybersecurityResults(query) {
        return [
            {
                title: "Cybersecurity Best Practices for 2024",
                content: "Implement multi-factor authentication, regular security audits, employee training programs, and zero-trust architecture. Key areas include endpoint protection, network security, data encryption, and incident response planning. Consider implementing AI-powered threat detection systems for advanced protection.",
                category: "Cybersecurity"
            },
            {
                title: "Threat Detection and Response Strategies",
                content: "Modern threat detection involves behavioral analytics, machine learning algorithms, and real-time monitoring. Establish a Security Operations Center (SOC), implement SIEM solutions, and create comprehensive incident response procedures. Regular penetration testing and vulnerability assessments are crucial.",
                category: "Security"
            },
            {
                title: "Compliance and Regulatory Requirements",
                content: "Ensure compliance with GDPR, HIPAA, SOX, and industry-specific regulations. Implement data governance frameworks, conduct regular compliance audits, and maintain detailed documentation. Consider working with compliance experts to navigate complex regulatory landscapes.",
                category: "Compliance"
            }
        ];
    }

    getAIResults(query) {
        return [
            {
                title: "AI Implementation in Business",
                content: "Start with clear business objectives and data quality assessment. Choose appropriate AI models, implement robust data pipelines, and ensure ethical AI practices. Focus on areas like customer service automation, predictive analytics, and process optimization. Consider starting with pilot projects before full-scale implementation.",
                category: "Artificial Intelligence"
            },
            {
                title: "Machine Learning Model Development",
                content: "Follow a structured approach: data collection and preprocessing, feature engineering, model selection and training, validation and testing, and deployment. Use frameworks like TensorFlow, PyTorch, or scikit-learn. Ensure proper model monitoring and retraining procedures.",
                category: "Machine Learning"
            },
            {
                title: "Natural Language Processing Applications",
                content: "NLP can be applied to chatbots, sentiment analysis, document processing, and language translation. Use pre-trained models like BERT or GPT for faster development. Consider fine-tuning models for specific domains and ensure proper data privacy and bias mitigation.",
                category: "NLP"
            }
        ];
    }

    getCloudResults(query) {
        return [
            {
                title: "Cloud Migration Strategy",
                content: "Assess current infrastructure, choose appropriate cloud providers (AWS, Azure, GCP), plan migration phases, and ensure security compliance. Use cloud-native services, implement proper monitoring, and establish cost optimization practices. Consider hybrid or multi-cloud approaches for complex requirements.",
                category: "Cloud Computing"
            },
            {
                title: "Cloud Security and Compliance",
                content: "Implement identity and access management (IAM), data encryption at rest and in transit, network security groups, and regular security audits. Use cloud security tools like AWS Security Hub or Azure Security Center. Ensure compliance with industry standards and regulations.",
                category: "Cloud Security"
            },
            {
                title: "DevOps and CI/CD in the Cloud",
                content: "Implement Infrastructure as Code (IaC) using Terraform or CloudFormation, set up automated CI/CD pipelines, use containerization with Docker and Kubernetes, and implement monitoring and logging solutions. Focus on automation, scalability, and reliability.",
                category: "DevOps"
            }
        ];
    }

    getDevelopmentResults(query) {
        return [
            {
                title: "Modern Web Development Practices",
                content: "Use modern frameworks like React, Vue, or Angular for frontend development. Implement responsive design, progressive web apps (PWAs), and ensure accessibility compliance. Follow clean code principles, implement proper testing strategies, and use version control effectively.",
                category: "Web Development"
            },
            {
                title: "API Development and Integration",
                content: "Design RESTful APIs with proper documentation, implement authentication and authorization, use API gateways for management, and ensure proper error handling. Consider GraphQL for complex data requirements and implement rate limiting and monitoring.",
                category: "API Development"
            },
            {
                title: "Database Design and Optimization",
                content: "Choose appropriate database types (SQL vs NoSQL), design efficient schemas, implement proper indexing, and optimize queries. Consider database scaling strategies, backup and recovery procedures, and data migration techniques.",
                category: "Database"
            }
        ];
    }

    getBusinessResults(query) {
        return [
            {
                title: "Digital Transformation Strategy",
                content: "Assess current state, define digital goals, identify key technologies, and create implementation roadmap. Focus on customer experience, operational efficiency, and data-driven decision making. Ensure change management and employee training are part of the strategy.",
                category: "Business Strategy"
            },
            {
                title: "Technology ROI and Value Measurement",
                content: "Define clear success metrics, measure both quantitative and qualitative benefits, track implementation costs, and calculate return on investment. Consider total cost of ownership (TCO) and long-term value creation. Regular reviews and adjustments are essential.",
                category: "Business Value"
            },
            {
                title: "Technology Team Building and Management",
                content: "Hire skilled professionals, invest in continuous learning, create collaborative work environments, and implement agile methodologies. Focus on team diversity, knowledge sharing, and career development opportunities. Consider remote work policies and tools.",
                category: "Team Management"
            }
        ];
    }

    getGeneralResults(query) {
        return [
            {
                title: "Technology Trends and Future Outlook",
                content: "Key trends include artificial intelligence, quantum computing, edge computing, 5G networks, and sustainable technology. Organizations should stay informed about emerging technologies, invest in research and development, and prepare for digital disruption.",
                category: "Technology Trends"
            },
            {
                title: "Digital Innovation and Competitive Advantage",
                content: "Leverage technology to create unique value propositions, improve customer experiences, and optimize operations. Focus on innovation culture, rapid prototyping, and customer feedback integration. Consider partnerships and ecosystem development.",
                category: "Innovation"
            },
            {
                title: "Technology Risk Management",
                content: "Identify and assess technology risks, implement mitigation strategies, ensure business continuity planning, and maintain cybersecurity posture. Regular risk assessments, incident response planning, and insurance coverage are important considerations.",
                category: "Risk Management"
            }
        ];
    }

    displayResults(results) {
        if (results.length === 0) {
            this.searchResults.innerHTML = `
                <div style="text-align: center; padding: 2rem;">
                    <i class="fas fa-search" style="font-size: 3rem; color: #64748b; margin-bottom: 1rem;"></i>
                    <h3 style="color: #1e293b; margin-bottom: 1rem;">No results found</h3>
                    <p style="color: #64748b;">Try rephrasing your question or using different keywords.</p>
                </div>
            `;
        } else {
            const resultsHTML = results.map(result => `
                <div class="result-item">
                    <div class="result-title">${result.title}</div>
                    <div class="result-content">${result.content}</div>
                    <div style="margin-top: 0.5rem;">
                        <span style="background-color: #e0f2fe; color: #0369a1; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.875rem; font-weight: 500;">
                            ${result.category}
                        </span>
                    </div>
                </div>
            `).join('');

            this.searchResults.innerHTML = `
                <div style="margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 2px solid #e2e8f0;">
                    <h3 style="color: #1e293b; margin-bottom: 0.5rem;">AI Search Results</h3>
                    <p style="color: #64748b; font-size: 0.9rem;">Found ${results.length} relevant result${results.length > 1 ? 's' : ''} for "${this.searchInput.value}"</p>
                </div>
                ${resultsHTML}
            `;
        }
        
        this.searchResults.classList.add('show');
    }

    displayError(message) {
        this.searchResults.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: #ef4444; margin-bottom: 1rem;"></i>
                <h3 style="color: #1e293b; margin-bottom: 1rem;">Search Error</h3>
                <p style="color: #64748b;">${message}</p>
            </div>
        `;
        this.searchResults.classList.add('show');
    }
}

// Contact Form Handling
class ContactForm {
    constructor() {
        this.form = document.querySelector('.contact-form');
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        // Simulate form submission
        this.showLoading();
        
        setTimeout(() => {
            this.showSuccess();
            this.form.reset();
        }, 2000);
    }

    showLoading() {
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<div class="loading"></div> Sending...';
        submitBtn.disabled = true;
    }

    showSuccess() {
        const submitBtn = this.form.querySelector('button[type="submit"]');
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.style.backgroundColor = '#10b981';
        
        setTimeout(() => {
            submitBtn.textContent = 'Send Message';
            submitBtn.style.backgroundColor = '';
            submitBtn.disabled = false;
        }, 3000);
    }
}

// Intersection Observer for animations
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, this.observerOptions);
        
        this.init();
    }

    init() {
        // Add animation to service cards
        document.querySelectorAll('.service-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            this.observer.observe(card);
        });

        // Add animation to blog cards
        document.querySelectorAll('.blog-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            this.observer.observe(card);
        });

        // Add animation to features
        document.querySelectorAll('.feature').forEach(feature => {
            feature.style.opacity = '0';
            feature.style.transform = 'translateY(30px)';
            feature.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            this.observer.observe(feature);
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AISearch();
    new ContactForm();
    new ScrollAnimations();
    
    // Add smooth reveal animation to hero section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
        
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect after page load
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat h3');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + (counter.textContent.includes('+') ? '+' : '') + (counter.textContent.includes('%') ? '%' : '');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + (counter.textContent.includes('+') ? '+' : '') + (counter.textContent.includes('%') ? '%' : '');
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}